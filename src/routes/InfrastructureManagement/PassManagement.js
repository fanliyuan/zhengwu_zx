/*
 * @Author: fly
 * @Date: 2018-07-03 11:14:19
 * @Last Modified by: fly
 * @Last Modified time: 2018-07-03 
*/
import React from 'react'
import { Select, Button, Table, Card } from 'antd'
import { routerRedux } from 'dva/router'
import { connect } from 'dva'

import styles from './PassManagement.less'
import PageHeaderLayout from '../../layouts/PageHeaderLayout'

const { Option } = Select
let startOptions
let targetOptions
@connect(({ passOperation, loading }) => ({
  passOperation,
  loading:loading.effects['passOperation/querys'],
}))
export default class PassManagement extends React.Component {
  state = {
    startNodeId: -1,
    targetNodeId: -1,
    isChanged:false,
  }

  componentDidMount = () => {
    const { dispatch } = this.props
    dispatch({
      type:'passOperation/querys',
      // payload:{pageNumber:1,pageSize:10},
    })
    dispatch({
      type:'passOperation/getStartNode',
      // payload:{targetNodeId:-1},
    })
    dispatch({
      type:'passOperation/getTargetNode',
      // payload:{startNodeId:-1},
    })
  }

  searchValue = (arr, value) => {
    let result
    arr.forEach(item => {
      if(value === item.value){
        result = item.key
      }
    })
    return result
  }

  selectStartChange = val => {
    const id = this.searchValue(startOptions,val)
    this.setState({
      startNodeId: id,
      isChanged:true,
    })
    const cid = +id === -1 ? '' : id
    const { dispatch } = this.props
    dispatch({
      type:'passOperation/getTargetNode',
      payload:{startNodeId:cid},
    })
  }

  selectEndChange = val => {
    const id = this.searchValue(targetOptions,val)
    this.setState({
      targetNodeId: id,
      isChanged:true,
    })
    const cid = +id === -1 ? '' : id
    const { dispatch } = this.props
    dispatch({
      type:'passOperation/getStartNode',
      payload:{targetNodeId:cid},
    })
  }

  editHandle = row => {
    const { dispatch } = this.props
    const { startNode, targetNode, isDoubleSide, isCompress, isEncryption, id } = row
    row.startNodeId = this.searchValue(startOptions,startNode)
    row.targetNodeId = this.searchValue(targetOptions,targetNode)
    dispatch({
      type: 'passOperation/saveRowInfo',
      payload: { startNode, targetNode, isDoubleSide, isCompress, isEncryption, id },
    })

    dispatch(routerRedux.push('/infrastructure/editPass'))
  }

  handleSearch = () =>{
    const { isChanged, startNodeId, targetNodeId } = this.state
    if(isChanged){
      // debugger // eslint-disable-line
      const start = +startNodeId === -1 ? '' : startNodeId
      const target = +targetNodeId === -1 ? '' : targetNodeId
      const { dispatch } = this.props
      dispatch({
        type:'passOperation/querys',
        payload:{startNodeId:start, targetNodeId:target},
      })
    }
  }

  handleTableChange = pagination => {
    const { pageSize, current } = pagination
    const { dispatch } = this.props
    dispatch({
      type:'passOperation/querys',
      payload:{ pageSize, pageNumber:current},
    })
  }

  render() {
    const { startNodeId, targetNodeId } = this.state
    const { passOperation:{list, pagination, startNode, targetNode }, loading } = this.props
    const searchId = (arr, id) => {
      let result
      arr.forEach(item => {
        if(+id === +item.key){
          result = item.value
        }
      })
      return result
    }
    startOptions = startNode
    targetOptions = targetNode
    const start =startNode.length ? searchId(startNode,startNodeId) : ''
    const target = targetNode.length ? searchId(targetNode,targetNodeId):''
  
    const selectData1 = startNode.map(item => {
      return (
        <Option value={item.value} key={item.key} title={item.value}>
          {item.value}
        </Option>
      )
    })
    const selectData2 = targetNode.map(item => {
      return (
        <Option value={item.value} key={item.key} title={item.value}>
          {item.value}
        </Option>
      )
    })
    const columns = [
      {
        title: 'ID',
        dataIndex: 'id',
      },
      {
        title: '起始节点',
        dataIndex: 'startNode',
      },
      {
        title: '目标节点',
        dataIndex: 'targetNode',
      },
      {
        title: '是否双向',
        dataIndex: 'isDoubleSide',
        // render(text) {
        //   return +text === 0 ? '否' : '是'
        // },
      },
      {
        title: '是否压缩',
        dataIndex: 'isCompress',
        // render(text) {
        //   return +text === 0 ? '否' : '是'
        // },
      },
      {
        title: '是否加密',
        dataIndex: 'isEncryption',
        // render(text) {
        //   return +text === 0 ? '否' : '是'
        // },
      },
      {
        title: '管道状态',
        dataIndex: 'channelState',
      },
      {
        title: '任务状态',
        dataIndex: 'taskState',
      },
      {
        title: '操作',
        // dataIndex:'operation',
        render: (text, row) => {
          return (
            <div>
              <span
                onClick={this.editHandle.bind(null, row)}
                style={{ marginRight: 10, color: '#1991FF', cursor: 'pointer' }}
                >
                修改
              </span>
              {/* <a href={`#${row.id}`} style={{ marginRight:10 }}>监控</a> 
              <a href={`#${row.id}`} style={{ marginRight:10 }}>统计</a>
              <a href={`#${row.id}`} style={{ marginRight:10 }}>任务</a> */}
            </div>
          )
        },
      },
    ]
    columns.forEach(item => {
      item.align = 'center'
    })
    return (
      <PageHeaderLayout>
        <Card>
          <div className={styles.forms}>
            <Select
              value={start}
              style={{ marginRight: 20, width: 200 }}
              onChange={this.selectStartChange}
              >
              {selectData1}
            </Select>
            <Select
              value={target}
              style={{ marginRight: 20, width: 200 }}
              onChange={this.selectEndChange}
              >
              {selectData2}
            </Select>
            <Button type="primary" onClick={this.handleSearch}>搜索</Button>
          </div>
          <div>
            <Table
              columns={columns}
              dataSource={list}
              pagination={pagination}
              onChange={this.handleTableChange}
              loading={loading}
              rowKey="id"
              bordered
              />
          </div>
        </Card>
      </PageHeaderLayout>
    )
  }
}
