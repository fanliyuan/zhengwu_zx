/*
 * @Author: ChouEric
 * @Date: 2018-07-03 11:27:26
 * @Last Modified by: ChouEric
 * @Last Modified time: 2018-07-03 13:21:07
 * @描述: 所有订阅
*/
import React, { Component } from 'react';
// import { connect } from 'dva';
import { DatePicker, Input, Select, Button, Table } from 'antd';
import moment from 'moment'

import PageHeaderLayout from '../../layouts/PageHeaderLayout';
import styles from './AllSub.less';

const { RangePicker } = DatePicker;
const { Option } = Select;

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

  handSelectChange = val => {
    this.setState({
      isChanged: true,
    })
    this.setState({
      state: val,
    })
  }

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
    const { name, date, state, theme } = this.state
    // const { overviewLogging: { data, pagination, stateList }, loading } = this.props

    const data = []

    for(let i = 0; i < 120; i ++) {
      data.push({
        id: i,
        name: '订阅名' + i, // eslint-disable-line
        person: '订阅人' + i, // eslint-disable-line
        state: i % 3 === 0 ? '运行中' : '已停止',
        time: moment(new Date() - 1000 * 60 * 60 * 5 * i, 'x').format('lll'),
        menu: '目录名' + i, // eslint-disable-line
      })
    }

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
    ]

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
        title: '运行状态',
        dataIndex: 'state',
      },
      {
        title: '操作',
        dataIndex: 'operation',
      },
    ];

    columns.forEach(item => {
      item.align = 'center'
    })

    const optionList = stateList.map(item => {
      return <Option value={item.value} key={item.value}>{item.label}</Option>
    })

    return (
      <PageHeaderLayout>
        <div className={styles.layout}>
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
            <Select value={state} onChange={this.handSelectChange} className={styles.state} >
              {optionList}
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
