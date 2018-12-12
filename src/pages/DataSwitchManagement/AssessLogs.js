import React, { Component } from 'react'
import { Table } from 'antd'
import { connect } from 'dva'

import PageHeaderWrapper from '@/components/PageHeaderWrapper'

const statusObject = {
  '-1': '待审核',
  '0': '已拒绝',
  '1': '已通过',
}

@connect(({ subManagement, loading }) => ({
  subManagement,
  loading: loading.effects['subManagement/getAssessLogs'],
}))
export default class AssessLogs extends Component {
  columns = [
    {
      dataIndex: 'reviewer',
      title: '审核员',
    },
    {
      dataIndex: 'status',
      title: '审核结果',
      render(text) {
        return statusObject[text]
      },
    },
    {
      dataIndex: 'reason',
      title: '拒绝理由',
    },
    {
      dataIndex: 'subscribeTime',
      title: '申请时间',
    },
    {
      dataIndex: 'reviewTime',
      title: '审核时间',
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
    const { match, dispatch } = this.props
    dispatch({
      type: 'subManagement/getAssessLogs',
      payload: {
        id: match.params.id,
      },
    })
  }

  render() {
    const {
      loading = false,
      subManagement: { assessLogs = [] },
    } = this.props
    return (
      <PageHeaderWrapper buttonList={this.buttonList}>
        <div className="content_layout">
          <Table
            loading={loading}
            dataSource={assessLogs}
            columns={this.columns}
            pagination={false}
            bordered
            />
        </div>
      </PageHeaderWrapper>
    )
  }
}
