/*
 * @Author: ChouEric
 * @Date: 2018-07-04 17:32:51
 * @Last Modified by: ChouEric
 * @Last Modified time: 2018-08-24 15:52:12
 * 描述: 开放门户管理 -- 资讯管理 -- 发布管理 -- 发布
*/
import React, { Component } from 'react'
import { Button, Form, Input, Select, Table, DatePicker, Radio, Modal } from 'antd'
import moment from 'moment'
import { Link } from 'dva/router'
import { connect } from 'dva'

import { format0, format24 } from '../../utils/utils'
import PageHeaderLayout from '../../layouts/PageHeaderLayout'
import styles from './Publication.less'

const { Option } = Select
const classifyList = [
  {
    value: -1,
    label: '全部分类',
  },
  {
    value: 0,
    label: '政策',
  },
  {
    value: 1,
    label: '法律',
  },
  {
    value: 2,
    label: '工作报告',
  },
]
const data = []
for (let i = 0; i < 255; i++) {
  const random = Math.ceil(Math.random() * 3)
  data.push({
    id: i,
    title: `标题${i}`,
    classify: classifyList[random].label,
    operator: `操作人人${i}`,
    time: moment(new Date() - 1000 * 60 * 60 * 13 * i).format('lll'),
  })
}
@connect(({ articlePublication, loading }) => ({
  articlePublication,
  loading: loading.models.articlePublication,
}))
export default class Publication extends Component {
  state = {
    queryData: {
      time: [],
    },
    publishData: {},
    secondColumnList: [],
    isChange: false,
    // selectRowKeys: [],
    showModal: false,
    articleId: undefined,
  }

  componentDidMount() {
    this.props.dispatch({
      type: 'articlePublication/getArticleNoRelease',
      payload: {
        body: {
          pageSize: 10,
          pageNum: 1,
        },
      },
    })
    this.props.dispatch({
      type: 'articlePublication/getCategoryList',
      payload: {
        body: {
          pageNum: 0,
          pageSize: 0,
        },
      },
    })
    this.props.dispatch({
      type: 'articlePublication/getColumnList',
    })
  }

  // eslint-disable-next-line
  titleChange = e => {
    const { queryData } = this.state
    this.setState({
      queryData: {
        ...queryData,
        articleTitle: e.target.value,
      },
      isChange: true,
    })
  }

  operatorChange = e => {
    const { queryData } = this.state
    this.setState({
      queryData: {
        ...queryData,
        articlePname: e.target.value,
      },
      isChange: true,
    })
  }

  classifyChange = value => {
    const { queryData } = this.state
    this.setState({
      queryData: {
        ...queryData,
        articleFid: value === '全部分类' ? undefined : value,
      },
      isChange: true,
    })
  }

  timeChange = value => {
    const { queryData } = this.state
    this.setState({
      queryData: {
        ...queryData,
        time: value,
      },
      isChange: true,
    })
  }

  search = () => {
    if (!this.state.isChange) return false
    const { queryData } = this.state
    const pagination = {
      pageNum:1,
      pageSize: 10,
    }
    const body = {
      ...queryData,
      createTime: queryData.time[0] ? format0(+queryData.time[0].format('x')) : undefined,
      updateTime: queryData.time[1] ? format24(+queryData.time[1].format('x')) : undefined,
    }
    delete body.time
    this.props.dispatch({
      type: 'articlePublication/getArticleNoRelease',
      payload: {
        body: {
          ...body,
          ...pagination,
        },
      },
    })
  }

  tableChange = pagination => {
    const { queryData } = this.state
    const body = {
      ...queryData,
      createTime: queryData.time[0] ? format0(+queryData.time[0].format('x')) : undefined,
      updateTime: queryData.time[1] ? format24(+queryData.time[1].format('x')) : undefined,
    }
    delete body.time
    this.props.dispatch({
      type: 'articlePublication/getArticleNoRelease',
      payload: {
        body: {
          ...body,
          pageNum: pagination.current,
          pageSize: pagination.pageSize,
        },
      },
    })
  }

  firstColumnChange = (value, columnObejct) => {
    this.setState({
      secondColumnList: columnObejct[value],
    })
  }

  secondColumnChange = value => {
    const { publishData, secondColumnList } = this.state
    this.setState({
      publishData: {
        ...publishData,
        articleCid: +value,
        articleCname: secondColumnList.filter(item => item.value === value)[0] && secondColumnList.filter(item => item.value === value)[0].label,
      },
    })
  }

  recommendChange = e => {
    const { publishData } = this.state
    this.setState({
      publishData: {
        ...publishData,
        articleHotState: e.target.value ==='是' ? 1 : 0,
      },
    })
  }

