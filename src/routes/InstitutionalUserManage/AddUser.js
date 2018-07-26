import React, { Component } from 'react';
import { Card, Input, Button, Form, Select, Checkbox } from 'antd';

// import styles from './AddUser.less';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';

const FormItem = Form.Item;
const { Option } = Select;
@Form.create()
export default class AddUser extends Component {
  state = {};

  handleSubmit = () => {};

  render() {
    const { getFieldDecorator } = this.props.form;
    const role = [
      { value: '0', label: '管理员', id: '0' },
      { value: '1', label: '审核员', id: '1' },
    ];
    const roleData = role.map(item => {
      return (
        <Option value={item.value} label={item.label} key={item.id}>
          {item.label}
        </Option>
      );
    });
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
    };
    const submitLayout = {
      wrapperCol: {
        xs: { span: 24, offset: 0 },
        sm: { span: 10, offset: 7 },
      },
    };
    return (
      <PageHeaderLayout>
        <Card>
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
              {getFieldDecorator('passwords', {
                rules: [
                  {
                    required: true,
                    message: '请输入密码',
                  },
                ],
              })(<Input placeholder="请输入密码" type="password" />)}
              <div>
                <a className="mr8">随机生成</a>
                <a>复制</a>
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
            <FormItem {...submitLayout}>
              <Button type="primary" htmlType="submit">
                确定
              </Button>
            </FormItem>
          </Form>
        </Card>
      </PageHeaderLayout>
    );
  }
}
