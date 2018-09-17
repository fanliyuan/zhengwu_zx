import React, { Component } from 'react'
import { Table, Button, Input, Select, Card, DatePicker, Popconfirm, message, Cascader } from 'antd'
import moment from 'moment'
import { connect } from 'dva'
import { routerRedux } from 'dva/router'

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
      isNodeOperator: localStorage['antd-pro-authority'] === 'operator-n',
    })
    this.props.dispatch({
      type: 'nodeManagement/getParentNodes',
    })
  }

  nameChange = e => {
    const { queryData } = this.state
    this.setState({
      queryData: {
        ...queryData,
        sourceTitle: e.target.value.trim(),
      },
      isChanged: true,
    })
  }

  dataTypeChange = val => {
    const { queryData } = this.state
    this.setState({
      queryData: {
        ...queryData,
        dataType: val,
      },
      isChanged: true,
    })
  }

  nodeChange = val => {
    const { queryData } = this.state
    this.setState({
      queryData: {
        ...queryData,
        nodeId: val[0] && +[...val].pop(),
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
        status: val,
      },
      isChanged: true,
    })
  }

  timeChange = val => {
    const { queryData } = this.state
    this.setState({
      queryData: {
        ...queryData,
        startTime: val[0] ? format0(val[0].format('x')):undefined,
        endTime: val[1] ? format24(val[1].format('x')):undefined,
      },
      isChanged: true,
    })
  }

  searchHandle = () => {
    const { queryData, isChanged } = this.state
    if (!isChanged) return null
    console.log(queryData) // eslint-disable-line
    this.setState({
      isChanged: false,
    })
  }

  handleSource = () => {
    const { dispatch } = this.props
    dispatch(routerRedux.push('/dataSourceManagement/dataBaseSource'))
  }

  handleSource1 = () => {
    const { dispatch } = this.props
    dispatch(routerRedux.push('/dataSourceManagement/fileSource'))
  }

  // handleTask = () => {
  //   const { dispatch } = this.props
  //   dispatch(routerRedux.push('/dataSourceManagement/task'))
  // }

  handleEdit = () => {
    const { dispatch } = this.props
    dispatch(routerRedux.push('/dataSourceManagement/inputDataInfo'))
  }

  handleCheck = () => {
    const { dispatch } = this.props
    dispatch(routerRedux.push('/dataSourceManagement/checkDataInfo'))
  }

  handleCatalog = () => {
    const { dispatch } = this.props
    dispatch(routerRedux.push('/dataSourceManagement/catalog'))
  }

  handleCatalog1 = () => {
    const { dispatch } = this.props
    dispatch(routerRedux.push('/dataSourceManagement/viewDirectory'))
  }

  render() {
    const that = this
    const { isNodeOperator } = this.state
    const { nodeManagement: { parentNodeList }, loading } = this.props
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
      { value: '-1', id: -1, label: '全部数据' },
      { value: '0', id: 0, label: '数据类型' },
      { value: '1', id: 1, label: '数据类型1' },
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
      { value: '-1', id: 0, label: '全部状态' },
      { value: '0', id: 1, label: '已拒绝' },
      { value: '1', id: 1, label: '已通过' },
      { value: '2', id: 1, label: '待审核' },
    ]
    const selectData4 = data4.map(item => {
      return (
        <Option value={item.value} key={item.id} title={item.label}>
          {item.label}
        </Option>
      )
    })
    const pagination = { pageSize: 10, current: 1 }
    const columns = [
      // {
      //   title: 'ID',
      //   dataIndex: 'id',
      // },
      {
        title: '资源名称',
        dataIndex: 'name',
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
        dataIndex: 'createTime',
        render(text) {
          return moment(text).format('YYYY-MM-DD HH:mm:ss')
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
        dataIndex: 'status',
        render(text) {
          return +text === 0 ? '待审核' : +text === 1 ? '已通过' : '已拒绝'
        },
      },
      {
        title: '操作',
        render(text, row) {
          if (+row.id === 2) {
            return (
              <div>
                <span className={styles.clickBtn} onClick={that.handleCatalog}>
                  目录
                </span>
                <span className={styles.clickBtn} onClick={that.handleSource1}>
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
                {!isNodeOperator && (
                  <span className={styles.clickBtn} onClick={that.handleCheck}>
                    查看
                  </span>
                )}
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
          } else {
            return (
              <div>
                <span className={styles.clickBtn} onClick={that.handleCatalog1}>
                  目录
                </span>
                <span className={styles.clickBtn} onClick={that.handleSource}>
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
                {!isNodeOperator && (
                  <span className={styles.clickBtn} onClick={that.handleCheck}>
                    查看
                  </span>
                )}
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
          }
        },
      },
    ]
    columns.forEach(item => {
      item.align = 'center'
    })
    const list = [
      {
        id: 0,
        name: '城市低保标准表(各市第1季度)',
        dataType: 'Mysql',
        node: '石家庄民政部',
        institution: '石家庄民政部',
        applicationSystemName: '统计系统',
        createTime: 233435354,
        lastUpdataTime: 343435354,
        subscription: 2,
        status: '0',
      },
      {
        id: 1,
        name: '农村低保标准表(各市第1季度)',
        dataType: 'Mysql',
        node: '石家庄民政部',
        institution: '石家庄民政部',
        applicationSystemName: '统计系统',
        createTime: 233435354,
        lastUpdataTime: 343435354,
        subscription: 1,
        status: '1',
      },
      {
        id: 2,
        name: '人口普查数据',
        dataType: '文件',
        node: '石家庄民政部',
        institution: '石家庄民政部',
        applicationSystemName: '统计系统',
        createTime: 233435354,
        lastUpdataTime: 343435354,
        subscription: 5,
        status: '2',
      },
    ]
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
        dataIndex: 'institution',
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
              defaultValue='-1'
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
              defaultValue='-1'
              onChange={this.statusChange}
              >
              {selectData4}
            </Select>
            <RangePicker style={{ marginRight: 20, width: 210 }} onChange={this.timeChange} />
            <Button type="primary" onClick={this.searchHandle}>搜索</Button>
          </div>
          <div>
            <Table
              loading={loading}
              columns={columns}
              dataSource={list}
              pagination={pagination && {...pagination, showQuickJumper: true, showTotal: (total) => `共 ${Math.ceil(total / pagination.pageSize)}页 / ${total}条 数据`}}
              rowKey="id"
              rowSelection={rowSelection}
              bordered
              />
          </div>
          <div>{isNodeOperator && <Button type="primary">删除</Button>}</div>
        </Card>
      </PageHeaderLayout>
    )
  }
}
