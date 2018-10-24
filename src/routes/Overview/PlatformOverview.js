import React, { Component } from 'react'
import { Card, Row, Col, List, Select } from 'antd'
// import { TimelineChart } from 'components/Charts'
import numeral from 'numeral'

import Pie from 'components/ECharts/Pie'
import Gauge from 'components/ECharts/Gauge'
import Line from 'components/ECharts/Line'
import styles from './PlatformOverview.less'
import PageHeaderLayout from '../../layouts/PageHeaderLayout'
import Graph from '../../components/ECharts/Graph'

// 数据和相关联
const data = [{ name: '徐云' }, { name: '冯可梁', category: 1 }, { name: '邓志荣', category: 1 }, { name: '李荣庆', category: 1 }, { name: '郑志勇', category: 1 }, { name: '赵英杰', category: 1 }, { name: '王承军', category: 1 }, { name: '陈卫东', category: 1 }, { name: '邹劲松', category: 1 }, { name: '赵成', category: 1 }, { name: '陈现忠', category: 1 }, { name: '陶泳', category: 1 }, { name: '王德福', category: 1 }]
const links = [{ source: 0, target: 1, category: 0, value: '朋友' }, { source: 0, target: 2, value: '战友' }, { source: 0, target: 3, value: '房东' }, { source: 0, target: 4, value: '朋友' }, { source: 1, target: 2, value: '表亲' }, { source: 0, target: 5, value: '朋友' }, { source: 4, target: 5, value: '姑姑' }, { source: 2, target: 8, value: '叔叔' }, { source: 0, target: 12, value: '朋友' }, { source: 6, target: 11, value: '爱人' }, { source: 6, target: 3, value: '朋友' }, { source: 7, target: 5, value: '朋友' }, { source: 9, target: 10, value: '朋友' }, { source: 3, target: 10, value: '朋友' }, { source: 2, target: 11, value: '我是你的同学' }, { source: 11, target: 2, value: '你不是我的同学' }]
// 根据数和关联组装配置
const option = {
  title: {
    text: '',
  },
  tooltip: {
    formatter: "{c}",
  },
  // animationDuration: 1500,
  // animationDurationUpdate: 1500,
  // animationEasingUpdate: 'quinticInOut',
  // animation: false,
  // animationThreshold: 1,
  // animationDelay: 10000,
  // animationDelayUpdate: 10000,
  label: {
    normal: {
      show: true,
      textStyle: {
        fontSize: 12,
      },
    },
  },
  series: [{
    name: '主机名',
    type: 'graph',
    layout: 'force',
    symbolSize: 45,
    focusNodeAdjacency: true,
    animation: false,
    roam: true,
    draggable: true,
    categories: [{
      name: '主机',
      itemStyle: {
        normal: {
          color: "#009800",
        },
      },
    }, {
      name: '其他1',
      animation: false,
      itemStyle: {
        normal: {
          color: "#4592FF",
        },
      },
    }, {
      name: '其他2',
      animation: false,
      itemStyle: {
        normal: {
          color: "#3592F",
        },
      },
    }],
    label: {
      normal: {
        show: true,
        textStyle: {
          fontSize: 12,
        },
      },
    },
    force: {
      initLayout: 'circular',
      repulsion: 1000,
    },
    edgeSymbol: ['none','arrow'],
    edgeSymbolSize: [8, 8],
    edgeLabel: {
      normal: {
        show: true,
        textStyle: {
          fontSize: 12,
        },
        formatter: "{c}",
      },
    },
    lineStyle: {
      normal: {
        opacity: 0.9,
        width: 1,
        curveness: 0.2,
      },
    },
    data,
    links,
  }],
}

// 饼图数据
const PieData = [ { name: '分类1', value: 116 }, { name: '分类2', value: 87 }, { name: '分类3', value: 23 }, { name: '分类4', value: 15 }, { name: '分类5', value: 14 }, { name: '分类6', value: 14 } ]
// 饼状图配置
const pieOption = {
  legend: {
    left: 'right',
    top: 'center',
    orient: 'vertical',
    itemWidth: 40,
    itemHeight: 30,
    textStyle: {
      fontSize: 16,
    },
  },
  tooltip: {},
  series: [
    {
      name: '中间显示',
      type: 'pie',
      center: ['35%', '50%'],
      radius: '60%',
      label: {
        normal: {
          formatter: '总数有',
          position: 'center',
          textStyle: {
              fontSize: 24,
              fontWeight: 600,
          },
        },
      },
      data:[
        {itemStyle: {color: '#000',size: '32'}},
      ],
      tooltip: {
          formatter: 'zongshu',
      },
    },{
      name: '数据',
      type: 'pie',
      center: ['35%', '50%'],
      radius: ['60%', '80%'],
      data: PieData,
      color: ['#4fa0ff', '#6a8dff', '#6a6eff', '#946aff', '#c96aff', '#e86aff'],
    },
  ],
}

