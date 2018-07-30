/*
 * @Author: ChouEric
 * @Date: 2018-07-15 17:29:48
 * @Last Modified by: ChouEric
 * @Last Modified time: 2018-07-30 13:58:16
*/
import React, { Component } from 'react'
import { Row, Col, Card } from 'antd'

import { Pie, BarDouble } from 'components/Charts'
import PageHeaderLayout from '../../layouts/PageHeaderLayout'
import styles from './DataInsert.less'

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
          <Row gutter={16}>
            <Col {...colResponsiveProps}>
              <Card
                loading={loading}
                title="接入数据量分布"
                className={styles.card}
                bordered={false}
                >
                <Pie
                  data={data1}
                  valueFormat={value => value}
                  height={400}
                  inner={0}
                  lineWidth={0}
                  hasLegend
                  showPercent
                  showValue={false}
                  />
              </Card>
            </Col>
            <Col {...colResponsiveProps}>
              <Card loading={loading} title="接入数据概览" className={styles.card} bordered={false}>
                {/* 以下两种展示,数据格式不一样 */}
                {/* <Bars height={400} data={data2} color={['name', ['red', 'blue']]} isVertical /> */}
                <BarDouble height={400} data={data3} titleMap={{ y1: '数据接入', y2: '表接入' }} />
              </Card>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col {...colResponsiveProps}>
              <Card loading={loading} title="接入源分布" className={styles.card} bordered={false}>
                <Pie
                  data={data4}
                  height={400}
                  inner={0}
                  lineWidth={0}
                  hasLegend
                  showPercent
                  showValue={false}
                  />
              </Card>
            </Col>
            <Col {...colResponsiveProps}>
              <Card loading={loading} title="资源注册概览" className={styles.card} bordered={false}>
                <BarDouble
                  height={400}
                  data={data3}
                  titleMap={{ y1: '数据接入', y2: '表接入' }}
                  adjustType="stack"
                  />
              </Card>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col {...colResponsiveProps}>
              <Card loading={loading} title="任务概况" className={styles.card} bordered={false}>
                <Pie
                  data={data4}
                  height={400}
                  inner={0}
                  lineWidth={0}
                  offset={20}
                  padding={[24, 0, 24, 0]}
                  />
              </Card>
            </Col>
            <Col {...colResponsiveProps}>
              <Card loading={loading} title="资源注册概览" className={styles.card} bordered={false}>
                <BarDouble
                  height={400}
                  data={data3}
                  titleMap={{ y1: '数据接入', y2: '表接入' }}
                  adjustType="stack"
                  />
              </Card>
            </Col>
          </Row>
        </div>
      </PageHeaderLayout>
    )
  }
}
