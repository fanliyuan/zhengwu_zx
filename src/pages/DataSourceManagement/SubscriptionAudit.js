import React, { Component } from 'react'
import { Link } from 'dva/router'
import { Table, Button, Input, Select, Card, DatePicker, Modal, Radio, message } from 'antd'
import moment from 'moment'

import styles from './SubscriptionAudit.less'
import PageHeaderLayout from '@/components/PageHeaderWrapper'

const { Option } = Select
const { RangePicker } = DatePicker
const { TextArea } = Input
export default class SubscriptionAudit extends Component {
  state = {
    dataType: '0',
    owingJg: '0',
    subJg: '0',
    status: '0',
    modalVisibility: false,
    authority: 0,
    id: 0,
  }

  dataTypeChange = val => {
    this.setState({
      dataType: val,
    })
  }

  owingJgChange = val => {
    this.setState({
      owingJg: val,
    })
  }

  subJgChange = val => {
    this.setState({
      subJg: val,
    })
  }

  statusChange = val => {
    this.setState({
      status: val,
    })
  }

  handleAuthority = row => {
    this.setState({
      modalVisibility: true,
      id: row.id,
    })
  }

  authorityChange = e => {
    this.setState({
      authority: e.target.value,
    })
  }

  submitAuthority = id => {
    if (this.state.authority === 0) {
      message.success(`${id}授权拒绝`)
    } else {
      message.success(`${id}授权成功`)
    }
    this.setState({
      modalVisibility: false,
    })
  }

  render() {
    const { dataType, owingJg, subJg, status, modalVisibility, authority, id } = this.state
    const data = [
      { value: '0', id: 0, label: '数据类型' },
      { value: '1', id: 1, label: '数据类型1' },
    ]
    const selectData = data.map(item => {
      return (
        <Option value={item.value} key={item.id} title={item.label}>
          {item.label}
        </Option>
      )
    })
    const data1 = [
      { value: '0', id: 0, label: '所属机构' },
      { value: '1', id: 1, label: '所属机构1' },
    ]
    const selectData1 = data1.map(item => {
      return (
        <Option value={item.value} key={item.id} title={item.label}>
          {item.label}
        </Option>
      )
    })
    const data2 = [
      { value: '0', id: 0, label: '订阅机构' },
      { value: '1', id: 1, label: 'XXX机构' },
    ]
    const selectData2 = data2.map(item => {
      return (
        <Option value={item.value} key={item.id} title={item.label}>
          {item.label}
        </Option>
      )
    })
    const data4 = [
      { value: '0', id: 0, label: '审核状态' },
      { value: '1', id: 1, label: '审核状态1' },
    ]
    const selectData4 = data4.map(item => {
      return (
        <Option value={item.value} key={item.id} title={item.label}>
          {item.label}
        </Option>
      )
    })
    const pagination = { pageSize: 10, current: 1 }
    const columns = [
      {
        title: 'ID',
        dataIndex: 'id',
      },
      {
        title: '资源名称',
        dataIndex: 'name',
      },
      {
        title: '数据类型',
        dataIndex: 'dataType',
      },
      {
        title: '所属机构',
        dataIndex: 'institution',
      },
      {
        title: '订阅机构',
        dataIndex: 'subInstitution',
      },
      {
        title: '订阅时间',
        dataIndex: 'createTime',
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
        render: (text, row) => {
          if (row.status === '1') {
            return (
              <div>
                {/* <a>查看</a> */}
                <Link to={`/dataSourceManagement/checkAudit/${row.id}`}>查看</Link>
              </div>
            )
          } else {
            return (
              <div>
                {/* <a style={{marginRight:10}}>查看</a> */}
                <Link to={`/dataSourceManagement/checkAudit/${row.id}`} style={{ marginRight: 10 }}>
                  查看
                </Link>
                <a onClick={() => this.handleAuthority(row)}>审核</a>
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
        name: '城市低保标准表',
        dataType: 'Mysql',
        node: '石家庄民政部',
        institution: '石家庄民政部',
        subInstitution: '石家庄民政部',
        createTime: 233435354,
        lastUpdataTime: 343435354,
        subscription: 2,
        status: '0',
      },
      {
        id: 1,
        name: '农村低保标准表',
        dataType: 'Mysql',
        node: '石家庄民政部',
        institution: '石家庄民政部',
        subInstitution: '石家庄民政部',
        createTime: 233435354,
        lastUpdataTime: 343435354,
        subscription: 1,
        status: '1',
      },
      {
        id: 2,
        name: '人口普查数据',
        dataType: '文件',
        node: '石家庄民政部',
        institution: '石家庄民政部',
        subInstitution: '石家庄民政部',
        createTime: 233435354,
        lastUpdataTime: 343435354,
        subscription: 5,
        status: '1',
      },
    ]
    return (
      <PageHeaderLayout>
        <Card>
          <div className={styles.form}>
            <Input placeholder="资源名称" style={{ width: 150, marginRight: 20 }} />
            <Select
              style={{ marginRight: 20, width: 120 }}
              value={dataType}
              onChange={this.dataTypeChange}
              >
              {selectData}
            </Select>
            <Select
              style={{ marginRight: 20, width: 120 }}
              value={owingJg}
              onChange={this.owingJgChange}
              >
              {selectData1}
            </Select>
            <Select
              style={{ marginRight: 20, width: 120 }}
              value={subJg}
              onChange={this.subJgChange}
              >
              {selectData2}
            </Select>
            <RangePicker style={{ marginRight: 20, width: 250 }} />
            <Select
              style={{ marginRight: 20, width: 120 }}
              value={status}
              onChange={this.statusChange}
              >
              {selectData4}
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
        <Modal
          title="授权"
          visible={modalVisibility}
          onCancel={() => this.setState({ modalVisibility: false })}
          onOk={() => this.submitAuthority(id)}
          >
          <Radio.Group
            value={authority}
            onChange={this.authorityChange}
            style={{ margin: '0 auto' }}
            >
            <Radio value={1} key={1} className="mr40 ml16">
              通过
            </Radio>
            <Radio value={0} key={0}>
              拒绝
            </Radio>
          </Radio.Group>
          {authority === 0 && (
            <div className="mt16">
              <span style={{ marginBottom: 8, display: 'block' }}>请输入拒绝理由</span>
              <TextArea />
            </div>
          )}
        </Modal>
      </PageHeaderLayout>
    )
  }
}
