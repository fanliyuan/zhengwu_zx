/*
 * @Author: fly
 * @Date: 2018-07-03 11:14:19
 * @Last Modified by: fly
 * @Last Modified time: 2018-07-03 
*/
import React, { Component } from 'react';
import { Select, Button, Table, Card } from 'antd';

import styles from './PassManagement.less';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';

const { Option } = Select;
export default class PassManagement extends Component {
  state = {
    startNode:'0',
    endNode:'0',
  }

  selectStartChange = (val) => {
    this.setState({
      startNode:val,
    })
  }

  selectEndChange = (val) => {
    this.setState({
      endNode:val,
    })
  }

  render () {
    const { startNode, endNode } = this.state;
    const data1= [{value:'0',label:'起始节点1',id:1},{value:'1',label:'起始节点2',id:2}];
    const data2= [{value:'0',label:'目标节点1',id:1},{value:'1',label:'目标节点2',id:2}];
    const selectData1 = data1.map(item => {
      return (<Option value={item.value} key={item.id} title={item.label}>{item.label}</Option>)
    })
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
        title:'起始节点',
        dataIndex:'startNode',
      },
      {
        title:'目标节点',
        dataIndex:'targetNode',
      },
      {
        title:'是否双向',
        dataIndex:'isTwoWay',
        render(text){
          return +text === 0 ? '否':'是';
        },
      },
      {
        title:'是否压缩',
        dataIndex:'isCompress',
        render(text){
          return +text === 0 ? '否':'是';
        },
      },
      {
        title:'是否加密',
        dataIndex:'isEncrypt',
        render(text){
          return +text === 0 ? '否':'是';
        },
      },
      {
        title:'管道状态',
        dataIndex:'passStatus',
      },
      {
        title:'任务状态',
        dataIndex:'taskStatus',
      },
      {
        title:'操作',
        // dataIndex:'operation',
        render(text,row){
          return (
            <div>
              <a href={`#${row.id}`} style={{ marginRight:10 }}>修改</a>
              <a href={`#${row.id}`} style={{ marginRight:10 }}>监控</a>
              <a href={`#${row.id}`} style={{ marginRight:10 }}>统计</a>
              <a href={`#${row.id}`} style={{ marginRight:10 }}>任务</a>
            </div>
          )
        },
      },
    ]
    columns.forEach(item => {
      item.align = 'center';
    });
    const list = [
      {id:0,startNode:'石家庄市发展改革委',targetNode:'石家庄市民政部',isTwoWay:0,isCompress:1,isEncrypt:0,passStatus:'联通',taskStatus:'运行中'},
      {id:1,startNode:'石家庄市发展改革委',targetNode:'石家庄市民政部',isTwoWay:0,isCompress:1,isEncrypt:0,passStatus:'联通',taskStatus:'运行中'},
    ]
    return (
      <PageHeaderLayout>
        <Card>
          <div className={styles.forms}>
            <Select value={startNode} style={{marginRight:20}} onChange={this.selectStartChange}>
              {selectData1}
            </Select>
            <Select value={endNode} style={{marginRight:20}} onChange={this.selectEndChange}>
              {selectData2}
            </Select>
            <Button type="primary">搜索</Button>
          </div>
          <div>
            <Table
              columns={columns}
              dataSource={list}
              pagination={pagination}
              // onChange={}
              // loading={loading}
              rowKey="id"
              bordered
            />
          </div>
        </Card>
      </PageHeaderLayout>
    )
  }
}