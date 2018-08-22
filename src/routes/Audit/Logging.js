import React, { Component } from 'react'
import { connect } from 'dva'
import { Form, Input, DatePicker, Select, Button, Table } from 'antd'
import moment from 'moment'

import { format0, format24 } from '../../utils/utils'
import styles from './Logging.less'
import PageHeaderLayout from '../../layouts/PageHeaderLayout'

const { RangePicker } = DatePicker

@connect(({ loginAudit, loading }) => ({ loginAudit, loading: loading.models.loginAudit }))
export default class Logging extends Component {
  state = {
    queryData: {},
    isChanged: false,
  }

  componentDidMount() {
    const { dispatch } = this.props
    dispatch({
      type: 'loginAudit/getLoginAudit',
      payload: {
        params: {
          pageSize: 10,
          pageNum: 1,
        },
      },
    },)
  }

  handleUserNameChange = e => {
    const { queryData } = this.state
    this.setState({
      queryData: { ...queryData, createUser: e.target.value.trim() },
      isChanged: true,
    })
  }

  handleIPChange = e => {
    const { queryData } = this.state
    this.setState({
      queryData: {...queryData, logIpAddress: e.target.value.trim()},
      isChanged: true,
    })
  }

  handleDatePickerChange = value => {
    const { queryData } = this.state
    this.setState({
      queryData: { 
        ...queryData,
        time: value,
      },
      isChanged: true,
    })
  }

  handleResultChange = value => {
    const { queryData } = this.state
    this.setState({
      queryData: { ...queryData, logState: value === '全部结果' ? undefined : value },
      isChanged: true,
    })
  }

  handleSearch = () => {
    const { isChanged, queryData } = this.state
    if (!isChanged) return
    this.setState({
      isChanged: false,
    })
    const dateRange = queryData.time.map(item => {
      if (moment.isMoment(item)) {
        return +item.format('x')
      } else {
        return 0
      }
    })
    const { dispatch } = this.props
    const pagination = {
      pageSize: 10,
      pageNum: 1,
    }
    dispatch({
      type: 'loginAudit/getLoginAudit',
      payload: {
        params: {
          createUser: queryData.createUser || undefined,
          logIpAddress: queryData.logIpAddress || undefined,
          logState: queryData.logState || undefined,
          startTime: format0(dateRange.shift()),
          endTime: format24(dateRange.pop()),
          ...pagination,
        },
      },
    })
  }

  handleTableChange = pagination => {
    const { queryData } = this.state
    const { dispatch } = this.props
    dispatch({
      type: 'loginAudit/getLoginAudit',
      payload: {
        params: {
          pageNum: pagination.current,
          pageSize: pagination.pageSize,
          ...queryData,
        },
      },
    })
  }

  render() {
    const {
      loginAudit: {
        loginList,
        pagination,
        stateList,
      },
      loading,
    } = this.props

    const selectOptionList = stateList.map(item => {
      return (
        <Select.Option value={item.value} key={item.value}>
          {item.label}
        </Select.Option>
      )
    })

    const columns = [
      {
        title: '用户名',
        dataIndex: 'createUser',
        align: 'center',
      },
      {
        title: '姓名',
        dataIndex: 'name',
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
        render: (text) => {
          return <span>{text ? '登录成功' : '登录失败'}</span>
        },
      },
    ]

    return (
      <PageHeaderLayout>
        <div className={styles.layout}>
          <Form style={{ marginBottom: 20 }}>
            <Input
              onChange={this.handleUserNameChange}
              onPressEnter={this.handleSearch}
              className={styles.username}
              placeholder="用户名"
              />
            {/* <Cascader options={organizationList} onChange={this.handleOrganizationChange} style={{width: 112, marginRight: 10}} placeholder="请选择机构" /> */}
            <Input
              onChange={this.handleIPChange}
              onPressEnter={this.handleSearch}
              className={styles.ip}
              placeholder="IP地址"
              />
            <RangePicker onChange={this.handleDatePickerChange} className={styles.date} />
            <Select
              defaultValue='全部结果'
              onChange={this.handleResultChange}
              style={{ width: 112, marginRight: 10 }}
              >
              {selectOptionList}
            </Select>
            <Button type="primary" onClick={this.handleSearch} icon="search">
              搜索
            </Button>
          </Form>
          <div>
            <Table
              dataSource={loginList}
              pagination={pagination && {...pagination, showQuickJumper: true, showTotal: (total) => `共 ${Math.ceil(total / pagination.pageSize)}页 / ${total}条 数据`}}
              columns={columns}
              onChange={this.handleTableChange}
              loading={loading}
              rowKey="logId"
              />
          </div>
        </div>
      </PageHeaderLayout>
    )
  }
}
