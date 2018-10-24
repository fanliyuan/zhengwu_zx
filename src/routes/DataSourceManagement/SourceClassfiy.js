import React, { Component } from 'react'
import { Card, Button, Input, Tabs, Table, DatePicker, Select, Popconfirm } from 'antd'
import moment from 'moment'
import { connect } from 'dva'
import Cookie from 'js-cookie'

import styles from './SourceClassfiy.less'
import PageHeaderLayout from '../../layouts/PageHeaderLayout'

const {TabPane} = Tabs
const { Option } = Select
const { RangePicker } = DatePicker
const userName = Cookie.get('antd-pro-authority')
@connect(({sourceClassfiy,loading}) => ({
  sourceClassfiy,
  loadings:loading.models.sourceClassfiy,
}))
export default class SourceClassfiy extends Component {
  state = {
    classfiyName:'',
    paginations:{current:1,pageSize:10,totol:false},
    times:[],
    provice:1,
    ztClassfiyName:'',
    ztTimes:[],
    ztProvice:1,
    bmClassfiyName:'',
    bmTimes:[],
    bmProvice:1,
  }

  handleAdd = () => {
    
  }

  handleTableChange = () => {

  }

  handleSearchBtn = () => {

  }

  handleEdit = () => {

  }

  handleDelete = () => {

  }

  handleTimeChange = (val) => {
    this.setState({
      times:val,
    })
  }

  handleInstitutionChange = (e) => {
    this.setState({
      classfiyName:e.target.value,
    })
  }

  handleProChange = (value) => {
    this.setState({
      provice:value,
    })
  }
  
  handleTimeChange1 = (val) => {
    this.setState({
      ztTimes:val,
    })
  }

  handleInstitutionChange1 = (e) => {
    this.setState({
      ztClassfiyName:e.target.value,
    })
  }

  handleProChange1 = (value) => {
    this.setState({
      ztProvice:value,
    })
  }

  handleTimeChange2 = (val) => {
    this.setState({
      bmTimes:val,
    })
  }

  handleInstitutionChange2 = (e) => {
    this.setState({
      bmClassfiyName:e.target.value,
    })
  }

  handleProChange2 = (value) => {
    this.setState({
      bmProvice:value,
    })
  }

