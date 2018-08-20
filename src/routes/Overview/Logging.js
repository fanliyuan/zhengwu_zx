import React, { Component } from 'react'
import { connect } from 'dva'
import { DatePicker, Input, Select, Button, Table } from 'antd'
import moment from 'moment'

// import { getTimeDistance } from '../../utils/utils'
import PageHeaderLayout from '../../layouts/PageHeaderLayout'
import styles from './Logging.less'
// import { getLogState } from '../../api/test';

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
    isChanged: false,
  }

  componentDidMount() {
    const { dispatch } = this.props
    // const { date } = this.state

    // const dateRange = date.map(item => {
    //   if (moment.isMoment(item)) {
    //     return +item.format('x')
    //   } else {
    //     return 0
    //   }
    // })

    dispatch({
      type: 'overviewLogging/log',
      payload: {
        params: {
          pageNum: 1,
          pageSize: 10,
          createUser: localStorage.getItem('accountRealName'),
        },
      },
    })
  }

  handleIPChange = e => {
    const { queryData } = this.state
    this.setState({
      queryData: {
        ...queryData,
        ipAddress: e.target.value.trim(),
      },
      isChanged: true,
    })
  }

  handSelectChange = val => {
    const { queryData } = this.state
    this.setState({
      queryData: {
        ...queryData,
        logStatus: val === '全部状态' ? undefined : val,
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
    const dateRange = queryData.time.map(item => {
      if (moment.isMoment(item)) {
        return +item.format('x')
      } else {
        return 0
      }
    })
    this.setState({
      isChanged: false,
    })
    dispatch({
      type: 'overviewLogging/log',
      payload: {
        params: {
          ipAddress: queryData.ipAddress,
          logStatus: queryData.logStatus,
          startTime: dateRange.shift(),
          endTime: dateRange.pop(),
          createUser: localStorage.getItem('accountRealName'),
          ...pagination,
        },
      },
    })
  }

  handleStandardTableChange = pagination => {
    // console.log(pagination, filtersArg, sorter)
    const { queryData } = this.state
    const { dispatch } = this.props

    const dateRange = queryData.time.map(item => {
      if (moment.isMoment(item)) {
        return +item.format('x')
      } else {
        return 0
      }
    })

    dispatch({
      type: 'overviewLogging/log',
      payload: {
        params: {
          ipAddress: queryData.ipAddress,
          logStatus: queryData.logStatus,
          startTime: dateRange.shift(),
          endTime: dateRange.pop(),
          pageNum: pagination.current,
          pageSize: pagination.pageSize,
          createUser: localStorage.getItem('accountRealName'),
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
        title: '登录IP',
        dataIndex: 'logIpAddress',
        align: 'center',
      },
      {
        title: '登录结果',
        dataIndex: 'result',
        align: 'center',
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
              placeholder="IP地址"
              onPressEnter={this.handleSearch}
              onChange={this.handleIPChange}
              style={{ marginRight: 20 }}
              />
            <Select
              defaultValue='全部状态'
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
