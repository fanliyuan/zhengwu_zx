import React, { Component } from 'react'
import { Input, Card, Form, Button, Select, Modal, Row, Col, Table } from 'antd'
import { routerRedux } from 'dva/router'
import { connect } from 'dva'

import PageHeaderLayout from '../../layouts/PageHeaderLayout'
import styles from './Export.less'

const FormItem = Form.Item
const { Option } = Select
@connect(({ inputData }) => ({
  inputData,
}))
@Form.create()
export default class Export extends Component {
  state = {
    visible: false,
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
      dispatch(routerRedux.push('/dataSourceManagement/sourceManagement'))
  }

  handleBack = () => {
    const { dispatch } = this.props
    dispatch(routerRedux.push('/dataSourceManagement/sourceManagement'))
  }

  render() {
    const { getFieldDecorator, getFieldValue } = this.props.form
    const { visible } = this.state
    const optionData = [
      { label: 'YEXCEL/XL', value: '0', id: '0' },
      { label: 'EXCEL/CSV', value: '1', id: '1' },
      { label: 'JSON', value: '2', id: '2' },
      { label: 'XML', value: '3', id: '3' },
      { label: 'MYSQL', value: '4', id: '4' },
    ]
    const optionSelect = optionData.map(item => {
      return (
        <Option value={item.value} key={item.id} label={item.label}>
          {item.label}
        </Option>
      )
    })
    const optionData1 = [
      { label: 'UTF-8', value: '0', id: '0' },
      { label: 'GBK', value: '1', id: '1' },
    ]
    const optionSelect1 = optionData1.map(item => {
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
          <Form onSubmit={this.handleSubmit}>
            <FormItem label="导出格式" {...formItemLayout}>
              {getFieldDecorator('exportType', {
                rules: [
                  {
                    required: true,
                    message: '请输入导出格式',
                  },
                ],
              })(<Select>{optionSelect}</Select>)}
              <span onClick={this.handleShowModal} style={{color:'#1890FF',display:getFieldValue('dataBase') ? 'block' : 'none'}}>编辑数据</span>
            </FormItem>
            <FormItem label="导出文件名" {...formItemLayout}>
              {getFieldDecorator('types')(<Input />)}
            </FormItem>
            <FormItem label="导出编码格式" {...formItemLayout}>
              {getFieldDecorator('exportEncoding', {
                rules: [
                  {
                    required: true,
                    message: '请选导出编码格式',
                  },
                ],
              })(<Select>{optionSelect1}</Select>)}
              <span onClick={this.handleShowModal} style={{color:'#1890FF',display:getFieldValue('dataBase') ? 'block' : 'none'}}>编辑数据</span>
            </FormItem>
            <div className="btnclsb">
              <Button type="primary" className="mr64" onClick={this.handleNext}>
                开始导出
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
                  pagination={pagination && {...pagination, showQuickJumper: true, showTotal: (total) => `共 ${Math.ceil(total / pagination.pageSize)}页 / ${total}条 数据`}}
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
                  pagination={pagination && {...pagination, showQuickJumper: true, showTotal: (total) => `共 ${Math.ceil(total / pagination.pageSize)}页 / ${total}条 数据`}}
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