  render() {
    const { classfiyName, paginations, times, provice, ztClassfiyName, ztTimes, ztProvice, bmClassfiyName, bmTimes, bmProvice } = this.state
    const selectData = [{id:1,name:'王五'},{id:2,name:'张三'},{id:3,name:'李四'}]
    const ProData = selectData.map((item) => {
      return (<Option value={item.id} key={item.id}>{item.name}</Option>)
    })
    const { sourceClassfiy:{loadings} } = this.props
    const columns = [
      {
        title: '项',
        dataIndex: 'project',
      },
      {
        title: '目',
        dataIndex: 'item',
      },
      {
        title: '细目',
        dataIndex: 'subject',
      },
      {
        title: '操作员',
        dataIndex: 'operator',
      },
      {
        title: '更新时间',
        dataIndex: 'updateTime',
        render(text) {
          return text ? moment(+text).format('lll') : ''
        },
      },
      // {
      //   title: '操作',
      //   render:() => {
      //     return (
      //       <div>
      //         <span className={styles.editBtn} onClick={this.handleEdit}>
      //           修改
      //         </span>
      //         <Popconfirm title="是否删除当前行" onConfirm={() => this.handleDelete}>
      //           <span className={styles.editBtn} style={{ marginRight: 16 }}>删除</span>
      //         </Popconfirm>
      //       </div>
      //     )
      //   },
      // },
    ]
    columns.forEach(item => {
      item.align = 'center'
    })
    if(userName !== 'operator'){
      columns.push(
        {
          title: '操作',
          render:() => {
            return (
              <div>
                <span className={styles.editBtn} onClick={this.handleEdit}>
                  修改
                </span>
                <Popconfirm title="是否删除当前行" onConfirm={() => this.handleDelete}>
                  <span className={styles.editBtn} style={{ marginRight: 16 }}>删除</span>
                </Popconfirm>
              </div>
            )
          },
        }
      )
    }
    const list = [
      {
        id:0,
        project:'01 经济建设',
        item:'001',
        subject:'1',
        operator:'张三',
        updateTime:'1231331313',
      },
      {
        id:1,
        project:'02 社会发展',
        item:'002',
        subject:'2',
        operator:'李四',
        updateTime:'1231331313',
      },
      {
        id:2,
        project:'03 民生服务',
        item:'003',
        subject:'3',
        operator:'王五',
        updateTime:'1231331313',
      },
      {
        id:3,
        project:'04 民生服务',
        item:'004',
        subject:'4',
        operator:'王望',
        updateTime:'1233131313',
      },
    ]
    return (
      <PageHeaderLayout>
        <Card>
          <Tabs defaultActiveKey="1">
            <TabPane tab="基础信息资源类" key="1">
              <div className={styles.form}>
                <Input placeholder="分类名称" style={{ width: 150, marginRight: 20 }} value={classfiyName} onChange={this.handleInstitutionChange} />
                {/* <Cascader options={data2} placeholder="所在省市区" style={{ marginRight: 20 }} />, */}
                <Select value={provice} onChange={this.handleProChange} style={{width:120,marginRight:20}} placeholder="所属省">
                  {ProData}
                </Select>
                <RangePicker style={{ marginRight: 20, width:200 }} value={times} onChange={this.handleTimeChange} />
                <Button type="primary" onClick={this.handleSearchBtn}>搜索</Button>
              </div>
              <div className={styles.createBtn} style={{display:userName === 'operator' ? 'none' : 'block'}}>
                <Button icon="plus" type="primary" onClick={this.handleAdd}>
              新建
                </Button>
              </div>
              <div>
                <Table loading={loadings} columns={columns} dataSource={list} pagination={paginations && {...paginations, showQuickJumper: true, showTotal: (total) => `共 ${Math.ceil(total / paginations.pageSize)}页 / ${total}条 数据`}} rowKey="id" onChange={this.handleTableChange} bordered />
              </div>
            </TabPane>
            <TabPane tab="主题信息资源类" key="2">
              <div className={styles.form}>
                <Input placeholder="分类名称" style={{ width: 150, marginRight: 20 }} value={ztClassfiyName} onChange={this.handleInstitutionChange1} />
                {/* <Cascader options={data2} placeholder="所在省市区" style={{ marginRight: 20 }} />, */}
                <Select value={ztProvice} onChange={this.handleProChange1} style={{width:120,marginRight:20}} placeholder="所属省">
                  {ProData}
                </Select>
                <RangePicker style={{ marginRight: 20, width:200 }} value={ztTimes} onChange={this.handleTimeChange1} />
                <Button type="primary" onClick={this.handleSearchBtn1}>搜索</Button>
              </div>
              <div className={styles.createBtn} style={{display:userName === 'operator' ? 'none' : 'block'}}>
                <Button icon="plus" type="primary" onClick={this.handleAdd}>
              新建
                </Button>
              </div>
              <div>
                <Table loading={loadings} columns={columns} dataSource={list} pagination={paginations && {...paginations, showQuickJumper: true, showTotal: (total) => `共 ${Math.ceil(total / paginations.pageSize)}页 / ${total}条 数据`}} rowKey="id" onChange={this.handleTableChange} bordered />
              </div>
            </TabPane>
            <TabPane tab="部门信息资源类" key="3">
              <div className={styles.form}>
                <Input placeholder="分类名称" style={{ width: 150, marginRight: 20 }} value={bmClassfiyName} onChange={this.handleInstitutionChange2} />
                {/* <Cascader options={data2} placeholder="所在省市区" style={{ marginRight: 20 }} />, */}
                <Select value={bmProvice} onChange={this.handleProChange2} style={{width:120,marginRight:20}} placeholder="所属省">
                  {ProData}
                </Select>
                <RangePicker style={{ marginRight: 20, width:200 }} value={bmTimes} onChange={this.handleTimeChange2} />
                <Button type="primary" onClick={this.handleSearchBtn2}>搜索</Button>
              </div>
              <div className={styles.createBtn} style={{display:userName === 'operator' ? 'none' : 'block'}}>
                <Button icon="plus" type="primary" onClick={this.handleAdd}>
              新建
                </Button>
              </div>
              <div>
                <Table loading={loadings} columns={columns} dataSource={list} pagination={paginations && {...paginations, showQuickJumper: true, showTotal: (total) => `共 ${Math.ceil(total / paginations.pageSize)}页 / ${total}条 数据`}} rowKey="id" onChange={this.handleTableChange} bordered />
              </div>
            </TabPane>
          </Tabs>
        </Card>
      </PageHeaderLayout>
    )
  }
}