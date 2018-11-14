import React, { Component } from 'react'
import { connect } from 'dva'
import { Table, Button, Input, Select, Card, DatePicker, Modal, Radio, message, Form } from 'antd'
import { Bind, Throttle } from 'lodash-decorators'
import moment from 'moment'

import PageHeaderLayout from '@/components/PageHeaderWrapper'
import { format0, format24 } from '../../utils/utils'
import styles from './AssignRole.less'

const { Option } = Select
const { RangePicker } = DatePicker
const RadioGroup = Radio.Group
const FormItem = Form.Item

@Form.create()
@connect(({ roles, accounts, loading }) => ({
  roles,
  accounts,
  loading: loading.models.roles,
}))
export default class AssignRole extends Component {
  state = {
    visible: false,
    // queryData: {},
    pagination: {
      pageNum: 1,
      pageSize: 10,
    },
    roleId: null,
    userId: '',
    roleObject: {},
  }

  componentDidMount() {
    this.props.dispatch({
      type: 'accounts/getAccounts',
      payload: {
        pageSize: 10,
        pageNum: 1,
      },
    })
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

  handleReset = () => {
    const { form: { resetFields } } = this.props
    resetFields()
    this.setState({
      pagination: {
        pageSize: 10,
        pageNum: 1,
      },
    }, this.handleSearch)
  }

  tableChange = (pagination) =>{
    this.setState({
      pagination: {
        pageNum: pagination.current,
        pageSize: pagination.pageSize,
      },
    }, this.handleSearch)
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

  @Bind
  @Throttle(1000)
  handleSearch() {
    const { pagination } = this.state
    const { form: { getFieldsValue } } = this.props
    const queryData = getFieldsValue()
    // 这里用户储存搜索数据
    // this.setState({
    //   queryData: {
    //     ...queryData,
    //   },
    // })
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
    const { visible, roleObject } = this.state
    const { accounts: { accountList, pagination }, roles: { roleList: data1 }, loading, form: { getFieldDecorator } } = this.props
    
    accountList.forEach(item => item.role = roleObject[item.roleName]) // eslint-disable-line
    // const roleListObject = data1.reduce((pre, cur) => {
    //   pre[cur.id] = cur.rolename
    //   return pre
    // },{})
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
              {row.role === '111管理员1111' ? (<span style={{color: 'silver', cursor: 'no-drop'}}>不可修改</span>) : (
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
          <Form className='cf'>
            <FormItem className='w120 fl mr16'>
              {getFieldDecorator('accountName')(<Input maxLength={50} placeholder='用户名' />)}
            </FormItem>
            <FormItem className='w120 fl mr16'>
              {getFieldDecorator('accountNickName')(<Input maxLength={50} placeholder='姓名' />)}
            </FormItem>
            <FormItem className='w120 fl mr16'>
              {getFieldDecorator('accountTel')(<Input maxLength={50} placeholder='电话' />)}
            </FormItem>
            <FormItem className='w120 fl mr16'>
              {getFieldDecorator('roleName')(
                <Select allowClear placeholder='请选择角色'>
                  {selectData1}
                </Select>)}
            </FormItem>
            <FormItem className='w120 fl mr16'>
              {getFieldDecorator('accountStatus')(
                <Select allowClear placeholder='状态'>
                  {selectData2}
                </Select>
              )}
            </FormItem>
            <FormItem className='w220 fl mr16'>
              {getFieldDecorator('createTime')(<RangePicker />)}
            </FormItem>
            {/* <RangePicker style={{ marginRight: 20, width: 250 }} onChange={this.dateChange} /> */}
            <FormItem className='w82 fl mr16'>
              <Button type="primary" icon='search' onClick={this.handleSearch}>搜索</Button>
            </FormItem>
            <FormItem className='w64 fl mr16'>
              <Button onClick={this.handleReset}>重置</Button>
            </FormItem>
          </Form>
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
