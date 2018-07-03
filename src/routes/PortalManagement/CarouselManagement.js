/*
 * @Author: ChouEric
 * @Date: 2018-07-03 15:42:31
 * @Last Modified by: ChouEric
 * @Last Modified time: 2018-07-03 15:54:55
 * @描述: 开放门户管理--资讯管理--轮播图管理
*/
import React, { Component } from 'react';
// import { connect } from 'dva';
import { DatePicker, Input, Select, Button, Table } from 'antd';
import moment from 'moment'

import PageHeaderLayout from '../../layouts/PageHeaderLayout';
import styles from './CarouselManagement.less';

const { RangePicker } = DatePicker;
const { Option } = Select;

// @connect(({ overviewLogging, loading }) => ({
//   overviewLogging,
//   loading: loading.models.overviewLogging,
// }))
export default class CarouselManagement extends Component {
  state = {
    name: '',
    resource: '',
    page: -1,
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

  handleResourceChange = e => {
    this.setState({
      isChanged: true,
    })
    this.setState({
      resource: e.target.value.trim(),
    });
  };

  handlePageChange = e => {
    this.setState({
      page: e,
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
    const { name, date, resource, page } = this.state
    // const { overviewLogging: { data, pagination, stateList }, loading } = this.props

    const data = []

    for(let i = 0; i < 120; i ++) {
      data.push({
        id: i,
        name: '类型' + i, // eslint-disable-line
        // count: Math.ceil(Math.random() * 2000) + 100, // eslint-disable-line
        time: moment(new Date() - 1000 * 60 * 60 * 5 * i, 'x').format('lll'),
        column: '主题' + i, // eslint-disable-line
        sort: i, // eslint-disable-line
        resource: '资源' + i, // eslint-disable-line
      })
    }

    const pageList = [
      {
        value: -1,
        label: '全部页面',
      },
      {
        value: 0,
        label: '首页',
      },
      {
        value: 1,
        label: '开放动态',
      },
    ]

    const columns = [
      {
        title: '序号',
        dataIndex: 'id',
      },
      {
        title: '名称',
        dataIndex: 'name',
      },
      {
        title: '栏目',
        dataIndex: 'column',
      },
      {
        title: '排序',
        dataIndex: 'sort',
      },
      {
        title: '资源名称',
        dataIndex: 'resource',
      },
      {
        title: '操作时间',
        dataIndex: 'time',
      },
      {
        title: '操作',
        dataIndex: 'operation',
      },
    ];

    columns.forEach(item => {
      item.align = 'center'
    })

    const pageComs = pageList.map(item => { // eslint-disable-line
      return <Option value={item.value} key={item.value}>{item.label}</Option>
    })

    return (
      <PageHeaderLayout>
        <div className={styles.layout}>
          <div className={styles.search}>
            <Input
              placeholder="类型名称"
              value={name}
              onPressEnter={this.handleSearch}
              onChange={this.handleNameChange}
              className={styles.name}
            />
            <Input
              placeholder="资源名称"
              value={resource}
              onPressEnter={this.handleSearch}
              onChange={this.handleResourceChange}
              className={styles.name}
            />
            <Select value={page} onChange={this.handlePageChange} className={styles.select} >
              {pageComs}
            </Select>
            <RangePicker value={date} onChange={this.handlePick} className={styles.date} />
            <Button type="primary" onClick={this.handleSearch} icon="search">
              搜索
            </Button>
          </div>
          <div className={styles.bar}>
            <Button type='primary' className={styles.button}>新增</Button>
          </div>
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
