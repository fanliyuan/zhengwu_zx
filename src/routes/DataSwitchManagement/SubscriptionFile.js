/*
 * @Author: ChouEric
 * @Date: 2018-07-13 16:15:18
 * @Last Modified by: ChouEric
 * @Last Modified time: 2018-07-13 17:53:55
 * @描述: 数据交换管理 -- 资源订阅 -- 资源集市 -- 订阅(文件)
*/
import React, { Component, Fragment } from 'react'
import { Link } from 'dva/router'
import { Form, Input, Select, Radio, InputNumber, Button, Tooltip, Icon } from 'antd'

import PageHeaderLayout from '../../layouts/PageHeaderLayout'
import styles from './SubscriptionFile.less'

const { Item } = Form
const itemLayout = {
  labelCol: {
    span: 2,
  },
  wrapperCol: {
    span: 10,
  },
}

function ButtonList(props) {
  const { onClick = ()=>{}, disabled = false } = props
  return (
    <div className='clearfix' >
      <Link to='/dataSwitchManagement/sourceSubscription' className='fr' ><Button type='primary' >返回</Button></Link>
      <Button type='primary' onClick={onClick} disabled={disabled} className='fr mr16' >确定</Button>
    </div>
  )
}

function hasErrors(errors) {
  return Object.keys(errors).some(item => errors[item])
}

// 禁用鼠标右键
// function onContextMenu(e) {
//   e.preventDefault()
//   return false;
// }

@Form.create()
export default class SubscriptionFile extends Component {
  state = {
    name: '',
    method: 0,
    rateType: 0,
    rateOptions: {},
    path: '',
    floder: false,
  }

  componentDidMount() {
    this.props.form.validateFields()
  }

  handleSave = () => {

  }

  render() {
    // const { name, method, rateType, rateOptions, path, floder } = this.state
    const { getFieldDecorator, isFieldTouched, getFieldError, getFieldsError } = this.props.form

    const nameError = (isFieldTouched('name') && getFieldError('name')) || (isFieldTouched('name1') && getFieldError('name1'))

    return (
      <PageHeaderLayout>
        <div className='common-layout' >
          <div>
            <ButtonList onClick={this.handleSave} disabled={hasErrors(getFieldsError())} />
          </div>
          <Form>
            <Item {...itemLayout} label='订阅名称' validateStatus={nameError?'error':''} help={nameError?'请输入名称':''} >
              {
                getFieldDecorator('name', {
                  rules: [{ required: true, message: '请输入名称' }],
                })(
                  <Input className={styles.input} />
                )
              }
              <span className={styles.span2} ><span className={styles.label} >目录名称</span>:<span className={styles.value} >石家庄东城区国土数据</span></span>
            </Item>
            <Item>
              <span className={styles.span1} ><span className={styles.label} >目录发布机构</span>:<span className={styles.value} >石家庄东城区</span></span>
              <span className={styles.span2} ><span className={styles.label} >目录数据类型</span>:<span className={styles.value} >数据库</span></span>
            </Item>
            <Item>
              <span className={styles.span1} ><span className={styles.label} >目录所属主题</span>:<span className={styles.value} >国土数据</span></span>
              <span className={styles.span2} ><span className={styles.label} >目录详情</span>:<a className={styles.value} >查看</a></span>
            </Item>
            <Item label='发布模式' {...itemLayout}>
              <Select value={0} disabled className={styles.input} >
                <Select.Option value={0} >增量</Select.Option>
                <Select.Option value={1} >全量</Select.Option>
              </Select>
            </Item>
            <Item label='发布频率' {...itemLayout} >
              <Select value={0} disabled className={styles.input} >
                <Select.Option value={0} >定时</Select.Option>
                <Select.Option value={1} >定时</Select.Option>
              </Select>
            </Item>
            <Item label='定时设置' {...itemLayout} >
              <Input />
            </Item>
            <Item
              label={(
                <span>
                  是否新建目录&nbsp;
                  <Tooltip title='是否需要在当前路径下创建新文件夹' >
                    <Icon type='question-circle-o' />
                  </Tooltip>
                </span>
              )}
              {...itemLayout}
            >
              <Radio.Group defaultValue='0' >
                <Radio value='0' >是</Radio>
                <Radio value='1' >否</Radio>
              </Radio.Group>
            </Item>
          </Form>
        </div>
      </PageHeaderLayout>
    )
  }
}
