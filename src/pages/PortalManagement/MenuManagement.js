/*
 * @Author: ChouEric
 * @Date: 2018-07-03 15:27:04
 * @Last Modified by: ChouEric
 * @Last Modified time: 2018-12-16 16:46:46
 * @描述: 开发门户管理 -- 目录分类 -- 目录分类管理
 *  
*/
import React, { Component, Fragment } from 'react'
import { connect } from 'dva'
import { Modal, DatePicker, Input, Select, Button, Table, Radio, Icon, Upload, message } from 'antd'
import moment from 'moment'
import {format0, format24} from '../../utils/utils'

import PageHeaderLayout from '@/components/PageHeaderWrapper'
import config from '../../api/config'
import styles from './MenuManagement.less'

function getCookie(params) {
  const temp = document.cookie.match(new RegExp(`${params}=.*;`))
  const other = document.cookie.match(new RegExp(`${params}=.*`))
  if (temp) {
    return temp[0].replace(`${params}=`,'')
  } else if (other) {
    return other[0].replace(`${params}=`,'')
  } else {
    return ''
  }
}

const { RangePicker } = DatePicker
const { Option } = Select
const { uploadServer } = config

@connect(({ portalManagement, loading }) => ({
  portalManagement,
  loading:loading.effects['portalManagement/querys'],
}))
export default class MenuManagement extends Component {
  state = {
    name: '',
    operator: '',
    state: '发布状态',
    recommend: '是否推荐',
    date: [],
    isChanged: false,
    showModal: false,
    modalTitle: '',
    defaultValue: '0',
    rowId:'',
    fileList: [],
    fileList1: [],
    // imageFlag: false,
    tempData: {},
    tempData1: {},
  }

  componentDidMount() {
    const { dispatch } = this.props
    dispatch({
      type:'portalManagement/querys',
      payload:{pageNum:1,pageSize:10},
    })
  }

  handleNameChange = e => {
    this.setState({
      isChanged: true,
    })
    this.setState({
      name: e.target.value.trim(),
    })
  }

  handleOperatorChange = e => {
    this.setState({
      isChanged: true,
    })
    this.setState({
      operator: e.target.value.trim(),
    })
  }

  handleStateChange = value => {
    this.setState({
      state: value,
      isChanged: true,
    })
  }

  recommendChange = value => {
    this.setState({
      recommend: value,
      isChanged: true,
    })
  }

  handlePick = val => {
    this.setState({
      isChanged: true,
    })
    this.setState({
      date: val,
    })
  }

  handleSearch = () => {
    if (!this.state.isChanged) return // eslint-disable-line
    const { dispatch } = this.props
    const { name, state, recommend, date, operator } = this.state
    const states = (state === "发布状态" || state === -1) ? undefined : state
    const recommends = (recommend === "是否推荐" || recommend === -1) ? undefined : recommend
    const names = name === "" ? undefined : name
    const operators = operator === "" ? undefined : operator
    const pagination = {
      pageNum: 1,
      pageSize: 10,
    }
    const dateRange = date.map((item) => {
      if (moment.isMoment(item)) {
        return +(item.format('x'))
      } else {
        return 0
      }
    })
    this.setState({
      isChanged: false,
    })
    dispatch({
      type: 'portalManagement/querys',
      payload: { typeName:names,typeState:states,typeHotState:recommends,mender:operators,createTime:format0(dateRange[0]) ? `${moment(format0(dateRange[0])).format('YYYY-MM-DD')} 00:00:00` : undefined,updateTime:format24(dateRange[1]) ? `${moment(format24(dateRange[1])).format('YYYY-MM-DD')} 23:59:59` : undefined, ...pagination },
    })
  }

