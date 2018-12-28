import React, { Component } from 'react'
import {
  // Input,
  Card,
  Form,
  Button,
  // Cascader,
  Radio,
  // Checkbox,
  // Select,
  // message,
  Divider,
} from 'antd'
import { connect } from 'dva'
import { routerRedux } from 'dva/router'

import PageHeaderLayout from '@/components/PageHeaderWrapper'
import styles from './OpenShare.less'

const FormItem = Form.Item
// const InputGroup = Input.Group
const RadioGroup = Radio.Group
// const { Option } = Select
// const CheckboxGroup = Checkbox.Group
@Form.create()
@connect(({ catalogManagement }) => ({
  catalogManagement,
}))
export default class OpenShare extends Component {
  state = {
    id: -1,
    isExpandOrFolder: true,
  };

  componentDidMount() {
    // if(this.props.location.state){

    // }
    const {
      dispatch,
      location: { state },
    } = this.props
    // dispatch({
    //   type: 'catalogManagement/openShare',
    //   payload: this.props.location.state && this.props.location.state.openId,
    // })
    // this.setState({
    //   id: this.props.location.state && +this.props.location.state.openId,
    // })
    // dispatch({
    //   type: 'catalogManagement/getResourcesEdit',
    //   payload: { id: this.props.location.state && +this.props.location.state.openId },
    // })
    dispatch({
      type: 'catalogManagement/getResources',
      payload: {
         params:{resourceId: state ? state.routeId : '' },
        },
    })
  }

  setInputs = () => {
    const { setFieldValue } = this.props.form
    const { minutes, hours, day, month, week } = this.state
    const timeInfo = [minutes, hours, day, month, week]
    setFieldValue('setTime', timeInfo)
  };

  isFolderOrExpand = () => {
    const { isExpandOrFolder } = this.state
    this.setState({
      isExpandOrFolder: !isExpandOrFolder,
    })
  };

  handleSubmit = e => {
    e.preventDefault()
    const {
      form: { validateFields },
    } = this.props
    validateFields((errors, values) => {
      if (!errors) {
        const { id } = this.state
        const params = {
          publishMode: '',
          publishRate: '',
          switchAreaId: [],
          timeSet: '',
          open: +values.open === 1,
          share: +values.share === 1,
          // opendoorType: values.openType === '开放门户分类' ? '' : values.openType,
          subscribeLicense: +values.subscribeLicense === 1,
        }
        this.props.dispatch({
          type: 'catalogManagement/submitOpenShare',
          payload: {
            id,
            shareopenEditDto: params,
          },
        })
      }
    })
  };

  handleSave = () => {
    const { dispatch } = this.props
    dispatch(routerRedux.push('/dataSourceManagement/catalogManagement'))
  };

  handleBack = () => {
    const { dispatch } = this.props
    dispatch(routerRedux.push('/dataSourceManagement/sourceManagement'))
  };

