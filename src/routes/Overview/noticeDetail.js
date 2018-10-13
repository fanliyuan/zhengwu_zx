import React, { Component } from 'react'
import { Card, Button } from 'antd'
import { connect } from 'dva'
import { routerRedux, Link } from 'dva/router'

import moment from 'moment'
import styles from './noticeDetail.less'
import PageHeaderLayout from '../../layouts/PageHeaderLayout'

@connect(({ SystemNotification, loading }) => ({
  SystemNotification,
  loading: loading.models.SystemNotification,
}))
export default class noticeDetail extends Component {
  state = {
  }

  componentDidMount() {
    const accountId = localStorage.getItem("accountId")
    const { ids } = this.props.location.state
    const { dispatch } = this.props
    dispatch({
      type:'SystemNotification/getNoticeItem',
      payload:{id:ids,accountId},
    })
    // dispatch({
    //   type:'SystemNotification/MarkReadNoticeItem',
    //   payload:{notifyIds:ids},
    // })
  }

  handleDelete = () => {
    const { dispatch } = this.props
    const { ids } = this.props.location.state
    const accountId = localStorage.getItem("accountId")
    dispatch({
      type:'SystemNotification/deleteNoticeItem',
      payload:{notifyIds:ids,accountId},
    })
    dispatch(
      routerRedux.push('/overview/systemNotification')
    )
  }

  handlePreBtn = () => {

  }

  handleNextBtn = () => {

  }

  render() {
    const { SystemNotification: { itemDetail }} = this.props
    return (
      <PageHeaderLayout>
        <Card>
          <div className='clearfix'>
            <div className={styles.btns}>
              <span onClick={this.handlePreBtn} className={styles.preBtnBtn}>上一封</span>
              <span onClick={this.handleNextBtn} className={styles.preBtnBtn}>下一封</span>
              <Button onClick={this.handleDelete}>删除</Button>
            </div>
            <div className={styles.back}>
              <Link to="/overview/SystemNotification">返回</Link>
            </div>
          </div>
          <div className={styles.content}>
            <h1>{itemDetail && itemDetail.title}</h1>
            <h5>{itemDetail && itemDetail.notifyTime && moment(itemDetail.notifyTime).format("lll")}</h5>
            <p>{itemDetail && itemDetail.content}</p>
          </div>
        </Card>
      </PageHeaderLayout>
    )
  }
}
