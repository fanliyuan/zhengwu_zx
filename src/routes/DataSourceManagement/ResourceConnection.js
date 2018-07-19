import React, { Component } from 'react';
import { connect } from 'dva';
// import { routerRedux } from 'dva/router';
import { Table, Button, Card, Divider, Row, Col, Modal } from 'antd';
import moment from 'moment';

import styles from './ResourceConnection.less';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';

@connect()
export default class ResourceConnection extends Component {
  // goToDetail = row => {
  //   this.props.dispatch(
  //     routerRedux.push({
  //       pathname: `/dataSourceManagement/fileSourceDetail/${row.id}`,
  //       state: row,
  //     })
  //   );
  // };
  state = {
    resourceVisible: false,
    resourceFileVisible: false,
    confirmLoading: false,
    confirmFileLoading: false,
  };

  openModalName = () => {
    this.setState({
      resourceVisible: true,
    });
  };

  openModalFile = () => {
    this.setState({
      resourceFileVisible: true,
    });
  };

  handleNameOk = () => {
    this.setState({
      confirmLoading: true,
    });
    setTimeout(() => {
      this.setState({
        resourceVisible: false,
        confirmLoading: false,
      });
    }, 2000);
  };

  handleNameCancel = () => {
    this.setState({
      resourceVisible: false,
    });
  };

  handleFileOk = () => {
    this.setState({
      confirmFileLoading: true,
    });
    setTimeout(() => {
      this.setState({
        resourceFileVisible: false,
        confirmFileLoading: false,
      });
    }, 2000);
  };

  handleFileCancel = () => {
    this.setState({
      resourceFileVisible: false,
    });
  };

  render() {
    const { resourceVisible, resourceFileVisible, confirmLoading, confirmFileLoading } = this.state;
    const pagination = { pageSize: 10, current: 1 };
    const columns = [
      {
        title: '序号',
        dataIndex: 'id',
      },
      {
        title: '文件名称',
        dataIndex: 'fileName',
      },
      {
        title: '类型',
        dataIndex: 'types',
      },
      {
        title: '文件大小',
        dataIndex: 'fileSize',
      },
      {
        title: '挂接时间',
        dataIndex: 'connectionTime',
        render(text) {
          return moment(text).format('lll');
        },
      },
      {
        title: '操作',
        render() {
          return <a>删除</a>;
        },
      },
    ];
    columns.forEach(item => {
      item.align = 'center';
    });
    const list = [
      {
        id: 0,
        fileName: '城市低保标准表(各市第1季度).xlsx',
        types: 'Zip',
        fileSize: '1.38MB',
        connectionTime: 342323333,
      },
      {
        id: 1,
        fileName: '农村低保标准表(各地第1季度).json',
        types: 'json',
        fileSize: '0.12MB',
        connectionTime: 3423233,
      },
      {
        id: 2,
        fileName: '人口普查数据.xml',
        types: 'jpeg',
        fileSize: '1.56MB',
        connectionTime: 34223233,
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
              <span className={styles.linkBtn} onClick={this.openModalName}>
                去选择
              </span>
            </Col>
          </Row>
          <Row style={{ marginBottom: 20 }}>
            <Col span={4}>
              <h3>挂接资源文件:</h3>
            </Col>
            <Col span={18}>
              <span className={styles.linkBtn} onClick={this.openModalFile}>
                去选择
              </span>
            </Col>
          </Row>
          <div>
            <Table
              columns={columns}
              dataSource={list}
              pagination={pagination}
              rowKey="id"
              bordered
            />
          </div>
          <Modal
            title="选择要挂接的资源"
            visible={resourceVisible}
            confirmLoading={confirmLoading}
            onOK={this.handleNameOk}
            onCancel={this.handleNameCancel}
          >
            123
          </Modal>
          <Modal
            title="选择要挂接的资源文件"
            visible={resourceFileVisible}
            confirmLoading={confirmFileLoading}
            onOK={this.handleFileOk}
            onCancel={this.handleFileCancel}
          >
            789
          </Modal>
        </Card>
      </PageHeaderLayout>
    );
  }
}
