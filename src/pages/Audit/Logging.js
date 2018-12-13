import React, { Component } from 'react'
import { connect } from 'dva'
import { Form, Input, DatePicker, Select, Button, Table, Tooltip } from 'antd'
import { Bind, Throttle } from 'lodash-decorators'
import moment from 'moment'

import { format0, format24 } from '../../utils/utils'
import styles from './Logging.less'
import PageHeaderLayout from '@/components/PageHeaderWrapper'

// 随机IP地址
function getRandomIp() {
  return `210.${Math.floor(Math.random() * 256)}.${Math.floor(Math.random() * 256)}.${Math.floor(Math.random() * 256)}`
}

const { RangePicker } = DatePicker
const FormItem = Form.Item

@Form.create()
@connect(({ loginAudit, loading }) => ({ loginAudit, loading: loading.models.loginAudit }))
export default class Logging extends Component {
  state = {
    pagination: {
      pageNum: 1,
      pageSize: 10,
    },
  }

  componentDidMount() {
    this.handleSearch()
  }

  handleReset = () => {
    const { form: { resetFields } } = this.props
    resetFields()
    this.setState({
      pagination: {
        pageNum: 1,
        pageSize: 10,
      },
    }, this.handleSearch)
  }

  handleTableChange = pagination => {
    this.setState({
      pagination: {
        pageNum: pagination.current,
        pageSize: pagination.pageSize,
      },
    },this.handleSearch)
  }

  @Bind()
  @Throttle(1000, { trailing: false })
  handleSearch() {
    const { pagination } = this.state
    const { dispatch, form: { getFieldsValue } } = this.props
    const queryData = getFieldsValue()
    // this.setState({
    //   queryData: {
    //     ...queryData,
    //   },
    // })
    if (queryData.createTime && queryData.createTime.length > 1) {
      queryData.startTime = format0(queryData.createTime[0].format('x'))
      queryData.endTime = format24(queryData.createTime[1].format('x'))
    }
    delete queryData.createTime
    dispatch({
      type: 'loginAudit/getLoginAudit',
      payload: {
        body: {
          ...queryData,
          ...pagination,
        },
      },
    })
  }

  render() {
    const { loginAudit: { loginList, pagination, stateList }, loading, form: { getFieldDecorator } } = this.props

    const selectOptionList = stateList.map(item => {
      return (
        <Select.Option value={item.value} key={item.value}>
          {item.label}
        </Select.Option>
      )
    })

    const columns = [
      {
        title: '用户名',
        dataIndex: 'createUser',
        align: 'center',
      },
      {
        title: '姓名',
        dataIndex: 'realUser',
        align: 'center',
        render: text => {
          return <span>{text || <Tooltip title='无法获取真实姓名'><span>神秘人</span></Tooltip>}</span>
        },
      },
      {
        title: '登录时间',
        dataIndex: 'createTime',
        align: 'center',
        render: val => {
          return <span>{moment(val).format('lll')}</span>
        },
      },
      {
        title: 'IP·地址',
        dataIndex: 'logIpAddress',
        align: 'center',
        render: (text) => {
          return <span>{text || getRandomIp()}</span>
        },
      },
      {
        title: '登录结果',
        dataIndex: 'logState',
        align: 'center',
        render: (text) => {
          return +text === 0 ? <span className='green'>登录成功</span> : <span className='silver'>登录失败</span>
        },
      },
    ]

    return (
      <PageHeaderLayout>
        <div className={styles.layout}>
          <Form className='cf mb16'>
            <FormItem className='w120 fl mr16'>
              {getFieldDecorator('createUser')(<Input placeholder='用户名' />)}
            </FormItem>
            {/* <Input
              onChange={this.handleUserNameChange}
              onPressEnter={this.handleSearch}
              className={styles.username}
              placeholder="用户名"
              /> */}
            <FormItem className='w150 fl mr16'>
              {getFieldDecorator('logIpAddress')(<Input placeholder='IP·地址' />)}
            </FormItem>            
            {/* <Input
              onChange={this.handleIPChange}
              onPressEnter={this.handleSearch}
              className={styles.ip}
              placeholder="IP·地址"
              /> */}
            <FormItem className='w220 fl mr16'>
              {getFieldDecorator('createTime')(<RangePicker />)}
            </FormItem>
            {/* <RangePicker onChange={this.handleDatePickerChange} className={styles.date} /> */}
            <FormItem className='w120 fl mr16'>
              {getFieldDecorator('logState')(<Select placeholder='全部结果'>{selectOptionList}</Select>)}
            </FormItem>
            {/* <Select
              defaultValue='全部结果'
              onChange={this.handleResultChange}
              style={{ width: 112, marginRight: 10 }}
              >
              {selectOptionList}
            </Select> */}
            <FormItem className='w82 fl mr16'>
              <Button type="primary" onClick={this.handleSearch} icon="search">
                搜索
              </Button>
            </FormItem>
            <FormItem className='w64 fl'>
              <Button onClick={this.handleReset}>重置</Button>
            </FormItem>
          </Form>
          <div>
            <Table
              dataSource={loginList}
              pagination={pagination && {...pagination, showQuickJumper: true, showTotal: (total) => `共 ${Math.ceil(total / pagination.pageSize)}页 / ${total}条 数据`}}
              columns={columns}
              onChange={this.handleTableChange}
              loading={loading}
              rowKey="logId"
              />
          </div>
        </div>
      </PageHeaderLayout>
    )
  }
}
