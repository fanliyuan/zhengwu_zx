import React, { Component } from 'react';
import { Table, Button, Input, Select, Card, DatePicker, Checkbox, Modal, Radio } from 'antd';
import moment from 'moment';
import { connect } from 'dva';
import { Link, routerRedux } from 'dva/router';

import styles from './CatalogAudit.less';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';

const { Option } = Select;
const { RangePicker } = DatePicker;
const RadioGroup = Radio.Group;
const { TextArea } = Input;
@connect(({ catalogAudit }) => ({
  catalogAudit,
}))
export default class CatalogAudit extends Component {
  state = {
    provider: '0',
    status: '0',
    visible: false,
    isPass: 1,
  };

  providerChange = val => {
    this.setState({
      provider: val,
    });
  };

  statusChange = val => {
    this.setState({
      status: val,
    });
  };

  showModal = () => {
    this.setState({
      visible: true,
    });
  };

  handleOk = () => {
    this.setState({
      visible: false,
    });
  };

  handleCancel = () => {
    this.setState({
      visible: false,
    });
  };

  handlePass = e => {
    this.setState({
      isPass: e.target.value,
    });
  };

  handleView = () => {
    const { dispatch } = this.props;
    dispatch(routerRedux.push('/dataSourceManagement/viewDirectory'));
  };

  render() {
    const that = this;
    const { provider, status, isPass, visible } = this.state;
    const data = [{ value: '0', id: 0, label: '提供方' }, { value: '1', id: 1, label: '提供方1' }];
    const selectData = data.map(item => {
      return (
        <Option value={item.value} key={item.id} title={item.label}>
          {item.label}
        </Option>
      );
    });
    const data1 = [
      { value: '0', id: 0, label: '审核状态' },
      { value: '1', id: 1, label: '审核状态1' },
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
        title: '目录编码',
        dataIndex: 'catalogEncoding',
      },
      {
        title: '名称',
        dataIndex: 'name',
      },
      {
        title: '提供方',
        dataIndex: 'provider',
      },
      {
        title: '注册时间',
        dataIndex: 'createTime',
        render(text) {
          return moment(text).format('YYYY-MM-DD HH:mm:ss');
        },
      },
      {
        title: '是否挂载资源',
        dataIndex: 'isMouontSource',
        render(text) {
          return +text === 0 ? '否' : '是';
        },
      },
      {
        title: '信息项',
        dataIndex: 'information',
        render(text) {
          return +text === 0 ? '否' : '是';
        },
      },
      {
        title: '审核状态',
        dataIndex: 'status',
        render(text) {
          return +text === 0 ? '待审核' : '已通过';
        },
      },
      {
        title: '操作',
        render(text, row) {
          if (row.status === '0') {
            return (
              <div>
                {/* <a style={{marginRight:10}}>信息项</a>
                    <a style={{marginRight:10}}>相关资源</a> */}
                <span className={styles.auditBtn} onClick={that.handleView}>
                  查看
                </span>
                <span className={styles.auditBtn} onClick={that.showModal}>
                  审核
                </span>
              </div>
            );
          } else {
            return (
              <div>
                <span className={styles.auditBtn} onClick={that.handleView}>
                  查看
                </span>
                <Link to={`/dataSourceManagement/auditLog/${row.id}`} className="mr8">
                  审核日志
                </Link>
              </div>
            );
          }
        },
      },
    ];
    columns.forEach(item => {
      item.align = 'center';
    });
    const list = [
      {
        id: 0,
        catalogEncoding: '330003130681126/0001',
        name: '花名册信息',
        provider: '规划局',
        createTime: 344344242,
        isMouontSource: 0,
        isOpen: 1,
        information: 14,
        status: '0',
      },
      {
        id: 1,
        catalogEncoding: '330003130681126/0002',
        name: '资产负债表信息',
        provider: '规划局',
        createTime: 344344242,
        isMouontSource: 1,
        isOpen: 0,
        information: 6,
        status: '1',
      },
      {
        id: 2,
        catalogEncoding: '330003130681126/0003',
        name: '资产总值表',
        provider: '规划局',
        createTime: 344344242,
        isMouontSource: 0,
        isOpen: 0,
        information: 2,
        status: '2',
      },
    ];
    const rowSelection = {
      // onChange: selectedRows => {
      // },
      // getCheckboxProps: record => ({
      //   disabled: record.name === 'Disabled User',
      //   name: record.name,
      // }),
    };
    return (
      <PageHeaderLayout>
        <Card>
          <div className={styles.form}>
            <Input placeholder="目录编码" style={{ width: 150, marginRight: 20 }} />
            <Input placeholder="名称" style={{ width: 150, marginRight: 20 }} />
            <Select
              style={{ marginRight: 20, width: 120 }}
              value={provider}
              onChange={this.providerChange}
            >
              {selectData}
            </Select>
            <RangePicker style={{ marginRight: 20, width: 250 }} />
            <Select
              style={{ marginRight: 20, width: 120 }}
              value={status}
              onChange={this.statusChange}
            >
              {selectData1}
            </Select>
            <Checkbox style={{ marginRight: 10 }}>已挂接资源</Checkbox>
            <Button type="primary">搜索</Button>
          </div>
          <div>
            <Table
              columns={columns}
              dataSource={list}
              pagination={pagination}
              rowKey="id"
              rowSelection={rowSelection}
              bordered
            />
          </div>
          <div>
            <Button type="primary">删除</Button>
          </div>
          <Modal title="审核" visible={visible} onOk={this.handleOk} onCancel={this.handleCancel}>
            <div className={styles.modals}>
              <div>
                <RadioGroup value={isPass} onChange={this.handlePass}>
                  <Radio value={1}>通过</Radio>
                  <Radio value={2}>拒绝</Radio>
                </RadioGroup>
              </div>
              <div style={{ display: +isPass === 1 ? 'block' : 'none' }}>
                您是否确定通过此次审核?
              </div>
              <div style={{ display: +isPass === 2 ? 'block' : 'none' }}>
                <div style={{ marginBottom: '10px' }}>请输入拒绝理由</div>
                <TextArea row={5} />
              </div>
            </div>
          </Modal>
        </Card>
      </PageHeaderLayout>
    );
  }
}
