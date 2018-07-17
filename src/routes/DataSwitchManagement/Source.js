import React, { Component } from 'react';
import { Card, Row, Col, Button, Divider, Table } from 'antd';
import moment from 'moment';

// import styles from './Source.less';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';

export default class Source extends Component {
  render() {
    const pagination = {
      current: 1,
      pageSize: 10,
    };
    const rowSelection = {
      // selectedRowKeys,
      onChange: () => {},
    };
    const columns = [
      {
        title: '序号',
        dataIndex: 'id',
      },
      {
        title: '表名称',
        dataIndex: 'tableName',
      },
      {
        title: '数据条数',
        dataIndex: 'count',
      },
      {
        title: '更新时间',
        dataIndex: 'upTime',
        render(text) {
          return moment(text).format('lll');
        },
      },
      {
        title: '操作',
        render() {
          return (
            <div>
              <a className="mr8">浏览</a>
              <a>结构</a>
            </div>
          );
        },
      },
    ];
    const list = [
      {
        id: 0,
        catalog: 'Dtable',
        count: 5000,
        oweZt: '国土数据',
        oweJg: '',
        storeDataL: '',
        upTime: '1323131',
      },
      {
        id: 1,
        catalog: 'Dtable',
        count: 5000,
        oweZt: '国土数据',
        oweJg: '',
        storeDataL: '',
        upTime: '3132141',
      },
    ];
    return (
      <PageHeaderLayout>
        <Card>
          <div style={{ textAlign: 'right' }}>
            <Button type="primary">返回</Button>
          </div>
          <Row>
            <Col span={4}>
              <h2>
                数据库
                <span>Youedata_dig</span>
              </h2>
            </Col>
            <Col span={4}>
              <h3>
                数据类型
                <span>Mysql</span>
              </h3>
            </Col>
            <Col span={4}>
              <h3>
                资源名称
                <span>城市低保标准表</span>
              </h3>
            </Col>
            <Col span={4}>
              <h3>
                所属机构
                <span>石家庄市民政局</span>
              </h3>
            </Col>
            <Col span={8}>
              <h3>
                数据更新时间
                <span>2018-06-20 15:08:08</span>
              </h3>
            </Col>
          </Row>
          <Row>
            <Col>
              <h3>
                数据表 共<span>32</span>张
              </h3>
              <Table
                columns={columns}
                dataSource={list}
                pagination={pagination}
                rowSelection={rowSelection}
                rowKey="id"
                bordered
              />
            </Col>
            <Col>
              <h3>
                数据 共<span>32</span>行
              </h3>
              <Table
                columns={columns}
                dataSource={list}
                pagination={pagination}
                rowSelection={rowSelection}
                rowKey="id"
                bordered
              />
            </Col>
          </Row>
          <Divider />
        </Card>
      </PageHeaderLayout>
    );
  }
}
