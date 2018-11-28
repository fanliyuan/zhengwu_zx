import React, { Component, Fragment } from 'react'
import { Table, Alert, Button, Card } from 'antd'
import { connect } from 'dva'

import PageHeaderWrapper from '@/components/PageHeaderWrapper'
import DataBaseInfo from '@/components/DataFileInfo'

@connect(({ dbView }) => ({
  dbView,
}))
class DBView extends Component {

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

  back() {
    const { history } = this.props
    history.goBack()
  }

  render() {
    let currentDetail
    let currentList = []
    let dataBaseInfo
    const {
        dbView: { entityInfo },
        } = this.props
    const keyArr = Object.keys(entityInfo)
    if (keyArr.length > 0) {
      currentDetail = entityInfo.value
      currentList = currentDetail.ftpfileEntityCollection
      const {
          name,
          createUnit,
          dutyName,
          dutyPhone,
          dutyPosition,
          describe,
          } = entityInfo.value
      dataBaseInfo = {
        dataType: currentDetail.datasourceEntity.type,
        name,
        createUnit,
        dutyName,
        dutyPhone,
        dutyPosition,
        describe,
      }
    }
    const tableColumn = [
      {
        title: '文件名称',
        dataIndex: 'name',
      },
      {
        title: '文件类型',
        dataIndex: 'type',
      },
      {
        title: '文件相对路径',
        dataIndex: 'path',
      },
    ]
    const paginationProps = {
      showQuickJumper: true,
      total: currentList.length,
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
                  pagination={paginationProps}
                  dataSource={currentList}
                  className="mt16"
                  columns={tableColumn}
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
