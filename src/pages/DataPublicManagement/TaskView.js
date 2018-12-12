import React, { Component } from 'react'
import { connect } from 'dva'
import { Table, Button, Tabs, List, Card } from 'antd'
import router from 'umi/router'

import PageHeaderWrapper from '@/components/PageHeaderWrapper'
import DataBaseInfo from '@/components/DataBaseInfo'
import DataFileInfo from '@/components/DataFileInfo'

const { TabPane } = Tabs

@connect(({ taskView, loading }) => ({
  taskView,
  loading: loading.models.taskView,
}))
class TaskView extends Component {
  state = {
    viewType: '',
    pathType: '',
  }

  componentDidMount() {
    let type
    let path
    const { dispatch, match } = this.props
    if (match.params.id.indexOf('db') !== -1) {
      type = 'db'
      path = 'dbview'
    } else {
      type = 'ftp'
      path = 'ftpview'
    }
    this.setState({
      viewType: type,
      pathType: path,
    })
    dispatch({
      type: 'taskView/getBasicDetail',
      payload: {
        id: match.params.id,
      },
    })
    dispatch({
      type: 'taskView/getDetail',
      payload: {
        id: match.params.id,
        type: 'basic',
      },
    })
    dispatch({
      type: 'taskView/getRunlog',
      payload: {
        id: match.params.id,
        type: 'run',
        query: {
          pageNum: 1,
          pageSize: 10,
        },
      },
    })
    dispatch({
      type: 'taskView/getSynclog',
      payload: {
        id: match.params.id,
        type: 'sync',
        query: {
          pageNum: 1,
          pageSize: 10,
        },
      },
    })
  }

  componentWillUnmount() {
    const { dispatch } = this.props
    dispatch({
      type: 'taskView/reset',
      payload: {
        runLogList: {},
        syncLogList: {},
        info: {},
        basicInfo: {},
        pageRun: 1,
        pageSync: 1,
      },
    })
  }

  setFileSize = size => {
    if (size === null || size === 0) {
      return '0 Bytes'
    }
    const unitArr = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']
    const srcSize = parseFloat(size)
    const index = Math.floor(Math.log(srcSize) / Math.log(1024))
    let powNum = 1
    for (let i = 0, len = index; i < len; i += 1) {
      powNum *= 1024
    }
    let newSize = srcSize / powNum
    newSize = newSize.toFixed(2)
    return `${newSize} ${unitArr[index]}`
  }

  changePage = (pageNum, pageSize) => {
    const { dispatch, match } = this.props
    const paramsPage = { pageNum, pageSize }
    dispatch({
      type: 'taskView/getRunlog',
      payload: {
        id: match.params.id,
        type: 'run',
        query: {
          ...paramsPage,
        },
        page: pageNum,
      },
    })
  }

  setTimeFormat = val => {
    let str = ''
    if (val) {
      str = val.replace('-', '')
    }
    return str
  }

  changeSyncPage = (pageNum, pageSize) => {
    const { dispatch, match } = this.props
    const paramsPage = { pageNum, pageSize }
    dispatch({
      type: 'taskView/getSynclog',
      payload: {
        id: match.params.id,
        type: 'sync',
        query: {
          ...paramsPage,
        },
        page: pageNum,
      },
    })
  }

  back() {
    const { history } = this.props
    history.goBack()
  }

