/*
 * @Author: ChouEric
 * @Date: 2018-07-03 11:27:26
 * @Last Modified by: ChouEric
 * @Last Modified time: 2018-09-29 09:43:12
 * @描述: 所有订阅
*/
import React, { Component, Fragment } from 'react'
import { connect } from 'dva'
import { Link, routerRedux } from 'dva/router'
import { DatePicker, Input, Select, Button, Table, Tabs, message, Popconfirm, Modal, Tooltip, Tree, Icon, Badge } from 'antd'
import moment from 'moment'
import { isArray } from 'util'

import PageHeaderLayout from '../../layouts/PageHeaderLayout'
import { getName, getAddress } from '../../utils/faker'
import styles from './AllSub.less'
// import { format0, format24 } from '../../utils/utils'

const { RangePicker } = DatePicker
const { Option } = Select
const { TabPane } = Tabs
const { confirm } = Modal
const { DirectoryTree, TreeNode } = Tree

function renderTreeNode(renderList) {
  if (!isArray(renderList)) {
    return null
  }
  return renderList.map(item => {
    if (!isArray(item.children)) {
      return <TreeNode title={item.title || '佚名'} key={item.key} isLeaf />
    } else {
      return (
        <TreeNode title={item.title || '佚名'} key={item.key}>
          {renderTreeNode(item.children)}
        </TreeNode>
      )
    }
  })
}
/** 
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
*/

