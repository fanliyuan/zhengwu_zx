/*
 * @Author: ChouEric
 * @Date: 2018-07-03 14:31:14
 * @Last Modified by: ChouEric
 * @Last Modified time: 2018-08-23 20:39:33
 * @描述: 开放门户管理--资讯管理--发布管理
*/
import React, { Component, Fragment } from 'react'
import { connect } from 'dva'
import { DatePicker, Input, Select, Button, Table, Popconfirm, message, Modal, Form, Radio, Cascader, Checkbox } from 'antd'

import moment from 'moment'
import { Link } from 'dva/router'
import copy from 'copy-to-clipboard'

import PageHeaderLayout from '../../layouts/PageHeaderLayout'
import styles from './PublicationManagement.less'

const { RangePicker } = DatePicker
const { Option } = Select

// 这里可以优化,不必太多次的循环
function getSecondColumn(pid = -1, firstColumn = []) {
  let result = []
  firstColumn.forEach(item => {
    if (+item.value === +pid) {
      result = item.children
    }
  })
  return result
}

function getParentValue(value, list = []) {
  let result
  list.some(item => { // eslint-disable-line
    if (+item.value === +value) {
      result = `${item.columnPid}`
      return true
    }
  })
  return result
}

@connect(({ articlePublication, loading }) => ({articlePublication, loading: loading.models.articlePublication}))
@Form.create()
export default class PublicationManagement extends Component {
  state = {
    queryData: {},
    isChanged: false,
    showModal: false,
    secondColumn: [],
    firstColumnValue: undefined,
    secondColumnValue: undefined,
    articleTopState: undefined,
    articleHotState: undefined,
  }

  componentDidMount() {
    const { dispatch } = this.props
    dispatch({
      type: 'articlePublication/getArticleReleased',
      payload: {
        body: {
          pageNum: 1,
          pageSize: 10,
        },
      },
    })
    dispatch({
      type: 'articlePublication/getColumnList',
    })
  }

  handleNameChange = e => {
    const { queryData } = this.state
    this.setState({
      queryData: {
        ...queryData,
        articleTitle: e.target.value.trim() || undefined,
      },
      isChanged: true,
    })
  }

  handleSystemChange = e => {
    const { queryData } = this.state
    this.setState({
      queryData: {
        ...queryData,
        articlePname: e.target.value.trim() || undefined,
      },
      isChanged: true,
    })
  }

  handleTypeChange = value => {
    const { queryData } = this.state
    this.setState({
      queryData: {
        ...queryData,
        articleCid: [...value].pop() ? +[...value].pop() : undefined,
      },
      isChanged: true,
    })
  }

  recommendChange = e => {
    const { queryData } = this.state
    this.setState({
      queryData: {
        ...queryData,
        articleHotState: e.target.checked ? 1 : 0,
      },
      isChanged: true,
    })
  }

  topchangeHandle = e => {
    const { queryData } = this.state
    this.setState({
      queryData: {
        ...queryData,
        articleTopState: e.target.checked ? 1 : 0,
      },
      isChanged: true,
    })
  }

  handlePickChange = val => {
    const { queryData } = this.state
    this.setState({
      queryData: {
        ...queryData,
        time: val,
      },
      isChanged: true,
    })
  }

  handleSearch = () => {
    if (!this.state.isChanged) return // eslint-disable-line
    const { queryData } = this.state
    const pagination = {
      pageSize: 10,
      pageNum: 1,
    }
    this.props.dispatch({
      type: 'articlePublication/getArticleReleased',
      payload: {
        body: {
          ...pagination,
          ...queryData,
        },
      },
    })
    this.setState({
      isChanged: false,
    })
  }

