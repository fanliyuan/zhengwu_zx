/*
 * @Author: ChouEric
 * @Date: 2018-07-06 17:49:30
 * @Last Modified by: ChouEric
 * @Last Modified time: 2018-07-26 23:23:19
*/
import React, { PureComponent } from 'react'
import { connect } from 'dva'
import { routerRedux } from 'dva/router'
import { Form, Input, Button, Select } from 'antd'

import styles from './index.less'

const { Item } = Form
const { Option } = Select
const formItemLayout = {
  labelCol: {
    span: 7,
  },
  wrapperCol: {
    span: 17,
  },
}

@connect(({ step }) => ({
  step,
}))
@Form.create()
export default class Step1 extends PureComponent {
  state = {
    data: {
      menuName: '',
      desc: '',
      classify: '',
      providerName: '',
      innerDepartmentName: '',
      providerCode: '',
      resourceCode: '',
      formName: '',
    },
    disabled: true,
  }

  componentDidMount() {
    if (this.props.location.pathname !== '/dataSourceManagement/checkMenu/one') {
      this.setState({
        disabled: false,
      })
    }
  }

  handleBack = () => {
    const { dispatch } = this.props
    // dispatch(routerRedux.push('/dataSourceManagement/catalog'))
    dispatch(routerRedux.push('/dataSourceManagement/catalogManagement'))
  }

  render() {
    const {
      form: { getFieldDecorator, validateFields },
      dispatch,
    } = this.props
    const { data, disabled } = this.state

    const onValidateForm = () => {
      validateFields(err => {
        if (!err) {
          dispatch(routerRedux.push('/dataSourceManagement/newMenu/two'))
        }
      })
    }

    return (
      <Form className={styles.stepForm}>
        <Item label="名称" {...formItemLayout}>
          {getFieldDecorator('menuName', {
            initialValue: data.menuName,
            rules: [{ required: true, message: '请输入名称' }],
          })(<Input placeholder="请输入名称" disabled={disabled} />)}
        </Item>
        <Item label="摘要" {...formItemLayout}>
          {getFieldDecorator('desc', {
            initialValue: data.desc,
            rules: [{ required: true, message: '请输入描述' }],
          })(<Input.TextArea placeholder="请输入描述" disabled={disabled} />)}
        </Item>
        <Item label="分类" {...formItemLayout}>
          {getFieldDecorator('classify', {
            initialValue: data.classify,
            rules: [{ required: true, message: '请输入选择分类' }],
          })(
            <Select disabled={disabled}>
              <Option value="classify1">分类1</Option>
              <Option value="classify2">分类2</Option>
              <Option value="classify21">分类21</Option>
            </Select>
          )}
        </Item>
        <Item label="提供方名称" {...formItemLayout}>
          {getFieldDecorator('providerName', {
            initialValue: data.providerName,
            rules: [{ required: true, message: '请输入提供方名称' }],
          })(<Input placeholder="请输入提供方名称" disabled={disabled} />)}
        </Item>
        <Item label="提供方内部部门" {...formItemLayout}>
          {getFieldDecorator('innerDepartmentName', {
            initialValue: data.innerDepartmentName,
            rules: [{ required: true, message: '请输入提供方内部部门' }],
          })(<Input placeholder="请输入提供方内部部门" disabled={disabled} />)}
        </Item>
        <Item label="资源提供方代码" {...formItemLayout}>
          {getFieldDecorator('providerCode', {
            initialValue: data.providerCode,
            rules: [{ required: true, message: '请输入名称' }],
          })(<Input placeholder="请输入名称" disabled={disabled} />)}
        </Item>
        <Item label="信息资源编码" {...formItemLayout}>
          {getFieldDecorator('resourceCode', {
            initialValue: data.resourceCode,
            rules: [{ required: true, message: '请输入信息资源编码' }],
          })(<Input placeholder="请输入信息资源编码" disabled={disabled} />)}
          <a>编码规则说明</a>
        </Item>
        <Item label="信息资源格式" {...formItemLayout}>
          {getFieldDecorator('formName', {
            initialValue: data.formName,
            rules: [{ required: true, message: '请输入名称' }],
          })(
            <Select disabled={disabled}>
              <Option value="classify1">分类1</Option>
              <Option value="classify2">分类2</Option>
              <Option value="classify21">分类21</Option>
            </Select>
          )}
        </Item>
        <div className="btnclsb">
          {!disabled ? (
            <Button type="primary" onClick={onValidateForm} className="mr64">
              下一步
            </Button>
          ) : null
          // <Button onClick={this.handleBack}>
          //   返回
          // </Button>
          }
        </div>
      </Form>
    )
  }
}
