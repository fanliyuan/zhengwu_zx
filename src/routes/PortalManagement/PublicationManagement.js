/*
 * @Author: ChouEric
 * @Date: 2018-07-03 14:31:14
 * @Last Modified by: ChouEric
 * @Last Modified time: 2018-07-17 16:50:56
 * @描述: 开放门户管理--资讯管理--发布管理
*/
import React, { Component, Fragment } from 'react';
// import { connect } from 'dva';
import {
  DatePicker,
  Input,
  Select,
  Button,
  Table,
  Popconfirm,
  message,
  Modal,
  Form,
  Radio,
} from 'antd';
import moment from 'moment';
import { Link } from 'dva/router';
import copy from 'copy-to-clipboard';

import PageHeaderLayout from '../../layouts/PageHeaderLayout';
import styles from './PublicationManagement.less';

const { RangePicker } = DatePicker;
const { Option } = Select;

// @connect(({ overviewLogging, loading }) => ({
//   overviewLogging,
//   loading: loading.models.overviewLogging,
// }))
@Form.create()
export default class PublicationManagement extends Component {
  state = {
    name: '',
    system: '',
    type: 0,
    subscribe: -1,
    audit: -1,
    date: [],
    isChanged: false,
    showModal: false,
  };

  componentDidMount() {
    // const { dispatch } = this.props
    // const { date } = this.state
    // const dateRange = date.map((item) => {
    //   if (moment.isMoment(item)) {
    //     return +(item.format('x'))
    //   } else {
    //     return 0
    //   }
    // })
    // dispatch({
    //   type: 'overviewLogging/log',
    //   payload: {query: {...this.state, date: dateRange}, pagination: {pageSize: 10, current: 1}},
    // })
  }

  handleNameChange = e => {
    this.setState({
      isChanged: true,
    });
    this.setState({
      name: e.target.value.trim(),
    });
  };

  handleSystemChange = e => {
    this.setState({
      isChanged: true,
    });
    this.setState({
      system: e.target.value.trim(),
    });
  };

  handleTypeChange = e => {
    this.setState({
      isChanged: true,
    });
    this.setState({
      type: e,
    });
  };

  handleSubscribeChange = e => {
    this.setState({
      isChanged: true,
    });
    this.setState({
      subscribe: e,
    });
  };

  handleAuditChange = e => {
    this.setState({
      isChanged: true,
    });
    this.setState({
      audit: e,
    });
  };

  handlePickChange = val => {
    this.setState({
      isChanged: true,
    });
    this.setState({
      date: val,
    });
  };

  handleSearch = () => {
    if (!this.state.isChanged) return; // eslint-disable-line
    // const { dispatch } = this.props;
    // const query = this.state
    // const pagination = {
    //   current: 1,
    //   pageSize: 10,
    // }
    // const dateRange = query.date.map((item) => {
    //   if (moment.isMoment(item)) {
    //     return +(item.format('x'))
    //   } else {
    //     return 0
    //   }
    // })
    this.setState({
      isChanged: false,
    });
    // dispatch({
    //   type: 'overviewLogging/log',
    //   payload: { query: { ...query, date: dateRange }, pagination },
    // });
  };

  handleStandardTableChange = pagination => {
    // console.log(pagination, filtersArg, sorter)
    // const query = this.state
    // const { dispatch } = this.props;
    console.log(pagination); // eslint-disable-line
    // const dateRange = query.date.map((item) => {
    //   if (moment.isMoment(item)) {
    //     return +(item.format('x'))
    //   } else {
    //     return 0
    //   }
    // })

    // dispatch({
    //   type: 'overviewLogging/log',
    //   payload: { query: {...query, date: dateRange}, pagination },
    // });
  };

  // goPublication = () => {
  //   const { dispatch } = this.props
  //   dispatch(
  //     routerRedux.push('/portalManagement/publication')
  //   )
  // }

  publishCancel = row => {
    message.success(`已取消发布${row.title}`);
  };

  copyUrl = row => {
    copy(`这是复制的${row.title}`);
    message.success('复制成功');
  };

  handleSet = row => {
    this.setState({
      showModal: true,
    });
    // message.success(row.top)
    this.props.form.setFieldsValue({ top: row.top, recommend: row.recommend });
  };

