import React, { Component } from 'react'
import { Input, Card, Form, Button, Steps, Select, Modal, Row, Col, Table } from 'antd'
import { routerRedux } from 'dva/router'
import { connect } from 'dva'

import PageHeaderLayout from '../../layouts/PageHeaderLayout'
import styles from './InputDataInfo.less'

const FormItem = Form.Item
const { Step } = Steps
const { Option } = Select
const { TextArea } = Input
@connect(({ inputData }) => ({
  inputData,
}))
@Form.create()
export default class InputDataInfo extends Component {
  state = {
    disabled: true,
    visible: false,
  }

  componentDidMount() {
    if (this.props.location.pathname !== '/dataSourceManagement/checkDataInfo') {
      this.setState({
        disabled: false,
      })
    }
  }

  handleShowModal= () => {
    this.setState({
      visible: true,
    })
  }

  handleOk = () => {
    this.setState({
      visible: false,
    })
  }

  handleCancel = () => {
    this.setState({
      visible: false,
    })
  }

  handleSubmit = () => {}

  handleNext = () => {
    const { dispatch } = this.props
    if (!this.state.disabled) {
      dispatch(routerRedux.push('/dataSourceManagement/setPlan'))
    } else {
      dispatch(routerRedux.push('/dataSourceManagement/checkPlan'))
    }
  }

  handleBack = () => {
    const { dispatch } = this.props
    dispatch(routerRedux.push('/dataSourceManagement/sourceManagement'))
  }

  render() {
    const { getFieldDecorator, getFieldValue } = this.props.form
    const { disabled, visible } = this.state
    const optionData = [
      { label: 'Youedata_dig', value: '0', id: '0' },
      { label: 'Youedata_hig', value: '1', id: '1' },
    ]
    const optionSelect = optionData.map(item => {
      return (
        <Option value={item.value} key={item.id} label={item.label}>
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
    const pagination = {
      current: 1,
      pageSize: 10,
    }
    const columns = [
      {
        title: '序号',
        dataIndex: 'id',
        render(text){
          return(<div><input type="checkbox" style={{marginRight:5}} />{text}</div>)
        },
      },
      {
        title: '表名称',
        dataIndex: 'tableName',
      },
      {
        title: '中文标注',
        dataIndex: 'chineseLabel',
      },
    ]
    const list = [
      {
        id: 0,
        tableName: 'dig_user',
        chineseLabel: '用户表',
      },
      {
        id: 1,
        tableName: 'dig_order',
        chineseLabel: '订单表',
      },
    ]
    const columns1 = [
      {
        title: '序号',
        dataIndex: 'id',
        render(text){
          return(<div><input type="checkbox" style={{marginRight:5}} />{text}</div>)
        },
      },
      {
        title: '字段名称',
        dataIndex: 'public',
      },
      {
        title: '数据类型',
        dataIndex: 'post_title',
      },
      {
        title: '中文标注',
        dataIndex: 'post_content',
      },
    ]
    const list1 = [
      {
        id: 0,
        blog_id: 1,
        public: 'blog_id',
        last_updated: 21111277,
        post_title: 'bigint(20)',
        post_content:
          '',
      },
      {
        id: 1,
        blog_id: 2,
        public: 'public',
        last_updated: 21111277,
        post_title: 'tinyint(2)',
        post_content:
          '',
      },
      {
        id: 2,
        blog_id: 2,
        public: 'last_updated',
        last_updated: 21111277,
        post_title: 'datetime',
        post_content:
          '',
      },
    ]
    return (
      <PageHeaderLayout>
        <Card>
          <Steps current={0} className={styles.loadings}>
            <Step title="录入资源信息" />
            <Step title="设置同步计划" />
            <Step title="完成" />
          </Steps>
          <Form onSubmit={this.handleSubmit}>
            <FormItem label="选择数据库" {...formItemLayout}>
              {getFieldDecorator('dataBase', {
                rules: [
                  {
                    required: true,
                    message: '请选择数据库',
                  },
                ],
              })(<Select disabled={disabled}>{optionSelect}</Select>)}
              <span onClick={this.handleShowModal} style={{color:'#1890FF',display:getFieldValue('dataBase') ? 'block' : 'none'}}>编辑数据</span>
            </FormItem>
            <FormItem label="类型" {...formItemLayout}>
              {getFieldDecorator('types')(<Input disabled={disabled} />)}
            </FormItem>
            <FormItem label="资源名称" {...formItemLayout}>
              {getFieldDecorator('sourceName')(<Input disabled={disabled} />)}
            </FormItem>
            <FormItem label="建库单位" {...formItemLayout}>
              {getFieldDecorator('buildUnit')(<Input disabled={disabled} />)}
            </FormItem>
            <FormItem label="应用系统名称" {...formItemLayout}>
              {getFieldDecorator('systemName')(<Input disabled={disabled} />)}
            </FormItem>
            <FormItem label="数据库描述" {...formItemLayout}>
              {getFieldDecorator('dataBaseDescription')(<TextArea row={4} readOnly={disabled} />)}
            </FormItem>
            <FormItem label="负责人姓名" {...formItemLayout}>
              {getFieldDecorator('headerName')(<Input disabled={disabled} />)}
            </FormItem>
            <FormItem label="负责人手机号" {...formItemLayout}>
              {getFieldDecorator('headerNum')(<Input disabled={disabled} />)}
            </FormItem>
            <FormItem label="负责人职位" {...formItemLayout}>
              {getFieldDecorator('headerPosition')(<Input disabled={disabled} />)}
            </FormItem>
            <div className="btnclsb">
              <Button type="primary" className="mr64" onClick={this.handleNext}>
                下一步
              </Button>
              <Button onClick={this.handleBack}>返回</Button>
            </div>
          </Form>
          <Modal title="数据库：Youedata_dig" visible={visible} onOk={this.handleOk} onCancel={this.handleCancel} width={800}>
            <Row>
              <Col span={9}>
                <h3>
                  数据表 共<span className={styles.spe}>32</span>张
                </h3>
                <Table
                  columns={columns}
                  dataSource={list}
                  pagination={pagination}
                  // rowSelection={rowSelection}
                  rowKey="id"
                  bordered
                  />
              </Col>
              <Col span={14} offset={1}>
                <h3>
                  数据 共<span className={styles.spe}>32</span>行
                </h3>
                <Table
                  columns={columns1}
                  dataSource={list1}
                  pagination={pagination}
                  // rowSelection={rowSelection}
                  rowKey="id"
                  bordered
                  />
              </Col>
            </Row>
          </Modal>
        </Card>
      </PageHeaderLayout>
    )
  }
}
