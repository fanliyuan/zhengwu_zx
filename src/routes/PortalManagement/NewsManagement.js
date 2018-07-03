/*
 * @Author: ChouEric
 * @Date: 2018-07-03 14:16:35
 * @Last Modified by: ChouEric
 * @Last Modified time: 2018-07-03 15:08:58
 * @描述: 开放门户管理--资讯管理--类型管理
*/
import React, { Component } from 'react';
import { Link } from 'dva/router'
// import { connect } from 'dva';
import { DatePicker, Input, Select, Button, Table } from 'antd';
import moment from 'moment'

import PageHeaderLayout from '../../layouts/PageHeaderLayout';
import styles from './NewsManagement.less';

const { RangePicker } = DatePicker;
const { Option } = Select;

// @connect(({ overviewLogging, loading }) => ({
//   overviewLogging,
//   loading: loading.models.overviewLogging,
// }))
export default class NewsManagement extends Component {
  state = {
    name: '',
    operator: '',
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
    const { name, date, operator } = this.state
    // const { overviewLogging: { data, pagination, stateList }, loading } = this.props

    const data = []

    for(let i = 0; i < 120; i ++) {
      data.push({
        id: i,
        name: '数据名' + i, // eslint-disable-line
        operator: '操作人' + i, // eslint-disable-line
        time: moment(new Date() - 1000 * 60 * 60 * 5 * i, 'x').format('lll'),
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

    const optionList = stateList.map(item => { // eslint-disable-line
      return <Option value={item.value} key={item.value}>{item.label}</Option>
    })

    return (
      <PageHeaderLayout>
        <div className={styles.layout}>
          <div className={styles.search}>
            <Input
              placeholder="名称"
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
              className={styles.operator}
            />
            <RangePicker value={date} onChange={this.handlePick} className={styles.date} />
            <Button type="primary" onClick={this.handleSearch} icon="search">
              搜索
            </Button>
          </div>
          <div className={styles.bar}>
            <Button type='primary' className={styles.button}>新增</Button>
            <Link to='/portalManagement/publicationManagement' style={{marginRight: 20}} >发布管理</Link>
            <Link to='/portalManagement/newsLibrary' >资讯库</Link>
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
