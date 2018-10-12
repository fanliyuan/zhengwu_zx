import React, { Component } from 'react'
import { Card, Button } from 'antd'
import { connect } from 'dva'
import { Link } from 'dva/router'

import styles from './noticeDetail.less'
import PageHeaderLayout from '../../layouts/PageHeaderLayout'

const layLess = 0
const layMore = 0
@connect(({ SystemNotification, loading }) => ({
  SystemNotification,
  loading: loading.models.SystemNotification,
}))
export default class noticeDetail extends Component {
  state = {
  }

  componentDidMount() {
    const { ids } = this.props.location.state
    const { dispatch } = this.props
    dispatch({
      type:'SystemNotification/getNoticeItem',
      payload:{id:ids},
    })
    dispatch({
      type:'SystemNotification/MarkReadNoticeItem',
      payload:{notifyIds:ids},
    })
  }

  componentDidUpdate() {
    // const {
    //   SystemNotification: { backInfo },
    // } = this.props
    // const { state } = this.state
    // if (state && backInfo.backInfo) {
    //   this.deleteSuccess('删除成功')
    // }
  }

  // handleBack = () => {
  //   // const {router} = this.props;
  //   // router.push('/overview/SystemNotification')
  //   routerRedux.push('/overview/SystemNotification');
  // };

  handleDelete = () => {
    // const { layId } = this.state
    // const paramsIds = []
    // paramsIds.push(layId)
    // const { dispatch } = this.props
    // this.setState({
    //   state: true,
    // })
    // dispatch({
    //   type: 'SystemNotification/deleteRows',
    //   payload: { rows: paramsIds },
    // })
  }

  deleteSuccess = () => {
    // const { dispatch } = this.props
    // this.setState({
    //   state: false,
    // })
    // message.info(text)
    // dispatch(routerRedux.push('/overview/SystemNotification'))
  }

  render() {
    const { SystemNotification: { itemDetail }} = this.props
    return (
      <PageHeaderLayout>
        <Card>
          <div className='clearfix'>
            <div className={styles.btns}>
              <a href={`/overview/noticeDetail/${layLess}`}>上一封</a>
              <a href={`/overview/noticeDetail/${layMore}`}>下一封</a>
              <Button onClick={this.handleDelete}>删除</Button>
            </div>
            <div className={styles.back}>
              <Link to="/overview/SystemNotification">返回</Link>
            </div>
          </div>
          <div className={styles.content}>
            <h1>{itemDetail && itemDetail.title}</h1>
            <h5>{itemDetail && itemDetail.notifyTimeTime}</h5>
            <p>{itemDetail && itemDetail.content}</p>
          </div>
        </Card>
      </PageHeaderLayout>
    )
  }
}
