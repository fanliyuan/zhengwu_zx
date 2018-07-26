import React, { Component } from 'react'
import { connect } from 'dva'
import { routerRedux } from 'dva/router'
import { Table, Button, Input, Card, DatePicker } from 'antd'
import moment from 'moment'

import styles from './SubscriptionAudit.less'
import PageHeaderLayout from '../../layouts/PageHeaderLayout'

const { RangePicker } = DatePicker

@connect()
export default class SubscriptionAudit extends Component {
  goAuditLog = row => {
    this.props.dispatch(routerRedux.push('/dataSwitchManagement/auditLog', { ...row }))
  }

  render() {
    const pagination = { pageSize: 10, current: 1 }
    const columns = [
      {
        title: 'ID',
        dataIndex: 'id',
      },
      {
        title: '订阅名称',
        dataIndex: 'name',
      },
      {
        title: '目录名称',
        dataIndex: 'catalogName',
      },
      {
        title: '目录资源',
        dataIndex: 'catalogSource',
      },
      {
        title: '订阅申请人',
        dataIndex: 'subscriptionProposer',
      },
      {
        title: '订阅申请时间',
        dataIndex: 'applyTime',
        render(text) {
          return moment(text).format('YYYY-MM-DD HH:mm:ss')
        },
      },
      {
        title: '审核状态',
        dataIndex: 'status',
        render(text) {
          return +text <= 0 ? '待审批' : +text === 1 ? '已通过' : '已拒绝'
        },
      },
      {
        title: '操作',
        render: (text, row) => {
          if (+row.status >= 2) {
            return (
              <div>
                <a style={{ marginRight: 20 }}>详情</a>
                {/* <Link to={`/dataSwitchManagement/auditLog/${row.id}/${row.state || 0}`}>审核日志</Link> */}
                <a onClick={() => this.goAuditLog(row)}>审核详情</a>
              </div>
            )
          } else {
            return (
              <div>
                <a style={{ marginRight: 20 }}>详情</a>
                <a>审核</a>
              </div>
            )
          }
        },
      },
    ]
    columns.forEach(item => {
      item.align = 'center'
    })
    const list = [
      {
        id: 0,
        name: '',
        catalogName: '石家庄东城区国土数据',
        catalogSource: '石家庄东城区',
        subscriptionProposer: '李一',
        applayTime: 232444242,
        status: '0',
      },
      {
        id: 1,
        name: '',
        catalogName: '',
        catalogSource: '',
        subscriptionProposer: '',
        applayTime: 232444242,
        status: '1',
      },
      {
        id: 2,
        name: '',
        catalogName: '',
        catalogSource: '',
        subscriptionProposer: '',
        applayTime: 232444242,
        status: '2',
      },
      {
        id: 3,
        name: '',
        catalogName: '',
        catalogSource: '',
        subscriptionProposer: '',
        applayTime: 232444242,
        status: '3',
      },
    ]
    return (
      <PageHeaderLayout>
        <Card>
          <div className={styles.form}>
            <Input placeholder="发布名称" style={{ width: 150, marginRight: 20 }} />
            <Input placeholder="订阅申请人" style={{ width: 150, marginRight: 20 }} />
            <RangePicker style={{ marginRight: 20, width: 250 }} />
            <Button type="primary">搜索</Button>
          </div>
          <div>
            <Table
              columns={columns}
              dataSource={list}
              pagination={pagination}
              rowKey="id"
              bordered
            />
          </div>
        </Card>
      </PageHeaderLayout>
    )
  }
}
