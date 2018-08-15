import React, { Component } from 'react'
import { Table, Button, Input, Select, Card, DatePicker, Popconfirm } from 'antd'
import moment from 'moment'
import { connect } from 'dva'
import { routerRedux } from 'dva/router'

import { format0, format24 } from '../../utils/utils'
import styles from './UserManage.less'
import PageHeaderLayout from '../../layouts/PageHeaderLayout'

const { Option } = Select
const { RangePicker } = DatePicker

const roleObject = {
  admin: '管理员',
  security: '安全员',
  auditor: '审计员',
  operator: '操作员',
}

@connect(({ accounts, roles, loading }) => ({
  accounts,
  roles,
  loading: loading.models.accounts,
}))
export default class UserManage extends Component {
  state = {
    // owingJg:'0',
    role: '-1',
    isEnable: '2',
    isChanged: false,
    createTime: [],
    queryData: {
      accountNames: '',
      telephone: '',
    },
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

  roleChange = val => {
    const { queryData } = this.state
    this.setState({
      role: val,
      queryData: {
        ...queryData,
        accurate: val !== '-1' ? JSON.stringify({roleId: val}) : '',
      },
      isChanged: true,
    })
  }

  selectIsEnable = val => {
    this.setState({
      isEnable: val,
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

  handleAdd = () => {
    const { dispatch } = this.props
    dispatch(routerRedux.push('/institutionalUserManage/addUser'))
  }

  handleEdit = (row) => {
    this.props.dispatch(
      routerRedux.push('/institutionalUserManage/editUser', {userInfo: row})
    )
  }

  handleStatus = (text, row) => {
    this.props.dispatch({
      type: 'accounts/updateAccount',
      payload: {
        path: row.accountId,
        body: {
          status: row.status ? 0 : 1,
        },
        flag: 'status',
      },
    })
  }

  handleSearch = () => {
    if (!this.state.isChanged) return null
    const { queryData, isEnable, createTime } = this.state
    this.props.dispatch({
      type: 'accounts/getAccounts',
      payload: {
        ...queryData,
        filter: `${isEnable !== '0' && isEnable !== '1' ? '':`status=${isEnable}`}${(isEnable === '0' || isEnable === '1') && createTime.length > 1 ? ' and ':''}${createTime.length > 1 ? `create_time>${format0(+createTime[0].format('x'))} and create_time<${format24(+createTime[1].format('x'))}`:''}
        `,
      },
    })
    // console.log(this.state.queryData,)
    this.setState({
      isChanged: false,
    })
  }

  tableChange = (pagination) => {
    const { queryData, isEnable, createTime } = this.state
    this.props.dispatch({
      type: 'accounts/getAccounts',
      payload: {
        ...queryData,
        pageSize: pagination.pageSize,
        pageNumber: pagination.current,
        filter: `${isEnable !== '0' && isEnable !== '1' ? '':`status=${isEnable}`}${(isEnable === '0' || isEnable === '1') && createTime.length > 1 ? ' and ':''}${createTime.length > 1 ? `create_time>${format0(+createTime[0].format('x'))} and create_time<${format24(+createTime[1].format('x'))}`:''}
        `,
      },
    })
  }

  handleDelete = (row) => {
    this.props.dispatch({
      type: 'accounts/deleteAccount',
      payload: {
        path: row.accountId,
      },
    })
  }

  render() {
    const that = this
    const { role, isEnable, queryData: { accountNames, telephone }, createTime } = this.state
    const { accounts: { accountList, roleNameList, pagination = false }, roles: { roleList }, loading } = this.props
    // const data=[
    //   {value:'0',id:0,label:'所属机构'},
    //   {value:'1',id:1,label:'XXX机构'},
    // ];
    // const selectData = data.map(item => {
    //   return (<Option value={item.value} key={item.id} title={item.label}>{item.label}</Option>)
    // })
    const roleNameObject = roleNameList.reduce((pre, cur) => {
      pre[cur.userid] = cur.rolename
      return pre
    },{})
    accountList.forEach(item => item.role = roleObject[roleNameObject[item.accountId]]) // eslint-disable-line
    // const data1 = [
    //   { value:'5', id:0, label:'所有角色' },
    //   { value: '0', id: 1, label: '管理员' },
    //   { value: '1', id: 2, label: '安全员' },
    //   { value: '2', id: 3, label: '审计员' },
    //   { value: '3', id: 4, label: '操作员' },
    // ]
    const data1 = roleList.filter(item => roleObject[item.rolename]).map(item => {
      return {
        value: `${item.id}`,
        key: item.rolename,
        label: roleObject[item.rolename],
      }
    })
    data1.unshift({
      value: '-1',
      key: 'all',
      label: '所有角色',
    })
    const selectData1 = data1.map(item => {
      return (
        <Option value={item.value} key={item.key} title={item.label}>
          {item.label}
        </Option>
      )
    })
    const data2 = [{ value: '2', id: 2, label: '全部状态' }, { value: '0', id: 0, label: '停用' }, { value: '1', id: 1, label: '启用' } ]
    const selectData2 = data2.map(item => {
      return (
        <Option value={item.value} key={item.id} title={item.label}>
          {item.label}
        </Option>
      )
    })
    const columns = [
      // {
      //   title:'ID',
      //   dataIndex:'id',
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
        render: (text, row) => {
          if (row.status === '0') {
            return (
              <div>
                <span className={styles.editBtn} onClick={() => this.handleStatus(text, row)}>
                  {row.status ? '停用' : '启用'}
                </span>
                <span className={styles.editBtn} onClick={() => that.handleEdit(row)}>
                  修改
                </span>
                <Popconfirm
                  title={`是否要刪除${row.name}?`}
                  onConfirm={() => this.handleDelete(row)}
                  >
                  <a style={{ marginRight: 20 }}>删除</a>
                </Popconfirm>
              </div>
            )
          } else {
            return (
              <div>
                <span className={styles.editBtn} onClick={() => this.handleStatus(text, row)}>
                  {row.status ? '停用' : '启用'}
                </span>
                <span className={styles.editBtn} onClick={() => that.handleEdit(row)}>
                  修改
                </span>
                <Popconfirm
                  title={`是否要刪除${row.name}?`}
                  onConfirm={() => this.handleDelete(row)}
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
    return (
      <PageHeaderLayout>
        <Card>
          <div className={styles.form}>
            <Input value={accountNames} placeholder="用户名/姓名" style={{ width: 100, marginRight: 20 }} onChange={this.nameChange} />
            {/* <Input placeholder="姓名" style={{width:100,marginRight:20}}/> */}
            <Input value={telephone} placeholder="电话" style={{ width: 120, marginRight: 20 }} onChange={this.telephoneChange} />
            {/* <Select style={{marginRight:20,width:100}} value={owingJg} onChange={this.selectOwingJg}>
              {selectData}
            </Select> */}
            <Select
              style={{ marginRight: 20, width: 120 }}
              value={role}
              onChange={this.roleChange}
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
            <RangePicker value={createTime} onChange={this.dateChange} style={{ marginRight: 20, width: 250 }} />
            <Button type="primary" onClick={this.handleSearch} icon='search'>搜索</Button>
          </div>
          <div className={styles.createBtn}>
            <Button icon="plus" type="primary" onClick={this.handleAdd}>
              新建
            </Button>
          </div>
          <div>
            <Table
              columns={columns}
              dataSource={accountList}
              pagination={pagination && {...pagination, showQuickJumper: true, showTotal: (total) => `共 ${Math.ceil(total / pagination.pageSize)}页 / ${total}条 数据`}}
              onChange={this.tableChange}
              rowKey="accountId"
              bordered
              loading={loading}
              />
          </div>
        </Card>
      </PageHeaderLayout>
    )
  }
}
