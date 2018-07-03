/*
 * @Author: ChouEric
 * @Date: 2018-07-03 11:27:26
 * @Last Modified by: ChouEric
 * @Last Modified time: 2018-07-03 11:35:47
 * @描述: 所有订阅
*/
import React, { Component } from 'react';
// import { connect } from 'dva';
import { DatePicker, Input, Select, Button, Table } from 'antd';
import moment from 'moment'

// import { getTimeDistance } from '../../utils/utils'
import PageHeaderLayout from '../../layouts/PageHeaderLayout';
import styles from './AllSub.less';
// import { getLogState } from '../../services/api';

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
    const { dispatch } = this.props
    const { date } = this.state

    const dateRange = date.map((item) => {
      if (moment.isMoment(item)) {
        return +(item.format('x'))
      } else {
        return 0
      }
    })

    dispatch({
      type: 'overviewLogging/log',
      payload: {query: {...this.state, date: dateRange}, pagination: {pageSize: 10, current: 1}},
    })
  }

  handleIPChange = e => {
    this.setState({
      isChanged: true,
    })
    this.setState({
      name: e.target.value.trim(),
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
    const { dispatch } = this.props;
    const query = this.state
    const pagination = {
      current: 1,
      pageSize: 10,
    }
    const dateRange = query.date.map((item) => {
      if (moment.isMoment(item)) {
        return +(item.format('x'))
      } else {
        return 0
      }
    })
    this.setState({
      isChanged: false,
    })
    dispatch({
      type: 'overviewLogging/log',
      payload: { query: { ...query, date: dateRange }, pagination },
    });
  };

  handleStandardTableChange = (pagination) => {
    // console.log(pagination, filtersArg, sorter)
    const query = this.state
    const { dispatch } = this.props;

    const dateRange = query.date.map((item) => {
      if (moment.isMoment(item)) {
        return +(item.format('x'))
      } else {
        return 0
      }
    })

    dispatch({
      type: 'overviewLogging/log',
      payload: { query: {...query, date: dateRange}, pagination },
    });
  };

  render() {
    const { name, date, state } = this.state
    const { overviewLogging: { data, pagination, stateList }, loading } = this.props
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
        dataIndex: 'memu',
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
            <RangePicker value={date} className={styles.picker} onChange={this.handlePick} style={{ widht: 200, marginRight: 20 }} />
            <Input
              className={styles.IPInput}
              placeholder="IP地址"
              value={name}
              onPressEnter={this.handleSearch}
              onChange={this.handleIPChange}
              style={{ marginRight: 20 }}
            />
            <Select value={state} onChange={this.handSelectChange} style={{ width: 112, marginRight: 20 }}>
              {optionList}
            </Select>
            <Button type="primary" onClick={this.handleSearch} icon="search">
              搜索
            </Button>
          </div>
          <div>
            <Table
              bordered
              columns={columns}
              dataSource={data}
              pagination={pagination}
              loading={loading}
              rowKey="id"
              onChange={this.handleStandardTableChange}
            />
          </div>
        </div>
      </PageHeaderLayout>
    );
  }
}
