/*
 * @Author: ChouEric
 * @Date: 2018-07-03 15:07:52
 * @Last Modified by: ChouEric
 * @Last Modified time: 2018-08-26 18:22:28
 * @描述: 开放门户管理--资讯管理-- 资讯库
*/
import React, { Component, Fragment } from 'react'
import { connect } from 'dva'
import { Link, routerRedux } from 'dva/router'
import { DatePicker, Input, Select, Button, Table, Popconfirm } from 'antd'
import moment from 'moment'

import { format0, format24 } from '../../utils/utils'
import PageHeaderLayout from '../../layouts/PageHeaderLayout'
import styles from './NewsLibrary.less'

const { RangePicker } = DatePicker
const { Option } = Select

// @connect(({ overviewLogging, loading }) => ({
//   overviewLogging,
//   loading: loading.models.overviewLogging,
// }))
@connect(({ articleLibrary, loading }) => ({articleLibrary, loading: loading.models.articleLibrary}))
export default class NewsLibrary extends Component {
  state = {
    queryData: {},
    queryParams: {},
    isChanged: false,
  }

  componentDidMount() {
    this.props.dispatch({
      type: 'articleLibrary/getArticles',
      payload: {
        body: {
          pageSize: 10,
          pageNum: 1,
        },
      },
    })
    this.props.dispatch({
      type: 'articleLibrary/getCategories',
    })
  }

  handleNameChange = e => {
    const { queryData } = this.state
    this.setState({
      queryData: {
        ...queryData,
        articleTitle : e.target.value.trim(),
      },
      isChanged: true,
    })
  }

  handleOperatorChange = e => {
    const { queryData } = this.state
    this.setState({
      queryData: {
        ...queryData,
        articlePname: e.target.value.trim(),
      },
      isChanged: true,
    })
  }

  handleTypeChange = value => {
    const { queryData } = this.state
    this.setState({
      queryData: {
        ...queryData,
        articleFid : value === '全部分类' ? undefined : value,
      },
      isChanged: true,
    })
  }

  // handleSubscribeChange = () => {
  //   this.setState({
  //     isChanged: true,
  //   })
  //   // this.setState({
  //   //   subscribe: e,
  //   // })
  // }

  handleAuditChange = () => {
    this.setState({
      isChanged: true,
    })
    // this.setState({
    //   audit: e,
    // })
  }

  handlePickChange = value => {
    const { queryData } = this.state
    this.setState({
      queryData: {
        ...queryData,
        createTime: value[0] ? format0(+value[0].format('x')) : undefined,
        updateTime: value[1] ? format24(+value[1].format('x')) : undefined,
      },
      isChanged: true,
    })
  }

  handleSearch = () => {
    if (!this.state.isChanged) return // eslint-disable-line
    const {queryData } = this.state
    const pagination = {
      pageNum: 1,
      pageSize: 10,
    }
    const queryParams = {
      ...queryData,
    }
    this.props.dispatch({
      type: 'articleLibrary/getArticles',
      payload: {
        body: {
          ...queryParams,
          ...pagination,
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
      type: 'articleLibrary/getArticles',
      payload: {
        body: {
          ...queryParams,
          ...{
            pageNum: pagination.current,
            pageSize: pagination.pageSize,
          },
        },
      },
    })
  }

  handleEdit = row => {
    this.props.dispatch(
      routerRedux.push('/portalManagement/editArticle', {articleId: row.articleId})
    )
  }

  handleDelete = row => {
    this.props.dispatch({
      type: 'articleLibrary/deleteArticle',
      payload: {
        params: {
          articleId: row.articleId,
        },
      },
    })
  }

  render() {
    const { articleLibrary: { articleList, pagination, categoryList }, loading } = this.props

    const columns = [
      {
        title: '序号',
        dataIndex: 'articleId',
      },
      {
        title: '标题',
        dataIndex: 'articleTitle',
      },
      {
        title: '分类',
        dataIndex: 'articleFname',
      },
      {
        title: '操作人',
        dataIndex: 'articlePname',
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
        render: (text, row) => {
          return (
            <Fragment>
              <a onClick={() => this.handleEdit(row)} className="mr16">
                修改
              </a>
              <Popconfirm
                title={`是否要删除${row.articleTitle}?`}
                onConfirm={() => this.handleDelete(row)}
                >
                <a>删除</a>
              </Popconfirm>
            </Fragment>
          )
        },
      },
    ]

    columns.forEach(item => {
      item.align = 'center'
    })

    const typeComs = categoryList.map(item => {
      // eslint-disable-line
      return (
        <Option value={item.categoryId} key={item.categoryId}>
          {item.categoryName}
        </Option>
      )
    })
    // const subscribeComs = subscribeList.map(item => {
    //   // eslint-disable-line
    //   return (
    //     <Option value={item.value} key={item.value}>
    //       {item.label}
    //     </Option>
    //   )
    // })
    // const auditComs = auditList.map(item => {
    //   // eslint-disable-line
    //   return (
    //     <Option value={item.value} key={item.value}>
    //       {item.label}
    //     </Option>
    //   )
    // })

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
            <Select defaultValue='全部分类' onChange={this.handleTypeChange} className={styles.select}>
              {typeComs}
            </Select>
            <Input
              placeholder="操作人"
              onPressEnter={this.handleSearch}
              onChange={this.handleOperatorChange}
              className={styles.name}
              />
            {/* <Select
              value={subscribe}
              onChange={this.handleSubscribeChange}
              className={styles.select}
            >
              {subscribeComs}
            </Select>
            <Select value={audit} onChange={this.handleAuditChange} className={styles.select}>
              {auditComs}
            </Select> */}
            <RangePicker onChange={this.handlePickChange} className={styles.date} />
            <Button type="primary" onClick={this.handleSearch} icon="search">
              搜索
            </Button>
          </div>
          <div className={styles.bar}>
            <Link to="/portalManagement/AddArticle">
              <Button type="primary" icon="plus" className={styles.button}>
                新增
              </Button>
            </Link>
          </div>
          <div>
            <Table
              bordered
              columns={columns}
              dataSource={articleList}
              pagination={pagination && {...pagination, showQuickJumper: true, showTotal: (total) => `共 ${Math.ceil(total / pagination.pageSize)}页 / ${total}条 数据`}}
              loading={loading}
              rowKey="articleId"
              onChange={this.handleStandardTableChange}
              />
          </div>
        </div>
      </PageHeaderLayout>
    )
  }
}
