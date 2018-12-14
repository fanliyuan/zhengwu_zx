/*
 * @Author: ChouEric
 * @Date: 2018-07-03 11:27:26
 * @Last Modified by: ChouEric
 * @Last Modified time: 2018-12-14 14:43:47
 * @描述: 订阅管理
*/
import React, { Component } from 'react'
import { connect } from 'dva'
import { Select } from 'antd'
import router from 'umi/router'
import moment from 'moment'
import { Bind, Throttle } from 'lodash-decorators'

import PageHeaderLayout from '@/components/PageHeaderWrapper'
import SearchForm from '@/components/SearchForm'
import StandardTable from '@/components/StandardTable'
import styles from './AllSub.less'
// import { format0, format24 } from '../../utils/utils'


// @connect(({ overviewLogging, loading }) => ({
//   overviewLogging,
//   loading: loading.models.overviewLogging,
// }))
@connect(({ catalogManagement, allSubscription, loading }) => ({ catalogManagement, allSubscription, loading: loading.models.allSubscription }))
export default class AllSub extends Component {

  formOptions = {
    formData: [
      {
        name: 'dsName',
        typeOptions: {
          maxLength: 50,
          placeholder: '订阅名称',
        },
      },
      {
        name: 'resourceName',
        typeOptions: {
          maxLength: 50,
          placeholder: '信息资源名称',
        },
      },
      // {
      //   name: 'publisherID',
      //   type: 'Select',
      //   typeOptions: {},
      //   children: [],
      // },
      // {
      //   name: 'subscriberID',
      //   type: 'Select',
      //   typeOptions: {},
      //   children: [],
      // },
      {
        name: 'runStatus',
        type: 'Select',
        typeOptions: {
          placeholder: '运行状态',
        },
        children: [{label: '全部', value: 'all'},{label: '运行',value: '1'},{label: '停止',value: '0'}].map(item => <Select.Option value={item.value} key={item.value}>{item.label}</Select.Option>),
      },
      {
        name: 'subTime',
        type: 'RangePicker',
      },
    ],
    searchHandler: this.handleSearch, // eslint-disable-line
  }

  state = {
    queryData: {},
    pagination: {pageNum:1, pageSize:10},
  }

  componentDidMount() {
    // this.props.dispatch({
    //   type: 'catalogManagement/getCatalogList',
    // })
    this.handleSearch()
  }

  // componentWillReceiveProps(nextProps) {
  //   if (nextProps.catalogManagement.catalogQueryData !== this.state.query) {
  //     this.setState({
  //       query: nextProps.catalogManagement.catalogQueryData,
  //     })
  //   }
  // }

  goToAssessLogs = row => {
    router.push('/dataSwitchManagement/assessLogs', {resourceId: row.dsId || 0})
  }

  handleStandardTableChange = ({current: pageNum,pageSize}) => {
    this.setState({
      pagination: {
        pageNum,
        pageSize,
      },
    },() => {
      const { queryData } = this.state
      this.handleSearch(queryData)
    })
  }

  // tabChange = value => {
  //   const { queryData } = this.state
  //   // 加入订阅状态情况
  //   this.setState({
  //     queryData: {
  //       ...queryData,
  //     },
  //   })
  // }

  @Bind()
  @Throttle(1000, { trailing: false })
  handleSearch(queryData={}, pageReset) {
    const pagination = pageReset?{pageNum:1,pageSize:10}:this.state.pagination
    this.setState({
      queryData:{
        ...queryData,
      },
    })
    const { subTime } = queryData
    if (subTime && Array.isArray(subTime) && subTime.length>0) {
      queryData.createTime = `${subTime[0].format().substr(0,10)} 0:00:00`
      queryData.updateTime = `${subTime[1].format().substr(0,10)} 23:59:59`
    }
    if (queryData.runStatus === 'all') delete queryData.runStatus
    delete queryData.subTime
    this.props.dispatch({
      type: 'allSubscription/getSubscription',
      payload: {
        body: {
          ...queryData,
          ...pagination,
        },
      },
    })
  }

  render() {
    const { allSubscription: { dataList, pagination }, loading } = this.props // eslint-disable-line

    const columns = [
      {
        title: '订阅名称',
        dataIndex: 'dsName',
      },
      {
        title: '订阅申请人',
        dataIndex: 'subscriberPeople',
      },
      {
        title: '订阅时间',
        dataIndex: 'subscriberTime',
        render: (text) => {
          return moment(text).format('lll')
        },
      },
      {
        title: '订阅节点',
        dataIndex: 'subscriberName',
      },
      {
        title: '信息资源名称',
        dataIndex: 'resourceName',
      },
      // {
      //   title: '目录名称',
      //   dataIndex: 'dsDirName',
      // },
      {
        title: '发布节点',
        dataIndex: 'publishInstitution',
      },
      {
        title: '运行状态',
        dataIndex: 'runStatus',
        render: (text) => {
          // return <Badge status={text?'success': 'default'} text={text==='1'?'运行中':'已停止'} />
          return <span className={+text===1?'green':'silver'}>{+text===1?'运行':'停止'}</span>
        },
      },
      {
        title: '操作',
        render: (_, row) => {
          return <a onClick={() => this.goToAssessLogs(row)}>审核日志</a>
        },
      },
    ]
    columns.forEach(item => {
      item.align = 'center'
    })
    
    return (
      <PageHeaderLayout>
        <div className={styles.layout}>
          <SearchForm formOptions={this.formOptions} />
          <StandardTable pagination={pagination} loading={loading} columns={columns} dataSource={dataList} bordered rowKey='id' onChange={this.handleStandardTableChange} />
        </div>
      </PageHeaderLayout>
    )
  }
}
