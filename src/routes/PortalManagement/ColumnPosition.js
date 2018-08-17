/*
 * @Author: ChouEric
 * @Date: 2018-07-17 11:30:40
 * @Last Modified by: ChouEric
 * @Last Modified time: 2018-07-17 14:21:26
 * @描述: 开放门户管理 -- 栏目管理 -- 栏目位置
*/
import React, { Component } from 'react'
import { Form, Input, Select, DatePicker, Button, Table, Modal } from 'antd'
import moment from 'moment'
import { connect } from 'dva'
import { format0, format24 } from '../../utils/utils'

import PageHeaderLayout from '../../layouts/PageHeaderLayout'
import styles from './ColumnPosition.less'

@Form.create()
@connect(({columnPosition,loading}) => ({
  columnPosition,
  loadingTable:loading.effects['columnPosition/queryList'],
}))
export default class ColumnPosition extends Component {
  state = {
    query: {
      name: '',
      page: -1,
      operator: '',
      time: [],
    },
    isChange: false,
    edit: '',
    editShow: false,
    editId:-1,
  }

  componentDidMount = () => {
    const pagination = {pageSize:0,pageNum:0}
    const { dispatch } = this.props
    dispatch({
      type:'columnPosition/queryList',
      payload:{...pagination},
    })
    dispatch({
      type:'columnPosition/selectColumnPage',
      // payload:{},
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
      isChange: true,
    })
  }

  handleSearch = () => {
    if (!this.state.isChange) {
      return false
    }
    const { query:{ page,operator,time } } = this.state
    const times = time.map(item => {
      if(moment.isMoment(item)){
        return item.format('x')
      }
      else {
        return ''
      }
    })
    const pages = page === -1 ? '' : page
    const { dispatch } = this.props
    dispatch({
      type:'columnPosition/searchList',
      payload:{columnPage:pages, columnPname:operator, pageNum:0,pageSize:0,createTime:format0(+times[0]),updateTime:format24(+times[1])},
    })
  }

  editName = row => {
    this.setState({
      editShow: true,
      edit: row.name,
      editId:row.columnId,
    })
    this.props.form.setFieldsValue({
      edit: row.name,
    })
  }

  editSubmit = () => {
    this.props.form.validateFields((errors,value) => {
      if (!errors) {
        this.setState({
          editShow: false,
        })
        const operator = localStorage.getItem("accountName")
        const { dispatch } = this.props
        const { editId } = this.state
        dispatch({
          type:'columnPosition/updateItem',
          payload:{columnPage:value.edit,columnId:editId,columnPname:operator},
        })
      }
    })
  }

  render() {
    const {
      query: { page, operator, time },
      edit,
      editShow,
    } = this.state
    const { getFieldDecorator } = this.props.form
    const { columnPosition:{list,pageList}, loadingTable } = this.props
    // const pageList = pageData
    const colums = [
      {
        title: '序号',
        dataIndex: 'columnId',
        align:'left',
      },
      {
        title: '栏目名称',
        dataIndex: 'name',
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
        render(text){
          return (moment(+text).format("lll"))
        },
      },
      {
        title: '操作',
        // dataIndex: 'operation',
        render: (text, row) => {
         if(row.children){
          return <span className={styles.disableEdit}>修改</span>
         }
         else {
          return <span onClick={() => this.editName(row)} className={styles.noramlEdit}>修改</span>
         }
        },
      },
    ]
    colums.forEach(item => {
      item.align = 'center'
    })
    colums[0].align="left"

    const pageComs = pageList.map(item => (
      <Select.Option value={item.columnId} key={item.columnId}>
        {item.columnPage}
      </Select.Option>
    ))

    return (
      <PageHeaderLayout>
        <div className="common-layout">
          <Form className="mb16">
            {/* <Input
              value={name}
              onChange={this.nameChange}
              className={styles.input}
              placeholder="栏目名称"
              /> */}
            <Select value={page} onChange={this.pageChange} className={styles.input} placeholder="功能页面">
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
            loading={loadingTable}
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
