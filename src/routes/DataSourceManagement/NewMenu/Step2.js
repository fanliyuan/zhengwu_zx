/*
 * @Author: ChouEric
 * @Date: 2018-07-05 16:45:01
 * @Last Modified by: ChouEric
 * @Last Modified time: 2018-07-27 11:03:37
 * @描述: 这个页面的上传应该是 上传完数据,然后后台处理,返回给前台,前台再核对,确认
*/
import React, { PureComponent, Fragment } from 'react'
import { connect } from 'dva'
import { routerRedux } from 'dva/router'
import {
  Modal,
  Form,
  Button,
  Radio,
  Input,
  Select,
  Table,
  Cascader,
  DatePicker,
  Upload,
  Icon,
} from 'antd'

import TableForm from './TableForm'
import styles from './index.less'

const { Item } = Form
const modalList = [
  {
    id: 3,
    name: '城市低保标准表',
    type: 'MySQL',
    applicationName: '统计系统',
  },
  {
    id: 2,
    name: '人口统计表',
    type: 'MySQL',
    applicationName: '统计系统',
  },
  {
    id: 1,
    name: '农村低保标准表',
    type: 'MySQL',
    applicationName: '统计系统',
  },
]

@connect()
@Form.create()
export default class Step2 extends PureComponent {
  state = {
    data: {
      method: 3,
    },
    tableData: [
      {
        infoCode: '00001',
        key: '1',
      },
    ],
    modalData: {
      name: '',
      organization: [],
      state: 0,
      time: [],
    },
    visible1: false,
    visible2: false,
    selectKeys: [],
    disabled: true,
  }

  componentDidMount() {
    if (this.props.location.pathname === '/dataSourceManagement/newMenu/two') {
      this.setState({
        disabled: false,
      })
    }
  }

  onChange = val => {
    this.setState({
      tableData: val,
    })
  }

  methodChange = e => {
    this.setState({
      data: {
        method: e.target.value,
      },
      visible1: e.target.value === 1,
      visible2: e.target.value === 2,
    })
  }

  goBack = () => {
    if (!this.state.disabled) {
      this.props.dispatch(routerRedux.push('/dataSourceManagement/newMenu/one'))
    } else {
      this.props.dispatch(routerRedux.push('/dataSourceManagement/checkMenu/one'))
    }
  }

  goForward = () => {
    const {
      data: { method },
    } = this.state
    this.props.dispatch(
      routerRedux.push('/dataSourceManagement/newMenu/three', { show: method === 1 })
    )
  }

  render() {
    // const { form: { getFieldDecorator, validateFields }, dispatch } = this.props
    const {
      data,
      tableData,
      modalData: { name, organization, state, time },
      visible1,
      visible2,
      selectKeys,
      disabled,
    } = this.state
    const columns = [
      {
        title: 'ID',
        dataIndex: 'id',
        align: 'center',
      },
      {
        title: '资源名称',
        dataIndex: 'name',
        align: 'center',
      },
      {
        title: '数据类型',
        dataIndex: 'type',
        align: 'center',
      },
      {
        title: '应用系统名称',
        dataIndex: 'applicationName',
        align: 'center',
      },
    ]
    const rowSelection = {
      selectKeys,
      onChange: keys => {
        this.setState({
          selectKeys: keys,
        })
      },
    }
    return (
      <Fragment>
        <Form>
          <Item lable="名称">
            <Radio.Group value={data.method} onChange={this.methodChange} disabled={disabled}>
              <Radio value={1}>从数据资源导入</Radio>
              <Radio value={2}>导入已有目录</Radio>
              <Radio value={3}>手工建立</Radio>
            </Radio.Group>
          </Item>
          <Item label="信息项">
            <TableForm value={tableData} onChange={val => this.onChange(val)} disabled={disabled} />
          </Item>
        </Form>
        <div style={{ textAlign: 'center' }}>
          <Button className="mr64" onClick={this.goBack}>
            上一步
          </Button>
          {!disabled && (
            <Button type="primary" onClick={this.goForward}>
              提交
            </Button>
          )}
        </div>
        <Modal
          title="选择注册资源自动建立目录数据项"
          visible={visible1}
          width={900}
          onOk={() => this.setState({ visible1: false })}
          onCancel={() => this.setState({ visible1: false })}
          >
          <div className="mb16">
            <Input value={name} className={styles.input} placeholder="应用系统名称" />
            <Cascader value={organization} className={styles.cascader} placeholder="请选择机构" />
            <Select value={state} className={styles.select}>
              <Select.Option value={0} key={0}>
                审核状态
              </Select.Option>
            </Select>
            <DatePicker.RangePicker value={time} className={styles.picker} />
            <Button type="primary" icon="search">
              搜索
            </Button>
          </div>
          <Table
            dataSource={modalList}
            columns={columns}
            rowSelection={rowSelection}
            pagination={false}
            rowKey="id"
            bordered
            />
        </Modal>
        <Modal
          title="导入目录"
          visible={visible2}
          onOk={() => this.setState({ visible2: false })}
          onCancel={() => this.setState({ visible2: false })}
          >
          <div className="mb8">
            <a>点击此处下载模板</a>
          </div>
          <Upload.Dragger>
            <p className="ant-upload-drag-icon">
              <Icon type="upload" />
            </p>
            <p className="ant-upload-text">单击此框或者将文件拖拽到此框</p>
          </Upload.Dragger>
        </Modal>
      </Fragment>
    )
  }
}
