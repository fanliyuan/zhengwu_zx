import React, { Component } from 'react';
import { Card, Tabs, Table, Button } from 'antd';
import moment from 'moment';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';

import PageHeaderLayout from '../../layouts/PageHeaderLayout';
import styles from './Task.less';

const { TabPane } = Tabs;
@connect(({ task }) => ({
  task,
}))
export default class Task extends Component {
  state = {};

  handleBack = () => {
    const { dispatch } = this.props;
    dispatch(routerRedux.push('/dataSourceManagement/sourceManagement'));
  };

  render() {
    const pagination = {
      pageSize: 10,
      current: 1,
    };
    const columns = [
      {
        title: 'ID',
        dataIndex: 'id',
        align: 'center',
      },
      {
        title: '操作',
        dataIndex: 'operation',
        align: 'center',
        render(text) {
          return +text === 0 ? '启动' : '停止';
        },
      },
      {
        title: '操作方式',
        dataIndex: 'operationStyle',
        align: 'center',
        render(text) {
          return +text === 0 ? '自动' : +text === 1 ? '手动' : '实时';
        },
      },
      {
        title: '登录结果',
        dataIndex: 'result',
        align: 'center',
        render(text) {
          return +text === 0 ? '启动成功' : '停止成功';
        },
      },
      {
        title: '时间',
        dataIndex: 'times',
        align: 'center',
        render(text) {
          return moment(text).format('lll');
        },
      },
    ];
    const columns1 = [
      {
        title: 'ID',
        dataIndex: 'id',
        align: 'center',
      },
      {
        title: '传输记录数',
        dataIndex: 'recordNum',
        align: 'center',
      },
      {
        title: '传输大小(MB)',
        dataIndex: 'transfer',
        align: 'center',
      },
      {
        title: '新增记录数',
        dataIndex: 'addRecord',
        align: 'center',
      },
      {
        title: '更新记录数',
        dataIndex: 'uploadRecord',
        align: 'center',
      },
      {
        title: '删除记录数',
        dataIndex: 'deleteRecord',
        align: 'center',
      },
      {
        title: '新增转更新数',
        dataIndex: 'addToUpload',
        align: 'center',
      },
      {
        title: '更新转新增数',
        dataIndex: 'uploadToAdd',
        align: 'center',
      },
      {
        title: '忽略记录数',
        dataIndex: 'ignoreRecord',
        align: 'center',
      },
      {
        title: '错误记录数',
        dataIndex: 'errRecord',
        align: 'center',
      },
      {
        title: '时间',
        dataIndex: 'times',
        align: 'center',
        render(text) {
          return moment(text).format('lll');
        },
      },
    ];
    const data = [
      {
        id: 0,
        operation: 0,
        operationStyle: 0,
        result: 1,
        times: 43333922,
      },
      {
        id: 1,
        operation: 1,
        operationStyle: 2,
        result: 0,
        times: 43333922,
      },
    ];
    const data1 = [
      {
        id: 0,
        recordNum: 23,
        transfer: 21,
        addRecord: 1,
        uploadRecord: 21,
        deleteRecord: 3,
        addToUpload: 23,
        uploadToAdd: 4,
        ignoreRecord: 5,
        errRecord: 6,
        tiems: 34343433,
      },
      {
        id: 1,
        recordNum: 8,
        transfer: 9,
        addRecord: 5,
        uploadRecord: 7,
        deleteRecord: 1,
        addToUpload: 40,
        uploadToAdd: 9,
        ignoreRecord: 9,
        errRecord: 5,
        tiems: 34343433,
      },
    ];
    return (
      <PageHeaderLayout>
        <Card>
          <div style={{ textAlign: 'right' }}>
            <Button type="primary" onClick={this.handleBack}>
              返回
            </Button>
          </div>
          <p className={styles.titleName}>
            &nbsp;数据库: &nbsp;<span>Youedata_dig</span>
            &nbsp;&nbsp;数据类型: &nbsp;<span>Mysql</span>
            &nbsp;&nbsp;资源名称: &nbsp;<span>城市低保标准表</span>
            &nbsp;&nbsp;所属机构: &nbsp;<span>石家庄市民政局</span>
            &nbsp;&nbsp;数据更新时间: &nbsp;<span>2018-06-20 15:08:08</span>
          </p>
          <div className={styles.contentInfo}>
            <Tabs defaultActiveKey="1">
              <TabPane tab="基本信息" key="1">
                <ul>
                  <li>
                    <span>同步模式:</span> 增量-日志
                  </li>
                  <li>
                    <span>同步频率:</span> 定时-每日 00:15:00
                  </li>
                  <li>
                    <span>任务状态:</span> 运行中
                  </li>
                  <li>
                    <span>注册时间:</span> 2018-06-20 00:20:00
                  </li>
                  <li>
                    <span>最近同步时间:</span>2018-06-08 10:11:10
                  </li>
                  <li>
                    <span>数据库文件大小:</span>102.34MB
                  </li>
                  <li>
                    <span>数据资源:</span> <a href="">查看</a>
                  </li>
                </ul>
              </TabPane>
              <TabPane tab="运行日志" key="2">
                <Table
                  bordered
                  columns={columns}
                  dataSource={data}
                  pagination={pagination}
                  // loading={loading}
                  rowKey="id"
                />
              </TabPane>
              <TabPane tab="同步日志" key="3">
                <Table
                  bordered
                  columns={columns1}
                  dataSource={data1}
                  pagination={pagination}
                  // loading={loading}
                  rowKey="id"
                />
              </TabPane>
            </Tabs>
          </div>
        </Card>
      </PageHeaderLayout>
    );
  }
}
