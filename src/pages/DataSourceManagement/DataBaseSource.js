/*
 * @Author: 樊丽园
 * @Date: 2018-07-19 17:59:46
 * @Last Modified by: ChouEric
 * @Last Modified time: 2018-10-08 11:51:52
 * @Description: 添加 文本换行省略号组件并和tooltip兼容,可以设置截取后缀,以及链接; 组件地址: https://github.com/ShinyChang/React-Text-Truncate
 */
import React, { Component } from 'react'
import { Card, Row, Col, Button, Divider, Table, Tooltip } from 'antd'
import moment from 'moment'
import TextTruncate from 'react-text-truncate'
import { connect } from 'dva'
import { routerRedux } from 'dva/router'
import Cookies from 'js-cookie'

import styles from './DataBaseSource.less'
import PageHeaderLayout from '@/components/PageHeaderWrapper'

@connect(({ sourceManagement, loading }) => ({
  sourceManagement,
  loading: loading.models.sourceManagement,
}))
export default class DataBaseSource extends Component {
  state = {
    view: false,
    agency: true,
    showRow: 0,
    isNodeOperator: false,
  }

  componentDidMount() {
    this.setState({
      isNodeOperator: Cookies.get('antd-pro-authority') === 'operator-n',
    })
    const { state: { mountResourceId } = {} } = this.props.history.location
    this.props.dispatch({
      type: 'sourceManagement/getDBInfo',
      payload: {
        params: {
          id: mountResourceId,
          // id: '1045224063732592641db31',
        },
      },
    })
  }

  handleBack = () => {
    // const { dispatch } = this.props
    // dispatch(routerRedux.push('/dataSourceManagement/sourceManagement'))
    this.props.history.go(-1)
  }

  handleView = row => {
    this.setState({
      view: true,
      agency: false,
      showRow: row.id,
    })
  }

  handleAgency = row => {
    this.setState({
      view: false,
      agency: true,
      showRow: row.id,
    })
  }

  handleExport = () => {
    const { dispatch } = this.props
    dispatch(routerRedux.push('/dataSourceManagement/exports'))
  }

