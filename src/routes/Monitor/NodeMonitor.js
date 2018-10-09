/*
 * @Author: ChouEric
 * @Date: 2018-07-24 10:59:50
 * @Last Modified by: ChouEric
 * @Last Modified time: 2018-10-09 15:25:50
 * @Description: 节点监控的首页
 */
import React, { Component } from 'react'
// import { Link } from 'dva/router'
import ReactEcharts from 'echarts-for-react'

import PageHeaderLayout from '../../layouts/PageHeaderLayout'
// import Demo from '../../components/ECharts/Demo'
// import styles from './NodeMonitor.less'

export default class NodeMonitor extends Component {

  getOption() { // eslint-disable-line
    return {
      title: { text: 'ECharts 入门示例' },
      tooltip: {},
      xAxis: {
          data: ["衬衫", "羊毛衫", "雪纺衫", "裤子", "高跟鞋", "袜子"],
      },
      yAxis: {},
      series: [{
          name: '销量',
          type: 'bar',
          data: [5, 20, 36, 10, 10, 20],
      }],
    }
  }

  render() {
    return (
      <PageHeaderLayout>
        <div className="common-layout">
          {/* <Demo title={{ text: 'ECharts 入门示例' }} xAxis={{data: ["衬衫", "羊毛衫", "雪纺衫", "裤子", "高跟鞋", "袜子"]}} series={{name: '销量', type: 'bar', data:[5, 20, 36, 10, 10, 20]}} /> */}
          <ReactEcharts option={this.getOption()} />
          {/* <div className={styles.box}>
            <Link to="/monitor/node" className={styles.center}>
              中心节点
            </Link>
            <a className={styles.node1}>节点1</a>
            <a className={styles.node2}>节点2 </a>
            <a className={styles.node3}>节点3 </a>
          </div> */}
        </div>
      </PageHeaderLayout>
    )
  }
}