  handleStandardTableChange = pagination => {
    const { dispatch } = this.props
    const { name, state, recommend, date, operator } = this.state
    const states = (state === "发布状态" || state === -1) ? undefined : state
    const recommends = (recommend === "是否推荐" || recommend === -1) ? undefined : recommend
    const names = name === "" ? undefined : name
    const operators = operator === "" ? undefined : operator
    const dateRange = date.map((item) => {
      if (moment.isMoment(item)) {
        return +(item.format('x'))
      } else {
        return 0
      }
    })
    this.setState({
      isChanged: false,
    })
    dispatch({
      type: 'portalManagement/querys',
      payload: { typeName:names,typeState:states,typeHotState:recommends,mender:operators,createTime:format0(dateRange[0]) ? `${moment(format0(dateRange[0])).format('YYYY-MM-DD')} 00:00:00` : undefined,updateTime:format24(dateRange[1]) ? `${moment(format24(dateRange[1])).format('YYYY-MM-DD')} 23:59:59` : undefined, pageNum:pagination.current,pageSize:pagination.pageSize },
    })
  }

  handleModal = (row, modalTitle) => {
    this.setState({
      showModal: true,
      modalTitle,
      rowId:row.typeId,
      typeState:row.typeState,
      defaultValue: row.typeHotState,
      fileList:row.typePathOne && modalTitle === '设置' ? [
        {uid: -1, name: 'default.png', status: 'done', url:row.typePathOne }] 
      : [],
      fileList1:row.typePathTwo ? [
        {uid: -1, name: '暂无', status: 'done', url:row.typePathTwo },
      ] : [],
    })
  }

  handleReccomend = e => {
    this.setState({
      defaultValue: e.target.value,
    })
  }

  handleModalSure = (text) => {
    const oper = localStorage.getItem("accountRealName")
    const { dispatch } = this.props
    const { defaultValue, tempData:{imagePath},tempData1 } = this.state
    if(text.modalTitle === "取消发布"){
      dispatch({
        type:'portalManagement/updateItem',
        payload:{typeId:text.rowId,typeState:text.typeState, mender:oper, id:text.ids},
      })
    }
    else if(text.modalTitle === "设置"){
      dispatch({
        type:'portalManagement/updateItem',
        payload:{typeId:text.rowId,typeHotState:defaultValue,typeState:text.typeState, mender:oper, id:text.ids,typePathOne:imagePath,typePathTwo:tempData1.imagePath},
      })
    } else {
      dispatch({
        type:'portalManagement/updateItem',
        payload:{typeId:text.rowId,typeHotState:defaultValue,typeState:text.typeState, mender:oper, id:text.ids},
      })
    }
    this.setState({
      showModal:false,
      fileList:[],
      fileList1:[],
    })
  }

  uploadChange = ({ fileList }) => {
    const { tempData } = this.state
    this.setState({
      fileList,
    })
    try {
      if (fileList[0] && fileList[0].status === 'done') {

        this.setState({
          // removeFlag: false,
          tempData: {
            ...tempData,
            imagePath: fileList[0].response.result.data,
          },
        })
        // this.props.form.setFieldsValue({
        //   imagePath: fileList[0].response.result.data,
        // })
      // } else if (fileList[0] && fileList[0].status === 'done') {
        // this.setState({
        //   removeFlag: true,
        // })
      }
      else if(fileList .length <= 0){
        this.setState({
          // removeFlag: false,
          tempData: {
            ...tempData,
            imagePath:"",
          },
        })
      }
       else {
        // this.setState({
        //   removeFlag: false,
        // })
      }
    } catch (error) {
     // eslint-disable-next-line 
     console.log(error)
    }
  }

  uploadChange1 = ({ fileList }) => {
    const { tempData1 } = this.state
    this.setState({
      fileList1:fileList,
    })
    try {
      if (fileList[0] && fileList[0].status === 'done') {
        this.setState({
          // removeFlag: false,
          tempData1: {
            ...tempData1,
            imagePath: fileList[0].response.result.data,
          },
        })
        // this.props.form.setFieldsValue({
        //   imagePath: fileList[0].response.result.data,
        // })
      } 
      else if(fileList .length <= 0){
        this.setState({
          // removeFlag: false,
          tempData1: {
            ...tempData1,
            imagePath:"",
          },
        })
      }
      else {
        // this.setState({
        //   removeFlag: false,
        // })
      }
    } catch (error) {
     // eslint-disable-next-line 
     console.log(error)
    }
  }

