import React, { Component } from 'react'
import { Table } from 'antd'
import { connect } from 'dva'

import PageHeaderWrapper from '@/components/PageHeaderWrapper'

// const statusObject = {
//   '-1': '待审核',
//   '0': '已拒绝',
//   '1': '已通过',
// }

@connect(({ allSubscription, loading }) => ({
  allSubscription,
  loading: loading.effects['allSubscription/getAssessLogs'],
}))
export default class AssessLogs extends Component {
  columns = [
    {
      dataIndex: 'auditUser',
      title: '审核员',
      align: 'center',
    },
    {
      dataIndex: 'auditResult',
      title: '审核结果',
      // render(text) {
      //   return statusObject[text]
      // },
      align: 'center',
    },
    {
      dataIndex: 'reasonsRefusalInfo',
      title: '拒绝理由',
      align: 'center',
    },
    {
      dataIndex: 'reqTime',
      title: '申请时间',
      align: 'center',
    },
    {
      dataIndex: 'auditTime',
      title: '审核时间',
      align: 'center',
    },
  ];

  buttonList = [
    {
      text: '返回',
      fn() {
        window.history.back()
      },
    },
  ];

  componentDidMount() {
    const { history: { location: { state: { resourceId } } }, dispatch } = this.props
    dispatch({
      type: 'allSubscription/getAssessLogs',
      payload: {
        resourceId,
        pageNum: 1,
        pageSize: 10,
      },
    })
  }

  render() {
    const {
      loading = false,
      allSubscription: { assessLogs = [] },
    } = this.props
    return (
      <PageHeaderWrapper buttonList={this.buttonList}>
        <div className="content_layout">
          <Table
            loading={loading}
            dataSource={assessLogs}
            columns={this.columns}
            pagination={false}
            rowKey='id'
            bordered
            />
        </div>
      </PageHeaderWrapper>
    )
  }
}
