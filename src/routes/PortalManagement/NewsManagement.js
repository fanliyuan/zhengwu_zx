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
import { DatePicker, Input, Button, Table, Modal, Form, Popconfirm, message } from 'antd'
import moment from 'moment'
import { format0, format24 } from '../../utils/utils'

import PageHeaderLayout from '../../layouts/PageHeaderLayout'
import styles from './NewsManagement.less'

const { RangePicker } = DatePicker
let msgs

@Form.create()
@connect(({newsManagement,loading}) => ({
  newsManagement,
  loading:loading.effects['newsManagement/querysCatagory'],
}))
export default class NewsManagement extends Component {
  state = {
    name: '',
    operator: '',
    date: [],
    isChanged: false,
    modalShow: false,
    classifyName: '',
    submitId:-1,
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
    const pagination ={ pageSize:10,pageNum:1}
    const { dispatch } = this.props
    dispatch({
      type:'newsManagement/querysCatagory',
      payload:{...pagination},
    })
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
    const { date, name, operator } = this.state
    const { dispatch } = this.props
    const pagination ={ pageSize:10,pageNum:1}
    const dateRange = date.map((item) => {
      if (moment.isMoment(item)) {
        return item.format('x')
      } else {
        return ''
      }
    })
    this.setState({
      isChanged: false,
    })
    dispatch({
      type:'newsManagement/querysCatagory',
      payload:{...pagination,categoryName:name, categoryPname:operator,createTime:format0(+dateRange[0]),updateTime:format24(+dateRange[1])},
    })
  }

  handleStandardTableChange = pagination => {
    const paginations ={ pageSize:pagination.pageSize,pageNum:pagination.current}
    const { dispatch } = this.props
    dispatch({
      type:'newsManagement/querysCatagory',
      payload:{...paginations},
    })
  }

  handleSubmit = () => {
    this.props.form.validateFields((errors,value) => {
      if (!errors) {
        // message.success(`操作成功 ${value.name}`)
        this.setState({
          modalShow: false,
        })
        const operator = localStorage.getItem("accountRealName")
        this.props.form.setFieldsValue({ name: '' })
        const { dispatch } = this.props
        const { submitId } = this.state
        if(submitId === -1){
          dispatch({
            type:'newsManagement/insertCatagory',
            payload:{categoryName:value.name,categoryPname:operator},
          })
        }else {
          dispatch({
            type:'newsManagement/updateCatagory',
            payload:{categoryId:submitId,categoryName:value.name,categoryPname:operator},
          })
        }
      }
    })
  }

  handleAdd = () => {
    // eslint-disable-line
    this.setState({
      modalShow: true,
      classifyName: '',
      submitId:-1,
    })
    this.props.form.setFieldsValue({ name: '' })
  }

  handleEdit = row => {
    // eslint-disable-line
    this.setState({
      modalShow: true,
      classifyName: row.categoryName,
      submitId:row.categoryId,
    })
    this.props.form.setFieldsValue({ name: row.categoryName })
  }

  handleDelete = row => {
    const { dispatch } = this.props
    dispatch({
      type:'newsManagement/deleteCatagory',
      payload:{categoryId:+row.categoryId},
    })
  }

  handleNameCheck = async (e) => {
    const vl = e.target.value
    const { dispatch } = this.props
    const { submitId, classifyName } = this.state
    await dispatch({
      type:'newsManagement/checkNames',
      payload:{categoryName:e.target.value},
    })
    if(!msgs && +submitId === -1){
      message.error("分类名称重复,请重新输入")
      this.props.form.setFieldsValue({
        name:"",
      })
    }
   else if(!msgs && +submitId !== -1){
     if( classifyName !== vl){
      message.error("分类名称重复,请重新输入")
      this.props.form.setFieldsValue({
        name:"",
      }) 
     }
    }
  }

  render() {
    const { name, date, operator, modalShow, classifyName } = this.state
    const { getFieldDecorator } = this.props.form
    const { newsManagement:{list,pagination,msg},loading } = this.props
    msgs = msg
    const columns = [
      {
        title: '序号',
        dataIndex: 'kid',
      },
      {
        title: '名称',
        dataIndex: 'categoryName',
      },
      {
        title: '操作人',
        dataIndex: 'categoryPname',
      },
      {
        title: '操作时间',
        dataIndex: 'updateTime',
        render(text){
          return(moment(+text).format('lll'))
        },
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
              <Popconfirm title="您是否确认删除此分类" onConfirm={() => this.handleDelete(row)}>
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
              dataSource={list}
              pagination={pagination && {...pagination, showQuickJumper: true, showTotal: (total) => `共 ${Math.ceil(total / pagination.pageSize)}页 / ${total}条 数据`}}
              loading={loading}
              rowKey="categoryId"
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
                })(<Input />)}{/* onBlur={this.handleNameCheck} */}
              </Form.Item>
            </Form>
          </Modal>
        </div>
      </PageHeaderLayout>
    )
  }
}
