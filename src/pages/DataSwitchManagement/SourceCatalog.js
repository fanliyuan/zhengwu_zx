import React, { Component, Fragment } from 'react'
import { connect } from 'dva'
import { Card, Form, Table, Divider, Tabs } from 'antd'
import moment from 'moment'
import router from 'umi/router'
import PageHeaderWrapper from '@/components/PageHeaderWrapper'
import FilterRowForm from '@/components/FilterRowForm'

import styles from './SourceCatalog.less'

const { TabPane } = Tabs
let paramsPage = { pageNum: 1, pageSize: 10 }
let formValues
let formTime
let paramsPageApi = { pageNum: 1, pageSize: 10 }
let formValuesApi
let formTimeApi

@connect(({ sourceCatalog, nodeManagement, catalogManagement, loading }) => ({
  sourceCatalog,
  nodeManagement,
  catalogManagement,
  loading: loading.effects['sourceCatalog/fetch'],
}))
@Form.create()
class SourceCatalog extends Component {
  columns = [
    {
      title: '信息资源代码',
      align: 'center',
      dataIndex: 'resourceCode',
    },
    {
      title: '信息资源名称',
      align: 'center',
      dataIndex: 'resourceName',
    },
    {
      title: '资源属性分类',
      align: 'center',
      dataIndex: 'resourceProjectCatalogType',
    },
    {
      title: '发布节点',
      align: 'center',
      dataIndex: 'nodeName',
    },
    {
      title: '关联数据名称',
      align: 'center',
      dataIndex: 'mountResourceName',
    },
    {
      title: '关联数据类型',
      align: 'center',
      dataIndex: 'mountResourceId',
      render: text => {
        let dataType
        if (text.indexOf('db') !== -1) {
          dataType = `数据库`
        } else if (text.indexOf('ftp') !== -1) {
          dataType = `文件`
        } else if (text.indexOf('file') !== -1) {
          dataType = `文件`
        } else {
          dataType = `数据类型错误`
        }
        return dataType
      },
    },
    {
      title: '共享时间',
      align: 'center',
      dataIndex: 'shareTime',
    },
    {
      title: '订阅是否需发布方授权',
      align: 'center',
      dataIndex: 'subscriptionAuth',
      render: text => {
        switch (text) {
          case '0':
            return <span style={{ color: '#5cadff' }}>否</span>
          case '1':
            return <span style={{ color: '#ed4014' }}>是</span>
          default:
            return <span>授权码错误</span>
        }
      },
    },
    {
      title: '订阅状态',
      align: 'center',
      dataIndex: 'orderStatus',
      render: text => {
        switch (text) {
          case '待审核':
            return <span style={{ color: '#5cadff' }}>待审核</span>
          case '未订阅':
            return <span style={{ color: '#999999' }}>未订阅</span>
          case '已订阅':
            return <span style={{ color: '#19be6b' }}>已订阅</span>
          case '已拒绝':
            return <span style={{ color: '#ed4014' }}>已拒绝</span>
          default:
            return <span>状态错误</span>
        }
      },
    },
    {
      title: '操作',
      align: 'center',
      render: (text, record) => (
        <Fragment>
          <a
            onClick={() =>
              router.push(
                `/dataPublicManagement/infoSource/${record.mountResourceId}`
              )
            }
            >
            信息资源
          </a>
        </Fragment>
      ),
    },
  ]

  columnsApi = [
    {
      title: '信息资源代码',
      align: 'center',
      dataIndex: 'resourceCode',
    },
    {
      title: '信息资源名称',
      align: 'center',
      dataIndex: 'resourceName',
    },
    {
      title: '资源属性分类',
      align: 'center',
      dataIndex: 'resourceProjectCatalogType',
    },
    {
      title: '发布节点',
      align: 'center',
      dataIndex: 'nodeName',
    },
    {
      title: '关联数据名称',
      align: 'center',
      dataIndex: 'mountResourceName',
    },
    {
      title: '关联数据类型',
      align: 'center',
      dataIndex: 'mountResourceId',
      render: text => {
        let dataType
        if (text.indexOf('db') !== -1) {
          dataType = `数据库`
        } else if (text.indexOf('ftp') !== -1) {
          dataType = `文件`
        } else if (text.indexOf('file') !== -1) {
          dataType = `文件`
        } else {
          dataType = `数据类型错误`
        }
        return dataType
      },
    },
    {
      title: '共享时间',
      align: 'center',
      dataIndex: 'shareTime',
    },
    {
      title: '申请是否需发布方授权',
      align: 'center',
      dataIndex: 'subscriptionAuth',
      render: text => {
        switch (text) {
          case '0':
            return <span style={{ color: '#5cadff' }}>否</span>
          case '1':
            return <span style={{ color: '#ed4014' }}>是</span>
          default:
            return <span>授权码错误</span>
        }
      },
    },
    {
      title: '申请状态',
      align: 'center',
      dataIndex: 'orderStatus',
      render: text => {
        switch (text) {
          case '待审核':
            return <span style={{ color: '#5cadff' }}>待审核</span>
          case '未申请':
            return <span style={{ color: '#999999' }}>未申请</span>
          case '已申请':
            return <span style={{ color: '#19be6b' }}>已申请</span>
          case '已拒绝':
            return <span style={{ color: '#ed4014' }}>已拒绝</span>
          default:
            return <span>状态错误</span>
        }
      },
    },
    {
      title: '操作',
      align: 'center',
      render: (text, record) => (
        <Fragment>
          <a
            onClick={() =>
              router.push(
                `/subscribe/sourceCatalog/infoResource/${record.resourceId}/${
                  record.mountResourceId
                }`
              )
            }
            >
            接口详情
          </a>
          <Divider type="vertical" />
          <a
            onClick={() =>
              router.push(
                `/subscribe/sourceCatalog/infoResource/${record.resourceId}/${
                  record.mountResourceId
                }`
              )
            }
            >
            信息资源
          </a>
        </Fragment>
      ),
    },
  ]

