import React, { Component } from 'react'
import { Input, Card, Form, Button, Radio, Select, message } from 'antd' // Modal
import { connect } from 'dva'
import { routerRedux } from 'dva/router'

import PageHeaderLayout from '@/components/PageHeaderWrapper'
// import styles from './AddSourceClassfiy.less'

const FormItem = Form.Item
const RadioGroup = Radio.Group
const { Option } = Select
// const { confirm }= Modal
let currentClassify
let num
const msg = [0]
@Form.create()

@connect(({sourceClassfiy,loading}) => ({
  sourceClassfiy,
  loadings:loading.models.sourceClassfiy,
}))
export default class AddSourceClassfiy extends Component {
  state = {
    // classifyName:'请选择类',
    // itemName:'请选择项',
    // detailName:'请选择目',
    selectCode:'',
    level:'',
    pid:'',
    classNum:2,
    routeid:'',
    disAblex:false,
    disAblem:false,
    disAblexm:false,
    // editMsg:true,
  }

  componentDidMount = async() => {
    const { dispatch } = this.props
    const { setFieldsValue } = this.props.form
    const { location:{ state } } = this.props.history
    // this.setState({
    //   editMsg:true,
    // })
    msg[0] = 0
    setFieldsValue({
      'number':'',
    })
    if(state){
      await dispatch({
        type:'sourceClassfiy/getTargetItem',
        payload:{id:state.id,level:state.level},
      })
      this.setState({
        routeid:state.id,
      })
      switch(+state.level){
        case 2:
          this.setState({
            disAblex:false,
            disAblem:true,
            disAblexm:true,
          })
          break
        case 3:
          this.setState({
            disAblex:true,
            disAblem:false,
            disAblexm:true,
          })
          break
        case 4:
          this.setState({
            disAblex:true,
            disAblem:true,
            disAblexm:false,
          })
          break
        default:
          break
      }
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
            pid:currentClassify.pid,
            classNum:2,
          })
          return
        }
        await dispatch({
          type:'sourceClassfiy/getResourceList',
          payload:{code:+state.currentTab,level:1,id:+state.currentTab},
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
            pid:currentClassify.pid,
            classNum:3,
          })
          return
        }
        await dispatch({
          type:'sourceClassfiy/getResourceList',
          payload:{code:currentClassify.projectcode,level:2,id:state.projectid},
        })
        setFieldsValue({
          'classfiyItem':currentClassify.catalogcode,
          'number':currentClassify.detailcode,
          'names':currentClassify.detailname,
        })
        this.setState({
          selectCode:currentClassify.catalogcode,
          level:4,
          pid:currentClassify.pid,
          classNum:4,
        })
      }  
    }
    else {
      // dispatch({
      //   type:'sourceClassfiy/getResourceList',
      //   payload:{code:1,level:1},
      // })
    }
    currentClassify = ''
  }

  handleClassChange = (e) => {
    const { form:{ setFieldsValue} } = this.props
    this.setState({
      classNum:e.target.value,
      selectCode:'',
      level:'',
      pid:'',
    })
    setFieldsValue({
      'number':'',
      "parentName":undefined,
      "item":undefined,
      "classfiyItem":undefined,
      'names':'',
    })
  }

  handleNamePCheck =() => {
    msg[0] = 0
    const { form:{getFieldValue, setFieldsValue} } = this.props
    if(getFieldValue('names').length > 50){
      message.info("输入长度不能超过50个字符")
      setFieldsValue({
        'names':getFieldValue('names').slice(0,50),
      })
    }
  }

  checkNum = (i) => {
    const { form:{getFieldValue, setFieldsValue} } = this.props
    if(getFieldValue('number').length > i){
      message.info(`输入长度不能超过${i}个字符`)
      setFieldsValue({
        'number':getFieldValue('number').slice(0,i),
      })
    }
  }

  addCode = (i) => {
    const { form:{getFieldValue, setFieldsValue} } = this.props
    if(getFieldValue('number').length < i && getFieldValue('number').length >0){
      setFieldsValue({
        'number':(Array(i).join(0) + getFieldValue('number')).slice(-i),
      })
    }
  }

  handleNumPCheck = () => {
    const { classNum } = this.state
    msg[0] = 0
    if(+classNum === 2){
      this.checkNum(2)
    }
    else if(+classNum === 3){
      this.checkNum(3)
    }
    else if(+classNum === 4){
      const { form:{getFieldValue, setFieldsValue} } = this.props
      if(getFieldValue('number').length > 50){
        message.info("输入长度不能超过50个字符")
        setFieldsValue({
          'number':getFieldValue('number').slice(0,50),
        })
      }
      if(+getFieldValue('number')[0] === 0){
        message.error("细目首位不能为0,请重填！")
        setFieldsValue({
          'number':'',
        })
      }
    }
  }

  handleAddCode = () => {
    const { classNum } = this.state
    if(+classNum === 2){
      this.addCode(2)
    }
    else if(+classNum === 3){
      this.addCode(3)
    }
    const { dispatch } = this.props
    dispatch({
      type:'sourceClassfiy/switchEdit',
    })
  }

  // handleSwitch = () => {
  //   const { dispatch } = this.props
  //   dispatch({
  //     type:'sourceClassfiy/switchEdit',
  //   })  
  // }

  handleSubmit = (e) => {
    e.preventDefault()
    // msg[0] =0
    this.props.form.validateFieldsAndScroll((err, values) => {
      if(!err){
        const { selectCode, level, routeid, pid, classNum } = this.state
        const { dispatch } = this.props
        if(routeid && routeid !== -1){
          dispatch({
            type:'sourceClassfiy/editItem',
            payload:{name:values.names,code:values.number,parentCode:selectCode,level,id:routeid,force:0,pid},
          }) 
          // this.setState({
          //   editMsg:true,
          // })
        }
        else {
          if(!level){
            message.error("请填写父级,若下级不存在，请先创建")
            return
          }
          if(+classNum !== +level){
            message.error("请完善父级,若下级不存在，请先创建")
            return      
          }
          dispatch({
            type:'sourceClassfiy/addItem',
            payload:{name:values.names,code:values.number,parentCode:selectCode,level,pid},
          })
        }
      }
    })
  }

  // handleEditMust = (e) => {
  //   e.preventDefault()
  //   this.props.form.validateFieldsAndScroll((err, values) => {
  //     if(!err){
  //       const { selectCode, level, routeid, pid } = this.state
  //       const { dispatch } = this.props
  //         dispatch({
  //           type:'sourceClassfiy/editItem',
  //           payload:{name:values.names,code:values.number,parentCode:selectCode,level,id:routeid,force:1,pid},
  //         })
  //         this.setState({
  //           editMsg:false,
  //         })
  //         msg[0] = 0
  //     }
  //   })
  // }

  // handleEditCancel = () => {
  //   this.setState({
  //     editMsg:false,
  //   })
  //   msg[0] = 0
  // }

  handleChangeClassify = async(val) => {
    const { dispatch } = this.props
    const { classNum } = this.state
    const { setFieldsValue } = this.props.form
    dispatch({
      type:'sourceClassfiy/getResourceList',
      payload:{code:val,level:1,id:val},
    })
    if(+classNum === 2){
      await dispatch({
        type:'sourceClassfiy/getCode',
        payload:{parentCode:val,level:2,pid:val},
      })
      setFieldsValue({
        'number':num,
      })
    }
    this.setState({
      selectCode:val,
      level:2,
      pid:val,
    })
    setFieldsValue({
      'item':undefined,
      'classfiyItem':undefined,
    })
  }

  handleChangeClassify1 = async(val,options) => {
    // console.log("list",options.key)
    const { dispatch } = this.props
    const { setFieldsValue } = this.props.form
    const { classNum } = this.state
    dispatch({
      type:'sourceClassfiy/getResourceList',
      payload:{code:val,level:2,id:options.key},
    })
    if(+classNum === 3){
      await dispatch({
        type:'sourceClassfiy/getCode',
        payload:{parentCode:val,level:3,pid:options.key},
      })
      setFieldsValue({
        'number':num,
      })
    }
    setFieldsValue({
      'classfiyItem':undefined,
    })
    this.setState({
      selectCode:val,
      level:3,
      pid:options.key,
    })
  }

  handleChangeClassify2 = (val,options) => {
    this.setState({
      selectCode:val,
      level:4,
      pid:options.key,
    })
  }

  handleCancel = () => {
    const { dispatch } = this.props
    dispatch(routerRedux.push('/dataSourceManagement/sourceClassfiy'))
  }

  render() {
    const { sourceClassfiy:{resourceLists, itemList, autoCodes, targetData },form:{getFieldDecorator, getFieldValue} } = this.props
    // msg = [...editMessage]
    currentClassify = targetData
    num = autoCodes
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
    const { classNum, disAblex, disAblem, disAblexm } = this.state // classifyName, itemName, detailName,
    // const { getFieldDecorator, getFieldValue } = this.props.form
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
    // const formThreeItemLayout1 = {
    //   labelCol: {
    //     xs: { span: 24 },
    //     sm: { span: 5,offset:0 },
    //     md: { span: 4 },
    //     lg: { span: 5,offset:0 },
    //     xl:{ span: 5,offset:0 },
    //   },
    //   wrapperCol: {
    //     xs: { span: 17 },
    //     sm: { span: 17 },
    //     md: { span: 19 },
    //     lg: { span: 17 },
    //     xl:{ span: 17 },
    //   },
    // }
    // const formThreeItemLayout = {
    //   wrapperCol: {
    //     xs: { span: 22 },
    //     sm: { span: 22 },
    //   },
    // }
    const submitLayout = {
      wrapperCol: {
        xs: { span: 24, offset: 0 },
        sm: { span: 10, offset: 7 },
      },
    }
    return (
      <PageHeaderLayout>
        <Card>
          <Form> {/* onSubmit={this.handleSubmit} */}
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
                  <Radio value={2} disabled={disAblex}>项</Radio>
                  <Radio value={3} disabled={disAblem}>目</Radio>
                  <Radio value={4} disabled={disAblexm}>细目</Radio>
                </RadioGroup>)}
            </FormItem>
            <FormItem label="父级" {...formItemLayout}>
              {getFieldDecorator('parentName', {
                    // initialValue:classifyName,
                    rules: [
                  {
                    required: true,
                    message: '请选择分类名称',
                  },
                ],
              })(
                <Select placeholder="请选择类" onChange={this.handleChangeClassify} style={{display:'inline-block',width:'33%'}}>
                  {classifyList}
                </Select>
              )}
              {getFieldDecorator('item', {
                // initialValue:itemName,
                // rules: [
                //   {
                //     required: true,
                //     message: '请选择项',
                //   },
                // ],
              })(
                <Select placeholder="请选择项" onChange={this.handleChangeClassify1} style={{display:+getFieldValue('classify') === 2 ? 'none' : 'inline-block',width:'33%'}}>
                  {itemsList}
                </Select>
              )}
              {getFieldDecorator('classfiyItem', {
                // initialValue:detailName,
                // rules: [
                //   {
                //     required: true,
                //     message: '请选择目',
                //   },
                // ],
              })(
                <Select placeholder="请选择目" onChange={this.handleChangeClassify2} style={{display:+getFieldValue('classify') === 4 ? 'inline-block' : 'none',width:'33%'}}>
                  {detailList}
                </Select>
              )}
            </FormItem>
            {/* <Row>
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
            </Row> */}
            <FormItem label="编号" {...formItemLayout}>
              {getFieldDecorator('number',{
                initialValue:autoCodes,
                rules:[{
                  required: true,
                  message:'请输入编号',
                }],
              })(<Input placeholder="请输入编号" onKeyUp={this.handleNumPCheck} type="number" onBlur={this.handleAddCode} />)}
            </FormItem>
            <FormItem label="名称" {...formItemLayout}>
              {getFieldDecorator('names',{
                initialValue:'',
                rules:[{
                  required: true,
                  message:'请输入名称',
                }],
              })(<Input placeholder="请输入名称" onKeyUp={this.handleNamePCheck} />)} {/* onBlur={this.handleSwitch} */} 
            </FormItem>
            <FormItem {...submitLayout}>
              <Button type="primary" style={{ marginRight: 20 }} onClick={this.handleSubmit}> {/* htmlType="submit" */}
                  确定
              </Button>
              <Button onClick={this.handleCancel}>取消</Button>
            </FormItem>
          </Form>
          {/* <Modal
            title="修改"
            visible={+msg[0] === 1 && editMsg}
            onOk={this.handleEditMust}
            onCancel={this.handleEditCancel}
            >
            <p>已存在，是否强制修改，后果自负</p>
          </Modal> */}
        </Card>
      </PageHeaderLayout>
    )
  }
}
 