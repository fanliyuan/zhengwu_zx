/*
 * @Author: ChouEric
 * @Date: 2018-07-04 09:25:26
 * @Last Modified by: ChouEric
 * @Last Modified time: 2018-07-04 10:12:28
 * @描述: 监控告警 -- 通道监控
*/
import React, { Component } from 'react'
import { Form, Input, Select, Table, Button } from 'antd'

import PageHeaderLayout from '../../layouts/PageHeaderLayout'
import styles from './Pass.less'

export default class Pass extends Component {
  state = {
    query: {
      name: '',
      state: '状态',
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

  stateChange = value => {
    const { query } = this.state
    this.setState({
      query: {
        ...query,
        state: value,
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
      query: { name, state, link },
    } = this.state

    const stateList = [
      {
        value: 0,
        label: '启用',
      },
      {
        value: 1,
        label: '停用',
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
        title: '通道名',
        dataIndex: 'name',
      },
      {
        title: '源节点',
        dataIndex: 'origin',
      },
      {
        title: '目标节点',
        dataIndex: 'target',
      },
      {
        title: '状态',
        dataIndex: 'state',
      },
      {
        title: '连通性',
        dataIndex: 'link',
      },
      {
        title: '最大带宽',
        dataIndex: 'bandwidthMax',
      },
      {
        title: '当前带宽',
        dataIndex: 'bandwidthCur',
      },
      {
        title: '当前宽带利用率',
        dataIndex: 'bandwidthUsage',
      },
    ]
    columns.forEach(item => {
      item.align = 'center'
    })

    const data = []
    for (let i = 0; i < 144; i++) {
      data.push({
        id: i,
        name: `通道${i}`,
        origin: `源节点${i}`,
        target: `目标节点${i}`,
        state: i % 7 === 0 ? '单向' : '双向',
        link: i % 3 === 0 ? '断开' : '连接',
        bandwidthMax: '10Mbps',
        bandwidthCur: '10Mbps',
        bandwidthUsage: '100%',
      })
    }

    const stateComs = stateList.map(item => {
      return (
        <Select.Option value={item.value} key={item.value}>
          {item.label}
        </Select.Option>
      )
    })
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
            <Select value={state} onChange={this.stateChange} className={styles.select}>
              {stateComs}
            </Select>
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
