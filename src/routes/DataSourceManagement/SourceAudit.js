import React, { Component } from 'react';
import { Table, Button, Input, Select, Card, DatePicker } from 'antd';
import moment from 'moment';

import styles from './SourceAudit.less';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';

const { Option } = Select;
const { RangePicker } = DatePicker;
export default class SourceAudit extends Component {
  render(){
    const data=[
      {value:'0',id:0,label:'数据类型'},
      {value:'1',id:1,label:'数据类型1'},
    ];
    const selectData = data.map(item => {
      return (<Option value={item.value} key={item.id} title={item.label}>{item.label}</Option>)
    })
    const data1=[
      {value:'0',id:0,label:'节点'},
      {value:'1',id:1,label:'节点1'},
    ];
    const selectData1 = data1.map(item => {
      return (<Option value={item.value} key={item.id} title={item.label}>{item.label}</Option>)
    })
    const data2=[
      {value:'0',id:0,label:'所属机构'},
      {value:'1',id:1,label:'XXX机构'},
    ];
    const selectData2 = data2.map(item => {
      return (<Option value={item.value} key={item.id} title={item.label}>{item.label}</Option>)
    })
    const data4=[
      {value:'0',id:0,label:'审核状态'},
      {value:'1',id:1,label:'审核状态1'},
    ];
    const selectData4 = data4.map(item => {
      return (<Option value={item.value} key={item.id} title={item.label}>{item.label}</Option>)
    })
    const pagination = { pageSize:10,current:1 };
    const columns = [
      {
        title:'ID',
        dataIndex:'id',
      },
      {
        title:'资源名称',
        dataIndex:'name',
      },
      {
        title:'数据类型',
        dataIndex:'dataType',
      },
      {
        title:'节点',
        dataIndex:'node',
      },
      {
        title:'所属机构',
        dataIndex:'institution',
      },
      {
        title:'应用系统名称',
        dataIndex:'applicationSystemName',
      },
      {
        title:'注册时间',
        dataIndex:'createTime',
        render (text){
          return (moment(text).format('YYYY-MM-DD HH:mm:ss'))
        },
      },
      {
        title:'状态',
        dataIndex:'status',
        render(text){
          return ( +text === 0 ?'待审核':(+text === 1 ? '已通过':'已拒绝'))
        },
      },
      {
        title:'操作',
        render(text,row){
            if(row.status === '2'){
              return (
                <div>
                  <a>查看</a>
                </div>
              )
            }
            else if(row.status === '1'){
              return (
                <div>
                  <a style={{marginRight:10}}>资源</a>
                  <a style={{marginRight:10}}>同步计划</a>
                  <a>查看</a>
                </div>
              )
            }
            else{
              return (
                <div>
                  <a style={{marginRight:10}}>资源</a>
                  <a style={{marginRight:10}}>同步计划</a>
                  <a>审核</a>
                </div>
              )
            }
        },
      },
    ]
    columns.forEach(item => {
      item.align = 'center';
    });
    const list = [
      {
        id:0,
        name:'城市低保标准表(各市第1季度)',
        dataType:'Mysql',
        node:'石家庄民政部',
        institution:'石家庄民政部',
        applicationSystemName:'统计系统',
        createTime:233435354,
        lastUpdataTime:343435354,
        subscription:2,
        status:'0',
      },
      {
        id:1,
        name:'农村低保标准表(各市第1季度)',
        dataType:'Mysql',
        node:'石家庄民政部',
        institution:'石家庄民政部',
        applicationSystemName:'统计系统',
        createTime:233435354,
        lastUpdataTime:343435354,
        subscription:1,
        status:'1',
      },
      {
        id:2,
        name:'人口普查数据',
        dataType:'文件',
        node:'石家庄民政部',
        institution:'石家庄民政部',
        applicationSystemName:'统计系统',
        createTime:233435354,
        lastUpdataTime:343435354,
        subscription:5,
        status:'2',
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
            <Input placeholder="资源名称" style={{width:150,marginRight:20}}/>
            <Input placeholder="应用系统名称" style={{width:150,marginRight:20}}/>
            <Select style={{marginRight:20,width:100}} value="0">
              {selectData}
            </Select>
            <Select style={{marginRight:20,width:120}} value="0">
              {selectData1}
            </Select>
            <Select style={{marginRight:20,width:100}} value="0">
              {selectData2}
            </Select>
            <RangePicker style={{marginRight:20,width:250}}/>
            <Select style={{marginRight:20,width:100}} value="0">
              {selectData4}
            </Select>
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
          <div>
            <Button type="primary">删除</Button>
          </div>
        </Card>
      </PageHeaderLayout>
    )
  }
}