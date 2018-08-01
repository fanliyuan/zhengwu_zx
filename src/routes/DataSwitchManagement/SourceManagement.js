import React, { Component } from 'react'
import { Table, Card, Tabs, Input, DatePicker, Row, Col, Button, Modal, Tooltip, Tree, Icon, Cascader } from 'antd'
import moment from 'moment'
import { connect } from 'dva'
import { routerRedux } from 'dva/router'
import { isArray } from 'util'

import styles from './SourceManagement.less'
import PageHeaderLayout from '../../layouts/PageHeaderLayout'

const { TabPane } = Tabs
// const { Option } = Select
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
@connect(({ sourceManagement }) => ({
  sourceManagement,
}))
export default class SourceManagement extends Component {
  state = {
    loading: false,
    modalVisible:false,
    // selectJg: '发布机构',
  }

  handleCataLog = () => {
    const { dispatch } = this.props
    dispatch(routerRedux.push('/dataSwitchManagement/viewDirectory'))
  }

  handleSelectChangejg = () => {
    // this.setState({
    //   selectJg: val,
    // })
  }

  handleSource = () => {
    const { dispatch } = this.props
    dispatch(routerRedux.push('/dataSwitchManagement/source'))
  }

  handleSource1 = () => {
    const { dispatch } = this.props
    dispatch(routerRedux.push('/dataSourceManagement/fileSource'))
  }

  handleClassify = () => {
    this.modalShow()
  }

  modalOk = () => {
    this.setState({
      modalVisible:false,
    })
  }

  modalCancel = () => {
    this.setState({
      modalVisible:false,
    })
  }

  modalShow = () => {
    this.setState({
      modalVisible:true,
    })
  }

