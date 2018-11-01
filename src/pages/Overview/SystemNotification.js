import React, { PureComponent } from 'react'
import { connect } from 'dva'
import { routerRedux } from 'dva/router'
import { Button, Table, Card, message, Badge } from 'antd'
import moment from 'moment'
// import Cookies from 'js-cookie'

// import { getName } from '../../utils/faker'


import styles from './SystemNotification.less'
import PageHeaderLayout from '@/components/PageHeaderWrapper'

let selectedRowIds = []
let accountIdState
@connect(({systemNotification,loading}) => ({
  systemNotification,
  loading: loading.models.systemNotification,
}))
export default class SystemNotification extends PureComponent {
  state = {
    flag:1,
  }

  componentDidMount = () => {
    const accountId = localStorage.getItem("accountId")
    accountIdState = accountId
    const { dispatch } = this.props
    dispatch({
      type:'systemNotification/getNoticeList',
      payload:{accountId,pageSize:10,pageNumber:1,state: 0},
    })
  }

  handleTableChange = (pagination) => {
    const accountId = localStorage.getItem("accountId")
    accountIdState = accountId
    const { dispatch } = this.props
    dispatch({
      type:'systemNotification/getNoticeList',
      payload:{accountId,pageSize:pagination.pageSize,pageNumber:pagination.current},
    })
  }

  handleState = (res, flag) => {
    const accountId = localStorage.getItem("accountId")
    const { dispatch } = this.props
    let states
    if(res === 'noR'){
      states = 0
    }
    else if(res === 'isR'){
      states = 1
    }
    else if(res === ''){
      states = undefined
    }
    this.setState({
      flag,
    })
    dispatch({
      type:'systemNotification/getNoticeList',
      payload:{accountId,state:states},
    })
  }

  handleDelete = () => {
    if(selectedRowIds.length <= 0){
      message.error("选择不能为空")
    }
    else{
      const { dispatch } = this.props
      dispatch({
        type:'systemNotification/deleteNoticeItem',
        payload:{notifyIds:selectedRowIds.toString(),accountId:accountIdState},
      })
    }
  }

  handleChangeState = () => {
    if(selectedRowIds.length <= 0){
      message.error("选择不能为空")
    }
    else{
      const { dispatch } = this.props
      dispatch({
        type:'systemNotification/MarkReadNoticeItem',
        payload:{notifyIds:selectedRowIds.toString(),accountId:accountIdState},
      })
    }
  }

  handleDetail = row => {
    this.props.dispatch(
      routerRedux.push(`/overview/noticeDetail`, {
        ids:row.id,
      }
      )
    )
  }

  render() {
    const { systemNotification: { dataList, pagination },loading } = this.props
    const { flag } = this.state
    const columns = [
      {
        title: '通知标题',
        dataIndex: 'title',
        align: 'center',
        render: (val, row) => (
          <a onClick={() => this.handleDetail(row)}>
            {/* {+row.state === 0 && <Badge dot />}
            <span>{val}</span> */}
            {
              +row.state === 0 ? (
                <Badge status="error" text={val} className={styles.badge} />
              ):(<span>{val}</span>)
            }
          </a>
        ),
      },
      {
        title: '通知时间',
        dataIndex: 'notifyTime',
        align: 'center',
        render:(text) => {
          return moment(text).format("lll")
        },
      },
    ]
    const rowSelection = {
      onChange: (selectedRows) => {
        selectedRowIds = selectedRows
      },
    }
    return (
      <PageHeaderLayout>
        <Card>
          <div className={styles.tableBtns}>
            <Button className={flag===0?styles.active:''} onClick={this.handleState.bind(null, '', 0)}>全部通知</Button>
            <Button className={flag===1?styles.active:''} onClick={this.handleState.bind(null, 'noR', 1)}>未读</Button>
            <Button className={flag===2?styles.active:''} onClick={this.handleState.bind(null, 'isR', 2)}>已读</Button>
          </div>
          <div>
            <Table
              dataSource={dataList}
              columns={columns}
              rowKey="id"
              rowSelection={rowSelection}
              onChange={this.handleTableChange}
              bordered
              pagination={pagination && {...pagination, showQuickJumper: true, showTotal: (total) => `共 ${Math.ceil(total / pagination.pageSize)}页 / ${total}条 数据`}}
              loading={loading}
              />
          </div>
          {
            dataList.length ? (
              <div className={styles.tableBtnsPro}>
                <Button onClick={this.handleDelete}>删除</Button>
                <Button onClick={this.handleChangeState}>标记已读</Button>
              </div>
            ):''
          }
        </Card>
      </PageHeaderLayout>
    )
  }
}
