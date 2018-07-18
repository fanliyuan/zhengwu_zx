/*
 * @Author: ChouEric
 * @Date: 2018-07-03 11:27:26
 * @Last Modified by: ChouEric
 * @Last Modified time: 2018-07-18 17:41:29
 * @描述: 所有订阅
*/
import React, { Component, Fragment } from 'react';
// import { connect } from 'dva';
import { DatePicker, Input, Select, Button, Table, Tabs } from 'antd';
import moment from 'moment';

import PageHeaderLayout from '../../layouts/PageHeaderLayout';
import styles from './AllSub.less';

const { RangePicker } = DatePicker;
const { Option } = Select;
const { TabPane } = Tabs;

function getData1() {
  const data = [];
  for (let i = 0; i < 120; i++) {
    data.push({
      id: i,
      name: `订阅名${i}`,
      person: `订阅人${i}`,
      organization: `订阅机构${i}`,
      menuName: `目录名称${i}`,
      menuOrganization: `目录发布机构${i}`,
      state: i % 3 === 0 ? '运行中' : '已停止',
      time: moment(new Date() - 1000 * 60 * 60 * 5 * i, 'x').format('lll'),
      menu: `目录名${i}`,
    });
  }
  return data;
}
function getData2() {
  const data = [];
  for (let i = 0; i < 120; i++) {
    data.push({
      id: i,
      name: `订阅名${i}`,
      person: `订阅人${i}`,
      state: i % 3 === 0 ? '运行中' : '已停止',
      time: moment(new Date() - 1000 * 60 * 60 * 5 * i, 'x').format('lll'),
      menu: `目录名${i}`,
    });
  }
  return data;
}
function getData3() {
  const data = [];
  for (let i = 0; i < 120; i++) {
    data.push({
      id: i,
      name: `订阅名${i}`,
      person: `订阅人${i}`,
      organization: `订阅机构${i}`,
      menuName: `目录名称${i}`,
      munuOrganization: `目录发布机构${i}`,
      state: i % 3 === 0 ? '运行中' : '已停止',
      time: moment(new Date() - 1000 * 60 * 60 * 5 * i, 'x').format('lll'),
      menu: `目录名${i}`,
    });
  }
  return data;
}
const data1 = getData1();
const data2 = getData2();
const data3 = getData3();

// @connect(({ overviewLogging, loading }) => ({
//   overviewLogging,
//   loading: loading.models.overviewLogging,
// }))
export default class AllSub extends Component {
  state = {
    name: '',
    theme: '',
    state: -1,
    date: [],
    isChanged: false,
    selectKeys: [],
  };

  componentDidMount() {}

  handleNameChange = e => {
    this.setState({
      isChanged: true,
    });
    this.setState({
      name: e.target.value.trim(),
    });
  };

  handleThemeChange = e => {
    this.setState({
      isChanged: true,
    });
    this.setState({
      theme: e.target.value.trim(),
    });
  };

  handSelectChange = val => {
    this.setState({
      isChanged: true,
    });
    this.setState({
      state: val,
    });
  };

  handlePick = val => {
    this.setState({
      isChanged: true,
    });
    this.setState({
      date: val,
    });
  };

  handleSearch = () => {
    if (!this.state.isChanged) return; // eslint-disable-line
    this.setState({
      isChanged: false,
    });
  };

  handleStandardTableChange = pagination => {
    console.log(pagination); // eslint-disable-line
  };

