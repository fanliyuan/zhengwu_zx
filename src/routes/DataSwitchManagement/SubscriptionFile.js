/*
 * @Author: ChouEric
 * @Date: 2018-07-13 16:15:18
 * @Last Modified by: ChouEric
 * @Last Modified time: 2018-07-27 14:28:14
 * @描述: 数据交换管理 -- 资源订阅 -- 资源集市 -- 订阅(文件)
*/
import React, { Component } from 'react'
import { Link } from 'dva/router'
import { Form, Input, Select, Radio, Button, InputNumber, Upload } from 'antd'

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
const itemLayout1 = {
  labelCol: {
    span: 3,
  },
  wrapperCol: {
    span: 10,
  },
}
const itemLayout2 = {
  wrapperCol: {
    span: 10,
    offset:3,
  },
}

function ButtonList(props) {
  const { onClick = () => {}, disabled = true, isNodeOperator = false } = props
  return (
    <div className="btncls clearfix">
      <Link to="/dataSwitchManagement/sourceSubscription" className="fr mr40">
        <Button>返回</Button>
      </Link>
      {isNodeOperator && (
        <Button type="primary" onClick={onClick} disabled={disabled} className="fr mr40">
          确定
        </Button>
      )}
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
    isNodeOperator: false,
    addFileName:false,
  }

  componentDidMount() {
    this.setState(
      {
        isNodeOperator: localStorage.getItem('antd-pro-authority') === 'operator-n',
      },
      () => {
        if (this.state.isNodeOperator) this.props.form.validateFields()
      }
    )
  }

  handleAddFile = (e) => {
    if(+e.target.value === 0){
      this.setState({
        addFileName:true,
      })
    }
  }

  handleUpload = () => {

  }

  handleSave = () => {}

  render() {
    const { isNodeOperator, addFileName } = this.state
    const { getFieldDecorator, isFieldTouched, getFieldError, getFieldsError } = this.props.form

    const nameError =
      (isFieldTouched('name') && getFieldError('name')) ||
      (isFieldTouched('name1') && getFieldError('name1'))

    return (
      <PageHeaderLayout>
        <div className="common-layout" style={{overflowX:'hidden'}}>
          <ButtonList
            onClick={this.handleSave}
            isNodeOperator={isNodeOperator}
            disabled={hasErrors(getFieldsError())}
            />
          <Form>
            <Item
              {...itemLayout}
              label="订阅名称"
              validateStatus={nameError ? 'error' : ''}
              help={nameError ? '请输入名称' : ''}
              style={{width:1500}}
              >
              {getFieldDecorator('name', {
                rules: [{ required: true, message: '请输入名称' }],
              })(<Input className={styles.input} disabled={!isNodeOperator} />)}
              <span className={styles.span2}>
                <span className={styles.label}>目录名称</span>:
                <span className={styles.value}>石家庄东城区国土数据</span>
              </span>
            </Item>
            <Item>
              <span className={styles.span1}>
                <span className={styles.label}>发布机构</span>:
                <span className={styles.value}>石家庄东城区</span>
              </span>
              <span className={styles.span2}>
                <span className={styles.label}>数据类型</span>:
                <span className={styles.value}>数据库</span>
              </span>
            </Item>
            <Item>
              <span className={styles.span1}>
                <span className={styles.label}>所属分类</span>:
                <span className={styles.value}>国土数据</span>
              </span>
              <span className={styles.span2}>
                <span className={styles.label}>详情</span>:<Link to="/dataSourceManagement/viewDirectory" className={styles.value}>查看</Link>
              </span>
            </Item>
            <Item label="发布模式" {...itemLayout}>
              <Select value={0} disabled={!isNodeOperator} className={styles.input}>
                <Select.Option value={0}>增量</Select.Option>
                <Select.Option value={1}>全量</Select.Option>
              </Select>
            </Item>
            <Item label="发布频率" {...itemLayout}>
              <Select value={0} disabled={!isNodeOperator} className={styles.input}>
                <Select.Option value={0}>定时</Select.Option>
                <Select.Option value={1}>定时</Select.Option>
              </Select>
            </Item>
            <Item label="定时设置" {...itemLayout} className={styles.timeSetting}>
              <InputNumber
                max={60}
                min={0}
                className={styles.time}
                placeholder="分钟"
                disabled={!isNodeOperator}
                />
              <InputNumber
                max={23}
                min={0}
                className={styles.time}
                placeholder="小时"
                disabled={!isNodeOperator}
                />
              <Input className={styles.time} placeholder="日" disabled={!isNodeOperator} />
              <Input className={styles.time} placeholder="月" disabled={!isNodeOperator} />
              <Input className={styles.time} placeholder="星期" disabled={!isNodeOperator} />
            </Item>
            <Item
              label="订阅存储路径"
              {...itemLayout1}
              extra={<span>是否需要在当前路径下创建新文件夹</span>}
              >
              <Upload onChange={this.handleUpload} disabled={!isNodeOperator}>
                <Input className={styles.input} style={{marginRight:30}} disabled={!isNodeOperator} />
                <Button type="primary">选择</Button>
              </Upload>
            </Item>
            <Item {...itemLayout2} style={{marginTop:'-30px'}}>
              <Radio.Group defaultValue="1" onChange={this.handleAddFile} disabled={!isNodeOperator}>
                <Radio value="0">是</Radio>
                <Radio value="1">否</Radio>
              </Radio.Group>
              <Input style={{display:addFileName ? 'block' :'none'}} placeholder="请输入文件夹名称" />
            </Item>
          </Form>
        </div>
      </PageHeaderLayout>
    )
  }
}
