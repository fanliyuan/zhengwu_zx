/*
 * @Author: ChouEric
 * @Date: 2018-07-10 10:14:20
 * @Last Modified by: ChouEric
 * @Last Modified time: 2018-07-17 11:14:17
*/
import React, { Component } from 'react'
import { Link } from 'dva/router'
import { Card, Button, Row, Col } from 'antd'
import moment from 'moment'

import PageHeaderLayout from '@/components/PageHeaderWrapper'
import styles from './InsertResource.less'

export default class InsertResource extends Component {
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
    // setTimeout(() => {
    //   // 利用浏览器的路由功能实现返回,或者说后退功能,缺点: 会造成页面的重新加载,非单页面应用程序.
    //   this.props.history.goBack()
    // }, 1000);
  }

  render() {
    return (
      <PageHeaderLayout>
        <div className="common-layout">
          <div className="clearfix">
            <Link to="/monitor/insert" className="fr">
              <Button type="primary">返回</Button>
            </Link>
          </div>
          <Card loading={this.state.loading} className={styles.card} bordered={false}>
            <Row type="flex" justify="space-around">
              <Col span={8}>
                <span className={styles.label}>采集方式</span>:
                <span className={styles.value}>触发器</span>
              </Col>
              <Col span={8}>
                <span className={styles.label}>采集机制</span>
                <span className={styles.value}>周期</span>
              </Col>
            </Row>
            <Row type="flex" justify="space-around">
              <Col span={8}>
                <span className={styles.label}>抽取大小</span>:
                <span className={styles.value}>3024M</span>
              </Col>
              <Col span={8}>
                <span className={styles.label}>抽取数</span>
                <span className={styles.value}>1000条</span>
              </Col>
            </Row>
            <Row type="flex" justify="space-around">
              <Col span={8}>
                <span className={styles.label}>更新数</span>:
                <span className={styles.value}>200条</span>
              </Col>
              <Col span={8}>
                <span className={styles.label}>插入数</span>
                <span className={styles.value}>700条</span>
              </Col>
            </Row>
            <Row type="flex" justify="space-around">
              <Col span={8}>
                <span className={styles.label}>删除数</span>:
                <span className={styles.value}>100条</span>
              </Col>
              <Col span={8}>
                <span className={styles.label}>异常数</span>
                <span className={styles.value}>700条</span>
              </Col>
            </Row>
            <Row type="flex" justify="space-around">
              <Col span={8}>
                <span className={styles.label}>抽取开始时间</span>:
                <span className={styles.value}>{moment(new Date(), 'x').format('lll')}</span>
              </Col>
              <Col span={8}>
                <span className={styles.label}>抽取结束时间</span>
                <span className={styles.value}>{moment(new Date(), 'x').format('lll')}</span>
              </Col>
            </Row>
            <Row type="flex" justify="space-around">
              <Col span={8}>
                <span className={styles.label}>入库结束时间</span>:
                <span className={styles.value}>{moment(new Date(), 'x').format('lll')}</span>
              </Col>
              <Col span={8}>
                <span className={styles.label}>抽取用时</span>
                <span className={styles.value}>1小时1分1秒</span>
              </Col>
            </Row>
            <Row type="flex" justify="space-around">
              <Col span={20}>
                <span className={styles.label}>入库用时</span>:
                <span className={styles.value}>1小时1分1秒</span>
              </Col>
            </Row>
          </Card>
        </div>
      </PageHeaderLayout>
    )
  }
}