  render() {
    const {
      form: { getFieldDecorator },
      catalogManagement: {  resourceDetail },
    } = this.props
    // console.log(resourceDetail)
    const { isExpandOrFolder } = this.state
    // const plainOptions = ['交换域1', '交换域2', '交换域3']
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
    // const optionData = [
    //   { label: '定时', value: '0', id: 0 },
    //   { label: '实时', value: '1', id: 1 },
    //   { label: '手动', value: '2', id: 2 },
    // ]
    // const optionSelect = optionData.map(item => {
    //   return (
    //     <Option value={item.value} key={item.id} label={item.label}>
    //       {item.label}
    //     </Option>
    //   )
    // })
    // const options = [
    //   {
    //     value: '0',
    //     label: '增量',
    //     children: [
    //       {
    //         value: '0-0',
    //         label: '日志',
    //       },
    //       {
    //         value: '0-1',
    //         label: '标志位',
    //       },
    //       {
    //         value: '0-2',
    //         label: '时间戳',
    //       },
    //     ],
    //   },
    //   {
    //     value: '1',
    //     label: '全量',
    //     children: [
    //       {
    //         value: '1-0',
    //         label: '日志',
    //       },
    //       {
    //         value: '1-1',
    //         label: '标志位',
    //       },
    //       {
    //         value: '1-2',
    //         label: '时间戳',
    //       },
    //     ],
    //   },
    // ]
    // const updateTime = [
    //   { id: 1, label: '政务' },
    //   { id: 2, label: '健康' },
    //   { id: 3, label: '交通' },
    //   { id: 4, label: '治安' },
    // ]
    // const updateTimeOption = updateTime.map(item => {
    //   return (
    //     <Option value={item.label} key={item.id}>
    //       {item.label}
    //     </Option>
    //   )
    // })
    return (
      <PageHeaderLayout>
        <div className="btncls">
          <Button onClick={this.handleBack} className="fr mr40">
            返回
          </Button>
        </div>
        <Card>
          <div className={styles.form}>
            <h3>
              信息资源代码:
              <span> {resourceDetail && resourceDetail.resourceCode}</span>
              信息资源名称:
              <span> {resourceDetail && resourceDetail.resourceName}</span>
              信息资源提供方:
              <span> {resourceDetail && resourceDetail.resourceProviderDepartment}</span>
              发布时间:
              <span> {resourceDetail && resourceDetail.resourcePublishTime}</span>
            </h3>
            <h3 style={{ display: isExpandOrFolder ? 'none' : 'block' }}>
              提供方代码:
              <span> {resourceDetail && resourceDetail.resourceProviderCode}</span>
              信息属性分类:
              <span> {resourceDetail && resourceDetail.resourceProjectCatalogType}</span>
              信息资源格式:
              <span> {resourceDetail && resourceDetail.resourceFormatClassify}</span>
              信息资源摘要:
              <span> {resourceDetail && resourceDetail.resourceAbstract}</span>
            </h3>
            <Button style={{ position: 'absolute', right: 35, top: 20 }} onClick={this.isFolderOrExpand}>
              {isExpandOrFolder ? '展开' : '收起'}
            </Button>
            <Divider />
          </div>
          <Form onSubmit={this.handleSubmit}>
            <FormItem label="是否开放" {...formItemLayout}>
              {getFieldDecorator('open', {
                initialValue: resourceDetail && +resourceDetail.disparkType,
                rules: [{ required: true, message: '请选择是否开放' }],
              })(
                <RadioGroup disabled>
                  <Radio value={1}>是</Radio>
                  <Radio value={0}>否</Radio>
                </RadioGroup>
              )}
              {/* {
                <span style={{marginRight:10,marginLeft:10}}>开放门户分类：</span>
              } */}
            </FormItem>
            {/* <FormItem label="开放门户分类" {...formItemLayout}>
              {getFieldDecorator('openType', {
                initialValue:
                  openData && openData.opendoorType ? openData.opendoorType : '开放门户分类',
              })(
                <Select style={{ width: 150 }} placeholder="开放门户分类">
                  {updateTimeOption}
                </Select>
              )}
            </FormItem> */}
            <FormItem label="是否共享" {...formItemLayout}>
              {getFieldDecorator('share', {
                initialValue:  resourceDetail && +resourceDetail.shareType,
                rules: [{ required: true, message: '请选择是否共享' }],
              })(
                <RadioGroup disabled>
                  <Radio value={1}>是</Radio>
                  <Radio value={0}>否</Radio>
                </RadioGroup>
              )}
            </FormItem>
            {/* <FormItem label="交换域" {...formItemLayout}>
              <InputGroup compact>
                {getFieldDecorator('switchArea')(<CheckboxGroup options={plainOptions} />)}
              </InputGroup>
            </FormItem> */}
            <FormItem label="订阅授权" {...formItemLayout}>
              {getFieldDecorator('subscribeLicense', {
                initialValue:  resourceDetail && +resourceDetail.subscriptionAuth,
                rules: [{ required: true, message: '请选择是否需要订阅授权' }],
              })(
                <RadioGroup disabled>
                  <Radio value={1}>需要</Radio>
                  <Radio value={0}>不需要</Radio>
                </RadioGroup>
              )}
            </FormItem>
            {/* <FormItem label="发布模式" {...formItemLayout}>
              {getFieldDecorator('types')(<Cascader options={options} />)}
            </FormItem>
            <FormItem label="发布频率" {...formItemLayout}>
              {getFieldDecorator('rate')(<Select>{optionSelect}</Select>)}
            </FormItem>
            <FormItem label="定时设置" {...formItemLayout}>
              <InputGroup compact>
                {getFieldDecorator('setTime')(
                  <Input style={{ width: '20%' }} placeholder="分钟" />
                )}
                {getFieldDecorator('setTime1')(
                  <Input style={{ width: '20%' }} placeholder="小时" />
                )}
                {getFieldDecorator('setTime2')(<Input style={{ width: '20%' }} placeholder="天" />)}
                {getFieldDecorator('setTime3')(<Input style={{ width: '20%' }} placeholder="月" />)}
                {getFieldDecorator('setTime4')(
                  <Input style={{ width: '20%' }} placeholder="星期" />
                )}
              </InputGroup>
            </FormItem> */}
            <FormItem {...submitLayout}>
              <div className="btnclsb">
                {/* <Button
                  type="primary"
                  className="mr64"
                  htmlType="submit"
                  style={{ marginRight: 20 }}
                  >
                  保存
                </Button> */}
                {/* <Button onClick={this.handleBack}>返回</Button> */}
              </div>
            </FormItem>
          </Form>
        </Card>
      </PageHeaderLayout>
    )
  }
}
