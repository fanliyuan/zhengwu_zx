/*
 * @Author: ChouEric
 * @Date: 2018-07-16 15:15:00
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2018-10-31 10:38:53
 * @描述: 节点概览
*/
import React, { Component } from 'react'
import { Card, Row, Col, Table, Select } from 'antd'
import { Pie, TimelineChart, Gauge } from 'components/Charts'
import moment from 'moment'

import PageHeaderLayout from '@/components/PageHeaderWrapper'
import styles from './NodeOverview.less'
import img from '../../assets/platOvewview.png'

function rendCard(data = []) {
  return data.map(item => (
    <Col span={6} key={item.name}>
      <Card className={styles.card} key={item.name}>
        <span>{item.name}</span>
        <p>{item.value}</p>
      </Card>
    </Col>
  ))
}

export default class NodeOverview extends Component {
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
    const dataList = [
      {
        name: '信息资源',
        value: 199,
      },
      {
        name: '接入资源',
        value: 102,
      },
      {
        name: '订阅数',
        value: 123,
      },
      {
        name: '被订阅数',
        value: 102,
      },
      {
        name: '数据量',
        value: '2314134条',
      },
      {
        name: '文件量',
        value: '1512.12 PB',
      },
      {
        name: '订阅数据量',
        value: '10242条',
      },
      {
        name: '订阅文件量',
        value: '1024 PB',
      },
    ]
    const timeData = [
      {
        x: new Date() - 1000 * 60 * 7,
        y1: 0.23,
        y2: 0.12,
      },
      {
        x: new Date() - 1000 * 60 * 6,
        y1: 0.45,
        y2: 0.21,
      },
      {
        x: new Date() - 1000 * 60 * 5,
        y1: 0.93,
        y2: 0.88,
      },
      {
        x: new Date() - 1000 * 60 * 4,
        y1: 0.45,
        y2: 0.41,
      },
      {
        x: new Date() - 1000 * 60 * 3,
        y1: 0.88,
        y2: 0.46,
      },
      {
        x: new Date() - 1000 * 60 * 2,
        y1: 0.57,
        y2: 0.36,
      },
      {
        x: new Date() - 1000 * 60 * 1,
        y1: 0.44,
        y2: 0.27,
      },
    ]
    const columns1 = [
      {
        title: '资源名称',
        dataIndex: 'name',
      },
      {
        title: '所属机构',
        dataIndex: 'organization',
      },
      {
        title: '发布时间',
        dataIndex: 'time',
        render(time = 0) {
          return moment(time).format('YYYY-MM-DD')
        },
      },
    ]
    const columns2 = [
      {
        title: '资源名称',
        dataIndex: 'name',
        render(text, row) {
          return (
            <span>
              <span className={`${styles.rank} ${styles[`rank${row.id}`]}`}>{row.id}</span>
              <span>{text}</span>
            </span>
          )
        },
      },
      {
        title: '发布机构',
        dataIndex: 'organization',
      },
      {
        title: '订阅数量',
        dataIndex: 'amount',
      },
    ]
    const data1 = [
      {
        id: 1,
        name: '石家庄市人口数据',
        organization: '石家庄市民政局',
        time: new Date(),
      },
      {
        id: 2,
        name: '石家庄市土地数据',
        organization: '石家庄市土地局',
        time: new Date(),
      },
      {
        id: 3,
        name: '石家庄市水利数据',
        organization: '石家庄市水利局',
        time: new Date(),
      },
      {
        id: 4,
        name: '石家庄市企业数据',
        organization: '石家庄市工商局',
        time: new Date(),
      },
      {
        id: 5,
        name: '石家庄市气象数据',
        organization: '石家庄市气象局',
        time: new Date(),
      },
    ]
    const data2 = [
      {
        id: 1,
        name: '人口普查数据',
        organization: '石家庄市民政局',
        amount: 123465,
      },
      {
        id: 2,
        name: '人口普查数据',
        organization: '石家庄市民政局',
        amount: 123465,
      },
      {
        id: 3,
        name: '人口普查数据',
        organization: '石家庄市民政局',
        amount: 123465,
      },
      {
        id: 4,
        name: '人口普查数据',
        organization: '石家庄市民政局',
        amount: 123465,
      },
      {
        id: 5,
        name: '人口普查数据',
        organization: '石家庄市民政局',
        amount: 123465,
      },
    ]
    const data3 = [
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
    return (
      <PageHeaderLayout>
        <div>
          <Card loading={loading}>
            <Row gutter={32}>
              <Col span={16}>
                <Row gutter={16}>{rendCard(dataList)}</Row>
                <div className={styles.task}>
                  <h3>交换任务</h3>
                  <div className={styles.img}>
                    <img src={img} alt="组织机构" />
                  </div>
                </div>
                <div>
                  <h3>实时传输</h3>
                  <TimelineChart
                    data={timeData}
                    titleMap={{ y1: '交换量', y2: '计入量' }}
                    showArea
                    height={400}
                    />
                </div>
              </Col>
              <Col span={8} className={styles.right}>
                <div className={styles.tips}>
                  <span>代办事项</span>
                  <span>审核资源&nbsp;2</span>
                  <span>目录审核&nbsp;3</span>
                  <span>授权审核&nbsp;2</span>
                </div>
                <h3>最新资源</h3>
                <Table dataSource={data1} columns={columns1} pagination={false} rowKey="id" />
                <div className="clearfix">
                  <h3 className="fl">最受欢迎的资源</h3>
                  <Select className={styles.select} defaultValue="amount">
                    <Select.Option value="amount">按内网订阅数量</Select.Option>
                    <Select.Option value="download">按内网订阅下载量</Select.Option>
                  </Select>
                </div>
                <Table dataSource={data2} columns={columns2} pagination={false} rowKey="id" />
                <h3>目录分类占比</h3>
                <Pie
                  data={data3}
                  subTitle={
                    <div>
                      目录资源<p>269</p>
                    </div>
                  }
                  hasLegend
                  height={294}
                  />
                <h3>平均传输速率</h3>
                <Gauge
                  percent={87}
                  title="传输速率"
                  height={180}
                  format="MB/S"
                  hasLegend
                  legendData={[
                    { title: '最快', value: '9.61MB/S' },
                    { title: '最慢', value: '0.42MB/S' },
                    { title: '平均', value: '5.6MB/S' },
                  ]}
                  />
              </Col>
            </Row>
          </Card>
        </div>
      </PageHeaderLayout>
    )
  }
}
