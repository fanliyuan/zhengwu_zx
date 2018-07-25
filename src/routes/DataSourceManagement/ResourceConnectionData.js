import React, { Component } from 'react';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import { Table, Button, Card, Divider, Row, Col, Modal, Input, DatePicker } from 'antd';
import moment from 'moment';

import styles from './ResourceConnectionData.less';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';

const { RangePicker } = DatePicker;
@connect(({ resourceConnectionData }) => ({
  resourceConnectionData,
}))
export default class ResourceConnectionData extends Component {
  state = {
    ItemConnect: true,
    visible1: false,
    visible2: false,
  };

  goToDetail = row => {
    this.props.dispatch(
      routerRedux.push({
        pathname: `/dataSourceManagement/fileSourceDetail/${row.id}`,
        state: row,
      })
    );
  };

  handleConnect = () => {
    this.setState({
      ItemConnect: true,
    });
  };

  handleClearConnect = () => {
    this.setState({
      ItemConnect: false,
    });
  };

  handleSave = () => {
    const { dispatch } = this.props;
    dispatch(routerRedux.push('/dataSourceManagement/catalogManagement'));
  };

  handleBack = () => {
    const { dispatch } = this.props;
    dispatch(routerRedux.push('/dataSourceManagement/catalogManagement'));
  };

  showModal1 = () => {
    this.setState({
      visible1: true,
    });
  };

  showModal2 = () => {
    this.setState({
      visible2: true,
    });
  };

  handleOk1 = () => {
    this.setState({
      visible1: false,
    });
  };

  handleOk2 = () => {
    this.setState({
      visible2: false,
    });
  };

  handleCancel1 = () => {
    this.setState({
      visible1: false,
    });
  };

  handleCancel2 = () => {
    this.setState({
      visible2: false,
    });
  };

