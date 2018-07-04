import React, { Component } from 'react';
import { Table, Button, Input, Select, Card, Cascader } from 'antd';
import moment from 'moment';

import styles from './SwitchManagement.less';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';

const { Option } = Select;
export default class SwitchManagement extends Component {
  render(){
    const data1=[
      {value:"1001",label:'机构1',children:[{value:"101",label:'机构1.1'},{value:"102",label:'机构1.2'}]},
      {value:"2001",label:'机构2',children:[{value:"201",label:'机构1.2'},{value:"202",label:'机构2.2'}]},
    ];
    const data2=[
      {value:"1001",label:'节点1',children:[{value:"101",label:'节点1.1'},{value:"102",label:'节点1.2'}]},
      {value:"2001",label:'节点2',children:[{value:"201",label:'节点1.2'},{value:"202",label:'节点2.2'}]},
    ];
    const data3=[{value:"0",label:'启用',id:0},{value:"1",label:'停用',id:1}];
    const selectData3 = data3.map(item => {
      return (<Option value={item.value} key={item.id} title={item.label}>{item.label}</Option>)
    })
    const pagination = {pageSize:10,current:1};
    const columns = [
      {
        title:'ID',
        dataIndex:'id',
      },
      {
        title:'域名称',
        dataIndex:'areaName',
      },
      {
        title:'描述',
        dataIndex:'description',
      },
      {
        title:'交换范围机构',
        dataIndex:'switchRange',
      },
      {
        title:'更新时间',
        dataIndex:'updateTime',
        render(text){
          return (moment(text).format('YYYY-MM-DD HH:mm:ss'));
        },
      },
      {
        title:'状态',
        dataIndex:'status',
        render(text){
          return +text === 0 ? '停用':'启用'
        },
      },
      {
        title:'操作',
        render(text,row){
          if(row.status === '0'){
            return (
              <div>
                <a style={{marginRight:10}}>启用</a>
                <a style={{marginRight:10}}>修改</a>
                <a style={{marginRight:10}}>删除</a>
              </div>
            )
          }
          else {
            return (
              <div>
                <a style={{marginRight:10}}>停用</a>
              </div>
            )
          }
        },
      },
    ];
    columns.forEach(item => {
      item.align = 'center';
    });
    const list = [
      {
        id:0,
        areaName:'国土服务',
        description:'关于此域的一段描述',
        switchRange:'一级机构',
        updateTime:232742424624,
        status:"0",
      },
      {
        id:1,
        areaName:'国土服务11',
        description:'关于此域的一段描述11',
        switchRange:'一级节点',
        updateTime:232742424624,
        status:"1",
      },
    ];
    return (
      <PageHeaderLayout>
        <Card>
          <div className={styles.form}>
            <Input placeholder="域名称" style={{marginRight:20,width:150}}/>
            <Cascader options={data1} placeholder="交换范围机构" style={{marginRight:20}}/>,
            <Cascader options={data2} placeholder="交换范围节点" style={{marginRight:20}}/>,
            <Select value="0" style={{marginRight:20}}>
              {selectData3}
            </Select>
            <Button type="primary">搜索</Button>
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