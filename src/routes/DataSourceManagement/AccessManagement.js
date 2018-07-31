import React, { Component } from 'react'
import { Table, Button, Input, Select, Card, DatePicker, Popconfirm, message, Cascader } from 'antd'
import moment from 'moment'
import { connect } from 'dva'
import { routerRedux } from 'dva/router'

import styles from './AccessManagement.less'
import PageHeaderLayout from '../../layouts/PageHeaderLayout'

const { Option } = Select
const { RangePicker } = DatePicker
@connect(({ accessManagement }) => ({
  accessManagement,
}))
export default class AccessManagement extends Component {
  state = {
    dataType: '数据类型',
    // nodeName:'0',
    // owingJg: '0',
    creater: '创建人',
    // status:'0',
    isNodeOperator: false,
  }

  componentDidMount() {
    this.setState({
      isNodeOperator: localStorage.getItem('antd-pro-authority') === 'operator-n',
    })
  }

  selectDataTypeChange = val => {
    this.setState({
      dataType: val,
    })
  }

  selectNodeChange = () => {
    // this.setState({
    //   nodeName:val,
    // })
  }

  selectOwingJgChange = () => {
    // this.setState({
    //   owingJg: val,
    // })
  }

  selectCreaterChange = val => {
    this.setState({
      creater: val,
    })
  }

  selectStatusChange = () => {
    // this.setState({
    //   status:val,
    // })
  }

  handleAdd = () => {
    const { dispatch } = this.props
    dispatch(routerRedux.push('/dataSourceManagement/addAccess'))
  }

  handleEdit = () => {
    const { dispatch } = this.props
    dispatch(routerRedux.push('/dataSourceManagement/editAccess'))
  }

  handleRegister = () => {
    const { dispatch } = this.props
    dispatch(routerRedux.push('/dataSourceManagement/inputDataInfo'))
  }

  handleRegister1 = () => {
    const { dispatch } = this.props
    dispatch(routerRedux.push('/dataSourceManagement/updataFile'))
  }

  handleRegister2 = () => {
    const { dispatch } = this.props
    dispatch(routerRedux.push('/dataSourceManagement/ftp'))
  }

