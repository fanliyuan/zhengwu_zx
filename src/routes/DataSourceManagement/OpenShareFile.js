import React, { Component } from 'react';
import { Input, Card, Form, Button, Cascader, Radio, Checkbox, Select } from 'antd';

import PageHeaderLayout from '../../layouts/PageHeaderLayout';
// import styles from './OpenShareFile.less';

const FormItem = Form.Item;
const InputGroup = Input.Group;
const RadioGroup = Radio.Group;
const { Option } = Select;
const CheckboxGroup = Checkbox.Group;
@Form.create()
export default class OpenShareFile extends Component {
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
    const optionData = [
      { label: '定时', value: '0', id: 0 },
      { label: '实时', value: '1', id: 1 },
      { label: '手动', value: '2', id: 2 },
    ];
    const optionSelect = optionData.map(item => {
      return (
        <Option value={item.value} key={item.id} label={item.label}>
          {item.label}
        </Option>
      );
    });
    const options = [
      {
        value: '0',
        label: '增量',
        children: [
          {
            value: '0-0',
            label: '日志',
          },
          {
            value: '0-1',
            label: '标志位',
          },
          {
            value: '0-2',
            label: '时间戳',
          },
        ],
      },
      {
        value: '1',
        label: '全量',
        children: [
          {
            value: '1-0',
            label: '日志',
          },
          {
            value: '1-1',
            label: '标志位',
          },
          {
            value: '1-2',
            label: '时间戳',
          },
        ],
      },
    ];
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
            <FormItem label="订阅是否审核" {...formItemLayout}>
              {getFieldDecorator('isAudit')(
                <RadioGroup>
                  <Radio value={0}>是</Radio>
                  <Radio value={1}>否</Radio>
                </RadioGroup>
              )}
            </FormItem>
            <FormItem label="发布模式" {...formItemLayout}>
              {getFieldDecorator('types')(<Cascader options={options} />)}
            </FormItem>
            <FormItem label="发布频率" {...formItemLayout}>
              {getFieldDecorator('rate')(<Select>{optionSelect}</Select>)}
            </FormItem>
            <FormItem label="定时设置" {...formItemLayout}>
              <InputGroup compact>
                {getFieldDecorator('setTime')(
                  <Input style={{ width: '20%' }} placeholder="分钟" />
                )}
                {getFieldDecorator('setTime1')(
                  <Input style={{ width: '20%' }} placeholder="小时" />
                )}
                {getFieldDecorator('setTime2')(<Input style={{ width: '20%' }} placeholder="天" />)}
                {getFieldDecorator('setTime3')(<Input style={{ width: '20%' }} placeholder="月" />)}
                {getFieldDecorator('setTime4')(
                  <Input style={{ width: '20%' }} placeholder="星期" />
                )}
              </InputGroup>
            </FormItem>
            <FormItem {...submitLayout}>
              <Button type="primary" style={{ marginRight: 20 }}>
                返回
              </Button>
              <Button type="primary" htmlType="submit">
                保存
              </Button>
            </FormItem>
          </Form>
        </Card>
      </PageHeaderLayout>
    );
  }
}
