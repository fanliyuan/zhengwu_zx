import React, { Component } from 'react';
import { connect } from 'dva'
import { routerRedux } from 'dva/router'
import { Table, Button, Card, Divider } from 'antd';
import moment from 'moment';

import styles from './FileSource.less';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';

@connect()
export default class FileSource extends Component {

  goToDetail = (row) => {
    this.props.dispatch(
      routerRedux.push({
        pathname: `/dataSourceManagement/fileSourceDetail/${row.id}`,
        state: row,
      })
    )
  }

  render(){
    const pagination = { pageSize:10,current:1 };
    const columns = [
      {
        title:'文件名称',
        dataIndex:'name',
        render: (text, row) => {
          return (
            <a onClick={() => this.goToDetail(row)} title='目前链接有误' >{text}</a>
          )
        },
      },
      {
        title:'类型',
        dataIndex:'fileType',
      },
      {
        title:'文件大小',
        dataIndex:'fileSize',
      },
      {
        title:'上传人',
        dataIndex:'uploader',
      },
      {
        title:'上传时间',
        dataIndex:'uploadTime',
        render (text){
          return (moment(text).format('YYYY-MM-DD HH:mm:ss'))
        },
      },
      {
        title:'操作',
        render(){
            return (
              <div>
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
        name:'城市低保标准表(各市第1季度).xlsx',
        fileType:'zip',
        fileSize:'1.38MB',
        uploader:'张三',
        uploadTime:3424234243,
      },
      {
        id:1,
        name:'农村低保标准表(各市第1季度).json',
        fileType:'json',
        fileSize:'0.12MB',
        uploader:'李四',
        uploadTime:3424234234,
      },
      {
        id:2,
        name:'人口普查数据.xm;',
        fileType:'jpeg',
        fileSize:'1.56MB',
        uploader:'王五',
        uploadTime:34242342,
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
            <h3>
              数据类型:<span> 文件</span>
              资源名称:<span> 城市低保标准表</span>
              所属机构:<span> 石家庄市民政局</span>
            </h3>
            <Divider/>
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
