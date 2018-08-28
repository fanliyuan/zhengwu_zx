/*
 * @Author: ChouEric
 * @Date: 2018-07-03 15:27:04
 * @Last Modified by: ChouEric
 * @Last Modified time: 2018-07-20 10:00:21
 * @描述: 开发门户管理 -- 目录分类 -- 目录分类管理
 *  
*/
import React, { Component, Fragment } from 'react'
import { connect } from 'dva'
import { Modal, DatePicker, Input, Select, Button, Table, Radio } from 'antd'
import moment from 'moment'

import PageHeaderLayout from '../../layouts/PageHeaderLayout'
import styles from './MenuManagement.less'

const { RangePicker } = DatePicker
const { Option } = Select

const data = []

for (let i = 0; i < 120; i++) {
  const randomNum = Math.round(Math.random())
  data.push({
    id: i,
    name: `类型${i}`,
    state: randomNum === 1 ? '未发布' : '已发布',
    recommend: randomNum === 1 ? '否' : '是',
    time: moment(new Date() - 1000 * 60 * 60 * 5 * i, 'x').format('lll'),
    operator: `操作人${i}`,
  })
}

@connect(({ portalManagement, loading }) => ({
  portalManagement,
  loading,
}))
export default class MenuManagement extends Component {
  state = {
    name: '',
    operator: '',
    state: '发布状态',
    recommend: '是否推荐',
    date: [],
    isChanged: false,
    showModal: false,
    modalTitle: '',
    defaultValue: '否',
  }

  componentDidMount() {
    const { dispatch } = this.props
    dispatch({
      type:'portalManagement/querys',
      payload:{pageNum:0,pageSize:10},
    })
  }

  handleNameChange = e => {
    this.setState({
      isChanged: true,
    })
    this.setState({
      name: e.target.value.trim(),
    })
  }

  handleOperatorChange = e => {
    this.setState({
      isChanged: true,
    })
    this.setState({
      operator: e.target.value.trim(),
    })
  }

  handleStateChange = value => {
    this.setState({
      state: value,
      isChanged: true,
    })
  }

  recommendChange = value => {
    this.setState({
      recommend: value,
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

  handleModal = (row, modalTitle) => {
    this.setState({
      showModal: true,
      modalTitle,
      defaultValue: row.recommend,
    })
  }

  handleReccomend = e => {
    this.setState({
      defaultValue: e.target.value,
    })
  }

  render() {
    const {
      name,
      date,
      operator,
      state,
      recommend,
      showModal,
      modalTitle,
      defaultValue,
    } = this.state
    const { portalManagement:{ lists }, loading } = this.props
    const stateList = [
      {
        value: 0,
        label: '已发布',
      },
      {
        value: 1,
        label: '未发布',
      },
    ]
    const recommendList = [
      {
        value: 0,
        label: '是',
      },
      {
        value: 1,
        label: '否',
      },
    ]

    const columns = [
      {
        title: '序号',
        dataIndex: 'id',
      },
      {
        title: '分类名称',
        dataIndex: 'typeName',
      },
      {
        title: '发布状态',
        dataIndex: 'typeState',
        render: (text) => {
          return +text === 0 ? '未发布': '已发布'
        },
      },
      {
        title: '是否推荐',
        dataIndex: 'typeHotState',
        render: (text) => {
          return +text === 0 ? '未发布': '已发布'
        },
      },
      {
        title: '操作人',
        dataIndex: 'creator',
      },
      {
        title: '操作时间',
        dataIndex: 'time',
      },
      {
        title: '操作',
        dataIndex: 'operation',
        render: (text, row) => {
          if (row.state === '未发布') {
            return <a onClick={() => this.handleModal(row, '发布')}>发布</a>
          }
          return (
            <Fragment>
              <a className="mr16" onClick={() => this.handleModal(row, '取消发布')}>
                取消发布
              </a>
              <a onClick={() => this.handleModal(row, '设置')}>设置</a>
            </Fragment>
          )
        },
      },
    ]
    // const rowSelection = {
    //   selectedRowKeys,
    //   onChange: (rowKeys) => {
    //     this.setState({
    //       selectedRowKeys: rowKeys,
    //     })
    //   },
    // }

    columns.forEach(item => {
      item.align = 'center'
    })

    // const typeComs = stateList.map(item => { // eslint-disable-line
    //   return <Option value={item.value} key={item.value}>{item.label}</Option>
    // })
    // 封装方法
    const getSelectOptions = (list = []) => {
      return list.map(item => {
        return (
          <Option value={item.value} key={item.value}>
            {item.label}
          </Option>
        )
      })
    }

    return (
      <PageHeaderLayout>
        <div className={styles.layout}>
          <div className={styles.search}>
            <Input
              placeholder="分类名称"
              value={name}
              onPressEnter={this.handleSearch}
              onChange={this.handleNameChange}
              className={styles.name}
              />
            <Select value={state} onChange={this.handleStateChange} className={styles.select}>
              {getSelectOptions(stateList)}
            </Select>
            <Select value={recommend} onChange={this.recommendChange} className={styles.select}>
              {getSelectOptions(recommendList)}
            </Select>
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
              dataSource={lists}
              // rowSelection={rowSelection}
              // pagination={pagination && {...pagination, showQuickJumper: true, showTotal: (total) => `共 ${Math.ceil(total / pagination.pageSize)}页 / ${total}条 数据`}}
              loading={loading}
              rowKey="typeId"
              // onChange={this.handleStandardTableChange}
              />
          </div>
          <Modal
            visible={showModal}
            title={modalTitle || '确认执行此操作?'}
            onCancel={() => this.setState({ showModal: false })}
            >
            {modalTitle === '发布' ? (
              <Fragment>
                <span className={styles.label}>是否推荐</span>
                <span>
                  <Radio.Group value={defaultValue} onChange={this.handleReccomend}>
                    <Radio value="是">是</Radio>
                    <Radio value="否">否</Radio>
                  </Radio.Group>
                </span>
              </Fragment>
            ) : null}
            {modalTitle === '取消发布' ? (
              <Fragment>
                <span>取消发布后将不在开放门户展示，请确认是否取消发布？</span>
              </Fragment>
            ) : null}
            {modalTitle === '设置' ? (
              <Fragment>
                <span className={styles.label}>是否推荐</span>
                <span>
                  <Radio.Group value={defaultValue} onChange={this.handleReccomend}>
                    <Radio value="是">是</Radio>
                    <Radio value="否">否</Radio>
                  </Radio.Group>
                </span>
              </Fragment>
            ) : null}
          </Modal>
        </div>
      </PageHeaderLayout>
    )
  }
}
