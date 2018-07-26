/*
 * @Author: ChouEric
 * @Date: 2018-07-03 11:27:26
 * @Last Modified by: ChouEric
 * @Last Modified time: 2018-07-25 15:21:32
 * @描述: 所有订阅
*/
import React, { Component, Fragment } from 'react'
import { connect } from 'dva'
import { Link } from 'dva/router'
import { DatePicker, Input, Select, Button, Table, Tabs, message, Popconfirm, Modal } from 'antd'
import moment from 'moment'

import PageHeaderLayout from '../../layouts/PageHeaderLayout'
import { getName, getAddress, getDepartment } from '../../utils/faker'
import styles from './AllSub.less'

const { RangePicker } = DatePicker
const { Option } = Select
const { TabPane } = Tabs
const { confirm } = Modal

function getData1() {
  const data = []
  for (let i = 0; i < 120; i++) {
    data.push({
      id: i,
      name: `订阅名${i}`,
      person: getName(),
      organization: getAddress() + getDepartment(),
      menuName: `目录名称${i}`,
      menuOrganization: `目录发布机构${i}`,
      state: i % 3 === 0 ? '运行中' : '已停止',
      time: moment(new Date() - 1000 * 60 * 60 * 5 * i, 'x').format('lll'),
      menu: `目录名${i}`,
      type: Math.round(Math.random()) === 1 ? 'file' : 'table',
    })
  }
  return data
}
function getData2() {
  const data = []
  for (let i = 0; i < 120; i++) {
    data.push({
      id: i,
      name: `订阅名${i}`,
      operator: getName(),
      publicationName: `${getAddress()}发布${i}`,
      theme: `主题${i}`,
      state: i % 3 === 0 ? '上级待审核' : '发布方待审核',
      time: moment(new Date() - 1000 * 60 * 60 * 5 * i, 'x').format('lll'),
      menu: `目录名${i}`,
      dataType: Math.round(Math.random()) ? 'file' : 'table',
    })
  }
  return data
}
function getData3() {
  const data = []
  for (let i = 0; i < 120; i++) {
    data.push({
      id: i,
      name: `订阅名${i}`,
      operator: getName(),
      organization: `订阅机构${i}`,
      publicationName: `${getAddress()}发布${i}`,
      theme: `主题${i}`,
      menuName: `目录名称${i}`,
      munuOrganization: `目录发布机构${i}`,
      state: i % 3 === 0 ? '上级审核拒绝' : '发布方审核拒绝',
      time: moment(new Date() - 1000 * 60 * 60 * 5 * i, 'x').format('lll'),
      menu: `目录名${i}`,
      dataType: Math.round(Math.random()) ? 'file' : 'table',
    })
  }
  return data
}
const data1 = getData1()
const data2 = getData2()
const data3 = getData3()

// @connect(({ overviewLogging, loading }) => ({
//   overviewLogging,
//   loading: loading.models.overviewLogging,
// }))
@connect(({ login }) => ({ login }))
export default class AllSub extends Component {
  state = {
    name: '',
    theme: '',
    state: -1,
    date: [],
    isChanged: false,
    selectKeys: [],
    isNodeOperator: false,
  }

