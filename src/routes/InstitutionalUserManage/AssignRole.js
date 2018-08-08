import React, { Component } from 'react'
import { connect } from 'dva'
import { Table, Button, Input, Select, Card, DatePicker, Modal, Radio, message } from 'antd'
import moment from 'moment'

import PageHeaderLayout from '../../layouts/PageHeaderLayout'
import { format0, format24 } from '../../utils/utils'
import styles from './AssignRole.less'

const { Option } = Select
const { RangePicker } = DatePicker
const RadioGroup = Radio.Group
const roleObject = {
  admin: '管理员',
  security: '安全员',
  auditor: '审计员',
  operator: '操作员',
}

@connect(({ roles, accounts, loading }) => ({
  roles,
  accounts,
  loading: loading.models.roles,
}))
export default class AssignRole extends Component {
  state = {
    // owingJg: '角色',
    role: -1,
    status: '-1',
    visible: false,
    isChanged: false,
    createTime: [],
    queryData: {
      accountNames: '',
      telephone: '',
    },
    roleId: null,
    userId: '',
  }

  componentDidMount() {
    this.props.dispatch({
      type: 'accounts/getAccounts',
      payload: {},
    })
    if (this.props.roles.roleList.length < 1) {
      this.props.dispatch({
        type: 'roles/getRoleList',
        payload: {},
      })
    }
  }

  nameChange = (e) => {
    const { queryData } = this.state
    this.setState({
      queryData: {
        ...queryData,
        accountNames: e.target.value.trim(),
      },
      isChanged: true,
    })
  }

  telephoneChange = (e) => {
    const { queryData } = this.state
    if (e.target.value.trim().length > 11) return false
    this.setState({
      queryData: {
        ...queryData,
        telephone: e.target.value.trim(),
      },
      isChanged: true,
    })
  }

  selectRoleChange = val => {
    this.setState({
      role: val,
      isChanged: true,
    })
  }

  selectStatusChange = val => {
    this.setState({
      status: val,
      isChanged: true,
    })
  }

  dateChange = val => {
    let createTime
    if (val.length > 1) {
      createTime = [moment(val[0]), moment(val[1])]
    } else {
      createTime = val
    }
    this.setState({
      createTime,
      isChanged: true,
    })
  }

  handleSearch = () => {
    if (!this.state.isChanged) {
      return null
    }
    const { queryData, status, createTime } = this.state
    this.props.dispatch({
      type: 'accounts/getAccounts',
      payload: {
        ...queryData,
        filter: `${status !== '0' && status !== '1' ? '':`status=${status}`}${status === '0' || status === '1' && createTime.length > 1 ? ' and ':''}${createTime.length > 1 ? `create_time>${format0(+createTime[0].format('x'))} and create_time<${format24(+createTime[1].format('x'))}`:''}
        `,
      },
    })
  }

  showModal = (row) => {
    this.setState({
      visible: true,
      userId: row.accountId,
      roleId: null,
    })
  }

  roleChange = (e) => {
    this.setState({
      roleId: e.target.value,
    })
  }

  handleOk = async () => {
    if (!this.state.roleId) {
      message.error('请选择角色!')
      return null
    }
    await this.props.dispatch({
      type: 'roles/setPermissions',
      payload: {
        body: [{
          roleidList: [this.state.roleId],
          userid: this.state.userId,
        }],
      },
    })
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
    const { role, status, visible, queryData: { accountNames, telephone } } = this.state
    const { accounts: { accountList, roleNameList, pagination }, roles: { roleList }, loading } = this.props
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
    const roleNameObject = roleNameList.reduce((pre, cur) => {
      pre[cur.userid] = cur.rolename
      return pre
    },{})
    accountList.forEach(item => item.role = roleObject[roleNameObject[item.accountId]]) // eslint-disable-line
    const data1 = roleList.reduce((pre, cur) => {
      if (Object.keys(roleObject).indexOf(cur.rolename) < 0) {
        return pre
      }
      pre.push({
        id: cur.id,
        value: cur.id,
        label: roleObject[cur.rolename],
      })
     return pre 
    }, [])
    const selectData1 = [...data1, {id: -1, value: -1, label: '所有角色'}, {id: -2, value: -2, label: '未分配角色'}].map(item => {
      return (
        <Option value={item.value} key={item.id} title={item.label}>
          {item.label}
        </Option>
      )
    })
    const data2 = [{ value: '-1', id: 3, label: '全部状态' }, { value: '1', id: 1, label: '启用' }, { value: '0', id: 0, label: '停用' }]
    const selectData2 = data2.map(item => {
      return (
        <Option value={item.value} key={item.id} title={item.label}>
          {item.label}
        </Option>
      )
    })
    const columns = [
      // {
      //   title: 'ID',
      //   dataIndex: 'id',
      // },
      {
        title: '用户名',
        dataIndex: 'accountName',
      },
      {
        title: '姓名',
        dataIndex: 'name',
      },
      {
        title: '电话',
        dataIndex: 'telephone',
      },
      // {
      //   title: '所属机构',
      //   dataIndex: 'institution',
      // },
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
        render: (_, row) => {
          return (
            <div>
              <span className={styles.editBtn} onClick={() => that.showModal(row)}>
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
    return (
      <PageHeaderLayout>
        <Card>
          <div className={styles.form}>
            <Input value={accountNames} placeholder="用户名/姓名" style={{ width: 120, marginRight: 20 }} onChange={this.nameChange} />
            <Input value={telephone} placeholder="电话" style={{ width: 120, marginRight: 20 }} onChange={this.telephoneChange} />
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
            <RangePicker style={{ marginRight: 20, width: 250 }} onChange={this.dateChange} />
            <Button type="primary">搜索</Button>
          </div>
          {/* <div className={styles.createBtn}>
            <Button icon="plus" type="primary">新建</Button>
          </div> */}
          <div>
            <Table
              columns={columns}
              dataSource={accountList}
              pagination={pagination}
              loading={loading}
              rowKey="accountId"
              bordered
              />
          </div>
          <Modal
            title="分配角色"
            visible={visible}
            onOk={this.handleOk}
            onCancel={this.handleCancel}
            >
            <RadioGroup onChange={this.roleChange}>
              {
                data1.filter(item => item.label !== '管理员').map(item => (
                  <Radio value={item.id} key={item.id}>{item.label}</Radio>
                ))
              }
              {/* <Radio value={1}>安全员</Radio> */}
              {/* <Radio value={2}>管理员</Radio> */}
              {/* <Radio value={3}>审计员</Radio>
              <Radio value={4}>操作员</Radio>
              <Radio value={5}>审核员</Radio> */}
            </RadioGroup>
          </Modal>
        </Card>
      </PageHeaderLayout>
    )
  }
}