  render() {
    const that = this
    const { loading, modalVisible } = this.state
    // const data = [{ value: '0', id: 0, label: '机构1' }, { value: '1', id: 1, label: '机构2' }]
    // const selectData = data.map(item => {
    //   return (
    //     <Option value={item.value} key={item.id} title={item.label}>
    //       {item.label}
    //     </Option>
    //   )
    // })
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
            title: '1|-政府',
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
    const columns = [
      {
        title: '序号',
        dataIndex: 'id',
        render(text){
          return (<span><input type="checkbox" style={{marginRight:5}} />{text}</span>)
        },
      },
      {
        title: '订阅名称',
        dataIndex: 'jyName',
      },
      {
        title: '目录名称',
        dataIndex: 'catalog',
      },
      {
        title: '数据条数',
        dataIndex: 'count',
      },
      {
        title: '发布机构',
        dataIndex: 'oweZt',
      },
      // {
      //   title: '存储数据库',
      //   dataIndex: 'storeData',
      // },
      {
        title: '更新时间',
        dataIndex: 'upTime',
        render(text) {
          return moment(text).format('lll')
        },
      },
      {
        title: '操作',
        render() {
          return (
            <div>
              <span className={styles.clickBtn} onClick={that.handleCataLog}>
                目录
              </span>
              <span className={styles.clickBtn} onClick={that.handleSource}>
                资源
              </span>
            </div>
          )
        },
      },
    ]
    const list = [
      {
        id: 0,
        catalog: 'Dtable',
        count: 5000,
        oweZt: '国土数据',
        oweJg: '',
        storeDataL: '',
        upTime: '1323131',
      },
      {
        id: 1,
        catalog: 'Dtable',
        count: 5000,
        oweZt: '国土数据',
        oweJg: '',
        storeDataL: '',
        upTime: '3132141',
      },
    ]
    const columns1 = [
      {
        title: '序号',
        dataIndex: 'id',
        render(text){
          return (<span><input type="checkbox" style={{marginRight:5}} />{text}</span>)
        },
      },
      {
        title: '订阅名称',
        dataIndex: 'jyName',
      },
      {
        title: '目录名称',
        dataIndex: 'catalog',
      },
      {
        title: '数据大小',
        dataIndex: 'dataSize',
      },
      {
        title: '发布机构',
        dataIndex: 'oweZt',
      },
      // {
      //   title: '所属机构',
      //   dataIndex: 'oweJg',
      // },
      {
        title: '存储文件路径',
        dataIndex: 'storeRouter',
      },
      {
        title: '存储文件夹',
        dataIndex: 'storeFile',
      },
      {
        title: '更新时间',
        dataIndex: 'upTime',
        render(text) {
          return moment(text).format('lll')
        },
      },
      {
        title: '操作',
        render() {
          return (
            <div>
              <span className={styles.clickBtn} onClick={that.handleCataLog}>
                目录
              </span>
              <span className={styles.clickBtn} onClick={that.handleSource1}>
                资源
              </span>
            </div>
          )
        },
      },
    ]
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
    const list1 = [
      {
        id: 0,
        catalog: '',
        dataSize: '100M',
        oweZt: '国土数据',
        oweJg: '',
        storeRouter: 'd:/',
        storeFile: 'tuotu',
        upTime: '1323131',
      },
      {
        id: 1,
        catalog: '',
        dataSize: '500M',
        oweZt: '国土数据',
        oweJg: '',
        storeRouter: 'd:/',
        storeFile: 'goutu',
        upTime: '1323131',
      },
    ]
    const pagination = {
      current: 1,
      pageSize: 10,
    }
    // const rowSelection = {
    //   // selectedRowKeys,
    //   onChange: () => {},
    // }
    return (
      <PageHeaderLayout>
        <Card loading={loading}>
          <div>
            <Tabs defaultActiveKey="1">
              <TabPane tab="数据库" key="1">
                <Row style={{ marginBottom: 20 }}>
                  <Col span={3}>
                    <Input placeholder="目录分类" onClick={this.handleClassify} />
                  </Col>
                  <Col span={3} offset={1}>
                    <Input placeholder="订阅名称/目录名称" />
                  </Col>
                  <Col span={3} offset={1}>
                    <Cascader options={options} placeholder="发布机构" style={{ marginRight: 16 }} />
                    {/* <Select
                      style={{ marginRight: 20, width: 120 }}
                      onChange={this.handleSelectChangejg}
                      value={selectJg}
                      >
                      {selectData}
                    </Select> */}
                  </Col>
                  <Col span={4} offset={1}>
                    <RangePicker />
                  </Col>
                  <Col span={2} offset={1}>
                    <Button type="primary">搜素</Button>
                  </Col>
                </Row>
                <div>
                  <Table
                    columns={columns}
                    dataSource={list}
                    pagination={pagination}
                    // rowSelection={rowSelection}
                    rowKey="id"
                    bordered
                    />
                </div>
              </TabPane>
              <TabPane tab="数据文件" key="2">
                <Row style={{ marginBottom: 20 }}>
                  <Col span={3}>
                    <Input placeholder="目录分类" onClick={this.handleClassify} />
                  </Col>
                  <Col span={3} offset={1}>
                    <Input placeholder="订阅名称/目录名称" />
                  </Col>
                  <Col span={3} offset={1}>
                    {/* <Select
                      style={{ marginRight: 20, width: 120 }}
                      onChange={this.handleSelectChangejg}
                      value={selectJg}
                      >
                      {selectData}
                    </Select> */}
                    <Cascader options={options} placeholder="发布机构" style={{ marginRight: 16 }} />
                  </Col>
                  <Col span={4} offset={1}>
                    <RangePicker />
                  </Col>
                  <Col span={2} offset={1}>
                    <Button type="primary">搜素</Button>
                  </Col>
                </Row>
                <div>
                  <Table
                    columns={columns1}
                    dataSource={list1}
                    // rowSelection={rowSelection}
                    pagination={pagination}
                    rowKey="id"
                    bordered
                    />
                </div>
              </TabPane>
            </Tabs>
          </div>
          <Modal
            title="分类"
            visible={modalVisible}
            onOk={this.modalOk}
            onCancel={this.modalCancel}
            >
            {/* <div> */}
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
            {/* </div> */}
          </Modal>
        </Card>
      </PageHeaderLayout>
    )
  }
}
