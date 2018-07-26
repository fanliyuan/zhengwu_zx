/*
 * @Author: ChouEric
 * @Date: 2018-07-24 10:59:50
 * @Last Modified by: ChouEric
 * @Last Modified time: 2018-07-24 11:50:47
 * @Description: 节点监控的首页
 */
import React from 'react'
import { Link } from 'dva/router'

import PageHeaderLayout from '../../layouts/PageHeaderLayout'
import styles from './NodeMonitor.less'

export default function NodeMonitor() {
  return (
    <PageHeaderLayout>
      <div className="common-layout">
        <div className={styles.box}>
          <Link to="/monitor/node" className={styles.center}>
            中心节点
          </Link>
          <a className={styles.node1}>节点1</a>
          <a className={styles.node2}>节点2 </a>
          <a className={styles.node3}>节点3 </a>
        </div>
      </div>
    </PageHeaderLayout>
  )
}
