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
  Cascader,
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
    title: '01|-雄安政务信息资源',
    key: '4',
  },
  {
    title: '02|-雄安市民服务中心信息资源',
    key: '5',
  },
  {
    title: '03|-雄安个人数据信息资源',
    key: '6',
  },
  {
    title: '001|-药品局',
    key: '7',
  },
  {
    title: '002|-医疗器械',
    key: '8',
  },
  {
    title: '130|-保定',
    key: '1',
    children: [
      {
        title: '638|-雄县',
        key: '1-1',
      },
      {
        title: '632|-安新县',
        key: '1-2',
      },
      {
        title: '629|-容城县',
        key: '1-3',
      },
    ],
  },
  {
    title: '132|-雄安新区',
    key: '2',
    children: [
      {
        title: '1|-政府',
        key: '2-1',
      },
      {
        title: '2|-政府',
        key: '2-2',
      },
    ],
  },
  {
    title: '1306|-XA政务信息资源',
    key: '3',
    children: [
      {
        title: '1|-直属委办局',
        key: '3-1',
      },
      {
        title: '123|住房和城乡建设局',
        key: '3-2',
      },
      {
        title: '124|环境保护局',
        key: '3-3',
      },
      {
        title: '125|旅游文物局',
        key: '3-4',
      },
      {
        title: '126|规划局',
        key: '3-5',
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
    const options = [
      {
        value: '0-0',
        label: '北京国土局',
        children: [
          {
            value: '0-0-1',
            label: '海淀国土局',
            // children: [{
            //   value: 'xihu',
            //   label: 'West Lake',
            // }],
          },
        ],
      },
      {
        value: '0-1',
        label: '河北国土局',
        children: [
          {
            value: '0-1-0',
            label: '保定国土局',
            // children: [{
            //   value: 'zhonghuamen',
            //   label: 'Zhong Hua Men',
            // }],
          },
        ],
      },
    ]
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
    const columns = [
      // {
      //   title: '目录编码',
      //   dataIndex: 'catalogEncoding',
      // },
      {
        title: '名称',
        dataIndex: 'name',
      },
      {
        title: '提供方',
        dataIndex: 'provider',
      },
      // {
      //   title: '所属节点',
      //   dataIndex: 'oweNode',
      // },
      // {
      //   title: '目录节点',
      //   dataIndex: 'nodes',
      // },
      {
        title: '审核状态',
        dataIndex: 'status',
        render(text) {
          return +text === 0 ? '待审核' : '已通过'
        },
      },
      {
        title: '注册时间',
        dataIndex: 'createTime',
        render(text) {
          return moment(text).format('YYYY-MM-DD HH:mm:ss')
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
                  共享开放
                </span>
              )}
              {isNodeOperator ? (
                <Link to="/dataSourceManagement/newMenu/one" className={styles.clickBtn}>
                  修改
                </Link>
              ) : (
                <Link to="/dataSourceManagement/checkMenu/one" className={styles.clickBtn}>
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
    if(!isNodeOperator){
      columns.splice(2,0,{
          title: '目录节点',
          dataIndex: 'nodes',
        })
    }
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
        oweNode: '石家庄民政局',
        isOpen: 1,
        information: 14,
        status: '0',
        nodes: '节点1',
        type: 'file',
      },
      {
        id: 1,
        catalogEncoding: '330003130681126-0002',
        name: '资产负债表信息',
        provider: '规划局',
        oweNode: '石家庄民政局',
        createTime: 344344242,
        isMouontSource: 1,
        isOpen: 0,
        information: 6,
        status: '1',
        nodes: '节点2',
        type: 'table',
      },
      {
        id: 2,
        catalogEncoding: '330003130681126-0003',
        name: '资产总值表',
        provider: '规划局',
        oweNode: '石家庄民政局',
        createTime: 344344242,
        isMouontSource: 0,
        isOpen: 0,
        information: 2,
        status: '1',
        nodes: '节点3',
        type: 'file',
      },
    ]
    // let rowSelection = {
    //   // onChange: selectedRows => {
    //   // },
    //   // getCheckboxProps: record => ({
    //   //   disabled: record.name === 'Disabled User',
    //   //   name: record.name,
    //   // }),
    // }
    // if (!isNodeOperator) {
    //   // rowSelection = null
    //   columns = columns.filter(item => item.title !== '目录节点')
    // }
    return (
      <PageHeaderLayout>
        <div className="clearfix">
          <div className={styles.column1}>
            <div className={styles.search}>
              <Input placeholder="请输入关键词" className={styles.input} />
              <Button type="primary" icon="search" />
            </div>
            <div className="clearfix">
              <Tooltip title="左键单击展开目录,右键单击选择文件" className="fr mr8">
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
              <Input placeholder="名称" style={{ width: 100, marginRight: 20 }} />
              {/* {isNodeOperator && (
                <Input placeholder="节点名称" style={{ width: 100, marginRight: 20 }} />
              )} */}
              <Select
                style={{ marginRight: 20, width: 120 }}
                value={provider}
                onChange={this.providerChange}
                >
                {selectData}
              </Select>
              {
                !isNodeOperator && <Cascader options={options} placeholder="所属节点" style={{ marginRight: 16 }} />
              }
              <Select
                style={{ marginRight: 20, width: 120 }}
                value={status}
                onChange={this.statusChange}
                >
                {selectData1}
              </Select>
              <RangePicker style={{ marginRight: 20, width: 200 }} />
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
                pagination={pagination && {...pagination, showQuickJumper: true, showTotal: (total) => `共 ${Math.ceil(total / pagination.pageSize)}页 / ${total}条 数据`}}
                rowKey="id"
                // rowSelection={rowSelection}
                loading={this.state.loading}
                bordered
                />
            </div>
            {/* <div>{isNodeOperator && <Button type="primary">删除</Button>}</div> */}
          </div>
        </div>
      </PageHeaderLayout>
    )
  }
}
