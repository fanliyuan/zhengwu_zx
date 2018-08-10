import React, { Component } from 'react'
import { connect } from 'dva'
import { Link } from 'dva/router'
import { Card, Input, Button, Form, TreeSelect, Select } from 'antd'

// import styles from './AddNode.less';
import PageHeaderLayout from '../../layouts/PageHeaderLayout'

const FormItem = Form.Item
// const { Option } = Select
@connect(({nodeManagement, loading}) => ({nodeManagement, loading: loading.models.nodeManagement}))
@Form.create()
export default class AddNode extends Component {
  state = {
    nodeInfo: {},
  }

  componentDidMount() {
    this.props.dispatch({
      type: 'nodeManagement/getParentNodes',
    })
    this.props.dispatch({
      type: 'nodeManagement/getDepartments',
    })
    if (this.props.location.pathname === '/infrastructure/editNode') {
      this.setState({
        nodeInfo: this.props.location.state.nodeInfo || {},
      })
      // console.log(this.props.location.state.nodeInfo)
    } else {
      this.setState({
        nodeInfo: {},
      })
    }
  }

  handleSubmit = e => {
    e.preventDefault()
    // message.success('新建成功,即将跳转到上级页面')
    // setTimeout(() => {
    //   this.props.dispatch(routerRedux.push('/infrastructure/node'))
    // }, 1000)
    this.props.form.validateFields((err, value) => {
      if (!err) {
        const body = {
          nodeName: value.name.trim(),
          mac: value.mac.trim(),
          deptId: +value.deptId,
          pid: +value.pid,
          id: this.state.nodeInfo.nodeId,
        }
        // console.log(this.props.nodeManagement.parentNodeListT)
        // console.log(value.pid)
        if (this.props.location.pathname === 'infrastructure/addNode') {
          this.props.dispatch({
            type: 'nodeManagement/addNode',
            payload: {
              body,
            },
          })
        } else {
          this.props.dispatch({
            type: 'nodeManagement/editNode',
            payload: {
              body,
            },
          })
        }
      }
    })
  }

  render() {
    const { getFieldDecorator } = this.props.form
    const { nodeManagement: { parentNodeListT, departmentList } } = this.props
    const { nodeInfo: {nodeName, mac, deptId, parentNodeId} } = this.state
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
    const departmentComs = departmentList.map(item => <Select.Option value={item.key} key={item.key}>{item.value}</Select.Option>)

    return (
      <PageHeaderLayout>
        <Card>
          <Form onSubmit={this.handleSubmit}>
            <FormItem label="节点名称" {...formItemLayout}>
              {getFieldDecorator('name', {
                initialValue: nodeName,
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
                initialValue: mac,
                rules: [
                  {
                    required: true,
                    message: '请输入mac地址',
                  },
                ],
              })(<Input placeholder="mac地址" />)}
            </FormItem>
            <FormItem label="上级节点" {...formItemLayout}>
              {getFieldDecorator('pid',{
                initialValue: [`${parentNodeId?'':parentNodeId}`],
              })(
                <TreeSelect treeData={parentNodeListT} placeholder="请选择节点" treeDefaultExpandAll allowClear />
              )}
            </FormItem>
            <FormItem label="所属机构" {...formItemLayout}>
              {getFieldDecorator('deptId', {
                initialValue: deptId,
                rules: [
                  {
                    required: true,
                    message: '请选择机构',
                  },
                ],
              })(
                // <TreeSelect treeData={treeData1} placeholder="请选择节点" treeDefaultExpandAll allowClear />
                <Select placeholder='请选择机构'>
                  { departmentComs }
                </Select>
              )}
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
