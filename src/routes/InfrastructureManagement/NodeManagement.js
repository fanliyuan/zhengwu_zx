/*
 * @Author: ChouEric
 * @Date: 2018-07-02 14:27:19
 * @Last Modified by: ChouEric
 * @Last Modified time: 2018-08-16 14:31:54
*/
import React, { Component } from 'react'
import { connect } from 'dva'
import { routerRedux } from 'dva/router'
import {
  Form,
  Input,
  Select,
  Button,
  Table,
  Cascader,
  Badge,
  Popconfirm,
  message,
  // Dropdown,
  // Menu,
  // Icon,
} from 'antd'

import styles from './NodeManagement.less'
import PageHeaderLayout from '../../layouts/PageHeaderLayout'

@connect(({ nodeManagement, loading }) => ({
  nodeManagement,
  loading: loading.models.nodeManagement,
}))
export default class NodeManagement extends Component {
  state = {
    queryData: {
      nodeName: '',
      mac: undefined,
      pid: [],
      depId: [],
      nodeState: '全部状态',
    },
    isChanged: false,
    // selectKeys: [],
  }

  componentDidMount() {
    const { dispatch } = this.props
    dispatch({
      type: 'nodeManagement/getNodes',
      payload: {},
    })
    dispatch({
      type: 'nodeManagement/getParentNodes',
    })
    dispatch({
      type: 'nodeManagement/getDepartments',
    })
  }

  handleNodeChange = e => {
    const { queryData } = this.state
    this.setState({
      queryData: {
        ...queryData,
        nodeName: e.target.value.trim(),
      },
      isChanged: true,
    })
  }

  handleIPChange = e => {
    const { queryData } = this.state
    this.setState({
      queryData: {
        ...queryData,
        mac: e.target.value.trim(),
      },
      isChanged: true,
    }) 
  }

  handleNodeSelectChange = val => {
    const { queryData } = this.state
    this.setState({
      queryData: {
        ...queryData,
        pid: val,
      },
      isChanged: true,
    })
  }

  handleOrganizationChange = val => {
    const { queryData } = this.state
    this.setState({
      queryData: {
        ...queryData,
        depId: val,
      },
      isChanged: true,
    })
  }

  handleStateChange = val => {
    const { queryData } = this.state
    this.setState({
      queryData: {
        ...queryData,
        nodeState: val,
      },
      isChanged: true,
    })
  }

  handleSearch = () => {
    const { isChanged, queryData: { nodeName, mac, pid, depId, nodeState } } = this.state
    if (!isChanged) {
      return false
    }
    const queryData = {
      nodeName: nodeName || undefined,
      mac: mac || undefined,
      pid: [...pid].pop(),
      depId: [...depId].pop(),
      nodeState: nodeState === '全部状态' ? undefined : nodeState,
    }
    const { dispatch } = this.props
    dispatch({
      type: 'nodeManagement/getNodes',
      payload: {
        ...queryData,
      },
    })
    this.setState({
      isChanged: false,
    })
  }

  handleTableChange = pagination => {
    const { queryData: { nodeName, mac, pid, depId, nodeState } } = this.state
    const queryData = {
      nodeName: nodeName || undefined,
      mac: mac || undefined,
      pid: pid.pop(),
      depId: depId.pop(),
      nodeState: nodeState === '全部状态' ? undefined : nodeState,
    }
    this.props.dispatch({
      type: 'nodeManagement/getNodes',
      payload: {
        queryData,
        ...{pageSize: pagination.pageSize, pageNumber: pagination.current},
      },
    })
  }

  handleDelete = row => {
    this.props.dispatch({
      type: 'nodeManagement/deleteNode',
      payload: {
        nodeId: row.nodeId,
      },
    })
  }

  handleEdit = row => {
    this.props.dispatch(
      routerRedux.push('/infrastructure/editNode',{nodeInfo: row})
    )
  }

  handleCancel = () => {
    message.info('删除取消')
  }

  addNode = () => {
    const { dispatch } = this.props
    dispatch(routerRedux.push('/infrastructure/addNode'))
  }

  // handleMenuClick = async (e, selectKeys) => {
  //   switch (e.key) {
  //     case '1':
  //       console.log('批量启动', selectKeys) // eslint-disable-line
  //       break
  //     case '2':
  //       console.log('批量停止', selectKeys) // eslint-disable-line
  //       break
  //     case '3':
  //       console.log('批量删除', selectKeys) // eslint-disable-line
  //       await this.props.dispatch({
  //         type: 'nodeManagement/deleteSome',
  //         payload: { ids: selectKeys },
  //       })
  //       await this.setState({
  //         isChanged: true,
  //       })
  //       await this.handleSearch()
  //       break
  //     default:
  //       break
  //   }
  // }

