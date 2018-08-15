import React, { Component } from 'react'
import { connect } from 'dva'
import { routerRedux } from 'dva/router'
import { Table, Button, Card, Divider } from 'antd'
// import moment from 'moment';

import styles from './Source.less'
import PageHeaderLayout from '../../layouts/PageHeaderLayout'

@connect()
export default class Source extends Component {
  goToDetail = row => {
    this.props.dispatch(
      routerRedux.push({
        pathname: `/dataSourceManagement/fileSourceDetail/${row.id}`,
        state: row,
      })
    )
  }

  render() {
    const pagination = { pageSize: 10, current: 1 }
    const columns = [
      {
        title: '信息项1',
        dataIndex: 'infoItem1',
      },
      {
        title: '信息项2',
        dataIndex: 'infoItem2',
      },
      {
        title: '信息项3',
        dataIndex: 'infoItem3',
      },
      {
        title: '信息项4',
        dataIndex: 'infoItem4',
      },
      {
        title: '信息项5',
        dataIndex: 'infoItem5',
      },
    ]
    columns.forEach(item => {
      item.align = 'center'
    })
    const list = [
      {
        id: 0,
        infoItem1: '',
        infoItem2: '',
        infoItem3: '',
        infoItem4: '',
        infoItem5: '',
      },
      {
        id: 1,
        infoItem1: '',
        infoItem2: '',
        infoItem3: '',
        infoItem4: '',
        infoItem5: '',
      },
      {
        id: 2,
        infoItem1: '',
        infoItem2: '',
        infoItem3: '',
        infoItem4: '',
        infoItem5: '',
      },
    ]
    return (
      <PageHeaderLayout>
        <div className="btncls clearfix">
          <Button className="fr mr40">返回</Button>
        </div>
        <Card>
          <div className={styles.form}>
            <h3>
              目录编码:<span> 3300031306381126/00001</span>
              名称:<span> 资产负债表信息</span>
              提供方:<span> 规划局</span>
              创建时间:<span> 2018-06-08 10:11:10</span>
            </h3>
            <Divider />
          </div>
          <div>
            <Table
              columns={columns}
              dataSource={list}
              pagination={pagination && {...pagination, showQuickJumper: true, showTotal: (total) => `共 ${Math.ceil(total / pagination.pageSize)}页 / ${total}条 数据`}}
              rowKey="id"
              bordered
              />
          </div>
        </Card>
      </PageHeaderLayout>
    )
  }
}
