import React, { Component } from 'react'
import { Card, Tabs, Table, Button } from 'antd'
import moment from 'moment'
import { connect } from 'dva'
import { routerRedux } from 'dva/router'

import PageHeaderLayout from '@/components/PageHeaderWrapper'
import styles from './Task.less'

const { TabPane } = Tabs

function getSyncfrequency(params) {
  if (typeof params !== 'string') {
    console.log('传入参数非字符串') // eslint-disable-line
    return undefined
  }
  let arr = params.split(',')
  if (arr.length !== 5) {
    console.log('传入参数长度不够') // eslint-disable-line
    return undefined
  }
  arr = arr.map(item => +item)// eslint-disable-line
  if (0 in arr.filter(item => isNaN(item))) {
    console.log('传入参数非数字形式') // eslint-disable-line
    return undefined
  }
  if (arr[3]) {
    return `每年${arr[3]}月${arr[2]}日${arr[1]}小时${arr[0]}分`
  }
  if (arr[2]) {
    return `每月${arr[2]}日${arr[1]}小时${arr[0]}分`
  }
  if (arr[4]) {
    return `每周${arr[4]}的${arr[1]}小时${arr[0]}分`
  }
  if (arr[1]) {
    return `每日${arr[1]}小时${arr[0]}分`
  }
  if (arr[0]) {
    return `每小时${arr[0]}分`
  }
}
@connect(({ catalogManagement, sourceManagement, loading }) => ({
  catalogManagement,
  sourceManagement,
  loading: loading.models.catalogManagement || loading.models.sourceManagement,
}))
export default class Task extends Component {
  state = {
    resourceInfo: {},
  }

  componentDidMount() {
    const { state: { resourceInfo = {}, resourceInfo: { mountResourceId } = {}, resourceId } = {} } = this.props.location
    this.props.dispatch({
      type: 'catalogManagement/getResourceTaskInfo',
      payload: {
        params: {
          id: resourceId, 
        },
      },
    })
    this.setState({
      resourceInfo,
    })
    if(mountResourceId) this.props.dispatch({
      type: 'sourceManagement/getEntityInfo',
      payload: {
        params: {
          id: mountResourceId,
        },
      },
    })
    this.props.dispatch({
      type: 'catalogManagement/getResourceTitle',
      payload: {
        params: {
          resourceId,
        },
      },
    })
  }

  handleBack = () => {
    const { dispatch } = this.props
    dispatch(routerRedux.push('/dataSourceManagement/catalogManagement'))
  }

