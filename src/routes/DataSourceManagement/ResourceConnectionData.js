/*
 * @Author: ChouEric
 * @Date: 2018-07-27 14:49:28
 * @Last Modified by: ChouEric
 * @Last Modified time: 2018-07-27 14:55:15
 * @Description: 这个页面值得研究
 */
import React, { Component } from 'react'
import { connect } from 'dva'
import { routerRedux } from 'dva/router'
import {
  Table,
  Button,
  Card,
  Divider,
  Row,
  Col,
  Modal,
  Input,
  DatePicker,
  Form,
  Checkbox,
} from 'antd'
import moment from 'moment'

import styles from './ResourceConnectionData.less'
import PageHeaderLayout from '../../layouts/PageHeaderLayout'

const { RangePicker } = DatePicker

const FormItem = Form.Item
const EditableContext = React.createContext()
const EditableRow = ({ form, index, ...props }) => (
  <EditableContext.Provider value={form}>
    <tr {...props} />
  </EditableContext.Provider>
)
const EditableFormRow = Form.create()(EditableRow)
class EditableCell extends React.Component {
  getInput = initialValue => {
    if (this.props.filedType === 'select') {
      return <Checkbox defaultChecked={initialValue} />
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
                  })(this.getInput(record[dataIndex]))}
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

@connect(({ resourceConnectionData }) => ({
  resourceConnectionData,
}))
export default class ResourceConnectionData extends Component {
  state = {
    ItemConnect: true,
    visible1: false,
    visible2: false,
    isNodeOperator: false,
  }

  componentDidMount() {
    this.setState({
      isNodeOperator: localStorage.getItem('antd-pro-authority') === 'operator-n',
    })
  }

  isEditing = record => {
    return record.key === this.state.editingKey
  }

  goToDetail = row => {
    this.props.dispatch(
      routerRedux.push({
        pathname: `/dataSourceManagement/fileSourceDetail/${row.id}`,
        state: row,
      })
    )
  }

  handleConnect = () => {
    this.setState({
      ItemConnect: true,
    })
  }

  handleClearConnect = () => {
    this.setState({
      ItemConnect: false,
    })
  }

  handleSave = () => {
    const { dispatch } = this.props
    dispatch(routerRedux.push('/dataSourceManagement/catalogManagement'))
  }

  handleBack = () => {
    const { dispatch } = this.props
    dispatch(routerRedux.push('/dataSourceManagement/catalogManagement'))
  }

  showModal1 = () => {
    this.setState({
      visible1: true,
    })
  }

  showModal2 = () => {
    this.setState({
      visible2: true,
    })
  }

  handleOk1 = () => {
    this.setState({
      visible1: false,
    })
  }

  handleOk2 = () => {
    this.setState({
      visible2: false,
    })
  }

  handleCancel1 = () => {
    this.setState({
      visible1: false,
    })
  }

  handleCancel2 = () => {
    this.setState({
      visible2: false,
    })
  }

