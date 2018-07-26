import React, { Component } from 'react'
import { Link, routerRedux } from 'dva/router'
import {
  Table,
  Button,
  Input,
  Select,
  DatePicker,
  Checkbox,
  Upload,
  message,
  Tree,
  Icon,
  Tooltip,
  Popconfirm,
} from 'antd'
import moment from 'moment'
import { connect } from 'dva'
import { isArray } from 'util'

import styles from './CatalogManagement.less'
import PageHeaderLayout from '../../layouts/PageHeaderLayout'

const { Option } = Select
const { RangePicker } = DatePicker
const { DirectoryTree, TreeNode } = Tree

function renderTreeNode(renderList) {
  if (!isArray(renderList)) {
    return null
  }
  return renderList.map(item => {
    if (!isArray(item.children)) {
      return <TreeNode title={item.title || '佚名'} key={item.key} isLeaf />
    } else {
      return (
        <TreeNode title={item.title || '佚名'} key={item.key}>
          {renderTreeNode(item.children)}
        </TreeNode>
      )
    }
  })
}

const menuData = [
  {
    title: '文件夹1',
    key: '1',
    children: [
      {
        title: '文件1',
        key: '1-1',
      },
      {
        title: '文件2',
        key: '1-2',
      },
      {
        title: '文件3',
        key: '1-3',
      },
    ],
  },
  {
    title: '文件夹2',
    key: '2',
    children: [
      {
        title: '数据1',
        key: '2-1',
        children: [
          {
            title: '文件1',
            key: '2-1-1',
          },
          {
            title: '文件2',
            key: '2-1-2',
          },
          {
            title: '文件3',
            key: '2-1-3',
          },
        ],
      },
      {
        title: '数据2',
        key: '2-2',
        children: [
          {
            title: '文件1',
            key: '2-2-1',
          },
          {
            title: '文件2',
            key: '2-2-2',
          },
          {
            title: '文件3',
            key: '2-2-3',
          },
        ],
      },
    ],
  },
]

@connect(({ catalogManagement }) => ({
  catalogManagement,
}))
export default class CatalogManagement extends Component {
  state = {
    provider: '0',
    status: '0',
    isHover: false,
    loading: false,
    isNodeOperator: false,
  }

  componentDidMount() {
    this.setState({
      isNodeOperator: localStorage.getItem('antd-pro-authority') === 'operator-n',
    })
  }

  providerChange = val => {
    this.setState({
      provider: val,
    })
  }

  statusChange = val => {
    this.setState({
      status: val,
    })
  }

  hoverFun = () => {
    const { isHover } = this.state
    this.setState({
      isHover: !isHover,
    })
  }

  downTpl = () => {
    message.info('下载模板')
  }

  uploadFun = ({ event }) => {
    if (event) {
      this.setState({
        loading: true,
      })
      setTimeout(() => {
        this.setState({
          loading: false,
        })
        message.success('上传成功,不过这个只是假的')
      }, 1000)
    }
  }

  handleInfoItem = () => {
    const { dispatch } = this.props
    dispatch(routerRedux.push('/dataSourceManagement/viewDirectory'))
  }

  handleSourceConnect = val => {
    const { dispatch } = this.props
    if (+val === 0) {
      dispatch(routerRedux.push('/dataSourceManagement/resourceConnectionData'))
    } else {
      dispatch(routerRedux.push('/dataSourceManagement/resourceConnection'))
    }
  }

  handleOpenShare = val => {
    const { dispatch } = this.props
    if (+val === 0) {
      dispatch(routerRedux.push('/dataSourceManagement/openShare'))
    } else {
      dispatch(routerRedux.push('/dataSourceManagement/openShareFile'))
    }
  }

  directoryChange = e => {
    try {
      message.success(`选择了${e.node.props.title}`)
    } catch (error) {
      message.error('页面出错')
    }
  }

