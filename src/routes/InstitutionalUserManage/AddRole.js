import React, { Component } from 'react'
import { Input, Card, Form, Button } from 'antd'

import PageHeaderLayout from '../../layouts/PageHeaderLayout'
// import styles from './AddInstitution.less';

const FormItem = Form.Item
const { TextArea } = Input
@Form.create()
export default class AddRole extends Component {
  state = {}

  handleSubmit = () => {}

  render() {
    const { getFieldDecorator } = this.props.form
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
    const submitLayout = {
      wrapperCol: {
        xs: { span: 24, offset: 0 },
        sm: { span: 10, offset: 7 },
      },
    }
    return (
      <PageHeaderLayout>
        <Card>
          <Form onSubmit={this.handleSubmit}>
            <FormItem label="角色名称" {...formItemLayout}>
              {getFieldDecorator('roleName', {
                rules: [
                  {
                    required: true,
                    message: '请输入角色名称',
                  },
                ],
              })(<Input />)}
            </FormItem>
            <FormItem label="角色说明" {...formItemLayout}>
              {getFieldDecorator('roleInstruction')(<TextArea />)}
            </FormItem>
            <FormItem {...submitLayout}>
              <Button type="primary" htmlType="submit" style={{ marginRight: 20 }}>
                保存
              </Button>
              <Button type="primary">取消</Button>
            </FormItem>
          </Form>
        </Card>
      </PageHeaderLayout>
    )
  }
}