  render() {
    const { loading, catalogManagement: { resourceTaskInfo: { pubMode, pubfreQuency, timSetting, taskState, createdTime, syncTime, dataSize }, resourceTitle: { dataType, updateTime } }, sourceManagement: { DBInfo: { value: { dbName } = {}, updataTime } = {} }} = this.props // eslint-disable-line
    const { resourceInfo: { resourceName, resourceProviderName } } = this.state
    // const pagination = {
    //   pageSize: 10,
    //   current: 1,
    // }
    const columns = [
      {
        title: 'ID',
        dataIndex: 'id',
        align: 'center',
      },
      {
        title: '操作',
        dataIndex: 'operation',
        align: 'center',
        render(text) {
          return +text === 0 ? '启动' : '停止'
        },
      },
      {
        title: '操作方式',
        dataIndex: 'operationStyle',
        align: 'center',
        render(text) {
          return +text === 0 ? '自动' : +text === 1 ? '手动' : '实时'
        },
      },
      {
        title: '登录结果',
        dataIndex: 'result',
        align: 'center',
        render(text) {
          return +text === 0 ? '启动成功' : '停止成功'
        },
      },
      {
        title: '时间',
        dataIndex: 'times',
        align: 'center',
        render(text) {
          return moment(text).format('lll')
        },
      },
    ]
    const columns1 = [
      {
        title: 'ID',
        dataIndex: 'id',
        align: 'center',
      },
      {
        title: '传输记录数',
        dataIndex: 'recordNum',
        align: 'center',
      },
      {
        title: '传输大小(MB)',
        dataIndex: 'transfer',
        align: 'center',
      },
      {
        title: '新增记录数',
        dataIndex: 'addRecord',
        align: 'center',
      },
      {
        title: '更新记录数',
        dataIndex: 'uploadRecord',
        align: 'center',
      },
      {
        title: '删除记录数',
        dataIndex: 'deleteRecord',
        align: 'center',
      },
      {
        title: '新增转更新数',
        dataIndex: 'addToUpload',
        align: 'center',
      },
      {
        title: '更新转新增数',
        dataIndex: 'uploadToAdd',
        align: 'center',
      },
      {
        title: '忽略记录数',
        dataIndex: 'ignoreRecord',
        align: 'center',
      },
      {
        title: '错误记录数',
        dataIndex: 'errRecord',
        align: 'center',
      },
      {
        title: '时间',
        dataIndex: 'times',
        align: 'center',
        render(text) {
          return moment(text).format('lll')
        },
      },
    ]
    const data = [
      {
        id: 0,
        operation: 0,
        operationStyle: 0,
        result: 1,
        times: 43333922,
      },
      {
        id: 1,
        operation: 1,
        operationStyle: 2,
        result: 0,
        times: 43333922,
      },
    ]
    const data1 = [
      {
        id: 0,
        recordNum: 23,
        transfer: 21,
        addRecord: 1,
        uploadRecord: 21,
        deleteRecord: 3,
        addToUpload: 23,
        uploadToAdd: 4,
        ignoreRecord: 5,
        errRecord: 6,
        tiems: 34343433,
      },
      {
        id: 1,
        recordNum: 8,
        transfer: 9,
        addRecord: 5,
        uploadRecord: 7,
        deleteRecord: 1,
        addToUpload: 40,
        uploadToAdd: 9,
        ignoreRecord: 9,
        errRecord: 5,
        tiems: 34343433,
      },
    ]
    return (
      <PageHeaderLayout>
        <div className="btncls">
          <Button onClick={this.handleBack} className="fr mr40">
            返回
          </Button>
        </div>
        <Card>
          <p className={styles.titleName}>
            {/* &nbsp;数据库: &nbsp;<span>Youedata_dig</span>
            &nbsp;&nbsp;数据类型: &nbsp;<span>Mysql</span>
            &nbsp;&nbsp;资源名称: &nbsp;<span>城市低保标准表</span>
            &nbsp;&nbsp;所属机构: &nbsp;<span>石家庄市民政局</span>
            &nbsp;&nbsp;数据更新时间: &nbsp;<span>2018-06-20 15:08:08</span> */}
            <span className={styles.label}>数据库</span>
            <span className={styles.value}>{dbName}</span>
            <span className={styles.label}>数据类型</span>
            <span className={styles.value}>{dataType}</span>
            <span className={styles.label}>资源名称</span>
            <span className={styles.value}>{resourceName}</span>
            <span className={styles.label}>所属机构</span>
            <span className={styles.value}>{resourceProviderName}</span>
            <span className={styles.label}>数据更新时间</span>
            <span className={styles.value}>{updataTime?moment(updataTime).format('lll'):'暂无'}</span>
          </p>
          <div className={styles.contentInfo}>
            <Tabs defaultActiveKey="1">
              <TabPane tab="基本信息" key="1">
                <Card loading={loading} bordered={false}>
                  <ul>
                    <li>
                      <span>同步模式:</span> {pubMode}
                    </li>
                    <li>
                      <span>同步频率:</span> {getSyncfrequency(timSetting)}
                    </li>
                    <li>
                      <span>任务状态:</span> {taskState}
                    </li>
                    {/* <li>
                      <span>注册时间:</span> {createdTime}
                    </li>
                    <li>
                      <span>最近同步时间:</span> {syncTime}
                    </li>
                    <li>
                      <span>数据库文件大小:</span> {dataSize}
                    </li> */}
                    {/* <li>
                      <span>数据资源:</span> <a href="">查看</a>
                    </li> */}
                  </ul>
                </Card>
              </TabPane>
              <TabPane tab="运行日志" key="2">
                <Table
                  bordered
                  columns={columns}
                  dataSource={data}
                  pagination={false}
                  // pagination={pagination && {...pagination, showQuickJumper: true, showTotal: (total) => `共 ${Math.ceil(total / pagination.pageSize)}页 / ${total}条 数据`}}
                  // loading={loading}
                  rowKey="id"
                  />
              </TabPane>
              <TabPane tab="同步日志" key="3">
                <Table
                  bordered
                  columns={columns1}
                  dataSource={data1}
                  pagination={false}
                  // pagination={pagination && {...pagination, showQuickJumper: true, showTotal: (total) => `共 ${Math.ceil(total / pagination.pageSize)}页 / ${total}条 数据`}}
                  // loading={loading}
                  rowKey="id"
                  />
              </TabPane>
            </Tabs>
          </div>
        </Card>
      </PageHeaderLayout>
    )
  }
}
