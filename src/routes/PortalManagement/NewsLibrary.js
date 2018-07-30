/*
 * @Author: ChouEric
 * @Date: 2018-07-03 15:07:52
 * @Last Modified by: ChouEric
 * @Last Modified time: 2018-07-24 15:37:05
 * @描述: 开放门户管理--资讯管理-- 资讯库
*/
import React, { Component, Fragment } from 'react'
// import { connect } from 'dva';
import { Link } from 'dva/router'
import { DatePicker, Input, Select, Button, Table, Popconfirm, message } from 'antd'
import moment from 'moment'

import PageHeaderLayout from '../../layouts/PageHeaderLayout'
import styles from './NewsLibrary.less'

const { RangePicker } = DatePicker
const { Option } = Select

const data = []

for (let i = 0; i < 120; i++) {
  data.push({
    id: i,
    title: '标题' + i, // eslint-disable-line
    operator: '操作人' + i, // eslint-disable-line
    type: Math.round(Math.random()) === 0 ? '新闻' : '政策', // eslint-disable-line
    time: moment(new Date() - 1000 * 60 * 60 * 5 * i, 'x').format('lll'),
  })
}

// @connect(({ overviewLogging, loading }) => ({
//   overviewLogging,
//   loading: loading.models.overviewLogging,
// }))
export default class NewsLibrary extends Component {
  state = {
    name: '',
    operator: '',
    type: '分类',
    // subscribe: -1,
    // audit: -1,
    date: [],
    isChanged: false,
  }

  componentDidMount() {
    // const { dispatch } = this.props
    // const { date } = this.state
    // const dateRange = date.map((item) => {
    //   if (moment.isMoment(item)) {
    //     return +(item.format('x'))
    //   } else {
    //     return 0
    //   }
    // })
    // dispatch({
    //   type: 'overviewLogging/log',
    //   payload: {query: {...this.state, date: dateRange}, pagination: {pageSize: 10, current: 1}},
    // })
  }

  handleNameChange = e => {
    this.setState({
      isChanged: true,
    })
    this.setState({
      name: e.target.value.trim(),
    })
  }

  handleOperatorChange = e => {
    this.setState({
      isChanged: true,
    })
    this.setState({
      operator: e.target.value.trim(),
    })
  }

  handleTypeChange = e => {
    this.setState({
      isChanged: true,
    })
    this.setState({
      type: e,
    })
  }

  handleSubscribeChange = () => {
    this.setState({
      isChanged: true,
    })
    // this.setState({
    //   subscribe: e,
    // })
  }

  handleAuditChange = () => {
    this.setState({
      isChanged: true,
    })
    // this.setState({
    //   audit: e,
    // })
  }

  handlePickChange = val => {
    this.setState({
      isChanged: true,
    })
    this.setState({
      date: val,
    })
  }

  handleSearch = () => {
    if (!this.state.isChanged) return // eslint-disable-line
    // const { dispatch } = this.props;
    // const query = this.state
    // const pagination = {
    //   current: 1,
    //   pageSize: 10,
    // }
    // const dateRange = query.date.map((item) => {
    //   if (moment.isMoment(item)) {
    //     return +(item.format('x'))
    //   } else {
    //     return 0
    //   }
    // })
    this.setState({
      isChanged: false,
    })
    // dispatch({
    //   type: 'overviewLogging/log',
    //   payload: { query: { ...query, date: dateRange }, pagination },
    // });
  }

  handleStandardTableChange = pagination => {
    // console.log(pagination, filtersArg, sorter)
    // const query = this.state
    // const { dispatch } = this.props;
    console.log(pagination) // eslint-disable-line
    // const dateRange = query.date.map((item) => {
    //   if (moment.isMoment(item)) {
    //     return +(item.format('x'))
    //   } else {
    //     return 0
    //   }
    // })

    // dispatch({
    //   type: 'overviewLogging/log',
    //   payload: { query: {...query, date: dateRange}, pagination },
    // });
  }

