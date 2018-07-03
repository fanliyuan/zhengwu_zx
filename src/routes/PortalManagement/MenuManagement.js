/*
 * @Author: ChouEric
 * @Date: 2018-07-03 15:27:04
 * @Last Modified by: ChouEric
 * @Last Modified time: 2018-07-03 15:46:01
 * @描述: 开发门户管理 -- 目录分类 -- 目录分类管理
*/
import React, { Component } from 'react';
// import { connect } from 'dva';
import { DatePicker, Input, Select, Button, Table } from 'antd';
import moment from 'moment'

import PageHeaderLayout from '../../layouts/PageHeaderLayout';
import styles from './MenuManagement.less';

const { RangePicker } = DatePicker;
const { Option } = Select;

// @connect(({ overviewLogging, loading }) => ({
//   overviewLogging,
//   loading: loading.models.overviewLogging,
// }))
export default class MenuManagement extends Component {
  state = {
    name: '',
    operator: '',
    type: -1,
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

  handleOperatorChange = e => {
    this.setState({
      isChanged: true,
    })
    this.setState({
      operator: e.target.value.trim(),
    });
  };

  handleTypeChange = e => {
    this.setState({
      type: e,
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
    const { name, date, operator, type } = this.state
    // const { overviewLogging: { data, pagination, stateList }, loading } = this.props

    const data = []

    for(let i = 0; i < 120; i ++) {
      data.push({
        id: i,
        name: '类型' + i, // eslint-disable-line
        // count: Math.ceil(Math.random() * 2000) + 100, // eslint-disable-line
        time: moment(new Date() - 1000 * 60 * 60 * 5 * i, 'x').format('lll'),
        operator: '操作人' + i, // eslint-disable-line
        // origin: '数据源' + i, // eslint-disable-line
        // dataBase: '数据库' + i, // eslint-disable-line
      })
    }

    const typeList = [
      {
        value: -1,
        label: '全部状态',
      },
      {
        value: 0,
        label: '主题分类',
      },
      {
        value: 1,
        label: '应用分类',
      },
      {
        value: 2,
        label: '行业分类',
      },
    ]

    const columns = [
      {
        title: '序号',
        dataIndex: 'id',
      },
      {
        title: '数据名',
        dataIndex: 'name',
      },
      {
        title: '操作人',
        dataIndex: 'operator',
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

    const typeComs = typeList.map(item => { // eslint-disable-line
      return <Option value={item.value} key={item.value}>{item.label}</Option>
    })

    return (
      <PageHeaderLayout>
        <div className={styles.layout}>
          <div className={styles.search}>
            <Select value={type} onChange={this.handleTypeChange} className={styles.select} >
              {typeComs}
            </Select>
            <Input
              placeholder="类型名称"
              value={name}
              onPressEnter={this.handleSearch}
              onChange={this.handleNameChange}
              className={styles.name}
            />
            <Input
              placeholder="操作人"
              value={operator}
              onPressEnter={this.handleSearch}
              onChange={this.handleOperatorChange}
              className={styles.name}
            />
            <RangePicker value={date} onChange={this.handlePick} className={styles.date} />
            <Button type="primary" onClick={this.handleSearch} icon="search">
              搜索
            </Button>
          </div>
          <div className={styles.bar}>
            {/* <Button type='primary' className={styles.button}>导出</Button> */}
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
