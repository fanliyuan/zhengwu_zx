import React, { Component } from 'react'
import { Input, Card, Form, Button, Radio, Row, Col, Select } from 'antd'
import { connect } from 'dva'
import { routerRedux } from 'dva/router'

import PageHeaderLayout from '@/components/PageHeaderWrapper'
// import styles from './AddSourceClassfiy.less'

const FormItem = Form.Item
const RadioGroup = Radio.Group
const { Option } = Select
let currentClassify
@Form.create()

@connect(({sourceClassfiy,loading}) => ({
  sourceClassfiy,
  loadings:loading.models.sourceClassfiy,
}))
export default class AddSourceClassfiy extends Component {
  state = {
    classifyName:'请选择类',
    itemName:'请选择项',
    detailName:'请选择目',
    selectCode:'1',
    level:'1',
    classNum:2,
    routeid:-1,
  }

  componentDidMount = async() => {
    const { dispatch } = this.props
    const { setFieldsValue } = this.props.form
    const { location:{ state } } = this.props.history
    if(state){
      await dispatch({
        type:'sourceClassfiy/getTargetItem',
        payload:{id:state.id,level:state.level},
      })
      this.setState({
        routeid:state.id,
      })
      if(currentClassify){
        setFieldsValue({
          'classify':+currentClassify.level,
          'parentName':+state.currentTab === 1 ? '基础信息资源类': +state.currentTab === 2 ? '主题信息资源类' :"部门信息资源类",
        })
        if(+currentClassify.level === 2){
          setFieldsValue({
            'number':currentClassify.projectcode,
            'names':currentClassify.projectname,
          })
          this.setState({
            selectCode:+state.currentTab,
            level:2,
          })
          return
        }
        await dispatch({
          type:'sourceClassfiy/getResourceList',
          payload:{code:+state.currentTab,level:1},
        })
        setFieldsValue({
          'item':currentClassify.projectcode,
        })
        if(+currentClassify.level === 3){
          setFieldsValue({
            'number':currentClassify.catalogcode,
            'names':currentClassify.catalogname,
          })
          this.setState({
            selectCode:currentClassify.projectcode,
            level:3,
          })
          return
        }
        await dispatch({
          type:'sourceClassfiy/getResourceList',
          payload:{code:currentClassify.projectcode,level:2},
        })
        setFieldsValue({
          'classfiyItem':currentClassify.catalogcode,
          'number':currentClassify.detailcode,
          'names':currentClassify.detailname,
        })
        this.setState({
          selectCode:currentClassify.catalogcode,
          level:4,
        })
      }  
    }
    else {
      // dispatch({
      //   type:'sourceClassfiy/getResourceList',
      //   payload:{code:1,level:1},
      // })
    }
  }

  handleClassChange = (e) => {
    this.setState({
      classNum:e.target.value,
    })
  }

  handleSubmit = (e) => {
    e.preventDefault()
    this.props.form.validateFieldsAndScroll((err, values) => {
      if(!err){
        const { selectCode, level, routeid } = this.state
        const { dispatch } = this.props
        if(routeid && routeid !== -1){
          dispatch({
            type:'sourceClassfiy/editItem',
            payload:{name:values.names,code:values.number,parentCode:selectCode,level,id:routeid,force:1},
          }) 
        }
        else {
          dispatch({
            type:'sourceClassfiy/addItem',
            payload:{name:values.names,code:values.number,parentCode:selectCode,level},
          })
        }
      }
    })
  }

  handleChangeClassify = (val) => {
    const { dispatch } = this.props
    const { classNum } = this.state
    const { setFieldsValue } = this.props.form
    dispatch({
      type:'sourceClassfiy/getResourceList',
      payload:{code:val,level:1},
    })
    if(+classNum === 2){
      dispatch({
        type:'sourceClassfiy/getCode',
        payload:{parentCode:val,level:2},
      })
    }
    this.setState({
      selectCode:val,
      level:2,
    })
    setFieldsValue({
      'item':'请选择项',
      'classfiyItem':'请选择目',
    })
  }

  handleChangeClassify1 = (val) => {
    const { dispatch } = this.props
    const { setFieldsValue } = this.props.form
    const { classNum } = this.state
    dispatch({
      type:'sourceClassfiy/getResourceList',
      payload:{code:val,level:2},
    })
    if(+classNum === 3){
      dispatch({
        type:'sourceClassfiy/getCode',
        payload:{parentCode:val,level:3},
      })
    }
    setFieldsValue({
      'classfiyItem':'请选择目',
    })
    this.setState({
      selectCode:val,
      level:3,
    })
  }

