import React, { Component, Fragment } from 'react'
import { connect } from 'dva'
import {
    Card,
    Form,
    Modal,
    Divider,
    Table,
    message,
    Icon,
} from 'antd'
import router from 'umi/router'
import PageHeaderWrapper from '@/components/PageHeaderWrapper'
import FilterRowForm from '@/components/FilterRowForm'
import DbModalView from '@/components/DbModalView'
import FtpModalView from '@/components/FtpModalView'
import FileModalView from '@/components/FileModalView'

import styles from './DataManager.less'

let paramsPage = { pageNum: 1, pageSize: 10 }
let formValues
let formTime

@connect(({ dataManager, loading }) => ({
  dataManager,
  loading: loading.effects['dataManager/fetch'],
  loadingView: loading.effects['dataManager/getReqBeanEntityInfo'],
}))
@Form.create()
class TableList extends Component {
  columns = [
    {
      title: '序号',
      dataIndex: 'id',
      render: (text, record, index) => {
        const { dataManager } = this.props
        return `${index + 1 + (dataManager.data.pageNum - 1) * 10}`
      },
    },
    {
      title: '数据名称',
      dataIndex: 'rsName',
    },
    {
      title: '数据类型',
      dataIndex: 'dataType',
    },
    {
      title: '所属数据源',
      dataIndex: 'dataSource',
    },
    {
      title: '发布节点',
      dataIndex: 'nodeName',
    },
    {
      title: '最近更新时间',
      dataIndex: 'updataTime',
    },
    {
      title: '操作人',
      dataIndex: 'createUser',
    },
    {
      title: '审核状态',
      dataIndex: 'checkStatus',
      render: text => {
        switch (text) {
          case '-1':
            return <span style={{ color: '#5cadff' }}>待审核</span>
          case '-11':
            return <span style={{ color: '#5cadff' }}>修改待审核</span>
          case '-21':
            return <span style={{ color: '#5cadff' }}>删除待审核</span>
          case '0':
            return <span style={{ color: '#ed4014' }}>已拒绝</span>
          case '10':
            return <span style={{ color: '#ed4014' }}>修改已拒绝</span>
          case '20':
            return <span style={{ color: '#ed4014' }}>删除已拒绝</span>
          case '1':
            return <span style={{ color: '#19be6b' }}>已通过</span>
          default:
            return <span>无状态</span>
        }
      },
    },
    {
      title: '操作',
      render: (text, record) => {
        if (record.checkStatus !== '-1' && record.checkStatus !== '0') {
          return (
            <Fragment>
              <Fragment>
                <a onClick={() => router.push(`/dataPublicManagement/infoSource/${record.id}`)}>
                  信息资源
                </a>
                <Divider type="vertical" />
              </Fragment>
              <Fragment>
                <a
                  onClick={() => {
                    if (record.id.indexOf('db') !== -1) {
                      return router.push(`/dataPublicManagement/dbview/${record.id}`)
                    } else if (record.id.indexOf('ftp') !== -1) {
                      return router.push(`/dataPublicManagement/ftpview/${record.id}`)
                    } else if (record.id.indexOf('file') !== -1) {
                      return router.push(`/dataPublicManagement/fileview/${record.id}`)
                    } else {
                      message.destroy()
                      return message.error('无法查看数据，缺少数据类型！')
                    }
                    }}
                  >
                  数据
                </a>
                <Divider type="vertical" />
              </Fragment>
              {record.dataType !== '文件' && (
                <Fragment>
                  <a
                    onClick={() => {
                      return router.push(`/dataPublicManagement/taskview/${record.dataType}/${record.id}`)
                    }}
                    >
                    任务
                  </a>
                  <Divider type="vertical" />
                </Fragment>
              )}
              <Fragment>
                <a onClick={() => this.handleView(record.id)}>
                  查看
                </a>
              </Fragment>
            </Fragment>
          )
        }
      },
    },
  ];

  state = {
    visible: false,
    dataType: '',
  }

  componentDidMount() {
    const routeName = sessionStorage.getItem('currentList')
    const { dispatch, route } = this.props
    if (routeName && routeName !== route.name) {
      paramsPage = { pageNum: 1, pageSize: 10 }
      formValues = {}
      formTime = {}
    }
    dispatch({
      type: 'dataManager/getNodes',
      payload: {
        pageNum: '',
        pageSize: '',
      },
    })
    dispatch({
      type: 'dataManager/fetch',
      payload: {
        ...paramsPage,
        ...formValues,
        ...formTime,
      },
    })
  }

