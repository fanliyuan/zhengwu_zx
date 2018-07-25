import React, { Component } from 'react';
import { Table, Button, Input, Select, Card, Row, Col } from 'antd';
import { Link } from 'dva/router';

import styles from './ViewDirectory.less';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';

const { Option } = Select;
export default class ViewDirectory extends Component {
  state = {
    dataType: '0',
    nodeName: '0',
  };

  selectDataTypeChange = val => {
    this.setState({
      dataType: val,
    });
  };

  selectNodeChange = val => {
    this.setState({
      nodeName: val,
    });
  };

  render() {
    const { dataType, nodeName } = this.state;
    const data = [
      { value: '0', id: 0, label: '共享类型' },
      { value: '1', id: 1, label: '共享类型1' },
    ];
    const selectData = data.map(item => {
      return (
        <Option value={item.value} key={item.id} title={item.label}>
          {item.label}
        </Option>
      );
    });
    const data1 = [
      { value: '0', id: 0, label: '开放类型' },
      { value: '1', id: 1, label: '开放类型1' },
    ];
    const selectData1 = data1.map(item => {
      return (
        <Option value={item.value} key={item.id} title={item.label}>
          {item.label}
        </Option>
      );
    });
    const pagination = { pageSize: 10, current: 1 };
    const columns = [
      {
        title: '信息项编码',
        dataIndex: 'infoCode',
      },
      {
        title: '信息项名称',
        dataIndex: 'infoName',
      },
      {
        title: '数据类型',
        dataIndex: 'dataType',
      },
      {
        title: '数据长度',
        dataIndex: 'dataSize',
      },
      {
        title: '共享类型',
        dataIndex: 'shareType',
      },
      {
        title: '共享条件',
        dataIndex: 'shareCondition',
      },
      {
        title: '共享方式分类',
        dataIndex: 'shareStyle',
      },
      {
        title: '共享方式类型',
        dataIndex: 'shareStyleType',
      },
      {
        title: '开放类型',
        dataIndex: 'publicType',
      },
      {
        title: '开放条件',
        dataIndex: 'publicCondition',
      },
    ];
    columns.forEach(item => {
      item.align = 'center';
    });
    const list = [
      {
        id: 0,
        infoCode: '',
        infoName: '',
        dataType: '',
        dataSize: '',
        shareType: '',
        shareCondition: '',
        shareStyle: '',
        shareStyleType: '',
        publicType: '',
        publicCondition: '',
      },
      {
        id: 1,
        infoCode: '',
        infoName: '',
        dataType: '',
        dataSize: '',
        shareType: '',
        shareCondition: '',
        shareStyle: '',
        shareStyleType: '',
        publicType: '',
        publicCondition: '',
      },
      {
        id: 2,
        infoCode: '',
        infoName: '',
        dataType: '',
        dataSize: '',
        shareType: '',
        shareCondition: '',
        shareStyle: '',
        shareStyleType: '',
        publicType: '',
        publicCondition: '',
      },
    ];
    return (
      <PageHeaderLayout>
        <div className="btncls">
          <Link to="/dataSourceManagement/sourceManagement" className="fr mr40">
            <Button>返回</Button>
          </Link>
        </div>
        <div>
          <Card className={styles.InfoBlock}>
            <Row style={{ marginBottom: 10 }}>
              <Col span={6}>
                名称: <span>订单目录</span>
              </Col>
              <Col span={6}>
                分类: <span>建筑数据</span>
              </Col>
              <Col span={6}>
                信息资源代码: <span>10602/000000</span>
              </Col>
              <Col span={6}>
                信息资源格式: <span>电子文件</span>
              </Col>
            </Row>
            <Row style={{ marginBottom: 10 }}>
              <Col span={6}>
                提供方名称: <span>金区国土局</span>
              </Col>
              <Col span={6}>
                提供方内部部门: <span>金区国土局</span>
              </Col>
              <Col span={6}>
                资源提供方代码: <span>113</span>
              </Col>
            </Row>
            <Row style={{ marginBottom: 10 }}>
              <Col span={24}>
                摘要: <span>国土局国土局国土局国土局国土局</span>
              </Col>
            </Row>
            {/* <Row>
              <Col span={24}>
                <span className={styles.labels}>标签:</span>
                <Tag>标签1</Tag>
                <Tag>标签2</Tag>
                <Tag>标签3</Tag>
                <Tag>标签4</Tag>
                <Tag>标签5</Tag>
                <Tag>标签6</Tag>
              </Col>
            </Row> */}
          </Card>
          <div className={styles.form}>
            <Input placeholder="信息项编码" style={{ width: 150, marginRight: 20 }} />
            <Input placeholder="信息项名称" style={{ width: 150, marginRight: 20 }} />
            <Select
              style={{ marginRight: 20, width: 120 }}
              value={dataType}
              onChange={this.selectDataTypeChange}
            >
              {selectData}
            </Select>
            <Select
              style={{ marginRight: 20, width: 120 }}
              value={nodeName}
              onChange={this.selectNodeChange}
            >
              {selectData1}
            </Select>
            <Button type="primary">搜索</Button>
          </div>
          <div>
            <Table
              columns={columns}
              dataSource={list}
              pagination={pagination}
              rowKey="id"
              bordered
            />
          </div>
        </div>
      </PageHeaderLayout>
    );
  }
}