  render() {
    const { ItemConnect, visible1, visible2 } = this.state;
    const pagination = { pageSize: 10, current: 1 };
    const columns = [
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
        infoCode: '',
        infoName: 'id',
        dataTypes: 'int',
        dataSize: '',
      },
      {
        id: 1,
        infoCode: '',
        infoName: 'name',
        dataTypes: 'varchar',
        dataSize: '',
      },
      {
        id: 2,
        infoCode: '',
        infoName: 'sex',
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
    const columnsModal1 = [
      {
        title: 'ID',
        dataIndex: 'id',
      },
      {
        title: '资源名称',
        dataIndex: 'sourceName',
      },
      {
        title: '数据类型',
        dataIndex: 'dataType',
      },
      {
        title: '应用系统名称',
        dataIndex: 'systemName',
      },
      {
        title: '注册时间',
        dataIndex: 'registerTime',
        render(text) {
          return moment(text).format('lll');
        },
      },
    ];
    const columnsModal2 = [
      {
        title: '文件名称',
        dataIndex: 'fileName',
      },
      {
        title: '类型',
        dataIndex: 'type',
      },
      {
        title: '文件大小',
        dataIndex: 'fileSize',
      },
      {
        title: '上传人',
        dataIndex: 'uploader',
      },
      {
        title: '上传时间',
        dataIndex: 'uploadTime',
        render(text) {
          return moment(text).format('lll');
        },
      },
    ];
    const listModal1 = [
      {
        id: 0,
        sourceName: '城市低保标准',
        dataType: '文件',
        systemName: '统计系统',
        registerTime: 451233554,
      },
      {
        id: 1,
        sourceName: '农村低保准备',
        dataType: '文件',
        systemName: '统计系统',
        registerTime: 451233554,
      },
      {
        id: 2,
        sourceName: '人口统计',
        dataType: '文件',
        systemName: '统计系统',
        registerTime: 451233554,
      },
    ];
    const listModal2 = [
      {
        fileName: '城市低保标准表(各市第7季度).xlsx',
        type: 'Zip',
        fileSize: '1.38MB',
        uploader: '张三',
        uploadTime: 4512211,
      },
      {
        fileName: '农村低保标准表(各地第1季度).json',
        type: 'json',
        fileSize: '0.12MB',
        uploader: '李四',
        uploadTime: 4512211,
      },
      {
        fileName: '人口普查数据.xml',
        type: 'jpeg',
        fileSize: '1.56MB',
        uploader: '王五',
        uploadTime: 4512211,
      },
    ];
    return (
      <PageHeaderLayout>
        <Card>
          <div className={styles.backBtn}>
            <Button type="primary" className="mr8" onClick={this.handleSave}>
              保存
            </Button>
            <Button type="primary" onClick={this.handleBack}>
              返回
            </Button>
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
              <span className={styles.linkBtn} onClick={this.showModal1}>
                去选择
              </span>
            </Col>
          </Row>
          <Row style={{ marginBottom: 20 }}>
            <Col span={4}>
              <h3>挂接资源文件:</h3>
            </Col>
            <Col span={18}>
              <span className={styles.linkBtn} onClick={this.showModal2}>
                去选择
              </span>
            </Col>
          </Row>
          {/* <Row style={{ marginBottom: 20 }}>
            <Col span={4}>
              <Input placeholder="信息编码" />
            </Col>
            <Col span={4} offset={1}>
              <Input placeholder="信息名称" />
            </Col>
            <Col span={4} offset={1}>
              <Button type="primary">搜索</Button>
            </Col>
          </Row> */}
          <Row>
            <Col span={10}>
              <Table
                columns={columns}
                dataSource={list}
                pagination={pagination}
                rowKey="id"
                bordered
              />
            </Col>
            <Col span={4} style={{ textAlign: 'center' }}>
              <Row>
                <Col span={11}>
                  <Button onClick={this.handleConnect}>自动映射</Button>
                </Col>
                <Col span={11} offset={2}>
                  <Button onClick={this.handleClearConnect}>清楚映射</Button>
                </Col>
              </Row>
              <Row
                style={{
                  marginTop: 40,
                  padding: '0 10px',
                  display: ItemConnect ? 'block' : 'none',
                }}
              >
                <Col>
                  <img src="/src/assets/arrow.png" alt="arrow" style={{ width: '100%' }} />
                </Col>
              </Row>
              <Row
                style={{
                  padding: '0 10px',
                  marginTop: 30,
                  display: ItemConnect ? 'block' : 'none',
                }}
              >
                <Col>
                  <img src="/src/assets/arrow.png" alt="arrow" style={{ width: '100%' }} />
                </Col>
              </Row>
              <Row
                style={{
                  padding: '0 10px',
                  marginTop: 30,
                  display: ItemConnect ? 'block' : 'none',
                }}
              >
                <Col>
                  <img src="/src/assets/arrow.png" alt="arrow" style={{ width: '100%' }} />
                </Col>
              </Row>
            </Col>
            <Col span={10}>
              <Table
                columns={columns1}
                dataSource={list1}
                pagination={pagination}
                rowKey="id"
                bordered
              />
            </Col>
          </Row>
          <Modal
            title="选择要挂接的资源"
            visible={visible1}
            onOk={this.handleOk1}
            onCancel={this.handleCancel1}
            width={900}
          >
            <Row style={{ marginBottom: 20 }}>
              <Col span={5}>
                <Input placeholder="资源名称" />
              </Col>
              <Col span={5} offset={1}>
                <Input placeholder="应用系统名称" />
              </Col>
              <Col span={5} offset={1}>
                <RangePicker />
              </Col>
              <Col span={5} offset={1}>
                <Button type="primary">搜索</Button>
              </Col>
            </Row>
            <Table
              columns={columnsModal1}
              dataSource={listModal1}
              pagination={pagination}
              rowKey="id"
              bordered
            />
          </Modal>
          <Modal
            title="选择要挂接的资源文件"
            visible={visible2}
            onOk={this.handleOk2}
            onCancel={this.handleCancel2}
            width={900}
          >
            <Table
              columns={columnsModal2}
              dataSource={listModal2}
              pagination={pagination}
              rowKey="id"
              bordered
            />
          </Modal>
        </Card>
      </PageHeaderLayout>
    );
  }
}
