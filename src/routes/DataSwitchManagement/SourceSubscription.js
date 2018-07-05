import React, { Component } from 'react';
import { Table, Button, Input, Select, Card, DatePicker } from 'antd';
import moment from 'moment';

import styles from './SourceSubscription.less';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';

const { Option } = Select;
const { RangePicker } = DatePicker;
export default class SourceSubscription extends Component {
  state = {
    selectJg:'0',
    selectDy:'0',
  }

  handleSelectChangejg = (val) => {
    this.setState({
      selectJg:val,
    })
  }

  handleSelectChangedy = (val) => {
    this.setState({
      selectDy:val,
    })
  }

  render(){
    const { selectJg, selectDy} = this.state;
    const data=[
      {value:'0',id:0,label:'发布机构'},
      {value:'1',id:1,label:'发布机构1'},
    ];
    const selectData = data.map(item => {
      return (<Option value={item.value} key={item.id} title={item.label}>{item.label}</Option>)
    })
    const data1=[
      {value:'0',id:0,label:'是否订阅'},
      {value:'1',id:1,label:'是'},
      {value:'2',id:2,label:'否'},
    ];
    const selectData1 = data1.map(item => {
      return (<Option value={item.value} key={item.id} title={item.label}>{item.label}</Option>)
    })
    const pagination = { pageSize:10,current:1 };
    const columns = [
      {
        title:'ID',
        dataIndex:'id',
      },
      {
        title:'目录名称',
        dataIndex:'name',
      },
      {
        title:'目录资源',
        dataIndex:'catalogSource',
      },
      {
        title:'所属主题',
        dataIndex:'subject',
      },
      {
        title:'所属分类2',
        dataIndex:'category2',
      },
      {
        title:'所属分类3',
        dataIndex:'category3',
      },
      {
        title:'数据类型',
        dataIndex:'dataType',
      },
      {
        title:'发布时间',
        dataIndex:'publicTime',
        render (text){
          return (moment(text).format('YYYY-MM-DD HH:mm:ss'))
        },
      },
      {
        title:'发布方是否审核',
        dataIndex:'isAudit',
        render(text){
          return (+text === 0 ? '否':'是')
        },
      },
      {
        title:'是否已订阅',
        dataIndex:'isSubscription',
        render(text){
          return (+text === 0 ? '否':'是')
        },
      },
      {
        title:'操作',
        render(text,row){
          if(row.isSubscription === '0'){
            return (
              <div>
                <a>订阅</a>
              </div>
            )
          }
          else{
            return (
              <div>
                <a>详情</a>
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
        name:'石家庄东城区国土数据',
        catalogSource:'',
        subject:'国土数据',
        category2:'石家庄东城区',
        category3:'',
        dataType:'数据库',
        publicTime:334444443,
        isAudit:'0',
        isSubscription:'1',
      },
      {
        id:1,
        name:'',
        catalogSource:'',
        subject:'',
        category2:'',
        category3:'',
        dataType:'文件',
        publicTime:334444443,
        isAudit:'1',
        isSubscription:'0',
      },
      {
        id:2,
        name:'',
        catalogSource:'',
        subject:'',
        category2:'',
        category3:'',
        dataType:'',
        publicTime:334444443,
        isAudit:'0',
        isSubscription:'1',
      },
    ];
    return (
      <PageHeaderLayout>
        <Card>
          <div className={styles.form}>
            <Input placeholder="发布名称" style={{width:150,marginRight:20}}/>
            <Input placeholder="发布主题" style={{width:150,marginRight:20}}/>
            <Select style={{marginRight:20,width:120}} onChange={this.handleSelectChangejg} value={selectJg}>
              {selectData}
            </Select>
            <Select style={{marginRight:20,width:120}} onChange={this.handleSelectChangedy} value={selectDy}>
              {selectData1}
            </Select>
            <RangePicker style={{marginRight:20,width:250}} />
            {/* <DatePicker style={{marginRight:20,width:250}} placeholder="发布时间"/> */}
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
