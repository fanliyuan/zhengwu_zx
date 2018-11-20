import React, { Component } from 'react'
import { connect } from 'dva'
import { DatePicker, Input, Select, Button, Table, Form } from 'antd'
import { Bind, Throttle } from 'lodash-decorators'

import { format0, format24 } from '../../utils/utils'
import PageHeaderLayout from '@/components/PageHeaderWrapper'
import styles from './Logging.less'

// 随机IP地址
function getRandomIp() {
  return `210.${Math.floor(Math.random() * 256)}.${Math.floor(Math.random() * 256)}.${Math.floor(Math.random() * 256)}`
}

const { RangePicker } = DatePicker
const { Option } = Select
const FormItem = Form.Item

@Form.create()
@connect(({ overviewLogging, loading }) => ({
  overviewLogging,
  loading: loading.models.overviewLogging,
}))
export default class Log extends Component {
  state = {
    queryData: {},
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
        pageSize: 10,
        pageNum: 1,
      },
    }, this.handleSearch)
  }

  handleStandardTableChange = pagination => {
    this.setState({
      pagination: {
        pageNum: pagination.current,
        pageSize:pagination.pageSize,
      },
    },() => {
      const { queryData } = this.state
      const { form: {setFieldsValue} } = this.props
      setFieldsValue(queryData)
      this.handleSearch(1,1)
    })
  }

  @Bind()
  @Throttle(1000)
  handleSearch(e, isPaginaiton=false) {
    const pagination = isPaginaiton?this.state.pagination:{pageNum:1,pageSize:10}
    const { dispatch, form: { getFieldsValue } } = this.props
    const queryData = getFieldsValue()
    this.setState({
      queryData: {
        ...queryData,
      },
    })
    if (queryData.createTime && queryData.createTime.length > 1) {
      queryData.startTime = format0(queryData.createTime[0].format('x'))
      queryData.endTime = format24(queryData.createTime[1].format('x'))
    }
    delete queryData.createTime
    dispatch({
      type: 'overviewLogging/log',
      payload: {
        body: {
          ...queryData,
          ...pagination,
          createUser: localStorage.getItem('accountName'),
          logType: 3,
        },
      },
    })
  }

  render() {
    const { overviewLogging: { loggingList, pagination, stateList }, loading, form: { getFieldDecorator } } = this.props
    const columns = [
      {
        title: 'ID',
        dataIndex: 'logId',
        align: 'center',
      },
      {
        title: '登录时间',
        dataIndex: 'createTime',
        align: 'center',
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
          return <span>{text === 0 ? <span className='orange'>登录成功</span> : <span className='silver'>登录失败</span>}</span>
        },
      },
    ]

    const optionList = stateList.map(item => {
      return (
        <Option value={item.value} key={item.value}>
          {item.label}
        </Option>
      )
    })

    return (
      <PageHeaderLayout>
        <div className={styles.layout}>
          <Form className='cf'>
            <FormItem className='w220 fl mr16'>
              {getFieldDecorator('createTime')(<RangePicker />)}
            </FormItem>
            <FormItem className='w150 fl mr16'>
              {getFieldDecorator('logIpAddress')(<Input placeholder='IP·地址' maxLength={50} />)}
            </FormItem>
            <FormItem className='w120 fl mr16'>
              {getFieldDecorator('logState')(<Select placeholder='登录结果'>{optionList}</Select>)}
            </FormItem>
            <FormItem className='w82 fl mr16'>
              <Button type="primary" onClick={this.handleSearch} icon="search"> 搜索 </Button>
            </FormItem>
            <FormItem className='w64 fl mr16'>
              <Button onClick={this.handleReset}>重置</Button>
            </FormItem>
          </Form>
          <div>
            <Table
              bordered
              columns={columns}
              dataSource={loggingList}
              pagination={pagination && {...pagination, showQuickJumper: true, showTotal: (total) => `共 ${Math.ceil(total / pagination.pageSize)}页 / ${total}条 数据`}}
              loading={loading}
              rowKey="logId"
              onChange={this.handleStandardTableChange}
              />
          </div>
        </div>
      </PageHeaderLayout>
    )
  }
}
