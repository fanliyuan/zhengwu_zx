/*
 * @Author: ChouEric
 * @Date: 2018-07-03 15:42:31
 * @Last Modified by: ChouEric
 * @Last Modified time: 2018-09-14 17:17:34
 * @描述: 开放门户管理--资讯管理--轮播图管理
*/
import React, { Component, Fragment } from 'react'
import { connect } from 'dva'
import { routerRedux } from 'dva/router'
import { DatePicker, Input, Button, Table, Popconfirm, message, Cascader } from 'antd'
import moment from 'moment'

import PageHeaderLayout from '../../layouts/PageHeaderLayout'
import Ellipsis from '../../components/Ellipsis'
import styles from './CarouselManagement.less'
import { format0, format24 } from '../../utils/utils'

const { RangePicker } = DatePicker
// const { Option } = Select

@connect(({carouselManagement, loading, articlePublication}) => ({carouselManagement, articlePublication, loading: loading.models.carouselManagement}))
export default class CarouselManagement extends Component {
  state = {
    queryData: {
      time: [],
    },
    queryParams: {},
    isChanged: false,
  }

  componentDidMount() {
    this.props.dispatch({
      type: 'carouselManagement/getCarousels',
      payload: {
        body: {
          pageNum:1,
          pageSize: 10,
        },
      },
    })
    this.props.dispatch({
      type: 'articlePublication/getColumnList',
    })
  }

  handleNameChange = e => {
    const { queryData } = this.state
    this.setState({
      queryData: {
        ...queryData,
        imgName: e.target.value.trim(),
      },
      isChanged: true,
    })
  }

  handleColumnChange = value => {
    const { queryData } = this.state
    this.setState({
      isChanged: true,
      queryData: {
        ...queryData,
        imgPid: value,
      },
    })
  }

  handlePick = val => {
    const { queryData } = this.state
    this.setState({
      isChanged: true,
      queryData: {
        ...queryData,
        time:val,
      },
    })
  }

  handleSearch = () => {
    if (!this.state.isChanged) return null
    const { queryData } = this.state
    const queryParams = {
      imgName: queryData.imgName,
      imgPid: queryData.imgPid && [...queryData.imgPid].pop() && +[...queryData.imgPid].pop(),
      createTime: queryData.time[0] && format0(queryData.time[0].format('x')),
      updateTime: queryData.time[1] && format24(queryData.time[1].format('x')),
    }
    this.props.dispatch({
      type: 'carouselManagement/getCarousels',
      payload: {
        body: {
          ...queryParams,
          pageNum: 1,
          pageSize: 10,
        },
      },
    })
    this.setState({
      isChanged: false,
      queryParams,
    })
  }

  handleStandardTableChange = pagination => {
    const { queryParams } = this.state
    this.props.dispatch({
      type: 'carouselManagement/getCarousels',
      payload: {
        body: {
          ...queryParams,
          pageSize: pagination.pageSize,
          pageNum: pagination.current,
        },
      },
    })
  }

  goAddCarouse = () => {
    this.props.dispatch(routerRedux.push('/portalManagement/addCarousel'))
  }

  startCaroulse = row => {
    this.props.dispatch({
      type: 'carouselManagement/toggleCarousel',
      payload: {
        params: {
          imgId: row.imgId,
          imgState: 1,
        },
      },
    })
  }

  stopCaroulse = row => {
    this.props.dispatch({
      type: 'carouselManagement/toggleCarousel',
      payload: {
        params: {
          imgId: row.imgId,
          imgState: 0,
        },
      },
    })
  }

  editCaroulse = row => {
    this.props.dispatch(
      routerRedux.push('/portalManagement/editCarousel', {carouselId: row.imgId})
    )
  }

  deleteCaroulse = row => {
    // message.success('删除成功')
    this.props.dispatch({
      type: 'carouselManagement/deleteCarousel',
      payload: {
        params: {
          imgId: row.imgId,
        },
      },
    })
  }

  render() {
    const { loading, carouselManagement: { carouselList, pagination }, articlePublication: { column } } = this.props

    const state1Coms = row => {
      return (
        <a onClick={() => this.stopCaroulse(row)} style={{ marginRight: 8 }}>
          停用
        </a>
      )
    }
    const state0Coms = row => {
      return (
        <Fragment>
          <a onClick={() => this.startCaroulse(row)} style={{ marginRight: 8 }}>
            启用
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
        dataIndex: 'index',
      },
      {
        title: '名称',
        dataIndex: 'imgName',
      },
      {
        title: '栏目',
        dataIndex: 'imgPage',
      },
      // {
      //   title: '排序',
      //   dataIndex: 'sort',
      // },
      {
        title: '资源地址',
        dataIndex: 'imgAddress',
        render: (text) => {
          return <Ellipsis tooltip={text} length={20}>{text}</Ellipsis>
        },
      },
      {
        title: '操作时间',
        dataIndex: 'updateTime',
        render: (text) => {
          return <span>{moment(+text).format('lll')}</span>
        },
      },
      {
        title: '操作',
        dataIndex: 'imgState',
        render: (text, row) => {
          return text === 0 ? state0Coms(row) : state1Coms(row)
        },
      },
    ]

    columns.forEach(item => {
      item.align = 'center'
    })

    return (
      <PageHeaderLayout>
        <div className={styles.layout}>
          <div className={styles.search}>
            <Input
              placeholder="名称"
              onPressEnter={this.handleSearch}
              onChange={this.handleNameChange}
              className={styles.name}
              />
            <Cascader
              options={[...column].filter(item => {// eslint-disable-line
              if (item.label==='首页' || item.label === '开放动态') {
                delete item.children
                return item
              }
              })}
              placeholder="栏目"
              style={{ marginRight: 16 }}
              onChange={this.handleColumnChange}
              />
            <RangePicker onChange={this.handlePick} className={styles.date} />
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
              dataSource={carouselList}
              pagination={pagination && {...pagination, showQuickJumper: true, showTotal: (total) => `共 ${Math.ceil(total / pagination.pageSize)}页 / ${total}条 数据`}}
              loading={loading}
              rowKey="imgId"
              onChange={this.handleStandardTableChange}
              />
          </div>
        </div>
      </PageHeaderLayout>
    )
  }
}
