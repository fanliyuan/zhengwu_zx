import React, { Component } from 'react';
import { Table, Card, Tabs, Input, DatePicker, Row, Col, Button } from 'antd';
import moment from 'moment';

import styles from './SourceManagement.less';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';

const { TabPane } = Tabs;
const { RangePicker } = DatePicker;
export default class SourceManagement extends Component {
  state = {
    loading: false,
  };

  render() {
    const { loading } = this.state;
    const columns = [
      {
        title: '序号',
        dataIndex: 'id',
      },
      {
        title: '目录名称',
        dataIndex: 'catalog',
      },
      {
        title: '数据条数',
        dataIndex: 'count',
      },
      {
        title: '所属主题',
        dataIndex: 'oweZt',
      },
      {
        title: '所属机构',
        dataIndex: 'oweJg',
      },
      {
        title: '存储数据库',
        dataIndex: 'storeData',
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
              <a className="mr8">目录</a>
              <a>资源</a>
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
    const columns1 = [
      {
        title: '序号',
        dataIndex: 'id',
      },
      {
        title: '目录名称',
        dataIndex: 'catalog',
      },
      {
        title: '数据大小',
        dataIndex: 'dataSize',
      },
      {
        title: '所属主题',
        dataIndex: 'oweZt',
      },
      {
        title: '所属机构',
        dataIndex: 'oweJg',
      },
      {
        title: '存储文件路径',
        dataIndex: 'storeRouter',
      },
      {
        title: '存储文件夹',
        dataIndex: 'storeFile',
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
              <a className="mr8">目录</a>
            </div>
          );
        },
      },
    ];
    const list1 = [
      {
        id: 0,
        catalog: '',
        dataSize: '100M',
        oweZt: '国土数据',
        oweJg: '',
        storeRouter: 'd:/',
        storeFile: 'tuotu',
        upTime: '1323131',
      },
      {
        id: 1,
        catalog: '',
        dataSize: '500M',
        oweZt: '国土数据',
        oweJg: '',
        storeRouter: 'd:/',
        storeFile: 'goutu',
        upTime: '1323131',
      },
    ];
    const pagination = {
      current: 1,
      pageSize: 10,
    };
    const rowSelection = {
      // selectedRowKeys,
      onChange: () => {},
    };
    return (
      <PageHeaderLayout>
        <Card loading={loading}>
          <div>
            <Tabs defaultActiveKey="1">
              <TabPane tab="数据库" key="1">
                <Row style={{ marginBottom: 20 }}>
                  <Col span={3}>
                    <Input placeholder="目录名称" />
                  </Col>
                  <Col span={3} offset={1}>
                    <Input placeholder="所属主题" />
                  </Col>
                  <Col span={3} offset={1}>
                    <Input placeholder="所属机构" />
                  </Col>
                  <Col span={4} offset={1}>
                    <RangePicker />
                  </Col>
                  <Col span={2} offset={1}>
                    <Button type="primary">搜素</Button>
                  </Col>
                </Row>
                <div className={styles.importBtn}>
                  <Button type="primary">导出</Button>
                </div>
                <div>
                  <Table
                    columns={columns}
                    dataSource={list}
                    pagination={pagination}
                    rowSelection={rowSelection}
                    rowKey="id"
                    bordered
                  />
                </div>
              </TabPane>
              <TabPane tab="数据文件" key="2">
                <Row style={{ marginBottom: 20 }}>
                  <Col span={3}>
                    <Input placeholder="目录名称" />
                  </Col>
                  <Col span={3} offset={1}>
                    <Input placeholder="所属主题" />
                  </Col>
                  <Col span={3} offset={1}>
                    <Input placeholder="所属机构" />
                  </Col>
                  <Col span={4} offset={1}>
                    <RangePicker />
                  </Col>
                  <Col span={2} offset={1}>
                    <Button type="primary">搜素</Button>
                  </Col>
                </Row>
                <div className={styles.importBtn}>
                  <Button type="primary">导出</Button>
                </div>
                <div>
                  <Table
                    columns={columns1}
                    dataSource={list1}
                    rowSelection={rowSelection}
                    pagination={pagination}
                    rowKey="id"
                    bordered
                  />
                </div>
              </TabPane>
            </Tabs>
          </div>
        </Card>
      </PageHeaderLayout>
    );
  }
}
