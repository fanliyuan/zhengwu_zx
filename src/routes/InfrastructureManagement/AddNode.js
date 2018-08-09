import React, { Component } from 'react'
import { connect } from 'dva'
import { Link } from 'dva/router'
import { Card, Input, Button, Form, TreeSelect } from 'antd'

// import styles from './AddNode.less';
import PageHeaderLayout from '../../layouts/PageHeaderLayout'

const FormItem = Form.Item
// const { Option } = Select
@connect(({nodeManagement, loading}) => ({nodeManagement, loading: loading.models.nodeManagement}))
@Form.create()
export default class AddNode extends Component {
  state = {}

  handleSubmit = e => {
    e.preventDefault()
    // message.success('新建成功,即将跳转到上级页面')
    // setTimeout(() => {
    //   this.props.dispatch(routerRedux.push('/infrastructure/node'))
    // }, 1000)
    this.props.form.validateFields((err, value) => {
      if (!err) {
        console.log(value)// eslint-disable-line
      }
    })
  }

  render() {
    const { getFieldDecorator } = this.props.form
    const { nodeManagement: { parentNodeListT } } = this.props
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
              {getFieldDecorator('name', {
                rules: [
                  {
                    required: true,
                    message: '请输入节点名称',
                  },
                ],
              })(<Input placeholder="节点名称" />)}
            </FormItem>
            <FormItem label="mac地址" {...formItemLayout}>
              {getFieldDecorator('mac', {
                rules: [
                  {
                    required: true,
                    message: '请输入mac地址',
                  },
                ],
              })(<Input placeholder="mac地址" />)}
            </FormItem>
            <FormItem label="上级节点" {...formItemLayout}>
              {getFieldDecorator('parentNode')(
                <TreeSelect treeData={parentNodeListT} placeholder="请选择节点" treeDefaultExpandAll allowClear />
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
              })(<TreeSelect treeData={treeData1} placeholder="请选择节点" treeDefaultExpandAll allowClear />)}
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
