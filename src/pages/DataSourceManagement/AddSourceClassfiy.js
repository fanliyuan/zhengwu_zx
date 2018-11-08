import React, { Component } from 'react'
import { Input, Card, Form, Button, Radio, Row, Col, Select } from 'antd'
import { connect } from 'dva'
import { routerRedux } from 'dva/router'

import PageHeaderLayout from '@/components/PageHeaderWrapper'
// import styles from './AddSourceClassfiy.less'

const FormItem = Form.Item
const RadioGroup = Radio.Group
const { Option } = Select
@Form.create()

@connect(({sourceClassfiy,loading}) => ({
  sourceClassfiy,
  loadings:loading.models.sourceClassfiy,
}))
export default class AddSourceClassfiy extends Component {
  state = {
    classifyName:'1',
    itemName:'1',
    detailName:'1',
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
    const classify = [{value:'1',label:'基础信息资源类'},{value:'2',label:'主题信息资源类'},{value:'3',label:'部门信息资源类'}]
    const classifyList = classify.map(item => {
      return <Option value={item.value} key={item.value}>{item.label}</Option>
    })
    const items = [{value:'1',label:'项1'},{value:'2',label:'项2'},{value:'3',label:'项3'}]
    const itemsList = items.map(item => {
      return <Option value={item.value} key={item.value}>{item.label}</Option>
    })
    const detail = [{value:'1',label:'项1'},{value:'2',label:'目2'},{value:'3',label:'目3'}]
    const detailList = detail.map(item => {
      return <Option value={item.value} key={item.value}>{item.label}</Option>
    })
    const { classifyName, itemName, detailName } = this.state
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
                initialValue:classifyName,
                rules: [
                  {
                    required: true,
                    message: '请选择分类名称',
                  },
                ],
              })(
                <Select onChange={this.handleChangeClassify}>
                  {classifyList}
                </Select>
              )}
                </FormItem>
              </Col>
              <Col span={3} style={{display:+getFieldValue('classify') === 1 ? 'none' : 'block' }}>
                <FormItem label="" {...formThreeItemLayout}>
                  {getFieldDecorator('item', {
                initialValue:itemName,
                rules: [
                  {
                    required: true,
                    message: '请选择项',
                  },
                ],
              })(
                <Select onChange={this.handleChangeClassify}>
                  {itemsList}
                </Select>
              )}
                </FormItem>
              </Col>
              <Col span={3} style={{display:+getFieldValue('classify') === 3 ? 'block' : 'none' }}>
                <FormItem label="" {...formThreeItemLayout}>
                  {getFieldDecorator('classfiyItem', {
                initialValue:detailName,
                rules: [
                  {
                    required: true,
                    message: '请选择目',
                  },
                ],
              })(
                <Select onChange={this.handleChangeClassify}>
                  {detailList}
                </Select>
              )}
                </FormItem>
              </Col>
            </Row>
            <FormItem label="编号" {...formItemLayout}>
              {getFieldDecorator('number',{
                initialValue:'',
              })(<Input placeholder="请输入编号" onKeyUp={this.handleNamePCheck} />)}
            </FormItem>
            <FormItem label="名称" {...formItemLayout}>
              {getFieldDecorator('names',{
                initialValue:'',
                rules:[{
                  required: true,
                  message:'请输入名称',
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
 