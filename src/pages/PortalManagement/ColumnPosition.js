/*
 * @Author: ChouEric
 * @Date: 2018-07-17 11:30:40
 * @Last Modified by: ChouEric
 * @Last Modified time: 2018-09-14 17:41:46
 * @描述: 开放门户管理 -- 栏目管理 -- 栏目位置
*/
import React, { Component } from 'react'
import { Form, Input, Select, DatePicker, Button, Table, Modal, message } from 'antd'
import moment from 'moment'
import { connect } from 'dva'
import { format0, format24 } from '../../utils/utils'

import PageHeaderLayout from '@/components/PageHeaderWrapper'
import styles from './ColumnPosition.less'

let msgs
@Form.create()
@connect(({columnPosition,loading}) => ({
  columnPosition,
  loadingTable:loading.models.columnPosition,
}))
export default class ColumnPosition extends Component {
  state = {
    query: {
      name: '',
      page: null,
      operator: '',
      time: [],
    },
    isChange: false,
    edit: '',
    editShow: false,
    editId:-1,
    parentId:-1,
  }

  componentDidMount = () => {
    const pagination = {pageSize:10,pageNum:1}
    const { dispatch } = this.props
    dispatch({
      type:'columnPosition/searchList',
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
    const pages = page === -1 ? undefined : page
    const { dispatch } = this.props
    dispatch({
      type:'columnPosition/searchList',
      payload:{columnId:pages, columnPname:operator || undefined, pageNum:1,pageSize:10,createTime:times[0] ? format0(+times[0]) :undefined,updateTime:times[1] ? format24(+times[1]) : undefined},
    })
  }

  editName = row => {
    this.setState({
      editShow: true,
      edit: row.name,
      editId:row.columnId,
      parentId:row.columnPid,
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
        if(value.edit.trim().length > 10){
          message.error("输入栏目名称过长,请重新输入")
          return
        }
        const operator = localStorage.getItem("accountRealName")
        const { dispatch } = this.props
        const { editId, parentId } = this.state
        dispatch({
          type:'columnPosition/updateItem',
          payload:{columnPage:value.edit,columnPid:parentId,columnId:editId,columnPname:operator},
        })
      }
    })
  }

  tableChange = (pagination) => {
    const { query:{ page,operator,time } } = this.state
    const times = time.map(item => {
      if(moment.isMoment(item)){
        return item.format('x')
      }
      else {
        return ''
      }
    })
    const pages = page === -1 ? undefined : page
    const { dispatch } = this.props
    dispatch({
      type:'columnPosition/searchList',
      payload:{columnId:pages, columnPname:operator || undefined, pageNum:pagination.current,pageSize:pagination.pageSize,createTime:times[0] ? format0(+times[0]) :undefined,updateTime:times[1] ? format24(+times[1]) : undefined},
    })
  }

  handleLengthCheck = (e) => {
    if(e.target.value.length > 20){
      this.props.form.setFieldsValue({
        edit:e.target.value.slice(0,20),
      })
      message.error("栏目名称不能超过20个字符!")
    }
  }

  handleNameCheck = async (e) => {
    const vl = e.target.value
    const { dispatch } = this.props
    const { edit, parentId } = this.state
    await dispatch({
      type:'columnPosition/checkColumn',
      payload:{columnPage:e.target.value, columnPid:parentId},
    })
     if(!msgs && edit !== vl){
      message.error("分类名称重复,请重新输入")
      this.props.form.setFieldsValue({
        edit:"",
      }) 
     }
  }
 
  render() {
    const {
      query: { page, operator, time },
      edit,
      editShow,
    } = this.state
    const texts = {emptyText:"暂无相关数据"}
    const { getFieldDecorator } = this.props.form
    const { columnPosition:{list,pageList, pagination,msg}, loadingTable } = this.props
    msgs = msg
    // const pageList = pageData
    const colums = [
      {
        title: '序号',
        dataIndex: 'kid',
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
         else if(+row.columnId === 1 || +row.columnId === 2 || +row.columnId === 3){
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
            pagination={pagination && {...pagination, showQuickJumper: true, showTotal: (total) => `共 ${Math.ceil(total / pagination.pageSize)}页 / ${total}条 数据`}}
            rowKey="columnId"
            bordered
            loading={loadingTable}
            // defaultExpandAllRows={false}
            onChange={this.tableChange}
            locale={texts}
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
                })(<Input onKeyUp={this.handleLengthCheck} />)} {/*  onBlur={this.handleNameCheck} */}
              </Form.Item>
            </Form>
          </Modal>
        </div>
      </PageHeaderLayout>
    )
  }
}
