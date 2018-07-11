import React, { Component } from 'react';
import { Card } from 'antd';

import PageHeaderLayout from '../../layouts/PageHeaderLayout';
import styles from './Catalog.less';

export default class Catalog extends Component {
  state = {
    
  }

  render () {
    return (
      <PageHeaderLayout>
        <Card>
          <p className={styles.titleName}>
            &nbsp;数据库: &nbsp;<span>Youedata_dig</span>
            &nbsp;&nbsp;数据类型: &nbsp;<span>Mysql</span>
            &nbsp;&nbsp;资源名称: &nbsp;<span>城市低保标准表</span>
            &nbsp;&nbsp;所属机构: &nbsp;<span>石家庄市民政局</span>
            &nbsp;&nbsp;数据更新时间: &nbsp;<span>2018-06-20 15:08:08</span>
          </p>
          <div className={styles.contentInfo}>
            <p>
              该数据资源的目录还未创建, <a href="">立即创建</a> 或 <a href="">导入</a>
            </p>
          </div>
        </Card>
      </PageHeaderLayout>
    )
  }
}