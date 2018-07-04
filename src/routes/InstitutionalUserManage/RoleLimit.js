import React, { Component } from 'react';
import { Table, Button, Input, Card, DatePicker } from 'antd';
import moment from 'moment';

import styles from './RoleLimit.less';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';

const { RangePicker } = DatePicker;
export default class RoleLimit extends Component {
  render(){
    const pagination = { pageSize:10,current:1 };
    const columns = [
      {
        title:'ID',
        dataIndex:'id',
      },
      {
        title:'角色名称',
        dataIndex:'roleName',
      },
      {
        title:'角色说明',
        dataIndex:'roleDescription',
      },
      {
        title:'成员数量',
        dataIndex:'count',
      },
      {
        title:'建立时间',
        dataIndex:'createTime',
        render (text){
          return (moment(text).format('YYYY-MM-DD HH:mm:ss'))
        },
      },
      {
        title:'操作',
        render(){
            return (
              <div>
                <a>查看</a>
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
        roleName:'平台管理员',
        roleDescription:'新建与修改平台用户',
        count:1,
        creteTime:343433545,
      },
      {
        id:1,
        roleName:'平台安全员',
        roleDescription:'对登录和操作进行审计',
        count:2,
        creteTime:343433545,
      },
      {
        id:2,
        roleName:'平台审计员',
        roleDescription:'',
        count:2,
        creteTime:343433545,
      },
      {
        id:3,
        roleName:'平台操作员',
        roleDescription:'新建与修改平台用户',
        count:2,
        creteTime:343433545,
      },
    ];
    return (
      <PageHeaderLayout>
        <Card>
          <div className={styles.form}>
            <Input placeholder="角色名称" style={{width:100,marginRight:20}}/>
            <RangePicker style={{marginRight:20,width:250}}/>
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
