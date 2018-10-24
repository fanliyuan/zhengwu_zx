/*
 * @Author: ChouEric
 * @Date: 2018-07-10 11:09:51
 * @Last Modified by: ChouEric
 * @Last Modified time: 2018-07-10 13:18:55
 * @描述: 监控告警 -- 订阅监控详情
*/
import React, { Component } from 'react'
import { Link } from 'dva/router'
import { Card, Button, Row, Col } from 'antd'
import moment from 'moment'

import PageHeaderLayout from '../../layouts/PageHeaderLayout'
import styles from './SubDetail.less'

export default class SubDetail extends Component {
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

    return (
      <PageHeaderLayout>
        <div className="common-layout">
          <div className="clearfix">
            <Link to="/monitor/task" className="fr">
              <Button type="primary">返回</Button>
            </Link>
          </div>
          <Card loading={loading} bordered={false}>
            <Row type="flex" justify="space-around">
              <Col span={8}>
                <span className={styles.label}>订阅名称</span>:
                <span className={styles.value}>石家庄东城区新街道国土资源</span>
              </Col>
              <Col span={8}>
                <span className={styles.label}>发布名称</span>:
                <span className={styles.value}>石家庄东城区新街道国土资源节点</span>
              </Col>
            </Row>
            <Row type="flex" justify="space-around">
              <Col span={8}>
                <span className={styles.label}>发布节点</span>:
                <span className={styles.value}>石家庄东城区新街道国土资源</span>
              </Col>
              <Col span={8}>
                <span className={styles.label}>发布机构</span>:
                <span className={styles.value}>石家庄东城区新街道国土资源</span>
              </Col>
            </Row>
            <Row type="flex" justify="space-around">
              <Col span={8}>
                <span className={styles.label}>接收量</span>:
                <span className={styles.value}>300M</span>
              </Col>
              <Col span={8}>
                <span className={styles.label}>接收条数</span>:
                <span className={styles.value}>700条</span>
              </Col>
            </Row>
            <Row type="flex" justify="space-around">
              <Col span={8}>
                <span className={styles.label}>接收开始时间</span>:
                <span className={styles.value}>{moment(new Date(), 'x').format('lll')}</span>
              </Col>
              <Col span={8}>
                <span className={styles.label}>接收结束时间</span>:
                <span className={styles.value}>{moment(new Date(), 'x').format('lll')}</span>
              </Col>
            </Row>
            <Row type="flex" justify="space-around">
              <Col span={8}>
                <span className={styles.label}>入库结束时间</span>:
                <span className={styles.value}>{moment(new Date(), 'x').format('lll')}</span>
              </Col>
              <Col span={8}>
                <span className={styles.label}>接收用时</span>:
                <span className={styles.value}>1小时30分</span>
              </Col>
            </Row>
            <Row type="flex" justify="space-around">
              <Col span={20}>
                <span className={styles.label}>入库用时</span>:
                <span className={styles.value}>1小时40分</span>
              </Col>
            </Row>
          </Card>
        </div>
      </PageHeaderLayout>
    )
  }
}
