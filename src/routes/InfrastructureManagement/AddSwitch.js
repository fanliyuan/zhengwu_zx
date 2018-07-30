import React, { Component } from 'react'
import { connect } from 'dva'
import { routerRedux } from 'dva/router'
import { Form, Card, Input, TreeSelect, Checkbox, Button, message } from 'antd'

// import styles from './AddSwitch.less';
import PageHeaderLayout from '../../layouts/PageHeaderLayout'

const { SHOW_PARENT } = TreeSelect
const FormItem = Form.Item
const { TextArea } = Input

@connect()
@Form.create()
export default class AddSwitch extends Component {
  state = {}

  onChange = () => {}

  onChange1 = () => {}

  handleSubmit = e => {
    e.preventDefault()
    message.success('提交成功, 即将返回上一页')
    setTimeout(() => {
      this.props.dispatch(routerRedux.push('/infrastructure/switch'))
    }, 1000)
  }

  handleCancle = () => {
    this.props.dispatch(routerRedux.push('/infrastructure/switch'))
  }

  render() {
    const FormItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 7 },
        md: { span: 7 },
      },
      wrapperCol: {
        xs: { span: 10 },
        sm: { span: 12 },
        md: { span: 10 },
      },
    }
    const { getFieldDecorator, getFieldValue } = this.props.form
    const treeData = [
      {
        title: '一级机构1',
        value: '0-0',
        key: '0-0',
        children: [
          {
            title: '二级机构1',
            value: '0-0-0',
            key: '0-0-0',
          },
          {
            title: '二级机构2',
            value: '0-0-1',
            key: '0-0-1',
          },
          {
            title: '二级机构3',
            value: '0-0-2',
            key: '0-0-2',
          },
          {
            title: '二级机构4',
            value: '0-0-3',
            key: '0-0-3',
          },
        ],
      },
      {
        title: '一级机构2',
        value: '0-1',
        key: '0-1',
        children: [
          {
            title: '二级机构1',
            value: '0-1-0',
            key: '0-1-0',
          },
          {
            title: '二级机构2',
            value: '0-1-1',
            key: '0-1-1',
          },
          {
            title: '二级机构3',
            value: '0-1-2',
            key: '0-1-2',
          },
          {
            title: '二级机构4',
            value: '0-1-3',
            key: '0-1-3',
          },
        ],
      },
    ]
    const treeData1 = [
      {
        title: '一级节点1',
        value: '0-2',
        key: '0-2',
        children: [
          {
            title: '二级节点1',
            value: '0-2-0',
            key: '0-2-0',
          },
          {
            title: '二级节点2',
            value: '0-2-1',
            key: '0-2-1',
          },
          {
            title: '二级节点3',
            value: '0-2-2',
            key: '0-2-2',
          },
          {
            title: '二级节点4',
            value: '0-2-3',
            key: '0-2-3',
          },
        ],
      },
      {
        title: '一级节点2',
        value: '0-3',
        key: '0-3',
        children: [
          {
            title: '二级节点1',
            value: '0-3-0',
            key: '0-3-0',
          },
          {
            title: '二级节点2',
            value: '0-3-1',
            key: '0-3-1',
          },
          {
            title: '二级节点3',
            value: '0-3-2',
            key: '0-3-2',
          },
          {
            title: '二级节点4',
            value: '0-3-3',
            key: '0-3-3',
          },
        ],
      },
    ]
    const tProps = {
      treeData,
      // value:this.state.value,
      onChange: this.onChange,
      treeCheckable: true,
      showCheckedStrategy: SHOW_PARENT,
      searchPlaceholder: 'Please select',
      style: {
        width: 300,
      },
    }
    const tProps1 = {
      treeData: treeData1,
      // value:this.state.value,
      onChange: this.onChange1,
      treeCheckable: true,
      showCheckedStrategy: SHOW_PARENT,
      searchPlaceholder: 'Please select',
      style: {
        width: 300,
      },
    }
    return (
      <PageHeaderLayout>
        <Card>
          <Form onSubmit={this.handleSubmit}>
            <FormItem label="交换域名称" {...FormItemLayout}>
              {getFieldDecorator('switchName', {
                rules: [
                  {
                    required: true,
                    message: '填写交换域名称',
                  },
                ],
              })(<Input />)}
            </FormItem>
            <FormItem label="业务范围机构" {...FormItemLayout}>
              {getFieldDecorator('fieldJg', {
                rules: [
                  {
                    required: true,
                    message: '业务范围机构必选',
                  },
                ],
              })(<TreeSelect {...tProps} />)}
            </FormItem>
            <FormItem
              label="业务范围节点"
              style={{ display: getFieldValue('fieldJg') === undefined ? 'none' : 'block' }}
              {...FormItemLayout}
              >
              {getFieldDecorator('fieldNode', {
                rules: [
                  {
                    required: true,
                    message: '业务范围节点必选',
                  },
                ],
              })(<TreeSelect {...tProps1} />)}
            </FormItem>
            <FormItem label="交换域描述" {...FormItemLayout}>
              {getFieldDecorator('switchDescription')(<TextArea rows={4} />)}
            </FormItem>
            <FormItem label="状态" {...FormItemLayout}>
              {getFieldDecorator('status')(<Checkbox>停用</Checkbox>)}
            </FormItem>
            <div className="btnclsb">
              <Button type="primary" htmlType="submit" className="mr64">
                确定
              </Button>
              <Button type="primary" onClick={this.handleCancle}>
                取消
              </Button>
            </div>
          </Form>
        </Card>
      </PageHeaderLayout>
    )
  }
}
