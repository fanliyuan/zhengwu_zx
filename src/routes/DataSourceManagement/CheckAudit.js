/*
 * @Author: ChouEric
 * @Date: 2018-07-08 15:33:07
 * @Last Modified by: ChouEric
 * @Last Modified time: 2018-07-26 16:18:37
*/
import React, { PureComponent } from 'react'
import { Link } from 'dva/router'
import { Card, Row, Col, Button } from 'antd'
import moment from 'moment'

import FileHeader from 'components/FileHeader'
import PageHeaderLayout from '../../layouts/PageHeaderLayout'
import styles from './CheckAudit.less'

export default class CheckAudit extends PureComponent {
  state = {
    loading: false,
    data: {},
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
    const hearderData = {
      menuCode: '3300031306381126/00001',
      menuName: '资产负债表信息',
      provider: '规划局',
      time: moment(new Date(), 'x').format('lll'),
    }
    const btnList = []
    return (
      <PageHeaderLayout>
        <div className="common-layout">
          <div className="btncls clearfix">
            <Link to="/dataSourceManagement/subscriptionAudit" className="fr mr40">
              <Button>返回</Button>
            </Link>
          </div>
          <FileHeader data={hearderData} btnList={btnList} />
          <Card loading={this.state.loading} bordered={false}>
            <Row>
              <Col sx={{ span: 24 }} sm={{ span: 12 }} className={styles.box}>
                <h4>资源挂接</h4>
                <ul>
                  <li>
                    <span>资源名称</span>:
                    <span>
                      {this.state.data.name &&
                        this.state.data.name.substring(0, this.state.data.name.lastIndexOf('.'))}
                    </span>
                  </li>
                  <li>
                    <span>数据类型</span>:
                    <span>{this.state.data.fileType}</span>
                  </li>
                  <li>
                    <span>节点</span>:
                    <span>{this.state.data.node || '石家庄市民政部'}</span>
                  </li>
                  <li>
                    <span>所属机构</span>:
                    <span>{this.state.data.node || '石家庄市民政部'}</span>
                  </li>
                  <li>
                    <span>应用系统名称</span>:
                    <span>{this.state.data.node || '统计系统'}</span>
                  </li>
                  <li>
                    <span>注册时间</span>:
                    <span>{moment(this.state.data.uploadTime).format('lll')}</span>
                  </li>
                  <li>
                    <span>资源</span>:
                    <span>
                      <a>查看</a>
                    </span>
                  </li>
                </ul>
              </Col>
              <Col sx={{ span: 24 }} sm={{ span: 12 }} className={styles.box}>
                <h4>订阅详情</h4>

                <ul>
                  <li>
                    <span>订阅节点</span>:
                    <span>
                      {(this.state.data.name &&
                        this.state.data.name.substring(0, this.state.data.name.lastIndexOf('.'))) ||
                        '石家庄市民政部'}
                    </span>
                  </li>
                  <li>
                    <span>订阅机构</span>:
                    <span>{this.state.data.fileType || '石家庄市民政部'}</span>
                  </li>
                  <li>
                    <span>订阅时间</span>:
                    <span>
                      {(this.state.data.time && moment(this.state.data.subscriptionTime)) ||
                        moment(new Date(), 'x').format('lll')}
                    </span>
                  </li>
                  <li>
                    <span>授权状态</span>:
                    <span>{this.state.data.state || '已拒绝 2018-06-08 10:11:10'}</span>
                  </li>
                  <li>
                    <span>拒绝原因</span>:
                    <span>
                      {this.state.data.node ||
                        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean euismod bibendum laoreet. Proin gravida dolor sit amet lacus accumsan et viverra justo commodo.'}
                    </span>
                  </li>
                </ul>
              </Col>
            </Row>
          </Card>
        </div>
      </PageHeaderLayout>
    )
  }
}
