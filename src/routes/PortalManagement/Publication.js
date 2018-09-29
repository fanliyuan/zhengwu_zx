/*
 * @Author: ChouEric
 * @Date: 2018-07-04 17:32:51
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2018-09-29 17:12:41
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

class MySelect extends Component {
  state = {
    second: undefined,
  }

  componentWillReceiveProps(nextProps) {
    // console.log(nextProps.value)
    if (this.props.value !== nextProps.value) {
      this.setState({
        second: nextProps.value,
      })
    }
  }

  firstColumnChange = value => {
    this.props.firstColumnChange.call(null, value)
  }

  secondColumnChange = value => {
    this.setState({
      second: value,
    })
    this.props.secondColumnChange(value)
  }

  render() {
    const { firstClassName, secondClassName, firstComs, secondeComs } = this.props
    const { second } = this.state
    return (
      <div>
        <Select className={firstClassName} onChange={this.firstColumnChange}>{firstComs}</Select>
        <Select value={second} className={secondClassName} onChange={this.secondColumnChange}>{secondeComs}</Select>
      </div>
    )
  }
}

@connect(({ articlePublication, loading }) => ({
  articlePublication,
  loading: loading.models.articlePublication,
}))
@Form.create()
export default class Publication extends Component {
  state = {
    queryData: {
      time: [],
    },
    queryParams: {},
    publishData: {
    },
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
    const queryParams = {
      ...queryData,
      createTime: queryData.time[0] ? format0(+queryData.time[0].format('x')) : undefined,
      updateTime: queryData.time[1] ? format24(+queryData.time[1].format('x')) : undefined,
    }
    delete queryParams.time
    this.props.dispatch({
      type: 'articlePublication/getArticleNoRelease',
      payload: {
        body: {
          ...queryParams,
          ...pagination,
        },
      },
    })
    this.setState({
      isChange: false,
      queryParams,
    })
  }

  tableChange = pagination => {
    const { queryParams } = this.state
    this.props.dispatch({
      type: 'articlePublication/getArticleNoRelease',
      payload: {
        body: {
          ...queryParams,
          pageNum: pagination.current,
          pageSize: pagination.pageSize,
        },
      },
    })
  }

  firstColumnChange = (value, columnObejct) => {
    this.setState({
      secondColumnList: columnObejct[value],
    }
    , () => {
      this.props.form.setFieldsValue({
        columns: [...this.state.secondColumnList].shift() && [...this.state.secondColumnList].shift().value,
      })
    }
    )
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
    this.props.form.setFieldsValue({
      columns: value,
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
    this.props.form.validateFieldsAndScroll((errors,values) =>{
      // console.log(values)
      if (!errors) {
        const { articleId, publishData: { articleCname, articleTopState, articleHotState } } = this.state // articleCid, 
        // console.log(articleCids)
        const body = {
          articleId,
          articleCid:values.columns,
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
    })
  }

  render() {
    const { showModal, secondColumnList } = this.state
    const { articlePublication: { noReleaseList, pagination, category, column, columnObejct }, loading, form: { getFieldDecorator } } = this.props
    const columns = [
      {
        title: '序号',
        dataIndex: 'index',
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
              {
                getFieldDecorator('columns', {
                  rules: [
                    {
                      required: true,
                      message: '请选择栏目',
                    },
                  ],
                })(
                  <MySelect firstClassName={styles.selectInner1} secondClassName={styles.selectInner2} firstComs={firstComs} secondeComs={secondeComs} firstColumnChange={(value) => this.firstColumnChange(value, columnObejct)} secondColumnChange={this.secondColumnChange} />
                )
              }
              {/* 这里不能使用两个表单域修饰,只能自己封装 */}
              {/* {
                getFieldDecorator('column2', {
                  rules: [
                    {
                      required: true,
                      message: '请选择栏目',
                    },
                  ],
                })(
                  <Select className={styles.selectInner2} onChange={this.secondColumnChange}>{secondeComs}</Select>
                )
              } */}
            </Form.Item>
            <Form.Item label="是否置顶" labelCol={{ span: 5 }} wrapperCol={{ span: 12 }}>
              {
              getFieldDecorator('top', {
                rules: [
                  {
                    required: true,
                    message: '请选择是否置顶',
                  },
                ],
              })(
                <Radio.Group onChange={this.ontopstateChange}>
                  <Radio value="是">是</Radio>
                  <Radio value="否">否</Radio>
                </Radio.Group>
              )
            }
            </Form.Item>
            <Form.Item label="是否为推荐" labelCol={{ span: 5 }} wrapperCol={{ span: 12 }}>
              {
                getFieldDecorator('recommend', {
                  rules: [
                    {
                      required: true,
                      message: '请选择是否推荐',
                    },
                  ],
                })(
                  <Radio.Group onChange={this.recommendChange}>
                    <Radio value="是">是</Radio>
                    <Radio value="否">否</Radio>
                  </Radio.Group>
                )
              }
            </Form.Item>
          </Form>
        </Modal>
      </PageHeaderLayout>
    )
  }
}
