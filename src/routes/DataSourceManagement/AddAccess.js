import React, { Component } from 'react'
import { Input, Card, Form, Button, Cascader, message } from 'antd'
import { connect } from 'dva'
import { routerRedux } from 'dva/router'

import PageHeaderLayout from '../../layouts/PageHeaderLayout'
// import styles from './AddAccess.less';

const FormItem = Form.Item
@connect(({ addAccess }) => ({
  addAccess,
}))
@Form.create()
export default class AddAccess extends Component {
  state = {}

  handleSubmit = e => {
    e.preventDefault()
    message.success('提交成功, 即将跳转')
    setTimeout(() => {
      this.props.dispatch(routerRedux.push('/dataSourceManagement/accessManagement'))
    }, 1000)
  }

  handleBack = () => {
    const { dispatch } = this.props
    dispatch(routerRedux.push('/dataSourceManagement/accessManagement'))
  }

  render() {
    const { getFieldDecorator, getFieldValue } = this.props.form
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
    const options = [
      {
        label: '半结构化存储',
        value: '0',
        children: [
          {
            label: 'FTP',
            value: '0-0',
          },
          {
            label: 'SFTP',
            value: '0-1',
          },
          {
            label: '本地文件',
            value: '0-2',
          },
        ],
      },
      {
        label: '关系型数据库',
        value: '1',
        children: [
          {
            label: 'Oracle',
            value: '0-0',
          },
          {
            label: 'SQLServer',
            value: '0-1',
          },
          {
            label: 'Mysql',
            value: '0-2',
          },
          {
            label: 'Kingbase',
            value: '0-3',
          },
          {
            label: 'DM',
            value: '0-4',
          },
        ],
      },
    ]
    return (
      <PageHeaderLayout>
        <Card>
          <Form onSubmit={this.handleSubmit}>
            <FormItem label="名称" {...formItemLayout}>
              {getFieldDecorator('name')(<Input placeholder="名称" />)}
            </FormItem>
            <FormItem
              label="类型"
              {...formItemLayout}
              extra={
                getFieldValue('types') && getFieldValue('types')[1].slice(-1) === '2'
                  ? '选择本地文件后,在资源注册时直接选择本地文件即可'
                  : ''
              }
            >
              {getFieldDecorator('types')(<Cascader options={options} />)}
            </FormItem>
            <FormItem
              label="FTP地址"
              {...formItemLayout}
              style={{
                display:
                  getFieldValue('types') && getFieldValue('types')[1].slice(-1) === '2'
                    ? 'none'
                    : getFieldValue('types') && getFieldValue('types')[0] === '0'
                      ? 'block'
                      : 'none',
              }}
            >
              {getFieldDecorator('address')(<Input />)}
            </FormItem>
            <FormItem
              label="FTP端口"
              {...formItemLayout}
              style={{
                display:
                  getFieldValue('types') && getFieldValue('types')[1].slice(-1) === '2'
                    ? 'none'
                    : getFieldValue('types') && getFieldValue('types')[0] === '0'
                      ? 'block'
                      : 'none',
              }}
            >
              {getFieldDecorator('port')(<Input />)}
            </FormItem>
            <FormItem
              label="用户名"
              {...formItemLayout}
              style={{
                display:
                  getFieldValue('types') && getFieldValue('types')[1].slice(-1) === '2'
                    ? 'none'
                    : getFieldValue('types') && getFieldValue('types')[0] === '0'
                      ? 'block'
                      : 'none',
              }}
            >
              {getFieldDecorator('userName')(<Input />)}
            </FormItem>
            <FormItem
              label="密码"
              {...formItemLayout}
              style={{
                display:
                  getFieldValue('types') && getFieldValue('types')[1].slice(-1) === '2'
                    ? 'none'
                    : getFieldValue('types') && getFieldValue('types')[0] === '0'
                      ? 'block'
                      : 'none',
              }}
            >
              {getFieldDecorator('psd')(<Input type="password" />)}
            </FormItem>
            <FormItem
              label="数据库地址"
              {...formItemLayout}
              style={{
                display:
                  getFieldValue('types') && getFieldValue('types')[1].slice(-1) === '2'
                    ? 'none'
                    : getFieldValue('types') && getFieldValue('types')[0] === '1'
                      ? 'block'
                      : 'none',
              }}
            >
              {getFieldDecorator('dataBaseAddress')(<Input />)}
            </FormItem>
            <FormItem
              label="数据库端口"
              {...formItemLayout}
              style={{
                display:
                  getFieldValue('types') && getFieldValue('types')[1].slice(-1) === '2'
                    ? 'none'
                    : getFieldValue('types') && getFieldValue('types')[0] === '1'
                      ? 'block'
                      : 'none',
              }}
            >
              {getFieldDecorator('dataBasePort')(<Input />)}
            </FormItem>
            <FormItem
              label="数据库用户名"
              {...formItemLayout}
              style={{
                display:
                  getFieldValue('types') && getFieldValue('types')[1].slice(-1) === '2'
                    ? 'none'
                    : getFieldValue('types') && getFieldValue('types')[0] === '1'
                      ? 'block'
                      : 'none',
              }}
            >
              {getFieldDecorator('dataBaseUserName')(<Input />)}
            </FormItem>
            <FormItem
              label="数据库密码"
              {...formItemLayout}
              style={{
                display:
                  getFieldValue('types') && getFieldValue('types')[1].slice(-1) === '2'
                    ? 'none'
                    : getFieldValue('types') && getFieldValue('types')[0] === '1'
                      ? 'block'
                      : 'none',
              }}
            >
              {getFieldDecorator('dataBasePassword')(<Input type="password" />)}
            </FormItem>
            <FormItem
              label="连通性测试"
              {...formItemLayout}
              style={{
                display:
                  getFieldValue('types') && getFieldValue('types')[1].slice(-1) === '2'
                    ? 'none'
                    : 'block',
              }}
            >
              <a onClick={() => message.info('点击了测试')}>测试</a>
            </FormItem>

            {/* <FormItem {...submitLayout}>
              <span>选择本地文件后,在资源注册时直接选择本地文件即可</span>
            </FormItem> */}
            <div className="btnclsb">
              <Button type="primary" htmlType="submit" className="mr64">
                保存
              </Button>
              <Button onClick={this.handleBack}>取消</Button>
            </div>
          </Form>
        </Card>
      </PageHeaderLayout>
    )
  }
}
