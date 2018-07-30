/*
 * @Author: ChouEric
 * @Date: 2018-07-04 14:55:43
 * @Last Modified by: ChouEric
 * @Last Modified time: 2018-07-04 16:01:01
 * @描述: 监控告警 -- 告警查询
*/
import React, { Component } from 'react'
import { Tabs, Form, Input, Select, Cascader, Button, Table, DatePicker } from 'antd'
import moment from 'moment'

import PageHeaderLayout from '../../layouts/PageHeaderLayout'
import styles from './WarningQuery.less'

export default class WarningQuery extends Component {
  state = {
    querySer: {
      taskName: '',
      originName: '',
      nodeSer: [],
      originSer: -1,
      typeSer: -1,
    },
    queryDat: {
      name: '',
      nodeDat: [],
      originDat: -1,
      typeDat: -1,
      time: [],
    },
    serIsChanged: false,
    datIsChanged: false,
  }

  taskNameChange = e => {
    const { querySer } = this.state
    this.setState({
      querySer: {
        ...querySer,
        taskName: e.target.value,
      },
      serIsChanged: true,
    })
  }

  originNameChange = e => {
    const { querySer } = this.state
    this.setState({
      querySer: {
        ...querySer,
        originName: e.target.value,
      },
      serIsChanged: true,
    })
  }

  nodeSerChange = val => {
    const { querySer } = this.state
    this.setState({
      querySer: {
        ...querySer,
        nodeSer: val,
      },
      serIsChanged: true,
    })
  }

  originSerChange = val => {
    const { querySer } = this.state
    this.setState({
      querySer: {
        ...querySer,
        originSer: val,
      },
      serIsChanged: true,
    })
  }

  typeSerChange = val => {
    const { querySer } = this.state
    this.setState({
      querySer: {
        ...querySer,
        typeSer: val,
      },
      serIsChanged: true,
    })
  }

  nameChange = e => {
    const { queryDat } = this.state
    this.setState({
      queryDat: {
        ...queryDat,
        name: e.target.value,
      },
      datIsChanged: true,
    })
  }

  nodeDatChange = val => {
    const { queryDat } = this.state
    this.setState({
      queryDat: {
        ...queryDat,
        nodeDat: val,
      },
      datIsChanged: true,
    })
  }

  originDatChange = val => {
    const { queryDat } = this.state
    this.setState({
      queryDat: {
        ...queryDat,
        originDat: val,
      },
      datIsChanged: true,
    })
  }

  typeDatChange = val => {
    const { queryDat } = this.state
    this.setState({
      queryDat: {
        ...queryDat,
        typeDat: val,
      },
      datIsChanged: true,
    })
  }

  timeChange = value => {
    const { queryDat } = this.state
    this.setState({
      queryDat: {
        ...queryDat,
        time: value,
      },
      datIsChanged: true,
    })
  }

  searchSer() {
    if (!this.state.serIsChanged) return false
  }

  searchDat() {
    if (!this.state.datIsChanged) return false
  }

