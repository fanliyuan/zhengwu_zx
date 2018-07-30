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
class PassManagement extends React.PureComponent {
  state = {
    startNode: '起始节点',
    endNode: '目标节点',
  }

  selectStartChange = val => {
    this.setState({
      startNode: val,
    })
  }

  selectEndChange = val => {
    this.setState({
      endNode: val,
    })
  }

  editHandle = row => {
    const { dispatch } = this.props
    const { startCode, targetCode, isTwoWay, isCompress, isEncrypt } = row
    dispatch({
      type: 'passOperation/saveRowInfo',
      payload: { startCode, targetCode, isTwoWay, isCompress, isEncrypt },
    })

    dispatch(routerRedux.push('/infrastructure/editPass'))
  }

  render() {
    const that = this
    const { startNode, endNode } = this.state
    const data1 = [
      { value: '0', label: '石家庄市发展改革委', id: 1 },
      { value: '1', label: '北京发展改革委', id: 2 },
    ]
    const data2 = [
      { value: '0', label: '石家庄市民政部', id: 1 },
      { value: '1', label: '北京民政部', id: 2 },
    ]
    const selectData1 = data1.map(item => {
      return (
        <Option value={item.value} key={item.id} title={item.label}>
          {item.label}
        </Option>
      )
    })
    const selectData2 = data2.map(item => {
      return (
        <Option value={item.value} key={item.id} title={item.label}>
          {item.label}
        </Option>
      )
    })
    const pagination = { pageSize: 10, current: 1 }
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
        dataIndex: 'isTwoWay',
        render(text) {
          return +text === 0 ? '否' : '是'
        },
      },
      {
        title: '是否压缩',
        dataIndex: 'isCompress',
        render(text) {
          return +text === 0 ? '否' : '是'
        },
      },
      {
        title: '是否加密',
        dataIndex: 'isEncrypt',
        render(text) {
          return +text === 0 ? '否' : '是'
        },
      },
      {
        title: '管道状态',
        dataIndex: 'passStatus',
      },
      {
        title: '任务状态',
        dataIndex: 'taskStatus',
      },
      {
        title: '操作',
        // dataIndex:'operation',
        render(text, row) {
          return (
            <div>
              <span
                onClick={that.editHandle.bind(null, row)}
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
    const list = [
      {
        id: 0,
        startCode: '0',
        startNode: '石家庄市发展改革委',
        targetCode: '0',
        targetNode: '石家庄市民政部',
        isTwoWay: '0',
        isCompress: '1',
        isEncrypt: '0',
        passStatus: '联通',
        taskStatus: '运行中',
      },
      {
        id: 1,
        startCode: '1',
        startNode: '北京发展改革委',
        targetCode: '1',
        targetNode: '北京民政部',
        isTwoWay: '1',
        isCompress: '1',
        isEncrypt: '0',
        passStatus: '联通',
        taskStatus: '运行中',
      },
    ]
    return (
      <PageHeaderLayout>
        <Card>
          <div className={styles.forms}>
            <Select
              value={startNode}
              style={{ marginRight: 20, width: 200 }}
              onChange={this.selectStartChange}
              >
              {selectData1}
            </Select>
            <Select
              value={endNode}
              style={{ marginRight: 20, width: 200 }}
              onChange={this.selectEndChange}
              >
              {selectData2}
            </Select>
            <Button type="primary">搜索</Button>
          </div>
          <div>
            <Table
              columns={columns}
              dataSource={list}
              pagination={pagination}
              // onChange={}
              // loading={loading}
              rowKey="id"
              bordered
              />
          </div>
        </Card>
      </PageHeaderLayout>
    )
  }
}

export default connect(({ passOperation }) => ({
  data: passOperation.params,
}))(PassManagement)
