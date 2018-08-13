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

  }

  componentDidMount = () => {
    const { dispatch } = this.props
    dispatch({
      type:'Institution/querys',
      payload:{pageNum:0,pageSize:10},
    })
  }

  provinceSelectChange = () => {
    // this.setState({
    //   province:val,
    // })
  }

  handleAdd = () => {
    const { dispatch } = this.props
    dispatch({
      type:'Institution/editId',
      payload:{deptId:-1},
    })
    dispatch(routerRedux.push('/institutionalUserManage/addInstitution'))
  }

  handleDelete =  async (id) => {
    const { dispatch } = this.props
    await dispatch({
      type:'Institution/deleteItem',
      payload:{pkId:+id},
    })
  }

  handleEdit = (deptId) => {
    const { dispatch } = this.props
    dispatch({
      type:'Institution/editId',
      payload:{deptId:+deptId},
    })
    dispatch(routerRedux.push('/institutionalUserManage/addInstitution'))
  }

  render() {
    const { Institution:{list} } = this.props
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
        dataIndex: 'deptName',
        align: 'left',
      },
      {
        title: '负责人',
        dataIndex: 'chargeUser',
      },
      {
        title: '负责人手机号',
        dataIndex: 'chargePhone',
      },
      {
        title: '排序',
        dataIndex: 'orderFlag',
      },
      {
        title: '所属省市区',
        dataIndex: 'proCityAreaInfo',
        render:(text) => {
          return(`${ text.pro } ${ text.city } ${ text.area }`)
        },
      },
      {
        title: '更新时间',
        dataIndex: 'updateTime',
        render(text) {
          return text ? moment(+text).format('lll') : ''
        },
      },
      {
        title: '操作',
        render:(text,row) => {
          return (
            <div>
              <span className={styles.editBtn} onClick={this.handleEdit.bind(null,row.deptId)}>
                修改
              </span>
              <span className={styles.editBtn} style={{ marginRight: 16 }} onClick={this.handleDelete.bind(null,row.deptId)}>删除</span>
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
            <Table columns={columns} dataSource={list} pagination={false} rowKey="deptId" bordered />
          </div>
        </Card>
      </PageHeaderLayout>
    )
  }
}