  render() {
    let dataBaseInfo = {}
    let fileName
    const {
      location,
      match,
      taskView: { runLogList, syncLogList, info, basicInfo, pageRun, pageSync },
      loading,
    } = this.props
    const { viewType, pathType } = this.state
    const runLogColumn = [
      {
        title: '序号',
        dataIndex: 'index',
        align: 'center',
        render: (text, record, index) => `${index + 1 + (pageRun - 1) * 10}`,
      },
      {
        title: '操作',
        dataIndex: 'operate',
        align: 'center',
      },
      {
        title: '操作方式',
        dataIndex: 'operateMode',
        align: 'center',
      },
      {
        title: '操作结果',
        dataIndex: 'operateResult',
        align: 'center',
      },
      {
        title: '最近更新时间',
        dataIndex: 'time',
        align: 'center',
      },
    ]
    const syncLogColumn = [
      {
        title: '序号',
        dataIndex: 'index',
        render: (text, record, index) => `${index + 1 + (pageSync - 1) * 10}`,
      },
      {
        title: '传输记录数',
        dataIndex: 'transferNum',
      },
      {
        title: '传输大小',
        dataIndex: 'transferSize',
        render: text => this.setFileSize(text),
      },
      {
        title: '新增记录数',
        dataIndex: 'insertNum',
      },
      {
        title: '更新记录数',
        dataIndex: 'updateNum',
      },
      {
        title: '删除记录数',
        dataIndex: 'deleteNum',
      },
      {
        title: '忽略记录数',
        dataIndex: 'ignoreNum',
      },
      {
        title: '错误记录数',
        dataIndex: 'errorNum',
      },
      {
        title: '最近更新时间',
        dataIndex: 'time',
      },
    ]
    const paginationProps = {
      showQuickJumper: true,
      total: runLogList.total,
      onChange: this.changePage,
      pageSize: 10,
      showTotal(total) {
        return `共${Math.ceil(total / 10)}页 / ${total}条数据`
      },
    }
    const paginationSyncProps = {
      showQuickJumper: true,
      total: syncLogList.total,
      onChange: this.changeSyncPage,
      pageSize: 10,
      showTotal(total) {
        return `共${Math.ceil(total / 10)}页 / ${total}条数据`
      },
    }
    if (viewType === 'db') {
      fileName = '数据库文件大小'
      if (info.value) {
        dataBaseInfo = {
          dataBaseName: info.value.dbName,
          dataBaseType: info.value.datasourceEntity.type,
          dataName: info.value.name,
          updateTime: info.value.updateTime,
          createUnit: info.value.createUnit,
          appsysName: info.value.appsysName,
          dutyName: info.value.dutyName,
          dutyPhone: info.value.dutyPhone,
          dutyPosition: info.value.dutyPosition,
          describe: info.value.describe,
        }
      }
    } else {
      fileName = '文件大小'
      if (info.value) {
        dataBaseInfo = {
          dataType: info.value.datasourceEntity.type,
          name: info.value.name,
          createUnit: info.value.createUnit,
          dutyName: info.value.dutyName,
          dutyPhone: info.value.dutyPhone,
          dutyPosition: info.value.dutyPosition,
          describe: info.value.describe,
        }
      }
    }
    const syncDatas = [
      {
        title: '同步模式',
        value: basicInfo.mode,
      },
      {
        title: '同步频率',
        value: `${basicInfo.syncRate / 10} 秒`,
      },
      {
        title: '状态',
        value: basicInfo.status,
      },
      {
        title: '接入时间',
        value: basicInfo.startTime,
      },
      {
        title: '最近更新时间',
        value: basicInfo.updateTime,
      },
      {
        title: `${fileName}`,
        setSize: true,
        value: basicInfo.totalSize,
      },
      {
        title: '查看数据',
        value: '查看',
      },
    ]
    const buttonList = (
      <div style={{ position: 'absolute', top: 0, right: 0 }}>
        <Button type="primary" onClick={() => this.back()}>
          返回
        </Button>
      </div>
    )
    return (
      <PageHeaderWrapper tabActiveKey={location.pathname} action={buttonList}>
        <div className="content_layout">
          {(() => {
            if (viewType === 'db') {
              return <DataBaseInfo dataBaseInfo={dataBaseInfo} />
            }
            return <DataFileInfo dataBaseInfo={dataBaseInfo} />
          })()}
          <Tabs defaultActiveKey="1">
            <TabPane tab="基本信息" key="1">
              <Card loading={loading} bordered={false}>
                <List
                  itemLayout="horizontal"
                  dataSource={syncDatas}
                  renderItem={item => {
                    if (item.title !== '查看数据' && !item.setSize) {
                      return (
                        <List.Item style={{ borderBottom: 'none' }} key={item.title}>
                          {item.title}：{item.value}
                        </List.Item>
                      )
                    }
                    if (item.setSize) {
                      return (
                        <List.Item style={{ borderBottom: 'none' }} key={item.title}>
                          {item.title}：{this.setFileSize(parseInt(item.value, 10))}
                        </List.Item>
                      )
                    }
                    return (
                      <List.Item style={{ borderBottom: 'none' }} key={item.title}>
                        {item.title}：
                        {
                          <a
                            onClick={() =>
                              router.push(`/DataPublicManagement/${pathType}/${match.params.id}`)
                            }
                            >
                            {item.value}
                          </a>
                        }
                      </List.Item>
                    )
                  }}
                  />
              </Card>
            </TabPane>
            <TabPane tab="运行日志" key="2">
              <Table
                bordered
                pagination={paginationProps}
                dataSource={runLogList.list}
                columns={runLogColumn}
                rowKey="time"
                loading={loading}
                />
            </TabPane>
            <TabPane tab="更新日志" key="3">
              <Table
                bordered
                pagination={paginationSyncProps}
                dataSource={syncLogList.list}
                columns={syncLogColumn}
                rowKey="time"
                loading={loading}
                />
            </TabPane>
          </Tabs>
        </div>
      </PageHeaderWrapper>
    )
  }
}
export default TaskView