  render() {
    const { name, date, audit, subscribe, type, system, showModal } = this.state;
    const { getFieldDecorator } = this.props.form;
    // const { overviewLogging: { data, pagination, stateList }, loading } = this.props

    const data = [];

    for (let i = 0; i < 120; i++) {
      data.push({
        id: i,
        title: '标题' + i, // eslint-disable-line
        column: '栏目' + i, // eslint-disable-line
        top: i % 3 === 0 ? '是' : '否', // eslint-disable-line
        recommend: i % 2 === 0 ? '是' : '否', // eslint-disable-line
        operator: `操作人${i}`,
        time: moment(new Date() - 1000 * 60 * 60 * 5 * i, 'x').format('lll'),
      });
    }

    const typeList = [
      {
        value: 0,
        label: '首页',
      },
      {
        value: 1,
        label: '开放动态',
      },
      {
        value: 2,
        label: '目录',
      },
    ];
    const topList = [
      {
        value: -1,
        label: '全部状态',
      },
      {
        value: 0,
        label: '置顶',
      },
      {
        value: 1,
        label: '未置顶',
      },
    ];
    const recommendList = [
      {
        value: -1,
        label: '全部状态',
      },
      {
        value: 0,
        label: '推荐',
      },
      {
        value: 1,
        label: '未推荐',
      },
    ];

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
        title: '栏目',
        dataIndex: 'column',
      },
      {
        title: '是否置顶',
        dataIndex: 'top',
      },
      {
        title: '是否推荐',
        dataIndex: 'recommend',
      },
      {
        title: '操作人',
        dataIndex: 'operator',
      },
      {
        title: '发布时间',
        dataIndex: 'time',
      },
      {
        title: '操作',
        dataIndex: 'operation',
        render: (text, row) => {
          return (
            <Fragment>
              <Popconfirm
                title="取消后开放门户将无法看到此篇文章，您是否确认取消发布?"
                onConfirm={() => this.publishCancel(row)}
              >
                <a className="mr16">取消发布</a>
              </Popconfirm>
              <a onClick={() => this.handleSet(row)} className="mr16">
                设置
              </a>
              <a onClick={() => this.copyUrl(row)}>复制地址</a>
            </Fragment>
          );
        },
      },
    ];

    columns.forEach(item => {
      item.align = 'center';
    });

    const typeComs = typeList.map(item => {
      // eslint-disable-line
      return (
        <Option value={item.value} key={item.value}>
          {item.label}
        </Option>
      );
    });
    const topComs = topList.map(item => {
      // eslint-disable-line
      return (
        <Option value={item.value} key={item.value}>
          {item.label}
        </Option>
      );
    });
    const recommendComs = recommendList.map(item => {
      // eslint-disable-line
      return (
        <Option value={item.value} key={item.value}>
          {item.label}
        </Option>
      );
    });
    const firstComs = typeComs;
    const secondeComs = null;
    return (
      <PageHeaderLayout>
        <div className={styles.layout}>
          <div className={styles.search}>
            <Input
              placeholder="发布名称"
              value={name}
              onPressEnter={this.handleSearch}
              onChange={this.handleNameChange}
              className={styles.name}
            />
            <Input
              placeholder="发布人"
              value={system}
              onPressEnter={this.handleSearch}
              onChange={this.handleSystemChange}
              className={styles.name}
            />
            <Select value={type} onChange={this.handleTypeChange} className={styles.select}>
              {typeComs}
            </Select>
            <Select
              value={subscribe}
              onChange={this.handleSubscribeChange}
              className={styles.select}
            >
              {topComs}
            </Select>
            <Select value={audit} onChange={this.handleAuditChange} className={styles.select}>
              {recommendComs}
            </Select>
            <RangePicker value={date} onChange={this.handlePickChange} className={styles.date} />
            <Button type="primary" onClick={this.handleSearch} icon="search">
              搜索
            </Button>
          </div>
          <div className={styles.bar}>
            <Button type="primary" className={styles.button}>
              <Link to="/portalManagement/publication">发布</Link>
            </Button>
          </div>
          <div>
            <Table
              bordered
              columns={columns}
              dataSource={data}
              // pagination={pagination}
              // loading={loading}
              rowKey="id"
              onChange={this.handleStandardTableChange}
            />
          </div>
          <Modal
            visible={showModal}
            onCancel={() => this.setState({ showModal: false })}
            title="设置"
          >
            <Form>
              <Form.Item label="栏目" labelCol={{ span: 5 }} wrapperCol={{ span: 19 }}>
                <Select className={styles.selectInner1}>{firstComs}</Select>
                <Select className={styles.selectInner2}>{secondeComs}</Select>
              </Form.Item>
              <Form.Item label="是否置顶" labelCol={{ span: 5 }} wrapperCol={{ span: 12 }}>
                {getFieldDecorator('top')(
                  <Radio.Group>
                    <Radio value="是">是</Radio>
                    <Radio value="否">否</Radio>
                  </Radio.Group>
                )}
              </Form.Item>
              <Form.Item label="是否为推荐" labelCol={{ span: 5 }} wrapperCol={{ span: 12 }}>
                {getFieldDecorator('recommend')(
                  <Radio.Group>
                    <Radio value="是">是</Radio>
                    <Radio value="否">否</Radio>
                  </Radio.Group>
                )}
              </Form.Item>
            </Form>
          </Modal>
        </div>
      </PageHeaderLayout>
    );
  }
}