// 仪表盘数据
const gaugeData = 30
// 仪表盘配置,带渐变色
const gaugeOption = {
  tooltip: {},
  series: [
    {
      name: '仪表盘',
      type: 'gauge',
      radius: '90%',
      center: ['40%','50%'],
      startAngle: 210,
      endAngle: -30,
      splitLine: {
        show: false,
      },
      axisLine: {
        lineStyle: {
          width:10,
          opacity:0,
        },
      },
      axisTick: {
        show: false,
      },
      axisLabel: {
        distance: -18,
      },
      pointer: {width: 4},
      title: {
        show: false,
      },
      detail: {
        formatter:'{value}%',
        offsetCenter: [0, '60%'],
        fontSize: 25,
      },
      data: [{value: gaugeData, name: '完成率'}],
    },
    {
      name: '进度展示条底色',
      type: 'pie',
      tooltip: {
        backgroundColor: 'transparent',
        textStyle: {
          color: 'transparent',
        },
        formatter: '1',
      },
      radius: ['80%', '90%'],
      center: ['40%','50%'],
      avoidLabelOverlap: false,
      startAngle: 210,
      endAngle: -30,
      zlevel: 1,
      label: {
        normal: {
          show: false,
        },
        emphasis: {
          show: false,
        },
      },
      labelLine: {
        normal: {
          show: false,
        },
      },
      data: [{
        // 展示数据
        value: 240,
        name: '显示进度条底色',
        hoverAnimation: false,
        itemStyle: {
          normal: {
            color: '#ccc',
          },
        },
      }, {
        // 占位数据(写死)
        value: 120,
        name: '空白部分',
        itemStyle: {
          normal: {
            color: 'transparent',
          },
        },
      }],
    },
    {
      name: '进度展示条渐变',
      type: 'pie',
      tooltip: {
        backgroundColor: 'transparent',
        textStyle: {
          color: 'transparent',
        },
        formatter: '1',
      },
      radius: ['80%', '90%'],
      center: ['40%','50%'],
      avoidLabelOverlap: false,
      startAngle: 210,
      endAngle: -30,
      zlevel: 1,
      label: {
        normal: {
          show: false,
        },
        emphasis: {
          show: false,
        },
      },
      labelLine: {
        normal: {
          show: false,
        },
      },
      data: [{
        // 展示数据
        value: gaugeData / 1.5,
        name: '显示进度条渐变',
        hoverAnimation: false,
        itemStyle: {
          normal: {
            color: {
              type: 'linear',
              x: 0,
              y: 1,
              x2: 1,
              y2: 1,
              colorStops: [{
                offset: 0,
                color: 'rgba(0,0,255,0.4)', // 0% 处的颜色
              },{
                offset: 1,
                color: 'rgba(0,0,255, 1)', // 100% 处的颜色
              }],
              globalCoord: true, // 缺省为 false
            },
          },
        },
      }, {
        // 占位数据(写死)
        value: 100-gaugeData/1.5,
        name: '空白部分',
        itemStyle: {
          normal: {
            color: 'transparent',
          },
        },
      }],
    },
  ],
}

// 折线图的数据结构
const initialLineData = [
  ['time', '13:00', '13:05', '13:10', '13:15', '13:20', '13:25', '13:30', '13:35'],
  ['移动', 220, 182, 191, 134, 150, 120, 110, 125],
  ['电信', 120, 110, 125, 145, 122, 165, 122, 220],
  ['联通', 123, 123, 123, 7, 342, 32, 34, 95],
]
/**
 * 获取这折线图的系列
 * @param {*} 必传参数传入color为折线和区域的颜色
 */
