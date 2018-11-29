import React, { Component, Fragment } from 'react'
import { connect } from 'dva'
import moment from 'moment'
import {
    Card,
    Form,
    Modal,
    Divider,
    Table,
    message,
    Icon,
    Alert,
} from 'antd'
import router from 'umi/router'
import PageHeaderWrapper from '@/components/PageHeaderWrapper'
import DescriptionList from '@/components/DescriptionList'
import FilterRowForm from '@/components/FilterRowForm'

import styles from './DataManager.less'

const { Description } = DescriptionList
let paramsPage = { pageNum: 1, pageSize: 10 }
let formValues
let formTime

@connect(({ dataManager, loading }) => ({
  dataManager,
  loading: loading.effects['dataManager/fetch'],
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
      render: (text, record) => (
        <Fragment>
          {(record.checkStatus === '1' || record.checkStatus === '-11') && (
            <Fragment>
              <a
                onClick={() =>
                  router.push(
                    `/data/management/infoSource${record.type}/${record.id}/${record.resourceId}`
                  )
                }
                >
                信息资源
              </a>
              <Divider type="vertical" />
            </Fragment>
          )}
          {(record.checkStatus === '1' || record.checkStatus === '-11') && (
            <Fragment>
              <a
                onClick={() => {
                  switch (record.dataType) {
                    case '数据库':
                      return router.push(`/dataPublicManagement/dbview/${record.id}`)
                    case 'FTP':
                      return router.push(`/dataPublicManagement/ftpview/${record.id}`)
                    case '文件':
                      return router.push(`/dataPublicManagement/fileview/${record.id}`)
                    default:
                      message.destroy()
                      return message.error('无法查看数据，缺少数据类型！')
                  }
                  }}
                >
                数据
              </a>
              <Divider type="vertical" />
            </Fragment>
          )}
          {(record.checkStatus === '1' || record.checkStatus === '-11') && record.dataType !== '文件' && (
            <Fragment>
              <a
                onClick={() => {
                  const { match } = this.props
                  return router.push(`${match.url}/taskview/${record.type}/${record.id}`)
                }}
                >
                任务
              </a>
              <Divider type="vertical" />
            </Fragment>
          )}
          <Fragment>
            <a
              onClick={() => this.handleView(record.id, record.dataType)}
              >
              查看
            </a>
          </Fragment>
        </Fragment>
      ),
    },
  ];

  state = {
    visible: false,
    dataType: '',
  }

  componentDidMount() {
    const routeName = sessionStorage.getItem('currentList')
    const { dispatch, form, route } = this.props
    if (routeName && routeName !== route.name) {
      paramsPage = { pageNum: 1, pageSize: 10 }
      formValues = {}
      formTime = {}
    } else {
      if (formTime !== undefined && formValues !== undefined) {
        if (formTime.startTime) {
          formValues.date = [
            moment(formTime.startTime, 'YYYY-MM-DD'),
            moment(formTime.endTime, 'YYYY-MM-DD'),
          ]
          form.setFieldsValue(formValues)
          delete formValues.date
        }
      }
      form.setFieldsValue(formValues)
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
    delete fieldsForm.pubNodeName
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

  handleView = (id, dataType) => {
    const { dispatch } = this.props
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
    return (
      <Fragment>
        {keyArr.length === 0 && (
          <Alert
            message="页面正努力加载中......"
            style={{ marginBottom: 20 }}
            type="info"
            showIcon
            />
        )}
        {keyArr.length > 0 && (
          <Card bordered={false}>
            <DescriptionList size="large" title="基础信息" style={{ marginBottom: 32 }}>
              <Description term="数据库">{currentDetail.dbName}</Description>
              <Description term="数据名称">{currentDetail.name}</Description>
              <Description term="建库单位">{currentDetail.createUnit}</Description>
              <Description term="应用系统名称">{currentDetail.appsysName}</Description>
              <Description term="数据描述">{currentDetail.describe}</Description>
              <Description term="负责人姓名">{currentDetail.dutyName}</Description>
              <Description term="负责人手机号">{currentDetail.dutyPhone}</Description>
              <Description term="负责人职位">{currentDetail.dutyPosition}</Description>
            </DescriptionList>
            <Divider style={{ marginBottom: 32 }} />
            <DescriptionList size="large" title="同步信息" style={{ marginBottom: 32 }}>
              <Description term="同步模式">{currentSync.syncMode}</Description>
              <Description term="同步频率">{currentSync.syncRate}</Description>
              <Description term="定时设置">每{currentSync.timeSet}</Description>
              <Description term="自动停止">{currentSync.stopNum}次</Description>
            </DescriptionList>
            <Divider style={{ marginBottom: 32 }} />
            <div className={styles.title}>表信息</div>
            <Table
              style={{ marginBottom: 24 }}
              dataSource={currentDetailTable}
              columns={tableColumn}
              rowKey="tableName"
              />
            <div className={styles.title}>结构信息</div>
            <Table
              style={{ marginBottom: 16 }}
              dataSource={currentList}
              columns={structColumn}
              rowKey="id"
              />
          </Card>
        )}
      </Fragment>
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
    return (
      <Fragment>
        {keyArr.length === 0 && (
          <Alert
            message="页面正努力加载中......"
            style={{ marginBottom: 20 }}
            type="info"
            showIcon
            />
        )}
        {keyArr.length > 0 && (
          <Card bordered={false}>
            <DescriptionList size="large" title="基础信息" style={{ marginBottom: 32 }}>
              <Description term="数据名称">{currentDetail.name}</Description>
              <Description term="文件所属单位">{currentDetail.createUnit}</Description>
              <Description term="数据描述">{currentDetail.describe}</Description>
              <Description term="负责人姓名">{currentDetail.dutyName}</Description>
              <Description term="负责人手机号">{currentDetail.dutyPhone}</Description>
              <Description term="负责人职位">{currentDetail.dutyPosition}</Description>
            </DescriptionList>
            <Divider style={{ marginBottom: 32 }} />
            <DescriptionList size="large" title="同步信息" style={{ marginBottom: 32 }}>
              <Description term="同步模式">{currentSync.syncMode}</Description>
              <Description term="同步频率">{currentSync.syncRate}</Description>
              <Description term="定时设置">每{currentSync.timeSet}</Description>
              <Description term="自动停止">{currentSync.stopNum}次</Description>
            </DescriptionList>
            <Divider style={{ marginBottom: 32 }} />
            <div className={styles.title}>文件信息</div>
            <Table
              style={{ marginBottom: 24 }}
              dataSource={currentList}
              columns={tableColumn}
              rowKey="id"
              />
          </Card>
        )}
      </Fragment>
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
    return (
      <Fragment>
        {keyArr.length === 0 && (
          <Alert
            message="页面正努力加载中......"
            style={{ marginBottom: 20 }}
            type="info"
            showIcon
            />
        )}
        {keyArr.length > 0 && (
          <Card bordered={false}>
            <DescriptionList size="large" title="基础信息" style={{ marginBottom: 32 }}>
              <Description term="数据名称">{currentDetail.name}</Description>
              <Description term="文件所属单位">{currentDetail.createUnit}</Description>
              <Description term="数据描述">{currentDetail.describe}</Description>
              <Description term="负责人姓名">{currentDetail.dutyName}</Description>
              <Description term="负责人手机号">{currentDetail.dutyPhone}</Description>
              <Description term="负责人职位">{currentDetail.dutyPosition}</Description>
            </DescriptionList>
            <Divider style={{ marginBottom: 32 }} />
            <div className={styles.title}>文件信息</div>
            <Table
              style={{ marginBottom: 24 }}
              dataSource={currentList}
              columns={tableColumn}
              rowKey="id"
              />
          </Card>
        )}
      </Fragment>
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
                  key: '数据库',
                  value: '数据库',
                },
                {
                  key: 'FTP',
                  value: 'FTP',
                },
                {
                  key: '文件',
                  value: '文件',
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
    return (
      <FilterRowForm formData={formData} actions={actions} />
    )
  }

  render() {
    const {
        dataManager: { data },
        loading,
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
            {dataType === '数据库' && (
              this.renderDbInfo()
            )}
            {dataType === 'FTP' && (
              this.renderFtpInfo()
            )}
            {dataType === '文件' && (
              this.renderFileInfo()
            )}
          </Modal>
        </Card>
      </PageHeaderWrapper>
    )
  }
}

export default TableList