  handleStandardTableChange = () => {
    // console.log(pagination, filtersArg, sorter)
    // const query = this.state
    // const { dispatch } = this.props;
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

  publishCancel = row => {
    this.props.dispatch({
      type: 'articlePublication/cancleArticleReleased',
      payload: {
        params: {
          articleId: row.articleId,
        },
      },
    })
  }

  firstColumnChange = (value,firstColumn) => {
    this.setState({
      secondColumn: getSecondColumn(value,firstColumn),
    }, () => {
      this.setState({
        secondColumnValue: [...this.state.secondColumn].pop().value,// eslint-disable-line
      })
    })
  }

  copyUrl = row => {
    copy(`这是复制的${row.articleId}`)
    message.success('复制成功')
  }

  handleSet = (row, list, firstColumn) => {
    this.setState({
      showModal: true,
      secondColumnValue: `${row.articleCid}`,
      firstColumnValue: getParentValue(row.articleCid, list),
      articleTopState: row.articleTopState,
      articleHotState: row.articleHotState,
    }, () => {
      this.setState({
        secondColumn: getSecondColumn(this.state.firstColumnValue, firstColumn),// eslint-disable-line
      })
    })
    // message.success(row.top)
    this.props.form.setFieldsValue({ top: row.top, recommend: row.recommend })
  }

  render() {
    const { showModal, secondColumn, firstColumnValue, secondColumnValue, articleTopState, articleHotState } = this.state
    const { articlePublication: { releasedList, pagination, column }, loading } = this.props
    const firstColumn = column.map(item => ({value: item.value, label: item.label, children: item.children}))
    const list = column.reduce((pre, cur) => {
      if (cur.children.length > 0) {
        pre = [...pre, ...cur.children]
      }
      return pre
    },[])

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
        title: '栏目',
        dataIndex: 'articleCname',
      },
      {
        title: '是否置顶',
        dataIndex: 'articleTopState',
        render: (text) => {
          return <span>{text?'是':'否'}</span>
        }, 
      },
      {
        title: '是否推荐',
        dataIndex: 'articleHotState',
        render: (text) => {
          return <span>{text?'是':'否'}</span>
        }, 
      },
      {
        title: '操作人',
        dataIndex: 'articlePname',
      },
      {
        title: '发布时间',
        dataIndex: 'updateTime',
        render: text => {
          return <span>{moment(+text).format('lll')}</span>
        },
      },
      {
        title: '操作',
        dataIndex: 'operation',
        render: (text, row) => {
          return (
            <Fragment>
              <Popconfirm
                title="取消后开放门户将无法看到此篇文章，您是否确认取消发布?"
                onConfirm={() => this.publishCancel(row)}
                >
                <a className="mr16">取消发布</a>
              </Popconfirm>
              <a onClick={() => this.handleSet(row, list, firstColumn)} className="mr16">
                设置
              </a>
              <a onClick={() => this.copyUrl(row)}>复制地址</a>
            </Fragment>
          )
        },
      },
    ]

    columns.forEach(item => {
      item.align = 'center'
    })

    const firstColumnComs = firstColumn.map(item => {
      // eslint-disable-line
      return (
        <Option value={item.value} key={item.value}>
          {item.label}
        </Option>
      )
    })
    const secondColumnComs = secondColumn.map(item => {
      // eslint-disable-line
      return (
        <Option value={item.value} key={item.value}>
          {item.label}
        </Option>
      )
    })
    // const topComs = topList.map(item => {
    //   // eslint-disable-line
    //   return (
    //     <Option value={item.value} key={item.value}>
    //       {item.label}
    //     </Option>
    //   )
    // })
    // const recommendComs = recommendList.map(item => {
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
              placeholder="发布名称"
              onPressEnter={this.handleSearch}
              onChange={this.handleNameChange}
              className={styles.name}
              />
            <Input
              placeholder="发布人"
              onPressEnter={this.handleSearch}
              onChange={this.handleSystemChange}
              className={styles.name}
              />
            <Cascader options={column} onChange={this.handleTypeChange} placeholder="栏目" style={{ marginRight: 16 }} displayRender={label => [...label].pop()} />
            <RangePicker onChange={this.handlePickChange} className={styles.date} />
            <Checkbox onChange={this.recommendChange}>推荐</Checkbox>
            <Checkbox onChange={this.topchangeHandle}>置顶</Checkbox>
            <Button type="primary" onClick={this.handleSearch} icon="search">
              搜索
            </Button>
          </div>
          <div className={styles.bar}>
            <Button type="primary" className={styles.button}>
              <Link to="/portalManagement/publication">去发布</Link>
            </Button>
          </div>
          <div>
            <Table
              bordered
              columns={columns}
              dataSource={releasedList}
              pagination={pagination && {...pagination, showQuickJumper: true, showTotal: (total) => `共 ${Math.ceil(total / pagination.pageSize)}页 / ${total}条 数据`}}
              loading={loading}
              rowKey="articleId"
              onChange={this.handleStandardTableChange}
              />
          </div>
          <Modal
            visible={showModal}
            onCancel={() => this.setState({ showModal: false })}
            title="设置"
            >
            <Form>
              <Form.Item label="栏目" labelCol={{ span: 5 }} wrapperCol={{ span: 19 }}>
                <Select onChange={(value) => this.firstColumnChange(value, firstColumn)} value={firstColumnValue} className={styles.selectInner1}>{firstColumnComs}</Select>
                <Select onCancel={this.secondColumnChange} value={secondColumnValue} className={styles.selectInner2}>{secondColumnComs}</Select>
              </Form.Item>
              <Form.Item label="是否置顶" labelCol={{ span: 5 }} wrapperCol={{ span: 12 }}>
                <Radio.Group value={articleTopState}>
                  <Radio value={1}>是</Radio>
                  <Radio value={0}>否</Radio>
                </Radio.Group>
              </Form.Item>
              <Form.Item label="是否为推荐" labelCol={{ span: 5 }} wrapperCol={{ span: 12 }}>
                <Radio.Group value={articleHotState}>
                  <Radio value={1}>是</Radio>
                  <Radio value={0}>否</Radio>
                </Radio.Group>
              </Form.Item>
            </Form>
          </Modal>
        </div>
      </PageHeaderLayout>
    )
  }
}
