/*
 * @Author: ChouEric
 * @Date: 2018-07-02 14:27:19
 * @Last Modified by: ChouEric
 * @Last Modified time: 2018-07-23 10:35:45
*/
import React, { Component } from 'react'
import { connect } from 'dva'
import { Link, routerRedux } from 'dva/router'
import {
  Form,
  Input,
  Select,
  Button,
  Table,
  Cascader,
  Badge,
  Popconfirm,
  message,
  Dropdown,
  Menu,
  Icon,
} from 'antd'

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
      parentNode: [],
      organization: [],
      state: -1,
    },
    pagination: {
      total: 0,
      current: 1,
      pageSize: 10,
    },
    isChanged: false,
    selectKeys: [],
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

  handleNodeChange = e => {
    const { query } = this.state
    this.setState({
      query: {
        ...query,
        node: e.target.value,
      },
      isChanged: true,
    })
  }

  handleNodeSelectChange = val => {
    const { query } = this.state
    this.setState({
      query: {
        ...query,
        parentNode: val,
      },
      isChanged: true,
    })
  }

  handleOrganizationChange = val => {
    const { query } = this.state
    this.setState({
      query: {
        ...query,
        organization: val,
      },
      isChanged: true,
    })
  }

  handleStateChange = val => {
    const { query } = this.state
    this.setState({
      query: {
        ...query,
        state: val,
      },
      isChanged: true,
    })
  }

  handleSearch = () => {
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

  handleTableChange = pagination => {
    this.props.dispatch({
      type: 'infrastructureManagementNode/query',
      payload: {
        query: this.state.query,
        pagination,
      },
    })
  }

  handleDelete = async row => {
    await this.props.dispatch({
      type: 'infrastructureManagementNode/delete',
      payload: {
        row,
      },
    })
    await this.setState({
      isChanged: true,
    })
    await this.handleSearch()
  }

  handleCancel = () => {
    message.info('删除取消')
  }

  addNode = () => {
    const { dispatch } = this.props
    dispatch(routerRedux.push('/infrastructure/addNode'))
  }

  handleMenuClick = async (e, selectKeys) => {
    switch (e.key) {
      case '1':
        console.log('批量启动', selectKeys) // eslint-disable-line
        break
      case '2':
        console.log('批量停止', selectKeys) // eslint-disable-line
        break
      case '3':
        console.log('批量删除', selectKeys) // eslint-disable-line
        await this.props.dispatch({
          type: 'infrastructureManagementNode/deleteSome',
          payload: { ids: selectKeys },
        })
        await this.setState({
          isChanged: true,
        })
        await this.handleSearch()
        break
      default:
        break
    }
  }

  render() {
    const {
      infrastructureManagementNode: { list, pagination, nodeList, organizationList, stateList },
      loading,
    } = this.props
    const { selectKeys } = this.state
    const rowSelection = {
      selectKeys,
      onChange: Keys => {
        this.setState({
          selectKeys: Keys,
        })
      },
    }

    const columns = [
      // {
      //   title: 'ID',
      //   dataIndex: 'id',
      // },
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
        render(text) {
          const Com =
            text === '运行中' ? (
              <Badge status="success" text="运行中" />
            ) : (
              <Badge status="default" text="已停止" />
            )
          return Com
        },
      },
      {
        title: '操作',
        dataIndex: 'operation',
        render: (text, row) => {
          return (
            <div>
              <Link to={`/infrastructure/editNode/${row.id}`} style={{ marginRight: 10 }}>
                修改
              </Link>
              <Popconfirm
                title="确认删除?"
                onConfirm={() => this.handleDelete(row)}
                onCancel={this.handleCancel}
                okText="确定"
                cancelText="取消"
              >
                <Link to={`#${row.id}`} style={{ marginRight: 10 }}>
                  删除
                </Link>
              </Popconfirm>
              {/* <Link to={`#${row.id}`} style={{ marginRight: 10 }}>
                监控
              </Link>
              <Link to={`#${row.id}`} style={{ marginRight: 10 }}>
                统计
              </Link>
              <Link to={`#${row.id}`} style={{ marginRight: 10 }}>
                任务
              </Link> */}
            </div>
          )
        },
      },
    ]
    columns.forEach(item => {
      item.align = 'center'
    })
    const stateComs = stateList.map(item => {
      return (
        <Select.Option value={item.value} key={item.value} title={item.label}>
          {item.label}
        </Select.Option>
      )
    })
    const MenuComs = (
      <Menu onClick={e => this.handleMenuClick(e, selectKeys)}>
        <Menu.Item key="1">启动</Menu.Item>
        <Menu.Item key="2">停止</Menu.Item>
        <Menu.Item key="3">删除</Menu.Item>
      </Menu>
    )

    return (
      <PageHeaderLayout>
        <div className={styles.layout}>
          <Form style={{ marginBottom: 20 }}>
            <Input
              onChange={this.handleNodeChange}
              onPressEnter={this.handleSearch}
              className={styles.node}
              placeholder="节点名"
            />
            <Input
              onChange={this.handleIPChange}
              onPressEnter={this.handleSearch}
              className={styles.ip}
              placeholder="IP地址"
            />
            <Cascader
              options={nodeList}
              value={this.state.query.parentNode}
              onChange={this.handleNodeSelectChange}
              className={styles.parentNode}
              placeholder="上级节点"
            />
            <Cascader
              options={organizationList}
              value={this.state.query.organization}
              onChange={this.handleOrganizationChange}
              className={styles.organization}
              placeholder="所属机构"
            />
            <Select
              value={this.state.query.state}
              onChange={this.handleStateChange}
              className={styles.state}
            >
              {stateComs}
            </Select>
            <Button type="primary" icon="search" onClick={this.handleSearch}>
              搜索
            </Button>
          </Form>
          <div style={{ marginBottom: 20 }}>
            <Button type="primary" onClick={this.addNode} className="mr16">
              新建
            </Button>
            <Dropdown overlay={MenuComs}>
              <Button>
                批量操作<Icon type="down" />
              </Button>
            </Dropdown>
          </div>
          <Table
            columns={columns}
            dataSource={list}
            pagination={pagination}
            onChange={this.handleTableChange}
            rowSelection={rowSelection}
            loading={loading}
            rowKey="id"
            bordered
          />
        </div>
      </PageHeaderLayout>
    )
  }
}
