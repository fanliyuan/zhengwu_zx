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
  Spin,
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

// const menuData = [ { title: '01|-雄安政务信息资源', key: '4', }, { title: '02|-雄安市民服务中心信息资源', key: '5', }, { title: '03|-雄安个人数据信息资源', key: '6', }, { title: '001|-药品局', key: '7', }, { title: '002|-医疗器械', key: '8', }, { title: '130|-保定', key: '1', children: [ { title: '638|-雄县', key: '1-1', }, { title: '632|-安新县', key: '1-2', }, { title: '629|-容城县', key: '1-3', }, ], }, { title: '132|-雄安新区', key: '2', children: [ { title: '1|-政府', key: '2-1', }, { title: '2|-政府', key: '2-2', }, ], }, { title: '1306|-XA政务信息资源', key: '3', children: [ { title: '1|-直属委办局', key: '3-1', }, { title: '123|住房和城乡建设局', key: '3-2', }, { title: '124|环境保护局', key: '3-3', }, { title: '125|旅游文物局', key: '3-4', }, { title: '126|规划局', key: '3-5', }, ], }, ]

@connect(({ catalogManagement, nodeManagement, loading }) => ({
  catalogManagement,
  nodeManagement,
  loading: loading.models.nodeManagement || loading.models.catalogManagement,
}))
export default class CatalogManagement extends Component {
  state = {
    isHover: false,
    isNodeOperator: false,
    queryData: {},
    query: '',
    isChanged: false,
  }

  componentDidMount() {
    this.setState({
      isNodeOperator: localStorage.getItem('antd-pro-authority') === 'operator-n',
    })
    this.props.dispatch({
      type: 'nodeManagement/getParentNodes',
    })
    this.props.dispatch({
      type: 'catalogManagement/getCatalogList',
    })
  }

  nameChange = e => {
    const { queryData } = this.state
    this.setState({
      queryData: {
        ...queryData,
        catalogName: e.target.value.trim(),
      },
      isChanged: true,
    })
  }

  providerChange = e => {
    const { queryData } = this.state
    this.setState({
      queryData: {
        ...queryData,
        providerName: e.target.value.trim(),
      },
      isChanged: true,
    })
  }

  nodeChange = val => {
    const { queryData } = this.state
    this.setState({
      queryData: {
        ...queryData,
        nodeId: val[0] && +[...val].pop(),
      },
      isChanged: true,
    })
  }

  statusChange = val => {
    const { queryData } = this.state
    this.setState({
      queryData: {
        ...queryData,
        status: val === '-2' ? undefined: val,
      },
      isChanged: true,
    })
  }

  timeChange = val => {
    const { queryData } = this.state
    this.setState({
      queryData: {
        ...queryData,
        startTime: val[0] && `${val[0].format().substr(0,10)}`,
        endTime: val[1] && `${val[1].format().substr(0,10)}`,
      },
      isChanged: true,
    })
  }

  checkChange = e => {
    // console.log(e.target.checked)// eslint-disable-line
    const { queryData } = this.state
    this.setState({
      queryData: {
        ...queryData,
        isMount: e.target.checked?'1':'0',
      },
      isChanged: true,
    })
  }

  searchHandle = ({pageSize = '10', pageNum = '1'}, flag) =>{
    const { isChanged } = this.state
    if (!isChanged && flag) {
      return null
    }
    const { queryData: { catalogName, providerName, status, startTime, endTime, typeId, isMount } } = this.state
    if (!typeId) {
      message.error('请在右边选择目录')
      return null
    }
    this.props.dispatch({
      type: 'catalogManagement/getCatalog',
      payload: {
        params: {
          index: pageNum,
          limit: pageSize,
          resourceName: catalogName,
          resourceProviderName: providerName,
          checkStatus: status,
          isMount,
          typeId,
          startTime,
          endTime,
        },
      },
    })
    this.setState({
      isChanged: false,
    })
  }

  treeListChange = e => {
    this.setState({
      query: e.target.value.trim(),
    })
  }

