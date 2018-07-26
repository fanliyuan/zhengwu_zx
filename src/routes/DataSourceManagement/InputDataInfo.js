import React, { Component } from 'react'
import { Input, Card, Form, Button, Steps, Select } from 'antd'
import { routerRedux } from 'dva/router'
import { connect } from 'dva'

import PageHeaderLayout from '../../layouts/PageHeaderLayout'
import styles from './InputDataInfo.less'

const FormItem = Form.Item
const { Step } = Steps
const { Option } = Select
const { TextArea } = Input
@connect(({ inputData }) => ({
  inputData,
}))
@Form.create()
export default class InputDataInfo extends Component {
  state = {
    disabled: true,
  }

  componentDidMount() {
    if (this.props.location.pathname !== '/dataSourceManagement/checkDataInfo') {
      this.setState({
        disabled: false,
      })
    }
  }

  handleSubmit = () => {}

  handleNext = () => {
    const { dispatch } = this.props
    dispatch(routerRedux.push('/dataSourceManagement/setPlan'))
  }

  handleBack = () => {
    const { dispatch } = this.props
    dispatch(routerRedux.push('/dataSourceManagement/sourceManagement'))
  }

  render() {
    const { getFieldDecorator } = this.props.form
    const { disabled } = this.state
    const optionData = [
      { label: 'Youedata_dig', value: '0', id: '0' },
      { label: 'Youedata_hig', value: '1', id: '1' },
    ]
    const optionSelect = optionData.map(item => {
      return (
        <Option value={item.value} key={item.id} label={item.label}>
          {item.label}
        </Option>
      )
    })
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
    return (
      <PageHeaderLayout>
        <Card>
          <Steps current={0} className={styles.loadings}>
            <Step title="录入资源信息" />
            <Step title="设置同步计划" />
            <Step title="完成" />
          </Steps>
          <Form onSubmit={this.handleSubmit}>
            <FormItem label="选择数据库" {...formItemLayout}>
              {getFieldDecorator('dataBase', {
                rules: [
                  {
                    required: true,
                    message: '请选择数据库',
                  },
                ],
              })(<Select disabled={disabled}>{optionSelect}</Select>)}
            </FormItem>
            <FormItem label="类型" {...formItemLayout}>
              {getFieldDecorator('types')(<Input disabled={disabled} />)}
            </FormItem>
            <FormItem label="资源名称" {...formItemLayout}>
              {getFieldDecorator('sourceName')(<Input disabled={disabled} />)}
            </FormItem>
            <FormItem label="建库单位" {...formItemLayout}>
              {getFieldDecorator('buildUnit')(<Input disabled={disabled} />)}
            </FormItem>
            <FormItem label="应用系统名称" {...formItemLayout}>
              {getFieldDecorator('systemName')(<Input disabled={disabled} />)}
            </FormItem>
            <FormItem label="数据库描述" {...formItemLayout}>
              {getFieldDecorator('dataBaseDescription')(<TextArea row={4} />)}
            </FormItem>
            <FormItem label="负责人姓名" {...formItemLayout}>
              {getFieldDecorator('headerName')(<Input disabled={disabled} />)}
            </FormItem>
            <FormItem label="负责人手机号" {...formItemLayout}>
              {getFieldDecorator('headerNum')(<Input disabled={disabled} />)}
            </FormItem>
            <FormItem label="负责人职位" {...formItemLayout}>
              {getFieldDecorator('headerPosition')(<Input disabled={disabled} />)}
            </FormItem>
            <div className="btnclsb">
              {!disabled && (
                <Button type="primary" className="mr64" onClick={this.handleNext}>
                  下一步
                </Button>
              )}
              <Button onClick={this.handleBack}>返回</Button>
            </div>
          </Form>
        </Card>
      </PageHeaderLayout>
    )
  }
}