  componentDidMount() {
    let fields
    let fieldsApi
    const routeName = sessionStorage.getItem('currentList')
    const { dispatch, route } = this.props
    if (routeName && routeName !== route.name) {
      paramsPage = { pageNum: 1, pageSize: 10 }
      formValues = {}
      formTime = {}
      paramsPageApi = { pageNum: 1, pageSize: 10 }
      formValuesApi = {}
      formTimeApi = {}
      fields = { ...formValues }
      fieldsApi = { ...formValuesApi }
    } else {
      fields = { ...formValues }
      fieldsApi = { ...formValuesApi }
      Object.defineProperty(fields, 'date', {
        value: ``,
      })
      Object.defineProperty(fieldsApi, 'date', {
        value: ``,
      })
    }
    dispatch({
      type: 'nodeManagement/getParentNodes',
    })
    dispatch({
      type: 'catalogManagement/directoryListAll',
    })
    dispatch({
      type: 'sourceCatalog/fetch',
      payload: {
        ...paramsPage,
        ...fields,
        ...formTime,
      },
    })
    dispatch({
      type: 'sourceCatalog/fetchApi',
      payload: {
        ...paramsPageApi,
        ...fieldsApi,
        ...formTimeApi,
      },
    })
  }

  componentWillUnmount() {
    const { route } = this.props
    sessionStorage.setItem('currentList', route.name)
  }

  handleSearch = (fieldsForm, paramsTime) => {
    const { dispatch } = this.props
    paramsPage = { pageNum: 1, pageSize: 10 }
    const fields = fieldsForm
    formValues = { ...fieldsForm }
    Object.defineProperty(fields, 'date', {
      value: ``,
    })
    if (fields.typeIds) {
      const typeArr = ['classId', 'projectId', 'catalogId', 'typeId']
      fields.typeIds.map((item, index) =>
          Object.defineProperty(fields, typeArr[index], {
            value: JSON.stringify(item),
            enumerable: true,
          })
      )
      Object.defineProperty(fields, 'typeIds', {
        value: ``,
      })
    }
    Object.defineProperty(paramsTime, 'startTime', {
      value: moment(paramsTime.startTime).format('YYYY-M-D'),
    })
    Object.defineProperty(paramsTime, 'endTime', {
      value: moment(paramsTime.endTime).format('YYYY-M-D'),
    })
    formTime = paramsTime
    const values = {
      ...fields,
      ...paramsPage,
      ...paramsTime,
    }
    dispatch({
      type: 'sourceCatalog/fetch',
      payload: values,
    })
  }

  handleSearchApi = (fieldsForm, paramsTime) => {
    const { dispatch } = this.props
    paramsPageApi = { pageNum: 1, pageSize: 10 }
    const fields = fieldsForm
    Object.defineProperty(fields, 'date', {
      value: ``,
    })
    if (fields.typeIds) {
      const typeArr = ['classId', 'projectId', 'catalogId', 'typeId']
      fields.typeIds.map((item, index) =>
          Object.defineProperty(fields, typeArr[index], {
            value: JSON.stringify(item),
            enumerable: true,
          })
      )
      Object.defineProperty(fields, 'typeIds', {
        value: ``,
      })
    }
    formValuesApi = { ...fieldsForm }
    formTimeApi = paramsTime
    const values = {
      ...fields,
      ...paramsPageApi,
      ...paramsTime,
    }
    dispatch({
      type: 'sourceCatalog/fetchApi',
      payload: values,
    })
  }

