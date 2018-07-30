/*
 * @Author: ChouEric
 * @Date: 2018-07-10 10:04:02
 * @Last Modified by: ChouEric
 * @Last Modified time: 2018-07-23 21:41:56
 * @描述: 监控告警 -- 系统告警设置 -- 告警页面
*/
import React, { Component, Fragment } from 'react'
import { connect } from 'dva'
import { routerRedux } from 'dva/router'
import { Form, Input, Select, Checkbox, InputNumber, Button } from 'antd'

import PageHeaderLayout from '../../layouts/PageHeaderLayout'
import styles from './EditWarningOption.less'

const { Item } = Form
const itemLayout = {
  labelCol: {
    span: 2,
  },
  wrapperCol: {
    span: 22,
  },
}

@Form.create()
@connect()
export default class EditWarningOption extends Component {
  state = {
    name: '',
    target: '',
    threshold: 80,
    period: '',
    availability: false, // eslint-disable-line
  }

  handleSubmit = e => {
    e.preventDefault()
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values) // eslint-disable-line
      }
    })
  }

  availabilityChange = value => {
    this.setState({
      availability: !value, // eslint-disable-line
    })
  }

  render() {
    const { getFieldDecorator } = this.props.form
    const { name, target, threshold, period } = this.state
    const typeList = [
      {
        value: 0,
        label: 'CPU',
      },
      {
        value: 1,
        label: '内存',
      },
      {
        value: 2,
        label: '硬盘',
      },
      {
        value: 3,
        label: '网络',
      },
    ]

    const typeComs = typeList.map(item => (
      <Select.Option value={item.value} key={item.value}>
        {item.label}
      </Select.Option>
    ))

    return (
      <PageHeaderLayout>
        <div className="common-layout">
          <Form onSubmit={this.handleSubmit}>
            <Item {...itemLayout} label="告警名称">
              {getFieldDecorator('name', {
                initialValue: name,
                rules: [{ required: true, message: '请输入告警名称' }],
              })(<Input className={styles.input} />)}
            </Item>
            <Item {...itemLayout} label="告警对象">
              {getFieldDecorator('target', {
                initialValue: target,
                rules: [{ required: true, message: '请选择告警对象' }],
              })(<Select className={styles.input}>{typeComs}</Select>)}
            </Item>
            <Item {...itemLayout} label="告警阈值">
              {getFieldDecorator('threshold', {
                initialValue: threshold,
                rules: [{ required: true, message: '请选输入告警阈值' }],
              })(
                <InputNumber
                  max={100}
                  min={0}
                  formatter={val => `${val}%`}
                  parser={val => val.replace('%', '')}
                  />
              )}
            </Item>
            <Item {...itemLayout} label="检测周期">
              {getFieldDecorator('period', {
                initialValue: period,
                rules: [{ required: true, message: '请选输入告警阈值' }],
              })(
                <Fragment>
                  <Input className={styles.input1} />
                  <Select className={styles.select1}>
                    <Select.Option value={0}>分钟</Select.Option>
                    <Select.Option value={1}>小时</Select.Option>
                  </Select>
                </Fragment>
              )}
            </Item>
            <Item label="是否有效" {...itemLayout}>
              <Checkbox onChange={this.availabilityChange} />
            </Item>
            <Item style={{ textAlign: 'center' }}>
              <Button type="primary" htmlType="submit" className="mr64">
                提交
              </Button>
              {/* <Link to='/monitor/node'><Button>取消</Button></Link> */}
              <Button
                onClick={() => this.props.dispatch(routerRedux.push('/monitor/node', 'option'))}
                >
                取消
              </Button>
            </Item>
          </Form>
        </div>
      </PageHeaderLayout>
    )
  }
}