  handleSearchList = () => {
    const { query } = this.state
    this.props.dispatch({
      type: 'catalogManagement/queryCatalog',
      payload: query,
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
      setTimeout(() => {
        message.success('上传成功,不过这个只是假的')
      }, 1000)
    }
  }

  handleInfoItem = row => {
    const { dispatch } = this.props
    dispatch(routerRedux.push('/dataSourceManagement/viewDirectory', {resourceId: row.resourceId}))
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

  directoryChange = val => {
    // message.success(`选择了${val}`)
    this.setState({
      queryData: {
        ...this.state.queryData,// eslint-disable-line
        typeId: val[0],
      },
    }, () => {
      this.searchHandle({})
    })
  }

  tableChange = (pagination) => {
    this.searchHandle({pageSize: pagination.pageSize, pageNum: pagination.current})
  }

  handleTask = () => {
    const { dispatch } = this.props
    dispatch(routerRedux.push('/dataSourceManagement/task'))
  }

  render() {
    const that = this
    const { nodeManagement: { parentNodeList }, catalogManagement: { catalogTreeList, catalogList, catalogData, pagination }, loading } = this.props
    const { isHover, isNodeOperator } = this.state
    // const data = [{ value: '0', id: 0, label: '提供方' }, { value: '1', id: 1, label: '提供方1' }]
    // const selectData = data.map(item => {
    //   return (
    //     <Option value={item.value} key={item.id} title={item.label}>
    //       {item.label}
    //     </Option>
    //   )
    // })
    const data1 = [
      { value: '-2', id: -2, label: '全部状态' },
      { value: '0', id: 0, label: '已拒绝' },
      { value: '1', id: 1, label: '已通过' },
      { value: '-1', id: -1, label: '待审核' },
    ]
    const selectData1 = data1.map(item => {
      return (
        <Option value={item.value} key={item.id} title={item.label}>
          {item.label}
        </Option>
      )
    })
    const columns = [
      // {
      //   title: '目录编码',
      //   dataIndex: 'catalogEncoding',
      // },
      {
        title: '名称',
        dataIndex: 'resourceName',
      },
      {
        title: '提供方',
        dataIndex: 'resourceProviderName',
      },
      // {
      //   title: '所属节点',
      //   dataIndex: 'oweNode',
      // },
      // {
      //   title: '目录节点',
      //   dataIndex: 'typeName',
      // },
      {
        title: '审核状态',
        dataIndex: 'status',
        render(text) {
          if (text === '-1') {
            return '待审核'
          } else if (text === '0') {
            return '已拒绝'
          } else {
            return '已通过'
          }
        },
      },
      {
        title: '注册时间',
        dataIndex: 'createTime',
        render(text) {
          return moment(text).format('lll')
        },
      },
      {
        title: '操作',
        dataIndex: 'operate',
        render: (text, row) => {
          return (
            <div>
              <span className={styles.clickBtn} onClick={() => that.handleInfoItem(row)}>
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
                // <Link to="/dataSourceManagement/checkMenu/one" className={styles.clickBtn}>
                //   查看
                // </Link>
                <a onClick={() => this.handleTask(row)}>
                  任务
                </a>
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
          dataIndex: 'typeName',
        })
    }
    columns.forEach(item => {
      item.align = 'center'
    })
    // const list = [
    //   {
    //     id: 0,
    //     catalogEncoding: '330003130681126-0001',
    //     name: '花名册信息',
    //     provider: '规划局',
    //     createTime: 344344242,
    //     isMouontSource: 0,
    //     oweNode: '石家庄民政局',
    //     isOpen: 1,
    //     information: 14,
    //     status: '0',
    //     nodes: '节点1',
    //     type: 'file',
    //   },
    //   {
    //     id: 1,
    //     catalogEncoding: '330003130681126-0002',
    //     name: '资产负债表信息',
    //     provider: '规划局',
    //     oweNode: '石家庄民政局',
    //     createTime: 344344242,
    //     isMouontSource: 1,
    //     isOpen: 0,
    //     information: 6,
    //     status: '1',
    //     nodes: '节点2',
    //     type: 'table',
    //   },
    //   {
    //     id: 2,
    //     catalogEncoding: '330003130681126-0003',
    //     name: '资产总值表',
    //     provider: '规划局',
    //     oweNode: '石家庄民政局',
    //     createTime: 344344242,
    //     isMouontSource: 0,
    //     isOpen: 0,
    //     information: 2,
    //     status: '1',
    //     nodes: '节点3',
    //     type: 'file',
    //   },
    // ]
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
              <Input placeholder="请输入关键词" className={styles.input} onChange={this.treeListChange} onPressEnter={this.handleSearchList} />
              <Button type="primary" icon="search" onClick={this.handleSearchList} />
            </div>
            <Spin className="clearfix" spinning={loading}>
              <Tooltip title="单击选择文件或者目录,单击箭头展开目录" className="fr mr8">
                <Icon type="question-circle-o" />
              </Tooltip>
              <DirectoryTree
                defaultExpandAll
                onSelect={this.directoryChange}
                className={styles.tree}
                expandAction={false}
                >
                {renderTreeNode(catalogList.length === 0 ? catalogTreeList : catalogList)}
              </DirectoryTree>
            </Spin>
          </div>
          <div className={styles.column2}>
            <div className={styles.form}>
              <Input placeholder="名称" style={{ width: 180, marginRight: 20 }} onChange={this.nameChange} />
              {/* {isNodeOperator && (
                <Input placeholder="节点名称" style={{ width: 100, marginRight: 20 }} />
              )} */}
              {/* <Select
                style={{ marginRight: 20, width: 120 }}
                onChange={this.providerChange}
                >
                {selectData}
              </Select> */}
              <Input placeholder="提供方名称" style={{ width: 180, marginRight: 20 }} onChange={this.providerChange} />
              {
                !isNodeOperator && <Cascader options={parentNodeList} changeOnSelect displayRender={lables => [...lables].pop()} placeholder="所属节点" style={{ marginRight: 16, width: 120 }} />
              }
              <Select
                defaultValue='-2'
                style={{ marginRight: 20, width: 120 }}
                onChange={this.statusChange}
                >
                {selectData1}
              </Select>
              <RangePicker style={{ marginRight: 20, width: 200 }} onChange={this.timeChange} />
              <Checkbox style={{ marginRight: 10 }} onChange={this.checkChange}>已挂接资源</Checkbox>
              <Button type="primary" onClick={() => this.searchHandle({}, true)}>搜索</Button>
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
                dataSource={this.state.queryData.typeId ? catalogData : []}
                pagination={this.state.queryData.typeId && pagination && {...pagination, showQuickJumper: true, showTotal: (total) => `共 ${Math.ceil(total / pagination.pageSize)}页 / ${total}条 数据`}}
                rowKey="resourceId"
                // rowSelection={rowSelection}
                onChange={this.tableChange}
                loading={loading}
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
