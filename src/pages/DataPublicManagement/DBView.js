import React, { Component, Fragment } from 'react'
import { Table, Icon, Alert, Button, Card } from 'antd'
import { connect } from 'dva'

import PageHeaderWrapper from '@/components/PageHeaderWrapper'
import DataBaseInfo from '@/components/DataBaseInfo'

@connect(({ dbView }) => ({
  dbView,
}))
class DBView extends Component {

  state = {
    page: 1,
  }

  componentDidMount() {
    const { dispatch, match } = this.props
    dispatch({
      type: 'dbView/getReqBeanEntityInfo',
      payload: {
        id: match.params.id,
      },
    })
  }

  componentWillUnmount() {
    const { dispatch } = this.props
    dispatch({
      type: 'dbView/reset',
    })
  }

  changePage = (page) => {
    this.setState({
      page,
    })
  };

  back() {
    const { history } = this.props
    history.goBack()
  }

  render() {
    let currentDetail
    let currentList = []
    let currentDetailTable
    let dataBaseInfo
    const {
        dbView: { entityInfo },
        } = this.props
    const keyArr = Object.keys(entityInfo)
    if (keyArr.length > 0) {
      currentDetail = entityInfo.value
      currentList = currentDetail.structEntityCollection
      currentDetailTable = [
        {
          tableName: currentDetail.tableName,
          tableNote: currentDetail.tableNote,
        },
      ]
      const {
          dbName,
          name,
          updateTime,
          datasourceEntity,
          createUnit,
          appsysName,
          dutyName,
          dutyPhone,
          dutyPosition,
          describe,
          } = entityInfo.value
      dataBaseInfo = {
        dataBaseName: dbName,
        dataBaseType: datasourceEntity.type,
        dataName: name,
        updateTime,
        createUnit,
        appsysName,
        dutyName,
        dutyPhone,
        dutyPosition,
        describe,
      }
    }
    const tableColumn = [
      {
        title: '序号',
        dataIndex: 'index',
        align: 'center',
        render: () => 1,
      },
      {
        title: '表名称',
        dataIndex: 'tableName',
        align: 'center',
      },
      {
        title: '中文标注',
        dataIndex: 'tableNote',
        align: 'center',
      },
    ]
    const structColumn = [
      {
        title: '序号',
        dataIndex: 'index',
        render: (text, record, index) => {
          const { page } = this.state
          return `${index + 1 + (page - 1) * 10}`
        },
      },
      {
        title: '主键',
        dataIndex: 'primaryKey',
        render: text => {
          if (text) {
            return <Icon style={{ color: '#fb9a03' }} type="key" theme="outlined" />
          }
          return ''
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
    const paginationProps = {
      showQuickJumper: true,
      total: currentList.length,
      onChange: this.changePage,
      pageSize: 10,
      showTotal() {
        return `共${Math.ceil(currentList.length / 10)}页 / ${currentList.length}条数据`
      },
    }
    const buttonList = (
      <div
        style={{ position: 'absolute', top: 0, right: 0 }}
        >
        <Button type="primary" onClick={() => this.back()}>
          返回
        </Button>
      </div>
    )
    return (
      <PageHeaderWrapper action={buttonList}>
        <Card bordered={false}>
          <Fragment>
            {keyArr.length === 0 && (
              <Alert
                message="页面正努力加载中......"
                style={{ marginBottom: 20 }}
                type="info"
                showIcon
                />
            )}
            {keyArr.length > 0 && (
              <Fragment>
                <DataBaseInfo dataBaseInfo={dataBaseInfo} />
                <Table
                  bordered
                  pagination={false}
                  dataSource={currentDetailTable}
                  className="mt16"
                  columns={tableColumn}
                  rowKey="tableName"
                  />
                <Table
                  bordered
                  pagination={paginationProps}
                  dataSource={currentList}
                  columns={structColumn}
                  className="mt16"
                  rowKey="id"
                  />
              </Fragment>
            )}
          </Fragment>
        </Card>
      </PageHeaderWrapper>
    )
  }
}
export default DBView
