import React, { Component } from 'react'
import { connect } from 'dva'
import { Form, Input, Select, DatePicker, Button, Cascader, Table } from 'antd'

import styles from './Operation.less'
import PageHeaderLayout from '@/components/PageHeaderWrapper'

const { RangePicker } = DatePicker

@connect(({ auditOperation, auditLogging, loading }) => ({
  auditOperation,
  auditLogging,
  loading: loading.models.auditOperation,
}))
export default class Operation extends Component {
  state = {
    query: {
      account: '',
      organization: '',
      ip: '',
      date: [],
      operation: -1,
    },
    pagination: {
      current: 1,
      pageSize: 10,
    },
    isChanged: false,
  }

  async componentDidMount() {
    const { dispatch } = this.props
    const { query } = this.state
    await dispatch({
      type: 'auditOperation/operation',
    })
    await dispatch({
      type: 'auditLogging/organization',
    })
    await dispatch({
      type: 'auditOperation/search',
      payload: {
        query,
        pagination: {
          current: 1,
          pageSize: 10,
        },
      },
    })
  }

  handleNameChange = e => {
    const { query } = this.state
    this.setState({
      isChanged: true,
    })
    this.setState({
      query: {
        ...query,
        account: e.target.value.trim(),
      },
    })
  }

  handleOrganizationChange = value => {
    const { query } = this.state
    this.setState({
      isChanged: true,
    })
    this.setState({
      query: {
        ...query,
        organization: value,
      },
    })
  }

  handleIPChange = e => {
    const { query } = this.state
    this.setState({
      isChanged: true,
    })
    this.setState({
      query: {
        ...query,
        ip: e.target.value.trim(),
      },
    })
  }

  handleDateChange = value => {
    // let query = { ...this.state.query, date: value.map(item => +item.format('x')) }
    const { query } = this.state
    this.setState({
      isChanged: true,
    })
    this.setState({
      query: {
        ...query,
        date: value.map(item => +item.format('x')),
      },
    })
  }

  handleOperationChange = value => {
    const { query } = this.state
    this.setState({
      isChanged: true,
    })
    this.setState({
      query: {
        ...query,
        operation: value,
      },
    })
  }

  handleSearch = () => {
    const { state } = this
    if (!state.isChanged) return
    const { dispatch } = this.props
    this.setState({
      isChanged: false,
    })
    dispatch({
      type: 'auditOperation/search',
      payload: { ...state },
    })
  }

  tableChange = pagination => {
    const { dispatch } = this.props
    const { state } = this
    dispatch({
      type: 'auditOperation/search',
      payload: {
        ...state,
        pagination,
      },
    })
  }

  render() {
    const {
      auditOperation: { data, operationList } = {},
      auditLogging: { organizationList },
      loading,
    } = this.props

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
      {
        title: '操作模块',
        dataIndex: 'organization',
        align: 'center',
      },
      {
        title: '操作类型',
        dataIndex: 'operation',
        align: 'center',
      },
      {
        title: '操作时间',
        dataIndex: 'time',
        align: 'center',
      },
      {
        title: 'IP·地址',
        dataIndex: 'ip',
        align: 'center',
      },
      {
        title: '行为记录',
        dataIndex: 'detail',
        align: 'center',
      },
    ]

    const OperationList = operationList.map(item => {
      return (
        <Select.Option value={item.id} key={item.id}>
          {item.label}
        </Select.Option>
      )
    })

    return (
      <PageHeaderLayout>
        <div className={styles.layout}>
          <Form style={{ marginBottom: 20 }}>
            <Input
              onChange={this.handleNameChange}
              onPressEnter={this.handleSearch}
              className={styles.name}
              placeholder="用户名"
              />
            <Cascader
              options={organizationList}
              onChange={this.handleOrganizationChange}
              placeholder="模块"
              className={styles.organization}
              />
            <Select
              defaultValue={-1}
              onChange={this.handleOperationChange}
              className={styles.operation}
              >
              {OperationList}
            </Select>
            <Input
              onChange={this.handleIPChange}
              onPressEnter={this.handleSearch}
              className={styles.ip}
              placeholder="IP·地址"
              />
            <RangePicker onChange={this.handleDateChange} className={styles.date} />
            <Button type="primary" icon="search" onClick={this.handleSearch}>
              搜索
            </Button>
          </Form>
          <div>
            <Table
              dataSource={data.list}
              pagination={data.pagination}
              columns={columns}
              onChange={this.tableChange}
              loading={loading}
              rowKey="id"
              />
          </div>
        </div>
      </PageHeaderLayout>
    )
  }
}
