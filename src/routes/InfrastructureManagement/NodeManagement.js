/*
 * @Author: ChouEric
 * @Date: 2018-07-02 14:27:19
 * @Last Modified by: ChouEric
 * @Last Modified time: 2018-07-12 16:48:14
*/
import React, { Component } from 'react';
import { connect } from 'dva';
import { Link } from 'dva/router';
import { Form, Input, Select, Button, Table, Cascader, Badge, Popconfirm, message } from 'antd';

import styles from './NodeManagement.less';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';

@connect(({ infrastructureManagementNode, loading }) => ({
  infrastructureManagementNode,
  loading: loading.models.infrastructureManagementNode,
}))
export default class NodeManagement extends Component {
  state = {
    query: {
      node: '',
      ip: '',
      parentNode: [],
      organization: [],
      state: -1,
    },
    pagination: {
      total: 0,
      current: 1,
      pageSize: 10,
    },
    isChanged: false,
  };

  componentWillMount() {
    const { query, pagination } = this.state;
    const { dispatch } = this.props;
    dispatch({
      type: 'infrastructureManagementNode/query',
      payload: {
        query,
        pagination,
      },
    });
  }

  handleNodeChange = e => {
    const { query } = this.state;
    this.setState({
      query: {
        ...query,
        node: e.target.value,
      },
      isChanged: true,
    });
  };

  handleNodeSelectChange = val => {
    const { query } = this.state;
    this.setState({
      query: {
        ...query,
        parentNode: val,
      },
      isChanged: true,
    });
  };

  handleOrganizationChange = val => {
    const { query } = this.state;
    this.setState({
      query: {
        ...query,
        organization: val,
      },
      isChanged: true,
    });
  };

  handleStateChange = val => {
    const { query } = this.state;
    this.setState({
      query: {
        ...query,
        state: val,
      },
      isChanged: true,
    });
  };

  handleSearch = () => {
    const { query, pagination, isChanged } = this.state;
    if (!isChanged) {
      return false;
    }
    const { dispatch } = this.props;
    dispatch({
      type: 'infrastructureManagementNode/query',
      payload: {
        query,
        pagination,
      },
    });
    this.setState({
      isChanged: false,
    });
  };

  handleTableChange = pagination => {
    this.props.dispatch({
      type: 'infrastructureManagementNode/query',
      payload: {
        query: this.state.query,
        pagination,
      },
    });
  };

  handleDelete = (row) => {
    this.props.dispatch({
      type: 'infrastructureManagementNode/delete',
      payload: {
        row,
      },
    })
  }

  handleCancel = () => {
    message.info('删除取消')
  }

  render() {
    const {
      infrastructureManagementNode: { list, pagination, nodeList, organizationList, stateList },
      loading,
    } = this.props;
    const columns = [
      {
        title: 'ID',
        dataIndex: 'id',
      },
      {
        title: '节点名称',
        dataIndex: 'name',
      },
      {
        title: '上级节点',
        dataIndex: 'parentNode',
      },
      {
        title: 'IP地址',
        dataIndex: 'ip',
      },
      {
        title: '所属机构',
        dataIndex: 'organization',
      },
      {
        title: '状态',
        dataIndex: 'state',
        render(text) {
          const Com =
            text === '运行中' ? (
              <Badge status="success" text="运行中" />
            ) : (
              <Badge status="default" text="已停止" />
            );
          return Com;
        },
      },
      {
        title: '操作',
        dataIndex: 'operation',
        render: (text, row) => {
          return (
            <div>
              <Link to={`#${row.id}`} style={{ marginRight: 10 }}>
                修改
              </Link>
              <Popconfirm title='确认删除?' onConfirm={() => this.handleDelete(row)} onCancel={this.handleCancel} okText='确定' cancelText='取消' >
                <Link to={`#${row.id}`} style={{ marginRight: 10 }}>删除</Link>
              </Popconfirm>
              <Link to={`#${row.id}`} style={{ marginRight: 10 }}>
                监控
              </Link>
              <Link to={`#${row.id}`} style={{ marginRight: 10 }}>
                统计
              </Link>
              <Link to={`#${row.id}`} style={{ marginRight: 10 }}>
                任务
              </Link>
            </div>
          );
        },
      },
    ];
    columns.forEach(item => {
      item.align = 'center';
    });
    const stateComs = stateList.map(item => {
      return (
        <Select.Option value={item.value} key={item.value} title={item.label}>
          {item.label}
        </Select.Option>
      );
    });
    return (
      <PageHeaderLayout>
        <div className={styles.layout}>
          <Form style={{ marginBottom: 20 }}>
            <Input
              onChange={this.handleNodeChange}
              onPressEnter={this.handleSearch}
              className={styles.node}
              placeholder="请输入节点名"
            />
            <Input
              onChange={this.handleIPChange}
              onPressEnter={this.handleSearch}
              className={styles.ip}
              placeholder="请输入IP地址"
            />
            <Cascader
              options={nodeList}
              value={this.state.query.parentNode}
              onChange={this.handleNodeSelectChange}
              className={styles.parentNode}
              placeholder="请选择上级节点"
            />
            <Cascader
              options={organizationList}
              value={this.state.query.organization}
              onChange={this.handleOrganizationChange}
              className={styles.organization}
              placeholder="请选择所属机构"
            />
            <Select
              value={this.state.query.state}
              onChange={this.handleStateChange}
              className={styles.state}
            >
              {stateComs}
            </Select>
            <Button type="primary" icon="search" onClick={this.handleSearch}>
              搜索
            </Button>
          </Form>
          <Table
            columns={columns}
            dataSource={list}
            pagination={pagination}
            onChange={this.handleTableChange}
            loading={loading}
            rowKey='id'
            bordered
          />
        </div>
      </PageHeaderLayout>
    );
  }
}
