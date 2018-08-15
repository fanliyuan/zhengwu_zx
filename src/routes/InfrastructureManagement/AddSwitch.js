import React, { Component } from 'react'
import { connect } from 'dva'
import { routerRedux } from 'dva/router'
import { Form, Card, Input, TreeSelect, Checkbox, Button } from 'antd'

// import styles from './AddSwitch.less';
import PageHeaderLayout from '../../layouts/PageHeaderLayout'

const { SHOW_PARENT } = TreeSelect
const FormItem = Form.Item
const { TextArea } = Input

@connect(({ regionManagement, loading }) => ({
  regionManagement,
  loading: loading.models.regionManagement,
}))
@Form.create()
export default class AddSwitch extends Component {
  state = {
    regoinInfo: {},
  }

  componentDidMount() {
    this.props.dispatch({
      type: 'regionManagement/getDepartments',
      payload:{},
    })
    if (this.props.location.pathname === '/infrastructure/editSwitch') {
      this.setState({
        regoinInfo: this.props.location.state && this.props.location.state.regoinInfo,
      })
    } else {
      this.setState({
        regoinInfo: {},
      })
    }
  }

  onChange = value => {
    this.props.dispatch({
      type: 'regionManagement/getNodes',
      payload: {
        deptIds: value.join(','),
      },
    })
  }

  handleSubmit = e => {
    e.preventDefault()
    // message.success('提交成功, 即将返回上一页')
    // setTimeout(() => {
    //   this.props.dispatch(routerRedux.push('/infrastructure/switch'))
    // }, 1000)
    this.props.form.validateFieldsAndScroll((err, value) => {
      if (err) return null
      // console.log(value)
      const body = {
        regionName: value.regionName,
        regionId: value.regionId ? +value.regionId : undefined,
        nodeIds: value.nodeIds.map(item => ~~item),
        deptIds: value.deptIds.map(item => ~~item),
        status: value.status ? 1 : 0,
        desc: value.desc,
      }
      if (this.props.location.pathname === '/infrastructure/addSwitch') {
        this.props.dispatch({
          type: 'regionManagement/addRegion',
          payload: {
            body,
          },
        })
      } else {
        this.props.dispatch({
          type: 'regionManagement/editRegion',
          payload: {
            body,
          },
        })
      }
    } )
  }

  handleCancle = () => {
    this.props.dispatch(routerRedux.push('/infrastructure/switch'))
  }

  render() {
    const { regoinInfo: { regionName, nodeIds, deptIds, status } } = this.state
    const { regionManagement: { detpList } } = this.props // eslint-disable-line
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
        value: '1',
        children: [
          {
            title: '二级机构1',
            value: '2',
          },
          {
            title: '二级机构2',
            value: '3',
          },
          {
            title: '二级机构3',
            value: '4',
          },
          {
            title: '二级机构4',
            value: '5',
          },
        ],
      },
      {
        title: '一级机构2',
        value: '6',
        children: [
          {
            title: '二级机构1',
            value: '7',
          },
          {
            title: '二级机构2',
            value: '8',
          },
          {
            title: '二级机构3',
            value: '9',
          },
          {
            title: '二级机构4',
            value: '10',
          },
        ],
      },
    ]
    const treeData1 = [
      {
        title: '一级节点1',
        value: '0-2',
        children: [
          {
            title: '二级节点1',
            value: '0-2-0',
          },
          {
            title: '二级节点2',
            value: '0-2-1',
          },
          {
            title: '二级节点3',
            value: '0-2-2',
          },
          {
            title: '二级节点4',
            value: '0-2-3',
          },
        ],
      },
      {
        title: '一级节点2',
        value: '0-3',
        children: [
          {
            title: '二级节点1',
            value: '0-3-0',
          },
          {
            title: '二级节点2',
            value: '0-3-1',
          },
          {
            title: '二级节点3',
            value: '0-3-2',
          },
          {
            title: '二级节点4',
            value: '0-3-3',
          },
        ],
      },
    ]
    const tProps = {
      onChange: this.onChange,
      treeData,
      treeCheckable: true,
      showCheckedStrategy: SHOW_PARENT,
      searchPlaceholder: '请选择业务范围机构',
      style: {
        width: 300,
      },
    }
    const tProps1 = {
      treeData: treeData1,
      treeCheckable: true,
      showCheckedStrategy: SHOW_PARENT,
      searchPlaceholder: '请选择业务范围节点',
      style: {
        width: 300,
      },
    }
    return (
      <PageHeaderLayout>
        <Card>
          <Form onSubmit={this.handleSubmit}>
            <FormItem label="交换域名称" {...FormItemLayout}>
              {getFieldDecorator('regionName', {
                rules: [
                  {
                    required: true,
                    message: '填写交换域名称',
                  },
                ],
                initialValue: regionName,
              })(<Input />)}
            </FormItem>
            <FormItem label="业务范围机构" {...FormItemLayout}>
              {getFieldDecorator('deptIds', {
                rules: [
                  {
                    required: true,
                    message: '业务范围机构必选',
                  },
                ],
                initialValue: deptIds,
              })(<TreeSelect {...tProps} />)}
            </FormItem>
            {
              getFieldValue('deptIds') && getFieldValue('deptIds').length > 0 && (
              <FormItem
                label="业务范围节点"
                {...FormItemLayout}
                >
                {getFieldDecorator('nodeIds', {
                  rules: [
                    {
                      required: true,
                      message: '业务范围节点必选',
                    },
                  ],
                  initialValue: nodeIds,
                })(<TreeSelect {...tProps1} />)}
              </FormItem>)
            }
            <FormItem label="交换域描述" {...FormItemLayout}>
              {getFieldDecorator('desc', {
                initialValue: '',
              })(<TextArea rows={4} />)}
            </FormItem>
            <FormItem label="状态" {...FormItemLayout}>
              {getFieldDecorator('status', {
                valuePropName: 'checked',
                initialValue: status,
              })(<Checkbox>停用</Checkbox>)}
            </FormItem>
            <div className="btnclsb">
              <Button type="primary" htmlType="submit" className="mr64">
                确定
              </Button>
              <Button onClick={this.handleCancle}>
                取消
              </Button>
            </div>
          </Form>
        </Card>
      </PageHeaderLayout>
    )
  }
}