  handlePreview = file => {
    this.setState({
      previewUrl: file.url || file.thumbUrl,
      previewVisible: true,
    })
  }

  previewCancel = () => {
    this.setState({
      previewVisible: false,
    })
  }

  render() {
    const {
      name,
      date,
      operator,
      state,
      recommend,
      showModal,
      modalTitle,
      defaultValue,
      typeState,
      rowId,
      fileList,
      fileList1,
      previewVisible,
      previewUrl,
    } = this.state
    const { portalManagement:{ lists, pagination }, loading } = this.props
    const stateList = [
      {
        value: -1,
        label: '全部',
      },
      {
        value: 1,
        label: '已发布',
      },
      {
        value: 0,
        label: '未发布',
      },
    ]
    const recommendList = [
      {
        value: -1,
        label: '全部',
      },
      {
        value: 1,
        label: '是',
      },
      {
        value: 0,
        label: '否',
      },
    ]

    const columns = [
      {
        title: '序号',
        dataIndex: 'kid',
      },
      {
        title: '分类名称',
        dataIndex: 'typeName',
      },
      {
        title: '发布状态',
        dataIndex: 'typeState',
        render: (text) => {
          return +text === 0 ? '未发布': '已发布'
        },
      },
      {
        title: '是否推荐',
        dataIndex: 'typeHotState',
        render: (text,row) => {
          return +row.typeState === 0 ? '-': (+text === 0 ? '否':'是')
        },
      },
      {
        title: '操作人',
        dataIndex: 'mender',
      },
      {
        title: '操作时间',
        dataIndex: 'updateTime',
        render: (text) => {
          return moment(text).format('lll')
        },
      },
      {
        title: '操作',
        dataIndex: 'operation',
        render: (text, row) => {
          if (+row.typeState === 0) {
            return <a onClick={() => this.handleModal(row, '发布')}>发布</a>
          }else {
            return (
              <Fragment>
                <a className="mr16" onClick={() => this.handleModal(row, '取消发布')}>
                  取消发布
                </a>
                <a onClick={() => this.handleModal(row, '设置')}>设置</a>
              </Fragment>
            )
          }
        },
      },
    ]
    // const rowSelection = {
    //   selectedRowKeys,
    //   onChange: (rowKeys) => {
    //     this.setState({
    //       selectedRowKeys: rowKeys,
    //     })
    //   },
    // }

    columns.forEach(item => {
      item.align = 'center'
    })

    // const typeComs = stateList.map(item => { // eslint-disable-line
    //   return <Option value={item.value} key={item.value}>{item.label}</Option>
    // })
    // 封装方法
    const getSelectOptions = (list = []) => {
      return list.map(item => {
        return (
          <Option value={item.value} key={item.value}>
            {item.label}
          </Option>
        )
      })
    }

    const uploadBtn = (
      <Fragment>
        <Icon type="upload" />
        <div>点击上传</div>
      </Fragment>
    )

    return (
      <PageHeaderLayout>
        <div className={styles.layout}>
          <div className={styles.search}>
            <Input
              placeholder="分类名称"
              value={name}
              onPressEnter={this.handleSearch}
              onChange={this.handleNameChange}
              className={styles.name}
              />
            <Select value={state} onChange={this.handleStateChange} className={styles.select}>
              {getSelectOptions(stateList)}
            </Select>
            <Select value={recommend} onChange={this.recommendChange} className={styles.select}>
              {getSelectOptions(recommendList)}
            </Select>
            <Input
              placeholder="操作人"
              value={operator}
              onPressEnter={this.handleSearch}
              onChange={this.handleOperatorChange}
              className={styles.name}
              />
            <RangePicker value={date} onChange={this.handlePick} className={styles.date} />
            <Button type="primary" onClick={this.handleSearch} icon="search">
              搜索
            </Button>
          </div>
          <div className={styles.bar}>
            {/* <Button type='primary' className={styles.button}>导出</Button> */}
          </div>
          <div>
            <Table
              bordered
              columns={columns}
              dataSource={lists}
              // rowSelection={rowSelection}
              // pagination={pagination && {...pagination, showQuickJumper: true, showTotal: (total) => `共 ${Math.ceil(total / pagination.pageSize)}页 / ${total}条 数据`}}
              loading={loading}
              rowKey="kid"
              pagination={pagination && {...pagination, showQuickJumper: true, showTotal: (total) => `共 ${Math.ceil(total / pagination.pageSize)}页 / ${total}条 数据`}}
              onChange={this.handleStandardTableChange}
              />
          </div>
          <Modal
            visible={showModal}
            title={modalTitle || '确认执行此操作?'}
            onOk={this.handleModalSure.bind(null,{modalTitle,rowId,typeState})}
            onCancel={() => this.setState({ showModal: false })}
            >
            {modalTitle === '发布' ? (
              <Fragment>
                <span className={styles.label}>是否推荐</span>
                <span>
                  <Radio.Group value={defaultValue} onChange={this.handleReccomend}>
                    <Radio value={1}>是</Radio>
                    <Radio value={0}>否</Radio>
                  </Radio.Group>
                </span>
              </Fragment>
            ) : null}
            {modalTitle === '取消发布' ? (
              <Fragment>
                <span>取消发布后将不在开放门户展示，请确认是否取消发布？</span>
              </Fragment>
            ) : null}
            {modalTitle === '设置' ? (
              <Fragment>
                <span className={styles.label}>是否推荐</span>
                <span>
                  <Radio.Group value={defaultValue} onChange={this.handleReccomend}>
                    <Radio value={1}>是</Radio>
                    <Radio value={0}>否</Radio>
                  </Radio.Group>
                </span>
                <div style={{marginTop:15}}>
                  <div style={{display:'inline-block',marginRight:20}}>
                    <span style={{display:'inline-block',marginBottom:10}}>上传图标1</span>
                    <Upload
                      className='clearfix'
                      action={`${uploadServer}/uploadFastDFSImage?tenantId=${localStorage.getItem('tenantId') || localStorage.getItem('accountId')}`} // 上传地址
                      headers={{accessToken: getCookie('accessToken')}}
                      listType="picture-card"
                      fileList={fileList}
                      beforeUpload={file => {
                        if (file.type.startsWith('image/')) {
                          return true
                        } else {
                          message.error('请上传图片格式文件')
                          return false
                        }
                      }}
                      onChange={this.uploadChange}
                      onPreview={this.handlePreview}
                      >
                      {fileList.length >= 1 ? null : uploadBtn}
                    </Upload>
                  </div>
                  <div style={{display:'inline-block'}}>
                    <span style={{display:'inline-block',marginBottom:10}}>上传图标2</span>
                    <Upload
                      className='clearfix'
                      action={`${uploadServer}/uploadFastDFSImage?tenantId=${localStorage.getItem('tenantId') || localStorage.getItem('accountId')}`} // 上传地址
                      headers={{accessToken: getCookie('accessToken')}}
                      listType="picture-card"
                      fileList={fileList1}
                      beforeUpload={file => {
                        if (file.type.startsWith('image/')) {
                          return true
                        } else {
                          message.error('请上传图片格式文件')
                          return false
                        }
                      }}
                      onChange={this.uploadChange1}
                      onPreview={this.handlePreview}
                      >
                      {fileList1.length >= 1 ? null : uploadBtn}
                    </Upload>
                  </div>
                </div>
              </Fragment>
            ) : null}
          </Modal>
          <Modal visible={previewVisible} footer={null} onCancel={this.previewCancel} className={styles.img}>
            <img src={previewUrl} alt="图片预览" style={{ width: '100%' }} />
          </Modal>
        </div>
      </PageHeaderLayout>
    )
  }
}
