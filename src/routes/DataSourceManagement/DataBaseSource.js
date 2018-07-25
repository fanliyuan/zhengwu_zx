/*
 * @Author: 樊丽园
 * @Date: 2018-07-19 17:59:46
 * @Last Modified by: ChouEric
 * @Last Modified time: 2018-07-25 16:31:37
 * @Description: 添加 文本换行省略号组件并和tooltip兼容,可以设置截取后缀,以及链接; 组件地址: https://github.com/ShinyChang/React-Text-Truncate
 */
import React, { Component } from 'react';
import { Card, Row, Col, Button, Divider, Table, Tooltip } from 'antd';
import moment from 'moment';
import TextTruncate from 'react-text-truncate';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';

import styles from './DataBaseSource.less';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';

@connect(({ dataBaseSource }) => ({
  dataBaseSource,
}))
export default class DataBaseSource extends Component {
  state = {
    view: false,
    agency: true,
  };

  handleBack = () => {
    const { dispatch } = this.props;
    dispatch(routerRedux.push('/dataSourceManagement/sourceManagement'));
  };

  handleView = () => {
    this.setState({
      view: true,
      agency: false,
    });
  };

  handleAgency = () => {
    this.setState({
      view: false,
      agency: true,
    });
  };

  render() {
    const { view, agency } = this.state;
    const that = this;
    const pagination = {
      current: 1,
      pageSize: 10,
    };
    const rowSelection = {
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
        title: '中文标注',
        dataIndex: 'chineseLabel',
      },
      {
        title: '操作',
        render() {
          return (
            <div>
              <span
                className={styles.clickBtn}
                onClick={that.handleView}
                style={view ? { cursor: 'default', color: 'silver' } : {}}
              >
                浏览
              </span>
              <span
                className={styles.clickBtn}
                onClick={that.handleAgency}
                style={agency ? { cursor: 'default', color: 'silver' } : {}}
              >
                结构
              </span>
            </div>
          );
        },
      },
    ];
    const list = [
      {
        id: 0,
        tableName: 'dig_user',
        chineseLabel: '用户表',
      },
      {
        id: 1,
        tableName: 'dig_order',
        chineseLabel: '订单表',
      },
    ];
    const columns1 = [
      {
        title: '序号',
        dataIndex: 'id',
      },
      {
        title: 'blog_id',
        dataIndex: 'blog_id',
      },
      {
        title: 'public',
        dataIndex: 'public',
      },
      {
        title: 'last_updated',
        dataIndex: 'last_updated',
        render(text) {
          return moment(text).format('lll');
        },
      },
      {
        title: 'post_title',
        dataIndex: 'post_title',
      },
      {
        title: 'post_content',
        dataIndex: 'post_content',
        render(text) {
          return (
            <Tooltip title={text}>
              <TextTruncate
                line={1}
                truncateText="..."
                textTruncateChild={<a href="#">read more</a>}
                text={text}
              />
            </Tooltip>
          );
        },
        width: 250,
      },
    ];
    const list1 = [
      {
        id: 0,
        blog_id: 1,
        public: 1,
        last_updated: 21111277,
        post_title: 'Hello World!',
        post_content:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean euismod bibendum laoreet. Proin gravidaLorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean euismod bibendum laoreet. Proin gravidaLorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean euismod bibendum laoreet. Proin gravidaLorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean euismod bibendum laoreet. Proin gravidaLorem ipsum dolor sit amet, consectetur adipiscing elit.',
      },
      {
        id: 1,
        blog_id: 2,
        public: 2,
        last_updated: 21111277,
        post_title: 'Hello World!',
        post_content:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean euismod bibendum laoreet. Proin gravida…',
      },
      {
        id: 2,
        blog_id: 2,
        public: 2,
        last_updated: 21111277,
        post_title: 'Hello World!',
        post_content:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean euismod bibendum laoreet. Proin gravida…',
      },
    ];
    const columns2 = [
      {
        title: '序号',
        dataIndex: 'id',
      },
      {
        title: '主键',
        dataIndex: 'blog_id',
      },
      {
        title: '字段名称',
        dataIndex: 'fieldName',
      },
      {
        title: '数据类型',
        dataIndex: 'dataType',
      },
      {
        title: '中文标注',
        dataIndex: 'chineseLabel',
      },
    ];
    const list2 = [
      {
        id: 0,
        blog_id: '',
        fieldName: 'blog_id',
        dataType: 'bigint(20)',
        chineseLabel: '',
      },
      {
        id: 1,
        blog_id: '',
        fieldName: 'public',
        dataType: 'tinyint(2)',
        chineseLabel: '',
      },
      {
        id: 2,
        blog_id: '',
        fieldName: 'last_updated',
        dataType: 'datetime',
        chineseLabel: '',
      },
    ];
    return (
      <PageHeaderLayout>
        <div className="btncls clearfix">
          <Button onClick={this.handleBack} className="fr mr40">
            返回
          </Button>
        </div>
        <Card>
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
          <Divider />
          <Row>
            <Col span={24}>
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
            {view && (
              <Col span={24}>
                <h3>
                  数据 共<span>32</span>行
                </h3>
                <Table
                  columns={columns1}
                  dataSource={list1}
                  pagination={pagination}
                  rowSelection={rowSelection}
                  rowKey="id"
                  bordered
                />
              </Col>
            )}
            {agency && (
              <Col span={24}>
                <h3>
                  数据项 共<span>6</span>行
                </h3>
                <Table
                  columns={columns2}
                  dataSource={list2}
                  pagination={pagination}
                  rowSelection={rowSelection}
                  rowKey="id"
                  bordered
                />
              </Col>
            )}
          </Row>
        </Card>
      </PageHeaderLayout>
    );
  }
}
