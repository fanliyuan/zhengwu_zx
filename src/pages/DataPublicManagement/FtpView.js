import React, { Component, Fragment } from 'react'
import { Table, Button, Card } from 'antd'
import { connect } from 'dva'

import PageHeaderWrapper from '@/components/PageHeaderWrapper'
import DataBaseInfo from '@/components/DataFileInfo'

@connect(({ dbView, loading }) => ({
  dbView,
  loading: loading.models.dbView,
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

  setFileSize = size => {
    if (size === null || size === 0) {
      return '0 Bytes'
    }
    const unitArr = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']
    const srcSize = parseFloat(size)
    const index = Math.floor(Math.log(srcSize) / Math.log(1024))
    let powNum = 1
    for (let i = 0, len = index; i < len; i += 1) {
      powNum *= 1024
    }
    let newSize = srcSize / powNum
    newSize = newSize.toFixed(2)
    return newSize + unitArr[index]
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
        loading,
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
      {
        title: '文件大小',
        dataIndex: 'size',
        render: text => this.setFileSize(parseInt(text, 10)),
      },
      {
        title: '最近更新时间',
        dataIndex: 'time',
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
        <Card bordered={false} loading={loading}>
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
        </Card>
      </PageHeaderWrapper>
    )
  }
}
export default DBView
