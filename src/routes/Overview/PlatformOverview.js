import React, { Component } from 'react';
import { Card } from 'antd';

import styles from './PlatformOverview.less';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';

export default class PlatformOverview extends Component {
  state = {};

  render() {
    return (
      <PageHeaderLayout>
        <Card>
          <div className={styles.sp}>6544</div>
        </Card>
      </PageHeaderLayout>
    );
  }
}
