/*
 * @Author: ChouEric
 * @Date: 2018-07-05 17:20:24
 * @Last Modified by: ChouEric
 * @Last Modified time: 2018-07-05 18:25:59
*/
import React, { PureComponent, Fragment } from 'react'
import { Table, Button, Input, message, Popconfirm, Divider } from 'antd'

import styles from './index.less'

export default class TableForm extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      data: props.value,
      loading: false,
    }
    this.cacheOriginData = {}
    this.index = 0
  }

  getRowByKey(key, newData) {
    return (newData || this.state.data).filter(item => item.key === key)[0];
  }

  handleFieldChang = (e, dataIndex, key) => {
    const newData = JSON.parse(JSON.stringify(this.state.data))
    const row = this.getRowByKey(key, newData)
    row[dataIndex] = e.target.value
    this.setState({
      data: newData,
    })
  }

  toggleEditable = (e, key) => {
    e.preventDefault();
    const newData = JSON.parse(JSON.stringify(this.state.data))
    const target = this.getRowByKey(key, newData);
    if (target) {
      // 进入编辑状态时保存原始数据
      if (!target.editable) {
        this.cacheOriginData[key] = { ...target };
      }
      target.editable = !target.editable;
      this.setState({ data: newData });
    }
  }

  render() {

    const columns = [
      {
        title: '信息项编码',
        dataIndex: 'infoCode',
        key: 'infoCode',
        render: (text, row) => {
          if (row.editable) {
            return (
              <Input
                value={text}
                autoFocus
                onChange={e => this.handleFieldChang(e, 'infoCode', row.key)}
              />
            )
          }
          return text
        },
      },
      {
        title: '信息项 名称',
        dataIndex: 'infoName',
        key: 'infoName',
        render: (text, row) => {
          if (row.editable) {
            return (
              <Input
                value={text}
                autoFocus
                onChange={e => this.handleFieldChang(e, 'infoName', row.key)}
              />
            )
          }
          return text
        },
      },
      {
        title: '数据类型',
        dataIndex: 'dataType',
        key: 'dataType',
        render: (text, row) => {
          if (row.editable) {
            return (
              <Input
                value={text}
                autoFocus
                onChange={e => this.handleFieldChang(e, 'dataType', row.key)}
              />
            )
          }
          return text
        },
      },
      {
        title: '数据长度',
        dataIndex: 'dataLength',
        key: 'dataLength',
        render: (text, row) => {
          if (row.editable) {
            return (
              <Input
                value={text}
                autoFocus
                onChange={e => this.handleFieldChang(e, 'dataLength', row.key)}
              />
            )
          }
          return text
        },
      },
      {
        title: '共享类型',
        dataIndex: 'shareType',
        key: 'shareType',
        render: (text, row) => {
          if (row.editable) {
            return (
              <Input
                value={text}
                autoFocus
                onChange={e => this.handleFieldChang(e, 'shareType', row.key)}
              />
            )
          }
          return text
        },
      },
      {
        title: '共享条件',
        dataIndex: 'shareCondition',
        key: 'shareCondition',
        render: (text, row) => {
          if (row.editable) {
            return (
              <Input
                value={text}
                autoFocus
                onChange={e => this.handleFieldChang(e, 'shareCondition', row.key)}
              />
            )
          }
          return text
        },
      },
      {
        title: '共享方式分类',
        dataIndex: 'shareMethodClassify',
        key: 'shareMethodClassify',
        render: (text, row) => {
          if (row.editable) {
            return (
              <Input
                value={text}
                autoFocus
                onChange={e => this.handleFieldChang(e, 'shareMethodClassify', row.key)}
              />
            )
          }
          return text
        },
      },
      {
        title: '共享方式类型',
        dataIndex: 'shareMethodType',
        key: 'shareMethodType',
        render: (text, row) => {
          if (row.editable) {
            return (
              <Input
                value={text}
                autoFocus
                onChange={e => this.handleFieldChang(e, 'shareMethodType', row.key)}
              />
            )
          }
          return text
        },
      },
      {
        title: '开放类型',
        dataIndex: 'openType',
        key: 'openType',
        render: (text, row) => {
          if (row.editable) {
            return (
              <Input
                value={text}
                autoFocus
                onChange={e => this.handleFieldChang(e, 'openType', row.key)}
              />
            )
          }
          return text
        },
      },
      {
        title: '开放条件',
        dataIndex: 'openCondition',
        key: 'openCondition',
        render: (text, row) => {
          if (row.editable) {
            return (
              <Input
                value={text}
                onChange={e => this.handleFieldChang(e, 'openCondition', row.key)}
              />
            )
          }
          return text
        },
      },
      {
        title: '操作',
        dataIndex: 'operation',
        key: 'operation',
        render: (text, row) => {
          if (row.editable) {
            if (row.isNew) {
              return (
                <span>
                  <a onClick={e => this.saveRow(e, row.key)}>添加</a>
                  <Divider type="vertical" />
                  <Popconfirm title="是否要删除此行？" onConfirm={() => this.remove(row.key)}>
                    <a>删除</a>
                  </Popconfirm>
                </span>
              )
            }
            return (
              <span>
                <a onClick={e => this.saveRow(e, row.key)}>保存</a>
                <Divider type="vertical" />
                <a onClick={e => this.cancel(e, row.key)}>取消</a>
              </span>
            )
          }
          return (
            <span>
              <a onClick={e => this.toggleEditable(e, row.key)}>编辑</a>
              <Divider type="vertical" />
              <Popconfirm title="是否要删除此行？" onConfirm={() => this.remove(row.key)}>
                <a>删除</a>
              </Popconfirm>
            </span>
          )
        },
      },
    ]
    columns.forEach(item => {
      item.align = 'center'
      item.width = '9%'
    })

    return (
      <Fragment>
        <Table
          columns={columns}
          dataSource={this.state.data}
          loading={this.state.loading}
          bordered
          rowKey='infoCode'
        />
        <Button>上一步</Button>
        <Button>提交</Button>
      </Fragment>
    )
  }
}