  render() {
    const { ItemConnect, visible1, visible2, isNodeOperator } = this.state
    const pagination = { pageSize: 10, current: 1 }
    const columns = [
      {
        title: '信息编码',
        dataIndex: 'infoCode',
      },
      {
        title: '信息名称',
        dataIndex: 'infoName',
      },
      {
        title: '数据类型',
        dataIndex: 'dataTypes',
      },
      {
        title: '数据长度',
        dataIndex: 'dataSize',
      },
    ]
    columns.forEach(item => {
      item.align = 'center'
    })
    const list = [
      {
        id: 0,
        infoCode: '',
        infoName: 'id',
        dataTypes: 'int',
        dataSize: '',
      },
      {
        id: 1,
        infoCode: '',
        infoName: 'name',
        dataTypes: 'varchar',
        dataSize: '',
      },
      {
        id: 2,
        infoCode: '',
        infoName: 'sex',
        dataTypes: 'varchar',
        dataSize: '',
      },
    ]
    const columns1 = [
      {
        title: '表名称',
        dataIndex: 'tableName',
      },
      {
        title: '字段',
        dataIndex: 'field',
      },
      {
        title: '类型',
        dataIndex: 'types',
      },
      {
        title: '说明',
        dataIndex: 'intro',
      },
    ]
    if (isNodeOperator) {
      columns1.push({
        title: '操作',
        render() {
          return <a>删除</a>
        },
      })
    }
    columns1.forEach(item => {
      item.align = 'center'
    })
    const list1 = [
      {
        id: 0,
        tableName: 'Dtable1',
        field: 'id',
        types: 'int',
        intro: '',
      },
      {
        id: 1,
        tableName: '',
        field: '',
        types: '',
        intro: '',
      },
      {
        id: 2,
        tableName: 'Dtable2',
        field: 'sex',
        types: 'varchar',
        intro: '',
      },
    ]
    const columnsModal1 = [
      {
        title: 'ID',
        dataIndex: 'id',
      },
      {
        title: '资源名称',
        dataIndex: 'sourceName',
      },
      {
        title: '数据类型',
        dataIndex: 'dataType',
      },
      {
        title: '应用系统名称',
        dataIndex: 'systemName',
      },
      {
        title: '注册时间',
        dataIndex: 'registerTime',
        render(text) {
          return moment(text).format('lll')
        },
      },
    ]
    const listModal1 = [
      {
        id: 0,
        sourceName: '城市低保标准',
        dataType: '文件',
        systemName: '统计系统',
        registerTime: 451233554,
      },
      {
        id: 1,
        sourceName: '农村低保准备',
        dataType: '文件',
        systemName: '统计系统',
        registerTime: 451233554,
      },
      {
        id: 2,
        sourceName: '人口统计',
        dataType: '文件',
        systemName: '统计系统',
        registerTime: 451233554,
      },
    ]
    const columnsModal2 = [
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
    columnsModal2.forEach(item => (item.align = 'center')) // eslint-disable-line
    const listModal2 = [
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
      {
        id: 2,
        tableName: 'dig_order',
        chineseLabel: '订单表',
      },
      {
        id: 3,
        tableName: 'dig_order',
        chineseLabel: '订单表',
      },
      {
        id: 4,
        tableName: 'dig_order',
        chineseLabel: '订单表',
      },
      {
        id: 5,
        tableName: 'dig_order',
        chineseLabel: '订单表',
      },
      {
        id: 6,
        tableName: 'dig_order',
        chineseLabel: '订单表',
      },
      {
        id: 7,
        tableName: 'dig_order',
        chineseLabel: '订单表',
      },
      {
        id: 8,
        tableName: 'dig_order',
        chineseLabel: '订单表',
      },
      {
        id: 9,
        tableName: 'dig_order',
        chineseLabel: '订单表',
      },
      {
        id: 10,
        tableName: 'dig_order',
        chineseLabel: '订单表',
      },
      {
        id: 11,
        tableName: 'dig_order',
        chineseLabel: '订单表',
      },
      {
        id: 12,
        tableName: 'dig_order',
        chineseLabel: '订单表',
      },
      {
        id: 13,
        tableName: 'dig_order',
        chineseLabel: '订单表',
      },
      {
        id: 14,
        tableName: 'dig_order',
        chineseLabel: '订单表',
      },
    ]
    const columns2 = [
      {
        title: '序号',
        dataIndex: 'id',
      },
      {
        title: '主键',
        dataIndex: 'isMainKey',
        render: text => {
          return <span>{text === 1 ? '是' : ''}</span>
        },
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
        dataIndex: 'isQueryKey',
        editable: true,
        isSelect: true,
        width: 96,
      },
      {
        title: '是否是外键',
        dataIndex: 'isFroginKey',
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
    columns2.forEach(item => (item.align = 'center')) // eslint-disable-line
    const columns3 = columns2.map(item => {
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
    const list3 = [
      {
        id: 0,
        chineseLabel: '标注1',
        isMainKey: 1,
        isQueryKey: 1,
      },
      {
        id: 1,
        chineseLabel: '标注2',
        isMainKey: 0,
      },
    ]

    const components = {
      body: {
        row: EditableFormRow,
        cell: EditableCell,
      },
    }

    return (
      <PageHeaderLayout>
        <div className="btncls clearfix">
          <Button onClick={this.handleBack} className="fr mr40">
            返回
          </Button>
          {isNodeOperator && (
            <Button type="primary" className="fr mr40" onClick={this.handleSave}>
              保存
            </Button>
          )}
        </div>
        <Card>
          <div className={styles.form}>
            <h3>
              目录编码:<span> 3300031306381126/00001</span>
              名称:<span> 资产负债表信息</span>
              提供方:<span> 规划局</span>
              创建时间:<span> 2018-06-08 10:11:10</span>
            </h3>
            <Divider />
          </div>
          <Row style={{ marginBottom: 15 }}>
            <Col span={4}>
              <h3>
                挂接资源名称&nbsp;:&nbsp;<span>城市低保标准</span>
              </h3>
            </Col>
            {isNodeOperator && (
              <Col span={18}>
                <span className={styles.linkBtn} onClick={this.showModal1}>
                  去选择
                </span>
              </Col>
            )}
          </Row>
          <Row style={{ marginBottom: 20 }}>
            <Col span={4}>
              <h3>挂接资源检索关系设置&nbsp;:&nbsp;</h3>
            </Col>
            {isNodeOperator && (
              <Col span={18}>
                <span className={styles.linkBtn} onClick={this.showModal2}>
                  去选择
                </span>
              </Col>
            )}
          </Row>
          {/* <Row style={{ marginBottom: 20 }}>
            <Col span={4}>
              <Input placeholder="信息编码" />
            </Col>
            <Col span={4} offset={1}>
              <Input placeholder="信息名称" />
            </Col>
            <Col span={4} offset={1}>
              <Button type="primary">搜索</Button>
            </Col>
          </Row> */}
          <Row>
            <Col span={10}>
              <Table
                columns={columns}
                dataSource={list}
                pagination={pagination}
                rowKey="id"
                bordered
              />
            </Col>
            <Col span={4} style={{ textAlign: 'center' }}>
              <Row>
                <Col span={11}>
                  <Button onClick={this.handleConnect} disabled={!isNodeOperator}>
                    自动映射
                  </Button>
                </Col>
                <Col span={11} offset={2}>
                  <Button onClick={this.handleClearConnect} disabled={!isNodeOperator}>
                    清除映射
                  </Button>
                </Col>
              </Row>
              <Row
                style={{
                  marginTop: 40,
                  padding: '0 10px',
                  display: ItemConnect ? 'block' : 'none',
                }}
              >
                <Col>
                  <img src="/src/assets/arrow.png" alt="arrow" style={{ width: '100%' }} />
                </Col>
              </Row>
              <Row
                style={{
                  padding: '0 10px',
                  marginTop: 30,
                  display: ItemConnect ? 'block' : 'none',
                }}
              >
                <Col>
                  <img src="/src/assets/arrow.png" alt="arrow" style={{ width: '100%' }} />
                </Col>
              </Row>
              <Row
                style={{
                  padding: '0 10px',
                  marginTop: 30,
                  display: ItemConnect ? 'block' : 'none',
                }}
              >
                <Col>
                  <img src="/src/assets/arrow.png" alt="arrow" style={{ width: '100%' }} />
                </Col>
              </Row>
            </Col>
            <Col span={10}>
              <Table
                columns={columns1}
                dataSource={list1}
                pagination={pagination}
                rowKey="id"
                bordered
              />
            </Col>
          </Row>
          <Modal
            title="选择要挂接的资源"
            visible={visible1}
            onOk={this.handleOk1}
            onCancel={this.handleCancel1}
            width={900}
          >
            <Row style={{ marginBottom: 20 }}>
              <Col span={5}>
                <Input placeholder="资源名称" />
              </Col>
              <Col span={5} offset={1}>
                <Input placeholder="应用系统名称" />
              </Col>
              <Col span={5} offset={1}>
                <RangePicker />
              </Col>
              <Col span={5} offset={1}>
                <Button type="primary">搜索</Button>
              </Col>
            </Row>
            <Table
              columns={columnsModal1}
              dataSource={listModal1}
              pagination={pagination}
              rowKey="id"
              bordered
            />
          </Modal>
          <Modal
            title="检索关系设置"
            visible={visible2}
            onOk={this.handleOk2}
            onCancel={this.handleCancel2}
            width={900}
          >
            <div>
              <h3>
                数据表 共<span>32</span>张
              </h3>
              <Table columns={columnsModal2} dataSource={listModal2} rowKey="id" bordered />
            </div>
            <div>
              <h3>
                数据 共<span>32</span>行
              </h3>
              <Table
                columns={columns3}
                dataSource={list3}
                rowKey="id"
                bordered
                components={components}
                className={styles.table}
              />
            </div>
          </Modal>
        </Card>
      </PageHeaderLayout>
    )
  }
}
