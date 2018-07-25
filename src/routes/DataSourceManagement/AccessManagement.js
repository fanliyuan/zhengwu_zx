import React, { Component } from 'react';
import { Table, Button, Input, Select, Card, DatePicker, Row, Col } from 'antd';
import moment from 'moment';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';

import styles from './AccessManagement.less';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';

const { Option } = Select;
const { RangePicker } = DatePicker;
@connect(({ accessManagement }) => ({
  accessManagement,
}))
export default class AccessManagement extends Component {
  state = {
    dataType: '0',
    // nodeName:'0',
    owingJg: '0',
    creater: '0',
    // status:'0',
  };

  selectDataTypeChange = val => {
    this.setState({
      dataType: val,
    });
  };

  selectNodeChange = () => {
    // this.setState({
    //   nodeName:val,
    // })
  };

  selectOwingJgChange = val => {
    this.setState({
      owingJg: val,
    });
  };

  selectCreaterChange = val => {
    this.setState({
      creater: val,
    });
  };

  selectStatusChange = () => {
    // this.setState({
    //   status:val,
    // })
  };

  handleAdd = () => {
    const { dispatch } = this.props;
    dispatch(routerRedux.push('/dataSourceManagement/addAccess'));
  };

  handleEdit = () => {
    const { dispatch } = this.props;
    dispatch(routerRedux.push('/dataSourceManagement/addAccess'));
  };

  handleRegister = () => {
    const { dispatch } = this.props;
    dispatch(routerRedux.push('/dataSourceManagement/inputDataInfo'));
  };

  handleRegister1 = () => {
    const { dispatch } = this.props;
    dispatch(routerRedux.push('/dataSourceManagement/updataFile'));
  };

  handleRegister2 = () => {
    const { dispatch } = this.props;
    dispatch(routerRedux.push('/dataSourceManagement/ftp'));
  };

