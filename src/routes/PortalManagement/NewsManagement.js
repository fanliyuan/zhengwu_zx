/*
 * @Author: ChouEric
 * @Date: 2018-07-03 14:16:35
 * @Last Modified by: ChouEric
 * @Last Modified time: 2018-07-23 18:10:32
 * @描述: 开放门户管理--资讯管理--类型管理
*/
import React, { Component, Fragment } from 'react'
// import { Link } from 'dva/router';
import { connect } from 'dva'
import { DatePicker, Input, Button, Table, Modal, Form, message, Popconfirm } from 'antd'
import moment from 'moment'

import PageHeaderLayout from '../../layouts/PageHeaderLayout'
import styles from './NewsManagement.less'

const { RangePicker } = DatePicker
// const { Option } = Select;

// @connect(({ overviewLogging, loading }) => ({
//   overviewLogging,
//   loading: loading.models.overviewLogging,
// }))
@Form.create()
@connect(({newsManagement}) => ({
  newsManagement,
}))
export default class NewsManagement extends Component {
  state = {
    name: '',
    operator: '',
    date: [],
    isChanged: false,
    modalShow: false,
    classifyName: '',
  }

  componentDidMount() {
    // const { dispatch } = this.props
    // const { date } = this.state
    // const dateRange = date.map((item) => {
    //   if (moment.isMoment(item)) {
    //     return +(item.format('x'))
    //   } else {
    //     return 0
    //   }
    // })
    // dispatch({
    //   type: 'overviewLogging/log',
    //   payload: {query: {...this.state, date: dateRange}, pagination: {pageSize: 10, current: 1}},
    // })
  }

  handleNameChange = e => {
    this.setState({
      isChanged: true,
    })
    this.setState({
      name: e.target.value.trim(),
    })
  }

  handleOperatorChange = e => {
    this.setState({
      isChanged: true,
    })
    this.setState({
      operator: e.target.value.trim(),
    })
  }

  handlePick = val => {
    this.setState({
      isChanged: true,
    })
    this.setState({
      date: val,
    })
  }

  handleSearch = () => {
    if (!this.state.isChanged) return // eslint-disable-line
    // const { dispatch } = this.props;
    // const query = this.state
    // const pagination = {
    //   current: 1,
    //   pageSize: 10,
    // }
    // const dateRange = query.date.map((item) => {
    //   if (moment.isMoment(item)) {
    //     return +(item.format('x'))
    //   } else {
    //     return 0
    //   }
    // })
    this.setState({
      isChanged: false,
    })
    // dispatch({
    //   type: 'overviewLogging/log',
    //   payload: { query: { ...query, date: dateRange }, pagination },
    // });
  }

  handleStandardTableChange = pagination => {
    // console.log(pagination, filtersArg, sorter)
    // const query = this.state
    // const { dispatch } = this.props;
    console.log(pagination) // eslint-disable-line
    // const dateRange = query.date.map((item) => {
    //   if (moment.isMoment(item)) {
    //     return +(item.format('x'))
    //   } else {
    //     return 0
    //   }
    // })

    // dispatch({
    //   type: 'overviewLogging/log',
    //   payload: { query: {...query, date: dateRange}, pagination },
    // });
  }

  handleSubmit = () => {
    this.props.form.validateFields((errors, value) => {
      if (!errors) {
        message.success(`操作成功${value.name}`)
        this.setState({
          modalShow: false,
        })
        this.props.form.setFieldsValue({ name: '' })
      }
    })
  }

  handleAdd = () => {
    // eslint-disable-line
    this.setState({
      modalShow: true,
      classifyName: '',
    })
    this.props.form.setFieldsValue({ name: '' })
  }

  handleEdit = row => {
    // eslint-disable-line
    this.setState({
      modalShow: true,
      classifyName: row.name,
    })
    this.props.form.setFieldsValue({ name: row.name })
  }

  handleDelete = row => {
    message.success(`成功删除${row.id}`)
  }

  render() {
    const { name, date, operator, modalShow, classifyName } = this.state
    const { getFieldDecorator } = this.props.form
    // const { overviewLogging: { data, pagination, stateList }, loading } = this.props

    const data = []

    for (let i = 0; i < 120; i++) {
      data.push({
        id: i,
        name: '数据名' + i, // eslint-disable-line
        operator: '操作人' + i, // eslint-disable-line
        time: moment(new Date() - 1000 * 60 * 60 * 5 * i, 'x').format('lll'),
      })
    }

    // const stateList = [
    //   {
    //     value: -1,
    //     label: '全部状态',
    //   },
    //   {
    //     value: 0,
    //     label: '运行中',
    //   },
    //   {
    //     value: 1,
    //     label: '已停止',
    //   },
    // ];

    const columns = [
      {
        title: '序号',
        dataIndex: 'id',
      },
      {
        title: '名称',
        dataIndex: 'name',
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
          return (
            <Fragment>
              <a onClick={() => this.handleEdit(row)} className="mr16">
                修改
              </a>
              <Popconfirm title="是否删除当前行" onConfirm={() => this.handleDelete(row)}>
                <a>删除</a>
              </Popconfirm>
            </Fragment>
          )
        },
      },
    ]

    columns.forEach(item => {
      item.align = 'center'
    })

    // const optionList = stateList.map(item => {
    //   // eslint-disable-line
    //   return (
    //     <Option value={item.value} key={item.value}>
    //       {item.label}
    //     </Option>
    //   );
    // });

    return (
      <PageHeaderLayout>
        <div className={styles.layout}>
          <div className={styles.search}>
            <Input
              placeholder="名称"
              value={name}
              onPressEnter={this.handleSearch}
              onChange={this.handleNameChange}
              className={styles.name}
              />
            <Input
              placeholder="操作人"
              value={operator}
              onPressEnter={this.handleSearch}
              onChange={this.handleOperatorChange}
              className={styles.operator}
              />
            <RangePicker value={date} onChange={this.handlePick} className={styles.date} />
            <Button type="primary" onClick={this.handleSearch} icon="search">
              搜索
            </Button>
          </div>
          <div className={styles.bar}>
            <Button type="primary" onClick={this.handleAdd} icon="plus" className={styles.button}>
              新增
            </Button>
          </div>
          <div>
            <Table
              bordered
              columns={columns}
              dataSource={data}
              // pagination={pagination}
              // loading={loading}
              rowKey="id"
              onChange={this.handleStandardTableChange}
              />
          </div>
          <Modal
            visible={modalShow}
            title={classifyName ? '修改文章分类' : '新增文章分类'}
            onOk={this.handleSubmit}
            onCancel={() => this.setState({ modalShow: false })}
            >
            <Form>
              <Form.Item label="名称" labelCol={{ span: 4 }} wrapperCol={{ span: 16 }}>
                {getFieldDecorator('name', {
                  rules: [{ required: true, message: '请输入文章分类' }],
                })(<Input />)}
              </Form.Item>
            </Form>
          </Modal>
        </div>
      </PageHeaderLayout>
    )
  }
}
