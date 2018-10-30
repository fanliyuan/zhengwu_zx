import React, { Component } from 'react'
import { Table, Button, Input, Select, Card } from 'antd'
import { Link } from 'dva/router'

import styles from './ViewDirectory.less'
import PageHeaderLayout from '@/components/PageHeaderWrapper'

const { Option } = Select
export default class ViewDirectory extends Component {
  state = {
    dataType: '0',
    nodeName: '0',
  }

  selectDataTypeChange = val => {
    this.setState({
      dataType: val,
    })
  }

  selectNodeChange = val => {
    this.setState({
      nodeName: val,
    })
  }

  render() {
    const { dataType, nodeName } = this.state
    const data = [
      { value: '0', id: 0, label: '共享类型' },
      { value: '1', id: 1, label: '共享类型1' },
    ]
    const selectData = data.map(item => {
      return (
        <Option value={item.value} key={item.id} title={item.label}>
          {item.label}
        </Option>
      )
    })
    const data1 = [
      { value: '0', id: 0, label: '开放类型' },
      { value: '1', id: 1, label: '开放类型1' },
    ]
    const selectData1 = data1.map(item => {
      return (
        <Option value={item.value} key={item.id} title={item.label}>
          {item.label}
        </Option>
      )
    })
    const pagination = { pageSize: 10, current: 1 }
    const columns = [
      {
        title: '信息项编码',
        dataIndex: 'infoCode',
      },
      {
        title: '信息项名称',
        dataIndex: 'infoName',
      },
      {
        title: '数据类型',
        dataIndex: 'dataType',
      },
      {
        title: '数据长度',
        dataIndex: 'dataSize',
      },
      {
        title: '共享类型',
        dataIndex: 'shareType',
      },
      {
        title: '共享条件',
        dataIndex: 'shareCondition',
      },
      {
        title: '共享方式分类',
        dataIndex: 'shareStyle',
      },
      {
        title: '共享方式类型',
        dataIndex: 'shareStyleType',
      },
      {
        title: '开放类型',
        dataIndex: 'publicType',
      },
      {
        title: '开放条件',
        dataIndex: 'publicCondition',
      },
    ]
    columns.forEach(item => {
      item.align = 'center'
    })
    const list = [
      {
        id: 0,
        infoCode: '',
        infoName: '',
        dataType: '',
        dataSize: '',
        shareType: '',
        shareCondition: '',
        shareStyle: '',
        shareStyleType: '',
        publicType: '',
        publicCondition: '',
      },
      {
        id: 1,
        infoCode: '',
        infoName: '',
        dataType: '',
        dataSize: '',
        shareType: '',
        shareCondition: '',
        shareStyle: '',
        shareStyleType: '',
        publicType: '',
        publicCondition: '',
      },
      {
        id: 2,
        infoCode: '',
        infoName: '',
        dataType: '',
        dataSize: '',
        shareType: '',
        shareCondition: '',
        shareStyle: '',
        shareStyleType: '',
        publicType: '',
        publicCondition: '',
      },
    ]
    return (
      <PageHeaderLayout>
        <div className="btncls">
          <Link to="/dataSourceManagement/sourceManagement" className="fr mr40">
            <Button>返回</Button>
          </Link>
        </div>
        <Card>
          <div className={styles.form}>
            <Input placeholder="信息项编码" style={{ width: 150, marginRight: 20 }} />
            <Input placeholder="信息项名称" style={{ width: 150, marginRight: 20 }} />
            <Select
              style={{ marginRight: 20, width: 120 }}
              value={dataType}
              onChange={this.selectDataTypeChange}
              >
              {selectData}
            </Select>
            <Select
              style={{ marginRight: 20, width: 120 }}
              value={nodeName}
              onChange={this.selectNodeChange}
              >
              {selectData1}
            </Select>
            <Button type="primary">搜索</Button>
          </div>
          <div>
            <Table
              columns={columns}
              dataSource={list}
              pagination={pagination && {...pagination, showQuickJumper: true, showTotal: (total) => `共 ${Math.ceil(total / pagination.pageSize)}页 / ${total}条 数据`}}
              rowKey="id"
              bordered
              />
          </div>
        </Card>
      </PageHeaderLayout>
    )
  }
}
