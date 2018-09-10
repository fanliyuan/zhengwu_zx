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
    // layId: 0,
    // state: false,
    infos: {},
  }

  componentDidMount() {
    // const { match } = this.props
    this.setState({
      infos: this.props.location.state,
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
    // const {
    //   SystemNotification: { infos, data },
    //   loading,
    // } = this.props
    const { infos } = this.state
    // data.forEach((item, index) => {
    //   if (+item.id === +layId) {
    //     layLess = index >= 1 ? data[index - 1].id : item.id
    //     layMore = index <= data.length ? data[index + 1].id : item.id
    //   }
    // })
    return (
      <PageHeaderLayout>
        <Card>
          {/* <div>{state && backInfo && this.deleteSuccess('删除成功')}</div> */}
          <div className={styles.btns}>
            <a href={`/overview/noticeDetail/${layLess}`}>上一封</a>
            <a href={`/overview/noticeDetail/${layMore}`}>下一封</a>
            <Button onClick={this.handleDelete}>删除</Button>
          </div>
          <div className={styles.back}>
            <Link to="/overview/SystemNotification">返回</Link>
          </div>
          <div className={styles.content}>
            <h1>{infos.noteTitle}</h1>
            <h5>{infos.noteTime}</h5>
            <p>{infos.noteDetail}</p>
          </div>
        </Card>
      </PageHeaderLayout>
    )
  }
}