  render() {
    const {
      nodeManagement: { list, pagination, parentNodeList, departmentList},
      loading,
    } = this.props
    // const rowSelection = {
    //   selectKeys,
    //   onChange: Keys => {
    //     this.setState({
    //       selectKeys: Keys,
    //     })
    //   },
    // }
    const columns = [
      // {
      //   title: 'ID',
      //   dataIndex: 'id',
      // },
      {
        title: '节点名称',
        dataIndex: 'nodeName',
      },
      {
        title: '上级节点',
        dataIndex: 'parentNodeName',
      },
      {
        title: 'IP地址',
        dataIndex: 'mac',
      },
      {
        title: '所属机构',
        dataIndex: 'deptName',
      },
      {
        title: '状态',
        dataIndex: 'status',
        render(text) {
          const Com =
            text === '运行中' ? (
              <Badge status="success" text="运行中" />
            ) : (
              <Badge status="default" text="已停止" />
            )
          return Com
        },
      },
      {
        title: '操作',
        dataIndex: 'operation',
        render: (text, row) => {
          return (
            <div>
              <a className='mr16' onClick={() => this.handleEdit(row)}>修改</a>
              <Popconfirm
                title="确认删除?"
                onConfirm={() => this.handleDelete(row)}
                onCancel={this.handleCancel}
                okText="确定"
                cancelText="取消"
                >
                <a style={{ marginRight: 10 }}>
                  删除
                </a>
              </Popconfirm>
              {/* <Link to={`#${row.id}`} style={{ marginRight: 10 }}>
                监控
              </Link>
              <Link to={`#${row.id}`} style={{ marginRight: 10 }}>
                统计
              </Link>
              <Link to={`#${row.id}`} style={{ marginRight: 10 }}>
                任务
              </Link> */}
            </div>
          )
        },
      },
    ]
    columns.forEach(item => {
      item.align = 'center'
    })
    const stateList = [{value: '全部状态', label: '全部状态'},{value: 1, label: '运行中'}, {value: 0,label: '已停止'}] 
    const stateComs = stateList.map(item => {
      return (
        <Select.Option value={item.value} key={item.value} title={item.label}>
          {item.label}
        </Select.Option>
      )
    })
    // eslint-disable-next-line
    // const departmentComs = departmentList.map(item => (
    //   <Select.Option value={item.key} key={item.key}>{item.value}</Select.Option>
    // ))
    // const organizationList = [
    //   {
    //     label: '石家庄市',
    //     value: '010',
    //     children: [
    //       {
    //         label: '石家庄公安局',
    //         value: '0101',
    //       },
    //       {
    //         label: '石家庄检察院',
    //         value: '0102',
    //       },
    //     ],
    //   },
    //   {
    //     label: '衡水市',
    //     value: '011',
    //     children: [
    //       {
    //         label: '衡水公安局',
    //         value: '0111',
    //       },
    //       {
    //         label: '衡水检察院',
    //         value: '0112',
    //       },
    //       {
    //         label: '衡水财政局',
    //         value: '0113',
    //       },
    //     ],
    //   },
    //   {
    //     label: '邯郸市',
    //     value: '013',
    //   },
    // ]
    // const MenuComs = (
    //   <Menu onClick={e => this.handleMenuClick(e, selectKeys)}>
    //     <Menu.Item key="1">启动</Menu.Item>
    //     <Menu.Item key="2">停止</Menu.Item>
    //     <Menu.Item key="3">删除</Menu.Item>
    //   </Menu>
    // )

    return (
      <PageHeaderLayout>
        <div className={styles.layout}>
          <Form style={{ marginBottom: 20 }}>
            <Input
              onChange={this.handleNodeChange}
              onPressEnter={this.handleSearch}
              className={styles.node}
              placeholder="节点名"
              />
            <Input
              onChange={this.handleIPChange}
              onPressEnter={this.handleSearch}
              className={styles.ip}
              placeholder="IP地址"
              />
            <Cascader
              options={parentNodeList}
              value={this.state.queryData.pid}
              onChange={this.handleNodeSelectChange}
              className={styles.parentNode}
              changeOnSelect
              displayRender={label => [...label].pop()}
              placeholder="上级节点"
              />
            <Cascader
              options={departmentList}
              value={this.state.queryData.depId}
              onChange={this.handleOrganizationChange}
              className={styles.organization}
              changeOnSelect
              displayRender={label => [...label].pop()}
              placeholder="所属机构"
              />
            {/* <Select value={this.state.queryData.depId} className={styles.organization} onChange={this.handleOrganizationChange}>
              {departmentComs}
            </Select> */}
            <Select
              value={this.state.queryData.nodeState}
              onChange={this.handleStateChange}
              className={styles.state}
              >
              {stateComs}
            </Select>
            <Button type="primary" icon="search" onClick={this.handleSearch}>
              搜索
            </Button>
          </Form>
          <div style={{ marginBottom: 20 }}>
            <Button type="primary" onClick={this.addNode} className="mr16">
              新建
            </Button>
            {/* <Dropdown overlay={MenuComs}>
              <Button>
                批量操作<Icon type="down" />
              </Button>
            </Dropdown> */}
          </div>
          <Table
            columns={columns}
            dataSource={list}
            pagination={pagination && {...pagination, showQuickJumper: true, showTotal: (total) => `共 ${Math.ceil(total / pagination.pageSize)}页 / ${total}条 数据`}}
            onChange={this.handleTableChange}
            loading={loading}
            rowKey="nodeId"
            bordered
            />
        </div>
      </PageHeaderLayout>
    )
  }
}
