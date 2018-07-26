/*
 * @Author: ChouEric
 * @Date: 2018-07-03 15:42:31
 * @Last Modified by: ChouEric
 * @Last Modified time: 2018-07-23 09:45:06
 * @描述: 开放门户管理--资讯管理--轮播图管理
*/
import React, { Component, Fragment } from 'react'
import { connect } from 'dva'
import { routerRedux } from 'dva/router'
import { DatePicker, Input, Select, Button, Table, Popconfirm, message } from 'antd'
import moment from 'moment'

import PageHeaderLayout from '../../layouts/PageHeaderLayout'
import styles from './CarouselManagement.less'

const { RangePicker } = DatePicker
const { Option } = Select

@connect()
export default class CarouselManagement extends Component {
  state = {
    name: '',
    resource: '',
    page: -1,
    date: [],
    isChanged: false,
  }

  componentDidMount() {
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
    })
  }

  handleResourceChange = e => {
    this.setState({
      isChanged: true,
    })
    this.setState({
      resource: e.target.value.trim(),
    })
  }

  handlePageChange = e => {
    this.setState({
      page: e,
      isChanged: true,
    })
  }

  handlePick = val => {
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
  }

  handleStandardTableChange = pagination => {
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
  }

  goAddCarouse = () => {
    this.props.dispatch(routerRedux.push('/portalManagement/addCarousel'))
  }

  startCaroulse = () => {
    message.success('启用成功')
  }

  endCaroulse = () => {
    message.success('停用成功')
  }

  editCaroulse = () => {
    this.props.dispatch(routerRedux.push('/portalManagement/addCarousel'))
  }

  deleteCaroulse = () => {
    message.success('删除成功')
  }

  render() {
    const { name, date, resource, page } = this.state
    // const { overviewLogging: { data, pagination, stateList }, loading } = this.props

    const data = []

    for (let i = 0; i < 120; i++) {
      data.push({
        id: i,
        name: `类型${i}`,
        // count: Math.ceil(Math.random() * 2000) + 100,
        time: moment(new Date() - 1000 * 60 * 60 * 5 * i, 'x').format('lll'),
        column: `主题${i}`,
        sort: i,
        resource: `资源${i}`,
        state: Math.round(Math.random()),
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

    const state1Coms = row => {
      return (
        <a onClick={() => this.startCaroulse(row)} style={{ marginRight: 8 }}>
          启用
        </a>
      )
    }
    const state0Coms = row => {
      return (
        <Fragment>
          <a onClick={() => this.endCaroulse(row)} style={{ marginRight: 8, color: 'red' }}>
            停用
          </a>
          <a onClick={() => this.editCaroulse(row)} style={{ marginRight: 8 }}>
            修改
          </a>
          <Popconfirm
            type="primary"
            onConfirm={() => this.deleteCaroulse(row)}
            onCancel={() => message.info('操作取消')}
            title="确定删除此轮播图"
            okText="确定"
            okType="danger"
            cancelText="取消"
          >
            <a style={{ marginRight: 8 }}>删除</a>
          </Popconfirm>
        </Fragment>
      )
    }

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
        dataIndex: 'state',
        render: (state, row) => {
          return state === 0 ? state0Coms(row) : state1Coms(row)
        },
      },
    ]

    columns.forEach(item => {
      item.align = 'center'
    })

    const pageComs = pageList.map(item => {
      // eslint-disable-line
      return (
        <Option value={item.value} key={item.value}>
          {item.label}
        </Option>
      )
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
            <Select value={page} onChange={this.handlePageChange} className={styles.select}>
              {pageComs}
            </Select>
            <RangePicker value={date} onChange={this.handlePick} className={styles.date} />
            <Button type="primary" onClick={this.handleSearch} icon="search">
              搜索
            </Button>
          </div>
          <div className={styles.bar}>
            <Button type="primary" className={styles.button} onClick={this.goAddCarouse}>
              新增
            </Button>
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
    )
  }
}
