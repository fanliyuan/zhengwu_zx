import React, { Component } from 'react'
import { Table, Button, Input, Select, Card, Cascader, Message, Tooltip } from 'antd'
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
    isEnable: '状态',
    isStart: true,
    isStart1: false,
  }

  componentDidMount() {
    this.props.dispatch({
      type: 'regionManagement/getRegion',
      payload: {},
    })
  }

  isEnableChange = val => {
    this.setState({
      isEnable: val,
    })
  }

  handleAdd = () => {
    const { dispatch } = this.props
    dispatch(routerRedux.push('/infrastructure/addSwitch'))
  }

  handleStart = () => {
    const { isStart } = this.state
    if (isStart) {
      this.setState({
        isStart: false,
      })
      Message.info('停用成功!')
    } else {
      this.setState({
        isStart: true,
      })
      Message.info('启用成功!')
    }
  }

  handleStart1 = () => {
    const { isStart1 } = this.state
    if (isStart1) {
      this.setState({
        isStart1: false,
      })
      Message.info('停用成功!')
    } else {
      this.setState({
        isStart1: true,
      })
      Message.info('启用成功!')
    }
  }

  render() {
    const that = this
    const { isEnable, isStart, isStart1 } = this.state
    const { regionManagement: { list, pagination } } = this.props
    // const data1 = [
    //   {
    //     value: '1001',
    //     label: '机构1',
    //     children: [{ value: '101', label: '机构1.1' }, { value: '102', label: '机构1.2' }],
    //   },
    //   {
    //     value: '2001',
    //     label: '机构2',
    //     children: [{ value: '201', label: '机构1.2' }, { value: '202', label: '机构2.2' }],
    //   },
    // ]
    const data2 = [
      {
        value: '1001',
        label: '节点1',
        children: [{ value: '101', label: '节点1.1' }, { value: '102', label: '节点1.2' }],
      },
      {
        value: '2001',
        label: '节点2',
        children: [{ value: '201', label: '节点1.2' }, { value: '202', label: '节点2.2' }],
      },
    ]
    const data3 = [{ value: '0', label: '启用', id: 0 }, { value: '1', label: '停用', id: 1 }]
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
        render(text, row) {
          if (row.status === '0') {
            return (
              <div>
                <span className={styles.editBtn} onClick={that.handleStart}>
                  {isStart ? '启用' : '停用'}
                </span>
                <span className={styles.editBtn} onClick={that.handleAdd}>
                  修改
                </span>
                <a style={{ marginRight: 10 }}>删除</a>
              </div>
            )
          } else {
            return (
              <div>
                <span className={styles.editBtn} onClick={that.handleStart1}>
                  {isStart1 ? '启用' : '停用'}
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
            <Input placeholder="域名称" style={{ marginRight: 20, width: 150 }} />
            {/* <Cascader options={data1} placeholder="交换范围机构" style={{ marginRight: 20 }} />, */}
            <Cascader options={data2} placeholder="交换范围节点" style={{ marginRight: 20 }} />,
            <Select value={isEnable} style={{ marginRight: 20 }} onChange={this.isEnableChange}>
              {selectData3}
            </Select>
            <Button type="primary">搜索</Button>
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
              pagination={pagination}
              rowKey="regionId"
              bordered
              />
          </div>
        </Card>
      </PageHeaderLayout>
    )
  }
}
