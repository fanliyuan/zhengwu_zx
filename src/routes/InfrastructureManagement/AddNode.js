import React, { Component } from 'react'
import { connect } from 'dva'
import { Link, routerRedux } from 'dva/router'
import { Card, Input, Button, Form, TreeSelect, message } from 'antd'

// import styles from './AddNode.less';
import PageHeaderLayout from '../../layouts/PageHeaderLayout'

const FormItem = Form.Item
// const { Option } = Select
@connect()
@Form.create()
export default class AddNode extends Component {
  state = {}

  handleSubmit = e => {
    e.preventDefault()
    message.success('新建成功,即将跳转到上级页面')
    setTimeout(() => {
      this.props.dispatch(routerRedux.push('/infrastructure/node'))
    }, 1000)
  }

  render() {
    const { getFieldDecorator } = this.props.form
    // const role = [
    //   { value: '0', label: '某某机构', id: '0' },
    //   { value: '1', label: 'XX机构', id: '1' },
    // ]
    // const roleData = role.map(item => {
    //   return (
    //     <Option value={item.value} key={item.id}>
    //       {item.label}
    //     </Option>
    //   )
    // })
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
    const treeData = [
      {
        title: '第一级节点',
        value: '0-0',
        key: '0-0',
        children: [
          {
            title: '第二级节点1',
            value: '0-0-0',
            key: '0-0-0',
          },
          {
            title: '第二级节点2',
            value: '0-0-1',
            key: '0-0-1',
          },
        ],
      },
    ]
    const treeData1 = [
      {
        title: '北京市国土局',
        value: '0-0',
        key: '0-0',
        children: [
          {
            title: '海淀国土局',
            value: '0-0-0',
            key: '0-0-0',
          },
          {
            title: '丰台国土局',
            value: '0-0-1',
            key: '0-0-1',
          },
        ],
      },
    ]
    return (
      <PageHeaderLayout>
        <Card>
          <Form onSubmit={this.handleSubmit}>
            <FormItem label="节点名称" {...formItemLayout}>
              {getFieldDecorator('nodeNames', {
                rules: [
                  {
                    required: true,
                    message: '请输入节点名称',
                  },
                ],
              })(<Input placeholder="节点名称" />)}
            </FormItem>
            <FormItem label="IP地址" {...formItemLayout}>
              {getFieldDecorator('ipAddress', {
                rules: [
                  {
                    required: true,
                    message: '请输入IP地址',
                  },
                ],
              })(<Input placeholder="IP地址" />)}
            </FormItem>
            <FormItem label="上级节点" {...formItemLayout}>
              {getFieldDecorator('parentNode')(
                <TreeSelect treeData={treeData} placeholder="请选择节点" treeDefaultExpandAll />
              )}
            </FormItem>
            <FormItem label="所属机构" {...formItemLayout}>
              {getFieldDecorator('owingJg', {
                rules: [
                  {
                    required: true,
                    message: '请选择机构',
                  },
                ],
              })(<TreeSelect treeData={treeData1} placeholder="请选择节点" treeDefaultExpandAll />)}
            </FormItem>
            <FormItem {...submitLayout}>
              <div className="btnclsb">
                <Button type="primary" htmlType="submit" className="mr64">
                  确定
                </Button>
                <Link to="/infrastructure/node">
                  <Button>取消</Button>
                </Link>
              </div>
            </FormItem>
          </Form>
        </Card>
      </PageHeaderLayout>
    )
  }
}
