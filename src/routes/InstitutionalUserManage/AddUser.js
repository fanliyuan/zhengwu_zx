import React, { Component } from 'react'
import { connect } from 'dva'
import { Link } from 'dva/router'
import { Card, Input, Button, Form, Select, Checkbox, message } from 'antd'
import copy from 'copy-to-clipboard'

// import styles from './AddUser.less';
import PageHeaderLayout from '../../layouts/PageHeaderLayout'

const sha = require('sha.js')

const FormItem = Form.Item
const { Option } = Select

function getPassword(n = 8) {
  const str = 'qwertyuiopasdfghjklzxcvbnm1234567890QWERTYUIOPASDFGHJKLZXCVBNM'
  const len = str.length
  let result = ''
  for (let i = 0; i < n; i++) {
    result += str.charAt(Math.floor(Math.random() * len))
  }
  return result
}

// eslint-disable-next-line
function checkedPassword(str) {
  return (`${str}`).split('').every((item, index, arr) => {
    if (index < arr.length - 1) {
      return (Math.abs(arr[index] - arr[index+1]) === 1)
    } else {
      return true
    }
  })
}


@connect(({ accounts, loading }) => ({accounts, loading: loading.models.accounts}))
@Form.create()
export default class AddUser extends Component {
  state = {
    userInfo:{},
  }

  componentDidMount() {
    if (this.props.location.pathname === '/institutionalUserManage/editUser') {
      // this.props.dispatch({
      //   type: 'accounts/getAccount',
      //   payload: { path: this.props.location.state.accountId },
      // })
      this.setState({
        userInfo: this.props.location.state.userInfo || {},
      })
    } else {
      // this.props.dispatch({
      //   type: 'accounts/changeAccountDetail',
      //   payload: {accountDetail: {}},
      // })
      this.setState({
        userInfo: {
          status: true,
        },
      })
    }
  }

  setPassword = () => {
    this.props.form.setFieldsValue({
      password: getPassword(),
    })
  }

  handleCopy = () => {
    copy(this.props.form.getFieldValue('password'))
    message.success('成功复制')
  }

  handleSubmit = e => {
    e.preventDefault()
    this.props.form.validateFieldsAndScroll((err, value) => {
      if (!err) {
        if (this.props.location.pathname === '/institutionalUserManage/addUser') {
          this.props.dispatch({
            type: 'accounts/addAccount',
            payload: {
              accountName: value.userName,
              accountPasswd: sha('sha1').update(value.password).digest('hex'),
              telephone: value.tel,
              status: value.status ? 0: 1,
              // 下面代码是json的"替换为',并不是json
              extendedProperties: JSON.stringify({ name: value.name }).replace(/"/g,'\\"'),
            },
          })
        } else {
          const body = {
              accountName: value.userName,
              accountPasswd: value.password ? sha('sha1').update(value.password).digest('hex') : '',
              status: value.status ? 0: 1,
              telephone: value.tel,
              extendedProperties: JSON.stringify({ name: value.name }).replace(/"/g,'\\"'),
            }
          this.props.dispatch({
            type: 'accounts/updateAccount',
            payload: {
              body: {...body},
              path: this.props.location.state.userInfo && this.props.location.state.userInfo.accountId,
            },
          })
        }
      }
    })
  }

  render() {
    const { loading } = this.props
    const { getFieldDecorator } = this.props.form
    const accountDetail = this.state.userInfo
    const role = [
      { value: '0', label: '管理员', id: '0' },
      { value: '1', label: '审核员', id: '1' },
    ]
    const roleData = role.map(item => {
      return (
        <Option value={item.value} label={item.label} key={item.id}>
          {item.label}
        </Option>
      )
    })
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 7 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 12 },
        md: { span: 10 },
      },
    }
    return (
      <PageHeaderLayout>
        <Card loading={loading}>
          <Form onSubmit={this.handleSubmit}>
            <FormItem label="用户名" {...formItemLayout}>
              {getFieldDecorator('userName', {
                initialValue: accountDetail.accountName,
                rules: [
                  {
                    required: true,
                    message: '请输入合法用户名',
                    max: 20,
                    whitespace: true,
                  },
                ],
              })(<Input placeholder="请输入用户名" />)}
            </FormItem>
            <FormItem label="密码" {...formItemLayout}>
              {getFieldDecorator('password', {
                rules: [
                  {
                    required: this.props.location.pathname !== '/institutionalUserManage/editUser',
                    message: '请输入合法密码',
                    min: 6,
                    max: 24,
                    whitespace: true,
                    validator: (rule, value, cb) => {
                      const state = checkedPassword(value)
                      if (state) {
                        cb('error')
                      } else {
                        cb()
                      }
                    },
                  },
                ],
              })(<Input type='password' placeholder="请输入密码" />)}
              <div>
                <a className="mr8" onClick={this.setPassword}>
                  随机生成
                </a>
                <a onClick={this.handleCopy}>复制</a>
              </div>
            </FormItem>
            <FormItem label="姓名" {...formItemLayout}>
              {getFieldDecorator('name', {
                initialValue: accountDetail.extendedProperties && JSON.parse(accountDetail.extendedProperties.replace(/'/g, '"')).name,
                rules: [
                  {
                    required: true,
                    message: '请输入姓名',
                    whitespace: true,
                    max: 20,
                  },
                ],
              })(<Input placeholder="姓名" />)}
            </FormItem>
            <FormItem label="手机号" {...formItemLayout}>
              {getFieldDecorator('tel', {
                initialValue: accountDetail.telephone,
                rules: [
                  {
                    required: true,
                    pattern: /^1[3-9]\d{9}$/,
                    message: '请输入正确的手机号',
                  },
                ],
              })(<Input placeholder="手机号" />)}
            </FormItem>
            <FormItem label="角色" {...formItemLayout}>
              {getFieldDecorator('role', {
                initialValue: accountDetail.role,
              })(
                <Select placeholder="请选择" disabled>
                  {roleData}
                </Select>
              )}
            </FormItem>
            <FormItem label="状态" {...formItemLayout}>
              {getFieldDecorator('status', {
                valuePropName: 'checked',
                initialValue: !accountDetail.status,
              })(<Checkbox>停用</Checkbox>)}
            </FormItem>
            <div className="btnclsb">
              <Button type="primary" htmlType="submit" className="mr64">
                确定
              </Button>
              <Link to="/institutionalUserManage/userManage">
                <Button>取消</Button>
              </Link>
            </div>
          </Form>
        </Card>
      </PageHeaderLayout>
    )
  }
}
