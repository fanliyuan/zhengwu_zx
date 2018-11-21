import React, { Component } from 'react'
import { Table, Button, Select, Card, Popconfirm, Form, Tooltip } from 'antd'
import moment from 'moment'
import { connect } from 'dva'
import { routerRedux } from 'dva/router'
import { Throttle, Bind } from 'lodash-decorators'
import _ from 'lodash'

import { format0, format24 } from '../../utils/utils'
import styles from './UserManage.less'
import PageHeaderLayout from '@/components/PageHeaderWrapper'
import SearchForm from '@/components/SearchForm'

const { Option } = Select

@Form.create()
@connect(({ accounts, roles, loading }) => ({
  accounts,
  roles,
  loading: loading.models.accounts,
}))
export default class UserManage extends Component {
  state = {
    queryData: {},
    roleObject: {},
    pagination: {
      pageNum: 1,
      pageSize: 10,
    },
    isChanged: false,
  }

  componentDidMount() {
    this.handleSearch()
    this.props.dispatch({
      type: 'roles/getRoleList',
      payload: {},
    })
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.roles.roleList && nextProps.roles.roleList !== this.props.roles.roleList) {
      const roleObject = nextProps.roles.roleList.reduce((pre, cur) => {
        pre[cur.roleName] = cur.roleDesc
        return pre
      },{})
      this.setState({
        roleObject,
      })
    }
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
        body: {
          accountStatus: row.accountStatus === '0' ? '1' : '0',
          accountId: row.accountId,
        },
        flag: 'status',
      },
    })
  }

  tableChange = pagination => {
    this.setState({
      pagination: {
        pageNum: pagination.current,
        pageSize: pagination.pageSize,
      },
      isChanged: true,
    }, () => {
      const { queryData } = this.state
      this.handleSearch(queryData)
    })
  }

  handleDelete = (row) => {
    this.props.dispatch({
      type: 'accounts/deleteAccount',
      payload: {
        accountId: row.accountId,
      },
    })
  }

  handleChange = () =>{
    this.setState({
      isChanged: false,
    })
  }

  @Bind()
  @Throttle(1000)
  handleSearch(queryData = {}, pageReset = false) {
    const pagination = pageReset?{pageNum:1,pageSize:10}:this.state.pagination
    this.setState({
      queryData: {
        ...queryData,
      },
    })
    queryData.startTime = queryData.createTime&&queryData.createTime[0]?format0(queryData.createTime[0].format('x')):undefined
    queryData.endTime = queryData.createTime&&queryData.createTime[1]?format24(queryData.createTime[1].format('x')):undefined
    delete queryData.createTime
    queryData = _.omitBy(queryData, item => !item)
    
    this.props.dispatch({
      type: 'accounts/getAccounts',
      payload: {
        ...queryData,
        ...pagination,
      },
    })
  }

  render() {
    const that = this
    const { accounts: { accountList, pagination = false }, roles: { roleList = [] }, loading } = this.props
    const { roleObject, isChanged } = this.state
    accountList.forEach(item => item.role = roleObject[item.roleName]) // eslint-disable-line
    const selectData1 = roleList.map(item => {
      return (
        <Option value={item.roleName} key={item.roleId} title={item.roleDesc}>
          {item.roleDesc}
        </Option>
      )
    })
    const data2 = [{ value: '0', id: 0, label: '启用' }, { value: '1', id: 1, label: '停用' } ]
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
        dataIndex: 'accountNickName',
      },
      {
        title: '电话',
        dataIndex: 'accountTel',
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
        dataIndex: 'accountCreateTime',
        render(text) {
          return moment(text).format('YYYY-MM-DD HH:mm:ss')
        },
      },
      {
        title: '状态',
        dataIndex: 'accountStatus',
        render(text) {
          return +text === 0 ? <span className='orange'>启用</span> : <span className='silver'>停用</span>
        },
      },
      {
        title: '操作',
        render: (text, row) => {
            return (
              <div>
                {row.isTrue !== 'true'? (
                  <Popconfirm onConfirm={() => this.handleStatus(text, row)} title={`${row.accountStatus === '1'?'启用后当前用户可登录系统,您是否确认启用当前用户?':'停用后当前用户不可登录,您是否确认停用当前用户'}`}>
                    <span className={`${styles.editBtn} ${row.isTrue === 'true'?'disabled':''}`}>
                      {row.accountStatus === '0' ? '停用' : '启用'}
                    </span>
                  </Popconfirm>): (
                    <Tooltip title='默认用户,不可操作'>
                      <span className={`${styles.editBtn} disabled`}>
                        {row.accountStatus === '0' ? '停用' : '启用'}
                      </span>
                    </Tooltip>
                  )}
                <span className={styles.editBtn} onClick={() => that.handleEdit(row)}>
                  修改
                </span>
                {
                  row.isTrue!=='true'?(
                    <Popconfirm
                      title="您是否确认删除当前用户?"
                      onConfirm={() => this.handleDelete(row)}
                      >
                      <a style={{ marginRight: 20 }}>删除</a>
                    </Popconfirm>):(
                      <Tooltip title='默认用户,不可删除'>
                        <a style={{ marginRight: 20 }} className='disabled'>删除</a>
                      </Tooltip>
                    )
                }
              </div>
            )
        //   }
        },
      },
    ]
    columns.forEach(item => {
      item.align = 'center'
    })
    const searchHandler = this.handleSearch
    const formOptions = {
      formData: [
        {
          name: 'accountName',
          type: 'Input',
          placeholder: '用户名',
          maxLength: 50,
        },
        {
          name: 'accountNickName',
          placeholder: '姓名',
          maxLength: 50,
        },
        {
          name: 'accountTel',
          placeholder: '电话',
          maxLength: 50,
        },
        {
          name: 'roleName',
          type: 'Select',
          placeholder: '角色',
          children: selectData1,
        },
        {
          name: 'accountStatus',
          type: 'Select',
          placeholder: '状态',
          children: selectData2,
        },
        {
          name: 'createTime',
          type: 'RangePicker',
        },
      ],
      searchHandler,
    }
    return (
      <PageHeaderLayout>
        <Card>
          <SearchForm isChanged={isChanged} formOptions={formOptions} onChange={this.handleChange} />
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
