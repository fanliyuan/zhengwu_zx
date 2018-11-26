import React, { Component } from 'react'
import { connect } from 'dva'
import { Table, Select, Card, Modal, Radio, message, Form } from 'antd'
import { Bind, Throttle } from 'lodash-decorators'
import moment from 'moment'

import PageHeaderLayout from '@/components/PageHeaderWrapper'
import SearchForm from '@/components/SearchForm'
import { format0, format24 } from '../../utils/utils'
import styles from './AssignRole.less'

const { Option } = Select
const RadioGroup = Radio.Group

@Form.create()
@connect(({ roles, accounts, loading }) => ({
  roles,
  accounts,
  loading: loading.models.roles,
}))
export default class AssignRole extends Component {
  state = {
    visible: false,
    queryData: {},
    pagination: {
      pageNum: 1,
      pageSize: 10,
    },
    roleId: null,
    userId: '',
    roleObject: {},
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

  tableChange = pagination =>{
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

  showModal = (row) => {
    this.setState({
      visible: true,
      userId: row.accountId,
      roleId: row.roleId || -1,
    })
  }

  roleChange = e => {
    this.setState({
      roleId: e.target.value,
    })
  }

  handleOk = () => {
    if (!this.state.roleId) {
      message.error('请选择角色!')
      return null
    }
    this.props.dispatch({
      type: 'roles/saveRoleByAccount',
      payload: {
        body: {
          accountId: this.state.userId,
          roleId: this.state.roleId,
        },
      },
    })
    this.setState({
      visible: false,
      roleId: null,
    })
  }

  handleCancel = () => {
    this.setState({
      visible: false,
    })
  }

  handleChange = () => {
    this.setState({
      isChanged: false,
    })
  }

  @Bind()
  @Throttle(1000)
  handleSearch(queryData = {}, pageReset = false) {
    const pagination = pageReset?{pageNum:1,pageSize:10}:this.state.pagination
    // 这里用户储存搜索数据
    this.setState({
      queryData: {
        ...queryData,
      },
    })
    if (queryData.createTime && queryData.createTime.length > 1) {
      queryData.startTime = format0(queryData.createTime[0].format('x'))
      queryData.endTime = format24(queryData.createTime[1].format('x'))
    }
    delete queryData.createTime
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
    const { visible, roleObject, isChanged } = this.state
    const { accounts: { accountList, pagination }, roles: { roleList: data1 }, loading } = this.props
    
    accountList.forEach(item => item.role = roleObject[item.roleName]) // eslint-disable-line
    const searchHandler = this.handleSearch
    const formOptions = {
      formData: [
        {
          name: 'accountName',
          typeOptions: {
            maxLength: 50,
            placeholder: '用户名',
          },
        },
        {
          name: 'accountNickName',
          typeOptions: {
            maxLength: 50,
            placeholder: '姓名',
          },
        },
        {
          name: 'accountTel',
          typeOptions: {
            maxLength: 50,
            placeholder: '电话',
          },
        },
        {
          name: 'roleName',
          type: 'Select',
          typeOptions: {
            placeholder: '角色名',
            allowClear: true,
          },
          children: selectData1,
        },
        {
          name: 'accountStatus',
          type: 'Select',
          typeOptions: {
            placeholder: '状态',
            allowClear: true,
          },
          children: selectData2,
        },
        {
          name: 'createTime',
          type: 'RangePicker',
        },
      ],
      searchHandler,
    }
    const selectData1 = data1.map(item => {
      return (
        <Option value={item.roleName} key={item.roleId} title={item.roleDesc}>
          {item.roleDesc}
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
      //   title: '所属节点',
      //   dataIndex: 'oweNode',
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
        render: (_, row) => {
          return (
            <div>
              {row.isTrue === 'true' ? (<span style={{color: 'silver', cursor: 'no-drop'}}>不可修改</span>) : (
                <span className={styles.editBtn} onClick={() => that.showModal(row)}>
                分配角色
                </span>
              )}
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
          <SearchForm formOptions={formOptions} isChanged={isChanged} onChange={this.handleChange} />
          <div>
            <Table
              columns={columns}
              dataSource={accountList}
              pagination={pagination && {...pagination, showQuickJumper: true, showTotal: (total) => `共 ${Math.ceil(total / pagination.pageSize)}页 / ${total}条 数据`}}
              loading={loading}
              onChange={this.tableChange}
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
            <RadioGroup value={this.state.roleId} onChange={(e) => this.roleChange(e)}>
              {
                data1.map(item => (
                  <Radio value={item.roleId} key={item.roleId}>{item.roleDesc}</Radio>
                ))
              }
            </RadioGroup>
          </Modal>
        </Card>
      </PageHeaderLayout>
    )
  }
}
