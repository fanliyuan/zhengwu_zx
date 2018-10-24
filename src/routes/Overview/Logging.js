import React, { Component } from 'react'
import { connect } from 'dva'
import { DatePicker, Input, Select, Button, Table } from 'antd'

import { format0, format24 } from '../../utils/utils'
import PageHeaderLayout from '../../layouts/PageHeaderLayout'
import styles from './Logging.less'

// 随机IP地址
function getRandomIp() {
  return `210.${Math.floor(Math.random() * 256)}.${Math.floor(Math.random() * 256)}.${Math.floor(Math.random() * 256)}`
}

const { RangePicker } = DatePicker
const { Option } = Select

@connect(({ overviewLogging, loading }) => ({
  overviewLogging,
  loading: loading.models.overviewLogging,
}))
export default class Log extends Component {
  state = {
    queryData: {
      time: [],
    },
    queryParams:{
      createUser: localStorage.getItem('accountName'),
      logType: 3,
    },
    isChanged: false,
  }

  componentDidMount() {
    const { dispatch } = this.props
    dispatch({
      type: 'overviewLogging/log',
      payload: {
        params: {
          pageNum: 1,
          pageSize: 10,
          createUser: localStorage.getItem('accountName'),
          logType: 3,
        },
      },
    })
  }

  handleIPChange = e => {
    const { queryData } = this.state
    this.setState({
      queryData: {
        ...queryData,
        logIpAddress: e.target.value.trim() || undefined,
      },
      isChanged: true,
    })
  }

  handSelectChange = val => {
    const { queryData } = this.state
    this.setState({
      queryData: {
        ...queryData,
        logState: val === '全部结果' ? undefined : val,
      },
      isChanged: true,
    })
  }

  handlePick = val => {
    const { queryData } = this.state
    this.setState({
      queryData: {
        ...queryData,
        time: val,
      },
      isChanged: true,
    })
  }

  handleSearch = () => {
    if (!this.state.isChanged) return null
    const { dispatch } = this.props
    const { queryData } = this.state
    const pagination = {
      pageNum: 1,
      pageSize: 10,
    }
    const queryParams = {
      logIpAddress: queryData.logIpAddress,
      logState: queryData.logState,
      createUser: localStorage.getItem('accountName'),
      logType: 3,
      startTime: queryData.time[0] && format0(queryData.time[0].format('x')),
      endTime: queryData.time[1] && format24(queryData.time[1].format('x')),
    }
    this.setState({
      isChanged: false,
      queryParams,
    })
    dispatch({
      type: 'overviewLogging/log',
      payload: {
        params: {
          ...queryParams,
          ...pagination,
        },
      },
    })
  }

  handleStandardTableChange = pagination => {
    // console.log(pagination, filtersArg, sorter)
    const { queryParams } = this.state
    const { dispatch } = this.props

    dispatch({
      type: 'overviewLogging/log',
      payload: {
        params: {
          ...queryParams,
          pageNum: pagination.current,
          pageSize: pagination.pageSize,
        },
      },
    })
  }

  render() {
    const {
      overviewLogging: { loggingList, pagination, stateList },
      loading,
    } = this.props
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
        title: 'IP 地址',
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
          return <span>{text ? '登录成功' : '登录失败'}</span>
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

    return (
      <PageHeaderLayout>
        <div className={styles.layout}>
          <div className={styles.search}>
            <RangePicker
              className={styles.picker}
              onChange={this.handlePick}
              style={{ widht: 200, marginRight: 20 }}
              />
            <Input
              className={styles.IPInput}
              placeholder="IP 地址"
              onPressEnter={this.handleSearch}
              onChange={this.handleIPChange}
              style={{ marginRight: 20 }}
              />
            <Select
              defaultValue='全部结果'
              onChange={this.handSelectChange}
              style={{ width: 112, marginRight: 20 }}
              >
              {optionList}
            </Select>
            <Button type="primary" onClick={this.handleSearch} icon="search">
              搜索
            </Button>
          </div>
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