function getData2() {
  const data = []
  for (let i = 0; i < 120; i++) {
    data.push({
      id: i,
      name: `订阅名${i}`,
      operator: getName(),
      publicationName: `${getAddress()}发布${i}`,
      theme: `机构${i}`,
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
      theme: `机构${i}`,
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
// const data1 = getData1()
const data2 = getData2()
const data3 = getData3()
let directoryData = {}

// @connect(({ overviewLogging, loading }) => ({
//   overviewLogging,
//   loading: loading.models.overviewLogging,
// }))
@connect(({ catalogManagement, allSubscription, loading }) => ({ catalogManagement, allSubscription, loading: loading.models.allSubscription }))
export default class AllSub extends Component {
  state = {
    queryData: {},
    isChanged: false,
    selectKeys: [],
    isNodeOperator: false,
    modalVisible:false,
    query: '',
  }

  componentDidMount() {
    this.setState({
      isNodeOperator: localStorage.getItem('antd-pro-authority') === 'operator-n',
    })
    this.props.dispatch({
      type: 'catalogManagement/getCatalogList',
    })
    this.handleSearch({pageSize: 10, current: 1})
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.catalogManagement.catalogQueryData !== this.state.query) {
      this.setState({
        query: nextProps.catalogManagement.catalogQueryData,
      })
    }
  }

  handleThemeChange = () => {

  }

  handleNameChange = e => {
    const { queryData } = this.state
    this.setState({
      queryData: {
        ...queryData,
        subscriberName: e.target.value.trim(),
      },
      isChanged: true,
    })
  }

  handleOrganizationChange = e => {
    // console.log(e.target.value)// eslint-disable-line
    const { queryData } = this.state
    this.setState({
      queryData: {
        ...queryData,
        subscriberDeptName: e.target.value.trim(),
      },
      isChanged: true,
    })
  }

  handSelectChange = val => {
    const { queryData } = this.state
    this.setState({
      queryData: {
        ...queryData,
        runStatus: val === '-1'?undefined:val,
      },
      isChanged: true,
    })
  }

  handlePick = val => {
    const { queryData } = this.state
    this.setState({
      queryData: {
        ...queryData,
        createTime: val[0] && val[0].format().substr(0,10),
        updateTime: val[1] && val[1].format().substr(0,10),
      },
      isChanged: true,
    })
  }

  handleSearch = ({pageSize=10, current: pageNum=1} = {}, flag) => {
    if (!this.state.isChanged && flag) return null // eslint-disable-line
    // console.log(this.state.queryData) // eslint-disable-line
    const { queryData: { createTime, updateTime, subscriberName, dsDir, runStatus, subscriberDeptName } } = this.state
    this.props.dispatch({
      type: 'allSubscription/getSubscription',
      payload: {
        body: {
          dsDir,
          subscriberDeptName,
          subscriberName,
          runStatus,
          createTime,
          updateTime,
          pageNum,
          pageSize,
        },
      },
    })
    this.setState({
      isChanged: false,
    })
  }

  handleFocus = () => {
    this.modalShow()
  }

  handleStandardTableChange = pagination => {
    // console.log(pagination) // eslint-disable-line
    this.handleSearch(pagination)
  }

  modalOk = () => {
    // console.log(directoryData)
    const { queryData } = this.setState
    this.setState({
      modalVisible:false,
      queryData: {
        ...queryData,
        dsDir: directoryData && directoryData.key,
        classifyId: directoryData && directoryData.key,
        classisyName: directoryData && directoryData.props.title,
      },
      isChanged: true,
    })
  }

  modalCancel = () => {
    this.setState({
      modalVisible:false,
    })
  }

  modalShow = () => {
    this.setState({
      modalVisible:true,
    })
  }

  treeListChange = e => {
    this.setState({
      query: e.target.value.trim(),
    })
  }
  
  handleSearchList = () => {
    const { query } = this.state
    this.props.dispatch({
      type: 'catalogManagement/queryCatalog',
      payload: query,
    })
  }

  directoryChange = (val, e) => {
    // console.log(val)// eslint-disable-line
    directoryData = e && e.selectedNodes[0]
  }

  handleClear = () => {
    const { queryData } = this.state
    this.setState({
      queryData: {
        ...queryData,
        dsDir: undefined,
        classisyName: undefined,
        classifyId: undefined,
      },
      isChanged: true,
    })
  }

  render() {
    const { selectKeys, isNodeOperator, modalVisible, queryData: { classisyName }, query } = this.state
    const { catalogManagement: { catalogTreeList, catalogList }, allSubscription: { dataList, pagination }, loading } = this.props // eslint-disable-line

    const stateList = [
      {
        value: '-1',
        label: '全部状态',
      },
      {
        value: '1',
        label: '运行中',
      },
      {
        value: '0',
        label: '已停止',
      },
    ]

    const columns = [
      // {
      //   title: '序号',
      //   dataIndex: 'id',
      // },
      {
        title: '订阅名称',
        dataIndex: 'subscriberName',
      },
      {
        title: '订阅申请人',
        dataIndex: 'subscriberPeople',
      },
      {
        title: '订阅时间',
        dataIndex: 'subscriberTime',
        render: (text) => {
          return moment(text).format('lll')
        },
      },
      // {
      //   title: '目录名称',
      //   dataIndex: 'menu',
      // },
      // {
      //   title: '订阅机构',
      //   dataIndex: 'organization',
      // },
      {
        title: '目录名称',
        dataIndex: 'dsName',
      },
      {
        title: '发布机构',
        dataIndex: 'publisherDeptName',
      },
      {
        title: '运行状态',
        dataIndex: 'state',
        render: (text) => {
          return <Badge status={text?'success': 'default'} text={text?'运行中':'已停止'} />
        },
      },
      {
        title: '操作',
        dataIndex: 'operation',
        render: (text, row) => {
          return row.state === '运行中' ? (
            <Fragment>
              {!isNodeOperator && (
                <a className='mr8' onClick={() => this.props.dispatch(routerRedux.push(`/dataSwitchManagement/${row.type === 'file' ? 'subscriptionFile' : 'subscriptionTable'}`, {subInfo: row}))}>查看</a>
              )}
              {isNodeOperator && (
                <Link to={`/dataSwitchManagement/logAudit/${row.id}`}>审核日志</Link>
              )}
              {/* <a onClick={() => this.handleTask(row)}>
                任务
              </a> */}
            </Fragment>
          ) : (
            <Fragment>
              {isNodeOperator && (
                // <Popconfirm
                //   title={
                //     <div>
                //       <div>您是否确定启动？</div>
                //       <div>启动后可进行采集数据！</div>
                //     </div>
                //   }
                //   onConfirm={() => message.success('已启动')}
                //   >
                +row.id % 2 === 0 ?
                  <Link className="mr8" to={`/dataSwitchManagement/subscriptionTable/${row.id}`}>修改</Link>
                  :
                  <Link className="mr8" to={`/dataSwitchManagement/subscriptionFile/${row.id}`}>修改</Link>
                )}
              {!isNodeOperator && (
                <a className='mr8' onClick={() => this.props.dispatch(routerRedux.push(`/dataSwitchManagement/${row.type === 'file' ? 'subscriptionFile' : 'subscriptionTable'}`, {subInfo: row}))}>查看</a>
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
    if(!isNodeOperator){
      columns.splice(3,0,{
        title: '订阅机构',
        dataIndex: 'subscriberDeptName',
      })
    }
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
        title: '目录名称',
        dataIndex: 'publicationName',
      },
      {
        title: '发布机构',
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
        dataIndex: 'subscriberName',
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
        title: '目录名称',
        dataIndex: 'publicationName',
      },
      {
        title: '发布机构',
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

    // const menuData = [
    //   {
    //     title: '01|-雄安政务信息资源',
    //     key: '4',
    //   },
    //   {
    //     title: '02|-雄安市民服务中心信息资源',
    //     key: '5',
    //   },
    //   {
    //     title: '03|-雄安个人数据信息资源',
    //     key: '6',
    //   },
    //   {
    //     title: '001|-药品局',
    //     key: '7',
    //   },
    //   {
    //     title: '002|-医疗器械',
    //     key: '8',
    //   },
    //   {
    //     title: '130|-保定',
    //     key: '1',
    //     children: [
    //       {
    //         title: '638|-雄县',
    //         key: '1-1',
    //       },
    //       {
    //         title: '632|-安新县',
    //         key: '1-2',
    //       },
    //       {
    //         title: '629|-容城县',
    //         key: '1-3',
    //       },
    //     ],
    //   },
    //   {
    //     title: '132|-雄安新区',
    //     key: '2',
    //     children: [
    //       {
    //         title: '1|-政府',
    //         key: '2-1',
    //       },
    //       {
    //         title: '1|-政府',
    //         key: '2-2',
    //       },
    //     ],
    //   },
    //   {
    //     title: '1306|-XA政务信息资源',
    //     key: '3',
    //     children: [
    //       {
    //         title: '1|-直属委办局',
    //         key: '3-1',
    //       },
    //       {
    //         title: '123|住房和城乡建设局',
    //         key: '3-2',
    //       },
    //       {
    //         title: '124|环境保护局',
    //         key: '3-3',
    //       },
    //       {
    //         title: '125|旅游文物局',
    //         key: '3-4',
    //       },
    //       {
    //         title: '126|规划局',
    //         key: '3-5',
    //       },
    //     ],
    //   },
    // ]

    return (
      <PageHeaderLayout>
        <div className={styles.layout}>
          <Tabs className={tabscls} defaultActiveKey='hasSubscribed'>
            <TabPane tab="已订阅" key="hasSubscribed">
              <div className={styles.search}>
                <Input
                  value={classisyName}
                  title={classisyName}
                  className={styles.theme}
                  placeholder="点击选择分类"
                  onChange={this.handleThemeChange}
                  onClick={this.handleFocus}
                  suffix={<Icon type='close-circle' onClick={this.handleClear} className={styles.icon} />}
                  />
                <Input
                  placeholder="订阅名称" // 目录名称
                  onPressEnter={() => this.handleSearch({}, true)}
                  onChange={this.handleNameChange}
                  className={styles.name}
                  />
                <Input
                  className={styles.name}
                  placeholder={isNodeOperator ? '发布机构' : '订阅机构/发布机构'}
                  onPressEnter={() => this.handleSearch({}, true)}
                  onChange={this.handleOrganizationChange}
                  />
                <Select defaultValue='-1' onChange={this.handSelectChange} className={styles.state}>
                  {optionComs1}
                </Select>
                <RangePicker onChange={this.handlePick} className={styles.date} />
                <Button type="primary" onClick={() => this.handleSearch({}, true)} icon="search">
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
                  loading={loading}
                  bordered
                  columns={columns}
                  dataSource={dataList}
                  rowSelection={rowSelection}
                  rowKey="id"
                  pagination={pagination && { ...pagination,showQuickJumper: true, showTotal: (total) => `共 ${Math.ceil(total / pagination.pageSize)}页 / ${total}条 数据`}}
                  onChange={this.handleStandardTableChange}
                  />
              </div>
            </TabPane>
            {isNodeOperator && (
              <TabPane tab="待审核" key="willAudit">
                <div className={styles.search1}>
                  <Input
                    className={styles.theme}
                    placeholder="搜索分类"
                    onPressEnter={() => this.handleSearch({}, true)}
                    onChange={this.handleThemeChange}
                    onClick={this.handleFocus}
                    />
                  <Input
                    placeholder="订阅名称/目录名称"
                    onPressEnter={() => this.handleSearch({}, true)}
                    onChange={this.handleNameChange}
                    className={styles.name}
                    />
                  <Input
                    className={styles.theme}
                    placeholder="发布机构"
                    onPressEnter={() => this.handleSearch({}, true)}
                    onChange={this.handleThemeChange}
                    />
                  <Select onChange={this.handSelectChange} className={styles.state}>
                    {optionComs2}
                  </Select>
                  <RangePicker onChange={this.handlePick} className={styles.date} />
                  <Button type="primary" onClick={() => this.handleSearch({}, true)} icon="search">
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
                    className={styles.theme}
                    placeholder="搜索分类"
                    onPressEnter={() => this.handleSearch({}, true)}
                    onChange={this.handleThemeChange}
                    onClick={this.handleFocus}
                    />
                  <Input
                    placeholder="订阅名称/目录名称"
                    onPressEnter={() => this.handleSearch({}, true)}
                    onChange={this.handleNameChange}
                    className={styles.name}
                    />
                  <Input
                    className={styles.theme}
                    placeholder="发布机构"
                    onPressEnter={() => this.handleSearch({}, true)}
                    onChange={this.handleThemeChange}
                    />
                  <Select onChange={this.handSelectChange} className={styles.state}>
                    {optionComs2}
                  </Select>
                  <RangePicker onChange={this.handlePick} className={styles.date} />
                  <Button type="primary" onClick={() => this.handleSearch({}, true)} icon="search">
                    搜索
                  </Button>
                </div>
                <Table columns={failSubcribedColumns} dataSource={data3} bordered rowKey="id" />
              </TabPane>
            )}
          </Tabs>
          <Modal
            title="分类"
            visible={modalVisible}
            className={styles.modal}
            onOk={this.modalOk}
            onCancel={this.modalCancel}
            >
            {/* <div> */}
            <div className={styles.search}>
              <Input placeholder="请输入关键词" value={query} className={styles.input} onChange={this.treeListChange} onPressEnter={this.handleSearchList} />
              <Button type="primary" icon="search" onClick={this.handleSearchList} />
            </div>
            <div className="clearfix mt8">
              <Tooltip title="双击展开目录,单击选择文件" className="fr mr8">
                <Icon type="question-circle-o" />
              </Tooltip>
              <DirectoryTree
                defaultExpandAll
                onSelect={this.directoryChange}
                className={styles.tree}
                expandAction='doubleClick'
                >
                {renderTreeNode(0 in catalogList ? catalogList : catalogTreeList)}
              </DirectoryTree>
            </div>
            {/* </div> */}
          </Modal>
        </div>
      </PageHeaderLayout>
    )
  }
}
