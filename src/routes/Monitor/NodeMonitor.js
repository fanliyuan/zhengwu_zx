/*
 * @Author: ChouEric
 * @Date: 2018-07-24 10:59:50
 * @Last Modified by: ChouEric
 * @Last Modified time: 2018-10-12 15:19:50
 * @Description: 节点监控的首页
 */
import React, { Component } from 'react'
import { connect } from 'dva'
import { routerRedux } from 'dva/router'

import PageHeaderLayout from '../../layouts/PageHeaderLayout'
import Graph from '../../components/ECharts/Graph'
// import styles from './NodeMonitor.less'

// 主机svg路径
const mainframe = "path://M766.3 112.8h-509c-19.7 0-34.7 15-34.7 34.7v728.8c0 19.7 15 34.7 34.7 34.7h509c19.7 0 34.7-15 34.7-34.7V147.5c0-19.7-15-34.7-34.7-34.7zM540.7 587.1c-16.2 0-28.9-12.7-28.9-28.9s12.7-28.9 28.9-28.9 28.9 12.7 28.9 28.9c0.1 16.2-12.7 28.9-28.9 28.9z m144.6 34.7c-31.2 0-57.8-25.4-57.8-57.8s25.5-57.8 57.8-57.8c31.2 0 57.8 25.4 57.8 57.8 0.1 32.4-26.5 57.8-57.8 57.8z m57.9-162H280.4V344.2h462.8v115.6z m0-173.5H280.4V170.6h462.8v115.7z m0 0"
// 数据
const data = [{
	category: 0,
	name: "中心节点", 
	symbolSize: 45,
}, {
	category: 1,
	name: "市卫计委",
}, {
	category: 1,
	name: "市发改委",
}, {
	category: 1,
	name: "市司法厅",
}, {
	category: 1,
	name: "市地税局",
}, {
	category: 1,
	name: "市旅游局",
}, {
	category: 1,
	name: "市质监局",
}, {
	category: 1,
	name: "市高法",
}, {
	category: 2,
	name: "市人防办",
}, {
	category: 2,
	name: "市工商局",
}, {
	category: 2,
	name: "市食药监",
}, {
	category: 2,
	name: "市食药监1",
}]
// 关联性
const links = [{
	source: "市卫计委",
	target: "中心节点",
}, {
	source: "市发改委",
	target: "中心节点",
}, {
	source: "市司法厅",
	target: "中心节点",
}, {
	source: "市地税局",
	target: "中心节点",
}, {
	source: "市旅游局",
	target: "中心节点",
}, {
	source: "市质监局",
	target: "中心节点",
}, {
	source: "市高法",
	target: "中心节点",
}, {
	source: "市人防办",
	target: "中心节点",
}, {
	source: "市工商局",
	target: "中心节点",
}, {
	source: "市食药监",
	target: "中心节点",
}, {
	source: "市食药监1",
	target: "中心节点",
}]
const option = {
	tooltip: {
		formatter: "{a} : {b}",
	},
	legend: {
		x: "right",
		data: ["已对接", "未对接"],
	},
	series: [{
		type: "graph",
		name: "节点名",
		layout: "force",
		ribbonType: false,
		roam: true,
		// edgeSymbol: ["none", "arrow"],
		focusNodeAdjacency: true,
		categories: [{
			name: "中心节点",
			itemStyle: {
				normal: {
					color: "#fc9205",
				},
			},
			}, {
				name: "已对接",
				itemStyle: {
					normal: {
						color: "#3c97f1",
					},
				},
			}, {
				name: "未对接",
				itemStyle: {
					normal: {
						color: "#c1c1c1",
					},
				},
		}],
		force: {
			repulsion: 190,
			gravity: 0.01,
			edgeLength: [160, 150],
			layoutAnimation: true,
		},
		symbol: mainframe,
		symbolSize: 40,
		symbolKeepAspect: true,
		itemStyle: {
			normal: {
				label: {
					show: true,
					textStyle: {
						color: "#666",
						fontSize: 12,
					},
					offset: [0, 28],
				},
				linkStyle: {
					type: "curve",
				},
			},
		},
		lineStyle: {
			color: 'source',
			width: 2,
		},
		emphasis: {
			label: {
				show: true,
				textStyle: {
					color: "#333",
					fontSize: 12,
				},
			},
		},
		label: {
			textStyle: {
				color: "#000",
			},
		},
		data,
		links,
	}],
}

@connect()
export default class NodeMonitor extends Component {
	
	treeHandle = (e) => {
		if (e && e.data && e.data.name === '中心节点') {
			this.props.dispatch(
				routerRedux.push('/monitor/node')
			)
		}
	}

  render() {
    return (
      <PageHeaderLayout>
        <div className="common-layout">
          <Graph {...option} onClick={this.treeHandle} />
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
