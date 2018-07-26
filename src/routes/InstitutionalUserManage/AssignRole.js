import React, { Component } from 'react'
import { Table, Button, Input, Select, Card, DatePicker, Modal, Radio } from 'antd'
import moment from 'moment'

import styles from './AssignRole.less'
import PageHeaderLayout from '../../layouts/PageHeaderLayout'

const { Option } = Select
const { RangePicker } = DatePicker
const RadioGroup = Radio.Group
export default class AssignRole extends Component {
  state = {
    // owingJg: '角色',
    role: '角色',
    status: '状态',
    visible: false,
  }

  // selectOwingJg = val => {
  //   this.setState({
  //     owingJg: val,
  //   })
  // };

  selectRoleChange = val => {
    this.setState({
      role: val,
    })
  }

  selectStatusChange = val => {
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

  render() {
    const that = this
    const { role, status, visible } = this.state
    // const data = [
    //   { value: '0', id: 0, label: '所属机构' },
    //   { value: '1', id: 1, label: 'XXX机构' },
    // ]
    // const selectData = data.map(item => {
    //   return (
    //     <Option value={item.value} key={item.id} title={item.label}>
    //       {item.label}
    //     </Option>
    //   )
    // })
    const data1 = [
      { value: '0', id: 0, label: '平台管理员' },
      { value: '1', id: 1, label: '平台安全员' },
      { value: '2', id: 1, label: '平台审计员' },
      { value: '3', id: 1, label: '平台操作员' },
    ]
    const selectData1 = data1.map(item => {
      return (
        <Option value={item.value} key={item.id} title={item.label}>
          {item.label}
        </Option>
      )
    })
    const data2 = [{ value: '0', id: 0, label: '启用' }, { value: '1', id: 1, label: '停用' }]
    const selectData2 = data2.map(item => {
      return (
        <Option value={item.value} key={item.id} title={item.label}>
          {item.label}
        </Option>
      )
    })
    const pagination = { pageSize: 10, current: 1 }
    const columns = [
      // {
      //   title: 'ID',
      //   dataIndex: 'id',
      // },
      {
        title: '用户名',
        dataIndex: 'userName',
      },
      {
        title: '姓名',
        dataIndex: 'name',
      },
      {
        title: '电话',
        dataIndex: 'tel',
      },
      {
        title: '所属机构',
        dataIndex: 'institution',
      },
      // {
      //   title: '所属节点',
      //   dataIndex: 'oweNode',
      // },
      {
        title: '角色',
        dataIndex: 'role',
      },
      {
        title: '建立时间',
        dataIndex: 'createTime',
        render(text) {
          return moment(text).format('YYYY-MM-DD HH:mm:ss')
        },
      },
      {
        title: '状态',
        dataIndex: 'status',
        render(text) {
          return +text === 0 ? '停用' : '启用'
        },
      },
      {
        title: '操作',
        render() {
          return (
            <div>
              <span className={styles.editBtn} onClick={that.showModal}>
                分配角色
              </span>
            </div>
          )
        },
      },
    ]
    columns.forEach(item => {
      item.align = 'center'
    })
    const list = [
      {
        id: 0,
        userName: 'zhangsan',
        name: '张三',
        tel: '12654887555',
        institution: '河北省大数据局',
        oweNode: '',
        role: '待分配',
        createTime: 453353535,
        status: '0',
      },
      {
        id: 1,
        userName: 'lisi',
        name: '李四',
        tel: '16654887555',
        institution: '河北省大数据局',
        oweNode: '',
        role: '平台安全员',
        createTime: 454453353535,
        status: '1',
      },
    ]
    return (
      <PageHeaderLayout>
        <Card>
          <div className={styles.form}>
            <Input placeholder="用户名/姓名" style={{ width: 100, marginRight: 20 }} />
            <Input placeholder="电话" style={{ width: 100, marginRight: 20 }} />
            {/* <InputNumber value="0" style={{ marginRight: 20 }} /> */}

            {/* <Select
              style={{ marginRight: 20, width: 100 }}
              value={owingJg}
              onChange={this.selectOwingJg}
            >
              {selectData}
            </Select> */}
            <Select
              style={{ marginRight: 20, width: 120 }}
              value={role}
              onChange={this.selectRoleChange}
            >
              {selectData1}
            </Select>
            <Select
              style={{ marginRight: 20, width: 100 }}
              value={status}
              onChange={this.selectStatusChange}
            >
              {selectData2}
            </Select>
            <RangePicker style={{ marginRight: 20, width: 250 }} />
            <Button type="primary">搜索</Button>
          </div>
          {/* <div className={styles.createBtn}>
            <Button icon="plus" type="primary">新建</Button>
          </div> */}
          <div>
            <Table
              columns={columns}
              dataSource={list}
              pagination={pagination}
              rowKey="id"
              bordered
            />
          </div>
          <Modal
            title="分配角色"
            visible={visible}
            onOk={this.handleOk}
            onCancel={this.handleCancel}
          >
            <RadioGroup>
              <Radio value={1}>安全员</Radio>
              <Radio value={2}>管理员</Radio>
              <Radio value={3}>审计员</Radio>
              <Radio value={4}>操作员</Radio>
              <Radio value={5}>审核员</Radio>
            </RadioGroup>
          </Modal>
        </Card>
      </PageHeaderLayout>
    )
  }
}
