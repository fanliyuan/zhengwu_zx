import React, { Component } from 'react'
import { connect } from 'dva'
import { Form, Input, DatePicker, Select, Button, Table } from 'antd'

import styles from './Logging.less'
import PageHeaderLayout from '../../layouts/PageHeaderLayout'

const { RangePicker } = DatePicker

@connect(({ auditLogging, loading }) => ({ auditLogging, loading: loading.models.auditLogging }))
export default class Logging extends Component {
  state = {
    query: {
      account: '',
      organization: '',
      ip: '',
      date: [],
      state: -1,
    },
    pagination: {
      current: 1,
      pageSize: 10,
    },
    isChanged: false,
  }

  async componentDidMount() {
    const { pagination, query } = this.state
    const { dispatch } = this.props
    dispatch({
      type: 'auditLogging/state',
    })
    await dispatch({
      type: 'auditLogging/organization',
    })
    dispatch({
      type: 'auditLogging/log',
      payload: { pagination, query },
    })
  }

  handleUserNameChange = e => {
    const { query } = this.state
    this.setState({
      isChanged: true,
    })
    this.setState({
      query: { ...query, account: e.target.value.trim() },
    })
  }

  handleOrganizationChange = value => {
    const { query } = this.state
    this.setState({
      isChanged: true,
    })
    this.setState({
      query: { ...query, organization: value },
    })
  }

  handleIPChange = e => {
    const { query } = this.state
    this.setState({
      isChanged: true,
    })
    this.setState({
      query: { ...query, ip: e.target.value.trim() },
    })
  }

  handleDatePickerChange = value => {
    // const query = { ...this.state.query, date: value.map(item => +item.format('x')) }
    const { query } = this.state
    this.setState({
      isChanged: true,
    })
    this.setState({
      query: { ...query, date: value.map(item => +item.format('x')) },
    })
  }

  handleResultChange = value => {
    // let query = { ...this.state.query, state: value }
    const { query } = this.state
    this.setState({
      isChanged: true,
    })
    this.setState({
      query: { ...query, state: value },
    })
  }

  handleSearch = () => {
    const { pagination, isChanged } = this.state
    if (!isChanged) return
    this.setState({
      isChanged: false,
    })
    const { dispatch } = this.props
    dispatch({
      type: 'auditLogging/log',
      payload: { ...this.state, pagination },
    })
  }

  handleTableChange = pagination => {
    const { query } = this.state
    const { dispatch } = this.props
    dispatch({
      type: 'auditLogging/log',
      payload: { query, pagination },
    })
  }

  render() {
    const {
      auditLogging: {
        stateList,
        data: { list, pagination },
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
        dataIndex: 'account',
        align: 'center',
      },
      {
        title: '姓名',
        dataIndex: 'name',
        align: 'center',
      },
      // {
      //   title: '所属机构',
      //   dataIndex: 'organization',
      //   align: 'center',
      // },
      {
        title: '登录时间',
        dataIndex: 'time',
        align: 'center',
      },
      {
        title: '登录IP',
        dataIndex: 'ip',
        align: 'center',
      },
      {
        title: '登录结果',
        dataIndex: 'result',
        align: 'center',
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
              defaultValue={-1}
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
              dataSource={list}
              pagination={pagination}
              columns={columns}
              onChange={this.handleTableChange}
              loading={loading}
              rowKey="id"
              />
          </div>
        </div>
      </PageHeaderLayout>
    )
  }
}
