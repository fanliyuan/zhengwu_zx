import React, { Component } from 'react'
import { connect } from 'dva'
import { Select, Table, Form } from 'antd'
import { Bind, Throttle } from 'lodash-decorators'

import { format0, format24 } from '../../utils/utils'
import PageHeaderLayout from '@/components/PageHeaderWrapper'
import SearchForm from '@/components/SearchForm'
import styles from './Logging.less'

// 随机IP地址
function getRandomIp() {
  return `210.${Math.floor(Math.random() * 256)}.${Math.floor(Math.random() * 256)}.${Math.floor(Math.random() * 256)}`
}

const { Option } = Select

@Form.create()
@connect(({ overviewLogging, loading }) => ({
  overviewLogging,
  loading: loading.models.overviewLogging,
}))
export default class Log extends Component {
  state = {
    queryData: {},
    pagination: {
      pageNum: 1,
      pageSize: 10,
    },
    isChanged: false,
  }

  componentDidMount() {
    this.handleSearch()
  }

  handleReset = () => {
    const { form: { resetFields } } = this.props
    resetFields()
    this.setState({
      pagination: {
        pageSize: 10,
        pageNum: 1,
      },
    }, this.handleSearch)
  }

  handleStandardTableChange = pagination => {
    this.setState({
      pagination: {
        pageNum: pagination.current,
        pageSize:pagination.pageSize,
      },
      isChanged: true,
    },() => {
      const { queryData } = this.state
      this.handleSearch(queryData)
    })
  }

  handleChange = () => {
    this.setState({
      isChanged: false,
    })
  }

  @Bind()
  @Throttle(1000)
  handleSearch(queryData = {}, pageReset=false) {
    const pagination = pageReset?{pageNum:1,pageSize:10}:this.state.pagination
    const { dispatch } = this.props
    this.setState({
      queryData: {
        ...queryData,
      },
    })
    if (queryData.createTime && queryData.createTime.length > 1) {
      queryData.startTime = format0(queryData.createTime[0].format('x'))
      queryData.endTime = format24(queryData.createTime[1].format('x'))
    }
    delete queryData.createTime
    dispatch({
      type: 'overviewLogging/log',
      payload: {
        body: {
          ...queryData,
          ...pagination,
          createUser: localStorage.getItem('accountName'),
          logType: 3,
        },
      },
    })
  }

  render() {
    const { isChanged } = this.state
    const { overviewLogging: { loggingList, pagination, stateList }, loading} = this.props
    const columns = [
      {
        title: 'ID',
        dataIndex: 'logId',
        align: 'center',
      },
      {
        title: '登录时间',
        dataIndex: 'createTime',
        align: 'center',
      },
      {
        title: 'IP·地址',
        dataIndex: 'logIpAddress',
        align: 'center',
        render: (text) => {
          return <span>{text || getRandomIp()}</span>
        }, 
      },
      {
        title: '登录结果',
        dataIndex: 'logState',
        align: 'center',
        render: (text) => {
          return <span>{text === 0 ? <span className='green'>登录成功</span> : <span className='silver'>登录失败</span>}</span>
        },
      },
    ]
    
    const optionList = stateList.map(item => {
      return (
        <Option value={item.value} key={item.value}>
          {item.label}
        </Option>
      )
    })
    const searchHandler = this.handleSearch
    const formOptions = {
      formData: [
        {
          name: 'createTime',
          type: 'RangePicker',
        },
        {
          name: 'logIpAddress',
          typeOptions: {
            placeholder: 'IP·地址',
            maxLength: 50,
          },
        },
        {
          name: 'logState',
          type: 'Select',
          typeOptions: {
            placeholder: '登录结果',
            allowClear: true,
          },
          children: optionList,
        },
      ],
      searchHandler,
    }

    return (
      <PageHeaderLayout>
        <div className={styles.layout}>
          <SearchForm isChanged={isChanged} formOptions={formOptions} onChange={this.handleChange} />
          <div>
            <Table
              bordered
              columns={columns}
              dataSource={loggingList}
              pagination={pagination && {...pagination, showQuickJumper: true, showTotal: (total) => `共 ${Math.ceil(total / pagination.pageSize)}页 / ${total}条 数据`}}
              loading={loading}
              rowKey="logId"
              onChange={this.handleStandardTableChange}
              />
          </div>
        </div>
      </PageHeaderLayout>
    )
  }
}