  componentDidMount() {
    this.setState({
      isNodeOperator: localStorage.getItem('antd-pro-authority') === 'operator-n',
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

  handleThemeChange = e => {
    this.setState({
      isChanged: true,
    })
    this.setState({
      theme: e.target.value.trim(),
    })
  }

  handSelectChange = val => {
    this.setState({
      isChanged: true,
    })
    this.setState({
      state: val,
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
    this.setState({
      isChanged: false,
    })
  }

  handleStandardTableChange = pagination => {
    console.log(pagination) // eslint-disable-line
  }

  render() {
    const { name, date, state, theme, selectKeys, organization, isNodeOperator } = this.state

    // const { overviewLogging: { data, pagination, stateList }, loading } = this.props

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
        title: '订阅名称',
        dataIndex: 'name',
      },
      {
        title: '订阅申请人',
        dataIndex: 'person',
      },
      {
        title: '订阅时间',
        dataIndex: 'time',
      },
      {
        title: '目录名称',
        dataIndex: 'menu',
      },
      {
        title: '订阅机构',
        dataIndex: 'organization',
      },
      {
        title: '目录名称',
        dataIndex: 'menuName',
      },
      {
        title: '目录发布机构',
        dataIndex: 'menuOrganization',
      },
      {
        title: '运行状态',
        dataIndex: 'state',
      },
      {
        title: '操作',
        dataIndex: 'operation',
        render: (text, row) => {
          return row.state === '运行中' ? (
            <Fragment>
              {isNodeOperator && (
                <Popconfirm
                  title={
                    <div>
                      <div>您是否确定停用？</div>
                      <div>停用后将暂停采集数据！</div>
                    </div>
                  }
                  onConfirm={() => message.success('已停止')}
                >
                  <a className="mr16">停止</a>
                </Popconfirm>
              )}
              {!isNodeOperator && (
                <Link
                  to={`/dataSwitchManagement/${
                    row.type === 'file' ? 'subscriptionFile' : 'subscriptionTable'
                  }/${row.id}`}
                  className="mr8"
                >
                  查看
                </Link>
              )}
              {isNodeOperator && (
                <Link to={`/dataSwitchManagement/logAudit/${row.id}`}>审核日志</Link>
              )}
            </Fragment>
          ) : (
            <Fragment>
              {isNodeOperator && (
                <Popconfirm
                  title={
                    <div>
                      <div>您是否确定启动？</div>
                      <div>启动后可进行采集数据！</div>
                    </div>
                  }
                  onConfirm={() => message.success('已启动')}
                >
                  <a className="mr8">运行</a>
                </Popconfirm>
              )}
              {!isNodeOperator && (
                <Link
                  to={`/dataSwitchManagement/${
                    row.type === 'file' ? 'subscriptionFile' : 'subscriptionTable'
                  }/${row.id}`}
                  className="mr8"
                >
                  查看
                </Link>
              )}
              {isNodeOperator && (
                <Popconfirm
                  title={`是否取消${row.name}的订阅`}
                  onConfirm={() => message.success('取消成功')}
                >
                  <a className="mr8">取消订阅</a>
                </Popconfirm>
              )}
              {isNodeOperator && (
                <Link to={`/dataSwitchManagement/logAudit/${row.id}`}>审核日志</Link>
              )}
            </Fragment>
          )
        },
      },
    ]
    const willAuditColumns = [
      {
        title: '序号',
        dataIndex: 'id',
      },
      {
        title: '订阅名称',
        dataIndex: 'name',
      },
      {
        title: '订阅申请人',
        dataIndex: 'operator',
      },
      {
        title: '订阅时间',
        dataIndex: 'time',
      },
      {
        title: '发布名称',
        dataIndex: 'publicationName',
      },
      {
        title: '所属主题',
        dataIndex: 'theme',
      },
      {
        title: '审批状态',
        dataIndex: 'state',
      },
      {
        title: '操作',
        dataIndex: 'operation',
        render: (text, row) => {
          return (
            <Fragment>
              {row.dataType === 'file' ? (
                <Link to={`subscriptionFile/${row.id}`} className="mr16">
                  设置
                </Link>
              ) : (
                <Link to={`subscriptionTable/${row.id}`} className="mr16">
                  设置
                </Link>
              )}
              <Link to={`logAudit/${row.id}`}>审核日志</Link>
            </Fragment>
          )
        },
      },
    ]
    const failSubcribedColumns = [
      {
        title: '序号',
        dataIndex: 'id',
      },
      {
        title: '订阅名称',
        dataIndex: 'name',
      },
      {
        title: '订阅申请人',
        dataIndex: 'operator',
      },
      {
        title: '订阅时间',
        dataIndex: 'time',
      },
      {
        title: '发布名称',
        dataIndex: 'publicationName',
      },
      {
        title: '所属主题',
        dataIndex: 'theme',
      },
      {
        title: '审批状态',
        dataIndex: 'state',
      },
      {
        title: '操作',
        dataIndex: 'operation',
        render: (text, row) => {
          return (
            <Fragment>
              {row.dataType === 'file' ? (
                <Link to={`subscriptionFile/${row.id}`} className="mr16">
                  查看
                </Link>
              ) : (
                <Link to={`subscriptionTable/${row.id}`} className="mr16">
                  查看
                </Link>
              )}
            </Fragment>
          )
        },
      },
    ]

    let rowSelection = {
      selectKeys,
      onChange: keys => {
        this.setState({
          selectKeys: keys,
        })
      },
    }
    if (!isNodeOperator) {
      rowSelection = null
    }

    columns.forEach(item => {
      item.align = 'center'
    })
    willAuditColumns.forEach(item => {
      item.align = 'center'
    })
    failSubcribedColumns.forEach(item => {
      item.align = 'center'
    })

    const optionComs1 = stateList.map(item => {
      return (
        <Option value={item.value} key={item.value}>
          {item.label}
        </Option>
      )
    })
    const optionComs2 = [
      { value: -1, label: '全部' },
      { value: 0, label: '上级待审核' },
      { value: 1, label: '发布方待审核' },
    ].map(item => (
      <Option value={item.value} key={item.value}>
        {item.label}
      </Option>
    ))

    const tabscls = isNodeOperator ? '' : styles.tabscls

    return (
      <PageHeaderLayout>
        <div className={styles.layout}>
          <Tabs className={tabscls}>
            <TabPane tab="已订阅" key="hasSubscribed">
              <div className={styles.search}>
                <Input
                  placeholder="订阅名称/发布名称"
                  value={name}
                  onPressEnter={this.handleSearch}
                  onChange={this.handleNameChange}
                  className={styles.name}
                />
                <Input
                  className={styles.theme}
                  placeholder="请输入主题"
                  value={theme}
                  onPressEnter={this.handleSearch}
                  onChange={this.handleThemeChange}
                />
                <Input
                  className={styles.name}
                  placeholder="订阅机构/发布机构"
                  value={organization}
                  onPressEnter={this.handleSearch}
                  onChange={this.handleOrganizationChange}
                />
                <Select value={state} onChange={this.handSelectChange} className={styles.state}>
                  {optionComs1}
                </Select>
                <RangePicker value={date} onChange={this.handlePick} className={styles.date} />
                <Button type="primary" onClick={this.handleSearch} icon="search">
                  搜索
                </Button>
              </div>
              {isNodeOperator && (
                <div className={styles.bar}>
                  {/* 这里含有模态框的确认 */}
                  <Button
                    className={styles.button}
                    onClick={() =>
                      confirm({
                        title: '是否确定?',
                        content: '此操作将启动所有已选择项',
                        onOk() {
                          message.success(`${selectKeys.join(',')}已经启动`)
                        },
                        okText: '确定',
                        cancelText: '取消',
                      })
                    }
                  >
                    启动
                  </Button>
                  <Button
                    className={styles.button}
                    onClick={() =>
                      confirm({
                        title: '是否确定?',
                        content: '此操作将停止所有已选择项',
                        onOk() {
                          message.success(`${selectKeys.join(',')}已经停止`)
                        },
                        okText: '确定',
                        cancelText: '取消',
                      })
                    }
                  >
                    停止
                  </Button>
                </div>
              )}
              <div>
                <Table
                  bordered
                  columns={columns}
                  dataSource={data1}
                  rowSelection={rowSelection}
                  rowKey="id"
                  onChange={this.handleStandardTableChange}
                />
              </div>
            </TabPane>
            {isNodeOperator && (
              <TabPane tab="待审核" key="willAudit">
                <div className={styles.search}>
                  <Input
                    placeholder="订阅名称/发布名称"
                    value={name}
                    onPressEnter={this.handleSearch}
                    onChange={this.handleNameChange}
                    className={styles.name}
                  />
                  <Input
                    className={styles.theme}
                    placeholder="请输入主题"
                    value={theme}
                    onPressEnter={this.handleSearch}
                    onChange={this.handleThemeChange}
                  />
                  <Select value={state} onChange={this.handSelectChange} className={styles.state}>
                    {optionComs2}
                  </Select>
                  <RangePicker value={date} onChange={this.handlePick} className={styles.date} />
                  <Button type="primary" onClick={this.handleSearch} icon="search">
                    搜索
                  </Button>
                </div>
                <Table columns={willAuditColumns} dataSource={data2} bordered rowKey="id" />
              </TabPane>
            )}
            {isNodeOperator && (
              <TabPane tab="订阅失败" key="failSubcribed">
                <div className={styles.search}>
                  <Input
                    placeholder="订阅名称/发布名称"
                    value={name}
                    onPressEnter={this.handleSearch}
                    onChange={this.handleNameChange}
                    className={styles.name}
                  />
                  <Input
                    className={styles.theme}
                    placeholder="请输入主题"
                    value={theme}
                    onPressEnter={this.handleSearch}
                    onChange={this.handleThemeChange}
                  />
                  <Select value={state} onChange={this.handSelectChange} className={styles.state}>
                    {optionComs2}
                  </Select>
                  <RangePicker value={date} onChange={this.handlePick} className={styles.date} />
                  <Button type="primary" onClick={this.handleSearch} icon="search">
                    搜索
                  </Button>
                </div>
                <Table columns={failSubcribedColumns} dataSource={data3} bordered rowKey="id" />
              </TabPane>
            )}
          </Tabs>
        </div>
      </PageHeaderLayout>
    )
  }
}