  render() {
    const {
      querySer: { taskName, originName, nodeSer, originSer, typeSer },
      queryDat: { name, nodeDat, originDat, typeDat, time },
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
    const originList = [
      {
        value: -1,
        label: '全部来源',
      },
      {
        value: 0,
        label: '数据源',
      },
      {
        value: 1,
        label: '通道',
      },
    ]
    const typeList = [
      {
        value: -1,
        label: '全部类型',
      },
      {
        value: 0,
        label: '更新',
      },
      {
        value: 1,
        label: '插入',
      },
      {
        value: 2,
        label: '删除',
      },
    ]
    const methodList = [
      {
        value: -1,
        label: '全部类型',
      },
      {
        value: 0,
        label: '连通',
      },
      {
        value: 1,
        label: '传输',
      },
      {
        value: 2,
        label: '数据库',
      },
    ]
    const originComs = originList.map(item => {
      return (
        <Select.Option value={item.value} key={item.value}>
          {item.label}
        </Select.Option>
      )
    })
    const methodComs = methodList.map(item => {
      return (
        <Select.Option value={item.value} key={item.value}>
          {item.label}
        </Select.Option>
      )
    })
    const typeComs = typeList.map(item => {
      return (
        <Select.Option value={item.value} key={item.value}>
          {item.label}
        </Select.Option>
      )
    })
    const columnsSer = [
      {
        title: '序号',
        dataIndex: 'id',
      },
      {
        title: '节点名称',
        dataIndex: 'nodeName',
      },
      {
        title: '告警来源',
        dataIndex: 'origin',
      },
      {
        title: '告警来源名称',
        dataIndex: 'originName',
      },
      {
        title: '告警类型',
        dataIndex: 'type',
      },
      {
        title: '告警代码',
        dataIndex: 'code',
      },
      {
        title: '告警描述',
        dataIndex: 'description',
      },
      {
        title: '告警时间',
        dataIndex: 'time',
      },
    ]
    columnsSer.forEach(item => {
      item.align = 'center'
    })
    const columnsDat = [
      {
        title: '序号',
        dataIndex: 'id',
      },
      {
        title: '节点名称',
        dataIndex: 'nodeName',
      },
      {
        title: '数据来源',
        dataIndex: 'origin',
      },
      {
        title: '数据来源名称',
        dataIndex: 'originName',
      },
      {
        title: '操作类型',
        dataIndex: 'type',
      },
      {
        title: '错误原因',
        dataIndex: 'cause',
      },
      {
        title: '发生时间',
        dataIndex: 'time',
      },
      {
        title: '主键信息',
        dataIndex: 'key',
      },
      {
        title: '表名称',
        dataIndex: 'table',
      },
    ]
    columnsDat.forEach(item => {
      item.align = 'center'
    })
    const dataSer = []
    const dataDat = []
    for (let i = 0; i < 301; i++) {
      const random = Math.round(Math.random())
      dataSer.push({
        id: i,
        nodeName: `节点名${i}`,
        origin: originList[random + 1].label + i,
        originName: random === 1 ? `通道${i}订阅${i}` : `数据源名${i}`,
        type: methodList[(i % 3) + 1].label,
        code: 500 + random,
        description: `描述${i}`,
        time: moment(new Date() - 1000 * 60 * 60 * 15 * i, 'x').format('lll'),
      })
      dataDat.push({
        id: i,
        nodeName: `节点${i}`,
        origin: originList[random + 1].label + i,
        originName: random === 1 ? `通道${i}订阅${i}` : `数据源名${i}`,
        type: typeList[(i % 3) + 1].label,
        cause: random === 1 ? '数据不存在' : 'nage”非法值',
        time: moment(new Date() - 1000 * 60 * 60 * 25 * i, 'x').format('lll'),
        key: `id=${i}`,
        table: `table${i}`,
      })
      dataDat.push()
    }

    return (
      <PageHeaderLayout>
        <div className={styles.layout}>
          <Tabs>
            <Tabs.TabPane tab="业务告警" key="service">
              <div className={styles.layout}>
                <Form className={styles.search}>
                  <Cascader
                    options={nodeList}
                    value={nodeSer}
                    onChange={this.nodeSerChange}
                    className={styles.cascader}
                    placeholder="请选择节点名称"
                    />
                  <Select
                    value={originSer}
                    onChange={this.originSerChange}
                    className={styles.select}
                    >
                    {originComs}
                  </Select>
                  <Input
                    value={originName}
                    onChange={this.originNameChange}
                    className={styles.input}
                    placeholder="告警来源名称"
                    />
                  <Select value={typeSer} onChange={this.typeSerChange} className={styles.select}>
                    {methodComs}
                  </Select>
                  <Input
                    value={taskName}
                    onChange={this.taskNameChange}
                    className={styles.input}
                    placeholder="任务名称"
                    />
                  <Button type="primary" icon="search" onClick={this.searchSer}>
                    搜索
                  </Button>
                </Form>
                <Table columns={columnsSer} dataSource={dataSer} rowKey="id" bordered />
              </div>
            </Tabs.TabPane>
            <Tabs.TabPane tab="数据告警" key="data">
              <div className={styles.layout}>
                <Form className={styles.search}>
                  <Cascader
                    options={nodeList}
                    value={nodeDat}
                    onChange={this.nodeDatChange}
                    className={styles.cascader}
                    placeholder="请选择节点名称"
                    />
                  <Select
                    value={originDat}
                    onChange={this.originDatChange}
                    className={styles.select}
                    >
                    {originComs}
                  </Select>
                  <Input
                    value={name}
                    onChange={this.nameChange}
                    className={styles.input}
                    placeholder="数据来源名称"
                    />
                  <Select value={typeDat} onChange={this.typeDatChange} className={styles.select}>
                    {typeComs}
                  </Select>
                  <DatePicker.RangePicker
                    value={time}
                    onChange={this.timeChange}
                    className={styles.picker}
                    />
                  <Button type="primary" icon="search" onClick={this.searchDat}>
                    搜索
                  </Button>
                </Form>
                <Table columns={columnsDat} dataSource={dataDat} rowKey="id" bordered />
              </div>
            </Tabs.TabPane>
          </Tabs>
        </div>
      </PageHeaderLayout>
    )
  }
}
