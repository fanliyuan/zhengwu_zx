import React, { Component } from 'react';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import { Table, Button, Card, Divider, Row, Col, Input } from 'antd';
// import moment from 'moment';

import styles from './ResourceConnectionData.less';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';

@connect()
export default class ResourceConnectionData extends Component {
  goToDetail = row => {
    this.props.dispatch(
      routerRedux.push({
        pathname: `/dataSourceManagement/fileSourceDetail/${row.id}`,
        state: row,
      })
    );
  };

  render() {
    const pagination = { pageSize: 10, current: 1 };
    const columns = [
      {
        title: '序号',
        dataIndex: 'id',
      },
      {
        title: '信息编码',
        dataIndex: 'infoCode',
      },
      {
        title: '信息名称',
        dataIndex: 'infoName',
      },
      {
        title: '数据类型',
        dataIndex: 'dataTypes',
      },
      {
        title: '数据长度',
        dataIndex: 'dataSize',
      },
    ];
    columns.forEach(item => {
      item.align = 'center';
    });
    const list = [
      {
        id: 0,
        infoCode: 'id',
        infoName: '',
        dataTypes: 'int',
        dataSize: '',
      },
      {
        id: 1,
        infoCode: 'name',
        infoName: '',
        dataTypes: 'varchar',
        dataSize: '',
      },
      {
        id: 2,
        infoCode: 'sex',
        infoName: '',
        dataTypes: 'varchar',
        dataSize: '',
      },
    ];
    const columns1 = [
      {
        title: '表名称',
        dataIndex: 'tableName',
      },
      {
        title: '字段',
        dataIndex: 'field',
      },
      {
        title: '类型',
        dataIndex: 'types',
      },
      {
        title: '说明',
        dataIndex: 'intro',
      },
      {
        title: '操作',
        render() {
          return <a>删除</a>;
        },
      },
    ];
    columns1.forEach(item => {
      item.align = 'center';
    });
    const list1 = [
      {
        id: 0,
        tableName: 'Dtable1',
        field: 'id',
        types: 'int',
        intro: '',
      },
      {
        id: 1,
        tableName: '',
        field: '',
        types: '',
        intro: '',
      },
      {
        id: 2,
        tableName: 'Dtable2',
        field: 'sex',
        types: 'varchar',
        intro: '',
      },
    ];
    return (
      <PageHeaderLayout>
        <Card>
          <div className={styles.backBtn}>
            <Button type="primary" className="mr8">
              保存
            </Button>
            <Button type="primary">返回</Button>
          </div>
          <div className={styles.form}>
            <h3>
              目录编码:<span> 3300031306381126/00001</span>
              名称:<span> 资产负债表信息</span>
              提供方:<span> 规划局</span>
              创建时间:<span> 2018-06-08 10:11:10</span>
            </h3>
            <Divider />
          </div>
          <Row style={{ marginBottom: 15 }}>
            <Col span={4}>
              <h3>
                挂接资源名称:<span>城市低保标准</span>
              </h3>
            </Col>
            <Col span={18}>
              <a>去选择</a>
            </Col>
          </Row>
          <Row style={{ marginBottom: 20 }}>
            <Col span={4}>
              <h3>挂接资源文件:</h3>
            </Col>
            <Col span={18}>
              <a>去选择</a>
            </Col>
          </Row>
          <Row style={{ marginBottom: 20 }}>
            <Col span={4}>
              <Input placeholder="信息编码" />
            </Col>
            <Col span={4} offset={1}>
              <Input placeholder="信息名称" />
            </Col>
            <Col span={4} offset={1}>
              <Button type="primary">搜索</Button>
            </Col>
          </Row>
          <Row>
            <Col span={11}>
              <Table
                columns={columns}
                dataSource={list}
                pagination={pagination}
                rowKey="id"
                bordered
              />
            </Col>
            <Col span={11} offset={2}>
              <Table
                columns={columns1}
                dataSource={list1}
                pagination={pagination}
                rowKey="id"
                bordered
              />
            </Col>
          </Row>
        </Card>
      </PageHeaderLayout>
    );
  }
}
