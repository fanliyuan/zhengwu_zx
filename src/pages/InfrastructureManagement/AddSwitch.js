import React, { Component } from 'react'
import { connect } from 'dva'
import { routerRedux } from 'dva/router'
import { Form, Card, Input, TreeSelect, Checkbox, Button } from 'antd'

// import styles from './AddSwitch.less';
import PageHeaderLayout from '@/components/PageHeaderWrapper'

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
        regionId: this.state.regoinInfo.regionId ? +this.state.regoinInfo.regionId : undefined,
        nodeIds: value.nodeIds.map(item => +item),
        deptIds: value.deptIds.map(item => +item),
        status: value.status ? 0 : 1,
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
    const { regionManagement: { deptList, nodeListT } } = this.props // eslint-disable-line
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
    const tProps = {
      onChange: this.onChange,
      treeData: deptList,
      treeCheckable: true,
      showCheckedStrategy: SHOW_PARENT,
      searchPlaceholder: '请选择业务范围机构',
      dropdownStyle:  {maxHeight: 200},
      style: {
        width: 300,
      },
    }
    const tProps1 = {
      treeData: nodeListT,
      treeCheckable: true,
      showCheckedStrategy: SHOW_PARENT,
      searchPlaceholder: '请选择业务范围节点',
      dropdownStyle:{maxHeight: 200}, 
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
                    message: '交换域名称为必填',
                  },
                  {
                    pattern: /^[\u4e00-\u9fa50-9A-z]{1,20}$/,
                    message: '名称不能超过20个字,并且不能含有特殊字符',
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
                label="节点成员"
                {...FormItemLayout}
                >
                {getFieldDecorator('nodeIds', {
                  rules: [
                    {
                      required: true,
                      message: '节点成员必选',
                    },
                  ],
                  initialValue: nodeIds,
                })(<TreeSelect {...tProps1} />)}
              </FormItem>)
            }
            <FormItem label="交换域描述" {...FormItemLayout}>
              {getFieldDecorator('desc', {
                initialValue: '',
                rules: [
                  {
                    max: 256,
                    message: '描述不超过256个字符',
                  },
                ],
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