  componentWillUnmount() {
    const { route } = this.props
    sessionStorage.setItem('currentList', route.name)
  }

  handleSearch = (fieldsForm, paramsTime) => {
    const { dispatch } = this.props
    fieldsForm.nodeName = fieldsForm.pubNodeName
    paramsPage = { pageNum: 1, pageSize: 10 }
    formValues = fieldsForm
    formTime = paramsTime
    const values = {
      ...fieldsForm,
      ...paramsPage,
      ...paramsTime,
    }
    dispatch({
      type: 'dataManager/fetch',
      payload: values,
    })
  }

  handleView = (id) => {
    let dataType
    const { dispatch } = this.props
    if (id.indexOf('db') !== -1) {
      dataType = 'db'
    } else if (id.indexOf('ftp') !== -1) {
      dataType = 'ftp'
    } else if (id.indexOf('file') !== -1) {
      dataType = 'file'
    } else {
      dataType = ''
    }
    dispatch({
      type: 'dataManager/getReqBeanEntityInfo',
      payload: {
        id,
      },
    })
    this.setState({
      visible: true,
      dataType,
    })
  }

  handleCancel = () => {
    const { dispatch } = this.props
    this.setState({
      visible: false,
      dataType: '',
    })
    dispatch({
      type: 'dataManager/resetEntityInfo',
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
    return newSize + unitArr[index]
  }

  changePage = (pageNum, pageSize) => {
    const { dispatch } = this.props
    paramsPage = { pageNum, pageSize }
    dispatch({
      type: 'dataManager/fetch',
      payload: {
        ...paramsPage,
        ...formValues,
        ...formTime,
      },
    })
  }

  renderDbInfo = () => {
    let currentDetail
    let currentSync
    let currentList
    let currentDetailTable
    const {
        dataManager: { entityInfo },
        } = this.props
    const keyArr = Object.keys(entityInfo)
    if (keyArr.length > 0) {
      currentDetail = entityInfo.value
      currentSync = currentDetail.syncEntity
      currentList = currentDetail.structEntityCollection
      currentDetailTable = [
        {
          tableName: currentDetail.tableName,
          tableNote: currentDetail.tableNote,
        },
      ]
    }
    const tableColumn = [
      {
        title: '表名称',
        dataIndex: 'tableName',
        align: 'center',
      },
      {
        title: '中文标注',
        dataIndex: 'tableNote',
        align: 'center',
      },
    ]
    const structColumn = [
      {
        title: '主键',
        dataIndex: 'primaryKey',
        render: text => {
          if (text) {
            return <Icon style={{ color: '#fb9a03' }} type="key" theme="outlined" />
          }
          return ''
        },
      },
      {
        title: '字段名称',
        dataIndex: 'columnName',
      },
      {
        title: '数据类型',
        dataIndex: 'columnType',
      },
      {
        title: '中文标注',
        dataIndex: 'note',
      },
    ]
    const data = {
      currentDetail,
      currentSync,
      currentList,
      currentDetailTable,
      tableColumn,
      structColumn,
      keyArr,
    }
    return (
      <DbModalView data={data} />
    )
  }

  renderFtpInfo = () => {
    let currentDetail
    let currentSync
    let currentList
    const {
        dataManager: { entityInfo },
        } = this.props
    const keyArr = Object.keys(entityInfo)
    if (keyArr.length > 0) {
      currentDetail = entityInfo.value
      currentSync = currentDetail.syncEntity
      currentList = currentDetail.ftpfileEntityCollection
    }
    const tableColumn = [
      {
        title: '文件名称',
        dataIndex: 'name',
      },
      {
        title: '文件类型',
        dataIndex: 'type',
      },
      {
        title: '文件相对路径',
        dataIndex: 'path',
      },
    ]
    const data = {
      currentDetail,
      currentSync,
      currentList,
      tableColumn,
      keyArr,
    }
    return (
      <FtpModalView data={data} />
    )
  }

  renderFileInfo = () => {
    let currentDetail
    let currentList
    const {
        dataManager: { entityInfo },
        } = this.props
    const keyArr = Object.keys(entityInfo)
    if (keyArr.length > 0) {
      currentDetail = entityInfo.value
      currentList = currentDetail.fileEntityCollection
    }
    const tableColumn = [
      {
        title: '文件名称',
        dataIndex: 'name',
      },
      {
        title: '文件类型',
        dataIndex: 'type',
      },
      {
        title: '文件大小',
        dataIndex: 'size',
        render: text => this.setFileSize(parseInt(text, 10)),
      },
      {
        title: '最近更新时间',
        dataIndex: 'uploadTime',
      },
    ]
    const data = {
      currentDetail,
      currentList,
      tableColumn,
      keyArr,
    }
    return (
      <FileModalView data={data} />
    )
  }

  renderForm() {
    const {
        dataManager: { nodes },
        } = this.props
    const pubNodes = [
      {
        key: '全部',
        value: '',
      },
    ]
    nodes.map(item => {
      return pubNodes.push({
        key: item.nodeName,
        value: item.nodeName,
      })
    })
    const formData = {
      md: 8,
      lg: 24,
      xl: 48,
      data: [
        {
          key: 1,
          data: [
            {
              prop: 'rsName',
              label: '数据名称',
              typeOptions: {
                placeholder: '请输入数据名称',
                maxLength: 50,
              },
            },
            {
              prop: 'createUser',
              label: '操作人',
              typeOptions: {
                placeholder: '请输入操作人',
                maxLength: 50,
              },
            },
            {
              type: 'RangePicker',
              prop: 'date',
              label: '更新时间',
            },
          ],
        },
        {
          key: 2,
          data: [
            {
              type: 'Select',
              prop: 'dataType',
              label: '数据类型',
              typeOptions: {
                placeholder: '请选择数据类型',
              },
              options: [
                {
                  key: '全部',
                  value: '',
                },
                {
                  key: 'mysql',
                  value: 'mysql',
                },
                {
                  key: 'sqlserver',
                  value: 'sqlserver',
                },
                {
                  key: 'oracle',
                  value: 'oracle',
                },
                {
                  key: 'dm',
                  value: 'dm',
                },
                {
                  key: 'kingbase',
                  value: 'kingbase',
                },
                {
                  key: 'ftp',
                  value: 'ftp',
                },
                {
                  key: 'sftp',
                  value: 'sftp',
                },
                {
                  key: '文件',
                  value: 'file',
                },
              ],
            },
            {
              type: 'Select',
              prop: 'pubNodeName',
              label: '发布节点',
              typeOptions: {
                placeholder: '请选择发布节点',
              },
              options: pubNodes,
            },
            {
              type: 'Select',
              prop: 'checkStatus',
              label: '审核状态',
              typeOptions: {
                placeholder: '请选择审核状态',
              },
              options: [
                {
                  key: '全部',
                  value: '',
                },
                {
                  key: '待审核',
                  value: '-1',
                },
                {
                  key: '修改待审核',
                  value: '-11',
                },
                {
                  key: '删除待审核',
                  value: '-21',
                },
                {
                  key: '已拒绝',
                  value: '0',
                },
                {
                  key: '修改已拒绝',
                  value: '10',
                },
                {
                  key: '删除已拒绝',
                  value: '20',
                },
                {
                  key: '已通过',
                  value: '1',
                },
              ],
            },
          ],
        },
      ],
    }
    const actions = {
      handleSearch: this.handleSearch,
    }
    const data = {
      ...formValues,
    }
    return (
      <FilterRowForm formData={formData} actions={actions} data={data} />
    )
  }

  render() {
    const {
        dataManager: { data },
        loading,
        loadingView,
        } = this.props
    const { visible, dataType } = this.state
    const paginationProps = {
      showQuickJumper: true,
      total: data.total,
      current: data.pageNum,
      onChange: this.changePage,
      pageSize: 10,
      showTotal(total) {
        return `共${Math.ceil(total / 10)}页 / ${total}条数据`
      },
    }
    const locale = {
      emptyText: '很遗憾，没有搜索到匹配的数据',
    }
    const cancelButtonProps = {
      className: styles.hiddenBtn,
    }
    return (
      <PageHeaderWrapper title="">
        <Card bordered={false}>
          <div className={styles.tableList}>
            <div className={styles.tableListForm}>{this.renderForm()}</div>
            <Table
              rowKey={record => record.id}
              bordered
              columns={this.columns}
              dataSource={data.data}
              pagination={paginationProps}
              locale={locale}
              loading={loading}
              />
          </div>
          <Modal
            title='查看'
            visible={visible}
            onOk={this.handleCancel}
            okText="关闭"
            onCancel={this.handleCancel}
            cancelButtonProps={cancelButtonProps}
            width={900}
            maskClosable={false}
            >
            <Card bordered={false} loading={loadingView}>
              {dataType === 'db' && (
                this.renderDbInfo()
              )}
              {dataType === 'ftp' && (
                this.renderFtpInfo()
              )}
              {dataType === 'file' && (
                this.renderFileInfo()
              )}
            </Card>
          </Modal>
        </Card>
      </PageHeaderWrapper>
    )
  }
}

export default TableList
