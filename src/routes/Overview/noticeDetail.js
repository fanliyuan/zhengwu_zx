import React, { Component } from 'react';
import { Card, Button, message } from 'antd';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';

import styles from './noticeDetail.less';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';

@connect(({ SystemNotification, loading }) => ({
  SystemNotification,
  loading: loading.models.SystemNotification,
}))
export default class noticeDetail extends Component {
  state = {
    layId: 0,
    state: false,
  };

  componentDidMount() {
    const { match } = this.props;
    const { params } = match.params;
    const { dispatch } = this.props;
    const selectedRowIds = [];
    selectedRowIds.push(params);
    this.setState({
      layId: params,
    });
    dispatch({
      type: 'SystemNotification/selectById',
      payload: { query: { queryId: params } },
    });
    dispatch({
      type: 'SystemNotification/changeState',
      payload: { rows: selectedRowIds },
    });
  }

  handleBack = () => {
    // const {router} = this.props;
    // router.push('/overview/SystemNotification')
    routerRedux.push('/overview/SystemNotification');
  };

  handleDelete = () => {
    const { layId } = this.state;
    const paramsIds = [];
    paramsIds.push(layId);
    const { dispatch } = this.props;
    this.setState({
      state: true,
    });
    dispatch({
      type: 'SystemNotification/deleteRows',
      payload: { rows: paramsIds },
    });
  };

  deleteSuccess = text => {
    this.setState({
      state: false,
    });
    message.info(text);
    routerRedux.push('/overview/SystemNotification');
  };

  render() {
    const {
      SystemNotification: { infos, backInfo },
      loading,
    } = this.props;
    const { layId, state } = this.state;
    const layLess = +layId !== 0 ? +layId - 1 : 0;
    const layMore = +layId !== 888 ? +layId + 1 : layId;
    return (
      <PageHeaderLayout>
        <Card loading={loading}>
          <div>{state && backInfo && this.deleteSuccess('删除成功')}</div>
          <div className={styles.btns}>
            <a href={`/overview/noticeDetail/${layLess}`}>上一封</a>
            <a href={`/overview/noticeDetail/${layMore}`}>下一封</a>
            <Button onClick={this.handleDelete}>删除</Button>
          </div>
          <div className={styles.back}>
            <a href="/overview/SystemNotification">返回</a>
          </div>
          <div className={styles.content}>
            <h1>{infos.noteTitle}</h1>
            <h5>{infos.noteTime}</h5>
            <p>{infos.content}</p>
          </div>
        </Card>
      </PageHeaderLayout>
    );
  }
}
