import React, { Component } from 'react'
import { Table, Button, Select, Card } from 'antd'
// import moment from 'moment'
import { connect } from 'dva'
import { routerRedux } from 'dva/router'
import Cookies from 'js-cookie'
import { Bind, Throttle } from 'lodash-decorators'

import PageHeaderLayout from '@/components/PageHeaderWrapper'
import SearchForm from '@/components/SearchForm'
import styles from './SourceManagement.less'
import { format0, format24 } from '../../utils/utils'

const { Option } = Select
@connect(({ catalogManagement, nodeManagement, loading }) => ({
  catalogManagement,
  nodeManagement,
  loading: loading.models.catalogManagement || loading.models.nodeManagement,
}))
export default class SourceManagement extends Component {
  state = {
    isNodeOperator: false,
    queryData: {},
    isChanged: false,
    pagination:{
      pageSize: 10,
      pageNum: 1,
    },
  }

  componentDidMount() {
    this.setState({
      isNodeOperator: Cookies.get(['antd-pro-authority']) === 'operator-n',
    })
    this.props.dispatch({
      type: 'nodeManagement/getParentNodes',
    })
    this.props.dispatch({
      type: 'catalogManagement/directoryListAll',
    })
    this.handleSearch()
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.catalogManagement.catalogData !== this.props.catalogManagement.catalogData) {
      this.setState({
        pagination: {
          pageNum: 1,
        },
      })
    }
  }

  nameChange = e => {
    const { queryData } = this.state
    this.setState({
      queryData: {
        ...queryData,
        rsName: e.target.value.trim(),
      },
      isChanged: true,
    })
  }

  codeChange = () => {
    
  }

  handleIsRelated = (e) => {
    console.log(e.target.checked) // eslint-disable-line
  }

  dataTypeChange = val => {
    const { queryData } = this.state
    this.setState({
      queryData: {
        ...queryData,
        dataType: val === ''?undefined:val,
      },
    })
  }

  nodeChange = (val, params) => {
    const { queryData } = this.state
    this.setState({
      queryData: {
        ...queryData,
        nodeId: val[0] && +[...val].pop(),
        nodeName: params[0] && params[0].label,
      },
    })
  }

  // nodeNameChange = () => {
    // this.setState({
    //   nodeName: val,
    // })
  // }

  // owingJgChange = () => {
  //   this.setState({
  //     owingJg: val,
  //   })
  // }

  statusChange = val => {
    const { queryData } = this.state
    this.setState({
      queryData: {
        ...queryData,
        checkStatus: val === '-2' ? undefined:val,
      },
    })
  }

  timeChange = val => {
    const { queryData } = this.state
    this.setState({
      queryData: {
        ...queryData,
        // startTime: val[0] ? `${val[0].format().substr(0,10)} 0:00:00` :undefined,
        // endTime: val[1] ? `${val[1].format().substr(0,10)} 23:59:59` :undefined,
        startTime: val[0]?format0(val[0].format('x')):undefined,
        endTime: val[1]?format24(val[1].format('x')):undefined,
      },
    })
  }

  handleSource = ({resourceId = 0}) => {
    const { dispatch } = this.props
    // if (row.dataType === 'file') {
    //   dispatch(routerRedux.push('/dataSourceManagement/fileSource', { mountResourceId: row.id }))
    // } else {
    //   dispatch(routerRedux.push('/dataSourceManagement/dataBaseSource', { mountResourceId: row.id }))
    // }
    // console.log(row)
    dispatch(routerRedux.push('/dataSourceManagement/viewDirectory', {resourceId}))
  }

  handleEdit = () => {
    const { dispatch } = this.props
    dispatch(routerRedux.push('/dataSourceManagement/addDirectory'))
  }

  handleCatalog = row => {
    const { dispatch } = this.props
    // dispatch(routerRedux.push('/dataSourceManagement/catalog'))
    dispatch(routerRedux.push('/dataSourceManagement/viewDirectory', { resourceId: row.resourceId }))
  }

  tableChange = ({current: pageNum}) => {
    this.setState({
      pagination: {
        pageNum,
      },
    })
  }

  handlerelatedData = id => {
    const { dispatch } = this.props
    dispatch(
      routerRedux.push({
        pathname: '/dataSourceManagement/resourceConnection',
        state: { routeId: id },
      })
    )
    // dispatch(routerRedux.push('/dataSourceManagement/resourceConnection', { resourceId: row.resourceId, moutResourceId: row.moutResourceId  }))
  }

  handleAdd = () => {
    const { dispatch } = this.props
    dispatch(routerRedux.push('/dataSourceManagement/addDirectory'))
  }

  handleOpen = () => {
    const { dispatch } = this.props
    dispatch(routerRedux.push('/dataSourceManagement/openShare'))
    // dispatch(routerRedux.push('/dataSourceManagement/openShareFile'))
  }

  handleInput = () => {
    const { dispatch } = this.props
    dispatch(routerRedux.push('/dataSourceManagement/inputDirectory')) 
  }

  handleReset = () => {
    // console.log('重置') // eslint-disable-line
    this.setState({
      pagination: {
        pageNum: 1,
      },
    })
  }

  @Bind()
  @Throttle(1000)
  handleSearch(queryData = {}/* , pageReset = false */) {
    // const pagination = pageReset?{pageNum: 1, pageSize: 10}:this.state.pagination
    // console.log(pagination, queryData) // eslint-disable-line
    if (queryData.resourcePublishTime && queryData.resourcePublishTime.length > 0) {
      queryData.startTime = queryData.resourcePublishTime[0].format().substr(0,10)
      queryData.endTime = queryData.resourcePublishTime[1].format().substr(0,10)
    }
    delete queryData.resourcePublishTime
    queryData.isMount = queryData.isMount ? '1':''
    // if (queryData.typeId && queryData.typeId.length > 0) {
    //   if (!queryData.typeId[3] && queryData.typeId[3] !== 0) {
    //     return message.error('资源属性选择项不是细目')
    //   } else {
    //     queryData.typeId = queryData.typeId[3] // eslint-disable-line
    //   }
    // } else {
    //   queryData.typeId = undefined
    // }
    const { levelTree } = queryData
    delete queryData.levelTree
    if (Array.isArray(levelTree) && levelTree.length>0) {
      // [queryData.classId,queryData.projectId,queryData.catalogId,queryData.typeId] = queryData.typeId
      queryData.classId = `${levelTree[0]}`
      queryData.projectId = `${levelTree[1]}`
      queryData.catalogId = `${levelTree[2]}`
      queryData.typeId = `${levelTree[3]}`
    }else{
      queryData.typeId = ''
      queryData.catalogId = ''
      queryData.projectId = ''
      queryData.classId = ''
    }
    if (Array.isArray(queryData.nodeId)) {
      queryData.nodeId = [...queryData.nodeId].pop()
    }
    this.props.dispatch({
      type: 'catalogManagement/getCatalog',
      payload: {
        body: {
          // limit: pagination.pageSize || '10',
          // index: pagination.pageNum || '1',
          ...queryData,
        },
      },
    })
  }

  render() {
    const that = this
    const { isNodeOperator, isChanged, pagination: { pageNum: current } } = this.state
    const { nodeManagement: { parentNodeList = [] } = {}, catalogManagement: {catalogData,pagination, srcProsTree}, loading } = this.props
    const data4 = [
      { value: '0',  label: '已拒绝' },
      { value: '1', label: '已通过' },
      { value: '-1', label: '待审核' },
    ]
    const selectData4 = data4.map(item => {
      return (
        <Option value={item.value} key={item.value} title={item.label}>
          {item.label}
        </Option>
      )
    })
    const searchHandler = this.handleSearch
    const resetHandler = this.handleReset
    const formOptions = {
      formData: [
        {
          name: 'resourceCode',
          typeOptions: {
            placeholder: '信息资源代码',
            maxLength: 50,
          },
        },
        {
          name: 'resourceName',
          typeOptions: {
            placeholder: '信息资源名称',
            maxLength: 50,
          },
        },
        {
          name: 'nodeId',
          type: 'Cascader',
          typeOptions: {
            placeholder: '发布节点',
            options: parentNodeList,
            displayRender(label) {
              return label.pop()
            },
          },
        },
        // 这里应该是级联
        {
          name: 'levelTree',
          type: 'Cascader', // Cascader
          typeOptions: {
            placeholder: '资源属性分类',
            fieldNames: {label: 'name', value: 'id'},
            options: srcProsTree,
            displayRender(label) {
              return label.pop()
            },
          },
        },
        {
          name: 'checkStatus',
          type: 'Select',
          typeOptions: {
            placeholder: '审核状态',
            allowClear: true,
          },
          children: selectData4,
        },
        {
          name: 'resourcePublishTime',
          type: 'RangePicker',
        },
        {
          name: 'isMount',
          type: 'Checkbox',
          children: '数据已关联',
        },
      ],
      searchHandler,
      resetHandler,
    }
    const paginationProps = {
      showQuickJumper: true,
      hideOnSinglePage: true,
      showTotal(total) {
        return `共 ${Math.ceil(total / 10)}页 / ${total}条 数据`
      },
      ...pagination,
      current, 
    }
    // const data1 = [{ value: '0', id: 0, label: '节点' }, { value: '1', id: 1, label: '节点1' }]
    // const selectData1 = data1.map(item => {
    //   return (
    //     <Option value={item.value} key={item.id} title={item.label}>
    //       {item.label}
    //     </Option>
    //   )
    // })
    // const data2 = [
    //   { value: '0', id: 0, label: '所属机构' },
    //   { value: '1', id: 1, label: 'XXX机构' },
    // ]
    // const selectData2 = data2.map(item => {
    //   return (
    //     <Option value={item.value} key={item.id} title={item.label}>
    //       {item.label}
    //     </Option>
    //   )
    // })
    const columns = [
      // {
      //   title: 'ID',
      //   dataIndex: 'id',
      // },
      {
        title: '信息资源代码',
        dataIndex: 'resourceCode',
      },
      {
        title: '信息资源名称',
        dataIndex: 'resourceName',
      },
      {
        title: '资源属性分类',
        dataIndex: 'typeName',
      },
      // {
      //   title: '数据类型',
      //   dataIndex: 'dataType',
      //   // render(text) {
      //   //   return text === 'db' ? '数据库' : text
      //   // },
      // },
      {
        title: '发布节点',
        dataIndex: 'nodeName',
      },
      // {
      //   title: '所属机构',
      //   dataIndex: 'institution',
      // },
      // {
      //   title: '应用系统名称',
      //   dataIndex: 'applicationSystemName',
      // },
      {
        title: '发布日期',
        dataIndex: 'resourcePublishTime',
        // render(text) {
        //   return moment(text).format('lll')
        // },
      },
      {
        title: '数据已关联',
        dataIndex: 'isMount',
        render(t) {
          return +t === 1 ? '是' : '否' 
        },
      },
      {
        title: '信息项',
        dataIndex: 'itemNum',
      },
      {
        title: '订阅数',
        dataIndex: 'subAmounts',
        render(text) {
          return  text || '暂无'
        },
      },
      // {
      //   title: '数据最后更新时间',
      //   dataIndex: 'lastUpdataTime',
      //   render(text) {
      // //     return moment(text).format('YYYY-MM-DD HH:mm:ss')
      // //   },
      // // },
      // {
      //   title: '订阅数',
      //   dataIndex: 'subscription',
      // },
      {
        title: '审核状态',
        dataIndex: 'checkStatus',
        render(text) {
          switch (text) {
            case '-1':
              return '待审核'
            case '0':
              return '已拒绝'
            default:
              return '已通过'
          }
        },
      },
      {
        title: '操作',
        render: (text, row) => {
          if(+row.checkStatus === -1){
            // return (
              // <span className={styles.clickBtn} onClick={() => that.handleSource(row)}>
              //   查看
              // </span>
          //  )
          }else if(+row.checkStatus === 0){
            return (
              <span className={styles.clickBtn} onClick={() => that.handleSource(row)}>
                审核日志
              </span>
            )
          }else {
            return (
              <div>
                <span className={styles.clickBtn} onClick={() => that.handleSource(row)}>
                  查看
                </span>
                <span className={styles.clickBtn} onClick={() => that.handleSource(row)}>
                审核日志
                </span>
                {/* {row.isMount === 1 &&  */}
                <span className={styles.clickBtn} onClick={() => that.handlerelatedData(row.resourceId)}>关联数据</span>
                {/* }  */}
                <span className={styles.clickBtn} onClick={that.handleOpen}>
                  共享开放
                </span>
                {/*
                <span className={styles.clickBtn} onClick={that.handleEdit}>
                  修改
                </span>
                <Popconfirm
                  title={`确认删除${row.name}?`}
                  onConfirm={() => message.info('删除成功')}
                  >
                  <a>删除</a>
                </Popconfirm> */}
              </div>
            )
          }
        },
      },
    ]
    columns.forEach(item => {
      item.align = 'center'
    })
    return (
      <PageHeaderLayout>
        <Card>
          <SearchForm isChange={isChanged} formOptions={formOptions} onChange={this.onChange} />
          {/* <div className={styles.createBtn}>
            <Button icon="plus" type="primary" onClick={this.handleAdd} style={{marginRight:'20px'}}>
                新建
            </Button>
            <Button type="primary" onClick={this.handleInput}>
                导入
            </Button>
          </div> */}
          <div>
            <Table
              loading={loading}
              columns={columns}
              dataSource={catalogData}
              pagination={paginationProps}
              rowKey="resourceId"
              // rowSelection={rowSelection}
              bordered
              onChange={this.tableChange}
              />
          </div>
          <div>{isNodeOperator && <Button type="primary">删除</Button>}</div>
        </Card>
      </PageHeaderLayout>
    )
  }
}
