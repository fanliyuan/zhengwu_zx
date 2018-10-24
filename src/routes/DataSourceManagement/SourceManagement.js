import React, { Component } from 'react'
import { Table, Button, Input, Select, Card, DatePicker, Popconfirm, message, Cascader } from 'antd'
import moment from 'moment'
import { connect } from 'dva'
import { routerRedux } from 'dva/router'
import Cookies from 'js-cookie'

import styles from './SourceManagement.less'
import PageHeaderLayout from '../../layouts/PageHeaderLayout'
import { format0, format24 } from '../../utils/utils'

const { Option } = Select
const { RangePicker } = DatePicker
@connect(({ sourceManagement, nodeManagement, loading }) => ({
  sourceManagement,
  nodeManagement,
  loading: loading.models.sourceManagement || loading.models.nodeManagement,
}))
export default class SourceManagement extends Component {
  state = {
    isNodeOperator: false,
    queryData: {},
    isChanged: false,
  }

  componentDidMount() {
    this.setState({
      isNodeOperator: Cookies.get(['antd-pro-authority']) === 'operator-n',
    })
    this.props.dispatch({
      type: 'nodeManagement/getParentNodes',
    })
    this.searchHandle({})
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

  dataTypeChange = val => {
    const { queryData } = this.state
    this.setState({
      queryData: {
        ...queryData,
        dataType: val === ''?undefined:val,
      },
      isChanged: true,
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
      isChanged: true,
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
      isChanged: true,
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
      isChanged: true,
    })
  }

  searchHandle = ({pageSize, current}, flag) => {
    const { isChanged } = this.state
    if (!isChanged && flag) return null
    const { queryData: { rsName, dataType, checkStatus,startTime, endTime, nodeName } } = this.state
    this.props.dispatch({
      type: 'sourceManagement/getResources',
      payload: {
        body: {
          pageSize: pageSize || '10',
          pageNum: current || '1',
          checkStatus,
          rsName,
          dataType,
          nodeName,
          startTime,
          endTime,
        },
      },
    })
    this.setState({
      isChanged: false,
    })
  }

  handleSource = row => {
    const { dispatch } = this.props
    if (row.dataType === 'file') {
      dispatch(routerRedux.push('/dataSourceManagement/fileSource', { mountResourceId: row.id }))
    } else {
      dispatch(routerRedux.push('/dataSourceManagement/dataBaseSource', { mountResourceId: row.id }))
    }
  }

  // handleSource1 = () => {
  //   const { dispatch } = this.props
  //   dispatch(routerRedux.push('/dataSourceManagement/fileSource'))
  // }

  // handleTask = () => {
  //   const { dispatch } = this.props
  //   dispatch(routerRedux.push('/dataSourceManagement/task'))
  // }

  handleEdit = () => {
    const { dispatch } = this.props
    dispatch(routerRedux.push('/dataSourceManagement/inputDataInfo'))
  }

  // handleCheck = () => {
  //   const { dispatch } = this.props
  //   dispatch(routerRedux.push('/dataSourceManagement/checkDataInfo'))
  // }

  handleCatalog = row => {
    const { dispatch } = this.props
    // dispatch(routerRedux.push('/dataSourceManagement/catalog'))
    dispatch(routerRedux.push('/dataSourceManagement/viewDirectory', { resourceId: row.resourceId }))
  }

  // handleCatalog1 = () => {
  //   const { dispatch } = this.props
  //   dispatch(routerRedux.push('/dataSourceManagement/viewDirectory'))
  // }

  tableChange = pagination => {
    this.searchHandle(pagination)
  }

  render() {
    const that = this
    const { isNodeOperator } = this.state
    const { nodeManagement: { parentNodeList }, sourceManagement: {dataList,pagination}, loading } = this.props
    // const options = [
    //   {
    //     value: '0-0',
    //     label: '北京国土局',
    //     children: [
    //       {
    //         value: '0-0-1',
    //         label: '海淀国土局',
    //         // children: [{
    //         //   value: 'xihu',
    //         //   label: 'West Lake',
    //         // }],
    //       },
    //     ],
    //   },
    //   {
    //     value: '0-1',
    //     label: '河北国土局',
    //     children: [
    //       {
    //         value: '0-1-0',
    //         label: '保定国土局',
    //         // children: [{
    //         //   value: 'zhonghuamen',
    //         //   label: 'Zhong Hua Men',
    //         // }],
    //       },
    //     ],
    //   },
    // ]
    const data = [
      { value: '', id: -1, label: '全部数据' },
      { value: 'db', id: 0, label: '数据库' },
      { value: 'file', id: 1, label: '文件' },
      { value: 'ftp', id: 2, label: 'FTP' },
    ]
    const selectData = data.map(item => {
      return (
        <Option value={item.value} key={item.id} title={item.label}>
          {item.label}
        </Option>
      )
    })
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
    const data4 = [
      { value: '-2',  label: '全部状态' },
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
    const columns = [
      // {
      //   title: 'ID',
      //   dataIndex: 'id',
      // },
      {
        title: '资源名称',
        dataIndex: 'rsName',
      },
      {
        title: '数据类型',
        dataIndex: 'dataType',
      },
      // {
      //   title: '所属节点',
      //   dataIndex: 'node',
      // },
      // {
      //   title: '所属机构',
      //   dataIndex: 'institution',
      // },
      // {
      //   title: '应用系统名称',
      //   dataIndex: 'applicationSystemName',
      // },
      {
        title: '数据更新时间',
        dataIndex: 'updataTime',
        render(text) {
          return moment(text).format('lll')
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
          return (
            <div>
              {/* <span className={styles.clickBtn} onClick={() => that.handleCatalog(row)}>
                目录
              </span> */}
              <span className={styles.clickBtn} onClick={() => that.handleSource(row)}>
                资源
              </span>
              {/* <span className={styles.clickBtn} onClick={that.handleTask}>
                任务
              </span> */}
              {isNodeOperator && (
                <span className={styles.clickBtn} onClick={that.handleEdit}>
                  修改
                </span>
              )}
              {/* {!isNodeOperator && (
                <span className={styles.clickBtn} onClick={that.handleCheck}>
                  查看
                </span>
              )} */}
              {isNodeOperator && (
                <Popconfirm
                  title={`确认删除${row.name}?`}
                  onConfirm={() => message.info('删除成功')}
                  >
                  <a>删除</a>
                </Popconfirm>
              )}
            </div>
          )
        },
      },
    ]
    columns.forEach(item => {
      item.align = 'center'
    })
    // const list = [
    //   {
    //     id: 0,
    //     name: '城市低保标准表(各市第1季度)',
    //     dataType: 'Mysql',
    //     node: '石家庄民政部',
    //     institution: '石家庄民政部',
    //     applicationSystemName: '统计系统',
    //     createTime: 233435354,
    //     lastUpdataTime: 343435354,
    //     subscription: 2,
    //     status: '0',
    //   },
    //   {
    //     id: 1,
    //     name: '农村低保标准表(各市第1季度)',
    //     dataType: 'Mysql',
    //     node: '石家庄民政部',
    //     institution: '石家庄民政部',
    //     applicationSystemName: '统计系统',
    //     createTime: 233435354,
    //     lastUpdataTime: 343435354,
    //     subscription: 1,
    //     status: '1',
    //   },
    //   {
    //     id: 2,
    //     name: '人口普查数据',
    //     dataType: '文件',
    //     node: '石家庄民政部',
    //     institution: '石家庄民政部',
    //     applicationSystemName: '统计系统',
    //     createTime: 233435354,
    //     lastUpdataTime: 343435354,
    //     subscription: 5,
    //     status: '2',
    //   },
    // ]
    let rowSelection = {
      // onChange: selectedRows => {
      // },
      // getCheckboxProps: record => ({
      //   disabled: record.name === 'Disabled User',
      //   name: record.name,
      // }),
    }
    if (!isNodeOperator) {
      rowSelection = null
      columns.splice(2,0,{
        title: '所属节点',
        dataIndex: 'nodeName',
        align: 'center',
      })    
    }
    return (
      <PageHeaderLayout>
        <Card>
          <div className={styles.form}>
            <Input placeholder="资源名称" style={{ width: 150, marginRight: 20 }} onChange={this.nameChange} />
            {/* <Input placeholder="应用系统名称" style={{ width: 150, marginRight: 20 }} /> */}
            <Select
              style={{ marginRight: 20, width: 120 }}
              defaultValue=''
              onChange={this.dataTypeChange}
              >
              {selectData}
            </Select>
            {/* <Select
              style={{ marginRight: 20, width: 120 }}
              value={nodeName}
              onChange={this.nodeNameChange}
            >
              {selectData1}
            </Select> */}
            {!isNodeOperator && <Cascader options={parentNodeList} changeOnSelect displayRender={label => [...label].pop()} onChange={this.nodeChange} placeholder="所属节点" style={{ marginRight: 16, width: 120 }} />}
            {/* <Select
              style={{ marginRight: 20, width: 120 }}
              value={owingJg}
              onChange={this.owingJgChange}
            >
              {selectData2}
            </Select> */}
            <Select
              style={{ marginRight: 20, width: 120 }}
              defaultValue='-2'
              onChange={this.statusChange}
              >
              {selectData4}
            </Select>
            <RangePicker style={{ marginRight: 20, width: 210 }} onChange={this.timeChange} />
            <Button type="primary" onClick={() => this.searchHandle({}, true)}>搜索</Button>
          </div>
          <div>
            <Table
              loading={loading}
              columns={columns}
              dataSource={dataList}
              pagination={pagination && {...pagination, showQuickJumper: true, showTotal: (total) => `共 ${Math.ceil(total / pagination.pageSize)}页 / ${total}条 数据`}}
              rowKey="rsId"
              rowSelection={rowSelection}
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