  render() {
    const { name, date, type, operator } = this.state
    // const { overviewLogging: { data, pagination, stateList }, loading } = this.props

    const typeList = [
      {
        value: 0,
        label: '新闻',
      },
      {
        value: 1,
        label: '政策',
      },
    ]
    // const subscribeList = [
    //   {
    //     value: -1,
    //     label: '全部状态',
    //   },
    //   {
    //     value: 0,
    //     label: '已授权',
    //   },
    //   {
    //     value: 1,
    //     label: '未授权',
    //   },
    // ]
    // const auditList = [
    //   {
    //     value: -1,
    //     label: '全部状态',
    //   },
    //   {
    //     value: 0,
    //     label: '已审核',
    //   },
    //   {
    //     value: 1,
    //     label: '已拒绝',
    //   },
    //   {
    //     value: 2,
    //     label: '待审核',
    //   },
    // ]

    const columns = [
      {
        title: '序号',
        dataIndex: 'id',
      },
      {
        title: '标题',
        dataIndex: 'title',
      },
      {
        title: '分类',
        dataIndex: 'type',
      },
      {
        title: '操作人',
        dataIndex: 'operator',
      },
      {
        title: '操作时间',
        dataIndex: 'time',
      },
      {
        title: '操作',
        dataIndex: 'operation',
        render: (text, row) => {
          return (
            <Fragment>
              <Link to={`/portalManagement/editArticle/${row.id}`} className="mr16">
                修改
              </Link>
              <Popconfirm
                title={`是否要删除${row.title}?`}
                onConfirm={() => message.success(`${row.title}删除成功`)}
              >
                <a>删除</a>
              </Popconfirm>
            </Fragment>
          )
        },
      },
    ]

    columns.forEach(item => {
      item.align = 'center'
    })

    const typeComs = typeList.map(item => {
      // eslint-disable-line
      return (
        <Option value={item.value} key={item.value}>
          {item.label}
        </Option>
      )
    })
    // const subscribeComs = subscribeList.map(item => {
    //   // eslint-disable-line
    //   return (
    //     <Option value={item.value} key={item.value}>
    //       {item.label}
    //     </Option>
    //   )
    // })
    // const auditComs = auditList.map(item => {
    //   // eslint-disable-line
    //   return (
    //     <Option value={item.value} key={item.value}>
    //       {item.label}
    //     </Option>
    //   )
    // })

    return (
      <PageHeaderLayout>
        <div className={styles.layout}>
          <div className={styles.search}>
            <Input
              placeholder="名称"
              value={name}
              onPressEnter={this.handleSearch}
              onChange={this.handleNameChange}
              className={styles.name}
            />
            <Select value={type} onChange={this.handleTypeChange} className={styles.select}>
              {typeComs}
            </Select>
            <Input
              placeholder="操作人"
              value={operator}
              onPressEnter={this.handleSearch}
              onChange={this.handleOperatorChange}
              className={styles.name}
            />
            {/* <Select
              value={subscribe}
              onChange={this.handleSubscribeChange}
              className={styles.select}
            >
              {subscribeComs}
            </Select>
            <Select value={audit} onChange={this.handleAuditChange} className={styles.select}>
              {auditComs}
            </Select> */}
            <RangePicker value={date} onChange={this.handlePickChange} className={styles.date} />
            <Button type="primary" onClick={this.handleSearch} icon="search">
              搜索
            </Button>
          </div>
          <div className={styles.bar}>
            <Link to="/portalManagement/AddArticle">
              <Button type="primary" icon="plus" className={styles.button}>
                新增
              </Button>
            </Link>
          </div>
          <div>
            <Table
              bordered
              columns={columns}
              dataSource={data}
              // pagination={pagination}
              // loading={loading}
              rowKey="id"
              onChange={this.handleStandardTableChange}
            />
          </div>
        </div>
      </PageHeaderLayout>
    )
  }
}
