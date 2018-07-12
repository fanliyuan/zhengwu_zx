import React, { Component } from 'react';
import { Input, Card, Form, Button, Steps, Select, Cascader, InputNumber } from 'antd';

import PageHeaderLayout from '../../layouts/PageHeaderLayout';
import styles from './FtpSetPlan.less';

const FormItem = Form.Item;
const { Step } = Steps;
const { Option } = Select;
const InputGroup = Input.Group;
@Form.create()
export default class FtpSetPlan extends Component {
  state = {
    minutes:'',
    hours:'',
    day:'',
    month:'',
    week:'',
  }

  setInputs = () => {
    const { setFieldValue } = this.props.form;
    const { minutes, hours, day, month, week } = this.state;
    const timeInfo = [minutes, hours, day, month, week];
    setFieldValue('setTime',timeInfo);
  }

  handleSubmit = () => {

  }

  render () {
    const { getFieldDecorator } = this.props.form;
    const { minutes, hours, day, month, week } = this.state;
    const optionData = [{label:'定时',value:'0',id:0},{label:'实时',value:'1',id:1},{label:'手动',value:'2',id:2}];
    const optionSelect = optionData.map(item => {
      return (<Option value={item.value} key={item.id} label={item.label}>{item.label}</Option>)
    })
    const options = [
      {
        value:'0',
        label:'增量',
        children:[
          {
            value:'0-0',
            label:'日志',
          },
          {
            value:'0-1',
            label:'标志位',
          },
          {
            value:'0-2',
            label:'时间戳',
          },
        ],
      },
      {
        value:'1',
        label:'全量',
        children:[
          {
            value:'1-0',
            label:'日志',
          },
          {
            value:'1-1',
            label:'标志位',
          },
          {
            value:'1-2',
            label:'时间戳',
          },
        ],
      },
    ];
    const formItemLayout = {
      labelCol:{
        xs:{span:24},
        sm:{span:7},
      },
      wrapperCol:{
        xs:{span:24},
        sm:{span:12},
        md:{span:10},
      },
    };
    const submitLayout = {
      wrapperCol:{
        xs:{span:24,offset:0},
        sm:{span:10,offset:7},
      },
    }
    return (
      <PageHeaderLayout>
        <Card>
          <Steps current={1} className={styles.loadings}>
            <Step title="录入资源信息" />
            <Step title="设置同步计划" />
            <Step title="完成" />
          </Steps>
          <Form onSubmit={this.handleSubmit}>
            <FormItem label="同步模式" {...formItemLayout}>
              {
                getFieldDecorator('types')(
                  <Cascader options={options} />
                )
              }
            </FormItem>
            <FormItem label="同步频率" {...formItemLayout}>
              {
                getFieldDecorator('rate')(
                  <Select>
                    {optionSelect}
                  </Select>
                )
              }
            </FormItem>
            <FormItem label="定时设置" {...formItemLayout}>
              {
                getFieldDecorator('setTime')(
                  <InputGroup compact>
                    <Input style={{width:'20%'}} placeholder="分钟" onChange={this.setInputs} defaultValue={minutes} />
                    <Input style={{width:'20%'}} placeholder="小时" defaultValue={hours} onChange={this.setInputs} />
                    <Input style={{width:'20%'}} placeholder="天" defaultValue={day} onChange={this.setInputs} />
                    <Input style={{width:'20%'}} placeholder="月" defaultValue={month} onChange={this.setInputs} />
                    <Input style={{width:'20%'}} placeholder="星期" defaultValue={week} onChange={this.setInputs} />
                  </InputGroup>
                )
              }
            </FormItem>
            <FormItem label="自动停止" extra="0次代表永不停止" {...formItemLayout}>
              <span>报错 </span>
              {
                getFieldDecorator('autoStop')(
                  <InputNumber />
                )
              }
              <span> 次后自动停止服务</span>
            </FormItem>
            <FormItem {...submitLayout}>
              <Button type="primary" style={{marginRight:20}}>上一步</Button>
              <Button type="primary" htmlType="submit">提交</Button>
            </FormItem>
          </Form>
        </Card>
      </PageHeaderLayout>
    )
  }
}