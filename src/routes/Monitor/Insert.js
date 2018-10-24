/*
 * @Author: ChouEric
 * @Date: 2018-07-04 10:16:31
 * @Last Modified by: ChouEric
 * @Last Modified time: 2018-07-17 11:08:08
 * @描述: 监控告警 -- 接入监控
*/
import React, { Component } from 'react'
import { Form, Input, Select, Table, Button, Cascader } from 'antd'
import { Link } from 'dva/router'

import PageHeaderLayout from '../../layouts/PageHeaderLayout'
import styles from './Insert.less'

export default class Insert extends Component {
  state = {
    query: {
      name: '',
      library: '',
      node: [],
      link: '连通性',
    },
    isChanged: false,
  }

  nameChange = e => {
    const { query } = this.state
    this.setState({
      query: {
        ...query,
        name: e.target.value,
      },
      isChanged: true,
    })
  }

  libraryChange = e => {
    const { query } = this.state
    this.setState({
      query: {
        ...query,
        library: e.target.value,
      },
      isChanged: true,
    })
  }

  nodeChange = value => {
    const { query } = this.state
    this.setState({
      query: {
        ...query,
        node: value,
      },
      isChanged: true,
    })
  }

  linkChange = value => {
    const { query } = this.state
    this.setState({
      query: {
        ...query,
        link: value,
      },
      isChanged: true,
    })
  }

  search = () => {
    if (!this.state.isChanged) {
      return false
    }
  }

  render() {
    const {
      query: { name, library, node, link },
    } = this.state

    const nodeList = [
      {
        value: -1,
        label: '所有节点',
      },
      {
        value: 101,
        label: '省直属',
        children: [
          {
            value: 101001,
            label: '省公安厅',
          },
          {
            value: 101002,
            label: '省检察院',
          },
        ],
      },
      {
        value: 102,
        label: '青岛市',
        children: [
          {
            value: 102001,
            label: '市公安局',
          },
          {
            value: 102002,
            label: '市财政局',
          },
        ],
      },
    ]
    const linkList = [
      {
        value: 0,
        label: '连接正常',
      },
      {
        value: 1,
        label: '连接失败',
      },
    ]
    const columns = [
      {
        title: '序号',
        dataIndex: 'id',
      },
      {
        title: '接入名称',
        dataIndex: 'name',
        render(text, row) {
          return <Link to={`/monitor/insertDetail/${row.id}`}>{text}</Link>
        },
      },
      {
        title: '接入所属节点',
        dataIndex: 'node',
      },
      {
        title: '接入所属机构',
        dataIndex: 'organization',
      },
      {
        title: '连通性',
        dataIndex: 'link',
      },
      {
        title: '操作',
        dataIndex: 'operation',
        render: (text, row) => {
          return <Link to={`/monitor/insertDetail/${row.id}`}>数据</Link>
        },
      },
    ]
    columns.forEach(item => {
      item.align = 'center'
    })

    const data = []
    for (let i = 0; i < 144; i++) {
      data.push({
        id: i,
        name: `接入名称${i}`,
        node: `接入节点${i}`,
        organization: `接入机构${i}`,
        link: i % 3 === 0 ? '断开' : '连接',
      })
    }

    // const stateComs = stateList.map(item => {
    //   return <Select.Option value={item.value} key={item.value} >{item.label}</Select.Option>
    // })
    const LinkComs = linkList.map(item => {
      return (
        <Select.Option value={item.value} key={item.value}>
          {item.label}
        </Select.Option>
      )
    })

    return (
      <PageHeaderLayout>
        <div className={styles.layout}>
          <Form className={styles.search}>
            <Input
              value={name}
              onChange={this.nameChange}
              className={styles.input}
              placeholder="通道名称"
              />
            <Input
              value={library}
              onChange={this.libraryChange}
              className={styles.input}
              placeholder="通道名称"
              />
            <Cascader
              options={nodeList}
              value={node}
              onChange={this.nodeChange}
              className={styles.cascader}
              placeholder="请选择接入所属节点"
              />
            <Select value={link} onChange={this.linkChange} className={styles.select}>
              {LinkComs}
            </Select>
            <Button type="primary" icon="search" onClick={this.search}>
              搜索
            </Button>
          </Form>
          <Table columns={columns} dataSource={data} rowKey="id" bordered />
        </div>
      </PageHeaderLayout>
    )
  }
}
