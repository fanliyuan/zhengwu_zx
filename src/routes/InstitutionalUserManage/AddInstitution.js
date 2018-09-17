import React, { Component } from 'react'
import { Input, Card, Form, TreeSelect, Button, Select, message } from 'antd'
import { connect } from 'dva'
import { routerRedux } from 'dva/router'

import PageHeaderLayout from '../../layouts/PageHeaderLayout'
// import styles from './AddInstitution.less';

const FormItem = Form.Item
const { TextArea } = Input
const { Option } = Select
let parentId
let checkMsg = true
let jgName = ""
@Form.create()
@connect(({Institution}) => ({
  Institution,
  editId:Institution.editId,
}))
export default class AddInstitution extends Component {
  state = {
    addAction:true,
    deptId:0,
  }

  componentDidMount = async() => {
    const { editId } = await this.props
    this.setState({
      deptId:editId,
    })
    if(+editId !== -1){
      this.setState({
        addAction:false,
      })
      const { dispatch } = this.props
      dispatch({
        type:'Institution/getGoveDeptInfos',
      })
      dispatch({
        type:'Institution/getOneLevel',
      })
     dispatch({
        type:'Institution/getItmByIds',
        payload:{pkId:editId},
      })
    }
    else if(+editId === -1){
      const { dispatch } = this.props
      dispatch({
        type:'Institution/getGoveDeptInfos',
      })
      dispatch({
        type:'Institution/getOneLevel',
      })
      this.setState({
        addAction:true,
      })
    }
  }

