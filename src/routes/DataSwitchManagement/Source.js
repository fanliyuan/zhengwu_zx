/*
 * @Author: 樊丽园
 * @Date: 2018-07-19 17:59:46
 * @Last Modified by: ChouEric
 * @Last Modified time: 2018-07-20 09:22:19
 * @Description: 添加 文本换行省略号组件并和tooltip兼容,可以设置截取后缀,以及链接 https://github.com/ShinyChang/React-Text-Truncate
 */
import React, { Component } from 'react';
import { Card, Row, Col, Button, Divider, Table, Tooltip } from 'antd';
import moment from 'moment';
import TextTruncate from 'react-text-truncate';

// import styles from './Source.less';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';

export default class Source extends Component {
  render() {
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
          <Divider />
          <Row>
            <Col span={8}>
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
            <Col span={15} offset={1}>
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
          </Row>
        </Card>
      </PageHeaderLayout>
    );
  }
}
