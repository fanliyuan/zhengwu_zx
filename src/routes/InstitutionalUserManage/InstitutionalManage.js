import React, { Component } from 'react'
import { Table, Button, Input, Card, DatePicker, Cascader } from 'antd'
import moment from 'moment'
import { connect } from 'dva'
import { routerRedux } from 'dva/router'

import styles from './InstitutionalManage.less'
import PageHeaderLayout from '../../layouts/PageHeaderLayout'

// const { Option } = Select
const { RangePicker } = DatePicker
@connect(({ Institution }) => ({
  Institution,
}))
export default class InstitutionalManage extends Component {
  state = {
    // province:'0',
  }

  componentDidMount = () => {
    const { dispatch } = this.props
    dispatch({
      type:'Institution/querys',
      // payload:{},
    })
  }

  provinceSelectChange = () => {
    // this.setState({
    //   province:val,
    // })
  }

  handleAdd = () => {
    const { dispatch } = this.props
    dispatch(routerRedux.push('/institutionalUserManage/addInstitution'))
  }

  render() {
    const { Institution } = this.props
    console.log(Institution)
    const data2 = [
      {
        value: '0',
        label: '河北省',
        children: [
          {
            value: '0-0',
            label: '保定市',
            children: [{ value: '0-0-0', label: '涞源县' }, { value: '0-0-1', label: '涞水县' }],
          },
          {
            value: '0-1',
            label: '唐山市',
            children: [{ value: '0-1-0', label: '滦县' }, { value: '0-1-1', label: '乐亭县' }],
          },
        ],
      },
      {
        value: '1',
        label: '北京市',
        children: [{ value: '1-0', label: '丰台区' }, { value: '1-1', label: '海淀区' }],
      },
    ]
    // const pagination = { pageSize:10,current:1 }
    const columns = [
      {
        title: '机构名称',
        dataIndex: 'institutionName',
        align: 'left',
      },
      {
        title: '负责人',
        dataIndex: 'manager',
      },
      {
        title: '负责人手机号',
        dataIndex: 'managerNumber',
      },
      {
        title: '排序',
        dataIndex: 'listSort',
      },
      {
        title: '所属省市区',
        dataIndex: 'province',
      },
      {
        title: '更新时间',
        dataIndex: 'updateTime',
        render(text) {
          return moment(text).format('YYYY-MM-DD HH:mm:ss')
        },
      },
      {
        title: '操作',
        render:() => {
          return (
            <div>
              <span className={styles.editBtn} onClick={this.handleAdd}>
                修改
              </span>
              <a style={{ marginRight: 20 }}>删除</a>
            </div>
          )
        },
      },
    ]
    columns.forEach(item => {
      if (item.title !== '机构名称') {
        item.align = 'center'
      }
    })
    const list = [
      {
        id: 0,
        institutionName: '国土局',
        manager: '张三1',
        managerNumber: '13809090909',
        listSort: 1,
        province: '菏泽市',
        updateTime: 3423423424,
        children: [
          {
            id: 1,
            institutionName: '国土局办公室1',
            manager: '张三1',
            managerNumber: '13809090909',
            listSort: 1,
            province: '菏泽市 单县',
            updateTime: 3423423424,
          },
          {
            id: 2,
            institutionName: '国土局办公室2',
            manager: '张三1',
            managerNumber: '13809090909',
            listSort: 1,
            province: '菏泽市 曹县',
            updateTime: 3423423424,
          },
        ],
      },
      {
        id: 3,
        institutionName: '水利局',
        manager: '张三4',
        managerNumber: '135609090909',
        listSort: 2,
        province: '菏泽市',
        updateTime: 38877423424,
      },
      {
        id: 4,
        institutionName: '电力局',
        manager: '张三5',
        managerNumber: '135609090909',
        listSort: 3,
        province: '菏泽市',
        updateTime: 345423423424,
      },
    ]
    return (
      <PageHeaderLayout>
        <Card>
          <div className={styles.form}>
            <Input placeholder="机构名称" style={{ width: 150, marginRight: 20 }} />
            <Cascader options={data2} placeholder="所在省市区" style={{ marginRight: 20 }} />,
            <RangePicker style={{ marginRight: 20 }} />
            <Button type="primary">搜索</Button>
          </div>
          <div className={styles.createBtn}>
            <Button icon="plus" type="primary" onClick={this.handleAdd}>
              新建
            </Button>
          </div>
          <div>
            <Table columns={columns} dataSource={list} pagination={false} rowKey="id" bordered />
          </div>
        </Card>
      </PageHeaderLayout>
    )
  }
}