  render() {
    const { view, agency, showRow, isNodeOperator } = this.state
    const { sourceManagement: { DBInfo: { name, updataTime ,value: { tableName, resourceType, appsysName, dutyName, dutyPhone, dutyPosition, dbName, dbDescribe, deptName, structAddDtoList = [] } = {} } }, loading } = this.props
    structAddDtoList.forEach((item,index) => item.index = index+1) // eslint-disable-line
    const that = this
    // const pagination = {
    //   current: 1,
    //   pageSize: 10,
    // }
    // const rowSelection = {
    //   onChange: () => {},
    // }
    const columns = [
      // {
      //   title: '序号',
      //   dataIndex: 'id',
      // },
      {
        title: '表名称',
        dataIndex: 'tableName',
      },
      {
        title: '中文标注',
        dataIndex: 'chineseLabel',
      },
      {
        title: '操作',
        render(text, row) {
          return (
            <div>
              {/* <span
                className={styles.clickBtn}
                onClick={() => that.handleView(row)}
                style={view && row.id === showRow ? { cursor: 'default', color: 'silver' } : {}}
                >
                浏览
              </span> */}
              <span
                className={styles.clickBtn}
                onClick={() => that.handleAgency(row)}
                style={agency && row.id === showRow ? { cursor: 'default', color: 'silver' } : {}}
                >
                结构
              </span>
            </div>
          )
        },
      },
    ]
    columns.forEach(item => {
      if(!item.align) {
        item.align = 'center'
      }
    })
    const list = [
      {
        id: 0,
        tableName: dbName,
        chineseLabel: dbDescribe,
      },
    ]
    const columns1 = [
      {
        title: '序号',
        dataIndex: 'id',
      },
      {
        title: 'blog_id',
        dataIndex: 'blog_id',
      },
      {
        title: 'public',
        dataIndex: 'public',
      },
      {
        title: 'last_updated',
        dataIndex: 'last_updated',
        render(text) {
          return moment(text).format('lll')
        },
      },
      {
        title: 'post_title',
        dataIndex: 'post_title',
      },
      {
        title: 'post_content',
        dataIndex: 'post_content',
        render(text) {
          return (
            <Tooltip title={text}>
              <TextTruncate
                line={1}
                truncateText="..."
                textTruncateChild={<a href="#">read more</a>}
                text={text}
                />
            </Tooltip>
          )
        },
        width: 250,
      },
    ]
    const list1 = [
      {
        id: 0,
        blog_id: 1,
        public: 1,
        last_updated: 21111277,
        post_title: 'Hello World!',
        post_content:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean euismod bibendum laoreet. Proin gravidaLorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean euismod bibendum laoreet. Proin gravidaLorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean euismod bibendum laoreet. Proin gravidaLorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean euismod bibendum laoreet. Proin gravidaLorem ipsum dolor sit amet, consectetur adipiscing elit.',
      },
      {
        id: 1,
        blog_id: 2,
        public: 2,
        last_updated: 21111277,
        post_title: 'Hello World!',
        post_content:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean euismod bibendum laoreet. Proin gravida…',
      },
      {
        id: 2,
        blog_id: 2,
        public: 2,
        last_updated: 21111277,
        post_title: 'Hello World!',
        post_content:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean euismod bibendum laoreet. Proin gravida…',
      },
    ]
    const columns2 = [
      {
        title: '序号',
        dataIndex: 'index',
      },
      {
        title: '主键',
        dataIndex: 'primaryKey',
        render: (text) => {
          if (text) {
            return '是'
          }
        },
      },
      {
        title: '字段名称',
        dataIndex: 'columnName',
      },
      {
        title: '数据类型',
        dataIndex: 'columnType',
      },
      {
        title: '中文标注',
        dataIndex: 'note',
      },
    ]
    columns2.forEach(item => {
      if (!item.align) {
        item.align = 'center'
      }
    })
    return (
      <PageHeaderLayout>
        <div className="btncls clearfix">
          <Button onClick={this.handleBack} className="fr mr40">
            返回
          </Button>
          { isNodeOperator &&
            (
            <Button onClick={this.handleExport} className="fr mr40">
            导出
            </Button>
          )}
        </div>
        <Card loading={loading}>
          {/* <Row>
            <Col span={4}>
              <h2>
                数据库
                <span>Youedata_dig</span>
              </h2>
            </Col>
            <Col span={4}>
              <h3>
                数据类型
                <span>Mysql</span>
              </h3>
            </Col>
            <Col span={4}>
              <h3>
                资源名称
                <span>城市低保标准表</span>
              </h3>
            </Col>
            <Col span={4}>
              <h3>
                所属机构
                <span>石家庄市民政局</span>
              </h3>
            </Col>
            <Col span={8}>
              <h3>
                数据更新时间
                <span>2018-06-20 15:08:08</span>
              </h3>
            </Col>
          </Row> */}
          <ul className={styles.title}>
            <li className={styles.item}>
              <h2>
                <span className={styles.label}>数据库</span>
                <span>{tableName}</span>
              </h2>
            </li>
            <li className={styles.item}>
              <span className={styles.label}>数据类型</span>
              <span>{resourceType}</span>
            </li>
            <li className={styles.item}>
              <span className={styles.label}>资源名称</span>
              <span>{name}</span>
            </li>
            <li className={styles.item}>
              <span className={styles.label}>所属机构</span>
              <span>{deptName}</span>
            </li>
            <li className={styles.item}>
              <span className={styles.label}>数据更新时间</span>
              <span>{updataTime}</span>
            </li>
            <li className={styles.item}>
              <span className={styles.label}>应用系统名称</span>
              <span>{appsysName}</span>
            </li>
            <li className={styles.item}>
              <span className={styles.label}>负责人姓名</span>
              <span>{dutyName}</span>
            </li>
            <li className={styles.item}>
              <span className={styles.label}>负责人手机号</span>
              <span>{dutyPhone}</span>
            </li>
            <li className={styles.item}>
              <span className={styles.label}>负责人职位</span>
              <span>{dutyPosition}</span>
            </li>
          </ul>
          <Divider />
          <Row>
            <Col span={24}>
              <h3>
                数据表
              </h3>
              <Table
                columns={columns}
                dataSource={list}
                // pagination={pagination && {...pagination, showQuickJumper: true, showTotal: (total) => `共 ${Math.ceil(total / pagination.pageSize)}页 / ${total}条 数据`}}
                pagination={false}
                // rowSelection={rowSelection}
                rowKey="id"
                bordered
                />
            </Col>
            {view && (
              <Col span={24}>
                <h3 className='mt16'>
                  数据 共<span className={styles.spe}>32</span>行
                </h3>
                <Table
                  columns={columns1}
                  dataSource={list1}
                  // pagination={pagination && {...pagination, showQuickJumper: true, showTotal: (total) => `共 ${Math.ceil(total / pagination.pageSize)}页 / ${total}条 数据`}}
                  // rowSelection={rowSelection}
                  rowKey="id"
                  bordered
                  />
              </Col>
            )}
            {agency && (
              <Col span={24}>
                <h3 className='mt16'>
                  数据项 共<span className={styles.spe}>{structAddDtoList.length}</span>行
                </h3>
                <Table
                  columns={columns2}
                  dataSource={structAddDtoList}
                  // pagination={pagination && {...pagination, showQuickJumper: true, showTotal: (total) => `共 ${Math.ceil(total / pagination.pageSize)}页 / ${total}条 数据`}}
                  // rowSelection={rowSelection}
                  pagination={false}
                  rowKey="index"
                  bordered
                  />
              </Col>
            )}
          </Row>
        </Card>
      </PageHeaderLayout>
    )
  }
}
