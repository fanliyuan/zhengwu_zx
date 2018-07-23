/*
 * @Author: ChouEric
 * @Date: 2018-07-04 14:05:19
 * @Last Modified by: ChouEric
 * @Last Modified time: 2018-07-23 16:27:35
*/
import React, { Component } from 'react';
import { Link } from 'dva/router';
import { Form, Input, Select, Cascader, Button, Table } from 'antd';

import PageHeaderLayout from '../../layouts/PageHeaderLayout';
import styles from './WarningOption.less';

const data = [];
for (let i = 0; i < 120; i++) {
  const random = Math.round(Math.random());
  data.push({
    id: i,
    name: `告警名称${i}`,
    method: random === 1 ? '邮件' : '短信',
    target: random === 1 ? 'qq.@qq.com' : '13512345678',
    node: `节点${i}`,
    IP: `192.168${255 - i}.${i}`,
    state: i % 3 === 0 ? '已停止' : '运行中',
  });
}

export default class WarningOption extends Component {
  state = {
    query: {
      name: '',
      target: '',
      method: -1,
      node: [],
      state: -1,
    },
    isChanged: false,
  };

  nameChange = e => {
    const { query } = this.state;
    this.setState({
      query: {
        ...query,
        name: e.target.value,
      },
      isChanged: true,
    });
  };

  targetChange = e => {
    const { query } = this.state;
    this.setState({
      query: {
        ...query,
        target: e.target.value,
      },
      isChanged: true,
    });
  };

  methodChange = value => {
    const { query } = this.state;
    this.setState({
      query: {
        ...query,
        method: value,
      },
      isChanged: true,
    });
  };

  nodeChange = value => {
    const { query } = this.state;
    this.setState({
      query: {
        ...query,
        node: value,
      },
      isChanged: true,
    });
  };

  stateChange = value => {
    const { query } = this.state;
    this.setState({
      query: {
        ...query,
        state: value,
      },
      isChanged: true,
    });
  };

  search = () => {
    if (!this.state.isChanged) return false;
  };

  render() {
    const {
      query: { name, target, method, node, state },
    } = this.state;
    const nodeList = [
      {
        value: -1,
        label: '所有节点',
      },
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
            label: '省检察院',
          },
        ],
      },
      {
        value: 102,
        label: '青岛市',
        children: [
          {
            value: 102001,
            label: '市公安局',
          },
          {
            value: 102002,
            label: '市财政局',
          },
        ],
      },
    ];
    const methodList = [
      { value: -1, label: '全部方式' },
      { value: 0, label: '短信告警' },
      { value: 1, label: '邮件告警' },
    ];
    const stateList = [
      { value: -1, label: '全部状态' },
      { value: 0, label: '运行中' },
      { value: 1, label: '已停止' },
    ];

    const columns = [
      {
        title: '序号',
        dataIndex: 'id',
      },
      {
        title: '告警名称',
        dataIndex: 'name',
      },
      {
        title: '告警方式',
        dataIndex: 'method',
      },
      {
        title: '告警目标',
        dataIndex: 'target',
      },
      {
        title: '监控节点',
        dataIndex: 'node',
      },
      {
        title: '监控节点IP',
        dataIndex: 'IP',
      },
      {
        title: '状态',
        dataIndex: 'state',
      },
      {
        title: '操作',
        dataIndex: 'operation',
        render: (text, row) => {
          return <Link to={`/monitor/editWarningOption/${row.id}`}>修改</Link>;
        },
      },
    ];
    columns.forEach(item => {
      item.align = 'center';
    });

    const methodComs = methodList.map(item => {
      return (
        <Select.Option value={item.value} key={item.value}>
          {item.label}
        </Select.Option>
      );
    });
    const stateComs = stateList.map(item => {
      return (
        <Select.Option value={item.value} key={item.value}>
          {item.label}
        </Select.Option>
      );
    });

    return (
      <PageHeaderLayout>
        <div className={styles.layout}>
          <Form className={styles.search}>
            <Input
              value={name}
              onChange={this.nameChange}
              className={styles.input}
              placeholder="告警名称"
            />
            <Input
              value={target}
              onChange={this.targetChange}
              className={styles.input}
              placeholder="告警目标"
            />
            <Select value={method} onChange={this.methodChange} className={styles.select}>
              {methodComs}
            </Select>
            <Cascader
              options={nodeList}
              value={node}
              onChange={this.nodeChange}
              className={styles.cascader}
              placeholder="请选择告警节点"
            />
            <Select value={state} onChange={this.stateChange} className={styles.select}>
              {stateComs}
            </Select>
            <Button type="primary" icon="search" onClick={this.search}>
              搜索
            </Button>
          </Form>
          <div className="mt8 mb8">
            <Link to="/monitor/addWarningOption">
              <Button type="primary">新增</Button>
            </Link>
          </div>
          <Table columns={columns} dataSource={data} rowKey="id" bordered />
        </div>
      </PageHeaderLayout>
    );
  }
}
