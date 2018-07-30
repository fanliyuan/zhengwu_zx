import React, { Component } from 'react'
import { Card, Row, Col, Button, Divider, Table, Input, Form, Select } from 'antd' // Select,  Popconfirm

import PageHeaderLayout from '../../layouts/PageHeaderLayout'
import styles from './SearchRelationship.less'

// const { Option } = Select;
const FormItem = Form.Item
const EditableContext = React.createContext()
const EditableRow = ({ form, index, ...props }) => (
  <EditableContext.Provider value={form}>
    <tr {...props} />
  </EditableContext.Provider>
)
const EditableFormRow = Form.create()(EditableRow)
class EditableCell extends React.Component {
  getInput = () => {
    if (this.props.filedType === 'select') {
      return (
        <Select>
          <Select.Option value={1} key={1}>
            是
          </Select.Option>
          <Select.Option value={0} key={0}>
            否
          </Select.Option>
        </Select>
      )
    }
    return <Input className={styles.input} />
  }

  render() {
    const { editing, dataIndex, title, filedType, record, index, ...restProps } = this.props

    return (
      <EditableContext.Consumer>
        {form => {
          const { getFieldDecorator } = form
          return (
            <td {...restProps}>
              {editing ? (
                <FormItem>
                  {getFieldDecorator(dataIndex, {
                    rules: [
                      {
                        required: true,
                        message: `${title}必填!`,
                      },
                    ],
                    initialValue: record[dataIndex] || 1,
                  })(this.getInput())}
                </FormItem>
              ) : (
                restProps.children
              )}
            </td>
          )
        }}
      </EditableContext.Consumer>
    )
  }
}

export default class SearchRelationship extends Component {
  state = {
    // tableKey:'',
    // fieldKey:'',
    // editingKey:'',
  }

  isEditing = record => {
    return record.key === this.state.editingKey
  }

  render() {
    const components = {
      body: {
        row: EditableFormRow,
        cell: EditableCell,
      },
    }
    // const { tableKey, fieldKey } = this.state;
    const pagination = {
      current: 1,
      pageSize: 10,
    }
    const columns = [
      {
        title: '序号',
        dataIndex: 'id',
      },
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
        render() {
          return (
            <div>
              <a>数据项</a>
            </div>
          )
        },
      },
    ]
    const list = [
      {
        id: 0,
        tableName: 'dig_user',
        chineseLabel: '用户表',
      },
      {
        id: 1,
        tableName: 'dig_order',
        chineseLabel: '订单表',
      },
    ]
    const columns1 = [
      {
        title: '序号',
        dataIndex: 'id',
      },
      {
        title: '主键',
        dataIndex: 'mainKey',
      },
      {
        title: '字段名称',
        dataIndex: 'filedName',
      },
      {
        title: '数据类型',
        dataIndex: 'dataType',
      },
      {
        title: '中文标注',
        dataIndex: 'chineseLabel',
      },
      {
        title: '是否作为检索主键',
        dataIndex: 'isMainKey',
        editable: true,
        isSelect: true,
        width: 96,
      },
      {
        title: '是否作为检索主键',
        dataIndex: 'isQueryKey',
        editable: true,
        isSelect: true,
        width: 96,
      },
      {
        title: '外键所表',
        dataIndex: 'tableKey',
        editable: true,
        width: 157,
      },
      {
        title: '外键对应字段',
        dataIndex: 'fieldKey',
        editable: true,
        width: 157,
      },
    ]
    const columns2 = columns1.map(item => {
      if (!item.editable) {
        return item
      }
      return {
        ...item,
        onCell: record => ({
          record,
          dataIndex: item.dataIndex,
          title: item.title,
          filedType: item.isSelect ? 'select' : 'input',
          editing: this.isEditing(record),
        }),
      }
    })
    const list1 = [
      {
        id: 0,
        chineseLabel: '标注1',
        isMainKey: 1,
      },
      {
        id: 1,
        chineseLabel: '标注2',
        isMainKey: 0,
      },
    ]
    return (
      <PageHeaderLayout>
        <Card className={styles.card}>
          <div style={{ textAlign: 'right' }}>
            <Button type="primary" className="mr8">
              保存
            </Button>
            <Button type="primary">上一步</Button>
          </div>
          <Row>
            <Col span={6}>
              <h3>
                目录编码:
                <span>3300031306381126/00001</span>
              </h3>
            </Col>
            <Col span={4}>
              <h3>
                目录名称
                <span>资产负债表信息</span>
              </h3>
            </Col>
            <Col span={4}>
              <h3>
                提供方
                <span>规划局</span>
              </h3>
            </Col>
            <Col span={6}>
              <h3>
                创建时间
                <span>2018-06-20 15:08:08</span>
              </h3>
            </Col>
          </Row>
          <Divider />
          <Row>
            <Col span={8}>
              <h3>
                数据表 共<span>32</span>张
              </h3>
              <Table
                columns={columns}
                dataSource={list}
                pagination={pagination}
                rowKey="id"
                bordered
                />
            </Col>
            <Col span={15} offset={1}>
              <h3>
                数据 共<span>32</span>行
              </h3>
              <Table
                columns={columns2}
                dataSource={list1}
                pagination={pagination}
                rowKey="id"
                bordered
                components={components}
                className={styles.table}
                />
            </Col>
          </Row>
        </Card>
      </PageHeaderLayout>
    )
  }
}
