import React, { Component } from 'react'
import { connect } from 'dva'
import { Link } from 'dva/router'
import { Card, Input, Button, Form, Select, Checkbox, message } from 'antd'
import copy from 'copy-to-clipboard'

// import styles from './AddUser.less';
import PageHeaderLayout from '../../layouts/PageHeaderLayout'

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


@connect(({ accounts, loading }) => ({accounts, loading: loading.models.accounts}))
@Form.create()
export default class AddUser extends Component {
  state = {}

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
        this.props.dispatch({
          type: 'accounts/addAccount',
          payload: {
            accountName: value.userName,
            accountPasswd: value.password,
            telephone: value.tel,
          },
        })
      }
    })
  }

  render() {
    const { loading } = this.props 
    const { getFieldDecorator } = this.props.form
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
                rules: [
                  {
                    required: true,
                    message: '请输入用户名',
                  },
                ],
              })(<Input placeholder="请输入用户名" />)}
            </FormItem>
            <FormItem label="密码" {...formItemLayout}>
              {getFieldDecorator('password', {
                rules: [
                  {
                    required: true,
                    message: '请输入密码',
                  },
                ],
              })(<Input placeholder="请输入密码" />)}
              <div>
                <a className="mr8" onClick={this.setPassword}>
                  随机生成
                </a>
                <a onClick={this.handleCopy}>复制</a>
              </div>
            </FormItem>
            <FormItem label="姓名" {...formItemLayout}>
              {getFieldDecorator('name', {
                rules: [
                  {
                    required: true,
                    message: '请输入姓名',
                  },
                ],
              })(<Input placeholder="姓名" />)}
            </FormItem>
            <FormItem label="手机号" {...formItemLayout}>
              {getFieldDecorator('tel', {
                rules: [
                  {
                    required: true,
                    message: '请输入手机号',
                  },
                ],
              })(<Input placeholder="手机号" />)}
            </FormItem>
            <FormItem label="角色" {...formItemLayout}>
              {getFieldDecorator('role')(
                <Select placeholder="请选择" disabled>
                  {roleData}
                </Select>
              )}
            </FormItem>
            <FormItem label="状态" {...formItemLayout}>
              {getFieldDecorator('status')(<Checkbox>停用</Checkbox>)}
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
