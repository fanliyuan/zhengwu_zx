import React, { Component } from 'react';
import { Table, Button, Input, Select, Card, DatePicker } from 'antd';
import moment from 'moment';

import styles from './InstitutionalManage.less';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';

const { Option } = Select;
const { RangePicker } = DatePicker;
export default class InstitutionalManage extends Component {
  state = {
    province:'0',
  }

  provinceSelectChange = (val) => {
    this.setState({
      province:val,
    })
  }

  render(){
    const { province } = this.state;
    const data=[
      {value:'0',id:0,label:'山东省'},
      {value:'1',id:1,label:'山西省'},
    ];
    const selectData = data.map(item => {
      return (<Option value={item.value} key={item.id} title={item.label}>{item.label}</Option>)
    })
    const pagination = { pageSize:10,current:1 };
    const columns = [
      {
        title:'机构名称',
        dataIndex:'institutionName',
      },
      {
        title:'负责人',
        dataIndex:'manager',
      },
      {
        title:'负责人手机号',
        dataIndex:'managerNumber',
      },
      {
        title:'排序',
        dataIndex:'listSort',
      },
      {
        title:'所属省市区',
        dataIndex:'province',
      },
      {
        title:'更新时间',
        dataIndex:'updateTime',
        render (text){
          return (moment(text).format('YYYY-MM-DD HH:mm:ss'))
        },
      },
      {
        title:'操作',
        render(){
          return (
            <div>
              <a style={{marginRight:20}}>修改</a>
              <a style={{marginRight:20}}>删除</a>
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
        institutionName:'国土局',
        manager:'张三1',
        managerNumber:'13809090909',
        listSort:1,
        province:'菏泽市',
        updateTime:3423423424,
        children:[
          {
            id:1,
            institutionName:'国土局办公室1',
            manager:'张三1',
            managerNumber:'13809090909',
            listSort:1,
            province:'菏泽市 单县',
            updateTime:3423423424,
          },
          {
            id:2,
            institutionName:'国土局办公室2',
            manager:'张三1',
            managerNumber:'13809090909',
            listSort:1,
            province:'菏泽市 曹县',
            updateTime:3423423424,
          },
        ],
      },
      {
        id:3,
        institutionName:'水利局',
        manager:'张三4',
        managerNumber:'135609090909',
        listSort:2,
        province:'菏泽市',
        updateTime:38877423424,
      },
      {
        id:4,
        institutionName:'电力局',
        manager:'张三5',
        managerNumber:'135609090909',
        listSort:3,
        province:'菏泽市',
        updateTime:345423423424,
      },
    ];
    return (
      <PageHeaderLayout>
        <Card>
          <div className={styles.form}>
            <Input placeholder="机构名称" style={{width:150,marginRight:20}}/>
            <Select style={{marginRight:20,width:150}} value={province} onChange={this.provinceSelectChange}>
              {selectData}
            </Select>
            <RangePicker style={{marginRight:20}}/>
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
