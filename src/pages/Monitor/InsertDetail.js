/*
 * @Author: ChouEric
 * @Date: 2018-07-04 10:36:15
 * @Last Modified by: ChouEric
 * @Last Modified time: 2018-07-17 11:12:44
 * @描述: 监控告警 -- 接入监控 -- 接入源数据监控
*/
import React, { Component } from 'react'
import { Link } from 'dva/router'
import { Form, DatePicker, Table, Button } from 'antd'
import moment from 'moment'

import PageHeaderLayout from '@/components/PageHeaderWrapper'
import styles from './InsertDetail.less'

export default class InsertDetail extends Component {
  state = {
    query: {
      time: [],
    },
    isChanged: false,
  }

  timeChange = value => {
    const { query } = this.state
    this.setState({
      query: {
        ...query,
        time: value,
      },
      isChanged: true,
    })
  }

  search = () => {
    if (!this.state.isChanged) {
      return false
    }
  }

  render() {
    const {
      query: { time },
    } = this.state

    const columns = [
      {
        title: '序号',
        dataIndex: 'id',
      },
      {
        title: '抽取数',
        dataIndex: 'select',
      },
      {
        title: '插入数',
        dataIndex: 'insert',
      },
      {
        title: '更新数',
        dataIndex: 'update',
      },
      {
        title: '删除数',
        dataIndex: 'delete',
      },
      {
        title: '异常数',
        dataIndex: 'exception',
      },
      {
        title: '抽取开始时间',
        dataIndex: 'time',
      },
      {
        title: '操作',
        dataIndex: 'operation',
        render: (text, row) => {
          return <Link to={`/monitor/insertResource/${row.id}`}>详情</Link>
        },
      },
    ]
    columns.forEach(item => {
      item.align = 'center'
    })

    const data = []
    for (let i = 0; i < 144; i++) {
      data.push({
        id: i,
        select: Math.ceil(Math.random() * 100 + 50),
        insert: Math.ceil(Math.random() * 100 + 20),
        update: Math.ceil(Math.random() * 100 + 20),
        delete: Math.ceil(Math.random() * 100 + 20),
        exception: Math.ceil(Math.random() * 100 + 20),
        time: moment(Date.now() - 1000 * 60 * 60 * 15 * i, 'x').format('lll'),
      })
    }

    return (
      <PageHeaderLayout>
        <div className={styles.layout}>
          <Form className={styles.search}>
            <DatePicker.RangePicker
              value={time}
              onChange={this.timeChange}
              className={styles.date}
              />
            <Button type="primary" icon="search" onClick={this.search}>
              搜索
            </Button>
          </Form>
          <Table columns={columns} dataSource={data} rowKey="id" bordered />
        </div>
      </PageHeaderLayout>
    )
  }
}
