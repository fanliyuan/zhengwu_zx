/*
 * @Author: ChouEric
 * @Date: 2018-07-05 17:20:24
 * @Last Modified by: ChouEric
 * @Last Modified time: 2018-07-27 11:01:45
*/
import React, { PureComponent, Fragment } from 'react'
import { Table, Button, Input, message, Popconfirm, Divider, Tooltip } from 'antd'

// eslint-disable-next-line
import styles from './index.less'

export default class TableForm extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      data: props.value,
      loading: false,
    }
    // 原始数据的的缓存 -- 其实是每行点击编辑的时候,会把当前行的数据记录下来
    this.cacheOriginData = {}
    this.index = 0
  }

  // 暂时不知道啥用
  // componentWillReceiveProps(nextProps) {
  //   if ('value' in nextProps) {
  //     this.setState({
  //       data: nextProps.value,
  //     });
  //   }
  // }

  getRowByKey(key, newData) {
    return (newData || this.state.data).filter(item => item.key === key)[0]
  }

  // 这里是表格单元格的编辑功能
  handleFieldChang = (e, dataIndex, key) => {
    const newData = JSON.parse(JSON.stringify(this.state.data))
    const row = this.getRowByKey(key, newData)
    if (row) {
      row[dataIndex] = e.target.value
      this.setState({
        data: newData,
      })
    }
  }

  addNew = () => {
    // eslint-disable-next-line
    const newData = this.state.data.map(item => ({ ...item }))
    newData.push({
      key: `NEW_TEMP_ID_${this.index}`,
      infoCode: '',
      editable: true,
      isNew: true,
    })
    this.index += 1
    this.setState({ data: newData })
  }

  toggleEditable = (e, key) => {
    e.preventDefault()
    const newData = JSON.parse(JSON.stringify(this.state.data))
    const target = this.getRowByKey(key, newData)
    if (target) {
      // 进入编辑状态时保存原始数据
      if (!target.editable) {
        this.cacheOriginData[key] = { ...target }
      }
      target.editable = !target.editable
      this.setState({ data: newData })
    }
  }

  saveRow = (e, key) => {
    e.persist()
    this.setState({
      loading: true,
    })
    setTimeout(() => {
      if (this.clickedCancel) {
        this.clickedCancel = false
        return
      }
      const row = this.getRowByKey(key) || {}
      if (!row.infoCode) {
        message.error('信息项编码必填')
        e.target.focus()
        this.setState({
          loading: false,
        })
        return false
      }
      delete row.isNew
      this.toggleEditable(e, key)
      this.props.onChange(this.state.data)
      this.setState({
        loading: false,
      })
    }, 200)
  }

  cancel(e, key) {
    this.clickedCancel = true
    e.preventDefault()
    const newData = this.state.data.map(item => ({ ...item })) // eslint-disable-line
    const target = this.getRowByKey(key, newData)
    if (this.cacheOriginData[key]) {
      Object.assign(target, this.cacheOriginData[key])
      target.editable = false
      delete this.cacheOriginData[key]
    }
    this.setState({ data: newData })
    this.clickedCancel = false
  }

  remove(key) {
    const newData = this.state.data.filter(item => item.key !== key) // eslint-disable-line
    // console.log(newData)
    this.setState({ data: newData })
    this.props.onChange(newData)
  }

  render() {
    const { disabled = false } = this.props

    const columns = [
      {
        title: '信息项编码',
        dataIndex: 'infoCode',
        key: 'infoCode',
        render: (text, row) => {
          if (row.editable) {
            return (
              <Tooltip title={text}>
                <Input
                  value={text}
                  autoFocus
                  onChange={e => this.handleFieldChang(e, 'infoCode', row.key)}
                  />
              </Tooltip>
            )
          }
          return text
        },
      },
      {
        title: '信息项名称',
        dataIndex: 'infoName',
        key: 'infoName',
        render: (text, row) => {
          if (row.editable) {
            return (
              <Tooltip title={text}>
                <Input value={text} onChange={e => this.handleFieldChang(e, 'infoName', row.key)} />
              </Tooltip>
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
              <Tooltip title={text}>
                <Input value={text} onChange={e => this.handleFieldChang(e, 'dataType', row.key)} />
              </Tooltip>
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
              <Tooltip title={text}>
                <Input
                  value={text}
                  onChange={e => this.handleFieldChang(e, 'dataLength', row.key)}
                  />
              </Tooltip>
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
              <Tooltip title={text}>
                <Input
                  value={text}
                  onChange={e => this.handleFieldChang(e, 'shareType', row.key)}
                  />
              </Tooltip>
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
              <Tooltip title={text}>
                <Input
                  value={text}
                  onChange={e => this.handleFieldChang(e, 'shareCondition', row.key)}
                  />
              </Tooltip>
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
              <Tooltip title={text}>
                <Input
                  value={text}
                  onChange={e => this.handleFieldChang(e, 'shareMethodClassify', row.key)}
                  />
              </Tooltip>
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
              <Tooltip title={text}>
                <Input
                  value={text}
                  onChange={e => this.handleFieldChang(e, 'shareMethodType', row.key)}
                  />
              </Tooltip>
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
              <Tooltip title={text}>
                <Input value={text} onChange={e => this.handleFieldChang(e, 'openType', row.key)} />
              </Tooltip>
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
              <Tooltip title={text}>
                <Input
                  value={text}
                  onChange={e => this.handleFieldChang(e, 'openCondition', row.key)}
                  />
              </Tooltip>
            )
          }
          return text
        },
      },
    ]
    if (!disabled) {
      columns.push({
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
      })
    }
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
          pagination={false}
          />
        {!disabled && (
          <Button
            style={{ width: '100%', marginTop: 8, marginBottom: 16 }}
            type="dashed"
            onClick={this.addNew}
            icon="plus"
            >
            新增数据
          </Button>
        )}
      </Fragment>
    )
  }
}