  handleChangeClassify2 = (val) => {
    // const{ dispatch } = this.props
    // const { classNum } = this.state
    // if(+classNum === 3){
    //   dispatch({
    //     type:'sourceClassfiy/getCode',
    //     payload:{parentCode:val,level:4},
    //   })
    // }
    this.setState({
      selectCode:val,
      level:4,
    })
  }

  handleCancel = () => {
    const { dispatch } = this.props
    dispatch(routerRedux.push('/dataSourceManagement/sourceClassfiy'))
  }

  render() {
    const { sourceClassfiy:{resourceLists, itemList, autoCodes, targetData } } = this.props
    // console.log(targetData)
    currentClassify = targetData
    // console.log(targetData)
    const classify = [{value:'1',label:'基础信息资源类'},{value:'2',label:'主题信息资源类'},{value:'3',label:'部门信息资源类'}]
    const classifyList = classify.map(item => {
      return <Option value={item.value} key={item.value}>{item.label}</Option>
    })
    const itemsList = resourceLists.map(item => {
      return <Option value={item.code} key={item.id}>{item.name}</Option>
    })
    // const detail = [{value:'1',label:'项1'},{value:'2',label:'目2'},{value:'3',label:'目3'}]
    const detailList = itemList.map(item => {
      return <Option value={item.code} key={item.id}>{item.name}</Option>
    })
    const { classifyName, itemName, detailName, classNum } = this.state
    const { getFieldDecorator, getFieldValue } = this.props.form
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
    const formThreeItemLayout1 = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 5,offset:0 },
        md: { span: 4 },
        lg: { span: 5,offset:0 },
        xl:{ span: 5,offset:0 },
      },
      wrapperCol: {
        xs: { span: 17 },
        sm: { span: 17 },
        md: { span: 19 },
        lg: { span: 17 },
        xl:{ span: 17 },
      },
    }
    const formThreeItemLayout = {
      wrapperCol: {
        xs: { span: 22 },
        sm: { span: 22 },
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
            <FormItem label="类别" {...formItemLayout}>
              {getFieldDecorator('classify', {
                initialValue:classNum,
                rules: [
                  {
                    required: true,
                    message: '请选择类别',
                  },
                ],
              })(
                <RadioGroup onChange={this.handleClassChange}>
                  <Radio value={2}>项</Radio>
                  <Radio value={3}>目</Radio>
                  <Radio value={4}>细目</Radio>
                </RadioGroup>)}
            </FormItem>
            <Row>
              <Col sm={{span:4,offset:4}} md={{span:4,offset:5}} lg={{span:4,offset:5}} xl={{span:4,offset:6}}>
                <FormItem label="父级" {...formThreeItemLayout1}>
                  {getFieldDecorator('parentName', {
                    initialValue:classifyName,
                    rules: [
                  {
                    required: true,
                    message: '请选择分类名称',
                  },
                ],
              })(
                <Select onChange={this.handleChangeClassify}>
                  {classifyList}
                </Select>
              )}
                </FormItem>
              </Col>
              <Col span={3} style={{display:+getFieldValue('classify') === 2 ? 'none' : 'block' }}>
                <FormItem label="" {...formThreeItemLayout}>
                  {getFieldDecorator('item', {
                initialValue:itemName,
                rules: [
                  {
                    required: true,
                    message: '请选择项',
                  },
                ],
              })(
                <Select onChange={this.handleChangeClassify1}>
                  {itemsList}
                </Select>
              )}
                </FormItem>
              </Col>
              <Col span={3} style={{display:+getFieldValue('classify') === 4 ? 'block' : 'none' }}>
                <FormItem label="" {...formThreeItemLayout}>
                  {getFieldDecorator('classfiyItem', {
                initialValue:detailName,
                rules: [
                  {
                    required: true,
                    message: '请选择目',
                  },
                ],
              })(
                <Select onChange={this.handleChangeClassify2}>
                  {detailList}
                </Select>
              )}
                </FormItem>
              </Col>
            </Row>
            <FormItem label="编号" {...formItemLayout}>
              {getFieldDecorator('number',{
                initialValue:autoCodes,
                rules:[{
                  required: true,
                  message:'请输入编号',
                }],
              })(<Input placeholder="请输入编号" onKeyUp={this.handleNamePCheck} type="number" />)}
            </FormItem>
            <FormItem label="名称" {...formItemLayout}>
              {getFieldDecorator('names',{
                initialValue:'',
                rules:[{
                  required: true,
                  message:'请输入名称',
                }],
              })(<Input placeholder="请输入名称" />)}
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
 