/*
 * @Author: ChouEric
 * @Date: 2018-07-15 17:29:48
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2018-10-19 16:47:37
*/
import React, { Component } from 'react'
import { Row, Col, Card } from 'antd'

import { Pie, BarDouble } from 'components/Charts'
import Bar from 'components/ECharts/Bar'
import Line from 'components/ECharts/Line'
import PageHeaderLayout from '../../layouts/PageHeaderLayout'
import styles from './DataInsert.less'

const bar1Data = [
  ['time', '2012', '2013', '2014', '2015', '2016'],
  ['Forest', 320, 332, 301, 334, 390],
  ['Steppe', 220, 182, 191, 234, 290],
  ['Desert', 150, 232, 201, 154, 190],
  ['Wetland', 98, 77, 101, 99, 40],
]
const barData = [
  ['省市', '河北省', '北京', '武汉', '保定', '石家庄'],
  ['Forest', 320, 332, 301, 334, 390],
  ['Steppe', 220, 182, 191, 234, 290],
  ['Desert', 150, 232, 201, 154, 190],
  ['Wetland', 98, 77, 101, 99, 40],
]
// 柱状和线状同时的
const barOption = {
  tooltip:{
    trigger:'axis',
    axisPointer:{
      type:'shadow',
      label:{
        backgroundColor:'blue',
      },
    },
  },
    xAxis:[{
      type:'category',
    }],
    yAxis:[{
      type:'value',
    }],
    dataset:{
      source:barData,
    },
    series:[
      {
        type: 'bar',
        stack: '总量',
        seriesLayoutBy: 'row',
        itemStyle:{
          color:(params) => {
            const colorList = [ 
              '#C33531','#EFE42A','#64BD3D','#EE9201','#29AAE3', 
              '#B74AE5','#0AAF9F','#E89589', 
              ]
              return colorList[params.dataIndex] 
          },
        },
      },
      {
        type: 'bar',
        // stack: '总量',
        seriesLayoutBy: 'row',
      },
      {
        type: 'line',
        seriesLayoutBy: 'row',
        itemStyle:{
          color:'gray',
        },
      },
      {
        type: 'line',
        seriesLayoutBy: 'row',
        itemStyle:{
          color:'red',
        },
      },
    ],
}
// 柱状图配置组装
const bar1Option = {
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      type: 'shadow',
    },
  },
  legend: {},
  calculable: true,
  grid: {
    left: '3%',
    right: '4%',
    bottom: '3%',
    containLabel: true,
  },
  xAxis: [{
    type: 'category',
  }],
  yAxis: [{
    type: 'value',
    splitLine: {
      lineStyle: {
        type: 'dashed',
        color: '#ccc',
      },
    },
  } ],
  dataset: {
    source: bar1Data,
  },
  series: [{
      type: 'bar',
      stack: '总量',
      seriesLayoutBy: 'row',
    },
    {
      type: 'bar',
      stack: '总量',
      seriesLayoutBy: 'row',
    },
    {
      type: 'bar',
      seriesLayoutBy: 'row',
    },
    {
      type: 'bar',
      seriesLayoutBy: 'row',
    },
  ],
}

export default class DataInsert extends Component {
  state = {
    loading: false,
  }

  componentDidMount() {
    this.setState({
      loading: true,
    })
    setTimeout(() => {
      this.setState({
        loading: false,
      })
    }, 300)
  }

  render() {
    const { loading } = this.state
    // 数据模板
    const data1 = [
      { x: '节点1', y: 123 },
      { x: '节点2', y: 76 },
      { x: '节点3', y: 43 },
      { x: '节点4', y: 314 },
      { x: '节点5', y: 231 },
    ]
    // const data2 = [ { name: '文件数据', 周一: 213, 周二: 315, 周三: 134, 周四: 83, 周五: 245 }, { name: '表数据', 周一: 123, 周二: 87, 周三: 75, 周四: 142, 周五: 178 } ];
    const data3 = [
      { x: '2018-05-24', y1: 123, y2: 67 },
      { x: '2018-05-25', y1: 62, y2: 13 },
      { x: '2018-05-26', y1: 96, y2: 135 },
      { x: '2018-05-27', y1: 235, y2: 94 },
      { x: '2018-05-28', y1: 231, y2: 159 },
    ]
    const data4 = [
      { x: 'Oracle', y: 15 },
      { x: 'SQLServer', y: 11 },
      { x: 'MySQL', y: 14 },
      { x: 'Kingbase', y: 4 },
      { x: 'DM', y: 2 },
      { x: '文件', y: 31 },
      { x: 'kafka', y: 3 },
    ]

    const colResponsiveProps = { xs: 24, sm: 24, md: 24, lg: 12, style: { marginBottom: 24 } }

    return (
      <PageHeaderLayout>
        <div className="common-layout">
          <Card loading={loading}>
            <Row gutter={16}>
              <Col {...colResponsiveProps}>
                <Card
                  title="接入数据量分布"
                  className={styles.card}
                  bordered={false}
                  >
                  <Pie
                    data={data1}
                    valueFormat={value => value}
                    height={300}
                    inner={0}
                    lineWidth={0}
                    hasLegend
                    showPercent
                    showValue={false}
                    />
                </Card>
              </Col>
              <Col {...colResponsiveProps}>
                <Card title="接入数据概览" className={styles.card} bordered={false}>
                  {/* 以下两种展示,数据格式不一样 */}
                  {/* <Bars height={400} data={data2} color={['name', ['red', 'blue']]} isVertical /> */}
                  {/* <BarDouble height={400} data={data3} titleMap={{ y1: '数据接入', y2: '表接入' }} /> */}
                  <Bar {...bar1Option} height={300} />
                </Card>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col {...colResponsiveProps}>
                <Card title="接入源分布" className={styles.card} bordered={false}>
                  <Pie
                    data={data4}
                    height={300}
                    inner={0}
                    lineWidth={0}
                    hasLegend
                    showPercent
                    showValue={false}
                    />
                </Card>
              </Col>
              <Col {...colResponsiveProps}>
                <Card title="资源注册概览" className={styles.card} bordered={false}>
                  <BarDouble
                    height={300}
                    data={data3}
                    titleMap={{ y1: '数据接入', y2: '表接入' }}
                    adjustType="stack"
                    />
                </Card>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col {...colResponsiveProps}>
                <Card title="任务概况" className={styles.card} bordered={false}>
                  <Pie
                    data={data4}
                    height={300}
                    inner={0}
                    lineWidth={0}
                    offset={20}
                    padding={[24, 0, 24, 0]}
                    />
                </Card>
              </Col>
              <Col {...colResponsiveProps}>
                <Card title="资源注册概览" className={styles.card} bordered={false}>
                  <BarDouble
                    height={300}
                    data={data3}
                    titleMap={{ y1: '数据接入', y2: '表接入' }}
                    adjustType="stack"
                    />
                </Card>
              </Col>
              <Col {...colResponsiveProps}>
                <Card title="资源注册概览" className={styles.card} bordered={false}>
                  <Line 
                    {...barOption}
                    height={300}
                    />
                </Card>
              </Col>
            </Row>
          </Card>
        </div>
      </PageHeaderLayout>
    )
  }
}