  render() {
    const that = this;
    const { dataType, owingJg, creater } = this.state;
    const data = [
      { value: '0', id: 0, label: '数据类型' },
      { value: '1', id: 1, label: '数据类型1' },
    ];
    const selectData = data.map(item => {
      return (
        <Option value={item.value} key={item.id} title={item.label}>
          {item.label}
        </Option>
      );
    });
    // const data1=[
    //   {value:'0',id:0,label:'节点'},
    //   {value:'1',id:1,label:'节点1'},
    // ];
    // const selectData1 = data1.map(item => {
    //   return (<Option value={item.value} key={item.id} title={item.label}>{item.label}</Option>)
    // })
    const data2 = [
      { value: '0', id: 0, label: '所属机构' },
      { value: '1', id: 1, label: 'XXX机构' },
    ];
    const selectData2 = data2.map(item => {
      return (
        <Option value={item.value} key={item.id} title={item.label}>
          {item.label}
        </Option>
      );
    });
    const data3 = [{ value: '0', id: 0, label: '创建人' }, { value: '1', id: 1, label: '创建人1' }];
    const selectData3 = data3.map(item => {
      return (
        <Option value={item.value} key={item.id} title={item.label}>
          {item.label}
        </Option>
      );
    });
    // const data4=[
    //   {value:'0',id:0,label:'审核状态'},
    //   {value:'1',id:1,label:'审核状态1'},
    // ];
    // const selectData4 = data4.map(item => {
    //   return (<Option value={item.value} key={item.id} title={item.label}>{item.label}</Option>)
    // })
    const pagination = { pageSize: 10, current: 1 };
    const columns = [
      {
        title: '名称',
        dataIndex: 'name',
      },
      {
        title: '数据类型',
        dataIndex: 'dataType',
      },
      {
        title: '节点',
        dataIndex: 'node',
      },
      {
        title: '所属机构',
        dataIndex: 'institution',
      },
      {
        title: '创建人',
        dataIndex: 'creater',
      },
      {
        title: '建立时间',
        dataIndex: 'createTime',
        render(text) {
          return moment(text).format('YYYY-MM-DD HH:mm:ss');
        },
      },
      {
        title: '审核状态',
        dataIndex: 'status',
        render(text) {
          return +text === 0 ? '待审核' : +text === 1 ? '已通过' : '已拒绝';
        },
      },
      {
        title: '操作',
        render(text, row) {
          if (row.status === '0') {
            return (
              <div>
                <span className={styles.editBtn} onClick={that.handleEdit}>
                  修改
                </span>
                <a>删除</a>
              </div>
            );
          } else if (+row.id === 1) {
            return (
              <div>
                <span className={styles.editBtn} onClick={that.handleEdit}>
                  修改
                </span>
                <a style={{ marginRight: 20 }}>删除</a>
                <span className={styles.editBtn} onClick={that.handleRegister}>
                  资源注册
                </span>
              </div>
            );
          } else if (+row.id === 2) {
            return (
              <div>
                <span className={styles.editBtn} onClick={that.handleEdit}>
                  修改
                </span>
                <a style={{ marginRight: 20 }}>删除</a>
                <span className={styles.editBtn} onClick={that.handleRegister1}>
                  资源注册
                </span>
              </div>
            );
          } else if (+row.id === 3) {
            return (
              <div>
                <span className={styles.editBtn} onClick={that.handleEdit}>
                  修改
                </span>
                <a style={{ marginRight: 20 }}>删除</a>
                <span className={styles.editBtn} onClick={that.handleRegister2}>
                  资源注册
                </span>
              </div>
            );
          }
        },
      },
    ];
    columns.forEach(item => {
      item.align = 'center';
    });
    const list = [
      {
        id: 0,
        name: '城市低保标准表(各市第1季度)',
        dataType: 'Mysql',
        node: '石家庄民政部',
        institution: '石家庄民政部',
        creater: '张三',
        createTime: 233435354,
        status: '0',
      },
      {
        id: 1,
        name: '农村低保标准表(各市第1季度)',
        dataType: 'Mysql',
        node: '石家庄民政部',
        institution: '石家庄民政部',
        creater: '李四',
        createTime: 233435354,
        status: '1',
      },
      {
        id: 2,
        name: '人口普查数据',
        dataType: '文件',
        node: '石家庄民政部',
        institution: '石家庄民政部',
        creater: '王五',
        createTime: 233435354,
        status: '2',
      },
      {
        id: 3,
        name: '人口普查数据',
        dataType: 'FTP',
        node: '石家庄民政部',
        institution: '石家庄民政部',
        creater: '王五',
        createTime: 233435354,
        status: '2',
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
          <Row className={styles.form} gutter={16}>
            <Col span={3}>
              <Input placeholder="名称" />
            </Col>
            <Col xl={{ span: 3 }} lg={{ span: 4 }} sm={{ span: 24 }}>
              <Select value={dataType} onChange={this.selectDataTypeChange}>
                {selectData}
              </Select>
            </Col>
            {/* <Col span={4}>
              <Select value={nodeName} onChange={this.selectNodeChange}>
                {selectData1}
              </Select>
            </Col> */}
            <Col xl={{ span: 3 }} lg={{ span: 4 }} sm={{ span: 24 }}>
              <Select value={owingJg} onChange={this.selectOwingJgChange}>
                {selectData2}
              </Select>
            </Col>
            <Col xl={{ span: 3 }} lg={{ span: 4 }} sm={{ span: 24 }}>
              <Select value={creater} onChange={this.selectCreaterChange}>
                {selectData3}
              </Select>
            </Col>
            <Col xl={{ span: 4 }} lg={{ span: 5 }} sm={{ span: 24 }}>
              <RangePicker />
            </Col>
            {/* <Col span={3}>
              <Select value={status} onChange={this.selectStatusChange}>
                {selectData4}
              </Select>
            </Col> */}
            <Col span={2} offset={1}>
              <Button type="primary">搜索</Button>
            </Col>
          </Row>
          <div className={styles.createBtn}>
            <Button icon="plus" type="primary" onClick={this.handleAdd}>
              新建
            </Button>
          </div>
          <div>
            <Table
              columns={columns}
              dataSource={list}
              pagination={pagination}
              rowKey="id"
              bordered
              rowSelection={rowSelection}
            />
          </div>
          {/* <div>
            <Button type="primary">删除</Button>
          </div> */}
        </Card>
      </PageHeaderLayout>
    );
  }
}
