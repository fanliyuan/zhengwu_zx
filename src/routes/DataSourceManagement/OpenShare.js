import React, { Component } from 'react';
import { Input, Card, Form, Button, InputNumber, Radio, Checkbox } from 'antd';

import PageHeaderLayout from '../../layouts/PageHeaderLayout';
// import styles from './OpenShare.less';

const FormItem = Form.Item;
const InputGroup = Input.Group;
const RadioGroup = Radio.Group;
const CheckboxGroup = Checkbox.Group;
@Form.create()
export default class OpenShare extends Component {
  state = {};

  setInputs = () => {
    const { setFieldValue } = this.props.form;
    const { minutes, hours, day, month, week } = this.state;
    const timeInfo = [minutes, hours, day, month, week];
    setFieldValue('setTime', timeInfo);
  };

  handleSubmit = () => {};

  render() {
    const { getFieldDecorator } = this.props.form;
    const plainOptions = ['交换域1', '交换域2', '交换域3'];
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
            <FormItem label="是否开放" {...formItemLayout}>
              {getFieldDecorator('isOpen')(
                <RadioGroup>
                  <Radio value={0}>是</Radio>
                  <Radio value={1}>否</Radio>
                </RadioGroup>
              )}
            </FormItem>
            <FormItem label="是否共享" {...formItemLayout}>
              {getFieldDecorator('isShare')(
                <RadioGroup>
                  <Radio value={0}>是</Radio>
                  <Radio value={1}>否</Radio>
                </RadioGroup>
              )}
            </FormItem>
            <FormItem label="交换域" {...formItemLayout}>
              <InputGroup compact>
                {getFieldDecorator('switchArea')(<CheckboxGroup options={plainOptions} />)}
              </InputGroup>
            </FormItem>
            <FormItem label="自动停止" extra="0次代表永不停止" {...formItemLayout}>
              <span>报错 </span>
              {getFieldDecorator('autoStop')(<InputNumber />)}
              <span> 次后自动停止服务</span>
            </FormItem>
            <FormItem {...submitLayout}>
              <Button type="primary" style={{ marginRight: 20 }}>
                上一步
              </Button>
              <Button type="primary" htmlType="submit">
                提交
              </Button>
            </FormItem>
          </Form>
        </Card>
      </PageHeaderLayout>
    );
  }
}
