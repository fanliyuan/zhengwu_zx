import React, { Component } from 'react'
import { connect } from 'dva'
import { Form, Input, Select, DatePicker, Button, Cascader, Table } from 'antd'

import styles from './Operation.less'
import PageHeaderLayout from '../../layouts/PageHeaderLayout'

const { RangePicker } = DatePicker

@connect(({ auditOperation, auditLogging, loading }) =>( {
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

  handleNameChange = (e) => {
    const { query } = this.state
    this.setState({
      query: {
        ...query,
        account: e.target.value.trim(),
      },
    })
  }

  handleOrganizationChange = (value) =>{
    const { query } = this.state
    this.setState({
      query: {
        ...query,
        organization: value,
      },
    })
  }

  handleIPChange = (e) => {
    const { query } = this.state
    this.setState({
      query: {
        ...query,
        ip: e.target.value.trim(),
      },
    })
  }

  handleDateChange = (value) => {
    // let query = { ...this.state.query, date: value.map(item => +item.format('x')) }
    const { query } = this.state
    this.setState({
      query: {
        ...query,
        date: value.map(item => +item.format('x')),
      },
    })
  }

  handleOperationChange = (value) => {
    const { query } = this.state
    this.setState({
      query: {
        ...query,
        operation: value,
      },
    })
  }

  handleSearch = () => {
    const { state } = this
    const { dispatch } = this.props
    dispatch({
      type: 'auditOperation/search',
      payload: {...state},
    })
  }

  tableChange = (pagination) => {
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

  render () {
    const { auditOperation: { data, operationList }, auditLogging: {organizationList}, loading } = this.props

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
        title: '所属机构',
        dataIndex: 'organization',
        align: 'center',
      },
      {
        title: '操作时间',
        dataIndex: 'time',
        align: 'center',
      },
      {
        title: '操作IP',
        dataIndex: 'ip',
        align: 'center',
      },
      {
        title: '操作类型',
        dataIndex: 'operation',
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
        <Select.Option value={item.id} key={item.id}>{item.label}</Select.Option>
      )
    })

    return (
      <PageHeaderLayout>
        <div className={styles.layout}>
          <Form style={{marginBottom: 20}}>
            <Input onChange={this.handleNameChange} onPressEnter={this.handleSearch} className={styles.name} placeholder="请输入用户名" />
            <Cascader options={organizationList} onChange={this.handleOrganizationChange} placeholder='请选择机构' className={styles.organization} />
            <Input onChange={this.handleIPChange} onPressEnter={this.handleSearch} className={styles.ip} placeholder="请输入IP" />
            <RangePicker onChange={this.handleDateChange} className={styles.date} />
            <Select defaultValue={-1} onChange={this.handleOperationChange} className={styles.operation}>
              {OperationList}
            </Select>
            <Button type="primary" icon="search" onClick={this.handleSearch}>搜索</Button>
          </Form>
          <div>
            <Table dataSource={data.list} pagination={data.pagination} columns={columns} onChange={this.tableChange} loading={loading} rowKey="id" />
          </div>
        </div>
      </PageHeaderLayout>
    )
  }
}
