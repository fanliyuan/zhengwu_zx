import React, { Component } from 'react'
import { Input, Card, Form, Button, Steps, Select, Cascader, InputNumber, message, Tooltip, Icon } from 'antd'
import { connect } from 'dva'
import { routerRedux } from 'dva/router'

import PageHeaderLayout from '../../layouts/PageHeaderLayout'
import styles from './SetPlan.less'

const FormItem = Form.Item
const { Step } = Steps
const { Option } = Select
const InputGroup = Input.Group
@connect(({ setPlan }) => ({
  setPlan,
}))
@Form.create() // eslint-disable-line
export default class SetPlan extends Component {
  state = {
    disabled: true,
  }

  componentDidMount() {
    if (this.props.location.pathname !== '/dataSourceManagement/checkPlan') {
      this.setState({
        disabled: false,
      })
    }
  }

  handleSubmit = e => {
    e.preventDefault()
    message.success('提交成功, 即将跳转')
    setTimeout(() => {
      this.props.dispatch(routerRedux.push('/dataSourceManagement/sourceManagement'))
    }, 1000)
  }

  handlePre = () => {
    const { dispatch } = this.props
    if (!this.state.disabled) {
      dispatch(routerRedux.push('/dataSourceManagement/inputDataInfo'))
    } else {
      dispatch(routerRedux.push('/dataSourceManagement/checkDataInfo'))
    }
  }

  handleGoBack = () => {
    const { dispatch } = this.props
    dispatch(routerRedux.push('/dataSourceManagement/sourceManagement'))
  }

  render() {
    const { getFieldDecorator } = this.props.form
    const { disabled } = this.state
    const optionData = [
      { label: '定时', value: '0', id: 0 },
      { label: '实时', value: '1', id: 1 },
      { label: '手动', value: '2', id: 2 },
    ]
    const optionSelect = optionData.map(item => {
      return (
        <Option value={item.value} key={item.id} label={item.label}>
          {item.label}
        </Option>
      )
    })
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
    ]
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
          <Steps current={1} className={styles.loadings}>
            <Step title="录入资源信息" />
            <Step title="设置同步计划" />
            <Step title="完成" />
          </Steps>
          <Form onSubmit={this.handleSubmit}>
            <FormItem label="同步模式" {...formItemLayout}>
              {getFieldDecorator('types')(<Cascader options={options} disabled={disabled} />)}
            </FormItem>
            <FormItem label="同步频率" {...formItemLayout}>
              {getFieldDecorator('rate')(<Select disabled={disabled}>{optionSelect}</Select>)}
            </FormItem>
            <FormItem 
              label="定时设置"
              {...formItemLayout}
              extra={
                <span style={{color:'#007ACC'}}>
                  是否新建目录&nbsp;
                  <Tooltip title="说明:可输入数字，语法如下：“*” 代表取值范围内的全部数字,“/” 代表“每”,“-” 代表从某个数字到某个数字,“,” 分开几个离散的数字">
                    <Icon type="question-circle-o" />
                  </Tooltip>
                </span>
              }
              >
              <InputGroup compact>
                <Input style={{ width: '20%' }} placeholder="分钟" disabled={disabled} />
                <Input style={{ width: '20%' }} placeholder="小时" disabled={disabled} />
                <Input style={{ width: '20%' }} placeholder="天" disabled={disabled} />
                <Input style={{ width: '20%' }} placeholder="月" disabled={disabled} />
                <Input style={{ width: '20%' }} placeholder="星期" disabled={disabled} />
              </InputGroup>
            </FormItem>
            <FormItem label="自动停止" extra="0次代表永不停止" {...formItemLayout}>
              <span>报错 </span>
              {getFieldDecorator('autoStop')(<InputNumber disabled={disabled} />)}
              <span> 次后自动停止服务</span>
            </FormItem>
            <div className="btnclsb">
              <Button className="mr64" onClick={this.handlePre}>
                上一步
              </Button>
              {!disabled ? (
                <Button type="primary" htmlType="submit">
                  提交
                </Button>
              ) : (
                <Button type="primary" onClick={this.handleGoBack}>
                  返回
                </Button>
              )}
            </div>
          </Form>
        </Card>
      </PageHeaderLayout>
    )
  }
}
