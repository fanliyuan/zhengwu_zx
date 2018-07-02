/*
 * @Author: ChouEric
 * @Date: 2018-07-02 14:27:19
 * @Last Modified by: ChouEric
 * @Last Modified time: 2018-07-02 17:06:53
*/
import React, { Component } from 'react'
import { connect } from 'dva'
import { Form, Input, Select, Button, Table, Cascader } from 'antd'

import styles from './NodeManagement.less'
import PageHeaderLayout from '../../layouts/PageHeaderLayout'

@connect(({ infrastructureManagementNode, loading }) => ({
  infrastructureManagementNode,
  loading: loading.models.infrastructureManagementNode,
}))
export default class NodeManagement extends Component {
  state = {
    query: {
      node: '',
      ip: '',
      parentNode: -1,
      organization: [],
      state: -1,
    },
    pagination: {
      total: 0,
      current: 1,
      pageSize: 10,
    },
    isChanged: false,
  }

  componentWillMount() {
    const { query, pagination } = this.state
    const { dispatch } = this.props
    dispatch({
      type: 'infrastructureManagementNode/query',
      payload: {
        query,
        pagination,
      },
    })
  }

  handleNodeChange = (e) => {
    const { query } = this.state
    this.setState({
      query: {
        ...query,
        node: e.target.value,
      },
      isChanged: true,
    })
  }

  handleNodeSelectChange = (val) => {
    const { query } = this.state
    this.setState({
      query: {
        ...query,
        parentNode: val,
      },
      isChanged: true,
    })
  }

  handleOrganizationChange = (val) => {
    const { query } = this.state
    this.setState({
      query: {
        ...query,
        organization: val,
      },
      isChanged: true,
    })
  }

  handleStateChange = (val) => {
    const { query } = this.state
    this.setState({
      query: {
        ...query,
        state: val,
      },
      isChanged: true,
    })
  }

  handleSearch = () =>{
    const { query, pagination, isChanged } = this.state
    if (!isChanged) {
      return false
    }
    const { dispatch } = this.props
    dispatch({
      type: 'infrastructureManagementNode/query',
      payload: {
        query,
        pagination,
      },
    })
    this.setState({
      isChanged: false,
    })
  }

  render() {
    const { infrastructureManagementNode: { list, pagination, nodeList, organizationList, stateList }, loading } = this.props
    const columns = [
      {
        title: 'ID',
        dataIndex: 'id',
      },
      {
        title: '节点名称',
        dataIndex: 'name',
      },
      {
        title: '上级节点',
        dataIndex: 'parentNode',
      },
      {
        title: 'IP地址',
        dataIndex: 'ip',
      },
      {
        title: '所属机构',
        dataIndex: 'organization',
      },
      {
        title: '状态',
        dataIndex: 'state',
      },
      {
        title: '操作',
        dataIndex: 'operation',
      },
    ]
    columns.forEach(item => {
      item.align = 'center'
    })

    const nodeComs = nodeList.map(item => {
      const style = item.rank === 1 ? {paddingLeft: 20} : {}
      return (
        <Select.Option value={item.value} key={item.value} title={item.label} style={style}>{item.label}</Select.Option>
      )
    })
    const stateComs = stateList.map(item => {
      return (
        <Select.Option value={item.value} key={item.value} title={item.label}>{item.label}</Select.Option>
      )
    })
    return (
      <PageHeaderLayout>
        <div className={styles.layout}>
          <Form style={{marginBottom: 20}}>
            <Input onChange={this.handleNodeChange} onPressEnter={this.handleSearch} className={styles.node} placeholder="请输入节点名" />
            <Input onChange={this.handleIPChange} onPressEnter={this.handleSearch} className={styles.ip} placeholder="请输入IP地址" />
            <Select value={this.state.query.parentNode} onChange={this.handleNodeSelectChange} className={styles.parentNode} >
              {nodeComs}
            </Select>
            <Cascader options={organizationList} value={this.state.query.organization} onChange={this.handleOrganizationChange} className={styles.organization} placeholder="请选择所属机构" />
            <Select value={this.state.query.state} onChange={this.handleStateChange} className={styles.state} >
              {stateComs}
            </Select>
            <Button type='primary' icon='search' onClick={this.handleSearch}>搜索</Button>
          </Form>
          <Table columns={columns} dataSource={list} pagination={pagination} loading={loading} rowKey='id' bordered />
        </div>
      </PageHeaderLayout>
    )
  }
}
