import React, { Component } from 'react'
import { connect } from 'dva'
import { Table, Button, Input, Select, Card, Row, Col } from 'antd'
// import { Link, routerRedux } from 'dva/router'

import styles from './ViewDirectory.less'
import PageHeaderLayout from '@/components/PageHeaderWrapper'

const { Option } = Select
@connect(({ catalogManagement, loading }) => ({
  catalogManagement,
  loading: loading.models.catalogManagement,
}))
export default class ViewDirectory extends Component {
  state = {
    queryData: {},
    isChanged: false,
  }

  componentDidMount() {
    const { state: {resourceId} = {} } = this.props.history.location
    this.props.dispatch({
      type: 'catalogManagement/getCatalogInfo',
      payload: {
        params: {
          index: '1',
          limit: '10',
          resourceId,
        },
      },
    })
    this.props.dispatch({
      type: 'catalogManagement/getResourceTitle',
      payload: {
        params: {
          resourceId,
        },
      },
    })
  }

  codeChange = e => {
    const { queryData } = this.state
    this.setState({
      queryData: {
        ...queryData,
        resourceItemCode: e.target.value.trim(),
      },
      isChanged: true,
    })
  }

  nameChange = e => {
    const { queryData } = this.state
    this.setState({
      queryData: {
        ...queryData,
        resourceItemName: e.target.value.trim(),
      },
      isChanged: true,
    })
  }


  selectDataTypeChange = val => {
    const { queryData } = this.state
    this.setState({
      queryData: {
        ...queryData,
        shareType:val === '-1'?undefined:val,
      },
      isChanged: true,
    })
  }

  selectNodeChange = val => {
    const { queryData } = this.state
    this.setState({
      queryData: {
        ...queryData,
        disparkType:val === '-1'?undefined:val,
      },
      isChanged: true,
    })
  }

  handelSearch = ({pageSize: limit = '10', current: index = '1'}, params) => {
    const { isChanged } = this.state
    if (!isChanged && params) {
      return null
    }
    const { queryData: { resourceItemCode, resourceItemName, shareType, disparkType } } = this.state
    this.props.dispatch({
      type: 'catalogManagement/getCatalogInfo',
      payload: {
        params: {
          resourceId: this.props.history.location.state.resourceId,
          resourceItemCode,
          resourceItemName,
          shareType,
          disparkType,
          limit,
          index,
        },
      },
    })
    this.setState({
      isChanged: false,
    })
  }

  tableChange = pagination => {
    this.handelSearch(pagination)
  }

  render() {
    const { catalogManagement: { catalogInfo, pagination1, resourceTitle }, loading } = this.props
    const data = [
      { value: '-1', id: -1, label: '全部共享类型' },
      { value: '1', id: 1, label: '有条件共享' },
      { value: '2', id: 2, label: '无条件共享' },
      { value: '3', id: 3, label: '不予共享' },
    ]
    const selectData = data.map(item => {
      return (
        <Option value={item.value} key={item.id} title={item.label}>
          {item.label}
        </Option>
      )
    })
    const data1 = [
      { value: '-1', id: -1, label: '全部开放类型' },
      { value: '2', id: 2, label: '无条件开放' },
      { value: '1', id: 1, label: '有条件开放' },
      { value: '3', id: 3, label: '不予开放' },
    ]
    const selectData1 = data1.map(item => {
      return (
        <Option value={item.value} key={item.id} title={item.label}>
          {item.label}
        </Option>
      )
    })
    const columns = [
      {
        title: '信息项编码',
        dataIndex: 'resourceItemCode',
      },
      {
        title: '信息项名称',
        dataIndex: 'resourceItemName',
      },
      {
        title: '数据类型',
        dataIndex: 'resourceType',
      },
      {
        title: '数据长度',
        dataIndex: 'resourceLength',
      },
      {
        title: '共享类型',
        dataIndex: 'shareTypeName',
      },
      {
        title: '共享条件',
        dataIndex: 'shareCondition',
      },
      {
        title: '共享方式分类',
        dataIndex: 'shareWayClassifyName',
      },
      {
        title: '共享方式类型',
        dataIndex: 'shareWayTypeName',
      },
      {
        title: '开放类型',
        dataIndex: 'disparkTypeName',
      },
      {
        title: '开放条件',
        dataIndex: 'disparkCondition',
      },
    ]
    columns.forEach(item => {
      item.align = 'center'
    })
    return (
      <PageHeaderLayout>
        <div className="btncls">
          {/* <Link to="/dataSourceManagement/sourceManagement" className="fr mr40">
            <Button>返回</Button>
          </Link> */}
          <Button className='fr mr40' onClick={() => this.props.history.go(-1)}>返回</Button>
        </div>
        <div>
          <Card className={styles.InfoBlock}>
            <Row style={{ marginBottom: 10 }}>
              <Col span={6}>
                名称: <span>{resourceTitle.resourceName}</span>
              </Col>
              <Col span={6}>
                分类: <span>{resourceTitle.dataType}</span>
              </Col>
              <Col span={6}>
                信息资源代码: <span>{resourceTitle.resourceCode}</span>
              </Col>
              <Col span={6}>
                信息资源格式: <span>{resourceTitle.resourceFormatClassify}</span>
              </Col>
            </Row>
            <Row style={{ marginBottom: 10 }}>
              <Col span={6}>
                提供方名称: <span>{resourceTitle.resourceProviderName}</span>
              </Col>
              <Col span={6}>
                提供方内部部门: <span>{resourceTitle.resourceProviderDepartment}</span>
              </Col>
              <Col span={6}>
                资源提供方代码: <span>{resourceTitle.resourceProviderCode}</span>
              </Col>
            </Row>
            <Row style={{ marginBottom: 10 }}>
              <Col span={24}>
                摘要: <span>{resourceTitle.resourceAbstract}</span>
              </Col>
            </Row>
            {/* <Row>
              <Col span={24}>
                <span className={styles.labels}>标签:</span>
                <Tag>标签1</Tag>
                <Tag>标签2</Tag>
                <Tag>标签3</Tag>
                <Tag>标签4</Tag>
                <Tag>标签5</Tag>
                <Tag>标签6</Tag>
              </Col>
            </Row> */}
          </Card>
          <div className={styles.table}>
            <div className={styles.form}>
              <Input placeholder="信息项编码" style={{ width: 150, marginRight: 20 }} onChange={this.codeChange} />
              <Input placeholder="信息项名称" style={{ width: 150, marginRight: 20 }} onChange={this.nameChange} />
              <Select
                style={{ marginRight: 20, width: 120 }}
                defaultValue='-1'
                onChange={this.selectDataTypeChange}
                >
                {selectData}
              </Select>
              <Select
                style={{ marginRight: 20, width: 120 }}
                defaultValue='-1'
                onChange={this.selectNodeChange}
                >
                {selectData1}
              </Select>
              <Button type="primary" onClick={() => this.handelSearch({}, true)}>搜索</Button>
            </div>
            <div>
              <Table
                loading={loading}
                columns={columns}
                dataSource={catalogInfo}
                pagination={pagination1 && {...pagination1, showQuickJumper: true, showTotal: (total) => `共 ${Math.ceil(total / pagination1.pageSize)}页 / ${total}条 数据`}}
                rowKey="itemId"
                onChange={this.tableChange}
                bordered
                />
            </div>
          </div>
        </div>
      </PageHeaderLayout>
    )
  }
}
