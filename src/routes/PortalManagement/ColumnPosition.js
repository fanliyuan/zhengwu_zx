/*
 * @Author: ChouEric
 * @Date: 2018-07-17 11:30:40
 * @Last Modified by: ChouEric
 * @Last Modified time: 2018-07-17 14:21:26
 * @描述: 开放门户管理 -- 栏目管理 -- 栏目位置
*/
import React, { Component } from 'react'
import { Form, Input, Select, DatePicker, Button, Table, message, Modal } from 'antd'
import moment from 'moment'
import { connect } from 'dva'

import PageHeaderLayout from '../../layouts/PageHeaderLayout'
import styles from './ColumnPosition.less'

const pageData = [
  // {
  //   value: 0,
  //   label: '功能页面',
  // },
  {
    value: 1,
    label: '首页',
  },
  {
    value: 2,
    label: '开放动态',
  },
  {
    value: 3,
    label: '目录资源',
  },
]

const pageTemp = pageData.map(item => item.label)

const data = []
for (let i = 1; i < 132; i++) {
  data.push({
    id: i,
    name: `重要新闻${i}`,
    page: pageTemp[Math.floor(Math.random() * 4)],
    position: i,
    operator: `操作人${i}`,
    time: moment(+Date.now() - 3600000 * i).format('lll'),
  })
}

@Form.create()
@connect(({columnPosition}) => ({
  columnPosition,
}))
export default class ColumnPosition extends Component {
  state = {
    query: {
      name: '',
      page: '功能页面',
      operator: '',
      time: [],
    },
    isChange: false,
    edit: '',
    editShow: false,
    loading: false,
    editId:-1,
  }

  componentDidMount = () => {
    const pagination = {pageSize:0,pageNum:0}
    const { dispatch } = this.props
    dispatch({
      type:'columnPosition/queryList',
      payload:{...pagination},
    })
  }

  nameChange = e => {
    this.setState({
      query: {
        ...this.state.query, // eslint-disable-line
        name: e.target.value,
      },
      isChange: true,
    })
  }

  pageChange = value => {
    this.setState({
      query: {
        ...this.state.query, // eslint-disable-line
        page: value,
      },
      isChange: true,
    })
  }

  operatorChange = e => {
    this.setState({
      query: {
        ...this.state.query, // eslint-disable-line
        operator: e.target.value,
      },
      isChange: true,
    })
  }

  timeChange = value => {
    this.setState({
      query: {
        ...this.state.query, // eslint-disable-line
        time: value,
      },
    })
  }

  handleSearch = () => {
    if (!this.state.isChange) {
      return false
    }
    message.success('搜索')
  }

  editName = row => {
    this.setState({
      editShow: true,
      edit: row.columnName,
      editId:row.columnId,
    })
    this.props.form.setFieldsValue({
      edit: row.columnName,
    })
  }

  editSubmit = () => {
    this.props.form.validateFields((errors,value) => {
      if (!errors) {
        this.setState({
          loading: true,
          editShow: false,
        })
        const operator = localStorage.getItem("accountName")
        const { dispatch } = this.props
        const { editId } = this.state
        dispatch({
          type:'columnPosition/updateItem',
          payload:{columnName:value.edit,columnId:editId,columnPname:operator},
        })
        setTimeout(() => {
          this.setState({
            loading: false,
          })
        }, 1000)
      }
    })
  }

  render() {
    const {
      query: { name, page, operator, time },
      edit,
      editShow,
      loading,
    } = this.state
    const { getFieldDecorator } = this.props.form
    const { columnPosition:{list} } = this.props
    const pageList = pageData
    const colums = [
      {
        title: '序号',
        dataIndex: 'columnId',
        align:'left',
      },
      {
        title: '栏目名称',
        dataIndex: 'columnName',
      },
      {
        title: '所属功能页面',
        dataIndex: 'columnPage',
      },
      {
        title: '位置',
        dataIndex: 'columnAddress',
      },
      {
        title: '操作人',
        dataIndex: 'columnPname',
      },
      {
        title: '操作时间',
        dataIndex: 'updateTime',
        reunder(text){
          return (moment(text).format("lll"))
        },
      },
      {
        title: '操作',
        // dataIndex: 'operation',
        render: (text, row) => {
          return <a onClick={() => this.editName(row)}>修改</a>
        },
      },
    ]
    colums.forEach(item => {
      item.align = 'center'
    })
    colums[0].align="left"

    const pageComs = pageList.map(item => (
      <Select.Option value={item.value} key={item.value}>
        {item.label}
      </Select.Option>
    ))

    return (
      <PageHeaderLayout>
        <div className="common-layout">
          <Form className="mb16">
            <Input
              value={name}
              onChange={this.nameChange}
              className={styles.input}
              placeholder="栏目名称"
              />
            <Select value={page} onChange={this.pageChange} className={styles.input}>
              {pageComs}
            </Select>
            <Input
              value={operator}
              onChange={this.operatorChange}
              className={styles.input}
              placeholder="操作人"
              />
            <DatePicker.RangePicker
              value={time}
              onChange={this.timeChange}
              className={styles.picker}
              />
            <Button type="primary" onClick={this.handleSearch} icon="search">
              搜索
            </Button>
          </Form>
          <Table
            dataSource={list}
            columns={colums}
            pagination={false}
            rowKey="columnId"
            bordered
            loading={loading}
            />
          <Modal
            visible={editShow}
            title="修改栏目名称"
            onOk={this.editSubmit}
            onCancel={() => {
              this.setState({ editShow: false })
            }}
            className={styles.modal}
            >
            <Form>
              <Form.Item label="栏目名称" labelCol={{ span: 4 }} wrapperCol={{ span: 12 }}>
                {getFieldDecorator('edit', {
                  initialValue: edit,
                  rules: [{ required: true, message: '请输入栏目名称' }],
                })(<Input />)}
              </Form.Item>
            </Form>
          </Modal>
        </div>
      </PageHeaderLayout>
    )
  }
}
