import React, { Component } from 'react'
import { connect } from 'dva'
import { Link, routerRedux } from 'dva/router'

import { Card, Form, Select, Checkbox, Button, message } from 'antd'

// import styles from './EditPass.less';
import PageHeaderLayout from '@/components/PageHeaderWrapper'

const FormItem = Form.Item
const { Option } = Select
let editMessages
let ids
let startId 
let targetId 
@Form.create()
class EditPass extends Component {
  state = {}

  componentDidMount = () => {
    // const { dispatch } = this.props
    // dispatch({
    //   type:'passOperation/editChannel',
    // })
  }

  handleSubmit = e => {
    e.preventDefault()
    const { dispatch } = this.props
    this.props.form.validateFieldsAndScroll((err, values) => {
      values.id=ids
      values.isCompress =  values.isCompress ? 1 : 0
      values.isDoubleSide = values.isDoubleSide ? 1 : 0
      values.isEncryption = values.isEncryption ? 1 : 0
      values.startNodeId = startId
      values.targetNodeId = targetId
      if (!err) {
        dispatch({
          type:'passOperation/editChannel',
          payload:values,
        })
        message.success( `${editMessages },即将返回上一页`)
        setTimeout(() => {
          this.props.dispatch(routerRedux.push('/infrastructure/pass'))
        }, 2000)
      }
    })
  }

  render() {
    const { data, editMessage, submiting } = this.props
    editMessages = editMessage
    startId = data.startNodeId
    targetId = data.targetNodeId
    ids = data.id
    const compress = data.isCompress === '是'
    const encryption = data.isEncryption === '是'
    const { getFieldDecorator } = this.props.form // getFieldValue
    const startNode = 
      (
        <Option value={data.startNodeId} title={data.startNode} key={data.startNodeId}>
          {data.startNode}
        </Option>
      )   
    const endData = [
      { value: '0', label: '石家庄市民政部', id: 0 },
      { value: '1', label: '北京民政部', id: 1 },
    ]
    const targetNode = endData.map(item => {
      return (
        <Option value={item.value} title={item.label} key={item.id}>
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
          <Form onSubmit={this.handleSubmit}>
            <FormItem label="起始节点" {...formItemLayout}>
              {getFieldDecorator('startNodeId', {
                initialValue: data.startNode,
              })(
                <Select placeholder="起始节点" disabled>
                  {startNode}
                </Select>
              )}
            </FormItem>
            <FormItem label="目标节点" {...formItemLayout}>
              {getFieldDecorator('targetNodeId', {
                initialValue: data.targetNode,
                // rules: [
                //   {
                //     required: true,
                //     message: '请选择目标节点',
                //   },
                // ],
              })(
                <Select placeholder="目标节点" disabled>
                  {targetNode}
                </Select>
              )}
            </FormItem>
            {/* <FormItem label="双向传输" {...formItemLayout}>
              {getFieldDecorator('isDoubleSide', {
                valuePropName: 'checked',
                initialValue: true, // !!+data.isTwoWay
              })(<Checkbox disabled>启用</Checkbox>)}
            </FormItem> */}
            <FormItem label="压缩传输" {...formItemLayout}>
              {getFieldDecorator('isCompress', {
                valuePropName: 'checked',
                initialValue: compress,
              })(<Checkbox>启用</Checkbox>)}
            </FormItem>
            <FormItem label="加密传输" {...formItemLayout}>
              {getFieldDecorator('isEncryption', {
                valuePropName: 'checked',
                initialValue: encryption,
              })(<Checkbox>启用</Checkbox>)}
            </FormItem>
            <div className="btnclsb">
              <Button type="primary" htmlType="submit" className="mr64" loading={submiting}>
                提交
              </Button>
              <Link to="/infrastructure/pass">
                <Button>取消</Button>
              </Link>
            </div>
          </Form>
        </Card>
      </PageHeaderLayout>
    )
  }
}
export default connect(({ passOperation, loading }) => ({
  data: passOperation.params,
  editMessage:passOperation.editMessage,
  submiting:loading.effects['passOperation/editChannel'],
}))(EditPass)