  render() {
    const { name, date, state, theme, selectKeys, organization } = this.state;
    // const { overviewLogging: { data, pagination, stateList }, loading } = this.props

    const stateList = [
      {
        value: -1,
        label: '全部状态',
      },
      {
        value: 0,
        label: '运行中',
      },
      {
        value: 1,
        label: '已停止',
      },
    ];

    const columns = [
      {
        title: '序号',
        dataIndex: 'id',
      },
      {
        title: '订阅名称',
        dataIndex: 'name',
      },
      {
        title: '订阅申请人',
        dataIndex: 'person',
      },
      {
        title: '订阅时间',
        dataIndex: 'time',
      },
      {
        title: '目录名称',
        dataIndex: 'menu',
      },
      {
        title: '订阅机构',
        dataIndex: 'organization',
      },
      {
        title: '目录名称',
        dataIndex: 'menuName',
      },
      {
        title: '目录发布机构',
        dataIndex: 'menuOrganization',
      },
      {
        title: '运行状态',
        dataIndex: 'state',
      },
      {
        title: '操作',
        dataIndex: 'operation',
        render: (text, row) => {
          return row.state === '运行中' ? (
            <Fragment>
              <a>停止</a>
              <a>审核日志</a>
            </Fragment>
          ) : (
            <Fragment>
              <a>运行</a>
              <a>设置</a>
              <a>取消订阅</a>
              <a>审核日志</a>
            </Fragment>
          );
        },
      },
    ];
    const willAuditColumns = [
      {
        title: '序号',
        dataIndex: 'id',
      },
      {
        title: '订阅名称',
        dataIndex: 'name',
      },
      {
        title: '订阅申请人',
        dataIndex: 'operator',
      },
      {
        title: '订阅时间',
        dataIndex: 'time',
      },
      {
        title: '发布名称',
        dataIndex: 'publicationName',
      },
      {
        title: '所属主题',
        dataIndex: 'theme',
      },
      {
        title: '审批状态',
        dataIndex: 'state',
      },
      {
        title: '操作',
        dataIndex: 'operation',
        render: () => {
          return (
            <Fragment>
              <a>设置</a>
              <a>审核日志</a>
            </Fragment>
          );
        },
      },
    ];
    const failSubcribedColumns = [
      {
        title: '序号',
        dataIndex: 'id',
      },
      {
        title: '订阅名称',
        dataIndex: 'name',
      },
      {
        title: '订阅申请人',
        dataIndex: 'operator',
      },
      {
        title: '订阅时间',
        dataIndex: 'time',
      },
      {
        title: '发布名称',
        dataIndex: 'publicationName',
      },
      {
        title: '所属主题',
        dataIndex: 'theme',
      },
      {
        title: '审批状态',
        dataIndex: 'state',
      },
      {
        title: '操作',
        dataIndex: 'operation',
        render: () => {
          return <a>查看</a>;
        },
      },
    ];

    const rowSelection = {
      selectKeys,
      onChange: keys => {
        this.setState({
          selectKeys: keys,
        });
      },
    };

    columns.forEach(item => {
      item.align = 'center';
    });
    willAuditColumns.forEach(item => {
      item.align = 'center';
    });
    failSubcribedColumns.forEach(item => {
      item.align = 'center';
    });

    const optionComs1 = stateList.map(item => {
      return (
        <Option value={item.value} key={item.value}>
          {item.label}
        </Option>
      );
    });
    const optionComs2 = [
      { value: -1, label: '全部' },
      { value: 0, label: '上级待审核' },
      { value: 1, label: '发布方待审核' },
    ].map(item => (
      <Option value={item.value} key={item.value}>
        {item.label}
      </Option>
    ));

    return (
      <PageHeaderLayout>
        <div className={styles.layout}>
          <Tabs>
            <TabPane tab="已订阅" key="hasSubscribed">
              <div className={styles.search}>
                <Input
                  placeholder="订阅名称/发布名称"
                  value={name}
                  onPressEnter={this.handleSearch}
                  onChange={this.handleNameChange}
                  className={styles.name}
                />
                <Input
                  className={styles.theme}
                  placeholder="请输入主题"
                  value={theme}
                  onPressEnter={this.handleSearch}
                  onChange={this.handleThemeChange}
                />
                <Input
                  className={styles.name}
                  placeholder="订阅机构/发布机构"
                  value={organization}
                  onPressEnter={this.handleSearch}
                  onChange={this.handleOrganizationChange}
                />
                <Select value={state} onChange={this.handSelectChange} className={styles.state}>
                  {optionComs1}
                </Select>
                <RangePicker value={date} onChange={this.handlePick} className={styles.date} />
                <Button type="primary" onClick={this.handleSearch} icon="search">
                  搜索
                </Button>
              </div>
              <div className={styles.bar}>
                <Button className={styles.button}>启动</Button>
                <Button className={styles.button}>停止</Button>
              </div>
              <div>
                <Table
                  bordered
                  columns={columns}
                  dataSource={data1}
                  rowSelection={rowSelection}
                  rowKey="id"
                  onChange={this.handleStandardTableChange}
                />
              </div>
            </TabPane>
            <TabPane tab="待审核" key="willAudit">
              <div className={styles.search}>
                <Input
                  placeholder="订阅名称/发布名称"
                  value={name}
                  onPressEnter={this.handleSearch}
                  onChange={this.handleNameChange}
                  className={styles.name}
                />
                <Input
                  className={styles.theme}
                  placeholder="请输入主题"
                  value={theme}
                  onPressEnter={this.handleSearch}
                  onChange={this.handleThemeChange}
                />
                <Select value={state} onChange={this.handSelectChange} className={styles.state}>
                  {optionComs2}
                </Select>
                <RangePicker value={date} onChange={this.handlePick} className={styles.date} />
                <Button type="primary" onClick={this.handleSearch} icon="search">
                  搜索
                </Button>
              </div>
              <Table columns={willAuditColumns} dataSource={data3} bordered />
            </TabPane>
            <TabPane tab="订阅失败" key="failSubcribed">
              <div className={styles.search}>
                <Input
                  placeholder="订阅名称/发布名称"
                  value={name}
                  onPressEnter={this.handleSearch}
                  onChange={this.handleNameChange}
                  className={styles.name}
                />
                <Input
                  className={styles.theme}
                  placeholder="请输入主题"
                  value={theme}
                  onPressEnter={this.handleSearch}
                  onChange={this.handleThemeChange}
                />
                <Select value={state} onChange={this.handSelectChange} className={styles.state}>
                  {optionComs2}
                </Select>
                <RangePicker value={date} onChange={this.handlePick} className={styles.date} />
                <Button type="primary" onClick={this.handleSearch} icon="search">
                  搜索
                </Button>
              </div>
              <Table columns={failSubcribedColumns} dataSource={data2} bordered />
            </TabPane>
          </Tabs>
        </div>
      </PageHeaderLayout>
    );
  }
}
