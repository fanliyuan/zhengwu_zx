/*
 * @Author: ChouEric
 * @Date: 2018-07-10 11:07:07
 * @Last Modified by: ChouEric
 * @Last Modified time: 2018-07-19 16:16:44
*/
import React, { Component } from 'react'
import { Tabs, Form, Input, Select, Cascader, Table, Button, DatePicker } from 'antd'
import moment from 'moment'

import { Link } from 'dva/router'
import PageHeaderLayout from '../../layouts/PageHeaderLayout'
import styles from './Task.less'

const dataPub = []
const dataSub = []
for (let i = 0; i < 198; i++) {
  dataPub.push({
    id: i,
    name: `发布名称${i}`,
    target: `目标${i}`,
    amount: `${Math.ceil(Math.random() * 10000 + 5000)}M`,
    count: `${Math.ceil(Math.random() * 100000 + 500000)}条`,
    time: moment(new Date() - 1000 * 60 * 60 * 15 * i, 'x').format('lll'),
    running: Math.round(Math.random()) === 1 ? '是' : '否',
  })
  dataSub.push({
    id: i,
    pubName: `发布名${i}`,
    subName: `订阅名${i}`,
    amount: `${Math.ceil(Math.random() * 10000 + 5000)}M`,
    count: `${Math.ceil(Math.random() * 100000 + 500000)}条`,
    state: Math.round(Math.random()) === 1 ? '启用' : '停用',
    time: moment(new Date() - 1000 * 60 * 60 * 15 * i, 'x').format('lll'),
    running: Math.round(Math.random()) === 1 ? '是' : '否',
  })
}

export default class Task extends Component {
  state = {
    queryPub: {
      namePub: '',
      node: [],
      statePub: -1,
      time: [],
    },
    querySub: {
      nameSub: '',
      stateSub: -1,
    },
    pubIsChanged: false,
    subIsChanged: false,
  }

  namePubChange = e => {
    const { queryPub } = this.state
    this.setState({
      queryPub: {
        ...queryPub,
        namePub: e.target.value,
      },
      pubIsChanged: true,
    })
  }

  nodeChange = value => {
    const { queryPub } = this.state
    this.setState({
      queryPub: {
        ...queryPub,
        node: value,
      },
      pubIsChanged: true,
    })
  }

  statePubChange = value => {
    const { queryPub } = this.state
    this.setState({
      queryPub: {
        ...queryPub,
        statePub: value,
      },
      pubIsChanged: true,
    })
  }

  timeChange = value => {
    const { queryPub } = this.state
    this.setState({
      queryPub: {
        ...queryPub,
        time: value,
      },
      pubIsChanged: true,
    })
  }

  searchPub = () => {
    if (!this.state.pubIsChanged) return false
  }

  nameSubChange = e => {
    const { querySub } = this.state
    this.setState({
      querySub: {
        ...querySub,
        nameSub: e.target.value,
      },
      subIsChanged: true,
    })
  }

  stateSubChange = value => {
    const { querySub } = this.state
    this.setState({
      querySub: {
        ...querySub,
        stateSub: value,
      },
      subIsChanged: true,
    })
  }

  searchSub = () => {
    if (!this.state.subIsChanged) return false
  }

  render() {
    const {
      queryPub: { namePub, node, statePub, time },
      querySub: { nameSub, stateSub },
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
    const statePubList = [
      { value: -1, label: '全部状态' },
      { value: 0, label: '是' },
      { value: 1, label: '否' },
    ]

    const stateSubList = [
      { value: -1, label: '全部状态' },
      { value: 0, label: '启用' },
      { value: 1, label: '停用' },
    ]

    const columnsPub = [
      {
        title: '序号',
        dataIndex: 'id',
      },
      {
        title: '发布名称',
        dataIndex: 'name',
      },
      {
        title: '发送目标',
        dataIndex: 'target',
      },
      {
        title: '发送量',
        dataIndex: 'amount',
      },
      {
        title: '发送条数',
        dataIndex: 'count',
      },
      {
        title: '发送开始时间',
        dataIndex: 'time',
      },
      {
        title: '是否正在执行',
        dataIndex: 'running',
      },
      {
        title: '操作',
        dataIndex: 'operation',
        render: (text, row) => {
          return <Link to={`/monitor/PubDetail/${row.id}`}>详情</Link>
        },
      },
    ]
    columnsPub.forEach(item => {
      item.align = 'center'
    })
    const columnsSub = [
      {
        title: '序号',
        dataIndex: 'id',
      },
      {
        title: '订阅名称',
        dataIndex: 'subName',
      },
      {
        title: '发布名称',
        dataIndex: 'pubName',
      },
      {
        title: '总订阅量',
        dataIndex: 'amount',
      },
      {
        title: '总订阅条数',
        dataIndex: 'count',
      },
      {
        title: '状态',
        dataIndex: 'state',
      },
      {
        title: '订阅接受时间',
        dataIndex: 'time',
      },
      {
        title: '是否正在执行',
        dataIndex: 'running',
      },
      {
        title: '操作',
        dataIndex: 'operation',
        render: (text, row) => {
          return <Link to={`/monitor/SubDetail/${row.id}`}>详情</Link>
        },
      },
    ]
    columnsSub.forEach(item => {
      item.align = 'center'
    })

    const statePubComs = statePubList.map(item => {
      return (
        <Select.Option value={item.value} key={item.value}>
          {item.label}
        </Select.Option>
      )
    })
    const stateSubComs = stateSubList.map(item => {
      return (
        <Select.Option value={item.value} key={item.value}>
          {item.label}
        </Select.Option>
      )
    })

    return (
      <PageHeaderLayout>
        <div className={styles.layout}>
          <Tabs>
            <Tabs.TabPane tab="任务监控列表（发布）" key="pub">
              <Form className={styles.search}>
                <Input value={namePub} onChange={this.namePubChange} className={styles.input} />
                <Cascader
                  options={nodeList}
                  value={node}
                  onChange={this.nodeChange}
                  placeholder="资源目标节点"
                  className={styles.cascader}
                />
                <Select value={statePub} onChange={this.statePubChange} className={styles.select}>
                  {statePubComs}
                </Select>
                <DatePicker.RangePicker
                  value={time}
                  onChange={this.timeChange}
                  className={styles.picker}
                />
                <Button type="primary" icon="search" onClick={this.searchPub}>
                  搜索
                </Button>
              </Form>
              <Table columns={columnsPub} dataSource={dataPub} rowKey="id" bordered />
            </Tabs.TabPane>
            <Tabs.TabPane tab="任务监控列表（订阅）" key="sub">
              <Form className={styles.search}>
                <Input value={nameSub} onChange={this.nameSubChange} className={styles.input} />
                <Select value={stateSub} onChange={this.stateSubChange} className={styles.select}>
                  {stateSubComs}
                </Select>
                <Button type="primary" icon="search" onClick={this.searchSub}>
                  搜索
                </Button>
              </Form>
              <Table columns={columnsSub} dataSource={dataSub} rowKey="id" bordered />
            </Tabs.TabPane>
          </Tabs>
        </div>
      </PageHeaderLayout>
    )
  }
}
