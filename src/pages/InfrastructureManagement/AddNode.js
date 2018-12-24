import React, { Component } from 'react'
import { connect } from 'dva'
import { Link } from 'dva/router'
import { Card, Input, Button, Form, TreeSelect } from 'antd'

// import styles from './AddNode.less';
import PageHeaderLayout from '@/components/PageHeaderWrapper'

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
        nodeInfo: this.props.location.state ? this.props.location.state.nodeInfo || {} : {},
      })
      // console.log(this.props.location.state)
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
          deptId: isNaN(+value.deptId)?undefined:+value.deptId,
          pid: isNaN(+value.pid)?undefined:+value.pid,
          id: this.state.nodeInfo.id,
        }
        // console.log(this.props.nodeManagement.parentNodeListT)
        // console.log(value.pid)
        if (this.props.location.pathname === '/infrastructure/addNode') {
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
    console.log(this.state)
    const { getFieldDecorator } = this.props.form
    const { nodeManagement: { parentNodeListT, departmentListT } } = this.props
    const { nodeInfo: {nodeName, mac, deptId, parentName} } = this.state
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
    // eslint-disable-next-line
    // const departmentComs = departmentList.map(item => <Select.Option value={item.key} key={item.key}>{item.value}</Select.Option>)

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
                    message: '节点名称为必填',
                  },
                  {
                    pattern: /^[\u4e00-\u9fa50-9A-z]{1,20}$/,
                    message: '名称不能超过20个字,并且不能含有特殊字符',
                  },
                ],
              })(<Input placeholder="节点名称" />)}
            </FormItem>
            <FormItem label="网卡·MAC·地址" {...formItemLayout}>
              {getFieldDecorator('mac', {
                initialValue: mac,
                rules: [
                  {
                    required: true,
                    message: '请输入正确的网卡·MAC·地址',
                    pattern: /^[A-F0-9]{2}(-[A-F0-9]{2}){5}$/,
                  },
                ],
              })(<Input placeholder="网卡·MAC·地址" />)}
            </FormItem>
            <FormItem label="上级节点" {...formItemLayout}>
              {getFieldDecorator('pid',{
                initialValue: [`${parentName || ''}`],
              })(
                <TreeSelect treeData={parentNodeListT} placeholder="请选择节点" allowClear />
              )}
            </FormItem>
            <FormItem label="所属机构" {...formItemLayout}>
              {getFieldDecorator('deptId', {
                initialValue: [`${deptId || ''}`],
                rules: [
                  {
                    required: true,
                    message: '请选择机构',
                  },
                ],
              })(
                <TreeSelect treeData={departmentListT} dropdownStyle={{maxHeight: 200}} placeholder="请选择机构" allowClear />
                // <Select placeholder='请选择机构'>
                //   { departmentComs }
                // </Select>
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
