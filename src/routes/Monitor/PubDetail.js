/*
 * @Author: ChouEric
 * @Date: 2018-07-10 11:08:50
 * @Last Modified by: ChouEric
 * @Last Modified time: 2018-07-10 13:17:36
 * @描述: 监控告警 -- 发布监控详情
*/
import React, { Component } from 'react'
import { Link } from 'dva/router'
import { connect } from 'dva'
import { Card, Button, Row, Col } from 'antd'
import moment from 'moment'

import PageHeaderLayout from '../../layouts/PageHeaderLayout'
import styles from './PubDetail.less'

@connect()
export default class PubDetail extends Component {
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

  // goBack = () => {
  //   // routerRedux.goBack()也会形成非SPA
  //   this.props.dispatch(
  //     routerRedux.push('/monitor/task')
  //   )
  // }

  render() {
    const { loading } = this.state

    return (
      <PageHeaderLayout>
        <div className="common-layout">
          <div className="clearfix">
            <Link to="/monitor/task" className="fr">
              <Button type="primary">返回</Button>
            </Link>
            {/* <Button type='primary' onClick={this.goBack} className={styles.fr} >返回</Button> */}
          </div>
          <Card loading={loading} bordered={false}>
            <Row type="flex" justify="space-around">
              <Col span={8}>
                <span className={styles.label}>发布名称</span>:
                <span className={styles.value}>石家庄东城区新街道国土资源</span>
              </Col>
              <Col span={8}>
                <span className={styles.label}>目标节点</span>:
                <span className={styles.value}>石家庄东城区新街道国土资源节点</span>
              </Col>
            </Row>
            <Row type="flex" justify="space-around">
              <Col span={8}>
                <span className={styles.label}>目标机构</span>:
                <span className={styles.value}>石家庄东城区新街道国土资源</span>
              </Col>
              <Col span={8}>
                <span className={styles.label}>发送量</span>:
                <span className={styles.value}>300M</span>
              </Col>
            </Row>
            <Row type="flex" justify="space-around">
              <Col span={8}>
                <span className={styles.label}>发送条数</span>:
                <span className={styles.value}>700M</span>
              </Col>
              <Col span={8}>
                <span className={styles.label}>发送开始时间</span>:
                <span className={styles.value}>{moment(new Date(), 'x').format('lll')}</span>
              </Col>
            </Row>
            <Row type="flex" justify="space-around">
              <Col span={8}>
                <span className={styles.label}>发送结束时间</span>:
                <span className={styles.value}>{moment(new Date(), 'x').format('lll')}</span>
              </Col>
              <Col span={8}>
                <span className={styles.label}>发送用时</span>:
                <span className={styles.value}>1小时20分</span>
              </Col>
            </Row>
          </Card>
        </div>
      </PageHeaderLayout>
    )
  }
}
