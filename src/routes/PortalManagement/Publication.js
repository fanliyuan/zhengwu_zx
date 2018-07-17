/*
 * @Author: ChouEric
 * @Date: 2018-07-04 17:32:51
 * @Last Modified by: ChouEric
 * @Last Modified time: 2018-07-17 17:21:14
 * 描述: 开放门户管理 -- 资讯管理 -- 发布管理 -- 发布
*/
import React, { Component } from 'react';
import { Button, Form, Input, Select, Table, DatePicker, message } from 'antd';
import moment from 'moment';
import { Link } from 'dva/router';

import PageHeaderLayout from '../../layouts/PageHeaderLayout';
import styles from './Publication.less';

const classifyList = [
  {
    value: -1,
    label: '全部分类',
  },
  {
    value: 0,
    label: '政策',
  },
  {
    value: 1,
    label: '法律',
  },
  {
    value: 2,
    label: '工作报告',
  },
];
const data = [];
for (let i = 0; i < 255; i++) {
  const random = Math.ceil(Math.random() * 3);
  data.push({
    id: i,
    title: `标题${i}`,
    classify: classifyList[random].label,
    operator: `操作人人${i}`,
    time: moment(new Date() - 1000 * 60 * 60 * 13 * i).format('lll'),
  });
}

export default class Publication extends Component {
  state = {
    query: {
      title: '',
      operator: '',
      classify: -1,
      time: [],
    },
    isChange: false,
    selectRowKeys: [],
  };

  titleChange = e => {
    const { query } = this.state;
    this.setState({
      query: {
        ...query,
        title: e.targetl.value,
      },
      isChange: true,
    });
  };

  operatorChange = e => {
    const { query } = this.state;
    this.setState({
      query: {
        ...query,
        operator: e.targetl.value,
      },
      isChange: true,
    });
  };

  classifyChange = value => {
    const { query } = this.state;
    this.setState({
      query: {
        ...query,
        classify: value,
      },
      isChange: true,
    });
  };

  timefyChange = value => {
    const { query } = this.state;
    this.setState({
      query: {
        ...query,
        timefy: value,
      },
      isChange: true,
    });
  };

  search = () => {
    if (!this.state.isChange) return false;
  };

  handlePublic = () => {
    message.success(`成功发布${this.state.selectRowKeys.join('和')}`);
  };

  render() {
    const {
      query: { title, operator, classify, time },
      selectRowKeys,
    } = this.state;
    const columns = [
      {
        title: '序号',
        dataIndex: 'id',
      },
      {
        title: '标题',
        dataIndex: 'title',
      },
      {
        title: '分类',
        dataIndex: 'classify',
      },
      {
        title: '操作人',
        dataIndex: 'operator',
      },
      {
        title: '操作时间',
        dataIndex: 'time',
      },
    ];
    columns.forEach(item => {
      item.align = 'center';
    });
    const rowSelection = {
      selectRowKeys,
      onChange: rowKeys => {
        this.setState({
          selectRowKeys: rowKeys,
        });
      },
    };

    const classifyComs = classifyList.map(item => {
      return (
        <Select.Option value={item.value} key={item.value}>
          {item.label}
        </Select.Option>
      );
    });

    return (
      <PageHeaderLayout>
        <div className="my-table-layout">
          <div className="clearfix mb8">
            <Link to="/portalManagement/publicationManagement" className="fr">
              <Button>返回</Button>
            </Link>
            <Button type="primary" onClick={this.handlePublic} className="fr mr16">
              发布
            </Button>
          </div>
          <Form className={styles.search}>
            <Input
              value={title}
              onChange={this.titleChange}
              className={styles.input}
              placeholder="标题"
            />
            <Select value={classify} onChange={this.classifyChange} className={styles.select}>
              {classifyComs}
            </Select>
            <Input
              value={operator}
              onChange={this.operatorChange}
              className={styles.input}
              placeholder="操作人"
            />
            <DatePicker.RangePicker
              value={time}
              onChange={this.timeChange}
              className={styles.picker}
            />
            <Button type="primary" icon="search" onClick={this.search}>
              搜索
            </Button>
          </Form>
          <Table
            columns={columns}
            dataSource={data}
            rowSelection={rowSelection}
            rowKey="id"
            bordered
          />
        </div>
      </PageHeaderLayout>
    );
  }
}