function getLineSerie({color = 'red', color1 = 'rgba(0,0,0,0)'}) {
  return {
    type: 'line',
    symbol: 'circle',
    symbolSize: 5,
    lineStyle: {
      normal: {
        width: 2,
      },
    },
    areaStyle: {
      normal: {
        color: {
          type: 'linear',
          x: 0,
          y: 0,
          x2: 0,
          y2: 1,
          colorStops: [{
            offset: 0,
            color, // 0% 处的颜色
            opacity: 1,
          }, {
            offset: 1,
            color: color1, // 100% 处的颜色
          }],
          globalCoord: false, // 缺省为 false
        },
      },
    },
    itemStyle: {
      normal: {
        color,
        width: 2,
      },
    },
    seriesLayoutBy: 'row',
  }
}
// 组装折线图的配置
function getLineOption(lineData) {
  return {
    backgroundColor: '#424956',
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        lineStyle: {
          color: '#57617B',
        },
      },
    },
    legend: {
      icon: 'rect',
      itemWidth: 15,
      itemHeight: 10,
      itemGap: 13,
      right: '4%',
      textStyle: {
        fontSize: 12,
        color: '#292f39',
      },
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true,
    },
    dataset: {
      source: lineData,
    },
    xAxis: [{
      type: 'category',
      boundaryGap: false,
      axisLine: {
        lineStyle: {
          color: '#57617B',
        },
      },
    }],
    yAxis: [{
      type: 'value',
      name: '单位（%）',
      axisTick: {
        show: false,
      },
      axisLine: {
        lineStyle: {
          color: '#57617B',
        },
      },
      axisLabel: {
        margin: 10,
        textStyle: {
          fontSize: 14,
        },
      },
      splitLine: {
        lineStyle: {
          color: '#57617B',
          type: 'dashed',
          opacity: 0.5,
        },
      },
    }],
    series: [
      getLineSerie({color: 'blue'}), 
      getLineSerie({color: 'red'}),
      getLineSerie({color: 'green'}),
    ],
  }
}

let interval = 0


export default class PlatformOverview extends Component {
  state = {
    lineOption: getLineOption(initialLineData),
    lineData: {
      source: initialLineData,
    },
    index: 8,
  }

  componentDidMount() {
    interval = setInterval(() => {
      this.getDynamicLineData()
    }, 1000)
  }

  componentWillUnmount() {
    clearInterval(interval)
  }
  
  getDynamicLineData() {
    const { lineData: {source} , index } = this.state
    source.forEach(item => item=item.splice(1,1)) // eslint-disable-line
    const lastData = source.map(item => [...item].pop())
    const dynamicData = [
      [...source[0], `13:${index*5}`],
      [...source[1], lastData[1]+(Math.random()*100).toFixed(0)*(Math.round(Math.random())-0.4)],
      [...source[2], lastData[2]+(Math.random()*100).toFixed(0)*(Math.round(Math.random())-0.4)],
      [...source[3], lastData[3]+(Math.random()*100).toFixed(0)*(Math.round(Math.random())-0.4)],
    ]
    this.setState({
      lineData: {
        source: dynamicData,
      },
      index: index+1,
    })
  }