  render() {
    const that = this
    const { dataType, creater, isNodeOperator } = this.state
    const data = [
      { value: '0', id: 0, label: '类型1' },
      { value: '1', id: 1, label: '类型2' },
    ]
    const selectData = data.map(item => {
      return (
        <Option value={item.value} key={item.id} title={item.label}>
          {item.label}
        </Option>
      )
    })
    // const data1=[
    //   {value:'0',id:0,label:'节点'},
    //   {value:'1',id:1,label:'节点1'},
    // ];
    // const selectData1 = data1.map(item => {
    //   return (<Option value={item.value} key={item.id} title={item.label}>{item.label}</Option>)
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
    const data3 = [{ value: '0', id: 0, label: '创建人1' }, { value: '1', id: 1, label: '创建人2' }]
    const selectData3 = data3.map(item => {
      return (
        <Option value={item.value} key={item.id} title={item.label}>
          {item.label}
        </Option>
      )
    })
    // const data4=[
    //   {value:'0',id:0,label:'审核状态'},
    //   {value:'1',id:1,label:'审核状态1'},
    // ];
    // const selectData4 = data4.map(item => {
    //   return (<Option value={item.value} key={item.id} title={item.label}>{item.label}</Option>)
    // })
    const pagination = { pageSize: 10, current: 1 }
    const columns = [
      {
        title: '名称',
        dataIndex: 'name',
      },
      {
        title: '数据类型',
        dataIndex: 'dataType',
      },
      // {
      //   title: '节点',
      //   dataIndex: 'node',
      // },
      // {
      //   title: '所属节点',
      //   dataIndex: 'institution',
      // },
      {
        title: '创建人',
        dataIndex: 'creater',
      },
      {
        title: '建立时间',
        dataIndex: 'createTime',
        render(text) {
          return moment(text).format('YYYY-MM-DD HH:mm:ss')
        },
      },
      {
        title: '审核状态',
        dataIndex: 'status',
        render(text) {
          return +text === 0 ? '待审核' : +text === 1 ? '已通过' : '已拒绝'
        },
      },
    ]
    if (isNodeOperator) {
      columns.push({
        title: '操作',
        render(text, row) {
          if (row.status === '0') {
            return (
              <div>
                <span className={styles.editBtn} onClick={that.handleEdit}>
                  修改
                </span>
                <Popconfirm
                  title={`此操作将删除${row.name},是否继续?`}
                  onConfirm={() => message.info('执行了删除操作')}
                  >
                  <a style={{ marginRight: 20 }}>删除</a>
                </Popconfirm>
              </div>
            )
          } else if (+row.id === 1) {
            return (
              <div>
                <span className={styles.editBtn} onClick={that.handleEdit}>
                  修改
                </span>
                <Popconfirm
                  title={`此操作将删除${row.name},是否继续?`}
                  onConfirm={() => message.info('执行了删除操作')}
                  >
                  <a style={{ marginRight: 20 }}>删除</a>
                </Popconfirm>
                <span className={styles.editBtn} onClick={that.handleRegister}>
                  资源注册
                </span>
              </div>
            )
          } else if (+row.id === 2) {
            return (
              <div>
                <span className={styles.editBtn} onClick={that.handleEdit}>
                  修改
                </span>
                <Popconfirm
                  title={`此操作将删除${row.name},是否继续?`}
                  onConfirm={() => message.info('执行了删除操作')}
                  >
                  <a style={{ marginRight: 20 }}>删除</a>
                </Popconfirm>
                <span className={styles.editBtn} onClick={that.handleRegister1}>
                  资源注册
                </span>
              </div>
            )
          } else if (+row.id === 3) {
            return (
              <div>
                <span className={styles.editBtn} onClick={that.handleEdit}>
                  修改
                </span>
                <Popconfirm
                  title={`此操作将删除${row.name},是否继续?`}
                  onConfirm={() => message.info('执行了删除操作')}
                  >
                  <a style={{ marginRight: 20 }}>删除</a>
                </Popconfirm>
                <span className={styles.editBtn} onClick={that.handleRegister2}>
                  资源注册
                </span>
              </div>
            )
          }
        },
      })
    }else{
      columns.splice(2,0,{
        title: '所属节点',
        dataIndex: 'institution',
      })    
    }
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
        creater: '张三',
        createTime: 233435354,
        status: '0',
      },
      {
        id: 1,
        name: '农村低保标准表(各市第1季度)',
        dataType: 'Mysql',
        node: '石家庄民政部',
        institution: '石家庄民政部',
        creater: '李四',
        createTime: 233435354,
        status: '1',
      },
      {
        id: 2,
        name: '人口普查数据',
        dataType: '文件',
        node: '石家庄民政部',
        institution: '石家庄民政部',
        creater: '王五',
        createTime: 233435354,
        status: '2',
      },
      {
        id: 3,
        name: '人口普查数据',
        dataType: 'FTP',
        node: '石家庄民政部',
        institution: '石家庄民政部',
        creater: '王五',
        createTime: 233435354,
        status: '2',
      },
    ]
    // let rowSelection = {
    //   // onChange: selectedRows => {
    //   // },
    //   // getCheckboxProps: record => ({
    //   //   disabled: record.name === 'Disabled User',
    //   //   name: record.name,
    //   // }),
    // }
    // if (!isNodeOperator) {
    //   rowSelection = null
    // }
    return (
      <PageHeaderLayout>
        <Card>
          <div className={styles.search}>
            <Input placeholder="名称" className={styles.input} />
            <Select value={dataType} onChange={this.selectDataTypeChange} className={styles.select}>
              {selectData}
            </Select>
            {!isNodeOperator && <Cascader options={options} placeholder="所属节点" style={{ marginRight: 16 }} />}
            <Select value={creater} onChange={this.selectCreaterChange} className={styles.select}>
              {selectData3}
            </Select>
            <RangePicker className={styles.picker} />
            <Button type="primary">搜索</Button>
          </div>
          {isNodeOperator && (
            <div className={styles.createBtn}>
              <Button icon="plus" type="primary" onClick={this.handleAdd}>
                新建
              </Button>
            </div>
          )}
          <div>
            <Table
              columns={columns}
              dataSource={list}
              pagination={pagination}
              rowKey="id"
              bordered
              />
          </div>
          {/* <div>
            <Button type="primary">删除</Button>
          </div> */}
        </Card>
      </PageHeaderLayout>
    )
  }
}
