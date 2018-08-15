import React, { Component } from 'react'
import { Table, Button, Input, Select, Card, Cascader, Tooltip, Popconfirm } from 'antd'
import moment from 'moment'
import { connect } from 'dva'
import { routerRedux } from 'dva/router'

import styles from './SwitchManagement.less'
import './SwitchManagement.css'
import PageHeaderLayout from '../../layouts/PageHeaderLayout'

const { Option } = Select
@connect(({ regionManagement, loading }) => ({
  regionManagement,
  loading: loading.models.regionManagement,
}))
export default class SwitchManagement extends Component {
  state = {
    queryData: {
      regionName: '',
      nodeId: '',
      status: -1,
    },
    isChanged: false,
  }

  componentDidMount() {
    this.props.dispatch({
      type: 'regionManagement/getRegion',
      payload: {},
    })
    this.props.dispatch({
      type: 'regionManagement/getRegionNodes',
    })
  }

  regionNameChange = (e) => {
    this.setState({
      queryData: {
        ...this.state.queryData,// eslint-disable-line
        regionName: e.target.value,
      },
      isChanged: true,
    })
  }

  statusChange = val => {
    this.setState({
      queryData: {
        ...this.state.queryData,// eslint-disable-line
        status: val,
      },
      isChanged: true,
    })
  }

  nodeChange = val => {
    this.setState({
      queryData: {
        ...this.state.queryData,// eslint-disable-line
        nodeId: val,
      },
      isChanged: true,
    })
  }

  handleSearch = () => {
    if (!this.state.isChanged) return null
    const queryData = {
      regionName: this.state.queryData.regionName,
      status: this.state.queryData.status === -1 ? '' : this.state.queryData.status,
      nodeId: this.state.queryData.nodeId[this.state.queryData.nodeId.length-1],
    }
    this.props.dispatch({
      type: 'regionManagement/getRegion',
      payload: {
        params: queryData,
      },
    })
  }

  handleAdd = () => {
    const { dispatch } = this.props
    dispatch(routerRedux.push('/infrastructure/addSwitch'))
  }

  tableChange = (pagination) => {
    const queryData = {
      regionName: this.state.queryData.regionName,
      status: this.state.queryData.status === -1 ? '' : this.state.queryData.status,
      nodeId: this.state.queryData.nodeId[this.state.queryData.nodeId.length-1],
      pageSize: pagination.pageSize,
      pageNumber: pagination.current,
    }
    this.props.dispatch({
      type: 'regionManagement/getRegion',
      payload: {
        params: queryData,
      },
    })
  }

  handleToggle = (row) => {
    if (row.status) {
      this.props.dispatch({
        type: 'regionManagement/stopRegion',
        payload: {
          regionId: row.regionId,
        },
      })
    } else {
      this.props.dispatch({
        type: 'regionManagement/startRegion',
        payload: {
          regionId: row.regionId,
        },
      })
    }
  }

  handleDelete = row => {
    this.props.dispatch({
      type: 'regionManagement/deleteRegion',
      payload: {
        regionId: row.regionId,
      },
    })
  }

  handleEdit = row => {
    let nodeIds = []
    let deptIds = []
    if (Array.isArray(row.nodeInfos)) {
      row.nodeInfos.forEach(item => {
        item.nodeId && nodeIds.push(`${item.nodeId}`) // eslint-disable-line
        item.deptId && deptIds.push(`${item.deptId}`) // eslint-disable-line
      })
    }
    // 数组去重
    nodeIds = [...new Set(nodeIds)]
    deptIds = [...new Set(deptIds)]
    const regoinInfo = {
      regionId: row.regionId,
      regionName: row.regionName,
      status: !!row.status,
      nodeIds,
      deptIds,
    }
    this.props.dispatch(
      routerRedux.push('/infrastructure/editSwitch', {regoinInfo})
    )
  }

