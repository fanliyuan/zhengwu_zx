/*
 * @Author: ChouEric
 * @Date: 2018-07-03 13:40:41
 * @Last Modified by: ChouEric
 * @Last Modified time: 2018-07-03 13:58:39
*/
import React, { Component } from 'react';
// import { connect } from 'dva';
import { DatePicker, Input, Select, Button, Table } from 'antd';
import moment from 'moment'

import PageHeaderLayout from '../../layouts/PageHeaderLayout';
import styles from './ResourceSub.less';

const { RangePicker } = DatePicker;
const { Option } = Select;

// @connect(({ overviewLogging, loading }) => ({
//   overviewLogging,
//   loading: loading.models.overviewLogging,
// }))
export default class ResourceSub extends Component {
  state = {
    name: '',
    theme: '',
    organization: -1,
    subscription: -1,
    date: [],
    isChanged: false,
  };

  componentDidMount () {
    // const { dispatch } = this.props
    // const { date } = this.state

    // const dateRange = date.map((item) => {
    //   if (moment.isMoment(item)) {
    //     return +(item.format('x'))
    //   } else {
    //     return 0
    //   }
    // })

    // dispatch({
    //   type: 'overviewLogging/log',
    //   payload: {query: {...this.state, date: dateRange}, pagination: {pageSize: 10, current: 1}},
    // })
  }

  handleNameChange = e => {
    this.setState({
      isChanged: true,
    })
    this.setState({
      name: e.target.value.trim(),
    });
  };

  handleThemeChange = e => {
    this.setState({
      isChanged: true,
    })
    this.setState({
      theme: e.target.value.trim(),
    });
  };

  handleOriginChange = e => {
    this.setState({
      theme: e.target.value.trim(),
      isChanged: true,
    });
  };

  handleDataBaseChange = e => {
    this.setState({
      theme: e.target.value.trim(),
      isChanged: true,
    });
  };

  handlePick = (val) => {
    this.setState({
      isChanged: true,
    })
    this.setState({
      date: val,
    })
  }

  handleSearch = () => {
    if (!this.state.isChanged) return // eslint-disable-line
    // const { dispatch } = this.props;
    // const query = this.state
    // const pagination = {
    //   current: 1,
    //   pageSize: 10,
    // }
    // const dateRange = query.date.map((item) => {
    //   if (moment.isMoment(item)) {
    //     return +(item.format('x'))
    //   } else {
    //     return 0
    //   }
    // })
    this.setState({
      isChanged: false,
    })
    // dispatch({
    //   type: 'overviewLogging/log',
    //   payload: { query: { ...query, date: dateRange }, pagination },
    // });
  };

  handleStandardTableChange = (pagination) => {
    // console.log(pagination, filtersArg, sorter)
    // const query = this.state
    // const { dispatch } = this.props;
    console.log(pagination) // eslint-disable-line
    // const dateRange = query.date.map((item) => {
    //   if (moment.isMoment(item)) {
    //     return +(item.format('x'))
    //   } else {
    //     return 0
    //   }
    // })

    // dispatch({
    //   type: 'overviewLogging/log',
    //   payload: { query: {...query, date: dateRange}, pagination },
    // });
  };

  render() {
    const { name, date, theme, organization, subscription } = this.state
    // const { overviewLogging: { data, pagination, stateList }, loading } = this.props

    const data = []

    for(let i = 0; i < 120; i ++) {
      data.push({
        id: i,
        name: '数据名' + i, // eslint-disable-line
        count: Math.ceil(Math.random() * 2000) + 100, // eslint-disable-line
        time: moment(new Date() - 1000 * 60 * 60 * 5 * i, 'x').format('lll'),
        theme: '主题' + i, // eslint-disable-line
        origin: '数据源' + i, // eslint-disable-line
        dataBase: '数据库' + i, // eslint-disable-line
      })
    }

    const subscriptionList = [
      {
        value: -1,
        label: '全部状态',
      },
      {
        value: 0,
        label: '已订阅',
      },
      {
        value: 1,
        label: '未订阅',
      },
    ]
    const organizationList = [
      {
        value: -1,
        label: '所有发布机构',
      },
      {
        value: 10001,
        label: '省档案局',
      },
      {
        value: 10002,
        label: '省公安厅',
      },
    ]

    const columns = [
      {
        title: '序号',
        dataIndex: 'id',
      },
      {
        title: '目录名称',
        dataIndex: 'name',
      },
      {
        title: '目录资源',
        dataIndex: 'resource',
      },
      {
        title: '所属主题',
        dataIndex: 'theme',
      },
      {
        title: '所属分类2',
        dataIndex: 'class2',
      },
      {
        title: '所属分类3',
        dataIndex: 'class3',
      },
      {
        title: '数据类型',
        dataIndex: 'type',
      },
      {
        title: '发布时间',
        dataIndex: 'time',
      },
      {
        title: '是否审核',
        dataIndex: 'audit',
      },
      {
        title: '是否已订阅',
        dataIndex: 'subscribe',
      },
      {
        title: '操作',
        dataIndex: 'operation',
      },
    ];

    columns.forEach(item => {
      item.align = 'center'
    })

    const subscriptionComs = subscriptionList.map(item => { // eslint-disable-line
      return <Option value={item.value} key={item.value}>{item.label}</Option>
    })
    const organizationComs = organizationList.map(item => { // eslint-disable-line
      return <Option value={item.value} key={item.value}>{item.label}</Option>
    })

    return (
      <PageHeaderLayout>
        <div className={styles.layout}>
          <div className={styles.search}>
            <Input
              placeholder="请输入发布名称"
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
            <Select value={organization} onChange={this.handleOrganizationChange} className={styles.select} >
              {organizationComs}
            </Select>
            <Select value={subscription} onChange={this.handleSubscriptionChange} className={styles.select} >
              {subscriptionComs}
            </Select>
            <RangePicker value={date} onChange={this.handlePick} className={styles.date} />
            <Button type="primary" onClick={this.handleSearch} icon="search">
              搜索
            </Button>
          </div>
          {/* <div className={styles.bar}>
            <Button type='primary' className={styles.button}>导出</Button>
          </div> */}
          <div>
            <Table
              bordered
              columns={columns}
              dataSource={data}
              // pagination={pagination}
              // loading={loading}
              rowKey="id"
              onChange={this.handleStandardTableChange}
            />
          </div>
        </div>
      </PageHeaderLayout>
    );
  }
}
