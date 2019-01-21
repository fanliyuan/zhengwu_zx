import React, { Component } from 'react'
import { Table, Button, Card } from 'antd'
import { connect } from 'dva'
import moment from 'moment'

import PageHeaderWrapper from '@/components/PageHeaderWrapper'
import DataBaseInfo from '@/components/DataFileInfo'
import FilterRowForm from '@/components/FilterRowForm'

import styles from './View.less'

let formValues
let formTime

@connect(({ dbView, loading }) => ({
  dbView,
  loading: loading.models.dbView,
}))
class FtpView extends Component {

  componentDidMount() {
    const { dispatch, match } = this.props
    formValues = {}
    formTime = {}
    dispatch({
      type: 'dbView/getReqBeanEntityInfo',
      payload: {
        id: match.params.id,
      },
    })
    dispatch({
      type: 'dbView/getDataByMog',
      payload: {
        id: match.params.id,
        status: 0,
      },
    })
  }

  componentWillUnmount() {
    const { dispatch } = this.props
    dispatch({
      type: 'dbView/reset',
    })
  }

  handleSearch = (fieldsForm, paramsTime) => {
    const { dispatch, match } = this.props
    formValues = { ...fieldsForm }
    const fields = fieldsForm
    Object.defineProperty(fields, 'date', {
      value: ``,
    })
    formTime = paramsTime
    Object.defineProperty(formTime, 'startTime', {
      value: moment(formTime.startTime).format('YYYY-MM-DD 00:00:00'),
    })
    Object.defineProperty(formTime, 'endTime', {
      value: moment(formTime.endTime).format('YYYY-MM-DD 11:59:59'),
    })
    const values = {
      ...fields,
      ...formTime,
    }
    dispatch({
      type: 'dbView/getDataByMog',
      payload: {
        id: match.params.id,
        status: 0,
        ...values,
      },
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

  renderForm() {
    const actions = {
      handleSearch: this.handleSearch,
    }
    const formData = {
      md: 8,
      lg: 24,
      xl: 48,
      data: [
        {
          key: 1,
          data: [
            {
              prop: 'name',
              label: '文件名称',
              typeOptions: {
                placeholder: '请输入文件名称',
                maxLength: 50,
              },
            },
            {
              type: 'RangePicker',
              prop: 'date',
              label: '更新时间',
            },
          ],
        },
      ],
    }
    const data = {
      ...formValues,
    }
    return <FilterRowForm formData={formData} actions={actions} data={data} />
  }

  render() {
    let currentDetail
    let dataBaseInfo
    const {
        loading,
        dbView: { entityInfo, dataList },
        } = this.props
    const keyArr = Object.keys(entityInfo)
    if (keyArr.length > 0) {
      currentDetail = entityInfo.value
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
        render: text => moment(text).format('YYYY-MM-DD HH:mm:ss'),
      },
    ]
    const paginationProps = {
      showQuickJumper: true,
      total: dataList.total,
      pageSize: 10,
      showTotal(total) {
        return `共${Math.ceil(total / 10)}页 / ${total}条数据`
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
          <DataBaseInfo dataBaseInfo={dataBaseInfo} />
          <div className={styles.tableList}>
            <div className={styles.tableListForm}>{this.renderForm()}</div>
            <Table
              bordered
              pagination={paginationProps}
              dataSource={dataList.data}
              className="mt16"
              columns={tableColumn}
              rowKey="id"
              />
          </div>
        </Card>
      </PageHeaderWrapper>
    )
  }
}
export default FtpView
