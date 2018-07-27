import React, { Component } from 'react'
import { Table, Button, Input, Select, Card, DatePicker, Message, Popconfirm } from 'antd'
import moment from 'moment'
import { connect } from 'dva'
import { routerRedux } from 'dva/router'

import styles from './UserManage.less'
import PageHeaderLayout from '../../layouts/PageHeaderLayout'

const { Option } = Select
const { RangePicker } = DatePicker
@connect(({ userManage }) => ({
  userManage,
}))
export default class UserManage extends Component {
  state = {
    // owingJg:'0',
    role: '角色',
    isEnable: '状态',
    isStart: true,
    isStart1: false,
  }

  // selectOwingJg = (val) => {
  //   this.setState({
  //     owingJg:val,
  //   })
  // }

  selectrole = val => {
    this.setState({
      role: val,
    })
  }

  selectIsEnable = val => {
    this.setState({
      isEnable: val,
    })
  }

  handleAdd = () => {
    const { dispatch } = this.props
    dispatch(routerRedux.push('/institutionalUserManage/addUser'))
  }

  handleStart = () => {
    const { isStart } = this.state
    if (isStart) {
      this.setState({
        isStart: false,
      })
      Message.info('停用成功!')
    } else {
      this.setState({
        isStart: true,
      })
      Message.info('启用成功!')
    }
  }

  handleStart1 = () => {
    const { isStart1 } = this.state
    if (isStart1) {
      this.setState({
        isStart1: false,
      })
      Message.info('停用成功!')
    } else {
      this.setState({
        isStart1: true,
      })
      Message.info('启用成功!')
    }
  }

  render() {
    const that = this
    const { role, isEnable, isStart, isStart1 } = this.state
    // const data=[
    //   {value:'0',id:0,label:'所属机构'},
    //   {value:'1',id:1,label:'XXX机构'},
    // ];
    // const selectData = data.map(item => {
    //   return (<Option value={item.value} key={item.id} title={item.label}>{item.label}</Option>)
    // })
    const data1 = [
      // {value:'0',id:0,label:'角色'},
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
      //   title:'ID',
      //   dataIndex:'id',
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
      //   title:'所属节点',
      //   dataIndex:'oweNode',
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
        render(text, row) {
          if (row.status === '0') {
            return (
              <div>
                <span className={styles.editBtn} onClick={that.handleStart}>
                  {isStart ? '启用' : '停用'}
                </span>
                <span className={styles.editBtn} onClick={that.handleAdd}>
                  修改
                </span>
                <Popconfirm
                  title={`是否要刪除${row.name}?`}
                  onConfirm={() => Message.success('刪除成功')}
                >
                  <a style={{ marginRight: 20 }}>删除</a>
                </Popconfirm>
              </div>
            )
          } else {
            return (
              <div>
                <span className={styles.editBtn} onClick={that.handleStart1}>
                  {isStart1 ? '启用' : '停用'}
                </span>
                <span className={styles.editBtn} onClick={that.handleAdd}>
                  修改
                </span>
                <Popconfirm
                  title={`是否要刪除${row.name}?`}
                  onConfirm={() => Message.success('刪除成功')}
                >
                  <a style={{ marginRight: 20 }}>删除</a>
                </Popconfirm>
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
        userName: 'zhangsan',
        name: '张三',
        tel: '12654887555',
        institution: '河北省大数据局',
        oweNode: '',
        role: '平台管理员',
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
        role: '平台管理员',
        createTime: 454453353535,
        status: '1',
      },
    ]
    return (
      <PageHeaderLayout>
        <Card>
          <div className={styles.form}>
            <Input placeholder="用户名/姓名" style={{ width: 100, marginRight: 20 }} />
            {/* <Input placeholder="姓名" style={{width:100,marginRight:20}}/> */}
            <Input placeholder="电话" style={{ width: 100, marginRight: 20 }} />
            {/* <Select style={{marginRight:20,width:100}} value={owingJg} onChange={this.selectOwingJg}>
              {selectData}
            </Select> */}
            <Select
              style={{ marginRight: 20, width: 120 }}
              value={role}
              onChange={this.selectrole}
              placeholder="角色"
            >
              {selectData1}
            </Select>
            <Select
              style={{ marginRight: 20, width: 100 }}
              value={isEnable}
              onChange={this.selectIsEnable}
            >
              {selectData2}
            </Select>
            <RangePicker style={{ marginRight: 20, width: 250 }} />
            <Button type="primary">搜索</Button>
          </div>
          <div className={styles.createBtn}>
            <Button icon="plus" type="primary" onClick={this.handleAdd}>
              新建
            </Button>
          </div>
          <div>
            <Table
              columns={columns}
              dataSource={list}
              pagination={pagination}
              rowKey="id"
              bordered
            />
          </div>
        </Card>
      </PageHeaderLayout>
    )
  }
}
