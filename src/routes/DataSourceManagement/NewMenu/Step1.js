/*
 * @Author: ChouEric
 * @Date: 2018-07-06 17:49:30
 * @Last Modified by:   ChouEric
 * @Last Modified time: 2018-07-06 17:49:30
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
};

@connect()
@Form.create()
export default class Step1 extends PureComponent {

  state = {
    data: {
      menuName: '1',
      desc: '1',
      classify: '1',
      providerName: '1',
      innerDepartmentName: '1',
      providerCode: '1',
      resourceCode: '1',
      formName: '1',
    },
  }

  render() {
    const { form: { getFieldDecorator, validateFields }, dispatch } = this.props
    const { data } = this.state

    const onValidateForm = () => {
      validateFields((err, values) =>{
        if (!err) {
          dispatch(routerRedux.push('/dataSourceManagement/newMenu/two'))
        }
      })
    }

    return (
      <Form className={styles.stepForm} >
        <Item label='名称' {...formItemLayout} >
          {
            getFieldDecorator('menuName',{
              initialValue: data.menuName,
              rules: [{ required: true, message: '请输入名称' }],
            })(<Input placeholder='请输入名称' />)
          }
        </Item>
        <Item label='描述' {...formItemLayout} >
          {
            getFieldDecorator('desc',{
              initialValue: data.desc,
              rules: [{ required: true, message: '请输入描述' }],
            })(<Input.TextArea placeholder='请输入描述' />)
          }
        </Item>
        <Item label='分类' {...formItemLayout} >
          {
            getFieldDecorator('classify',{
              initialValue: data.classify,
              rules: [{ required: true, message: '请输入选择分类' }],
            })(
              <Select>
                <Option value="classify1">分类1</Option>
                <Option value="classify2">分类2</Option>
                <Option value="classify21">分类21</Option>
              </Select>
            )
          }
        </Item>
        <Item label='提供方名称' {...formItemLayout} >
          {
            getFieldDecorator('providerName',{
              initialValue: data.providerName,
              rules: [{ required: true, message: '请输入提供方名称' }],
            })(<Input placeholder='请输入提供方名称' />)
          }
        </Item>
        <Item label='提供方内部部门' {...formItemLayout} >
          {
            getFieldDecorator('innerDepartmentName',{
              initialValue: data.innerDepartmentName,
              rules: [{ required: true, message: '请输入提供方内部部门' }],
            })(<Input placeholder='请输入提供方内部部门' />)
          }
        </Item>
        <Item label='资源提供方代码' {...formItemLayout} >
          {
            getFieldDecorator('providerCode',{
              initialValue: data.providerCode,
              rules: [{ required: true, message: '请输入名称' }],
            })(<Input placeholder='请输入名称' />)
          }
        </Item>
        <Item label='信息资源编码' {...formItemLayout} >
          {
            getFieldDecorator('resourceCode',{
              initialValue: data.resourceCode,
              rules: [{ required: true, message: '请输入信息资源编码' }],
            })(<Input placeholder='请输入信息资源编码' />)
          }
        </Item>
        <Item label='信息资源格式' {...formItemLayout} >
          {
            getFieldDecorator('formName',{
              initialValue: data.formName,
              rules: [{ required: true, message: '请输入名称' }],
            })(
              <Select>
                <Option value="classify1">分类1</Option>
                <Option value="classify2">分类2</Option>
                <Option value="classify21">分类21</Option>
              </Select>
            )
          }
        </Item>
        <Item style={{textAlign: 'center'}} >
          <Button type='primary' size='large' onClick={onValidateForm}>下一步</Button>
        </Item>
      </Form>
    )
  }
}
