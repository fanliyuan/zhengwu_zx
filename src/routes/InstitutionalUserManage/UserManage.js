import React, { Component } from 'react';
import { Table, Button, Input, Select, Card, DatePicker, InputNumber } from 'antd';
import moment from 'moment';

import styles from './UserManage.less';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';

const { Option } = Select;
const { RangePicker } = DatePicker;
export default class UserManage extends Component {
  render(){
    const data=[
      {value:'0',id:0,label:'所属机构'},
      {value:'1',id:1,label:'XXX机构'},
    ];
    const selectData = data.map(item => {
      return (<Option value={item.value} key={item.id} title={item.label}>{item.label}</Option>)
    })
    const data1=[
      {value:'0',id:0,label:'平台管理员'},
      {value:'1',id:1,label:'平台安全员'},
      {value:'2',id:1,label:'平台审计员'},
      {value:'3',id:1,label:'平台操作员'},
    ];
    const selectData1 = data1.map(item => {
      return (<Option value={item.value} key={item.id} title={item.label}>{item.label}</Option>)
    })
    const data2=[
      {value:'0',id:0,label:'启用'},
      {value:'1',id:1,label:'停用'},
    ];
    const selectData2 = data2.map(item => {
      return (<Option value={item.value} key={item.id} title={item.label}>{item.label}</Option>)
    })
    const pagination = { pageSize:10,current:1 };
    const columns = [
      {
        title:'ID',
        dataIndex:'id',
      },
      {
        title:'用户名',
        dataIndex:'userName',
      },
      {
        title:'姓名',
        dataIndex:'name',
      },
      {
        title:'电话',
        dataIndex:'tel',
      },
      {
        title:'所属机构',
        dataIndex:'institution',
      },
      {
        title:'所属节点',
        dataIndex:'oweNode',
      },
      {
        title:'角色',
        dataIndex:'role',
      },
      {
        title:'建立时间',
        dataIndex:'createTime',
        render (text){
          return (moment(text).format('YYYY-MM-DD HH:mm:ss'))
        },
      },
      {
        title:'状态',
        dataIndex:'status',
        render(text){
          return ( +text === 0 ?'停用':'启用')
        },
      },
      {
        title:'操作',
        render(text,row){
          if(row.status === '0'){
            return (
              <div>
                <a style={{marginRight:20}}>启用</a>
                <a style={{marginRight:20}}>修改</a>
                <a style={{marginRight:20}}>删除</a>
              </div>
            )
          }
          else{
            return (
              <div>
                <a style={{marginRight:20}}>停用</a>
                <a style={{marginRight:20}}>修改</a>
                <a style={{marginRight:20}}>删除</a>
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
        userName:'zhangsan',
        name:'张三',
        tel:'12654887555',
        institution:'河北省大数据局',
        oweNode:'',
        role:'平台管理员',
        createTime:453353535,
        status:"0",
      },
      {
        id:1,
        userName:'lisi',
        name:'李四',
        tel:'16654887555',
        institution:'河北省大数据局',
        oweNode:'',
        role:'平台管理员',
        createTime:454453353535,
        status:"1",
      },
    ];
    return (
      <PageHeaderLayout>
        <Card>
          <div className={styles.form}>
            <Input placeholder="用户名" style={{width:100,marginRight:20}}/>
            <Input placeholder="姓名" style={{width:100,marginRight:20}}/>
            <InputNumber value="0" style={{marginRight:20}}/>
            <RangePicker style={{marginRight:20,width:250}}/>
            <Select style={{marginRight:20,width:100}} value="0">
              {selectData}
            </Select>
            <Select style={{marginRight:20,width:120}} value="0">
              {selectData1}
            </Select>
            <Select style={{marginRight:20,width:100}} value="0">
              {selectData2}
            </Select>
            <Button type="primary">搜索</Button>
          </div>
          <div className={styles.createBtn}>
            <Button icon="plus" type="primary">新建</Button>
          </div>
          <div>
            <Table
              columns={columns}
              dataSource={list}
              pagination={pagination}
              rowKey="id"
              bordered
            />
          </div>
        </Card>
      </PageHeaderLayout>
    )
  }
}