  render() {
    const that = this
    const { queryData: { regionName, nodeId, status } } = this.state
    const { regionManagement: { list, pagination, nodeList } } = this.props
    const data3 = [{ value: -1, label: '全部状态', id: -1 }, { value: 1, label: '启用', id: 1 }, { value: 0, label: '停用', id: 0 }]
    const selectData3 = data3.map(item => {
      return (
        <Option value={item.value} key={item.id} title={item.label}>
          {item.label}
        </Option>
      )
    })
    const columns = [
      {
        title: 'ID',
        dataIndex: 'regionId',
      },
      {
        title: '域名称',
        dataIndex: 'regionName',
      },
      // {
      //   title: '描述',
      //   dataIndex: 'description',
      // },
      {
        title: '交换范围节点',
        dataIndex: 'nodeInfos',
        className: 'column',
        render: (cell) => {
          if (!Array.isArray(cell)) {
            cell = []
          }
          const divCom = (
            <div>
              {cell.map(item => <div key={item.nodeId}>{item.nodeName}</div>)}
            </div>
          )
          const nodeNameList = cell.filter(item => item.nodeName).map(item => item.nodeName)
          return (
            <Tooltip title={divCom}>
              <span>{nodeNameList.join(',')}</span>
            </Tooltip>
          )
        },
      },
      {
        title: '更新时间',
        dataIndex: 'updateTime',
        render(text) {
          return moment(~~text).format('YYYY-MM-DD HH:mm:ss')
        },
      },
      {
        title: '状态',
        dataIndex: 'status',
        render(text) {
          return +text === 0 ? '停用' : '启用'
        },
      },
      {
        title: '操作',
        render: (text, row) => {
          if (+row.status === 0) {
            return (
              <div>
                <span className={styles.editBtn} onClick={() =>that.handleToggle(row)}>
                  {text ? '启用' : '停用'}
                </span>
                <span className={styles.editBtn} onClick={() => this.handleEdit(row)}>
                  修改
                </span>
                <Popconfirm title={`确认是否删除${row.regionName}?`} onConfirm={() => this.handleDelete(row)}>
                  <a style={{ marginRight: 10 }}>删除</a>
                </Popconfirm>
              </div>
            )
          } else {
            return (
              <div>
                <span className={styles.editBtn} onClick={() =>that.handleToggle(row)}>
                  {text ? '停用' : '启用'}
                </span>
              </div>
            )
          }
        },
      },
    ]
    columns.forEach(item => {
      item.align = 'center'
    })
    // const list = [
    //   {
    //     id: 0,
    //     areaName: '国土服务',
    //     description: '关于此域的一段描述',
    //     switchRange: '一级机构',
    //     updateTime: 232742424624,
    //     status: '0',
    //   },
    //   {
    //     id: 1,
    //     areaName: '国土服务11',
    //     description: '关于此域的一段描述11',
    //     switchRange: '一级节点',
    //     updateTime: 232742424624,
    //     status: '1',
    //   },
    // ]
    return (
      <PageHeaderLayout>
        <Card>
          <div className={styles.form}>
            <Input value={regionName} onChange={this.regionNameChange} placeholder="域名称" style={{ marginRight: 20, width: 150 }} />
            <Cascader value={nodeId} onChange={this.nodeChange} options={nodeList} placeholder="交换范围节点" style={{ marginRight: 20 }} changeOnSelect />
            <Select value={status} style={{ marginRight: 20, width: 120 }} onChange={this.statusChange}>
              {selectData3}
            </Select>
            <Button type="primary" onClick={this.handleSearch}>搜索</Button>
          </div>
          <div className={styles.createBtn}>
            <Button type="primary" onClick={this.handleAdd}>
              新建
            </Button>
          </div>
          <div>
            <Table
              columns={columns}
              dataSource={list}
              pagination={pagination && {...pagination, showQuickJumper: true, showTotal: (total) => `共 ${Math.ceil(total / pagination.pageSize)}页 / ${total}条 数据`}}
              onChange={this.tableChange}
              rowKey="regionId"
              bordered
              />
          </div>
        </Card>
      </PageHeaderLayout>
    )
  }
}
