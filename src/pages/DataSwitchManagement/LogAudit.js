import React, { Component } from 'react'
import { Card, List, Button } from 'antd'

// import styles from './LogAudit.less';
import { Link } from 'dva/router'
import PageHeaderLayout from '@/components/PageHeaderWrapper'

export default class LogAudit extends Component {
  render() {
    const data = [
      {
        title: '申请人',
        content: '张三',
      },
      {
        title: '申请时间',
        content: '2018年8月1日 12:00:00',
      },
      {
        title: '审核人',
        content: '石家庄东城区',
      },
      {
        title: '审核时间',
        content: '2018年8月7日 12:00:00',
      },
      {
        title: '审核结果',
        content: '拒绝',
      },
      {
        title: '拒绝理由',
        content: '无条件拒绝',
      },
    ]
    const data1 = [
      {
        title: '申请人',
        content: '张三',
      },
      {
        title: '申请时间',
        content: '2018年8月1日 12:00:00',
      },
      {
        title: '审核人',
        content: '李四',
      },
      {
        title: '审核时间',
        content: '2018年8月7日 12:00:00',
      },
      {
        title: '审核结果',
        content: '通过',
      },
      {
        title: '拒绝理由',
        content: '无',
      },
    ]
    return (
      <PageHeaderLayout>
        <div className="common-layout">
          <div className="btncls">
            <Link to="/dataSwitchManagement/allSub" className="fr mr40">
              <Button type="primary">返回</Button>
            </Link>
          </div>
          <Card>
            <Card style={{ width: 800, margin: '0 auto' }}>
              <List
                grid={{ gutter: 16, column: 2 }}
                dataSource={data}
                renderItem={item => (
                  <List.Item>
                    <span>{item.title}</span> :
                    <span>{item.content}</span>
                  </List.Item>
                )}
                />
            </Card>
            <Card style={{ width: 800, margin: '60px auto 0' }}>
              <List
                grid={{ gutter: 16, column: 2 }}
                dataSource={data1}
                renderItem={item => (
                  <List.Item>
                    <span>{item.title}</span> :
                    <span>{item.content}</span>
                  </List.Item>
                )}
                />
            </Card>
          </Card>
        </div>
      </PageHeaderLayout>
    )
  }
}