  changePage = (pageNum, pageSize) => {
    const { dispatch } = this.props
    paramsPage = { index: pageNum, limit: pageSize }
    dispatch({
      type: 'sourceCatalog/fetch',
      payload: {
        ...paramsPage,
        ...formValues,
        ...formTime,
      },
    })
  }

  changePageApi = (pageNum, pageSize) => {
    const { dispatch } = this.props
    paramsPageApi = { pageNum, pageSize }
    dispatch({
      type: 'sourceCatalog/fetchApi',
      payload: {
        ...paramsPageApi,
        ...formValuesApi,
        ...formTimeApi,
      },
    })
  }

  renderForm(type) {
    const {
        catalogManagement: { srcProsTree },
        nodeManagement: { parentNodeList },
        } = this.props
    const nodes = [
      {
        key: '全部',
        value: '',
      },
    ]
    parentNodeList.map(item =>
        nodes.push({
          key: item.label,
          value: item.label,
        })
    )
    const formData = {
      md: 8,
      lg: 24,
      xl: 48,
      data: [
        {
          key: 1,
          data: [
            {
              prop: 'resourceCode',
              label: '信息资源代码',
              typeOptions: {
                placeholder: '请输入信息资源代码',
                maxLength: 50,
              },
            },
            {
              prop: 'resourceName',
              label: '信息资源名称',
              typeOptions: {
                placeholder: '请输入信息资源名称',
                maxLength: 50,
              },
            },
            {
              type: 'Cascader',
              prop: 'typeIds',
              label: '资源属性分类',
              typeOptions: {
                options: srcProsTree,
                fieldNames: { label: 'name', value: 'id' },
                placeholder: '请选择资源属性分类',
              },
            },
          ],
        },
        {
          key: 2,
          data: [
            {
              type: 'Select',
              prop: 'switchNodeName',
              label: '发布节点',
              typeOptions: {
                placeholder: '请选择发布节点',
              },
              options: nodes,
            },
            // {
            //   type: 'Select',
            //   prop: 'status',
            //   label: '订阅状态',
            //   typeOptions: {
            //     placeholder: '请选择订阅状态',
            //   },
            //   options: [
            //     {
            //       key: '全部',
            //       value: '',
            //     },
            //     {
            //       key: '待审核',
            //       value: '待审核',
            //     },
            //     {
            //       key: '未订阅',
            //       value: '未订阅',
            //     },
            //     {
            //       key: '已订阅',
            //       value: '已订阅',
            //     },
            //     {
            //       key: '已拒绝',
            //       value: '已拒绝',
            //     },
            //   ],
            // },
            {
              type: 'RangePicker',
              prop: 'date',
              label: '共享时间',
            },
          ],
        },
      ],
    }
    let actions
    let data
    if (type === 1) {
      actions = {
        handleSearch: this.handleSearch,
      }
      data = {
        ...formValues,
      }
    } else {
      actions = {
        handleSearch: this.handleSearchApi,
      }
      data = {
        ...formValuesApi,
      }
    }
    return <FilterRowForm formData={formData} actions={actions} data={data} />
  }

  render() {
    const {
        sourceCatalog: { dataList, dataListApi, page, pageApi },
        loading,
        } = this.props
    const paginationProps = {
      showQuickJumper: true,
      total: dataList.total,
      current: page,
      onChange: this.changePage,
      pageSize: 10,
      showTotal(total) {
        return `共${Math.ceil(total / 10)}页 / ${total}条数据`
      },
    }
    const paginationPropsApi = {
      showQuickJumper: true,
      total: dataListApi.total,
      current: pageApi,
      onChange: this.changePageApi,
      pageSize: 10,
      showTotal(total) {
        return `共${Math.ceil(total / 10)}页 / ${total}条数据`
      },
    }
    const locale = {
      emptyText: '很遗憾，没有搜索到匹配的文件',
    }
    return (
      <PageHeaderWrapper>
        <Card bordered={false}>
          <Tabs defaultActiveKey="1">
            <TabPane tab="共享资源" key="1">
              <div className={styles.tableList}>
                <div className={styles.tableListForm}>{this.renderForm(1)}</div>
                <Table
                  rowKey="resourceId"
                  bordered
                  pagination={paginationProps}
                  dataSource={dataList.data}
                  columns={this.columns}
                  loading={loading}
                  locale={locale}
                  />
              </div>
            </TabPane>
            <TabPane tab="API资源" key="2">
              <div className={styles.tableList}>
                <div className={styles.tableListForm}>{this.renderForm(2)}</div>
                <Table
                  rowKey="resourceId"
                  bordered
                  pagination={paginationPropsApi}
                  dataSource={dataListApi.data}
                  columns={this.columnsApi}
                  loading={loading}
                  locale={locale}
                  />
              </div>
            </TabPane>
          </Tabs>
        </Card>
      </PageHeaderWrapper>
    )
  }
}

export default SourceCatalog
