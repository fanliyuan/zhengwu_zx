import React, { Component } from 'react'
import { Input, Card, Form, Button } from 'antd'
import { connect } from 'dva'
import { routerRedux } from 'dva/router'

import PageHeaderLayout from '@/components/PageHeaderWrapper'
// import styles from './AddSourceClassfiy.less'

const FormItem = Form.Item
const { TextArea } = Input
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
    dispatch(routerRedux.push('/institutionalUserManage/institutionalManage'))
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
            <FormItem label="机构名称" {...formItemLayout}>
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
            {/* <FormItem label="排序" {...formItemLayout}>
              {getFieldDecorator('deptOrder', {
                initialValue:getItemByIdInfo.deptOrder !== undefined && !addAction ? +getItemByIdInfo.deptOrder :99,
                rules: [
                  {
                    required: true,
                    message: '请输入排序',
                  },
                ],
              })(<InputNumber />)}
            </FormItem> */}
            <FormItem label="联系人" {...formItemLayout}>
              {getFieldDecorator('chargeUser',{
                initialValue:'',
              })(<Input placeholder="姓名" onKeyUp={this.handleNamePCheck} />)}
            </FormItem>
            <FormItem label="联系人手机" {...formItemLayout}>
              {getFieldDecorator('chargePhone',{
                initialValue:'',
                rules:[{
                  pattern:/^1[345789]\d{9}$/,
                  message:'请输入正确手机号码格式',
                }],
              })(<Input placeholder="11位数字" />)}
            </FormItem>
            <FormItem label="详细地址" {...formItemLayout}>
              {getFieldDecorator('detailAddress',{
                initialValue:'',
              })(<TextArea row={4} />)}
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
 