  render() {
    const { lineOption, lineData } = this.state
    // const offlineChartData = [ { x: 1531709122492, y1: 69, y2: 95 }, { x: 1531714522492, y1: 99, y2: 27 }, { x: 1531712722492, y1: 79, y2: 90 }, { x: 1531716322492, y1: 19, y2: 105 }, { x: 1531718122492, y1: 10, y2: 48 }, { x: 1531719922492, y1: 23, y2: 99 }, { x: 1531721722492, y1: 18, y2: 83 }, { x: 1531723522492, y1: 74, y2: 100 }, { x: 1531725322492, y1: 104, y2: 77 }, { x: 1531727122492, y1: 87, y2: 27 }, { x: 1531728922492, y1: 68, y2: 64 }, { x: 1531730722492, y1: 89, y2: 10 }, { x: 1531732522492, y1: 49, y2: 80 }, { x: 1531734322492, y1: 69, y2: 45 }, { x: 1531736122492, y1: 74, y2: 109 }, { x: 1531737922492, y1: 56, y2: 47 }, { x: 1531739722492, y1: 10, y2: 84 }, { x: 1531741522492, y1: 67, y2: 34 }, { x: 1531743322492, y1: 11, y2: 48 } ]
    const fakeData = [ { title: '机构数量', content: 24 }, { title: '节点数量', content: 24 }, { title: '数据资源', content: 199 }, { title: '目录资源', content: 102 }, { title: '数据量', content: '24000条' }, { title: '文件量', content: '500.03PB' }, { title: '任务数', content: 102 }, { title: '总交换数', content: 1024 } ]
    const rankingListData = []
    for (let i = 1; i < 7; i += 1) {
      rankingListData.push({
        id: i,
        title: '石家庄市民政局',
        jg: '石家庄市民政',
        total: 10000,
      })
    }
    const rankingListData1 = []
    for (let i = 1; i < 7; i += 1) {
      rankingListData1.push({
        id: i,
        title: '人口普查信息',
        jg: '石家庄市民政',
        total: 10000,
      })
    }
    // const data1 = ["按资源量","按发布数","按订阅数"]
    // const nodeSelect = data1.map((item) => {
    //   return (<Select.Option>{item}</Select.Option>)
    // })
    return (
      <PageHeaderLayout>
        <Card>
          <Row>
            <Col span={15} className={styles.colBorder}>
              <List
                grid={{ gutter: 15, column: 4 }}
                dataSource={fakeData}
                renderItem={item => (
                  <List.Item>
                    <Card className={styles.itemBg}>
                      <span>{item.title}</span>
                      <h2 className={styles.itemH2}>{item.content}</h2>
                    </Card>
                  </List.Item>
                )}
                />
              <div style={{ height: '500px', textAlign: 'center', overflow: 'hidden' }}>
                <h3 style={{ textAlign: 'left' }}>交换任务</h3>
                {/* <img src={img} alt="交换任务" /> */}
                <Graph {...option} height='450px' />
              </div>
              <div style={{ padding: '0 24px', height: 433, width: '100%' }}>
                <h3>实施传输</h3>
                <Line
                  {...lineOption}
                  dataset={lineData}
                  height='400px'
                  // width='100%'
                  />
              </div>
            </Col>
            <Col span={9} className={styles.rightBox}>
              <div>
                <div className={styles.salesRank}>
                  <h3 className={styles.rankingTitle}>
                    最活跃的节点
                  </h3>
                  <Select className={styles.select1} defaultValue="amount">
                    <Select.Option value="publication">按发布数</Select.Option>
                    <Select.Option value="subscription">按订阅数</Select.Option>
                    <Select.Option value="amount">按订阅数</Select.Option>
                  </Select>
                  <ul className={styles.rankingList}>
                    <li className={styles.titles}>
                      <span />
                      <span>节点名称</span>
                      <span>所属机构</span>
                      <span>订阅数</span>
                    </li>
                    {rankingListData.map((item, i) => (
                      <li key={item.id}>
                        <span className={i < 3 ? styles[`rank${i}`] : ''}>{i + 1}</span>
                        <span>{item.title}</span>
                        <span>{item.jg}</span>
                        <span>{numeral(item.total).format('0,0')}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              <div>
                <div className={styles.salesRank}>
                  <h3 className={styles.rankingTitle}>最受欢迎的资源</h3>
                  <Select className={styles.select2} defaultValue="innerSub">
                    <Select.Option value="innerSub">按内部订阅数</Select.Option>
                    <Select.Option value="outerDowload">按外部下载量</Select.Option>
                  </Select>
                  <ul className={styles.rankingList}>
                    <li className={styles.titles}>
                      <span />
                      <span>节点名称</span>
                      <span>所属机构</span>
                      <span>订阅数</span>
                    </li>
                    {rankingListData1.map((item, i) => (
                      <li key={item.id}>
                        <span className={i < 3 ? styles[`rank${i}`] : ''}>{i + 1}</span>
                        <span>{item.title}</span>
                        <span>{item.jg}</span>
                        <span>{numeral(item.total).format('0,0')}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              <div>
                <h3>目录分类占比</h3>
                <Card bordered={false}>
                  <Pie
                    {...pieOption}
                    height={294}
                    />
                </Card>
              </div>
              <div>
                <h3>平均传输速率</h3>
                <Gauge {...gaugeOption} height={164} />
              </div>
            </Col>
          </Row>
        </Card>
      </PageHeaderLayout>
    )
  }
}
