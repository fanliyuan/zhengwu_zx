import React, { Component } from 'react';
import { Link } from 'dva/router'
import { Table, Button, Input, Select, Card, DatePicker, Checkbox } from 'antd';
import moment from 'moment';

import styles from './CatalogManagement.less';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';

const { Option } = Select;
const { RangePicker } = DatePicker;
export default class CatalogManagement extends Component {
  state = {
    provider:'0',
    status:'0',
  }

  providerChange = (val) => {
    this.setState({
      provider:val,
    })
  }

  statusChange = (val) => {
    this.setState({
      status:val,
    })
  }

  render(){
    const { provider, status } = this.state;
    const data=[
      {value:'0',id:0,label:'提供方'},
      {value:'1',id:1,label:'提供方1'},
    ];
    const selectData = data.map(item => {
      return (<Option value={item.value} key={item.id} title={item.label}>{item.label}</Option>)
    })
    const data1=[
      {value:'0',id:0,label:'审核状态'},
      {value:'1',id:1,label:'审核状态1'},
    ];
    const selectData1 = data1.map(item => {
      return (<Option value={item.value} key={item.id} title={item.label}>{item.label}</Option>)
    })
    const pagination = { pageSize:10,current:1 };
    const columns = [
      {
        title:'目录编码',
        dataIndex:'catalogEncoding',
      },
      {
        title:'名称',
        dataIndex:'name',
      },
      {
        title:'提供方',
        dataIndex:'provider',
      },
      {
        title:'注册时间',
        dataIndex:'createTime',
        render (text){
          return (moment(text).format('YYYY-MM-DD HH:mm:ss'))
        },
      },
      {
        title:'是否挂载资源',
        dataIndex:'isMouontSource',
        render (text){
          return (+text === 0 ?'否':'是')
        },
      },
      {
        title:'是否开放',
        dataIndex:'isOpen',
        render (text){
          return (+text === 0 ?'否':'是')
        },
      },
      {
        title:'信息项',
        dataIndex:'information',
        render (text){
          return (+text === 0 ?'否':'是')
        },
      },
      {
        title:'审核状态',
        dataIndex:'status',
        render(text){
          return ( +text === 0 ?'待审核':'已通过')
        },
      },
      {
        title:'操作',
        render(){
              return (
                <div>
                  <a style={{marginRight:10}}>信息项</a>
                  <a style={{marginRight:10}}>资源挂接</a>
                  <a style={{marginRight:10}}>开放设置</a>
                  <a style={{marginRight:10}}>修改</a>
                  <a>删除</a>
                </div>
              )
        },
      },
    ]
    columns.forEach(item => {
      item.align = 'center';
    });
    const list = [
      {
        id:0,
        catalogEncoding:'330003130681126/0001',
        name:'花名册信息',
        provider:'规划局',
        createTime:344344242,
        isMouontSource:0,
        isOpen:1,
        information:14,
        status:'0',
      },
      {
        id:1,
        catalogEncoding:'330003130681126/0002',
        name:'资产负债表信息',
        provider:'规划局',
        createTime:344344242,
        isMouontSource:1,
        isOpen:0,
        information:6,
        status:'1',
      },
      {
        id:2,
        catalogEncoding:'330003130681126/0003',
        name:'资产总值表',
        provider:'规划局',
        createTime:344344242,
        isMouontSource:0,
        isOpen:0,
        information:2,
        status:'1',
      },
    ];
    const rowSelection = {
      // onChange: selectedRows => {
      // },
      // getCheckboxProps: record => ({
      //   disabled: record.name === 'Disabled User',
      //   name: record.name,
      // }),
    };
    return (
      <PageHeaderLayout>
        <Card>
          <div className={styles.form}>
            <Input placeholder="目录编码" style={{width:150,marginRight:20}}/>
            <Input placeholder="名称" style={{width:150,marginRight:20}}/>
            <Select style={{marginRight:20,width:120}} value={provider} onChange={this.providerChange}>
              {selectData}
            </Select>
            <RangePicker style={{marginRight:20,width:250}}/>
            <Select style={{marginRight:20,width:120}} value={status} onChange={this.statusChange}>
              {selectData1}
            </Select>
            <Checkbox style={{marginRight:10}}>已挂接资源</Checkbox>
            <Button type="primary">搜索</Button>
          </div>
          <div className={styles.createBtn}>
            <Button icon="plus" type="primary">
              <Link to='/dataSourceManagement/newMenu' style={{color: 'white'}} >新建</Link>
            </Button>
            <Button type="primary">导入</Button>
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
          <div>
            <Button type="primary">删除</Button>
          </div>
        </Card>
      </PageHeaderLayout>
    )
  }
}
