import React, { Component } from 'react';
import { Input, Card, Form, Button, Steps, Select } from 'antd';

import PageHeaderLayout from '../../layouts/PageHeaderLayout';
import styles from './AddDirectory.less';

const FormItem = Form.Item;
const { Step } = Steps;
const { Option } = Select;
const { TextArea } = Input;
@Form.create()
export default class InputDataInfo extends Component {
  state = {};

  handleSubmit = () => {};

  render() {
    const { getFieldDecorator } = this.props.form;
    const optionData = [
      { label: '分类1', value: '0', id: '0' },
      { label: '分类2', value: '1', id: '1' },
    ];
    const optionSelect = optionData.map(item => {
      return (
        <Option value={item.value} key={item.id} label={item.label}>
          {item.label}
        </Option>
      );
    });
    const optionData1 = [
      { label: '数据库', value: '0', id: 0 },
      { label: '电子文件', value: '1', id: 1 },
      { label: '表格', value: '2', id: 2 },
      { label: '图形图像', value: '3', id: 3 },
      { label: '流媒体', value: '4', id: 4 },
      { label: '自定义', value: '5', id: 5 },
    ];
    const optionSelect1 = optionData1.map(item => {
      return (
        <Option value={item.value} key={item.id} label={item.label}>
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
          <Steps current={0} className={styles.loadings}>
            <Step title="填写目录资源内容" />
            <Step title="编辑信息项" />
            <Step title="完成" />
          </Steps>
          <Form onSubmit={this.handleSubmit}>
            <FormItem label="名称" {...formItemLayout}>
              {getFieldDecorator('name')(<Input />)}
            </FormItem>
            <FormItem label="摘要" {...formItemLayout}>
              {getFieldDecorator('summary')(<TextArea row={4} />)}
            </FormItem>
            <FormItem label="分类" {...formItemLayout}>
              {getFieldDecorator('classify', {
                rules: [
                  {
                    required: true,
                    message: '请选择分类',
                  },
                ],
              })(<Select>{optionSelect}</Select>)}
            </FormItem>
            <FormItem label="提供方名称" {...formItemLayout}>
              {getFieldDecorator('provider')(<Input />)}
            </FormItem>
            <FormItem label="提供方内部部门" {...formItemLayout}>
              {getFieldDecorator('providerDepart')(<Input />)}
            </FormItem>
            <FormItem label="资源提供方代码" {...formItemLayout}>
              {getFieldDecorator('providerCode')(<Input />)}
            </FormItem>
            <FormItem label="信息资源编码" {...formItemLayout} extra="编码规则说明">
              {getFieldDecorator('infoCode')(<Input />)}
            </FormItem>
            <FormItem label="信息资源格式" {...formItemLayout}>
              {getFieldDecorator('infoType')(<Select>{optionSelect1}</Select>)}
            </FormItem>
            <FormItem {...submitLayout}>
              <Button type="primary" htmlType="submit" style={{ marginRight: 20 }}>
                下一步
              </Button>
            </FormItem>
          </Form>
        </Card>
      </PageHeaderLayout>
    );
  }
}
