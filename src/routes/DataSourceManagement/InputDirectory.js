import React, { Component } from 'react';
import { Card, Button } from 'antd';

import styles from './InputDirectory.less';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';

export default class InputDirectory extends Component {
  state = {};

  render() {
    return (
      <PageHeaderLayout>
        <Card>
          <div className={styles.backBtn}>
            <Button type="primary">返回</Button>
          </div>
          <div className={styles.infos}>
            <h3>请下载模板按格式填写目录信息资源内容后导入</h3>
            <span>导入目录: </span>
            <Button type="primary"> 选取文件</Button>
          </div>
        </Card>
      </PageHeaderLayout>
    );
  }
}
