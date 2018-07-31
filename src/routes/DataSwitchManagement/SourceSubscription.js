import React, { Component } from 'react'
import { Link } from 'dva/router'
import { Table, Button, Input, Select, DatePicker, Row, Col, Icon, Tooltip, Tree } from 'antd'
import { isArray } from 'util'
import moment from 'moment'

import styles from './SourceSubscription.less'
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
export default class SourceSubscription extends Component {
  state = {
    selectJg: '发布机构',
    selectDy: '是否订阅',
    isNodeOperator: false,
  }

  componentDidMount() {
    this.setState({
      isNodeOperator: localStorage.getItem('antd-pro-authority') === 'operator-n',
    })
  }

  handleSelectChangejg = val => {
    this.setState({
      selectJg: val,
    })
  }

  handleSelectChangedy = val => {
    this.setState({
      selectDy: val,
    })
  }

  render() {
    const { selectJg, selectDy, isNodeOperator } = this.state
    const data = [{ value: '0', id: 0, label: '机构1' }, { value: '1', id: 1, label: '机构2' }]
    const selectData = data.map(item => {
      return (
        <Option value={item.value} key={item.id} title={item.label}>
          {item.label}
        </Option>
      )
    })
    const data1 = [{ value: '1', id: 1, label: '是' }, { value: '2', id: 2, label: '否' }]
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
      //   title: 'ID',
      //   dataIndex: 'id',
      //   render(text){
      //     return (text+1)
      //   },
      // },
      {
        title: '目录名称',
        dataIndex: 'name',
      },
      // {
      //   title: '所属主题',
      //   dataIndex: 'subject',
      // },
      // {
      //   title: '所属分类2',
      //   dataIndex: 'category2',
      // },
      // {
      //   title: '所属分类3',
      //   dataIndex: 'category3',
      // },
      {
        title: '数据类型',
        dataIndex: 'dataType',
      },
      {
        title: '发布机构',
        dataIndex: 'catalogSource',
      },
      {
        title: '发布时间',
        dataIndex: 'publicTime',
        render(text) {
          return moment(text).format('YYYY-MM-DD HH:mm:ss')
        },
      },
      {
        title: '发布方是否审核',
        dataIndex: 'isAudit',
        render(text) {
          return +text === 0 ? '否' : '是'
        },
      },
      // {
      //   title: '是否已订阅',
      //   dataIndex: 'isSubscription',
      //   render(text) {
      //     return +text === 0 ? '否' : '是'
      //   },
      // },
      // {
      //   title: '操作',
      //   render(text, row) {
      //     if (row.isSubscription === '0') {
      //       if (!isNodeOperator) {
      //         return <span>--</span>
      //       }
      //       return (
      //         <div>
      //           {row.dataType === '数据库' ? (
      //             <Link to={`/dataSwitchManagement/subscriptionTable/${row.id}`}>订阅</Link>
      //           ) : null}
      //           {row.dataType === '文件' ? (
      //             <Link to={`/dataSwitchManagement/subscriptionFile/${row.id}`}>订阅</Link>
      //           ) : null}
      //         </div>
      //       )
      //     } else {
      //       return (
      //         <div>
      //           {row.dataType === '数据库' ? (
      //             <Link to={`/dataSwitchManagement/subscriptionTable/${row.id}`}>详情</Link>
      //           ) : null}
      //           {row.dataType === '文件' ? (
      //             <Link to={`/dataSwitchManagement/subscriptionFile/${row.id}`}>详情</Link>
      //           ) : null}
      //         </div>
      //       )
      //     }
      //   },
      // },
    ]
    if (isNodeOperator) {
      columns.push({
        title: '是否已订阅',
        dataIndex: 'isSubscription',
        render(text) {
          return +text === 0 ? '否' : '是'
        },
      })
      columns.push({
        title: '操作',
        render(text, row) {
          if (row.isSubscription === '0') {
            if (!isNodeOperator) {
              return <span>--</span>
            }
            return (
              <div>
                {row.dataType === '数据库' ? (
                  <Link to={`/dataSwitchManagement/subscriptionTable/${row.id}`}>订阅</Link>
                ) : null}
                {row.dataType === '文件' ? (
                  <Link to={`/dataSwitchManagement/subscriptionFile/${row.id}`}>订阅</Link>
                ) : null}
              </div>
            )
          } else {
            return (
              <div>
                {row.dataType === '数据库' ? (
                  <Link to={`/dataSwitchManagement/subscriptionTable/${row.id}`}>详情</Link>
                ) : null}
                {row.dataType === '文件' ? (
                  <Link to={`/dataSwitchManagement/subscriptionFile/${row.id}`}>详情</Link>
                ) : null}
              </div>
            )
          }
        },
      })
    } else {
      columns.push({
        title: '订阅数',
        dataIndex: 'subscriptionNum',
      })
    }
    columns.forEach(item => {
      item.align = 'center'
    })
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
    const list = [
      {
        id: 0,
        name: '石家庄东城区国土数据',
        catalogSource: '',
        subject: '国土数据',
        category2: '石家庄东城区',
        category3: '',
        dataType: '数据库',
        publicTime: 334444443,
        isAudit: '0',
        isSubscription: '1',
        subscriptionNum: 6,
      },
      {
        id: 1,
        name: '石家庄东城区国土数据1',
        catalogSource: '',
        subject: '',
        category2: '',
        category3: '',
        dataType: '文件',
        publicTime: 334444443,
        isAudit: '1',
        isSubscription: '0',
        subscriptionNum: 8,
      },
      {
        id: 2,
        name: '石家庄东城区国土数据2',
        catalogSource: '',
        subject: '',
        category2: '',
        category3: '',
        dataType: '文件',
        publicTime: 334444443,
        isAudit: '0',
        isSubscription: '1',
        subscriptionNum: 10,
      },
    ]
    return (
      <PageHeaderLayout>
        <Row>
          <Col style={{ padding: 20, background: '#fff' }} span={7}>
            <div>
              <div className={styles.search}>
                <Input placeholder="请输入关键词" className={styles.input} />
                <Button type="primary" icon="search" />
              </div>
              <div>
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
          </Col>
          <Col style={{ padding: 20, background: '#fff' }} span={16} offset={1}>
            <div className={styles.form}>
              <Input placeholder="发布名称" style={{ width: 120, marginRight: 20 }} />
              <Select
                style={{ marginRight: 20, width: 120 }}
                onChange={this.handleSelectChangejg}
                value={selectJg}
                >
                {selectData}
              </Select>
              {isNodeOperator && (
                <Select
                  style={{ marginRight: 20, width: 120 }}
                  onChange={this.handleSelectChangedy}
                  value={selectDy}
                  >
                  {selectData1}
                </Select>
              )}
              <RangePicker style={{ marginRight: 20, width: 200 }} />
              {/* <DatePicker style={{marginRight:20,width:250}} placeholder="发布时间"/> */}
              <Button type="primary">搜索</Button>
            </div>
            <div>
              <Table
                columns={columns}
                dataSource={list}
                pagination={pagination}
                rowKey="id"
                bordered
                />
            </div>
          </Col>
        </Row>
      </PageHeaderLayout>
    )
  }
}
