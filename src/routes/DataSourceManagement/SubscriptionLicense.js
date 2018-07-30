import React, { Component } from 'react'
import { Table, Button, Input, Select, Card, DatePicker, Checkbox, Modal, Radio } from 'antd'
import moment from 'moment'
import { connect } from 'dva'
import { Link, routerRedux } from 'dva/router'

import styles from './SubscriptionLicense.less'
import PageHeaderLayout from '../../layouts/PageHeaderLayout'

const { Option } = Select
const { RangePicker } = DatePicker
const RadioGroup = Radio.Group
const { TextArea } = Input
@connect(({ SubscriptionLicense }) => ({
  SubscriptionLicense,
}))
export default class SubscriptionLicense extends Component {
  state = {
    provider: '0',
    status: '0',
    visible: false,
    isPass: 1,
  }

  providerChange = val => {
    this.setState({
      provider: val,
    })
  }

  statusChange = val => {
    this.setState({
      status: val,
    })
  }

  showModal = () => {
    this.setState({
      visible: true,
    })
  }

  handleOk = () => {
    this.setState({
      visible: false,
    })
  }

  handleCancel = () => {
    this.setState({
      visible: false,
    })
  }

  handlePass = e => {
    this.setState({
      isPass: e.target.value,
    })
  }

  handleView = () => {
    const { dispatch } = this.props
    dispatch(routerRedux.push('/dataSourceManagement/viewDirectory'))
  }

  render() {
    const that = this
    const { provider, status, isPass, visible } = this.state
    const data = [
      { value: '0', id: 0, label: '数据类型1' },
      { value: '1', id: 1, label: '数据类型2' },
    ]
    const selectData = data.map(item => {
      return (
        <Option value={item.value} key={item.id} title={item.label}>
          {item.label}
        </Option>
      )
    })
    const data1 = [
      { value: '0', id: 0, label: '待授权' },
      { value: '1', id: 1, label: '已授权' },
      { value: '2', id: 2, label: '已拒绝' },
    ]
    const selectData1 = data1.map(item => {
      return (
        <Option value={item.value} key={item.id} title={item.label}>
          {item.label}
        </Option>
      )
    })
    const data2 = [
      { value: '0', id: 0, label: '所属机构1' },
      { value: '1', id: 1, label: '所属机构2' },
      { value: '2', id: 2, label: '所属机构3' },
    ]
    const selectData2 = data2.map(item => {
      return (
        <Option value={item.value} key={item.id} title={item.label}>
          {item.label}
        </Option>
      )
    })
    const data3 = [
      { value: '0', id: 0, label: '订阅机构1' },
      { value: '1', id: 1, label: '订阅机构2' },
      { value: '2', id: 2, label: '订阅机构3' },
    ]
    const selectData3 = data3.map(item => {
      return (
        <Option value={item.value} key={item.id} title={item.label}>
          {item.label}
        </Option>
      )
    })
    const pagination = { pageSize: 10, current: 1 }
    const columns = [
      {
        title: '目录名称',
        dataIndex: 'catalogName',
      },
      {
        title: '资源名称',
        dataIndex: 'sourceName',
      },
      {
        title: '数据类型',
        dataIndex: 'dadaType',
      },
      {
        title: '所属机构',
        dataIndex: 'oweingJg',
      },
      {
        title: '订阅机构',
        dataIndex: 'subJg',
      },
      {
        title: '订阅时间',
        dataIndex: 'subTime',
        render(text) {
          return moment(text).format('YYYY-MM-DD HH:mm:ss')
        },
      },
      {
        title: '审核状态',
        dataIndex: 'status',
        render(text) {
          return +text === 0 ? '待审核' : '已通过'
        },
      },
      {
        title: '操作',
        render(text, row) {
          if (row.status === 0) {
            return (
              <div>
                {/* <a style={{marginRight:10}}>信息项</a>
                    <a style={{marginRight:10}}>相关资源</a> */}
                {/* <span className={styles.auditBtn} onClick={that.handleView}>
                  查看
                </span> */}
                <Link to={`/dataSourceManagement/checkAudit/${row.id}`} className="mr8">
                  查看
                </Link>
                <span className={styles.auditBtn} onClick={that.showModal}>
                  审核
                </span>
              </div>
            )
          } else {
            return (
              <div>
                {/* <span className={styles.auditBtn} onClick={that.handleView}>
                  查看
                </span> */}
                <Link to={`/dataSourceManagement/checkAudit/${row.id}`} className="mr8">
                  查看
                </Link>
              </div>
            )
          }
        },
      },
    ]
    columns.forEach(item => {
      item.align = 'center'
    })
    const list = [
      {
        id: 0,
        catalogName: '',
        sourceName: '城市低保标准表',
        dadaType: 'Mysql',
        oweingJg: '石家庄市民政部',
        subJg: '石家庄市民政部',
        subTime: 244154512,
        status: 0,
      },
      {
        id: 1,
        catalogName: '',
        sourceName: '农村低保标准表',
        dadaType: 'Mysql',
        oweingJg: '石家庄市民政部',
        subJg: '石家庄市民政部',
        subTime: 244154512,
        status: 1,
      },
      {
        id: 2,
        catalogName: '',
        sourceName: '',
        dadaType: '',
        oweingJg: '',
        subJg: '',
        subTime: 244154512,
        status: 2,
      },
    ]
    const rowSelection = {
      // onChange: selectedRows => {
      // },
      // getCheckboxProps: record => ({
      //   disabled: record.name === 'Disabled User',
      //   name: record.name,
      // }),
    }
    return (
      <PageHeaderLayout>
        <Card>
          <div className={styles.form}>
            <Input placeholder="目录名称/资源名称" style={{ width: 150, marginRight: 20 }} />
            <Select
              style={{ marginRight: 20, width: 120 }}
              value={provider}
              onChange={this.providerChange}
              >
              {selectData}
            </Select>
            <Select
              style={{ marginRight: 20, width: 120 }}
              value={provider}
              onChange={this.providerChange}
              >
              {selectData3}
            </Select>
            <Select
              style={{ marginRight: 20, width: 120 }}
              value={provider}
              onChange={this.providerChange}
              >
              {selectData2}
            </Select>
            <RangePicker style={{ marginRight: 20, width: 250 }} />
            <Select
              style={{ marginRight: 20, width: 120 }}
              value={status}
              onChange={this.statusChange}
              >
              {selectData1}
            </Select>
            <Checkbox style={{ marginRight: 10 }}>已挂接资源</Checkbox>
            <Button type="primary">搜索</Button>
          </div>
          <div>
            <Table
              columns={columns}
              dataSource={list}
              pagination={pagination}
              rowKey="id"
              rowSelection={rowSelection}
              bordered
              />
          </div>
          <Modal title="审核" visible={visible} onOk={this.handleOk} onCancel={this.handleCancel}>
            <div className={styles.modals}>
              <div>
                <RadioGroup value={isPass} onChange={this.handlePass}>
                  <Radio value={1}>通过</Radio>
                  <Radio value={2}>拒绝</Radio>
                </RadioGroup>
              </div>
              <div style={{ display: +isPass === 1 ? 'block' : 'none' }}>
                您是否确定通过此次审核?
              </div>
              <div style={{ display: +isPass === 2 ? 'block' : 'none' }}>
                <div style={{ marginBottom: '10px' }}>请输入拒绝理由</div>
                <TextArea row={5} />
              </div>
            </div>
          </Modal>
        </Card>
      </PageHeaderLayout>
    )
  }
}