  ontopstateChange = e => {
    const { publishData } = this.state
    this.setState({
      publishData: {
        ...publishData,
        articleTopState: e.target.value ==='是' ? 1 : 0,
      },
    })
  }

  handlePublic = row => {
    this.setState({
      showModal: true,
      articleId: row.articleId,
    })
  }

  handlePublish = () => {
    const { articleId, publishData: { articleCid, articleCname, articleTopState, articleHotState } } = this.state
    const body = {
      articleId,
      articleCid,
      articleCname,
      articleTopState,
      articleHotState,
      articleOpenState: 1,
      articlePname: localStorage.getItem('accountRealName') || localStorage.getItem('accountName') || localStorage.getItem('accountId'),
    }
    this.props.dispatch({
      type: 'articlePublication/changeAricleState',
      payload: {
        body,
      },
    })
    this.setState({
      showModal: false,
    })
  }

  render() {
    const { showModal, secondColumnList } = this.state
    const { articlePublication: { noReleaseList, pagination, category, column, columnObejct }, loading } = this.props
    const columns = [
      {
        title: '序号',
        dataIndex: 'articleId',
        render(text) {
          return (
            <div>
              <span style={{ marginLeft: 8 }}>{text}</span>
            </div>
          )
        },
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
        render: text => {
          return <span>{moment(+text).format('lll')}</span>
        },
      },
      {
        title: '操作',
        render: (text, row) => {
          return <a onClick={() => this.handlePublic(row)}>发布</a>
        },
      },
    ]
    columns.forEach(item => {
      item.align = 'center'
    })

    const classifyComs = category.map(item => {
      return (
        <Select.Option value={item.categoryId} key={item.categoryId}>
          {item.categoryName}
        </Select.Option>
      )
    })
    const firstComs = column.map(item => {
      // eslint-disable-line
      return (
        <Option value={item.value} key={item.value}>
          {item.label}
        </Option>
      )
    })
    const secondeComs = secondColumnList.map(item => {
      return (
        <Option value={item.value} key={item.value}>
          {item.label}
        </Option>
      )
    })
    return (
      <PageHeaderLayout>
        <div className="clearfix btncls">
          <Link to="/portalManagement/publicationManagement" className="fr mr40">
            <Button>返回</Button>
          </Link>
          {/* <Button type="primary" onClick={this.handlePublic} className="fr mr40">
            开始发布
          </Button> */}
        </div>
        <div className="common-layout">
          <Form className={styles.search}>
            <Input
              onChange={this.titleChange}
              className={styles.input}
              placeholder="标题"
              />
            <Select defaultValue='全部分类' onChange={this.classifyChange} className={styles.select}>
              {classifyComs}
            </Select>
            <Input
              onChange={this.operatorChange}
              className={styles.input}
              placeholder="操作人"
              />
            <DatePicker.RangePicker
              onChange={this.timeChange}
              className={styles.picker}
              />
            <Button type="primary" icon="search" onClick={this.search}>
              搜索
            </Button>
          </Form>
          <Table
            loading={loading}
            columns={columns}
            dataSource={noReleaseList}
            // rowSelection={rowSelection}
            pagination={pagination && {...pagination, showQuickJumper: true, showTotal: (total) => `共 ${Math.ceil(total / pagination.pageSize)}页 / ${total}条 数据`}}
            rowKey="articleId"
            bordered
            onChange={this.tableChange}
            />
        </div>
        <Modal
          visible={showModal}
          onOk={this.handlePublish}
          onCancel={() => this.setState({ showModal: false })}
          title="设置"
          >
          <Form>
            <Form.Item label="栏目" labelCol={{ span: 5 }} wrapperCol={{ span: 19 }}>
              <Select className={styles.selectInner1} onChange={(value) => this.firstColumnChange(value, columnObejct)}>{firstComs}</Select>
              <Select className={styles.selectInner2} onChange={this.secondColumnChange}>{secondeComs}</Select>
            </Form.Item>
            <Form.Item label="是否置顶" labelCol={{ span: 5 }} wrapperCol={{ span: 12 }}>
              <Radio.Group onChange={this.ontopstateChange}>
                <Radio value="是">是</Radio>
                <Radio value="否">否</Radio>
              </Radio.Group>
            </Form.Item>
            <Form.Item label="是否为推荐" labelCol={{ span: 5 }} wrapperCol={{ span: 12 }}>
              <Radio.Group onChange={this.recommendChange}>
                <Radio value="是">是</Radio>
                <Radio value="否">否</Radio>
              </Radio.Group>
            </Form.Item>
          </Form>
        </Modal>
      </PageHeaderLayout>
    )
  }
}
