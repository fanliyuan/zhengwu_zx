import React, { Component } from 'react'
import { connect } from 'dva'
import { Form, Input, DatePicker, Select, Button, Table, Tooltip } from 'antd'
import moment from 'moment'

import { format0, format24 } from '../../utils/utils'
import styles from './Logging.less'
import PageHeaderLayout from '@/components/PageHeaderWrapper'

// 随机IP地址
function getRandomIp() {
  return `210.${Math.floor(Math.random() * 256)}.${Math.floor(Math.random() * 256)}.${Math.floor(Math.random() * 256)}`
}

const { RangePicker } = DatePicker

@connect(({ loginAudit, loading }) => ({ loginAudit, loading: loading.models.loginAudit }))
export default class Logging extends Component {
  state = {
    queryData: {
      time: [],
    },
    queryParams: {
      logType: 3,
    },
    isChanged: false,
  }

  componentDidMount() {
    const { dispatch } = this.props
    dispatch({
      type: 'loginAudit/getLoginAudit',
      payload: {
        params: {
          logType: 3,
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
    if (!isChanged) return null
    const { isChanged, queryData } = this.state
    const { dispatch } = this.props
    const pagination = {
      pageSize: 10,
      pageNum: 1,
    }
    const queryParams = {
      logType: 3,
      createUser: queryData.createUser || undefined,
      logIpAddress: queryData.logIpAddress || undefined,
      logState: queryData.logState || undefined,
      startTime: queryData.time[0] && format0(queryData.time[0].format('x')),
      endTime: queryData.time[1] && format24(queryData.time[1].format('x')),
    }
    this.setState({
      isChanged: false,
      queryParams,
    })
    dispatch({
      type: 'loginAudit/getLoginAudit',
      payload: {
        params: {
          ...queryParams,
          ...pagination,
        },
      },
    })
  }

  handleTableChange = pagination => {
    const { queryParams } = this.state
    const { dispatch } = this.props
    dispatch({
      type: 'loginAudit/getLoginAudit',
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
        dataIndex: 'realUser',
        align: 'center',
        render: text => {
          return <span>{text || <Tooltip title='无法获取真实姓名'><span>神秘人</span></Tooltip>}</span>
        },
      },
      {
        title: '登录时间',
        dataIndex: 'createTime',
        align: 'center',
        render: val => {
          return <span>{moment(val).format('lll')}</span>
        },
      },
      {
        title: '登录IP',
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
