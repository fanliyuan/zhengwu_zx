import React, { PureComponent } from 'react'
import { connect } from 'dva'
import { Link } from 'dva/router'

import { Button, Table, Card, message, Badge } from 'antd'

import styles from './SystemNotification.less'
import PageHeaderLayout from '../../layouts/PageHeaderLayout'

@connect(({ SystemNotification, loading }) => ({
  SystemNotification,
  loading: loading.models.SystemNotification,
}))
export default class SystemNotification extends PureComponent {
  state = {
    selectedRowIds: [],
    state: false,
    params: '',
    changeState: false,
  }

  componentDidMount = () => {
    this.handleInfo()
  }

  componentDidUpdate = () => {
    const {
      SystemNotification: { backInfo, changeBack },
    } = this.props
    const { state, changeState } = this.state
    if (state && backInfo.backInfo) {
      this.deleteSuccess('删除成功')
    }
    if (changeState && changeBack.changeBack) {
      this.changeSuccess('修改成功')
    }
  }

  handleInfo = () => {
    const { dispatch } = this.props
    dispatch({
      type: 'SystemNotification/getIntros',
      payload: { query: { state: '' }, pagination: { pageSize: 10, current: 1 } },
    })
  }

  handleTableChange = pagination => {
    const { dispatch } = this.props
    const { params } = this.state
    dispatch({
      type: 'SystemNotification/getIntros',
      payload: { query: { state: params }, pagination },
    })
  }

  handleState = par => {
    const { dispatch } = this.props
    this.setState({
      params: par,
    })
    dispatch({
      type: 'SystemNotification/getIntros',
      payload: { query: { state: par }, pagination: { pageSize: 10, current: 1 } },
    })
  }

  handleDelete = () => {
    const { selectedRowIds } = this.state
    if (selectedRowIds.length === 0) {
      message.warning('选择不能为空')
    } else {
      const { dispatch } = this.props
      dispatch({
        type: 'SystemNotification/deleteRows',
        payload: { rows: selectedRowIds },
      })

      this.setState({
        state: true,
      })
    }
  }

  deleteSuccess = text => {
    message.warning(text)
    this.handleInfo()
    this.setState({
      state: false,
      selectedRowIds: [],
    })
  }

  handleChangeState = () => {
    const { selectedRowIds } = this.state
    if (selectedRowIds.length === 0) {
      message.warning('选择为空')
    } else {
      const { dispatch } = this.props
      dispatch({
        type: 'SystemNotification/changeState',
        payload: { rows: selectedRowIds },
      })
      this.setState({
        changeState: true,
      })
    }
  }

  changeSuccess = text => {
    message.warning(text)
    this.handleInfo()
    this.setState({
      changeState: false,
      selectedRowIds: [],
    })
  }

  render() {
    const {
      SystemNotification: { data, pagination },
      loading,
    } = this.props
    const columns = [
      {
        title: '通知标题',
        dataIndex: 'noteTitle',
        align: 'center',
        render: (val, row) => (
          <Link to={`/overview/noticeDetail/${row.id}`}>
            {row.state === 'noR' && <Badge dot />}
            {val}
          </Link>
        ),
      },
      {
        title: '通知时间',
        dataIndex: 'noteTime',
        align: 'center',
      },
    ]
    const rowSelection = {
      onChange: selectedRows => {
        this.setState({
          selectedRowIds: selectedRows,
        })
      },
      // getCheckboxProps: record => ({
      //   disabled: record.name === 'Disabled User',
      //   name: record.name,
      // }),
    }
    return (
      <PageHeaderLayout>
        {/* <div>
          {state && backInfo && this.deleteSuccess('删除成功')}
          {changeState && changeBack && this.changeSuccess('修改成功')}
        </div> */}
        <Card>
          <div className={styles.tableBtns}>
            <Button onClick={this.handleState.bind(null, '')}>全部通知</Button>
            <Button onClick={this.handleState.bind(null, 'noR')}>未读</Button>
            <Button onClick={this.handleState.bind(null, 'isR')}>已读</Button>
          </div>
          <div>
            <Table
              dataSource={data}
              columns={columns}
              rowKey="id"
              rowSelection={rowSelection}
              onChange={this.handleTableChange}
              bordered
              pagination={pagination && {...pagination, showQuickJumper: true, showTotal: (total) => `共 ${Math.ceil(total / pagination.pageSize)}页 / ${total}条 数据`}}
              loading={loading}
              />
          </div>
          <div className={styles.tableBtnsPro}>
            <Button onClick={this.handleDelete}>删除</Button>
            <Button onClick={this.handleChangeState}>标记已读</Button>
          </div>
        </Card>
      </PageHeaderLayout>
    )
  }
}
