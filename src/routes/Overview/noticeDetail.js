import React, { Component } from 'react';
import { Button, Card } from 'antd';

import styles from './noticeDetail.less';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';

export default class noticeDetail extends Component {
  render() {
    return (
      <PageHeaderLayout>
        <Card>
          <div className={styles.btns}>
            <Button>上一封</Button>
            <Button>下一封</Button>
            <Button>删除</Button>
          </div>
          <div className={styles.back}>
            <Button>返回</Button>
          </div>
          <div className={styles.content}>
            <h1>订阅审批已通过</h1>
            <h5>2018-06-11 16:40:40</h5>
            <p>
              通知详情内容通知详情内容通知详情内容通知详情内容通知详情内容通知详情内容通知详情内容通知详情内容通知详情内容通知详情内容通知详情内容通知详情内容通知详情内容通知详情内容通知详情内容通知详情内容通知详情内容通知详情内容通知详情内容通知详情内容通知详情内容通知详情内容通知详情内容通知详情内容通知详情内容通知详情内容通知详情内容通知详情内容通知详情内容通知详情内容通知详情内容通知详情内容通知详情内容通知详情内容通知详情内容通知详情内容通知详情内容通知详情内容通知详情内容通知详情内容通知详情内容通知详情内容通知详情内容通知详情内容通知详情内容
            </p>
          </div>
        </Card>
      </PageHeaderLayout>
    );
  }
}
