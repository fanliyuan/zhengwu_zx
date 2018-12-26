import React, { Component } from 'react'
import { connect } from 'dva'
import { Button, Select, Card, Row, Col } from 'antd'
import { Bind, Throttle } from 'lodash-decorators'
// import { Link, routerRedux } from 'dva/router'

import styles from './ViewDirectory.less'
import PageHeaderLayout from '@/components/PageHeaderWrapper'
import SearchForm from '@/components/SearchForm'
import StandardTable from '@/components/StandardTable'

const { Option } = Select
@connect(({ catalogManagement, loading }) => ({
  catalogManagement,
  loading: loading.models.catalogManagement,
}))
export default class ViewDirectory extends Component {

  formOptions = {
    formData: [
      {
        name: 'resourceItemName',
        typeOptions: {
          maxLength: 50,
          placeholder: '信息项名称',
        },
      },
      // {
      //   name: 'resourceDataType',
      //   type:'Select',
      //   typeOptions: {
      //     placeholder: '数据类型',
      //   },
      //   children: [{ value: 'all', id: -1, label: '全部数据类型' }, { value: '字符型C', id: 1, label: '字符型C' }, { value: '数值型N', id: 2, label: '数值型N' },{ value: '货币型Y', id: 3, label: '货币型Y' }, { value: '日期型D', id: 4, label: '日期型D' }, { value: '日期型D', id: 5, label: '日期型D' },{ value: '日期型D', id: 6, label: '' }].map(item => <Option value={item.value} key={item.value} title={item.label}>{item.label}</Option>),
      // },
      {
        name: 'shareType',
        type: 'Select',
        typeOptions: {
          placeholder: '共享类型',
        },
        children: [{ value: 'all', id: -1, label: '全部共享类型' }, { value: '无条件共享', id: 2, label: '无条件共享' }, { value: '有条件共享', id: 1, label: '有条件共享' }].map(item => <Option value={item.value} key={item.value} title={item.label}>{item.label}</Option>),
      },
    ],
    searchHandler: this.handleSearch,
    resetHandler: this.handleReset,
  }

  state = {
    queryData: {},
    pagination: {limit: 10, index: 1},
  }

  componentDidMount() {
    const { state: {resourceId} = {} } = this.props.history.location
    this.handleSearch()
    this.props.dispatch({
      type: 'catalogManagement/getResourceTitle',
      payload: {
        params: {
          resourceId,
        },
      },
    })
  }

  tableChange = (pagination) => {
    this.setState({
      pagination: {
        limit: pagination.pageSize,
        index: pagination.current,
      },
    }, () => {
      const { queryData } = this.state
      this.handleSearch(queryData)
    })
  }

  handleReset = () => {
    console.log('需要重置分页到1页') // eslint-disable-line
  }

  @Bind()
  @Throttle(1000, { trailing: false })
  handleSearch(queryData = {}, resetPage = false) {
    const pagination = resetPage ? { limit: 10, index: 1 } : this.state.pagination
    const { state: { resourceId } = {} } = this.props.history.location
    this.setState({ queryData: { ...queryData } })
    const { dispatch } = this.props
    if (queryData.shareType === 'all') delete queryData.shareType
    dispatch({
      type: 'catalogManagement/getCatalogInfo',
      payload: {
        params: {
          resourceId,
          ...pagination,
          ...queryData,
        },
      },
    })
    // this.props.dispatch({
    //   type: 'catalogManagement/getCatalogInfo',
    //   payload: {
    //     params: {
    //       index: '1',
    //       limit: '10',
    //       resourceId,
    //     },
    //   },
    // })
  }

  render() {
    const { catalogManagement: { catalogInfo, pagination2, resourceTitle }, loading } = this.props
    const columns = [
      // {
      //   title: '信息项编码',
      //   dataIndex: 'resourceItemCode',
      // },
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
        dataIndex: 'shareType',
      },
      {
        title: '共享条件',
        dataIndex: 'shareCondition',
      },
      {
        title: '共享方式',
        dataIndex: 'shareWayType',
      },
      {
        title: '是否开放',
        dataIndex: 'disparkType',
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
              <Col span={24}><h2>核心元数据</h2></Col>
              <Col span={6}>
                信息资源代码: <span>{resourceTitle.resourceCode || '暂无'}</span>
              </Col>
              <Col span={6}>
                信息资源名称: <span>{resourceTitle.resourceName || '暂无'}</span>
              </Col>
              <Col span={12}>
                信息资源属性分类: <span>{resourceTitle.resourceProjectCatalogType || '暂无'}</span>
              </Col>
              {/* <Col span={8}>
                分类: <span>{resourceTitle.dataType || '暂无'}</span>
              </Col> */}
              {/* <Col span={8}>
                信息资源格式: <span>{resourceTitle.resourceFormatClassify || '暂无'}</span>
              </Col> */}
            </Row>
            <Row style={{ marginBottom: 10 }}>
              <Col span={6}>
                提供方名称: <span>{resourceTitle.resourceProviderName || '暂无'}</span>
              </Col>
              <Col span={6}>
                提供方代码: <span>{resourceTitle.resourceProviderCode || '暂无'}</span>
              </Col>
              <Col span={12}>
                提供方内部部门: <span>{resourceTitle.resourceProviderDepartment || '暂无'}</span>
              </Col>
            </Row>
            <Row style={{ marginBottom: 10 }}>
              <Col span={6}>
                更新周期: <span>{resourceTitle.resourceUpdateCycle || '暂无'}</span>
              </Col>
              <Col span={6}>
                发布日期: <span>{resourceTitle.createTime || '暂无'}</span>
              </Col>
              <Col span={12}>
                共享日期: <span>{resourceTitle.shareTime || '暂无'}</span>
              </Col>
            </Row>
            <Row style={{ marginBottom: 10 }}>
              <Col span={6}>
                信息资源格式: <span>{resourceTitle.resourceFormatClassify || '暂无'}</span>
              </Col>
              <Col span={6}>
                关联资源代码: <span>{resourceTitle.relateCode || '暂无'}</span>
              </Col>
              <Col span={12}>
                信息项: <span>{resourceTitle.itemNum || '暂无'}</span>
              </Col>
            </Row>
            <Row style={{ marginBottom: 10 }}>
              <Col span={24}>
                摘要: <span>{resourceTitle.resourceAbstract || '暂无'}</span>
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
            <SearchForm formOptions={this.formOptions} />
            <div>
              <StandardTable
                loading={loading}
                columns={columns}
                dataSource={catalogInfo}
                pagination={pagination2}
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
