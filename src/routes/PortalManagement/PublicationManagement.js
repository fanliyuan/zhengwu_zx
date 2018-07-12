/*
 * @Author: ChouEric
 * @Date: 2018-07-03 14:31:14
 * @Last Modified by: ChouEric
 * @Last Modified time: 2018-07-12 10:40:54
 * @描述: 开放门户管理--资讯管理--发布管理
*/
import React, { Component } from 'react';
// import { connect } from 'dva';
import { DatePicker, Input, Select, Button, Table } from 'antd';
import moment from 'moment'
import { Link } from 'dva/router'

import PageHeaderLayout from '../../layouts/PageHeaderLayout';
import styles from './PublicationManagement.less';

const { RangePicker } = DatePicker;
const { Option } = Select;

// @connect(({ overviewLogging, loading }) => ({
//   overviewLogging,
//   loading: loading.models.overviewLogging,
// }))
export default class PublicationManagement extends Component {
  state = {
    name: '',
    system: '',
    type: -1,
    subscribe: -1,
    audit: -1,
    date: [],
    isChanged: false,
    selectKeys: [],
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

  handleSystemChange = e => {
    this.setState({
      isChanged: true,
    })
    this.setState({
      system: e.target.value.trim(),
    });
  };

  handleTypeChange = e => {
    this.setState({
      isChanged: true,
    })
    this.setState({
      type: e,
    });
  };

  handleSubscribeChange = e => {
    this.setState({
      isChanged: true,
    })
    this.setState({
      subscribe: e,
    });
  };

  handleAuditChange = e => {
    this.setState({
      isChanged: true,
    })
    this.setState({
      audit: e,
    });
  };

  handlePickChange = (val) => {
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

  // goPublication = () => {
  //   const { dispatch } = this.props
  //   dispatch(
  //     routerRedux.push('/portalManagement/publication')
  //   )
  // }

  render() {
    const { name, date, audit, subscribe, type, system, selectKeys } = this.state
    // const { overviewLogging: { data, pagination, stateList }, loading } = this.props

    const data = []

    for(let i = 0; i < 120; i ++) {
      data.push({
        id: i,
        title: '标题' + i, // eslint-disable-line
        column: '栏目' + i, // eslint-disable-line
        top: i % 3 === 0 ? '是' : '否' , // eslint-disable-line
        time: moment(new Date() - 1000 * 60 * 60 * 5 * i, 'x').format('lll'),
      })
    }

    const typeList = [
      {
        value: -1,
        label: '所有类型',
      },
      {
        value: 0,
        label: '表',
      },
      {
        value: 1,
        label: '文件',
      },
    ]
    const subscribeList = [
      {
        value: -1,
        label: '全部状态',
      },
      {
        value: 0,
        label: '已授权',
      },
      {
        value: 1,
        label: '未授权',
      },
    ]
    const auditList = [
      {
        value: -1,
        label: '全部状态',
      },
      {
        value: 0,
        label: '已审核',
      },
      {
        value: 1,
        label: '已拒绝',
      },
      {
        value: 2,
        label: '待审核',
      },
    ]
    const rowSelection = {
      selectKeys,
      onChange: (select) => {
        this.setState({
          selectKeys: select,
        })
      },
    }

    const columns = [
      {
        title: '序号',
        dataIndex: 'id',
      },
      {
        title: '标题',
        dataIndex: 'title',
      },
      {
        title: '栏目',
        dataIndex: 'column',
      },
      {
        title: '是否置顶',
        dataIndex: 'top',
      },
      {
        title: '发布时间',
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
    const subscribeComs = subscribeList.map(item => { // eslint-disable-line
      return <Option value={item.value} key={item.value}>{item.label}</Option>
    })
    const auditComs = auditList.map(item => { // eslint-disable-line
      return <Option value={item.value} key={item.value}>{item.label}</Option>
    })

    return (
      <PageHeaderLayout>
        <div className={styles.layout}>
          <div className={styles.search}>
            <Input
              placeholder="发布名称"
              value={name}
              onPressEnter={this.handleSearch}
              onChange={this.handleNameChange}
              className={styles.name}
            />
            <Input
              placeholder="应用系统"
              value={system}
              onPressEnter={this.handleSearch}
              onChange={this.handleSystemChange}
              className={styles.name}
            />
            <Select value={type} onChange={this.handleTypeChange} className={styles.select} >
              {typeComs}
            </Select>
            <Select value={subscribe} onChange={this.handleSubscribeChange} className={styles.select} >
              {subscribeComs}
            </Select>
            <Select value={audit} onChange={this.handleAuditChange} className={styles.select} >
              {auditComs}
            </Select>
            <RangePicker value={date} onChange={this.handlePickChange} className={styles.date} />
            <Button type="primary" onClick={this.handleSearch} icon="search">
              搜索
            </Button>
          </div>
          <div className={styles.bar}>
            <Button type='primary' className={styles.button}><Link to='/portalManagement/publication'>发布</Link></Button>
          </div>
          <div>
            <Table
              bordered
              columns={columns}
              dataSource={data}
              rowSelection={rowSelection}
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
