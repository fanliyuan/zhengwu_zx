import React, { Component } from 'react'
import { Card, Row, Col, List } from 'antd'
import { Pie, TimelineChart, Gauge } from 'components/Charts'
import numeral from 'numeral'

import styles from './PlatformOverview.less'
import PageHeaderLayout from '../../layouts/PageHeaderLayout'

export default class PlatformOverview extends Component {
  state = {}

  render() {
    const offlineChartData = [
      { x: 1531709122492, y1: 69, y2: 95 },
      { x: 1531714522492, y1: 99, y2: 27 },
      { x: 1531712722492, y1: 79, y2: 90 },
      { x: 1531716322492, y1: 19, y2: 105 },
      { x: 1531718122492, y1: 10, y2: 48 },
      { x: 1531719922492, y1: 23, y2: 99 },
      { x: 1531721722492, y1: 18, y2: 83 },
      { x: 1531723522492, y1: 74, y2: 100 },
      { x: 1531725322492, y1: 104, y2: 77 },
      { x: 1531727122492, y1: 87, y2: 27 },
      { x: 1531728922492, y1: 68, y2: 64 },
      { x: 1531730722492, y1: 89, y2: 10 },
      { x: 1531732522492, y1: 49, y2: 80 },
      { x: 1531734322492, y1: 69, y2: 45 },
      { x: 1531736122492, y1: 74, y2: 109 },
      { x: 1531737922492, y1: 56, y2: 47 },
      { x: 1531739722492, y1: 10, y2: 84 },
      { x: 1531741522492, y1: 67, y2: 34 },
      { x: 1531743322492, y1: 11, y2: 48 },
    ]
    const data = [
      {
        title: '机构数量',
        content: 24,
      },
      {
        title: '节点数量',
        content: 24,
      },
      {
        title: '数据资源',
        content: 199,
      },
      {
        title: '目录资源',
        content: 102,
      },
      {
        title: '数据量',
        content: '24000条',
      },
      {
        title: '文件量',
        content: '500.03PB',
      },
      {
        title: '任务数',
        content: 102,
      },
      {
        title: '总交换数',
        content: 1024,
      },
    ]
    const salesPieData = [
      {
        x: '分类1',
        y: 116,
      },
      {
        x: '分类2',
        y: 87,
      },
      {
        x: '分类3',
        y: 23,
      },
      {
        x: '分类4',
        y: 15,
      },
      {
        x: '分类5',
        y: 14,
      },
      {
        x: '分类6',
        y: 14,
      },
    ]
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
                dataSource={data}
                renderItem={item => (
                  <List.Item>
                    <Card className={styles.itemBg}>
                      <span>{item.title}</span>
                      <h2>{item.content}</h2>
                    </Card>
                  </List.Item>
                )}
              />
              <div style={{ height: '300px', textAlign: 'center' }}>
                <h3 style={{ textAlign: 'left' }}>交换任务</h3>
                <img src="/src/assets/platOvewview.png" alt="交换任务" />
              </div>
              <div style={{ padding: '0 24px' }}>
                <h3>实施传输</h3>
                <TimelineChart
                  height={400}
                  data={offlineChartData}
                  titleMap={{ y1: '客流量', y2: '支付笔数' }}
                  showArea
                />
              </div>
            </Col>
            <Col span={9} className={styles.rightBox}>
              <div>
                <div className={styles.salesRank}>
                  <h3 className={styles.rankingTitle}>
                    最活跃的节点
                    {/* <Select>
                      {nodeSelect}
                    </Select> */}
                  </h3>
                  <ul className={styles.rankingList}>
                    <li className={styles.titles}>
                      <span>1</span>
                      <span>节点名称</span>
                      <span>所属机构</span>
                      <span>订阅数</span>
                    </li>
                    {rankingListData.map((item, i) => (
                      <li key={item.id}>
                        <span className={i < 3 ? styles.active : ''}>{i + 1}</span>
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
                  <ul className={styles.rankingList}>
                    <li className={styles.titles}>
                      <span>1</span>
                      <span>节点名称</span>
                      <span>所属机构</span>
                      <span>订阅数</span>
                    </li>
                    {rankingListData1.map((item, i) => (
                      <li key={item.id}>
                        <span className={i < 3 ? styles.active : ''}>{i + 1}</span>
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
                    hasLegend
                    title="销售额"
                    subTitle="目录资源"
                    total={salesPieData.reduce((pre, now) => now.y + pre, 0)}
                    data={salesPieData}
                    // valueFormat={val => yuan(val)}
                    height={294}
                    showValue={false}
                    listyle={{ marginLeft: 80 }}
                  />
                </Card>
              </div>
              <div>
                <h3>平均传输速率</h3>
                <Gauge hasLegend title="传输速率" height={164} percent={87} />
              </div>
            </Col>
          </Row>
        </Card>
      </PageHeaderLayout>
    )
  }
}