  render() {
    const that = this
    const { provider, status, isHover, isNodeOperator } = this.state
    const data = [{ value: '0', id: 0, label: '提供方' }, { value: '1', id: 1, label: '提供方1' }]
    const selectData = data.map(item => {
      return (
        <Option value={item.value} key={item.id} title={item.label}>
          {item.label}
        </Option>
      )
    })
    const data1 = [
      { value: '0', id: 0, label: '审核状态' },
      { value: '1', id: 1, label: '审核状态1' },
    ]
    const selectData1 = data1.map(item => {
      return (
        <Option value={item.value} key={item.id} title={item.label}>
          {item.label}
        </Option>
      )
    })
    const pagination = { pageSize: 10, current: 1 }
    let columns = [
      {
        title: '目录编码',
        dataIndex: 'catalogEncoding',
      },
      {
        title: '名称',
        dataIndex: 'name',
      },
      {
        title: '提供方',
        dataIndex: 'provider',
      },
      {
        title: '注册时间',
        dataIndex: 'createTime',
        render(text) {
          return moment(text).format('YYYY-MM-DD HH:mm:ss')
        },
      },
      {
        title: '目录节点',
        dataIndex: 'node',
      },
      {
        title: '审核状态',
        dataIndex: 'status',
        render(text) {
          return +text === 0 ? '待审核' : '已通过'
        },
      },
      {
        title: '操作',
        dataIndex: 'operate',
        render(text, row) {
          return (
            <div>
              <span className={styles.clickBtn} onClick={that.handleInfoItem}>
                信息项
              </span>
              {/* <a style={{marginRight:10}}>资源挂接</a> */}
              <span
                className={styles.clickBtn}
                onClick={that.handleSourceConnect.bind(null, row.id)}
              >
                资源挂接
              </span>
              {isNodeOperator && (
                <span className={styles.clickBtn} onClick={that.handleOpenShare.bind(null, row.id)}>
                  开放设置
                </span>
              )}
              {isNodeOperator ? (
                <Link to="/dataSourceManagement/newMenu/one" className={styles.clickBtn}>
                  修改
                </Link>
              ) : (
                <Link to="/dataSourceManagement/newMenu/one" className={styles.clickBtn}>
                  查看
                </Link>
              )}
              {isNodeOperator && (
                <Popconfirm
                  title={`确认删除${row.name}?`}
                  onConfirm={() => message.info('删除成功!')}
                >
                  <a>删除</a>
                </Popconfirm>
              )}
            </div>
          )
        },
      },
    ]
    columns.forEach(item => {
      item.align = 'center'
    })
    const list = [
      {
        id: 0,
        catalogEncoding: '330003130681126-0001',
        name: '花名册信息',
        provider: '规划局',
        createTime: 344344242,
        isMouontSource: 0,
        isOpen: 1,
        information: 14,
        status: '0',
        node: '节点1',
        type: 'file',
      },
      {
        id: 1,
        catalogEncoding: '330003130681126-0002',
        name: '资产负债表信息',
        provider: '规划局',
        createTime: 344344242,
        isMouontSource: 1,
        isOpen: 0,
        information: 6,
        status: '1',
        node: '节点2',
        type: 'table',
      },
      {
        id: 2,
        catalogEncoding: '330003130681126-0003',
        name: '资产总值表',
        provider: '规划局',
        createTime: 344344242,
        isMouontSource: 0,
        isOpen: 0,
        information: 2,
        status: '1',
        node: '节点3',
        type: 'file',
      },
    ]
    let rowSelection = {
      // onChange: selectedRows => {
      // },
      // getCheckboxProps: record => ({
      //   disabled: record.name === 'Disabled User',
      //   name: record.name,
      // }),
    }
    if (!isNodeOperator) {
      rowSelection = null
      columns = columns.filter(item => item.title !== '目录节点')
    }
    return (
      <PageHeaderLayout>
        <div className="clearfix">
          <div className={styles.column1}>
            <div className={styles.search}>
              <Input placeholder="请输入关键词" className={styles.input} />
              <Button type="primary" icon="search" />
            </div>
            <div className="clearfix">
              <Tooltip title="左键单击展开目录,右键单击选择文件" className="fr mr8 mb16">
                <Icon type="question-circle-o" />
              </Tooltip>
              <DirectoryTree
                defaultExpandAll
                onRightClick={this.directoryChange}
                className={styles.tree}
              >
                {renderTreeNode(menuData)}
              </DirectoryTree>
            </div>
          </div>
          <div className={styles.column2}>
            <div className={styles.form}>
              <Input placeholder="名称" style={{ width: 150, marginRight: 20 }} />
              {isNodeOperator && (
                <Input placeholder="节点名称" style={{ width: 150, marginRight: 20 }} />
              )}
              <Select
                style={{ marginRight: 20, width: 120 }}
                value={provider}
                onChange={this.providerChange}
              >
                {selectData}
              </Select>
              <RangePicker style={{ marginRight: 20, width: 250 }} />
              <Select
                style={{ marginRight: 20, width: 120 }}
                value={status}
                onChange={this.statusChange}
              >
                {selectData1}
              </Select>
              <Checkbox style={{ marginRight: 10 }}>已挂接资源</Checkbox>
              <Button type="primary">搜索</Button>
            </div>
            {isNodeOperator && (
              <div className={styles.createBtn}>
                <Link to="/dataSourceManagement/newMenu" style={{ color: 'white' }}>
                  <Button icon="plus" type="primary">
                    新建
                  </Button>
                </Link>
                <span onMouseEnter={this.hoverFun} onMouseLeave={this.hoverFun}>
                  <Upload
                    name="file"
                    action="//jsonplaceholder.typicode.com/posts/"
                    showUploadList={false}
                    onChange={this.uploadFun}
                  >
                    <Button icon="upload">导入</Button>
                  </Upload>
                  {isHover && <a onClick={this.downTpl}>下载模板</a>}
                </span>
              </div>
            )}
            <div>
              <Table
                columns={columns}
                dataSource={list}
                pagination={pagination}
                rowKey="id"
                rowSelection={rowSelection}
                loading={this.state.loading}
                bordered
              />
            </div>
            <div>{isNodeOperator && <Button type="primary">删除</Button>}</div>
          </div>
        </div>
      </PageHeaderLayout>
    )
  }
}
