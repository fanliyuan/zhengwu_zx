import React, { PureComponent } from 'react'
import { connect } from 'dva'
import { routerRedux } from 'dva/router'
import { Button, Table, Card, message, Badge } from 'antd'
import moment from 'moment'
import Cookies from 'js-cookie'

import { getName } from '../../utils/faker'


import styles from './SystemNotification.less'
import PageHeaderLayout from '../../layouts/PageHeaderLayout'

function getFakeData() {
  const arr = []
  for (let index = 0; index < 256; index++) {
    arr.push({
      id: index,
      noteTitle: `审批${Math.round(Math.random())?'已':'未'}通过`,
      state: Math.round(Math.random())?'noR':'isR',
      noteTime: moment(Date.now()-Math.round(Math.random()*1000*60*60*10)*Math.round(Math.random()*100)).format('lll'),
      get noteDetail() {
        return getName()+this.noteTitle
      },
    })
  }
  return arr
}

@connect(({SystemNotification,loading}) => ({
  SystemNotification,
  loading: loading.models.SystemNotification,
}))
export default class SystemNotification extends PureComponent {
  state = {
    // selectedRowIds: [],
    // state: false,
    // params: '',
    // changeState: false,
  }

  componentDidMount = () => {
    const accountId = localStorage.getItem("accountId")
    const accessToken = Cookies.get('accessToken') || ''
    // console.log(accountId,accessToken)
    // this.handleInfo()
    const { dispatch } = this.props
    dispatch({
      type:'SystemNotification/getNoticeList',
      payload:{accountId,accessToken},
    })
  }

  componentDidUpdate = () => {
    // const {
    //   SystemNotification: { backInfo, changeBack },
    // } = this.props
    // const { state, changeState } = this.state
    // if (state && backInfo.backInfo) {
    //   this.deleteSuccess('删除成功')
    // }
    // if (changeState && changeBack.changeBack) {
    //   this.changeSuccess('修改成功')
    // }
  }

  // handleInfo = () => {
  //   const { dispatch } = this.props
  //   dispatch({
  //     type: 'SystemNotification/getIntros',
  //     payload: { query: { state: '' }, pagination: { pageSize: 10, current: 1 } },
  //   })
  // }

  handleTableChange = () => {
    // const { dispatch } = this.props
    // const { params } = this.state
    // dispatch({
    //   type: 'SystemNotification/getIntros',
    //   payload: { query: { state: params }, pagination },
    // })
  }

  handleState = () => {
    // const { dispatch } = this.props
    // this.setState({
    //   params: par,
    // })
    // dispatch({
    //   type: 'SystemNotification/getIntros',
    //   payload: { query: { state: par }, pagination: { pageSize: 10, current: 1 } },
    // })
  }

  handleDelete = () => {
    // const { selectedRowIds } = this.state
    // if (selectedRowIds.length === 0) {
    //   message.warning('选择不能为空')
    // } else {
    //   const { dispatch } = this.props
    //   dispatch({
    //     type: 'SystemNotification/deleteRows',
    //     payload: { rows: selectedRowIds },
    //   })

    //   this.setState({
    //     state: true,
    //   })
    // }
  }

  deleteSuccess = text => {
    message.warning(text)
    this.handleInfo()
    this.setState({
      // state: false,
      // selectedRowIds: [],
    })
  }

  handleChangeState = () => {
    // const { selectedRowIds } = this.state
    // if (selectedRowIds.length === 0) {
    //   message.warning('选择为空')
    // } else {
    //   const { dispatch } = this.props
    //   dispatch({
    //     type: 'SystemNotification/changeState',
    //     payload: { rows: selectedRowIds },
    //   })
    //   this.setState({
    //     changeState: true,
    //   })
    // }
  }

  changeSuccess = text => {
    message.warning(text)
    this.handleInfo()
    this.setState({
      // changeState: false,
      // selectedRowIds: [],
    })
  }

  handleDetail = row => {
    this.props.dispatch(
      routerRedux.push(`/overview/noticeDetail/${row.id}`, {
        noteTitle: row.noteTitle,
        noteDetail: row.noteDetail,
        noteTime: row.noteTime,
      })
    )
  }

  render() {
    // const {
    //   SystemNotification: { data, pagination },
    //   loading,
    // } = this.props
    const columns = [
      {
        title: '通知标题',
        dataIndex: 'noteTitle',
        align: 'center',
        render: (val, row) => (
          <a onClick={() => this.handleDetail(row)}>
            {row.state === 'noR' && <Badge dot />}
            {val}
          </a>
        ),
      },
      {
        title: '通知时间',
        dataIndex: 'noteTime',
        align: 'center',
      },
    ]
    const rowSelection = {
      onChange: () => {
        this.setState({
          // selectedRowIds: selectedRows,
        })
      },
      // getCheckboxProps: record => ({
      //   disabled: record.name === 'Disabled User',
      //   name: record.name,
      // }),
    }
    const fakeData = getFakeData()
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
              dataSource={fakeData}
              columns={columns}
              rowKey="id"
              rowSelection={rowSelection}
              onChange={this.handleTableChange}
              bordered
              pagination={{showQuickJumper: true, showTotal: (total) => `共 ${26}页 / ${total}条 数据`}}
              // loading={loading}
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
