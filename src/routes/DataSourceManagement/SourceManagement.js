import React, { Component } from 'react'
import { Table, Button, Input, Select, Card, DatePicker, Popconfirm, message, Cascader } from 'antd'
import moment from 'moment'
import { connect } from 'dva'
import { routerRedux } from 'dva/router'

import styles from './SourceManagement.less'
import PageHeaderLayout from '../../layouts/PageHeaderLayout'

const { Option } = Select
const { RangePicker } = DatePicker
@connect(({ sourceManagement }) => ({
  sourceManagement,
}))
export default class SourceManagement extends Component {
  state = {
    dataType: '0',
    // nodeName: '0',
    // owingJg: '0',
    status: '0',
    isNodeOperator: false,
  }

  componentDidMount() {
    this.setState({
      isNodeOperator: localStorage['antd-pro-authority'] === 'operator-n',
    })
  }

  dataTypeChange = val => {
    this.setState({
      dataType: val,
    })
  }

  nodeNameChange = () => {
    // this.setState({
    //   nodeName: val,
    // })
  }

  owingJgChange = () => {
    // this.setState({
    //   owingJg: val,
    // })
  }

  statusChange = val => {
    this.setState({
      status: val,
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

  handleTask = () => {
    const { dispatch } = this.props
    dispatch(routerRedux.push('/dataSourceManagement/task'))
  }

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
    const { dataType, status, isNodeOperator } = this.state
    const options = [
      {
        value: '0-0',
        label: '北京国土局',
        children: [
          {
            value: '0-0-1',
            label: '海淀国土局',
            // children: [{
            //   value: 'xihu',
            //   label: 'West Lake',
            // }],
          },
        ],
      },
      {
        value: '0-1',
        label: '河北国土局',
        children: [
          {
            value: '0-1-0',
            label: '保定国土局',
            // children: [{
            //   value: 'zhonghuamen',
            //   label: 'Zhong Hua Men',
            // }],
          },
        ],
      },
    ]
    const data = [
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
      { value: '0', id: 0, label: '审核状态' },
      { value: '1', id: 1, label: '审核状态1' },
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
      {
        title: '所属节点',
        dataIndex: 'node',
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
        title: '注册时间',
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
                <span className={styles.clickBtn} onClick={that.handleTask}>
                  任务
                </span>
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
                <span className={styles.clickBtn} onClick={that.handleTask}>
                  任务
                </span>
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
    }
    return (
      <PageHeaderLayout>
        <Card>
          <div className={styles.form}>
            <Input placeholder="资源名称" style={{ width: 150, marginRight: 20 }} />
            {/* <Input placeholder="应用系统名称" style={{ width: 150, marginRight: 20 }} /> */}
            <Select
              style={{ marginRight: 20, width: 120 }}
              value={dataType}
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
            <Cascader options={options} placeholder="所属节点" style={{ marginRight: 16 }} />
            {/* <Select
              style={{ marginRight: 20, width: 120 }}
              value={owingJg}
              onChange={this.owingJgChange}
            >
              {selectData2}
            </Select> */}
            <Select
              style={{ marginRight: 20, width: 120 }}
              value={status}
              onChange={this.statusChange}
            >
              {selectData4}
            </Select>
            <RangePicker style={{ marginRight: 20, width: 210 }} />
            <Button type="primary">搜索</Button>
          </div>
          <div>
            <Table
              columns={columns}
              dataSource={list}
              pagination={pagination}
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
