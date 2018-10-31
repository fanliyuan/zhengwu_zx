import React, { Component } from 'react'
import { Input, Card, Form, Button, Radio, Row, Col } from 'antd'
import { connect } from 'dva'
import { routerRedux } from 'dva/router'

import PageHeaderLayout from '@/components/PageHeaderWrapper'
// import styles from './AddSourceClassfiy.less'

const FormItem = Form.Item
const RadioGroup = Radio.Group
@Form.create()

@connect(({sourceClassfiy,loading}) => ({
  sourceClassfiy,
  loadings:loading.models.sourceClassfiy,
}))
export default class AddSourceClassfiy extends Component {
  state = {

  }

  componentDidMount = async() => {

  }

  handleSubmit = (e) => {
    e.preventDefault()
    this.props.form.validateFieldsAndScroll((err, values) => {
      if(!err){
        console.log(values) // eslint-disable-line
      }
    })
  }

  handleProChange = () => {

  }

  handleCityChange = () => {

  }

  handleCancel = () => {
    const { dispatch } = this.props
    dispatch(routerRedux.push('/dataSourceManagement/sourceClassfiy'))
  }

  handleNameCheck = () => {

  }

  handleNameSameCheck = async() => {

  }

  handleNamePCheck = () => {

  }

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
    const formThreeItemLayout1 = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 5,offset:0 },
        md: { span: 4 },
        lg: { span: 5,offset:0 },
        xl:{ span: 5,offset:0 },
      },
      wrapperCol: {
        xs: { span: 17 },
        sm: { span: 17 },
        md: { span: 19 },
        lg: { span: 17 },
        xl:{ span: 17 },
      },
    }
    const formThreeItemLayout = {
      wrapperCol: {
        xs: { span: 22 },
        sm: { span: 22 },
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
            <FormItem label="类别" {...formItemLayout}>
              {getFieldDecorator('classify', {
                initialValue:1,
                rules: [
                  {
                    required: true,
                    message: '请选择类别',
                  },
                ],
              })(
                <RadioGroup onChange={this.onChange}>
                  <Radio value={1}>项</Radio>
                  <Radio value={2}>目</Radio>
                  <Radio value={3}>细目</Radio>
                </RadioGroup>)}
            </FormItem>
            <Row>
              <Col sm={{span:4,offset:4}} md={{span:4,offset:5}} lg={{span:4,offset:5}} xl={{span:4,offset:6}}>
                <FormItem label="父级" {...formThreeItemLayout1}>
                  {getFieldDecorator('parentName', {
                initialValue:'',
                rules: [
                  {
                    required: true,
                    message: '请输入机构名称',
                  },
                ],
              })(<Input placeholder="机构名称" onKeyUp={this.handleNameCheck} onBlur={this.handleNameSameCheck} />)}
                </FormItem>
              </Col>
              <Col span={3}>
                <FormItem label="" {...formThreeItemLayout}>
                  {getFieldDecorator('deptName', {
                initialValue:'',
                rules: [
                  {
                    required: true,
                    message: '请输入机构名称',
                  },
                ],
              })(<Input placeholder="机构名称" onKeyUp={this.handleNameCheck} onBlur={this.handleNameSameCheck} />)}
                </FormItem>
              </Col>
              <Col span={3}>
                <FormItem label="" {...formThreeItemLayout}>
                  {getFieldDecorator('deptName', {
                initialValue:'',
                rules: [
                  {
                    required: true,
                    message: '请输入机构名称',
                  },
                ],
              })(<Input placeholder="机构名称" onKeyUp={this.handleNameCheck} onBlur={this.handleNameSameCheck} />)}
                </FormItem>
              </Col>
            </Row>
            <FormItem label="编号" {...formItemLayout}>
              {getFieldDecorator('chargeUser',{
                initialValue:'',
              })(<Input placeholder="请输入编号" onKeyUp={this.handleNamePCheck} />)}
            </FormItem>
            <FormItem label="名称" {...formItemLayout}>
              {getFieldDecorator('chargePhone',{
                initialValue:'',
                rules:[{
                  pattern:/^1[345789]\d{9}$/,
                  message:'请输入正确手机号码格式',
                }],
              })(<Input placeholder="请输入名称" />)}
            </FormItem>
            <FormItem {...submitLayout}>
              <Button type="primary" htmlType="submit" style={{ marginRight: 20 }}>
                确定
              </Button>
              <Button onClick={this.handleCancel}>取消</Button>
            </FormItem>
          </Form>
        </Card>
      </PageHeaderLayout>
    )
  }
}
 