/*
 * @Author: ChouEric
 * @Date: 2018-07-06 17:49:10
 * @Last Modified by: ChouEric
 * @Last Modified time: 2018-07-18 17:46:29
 * @描述: 数据资源管理 -- 审核日志
*/
import React, { Component } from 'react'
import { Link } from 'dva/router'
import { Card, Button, Row, Col } from 'antd'

import PageHeaderLayout from '../../layouts/PageHeaderLayout'
import styles from './AuditLog.less'

export default class AuditLog extends Component {
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
    }, 200)
  }

  render() {
    const { loading } = this.state

    return (
      <PageHeaderLayout>
        <div className="common-layout">
          <div className="clearfix">
            <Link to="/dataSourceManagement/catalogAudit" style={{ float: 'right' }}>
              <Button type="primary">返回</Button>
            </Link>
          </div>
          <Card loading={loading} bordered={false} className={styles.card}>
            <Row type="flex" justify="center">
              <Col xs={{ span: 20 }} sm={{ span: 8 }}>
                <span>申请人</span>:
                <span>张三三</span>
              </Col>
              <Col xs={{ span: 20 }} sm={{ span: 8 }}>
                <span>申请时间</span>:
                <span>张三三</span>
              </Col>
            </Row>
            <Row type="flex" justify="center">
              <Col xs={{ span: 20 }} sm={{ span: 8 }}>
                <span>审核人</span>:
                <span>张三三</span>
              </Col>
              <Col xs={{ span: 20 }} sm={{ span: 8 }}>
                <span>审核时间</span>:
                <span>张三三</span>
              </Col>
            </Row>
            <Row type="flex" justify="center">
              <Col xs={{ span: 20 }} sm={{ span: 8 }}>
                <span>审核结果</span>:
                <span>张三三</span>
              </Col>
              <Col xs={{ span: 20 }} sm={{ span: 8 }}>
                <span>拒绝理由</span>:
                <span>张三三</span>
              </Col>
            </Row>
          </Card>
        </div>
      </PageHeaderLayout>
    )
  }
}
