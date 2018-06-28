import React, { Component } from 'react';
// import { connect } from 'dva'
import { Button, Table, Card } from 'antd';

import styles from './SystemNotification.less';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';

export default class SystemNotification extends Component {
  handleTableChange = () => {};

  render() {
    const columns = [
      {
        title: '通知标题',
        dataIndex: 'noteTitle',
        align: 'center',
        render: (val, row) => <a href={row.link}>{val}</a>,
      },
      {
        title: '通知时间',
        dataIndex: 'noteTime',
        align: 'center',
      },
    ];
    const dataSource = [
      {
        id: 0,
        noteTitle: '订阅审批已通过',
        noteTime: '2018-06-10 10:42:43',
        link: '/overview/analysis',
      },
      {
        id: 1,
        noteTitle: '订阅审批已通过',
        noteTime: '2018-06-10 10:42:43',
        link: '/result/success',
      },
    ];
    const rowSelection = {
      // onChange: (selectedRowKeys, selectedRows) => {
      //   // console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
      // },
      // getCheckboxProps: record => ({
      //   disabled: record.name === 'Disabled User',
      //   name: record.name,
      // }),
    };
    return (
      <PageHeaderLayout>
        <Card>
          <div className={styles.tableBtns}>
            <Button>全部通知</Button>
            <Button>未读</Button>
            <Button>已读</Button>
          </div>
          <div>
            <Table
              dataSource={dataSource}
              columns={columns}
              rowKey="id"
              rowSelection={rowSelection}
              onChange={this.handleTableChange}
              bordered
            />
          </div>
          <div className={styles.tableBtnsPro}>
            <Button>删除</Button>
            <Button>标记已读</Button>
          </div>
        </Card>
      </PageHeaderLayout>
    );
  }
}
