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

import PageHeaderLayout from '../../layouts/PageHeaderLayout'
import styles from './ColumnPosition.less'

const pageData = [
  {
    value: 0,
    label: '功能页面',
  },
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
for (let i = 0; i < 132; i++) {
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
export default class ColumnPosition extends Component {
  state = {
    query: {
      name: '',
      page: 1,
      operator: '',
      time: [],
    },
    isChange: false,
    edit: '',
    editShow: false,
    loading: false,
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
      edit: row.name,
    })
    this.props.form.setFieldsValue({
      edit: row.name,
    })
  }

  // editChange = (e) => {
  //   this.setState({
  //     edit: e.target.value,
  //   })
  // }
  editSubmit = () => {
    this.props.form.validateFields((errors, value) => {
      if (!errors) {
        this.setState({
          loading: true,
          editShow: false,
        })
        setTimeout(() => {
          this.setState({
            loading: false,
          })
          message.success(`栏目名修改为${value.edit}`)
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
    const pageList = pageData
    const colums = [
      {
        title: '序号',
        dataIndex: 'id',
      },
      {
        title: '栏目名称',
        dataIndex: 'name',
      },
      {
        title: '所属功能页面',
        dataIndex: 'page',
      },
      {
        title: '位置',
        dataIndex: 'position',
      },
      {
        title: '操作人',
        dataIndex: 'operator',
      },
      {
        title: '操作时间',
        dataIndex: 'time',
      },
      {
        title: '操作',
        dataIndex: 'operation',
        render: (text, row) => {
          return <a onClick={() => this.editName(row)}>修改</a>
        },
      },
    ]
    colums.forEach(item => {
      item.align = 'center'
    })

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
            dataSource={data}
            columns={colums}
            pagination
            rowKey="id"
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
