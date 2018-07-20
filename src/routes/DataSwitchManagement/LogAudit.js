import React, { Component } from 'react';
import { Card, List, Button } from 'antd';

// import styles from './LogAudit.less';
import { Link } from 'dva/router';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';

export default class LogAudit extends Component {
  render() {
    const data = [
      {
        title: '申请人',
        content: '',
      },
      {
        title: '申请时间',
        content: '',
      },
      {
        title: '审核人',
        content: '',
      },
      {
        title: '审核时间',
        content: '',
      },
      {
        title: '审核结果',
        content: '',
      },
      {
        title: '拒绝理由',
        content: '',
      },
    ];
    const data1 = [
      {
        title: '申请人',
        content: '',
      },
      {
        title: '申请时间',
        content: '',
      },
      {
        title: '审核人',
        content: '',
      },
      {
        title: '审核时间',
        content: '',
      },
      {
        title: '审核结果',
        content: '',
      },
      {
        title: '拒绝理由',
        content: '',
      },
    ];
    return (
      <PageHeaderLayout>
        <Card>
          <div style={{ textAlign: 'right' }}>
            <Link to="/dataSwitchManagement/allSub">
              <Button type="primary">返回</Button>
            </Link>
          </div>
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
      </PageHeaderLayout>
    );
  }
}