  handleSubmit = (e) => {
    e.preventDefault()
    const { dispatch } = this.props
    const { addAction, deptId } = this.state
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        if(!addAction){
          const pro = values.province !== "所属省" && values.city !== "所属市" && values.area !== "所属区" ? `${values.province}|${values.city}|${values.area}` : undefined
          dispatch({
            type:'Institution/editItem',
            payload:{...values,province:undefined,city:undefined,area:undefined,proCityAreaInfo:pro,deptId},
          })
          setTimeout(() => {dispatch(routerRedux.push('/institutionalUserManage/institutionalManage'))},2000)
        }
        else {
          if(+parentId === 0){
            values.deptParentId = 0
          }
          const proCityInfo = values.province !== "所属省" && values.city !== "所属市" && values.area !== "所属区" ? `${values.province}|${values.city}|${values.area}` : undefined
          dispatch({
            type:'Institution/addItem',
            payload:{...values,province:undefined,city:undefined,area:undefined,proCityAreaInfo:proCityInfo},
          })
          setTimeout(() => {dispatch(routerRedux.push('/institutionalUserManage/institutionalManage'))},2000)
        }
      }
    })
  }

  handleProChange = (val) => {
    const params = val && val.slice(0,val.indexOf('|'))
    this.props.form.setFieldsValue({
      city: "所属市",
      area:"所属区",
    })
    const { dispatch } = this.props
    dispatch({
      type:'Institution/getTwoLevel',
      payload:{provinceId:params},
    })
  }

  handleCityChange = (val) => {
    const params = val && val.slice(0,val.indexOf('|'))
    const { dispatch } = this.props
    dispatch({
      type:'Institution/getThreeLevel',
      payload:{cityId:params},
    })
  }

  handleCancel = () => {
    const { dispatch } = this.props
    dispatch(routerRedux.push('/institutionalUserManage/institutionalManage'))
  }

  handleNameCheck = (e) => {
    if(e.target.value.trim().length > 20){
      this.props.form.setFieldsValue({
        deptName:e.target.value.slice(0,20),
      })
      message.info("机构名称不能超过20个字符")
    }
  }

  handleNameSameCheck = async(e) => {
    const { dispatch } = this.props
    const { addAction } = this.state
    await dispatch({
      type:'Institution/deptNameCheck',
      payload:{deptName:e.target.value},
    })
    if(addAction && !checkMsg){
      this.props.form.setFieldsValue({
        deptName:"",
      })
      message.error("机构名称已存在,请重填!")
    }
    else if(!addAction && !checkMsg){
      if(e.target.value !== jgName){
        this.props.form.setFieldsValue({
          deptName:"",
        })
        message.error("机构名称已存在,请重填!")
      }
    }
  }

  handleNamePCheck = (e) => {
    if(e.target.value.length > 20){
      this.props.form.setFieldsValue({
        chargeUser:e.target.value.slice(0,20),
      })
      message.error("负责人姓名不能超过20个字符")
    }
  }

  render() {
    const { getFieldDecorator } = this.props.form
    const { Institution:{ getItemByIdInfo, goveDeptInfos, provices, cities, areas, isSameMessage } } = this.props
    if(goveDeptInfos){
      goveDeptInfos.forEach(item => {
        item.key = item.value
      })
    }
    const { addAction } = this.state
    checkMsg = isSameMessage
    jgName = getItemByIdInfo.deptName
    let pro
    let cit 
    let are
    parentId = goveDeptInfos.length
    if(addAction){
      pro='所属省'
      cit='所属市'
      are='所属区'
    }
    else if(!addAction && getItemByIdInfo.proCityAreaInfo === "所属省|所属市|所属区"){
      pro = getItemByIdInfo.proCityAreaInfo && getItemByIdInfo.proCityAreaInfo.split('|')[0]
      cit = getItemByIdInfo.proCityAreaInfo && getItemByIdInfo.proCityAreaInfo.split('|')[1]
      are = getItemByIdInfo.proCityAreaInfo && getItemByIdInfo.proCityAreaInfo.split('|')[2]
    }
    else {
      pro = getItemByIdInfo.proCityAreaInfo ? `${getItemByIdInfo.proCityAreaInfo.split('|')[0]}|${getItemByIdInfo.proCityAreaInfo.split('|')[1]}` :'所属省'
      cit = getItemByIdInfo.proCityAreaInfo ? `${getItemByIdInfo.proCityAreaInfo.split('|')[2]}|${getItemByIdInfo.proCityAreaInfo.split('|')[3]}` :'所属市'
      are = getItemByIdInfo.proCityAreaInfo ? `${getItemByIdInfo.proCityAreaInfo.split('|')[4]}|${getItemByIdInfo.proCityAreaInfo.split('|')[5]}` : '所属区'
    }
    const ProData = provices.map(item => {
      return (<Option value={`${item.provinceId }|${ item.name}`} key={item.id}>{item.name}</Option>)
    })
    const cityData = cities.map(item => {
      return (<Option value={`${ item.cityId}|${item.name }`} key={item.id}>{item.name}</Option>)
    })
    const areaData = areas.map(item => {
      return (<Option value={`${ item.areaId}|${item.name }`} key={item.id}>{item.name}</Option>)
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
    const inputItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 7 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 6 },
        md: { span: 5 },
      },
    }
    const submitLayout = {
      wrapperCol: {
        xs: { span: 24, offset: 0 },
        sm: { span: 10, offset: 7 },
      },
    }
    return (
      <PageHeaderLayout>
        <Card>
          <Form onSubmit={this.handleSubmit}>
            <FormItem label="机构名称" {...formItemLayout}>
              {getFieldDecorator('deptName', {
                initialValue:getItemByIdInfo.deptName && !addAction ? getItemByIdInfo.deptName :'',
                rules: [
                  {
                    required: true,
                    message: '请输入机构名称',
                  },
                ],
              })(<Input placeholder="机构名称" onKeyUp={this.handleNameCheck} onBlur={this.handleNameSameCheck} />)}
            </FormItem>
            <FormItem label="上级机构" {...formItemLayout}>
              {getFieldDecorator('deptParentId',{
                initialValue:getItemByIdInfo.deptParentId && !addAction ? getItemByIdInfo.deptParentId.toString() :'',
              })(
                <TreeSelect treeData={goveDeptInfos} placeholder="请选择" treeDefaultExpandAll />
              )}
            </FormItem>
            {/* <FormItem label="排序" {...formItemLayout}>
              {getFieldDecorator('deptOrder', {
                initialValue:getItemByIdInfo.deptOrder !== undefined && !addAction ? +getItemByIdInfo.deptOrder :99,
                rules: [
                  {
                    required: true,
                    message: '请输入排序',
                  },
                ],
              })(<InputNumber />)}
            </FormItem> */}
            <FormItem label="负责人" {...formItemLayout}>
              {getFieldDecorator('chargeUser',{
                initialValue:getItemByIdInfo.chargeUser && !addAction ? getItemByIdInfo.chargeUser : '',
              })(<Input placeholder="姓名" onKeyUp={this.handleNamePCheck} />)}
            </FormItem>
            <FormItem label="负责人手机" {...formItemLayout}>
              {getFieldDecorator('chargePhone',{
                initialValue:getItemByIdInfo.chargePhone && !addAction ? getItemByIdInfo.chargePhone :'',
                rules:[{
                  pattern:/^1[345789]\d{9}$/,
                  message:'请输入正确手机号码格式',
                }],
              })(<Input placeholder="11位数字" />)}
            </FormItem>
            <FormItem label="所属省" {...inputItemLayout}>
              {getFieldDecorator('province',{
                initialValue:pro,
              })(<Select placeholder="所属省" onChange={this.handleProChange}>{ProData}</Select>)}
            </FormItem>
            <FormItem label="所属市" {...inputItemLayout}>
              {getFieldDecorator('city',{
                initialValue:cit,
              })(<Select placeholder="所属市" onChange={this.handleCityChange}>{cityData}</Select>)}
            </FormItem>
            <FormItem label="所属区" {...inputItemLayout}>
              {getFieldDecorator('area',{
                initialValue:are,
              })(<Select placeholder="所属区">{areaData}</Select>)}
            </FormItem>
            <FormItem label="详细地址" {...formItemLayout}>
              {getFieldDecorator('detailAddress',{
                initialValue:getItemByIdInfo.detailAddress && !addAction ? getItemByIdInfo.detailAddress : '',
              })(<TextArea row={4} />)}
            </FormItem>
            <FormItem {...submitLayout}>
              <Button type="primary" htmlType="submit" style={{ marginRight: 20 }}>
                确定
              </Button>
              <Button onClick={this.handleCancel}>取消</Button>
            </FormItem>
          </Form>
        </Card>
      </PageHeaderLayout>
    )
  }
}
 