/*
 * @Author: ChouEric
 * @Date: 2018-07-03 16:54:02
 * @Last Modified by: ChouEric
 * @Last Modified time: 2018-07-23 23:25:06
 * @描述: 监控告警 -- 节点系统监控  -- 系统告警 和 -- 系统告警设置

*/
import React, { Component } from 'react';
import { Link } from 'dva/router';
import { Tabs, Table, Input, Select, Cascader, Button, DatePicker, Form, message } from 'antd';
import moment from 'moment';

import PageHeaderLayout from '../../layouts/PageHeaderLayout';
import styles from './Node.less';

export default class Node extends Component {
  state = {
    query1: {
      warningName: '',
      warningTime: [],
    },
    query2: {
      dataOriginName: '',
      serverAddress: '',
      organization: [],
      state: -1,
    },
    isChanged1: false,
    isChanged2: false,
    defaultActiveKey: 'system',
  };

  componentWillMount = () => {
    this.setState({
      defaultActiveKey: this.props.location.state || 'system',
    });
  };

  warningNameChange = e => {
    const { query1 } = this.state;
    this.setState({
      query1: {
        ...query1,
        warningName: e.target.value,
      },
      isChanged1: true,
    });
  };

  warningTimeChange = value => {
    const { query1 } = this.state;
    this.setState({
      query1: {
        ...query1,
        warningTime: value,
      },
      isChanged1: true,
    });
  };

  search = () => {
    if (!this.state.isChanged1) return false;
    message.success('this.state.query1');
  };

  dataOriginNameChange = e => {
    const { query2 } = this.state;
    this.setState({
      query2: {
        ...query2,
        dataOriginName: e.target.value,
      },
      isChanged2: true,
    });
  };

  serverAddressChagne = e => {
    const { query2 } = this.state;
    this.setState({
      query2: {
        ...query2,
        serverAddress: e.target.value,
      },
      isChanged2: true,
    });
  };

  organizationChange = value => {
    const { query2 } = this.state;
    this.setState({
      query2: {
        ...query2,
        organization: value,
      },
      isChanged2: true,
    });
  };

  stateChange = value => {
    const { query2 } = this.state;
    this.setState({
      query2: {
        ...query2,
        state: value,
      },
      isChanged2: true,
    });
  };

  searchOption = () => {
    if (!this.state.isChanged2) {
      return false;
    }
    message.success('this.state.query2');
  };

  render() {
    const {
      query1: { warningName, warningTime },
      query2: { dataOriginName, serverAddress, organization, state },
      defaultActiveKey,
    } = this.state;

    const stateList = [
      {
        value: -1,
        lable: '全部状态',
      },
      {
        value: 0,
        lable: '连接正常',
      },
      {
        value: 1,
        lable: '连接失败',
      },
    ];
    const organizationList = [
      {
        value: 101,
        label: '省直属',
        children: [
          {
            value: 101001,
            label: '省公安厅',
          },
          {
            value: 101002,
            label: '省设计院',
          },
        ],
      },
      {
        value: 102,
        label: '广州市',
        children: [
          {
            value: 102001,
            label: '市公安局',
          },
          {
            value: 102002,
            label: '市财政局',
          },
          {
            value: 102003,
            label: '市交通局',
          },
        ],
      },
    ];
    const columnsWarning = [
      {
        title: '告警时间',
        dataIndex: 'time',
      },
      {
        title: '告警名称',
        dataIndex: 'name',
      },
      {
        title: '当前值',
        dataIndex: 'value',
      },
    ];
    columnsWarning.forEach(item => {
      item.align = 'center';
    });
    const dataWarning = [];
    const usageType = ['CPU利用率', '内存利用率', '硬盘利用率', '网络利用率'];
    for (let i = 0; i < 145; i++) {
      dataWarning.push({
        id: i,
        time: moment(new Date() - 1000 * 60 * 60 * 15 * i, 'x').format('lll'),
        name: usageType[Math.floor(Math.random() * 4)],
        value: Math.floor(Math.random() * 30 + 40),
      });
    }
    const columnsOption = [
      {
        title: '告警名称',
        dataIndex: 'name',
      },
      {
        title: '监控对象',
        dataIndex: 'target',
      },
      {
        title: '告警阈值',
        dataIndex: 'threshold',
      },
      {
        title: '检测周期',
        dataIndex: 'period',
      },
      {
        title: '是否有效',
        dataIndex: 'boolean',
      },
      {
        title: '操作',
        dataIndex: 'operation',
        render: (text, row) => {
          return <Link to={`/monitor/editOption/${row.id}`}>修改</Link>;
        },
      },
    ];
    columnsOption.forEach(item => {
      item.align = 'center';
    });
    const dataOption = [];
    for (let i = 0; i < 178; i++) {
      dataOption.push({
        id: i,
        name: usageType[Math.floor(Math.random() * 4)] + i,
        target: usageType[Math.floor(Math.random() * 4)].replace('利用率', ''),
        threshold: Math.floor(Math.random() * 60 + 40),
        period: '5分钟',
        boolean: Math.round(Math.random()) === 1 ? '有效' : '无效',
      });
    }

    const stateComs = stateList.map(item => {
      return (
        <Select.Option value={item.value} key={item.value}>
          {item.lable}
        </Select.Option>
      );
    });

    return (
      <PageHeaderLayout>
        <Tabs defaultActiveKey={defaultActiveKey}>
          <Tabs.TabPane tab="系统监控" key="system">
            系统监控页
          </Tabs.TabPane>
          <Tabs.TabPane tab="系统告警" key="warning">
            <div className={styles.layout}>
              <Form className={styles.search}>
                <Input
                  value={warningName}
                  onChange={this.warningNameChange}
                  className={styles.input}
                />
                <DatePicker.RangePicker
                  value={warningTime}
                  onChange={this.warningTimeChange}
                  className={styles.date}
                />
                <Button type="primary" icon="search" onClick={this.search}>
                  搜索
                </Button>
              </Form>
              <Table columns={columnsWarning} dataSource={dataWarning} bordered rowKey="id" />
            </div>
          </Tabs.TabPane>
          <Tabs.TabPane tab="系统告警设置" key="option">
            <div className={styles.layout}>
              <Form className={styles.search}>
                <Input
                  value={dataOriginName}
                  onChange={this.dataOriginNameChange}
                  className={styles.input}
                />
                <Input
                  value={serverAddress}
                  onChange={this.serverAddressChagne}
                  className={styles.input}
                />
                <Cascader
                  options={organizationList}
                  value={organization}
                  onChange={this.organizationChange}
                  placeholder="请选择机构"
                  className={styles.select}
                />
                <Select value={state} onChange={this.stateChange} className={styles.select}>
                  {stateComs}
                </Select>
                <Button type="primary" icon="search" onClick={this.searchOption}>
                  搜索
                </Button>
              </Form>
              <Table columns={columnsOption} dataSource={dataOption} bordered rowKey="id" />
            </div>
          </Tabs.TabPane>
        </Tabs>
      </PageHeaderLayout>
    );
  }
}
