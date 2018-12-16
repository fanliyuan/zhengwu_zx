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
  // Modal,
  // Input,
  // DatePicker,
  // Popconfirm,
  // message,
} from 'antd'
import moment from 'moment'
// import Cookies from 'js-cookie'

import styles from './ResourceConnection.less'
import PageHeaderLayout from '@/components/PageHeaderWrapper'

// const { RangePicker } = DatePicker
const { isMoment } = moment
let initialData = []
let enableEditFile = []
// let resourceDetailData;
const resourceItemDetail = []
@connect(({ catalogManagement, loading }) => ({
  catalogManagement,
  loading: loading.models.catalogManagement,
}))
export default class ResourceConnection extends Component {
  // goToDetail = row => {
  //   this.props.dispatch(
  //     routerRedux.push({
  //       pathname: `/dataSourceManagement/fileSourceDetail/${row.id}`,
  //       state: row,
  //     })
  //   );
  // };
  state = {
    // visible1: false,
    routeId: '',
    // visible2: false,
    connectName: '',
    connectType: '',
    startTimes: '',
    endTimes: '',
    // connectTime: [],
    // chooseName: '',
    chooseId: '',
    chooseId1: '',
    // zcName: '',
    zcId: -1,
    zcType: '',
    fileListData: [],
    // isNodeOperator: false,
    isExpandOrFolder: true,
    dataTypes: '',
    initialType: '',
    // mountId:"",
  };

  componentDidMount() {
    const {
      dispatch,
      location: { state },
    } = this.props
    dispatch({
      type: 'catalogManagement/getResources',
      payload: {
         params:{resourceId: state ? state.routeId : '' },
        },
    })
    dispatch({
      type:'catalogManagement/getConnectList',
      payload:{
        params:{id:state ? state.mountId : ''}},
    })
    dispatch({
      type:'catalogManagement/getItemList',
      payload:{
        params:{resourceId:state ? state.routeId : '', index:1,limit:10}},
    })
    this.setState({
      routeId: state ? state.routeId : '',
      fileListData: [],
      // mountId:state ? state.mountId : '',
    })
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      fileListData: [],
    })
    const resourceDetailData = nextProps.informationResource ?  nextProps.informationResource.resourceDetail : ""
    if (resourceDetailData) {
      this.setState({
        initialType: resourceDetailData.mountType,
      })
      if (resourceDetailData.mount) {
        const arr = []
        initialData = []
        resourceDetailData.mountInfoItemIdMap.forEach(val =>{
            enableEditFile.forEach((item) => {
              if (+resourceDetailData.mountInfoItemIdMap[val] === +item.id) {
                arr.push(item)
              }
            })
        } )
        initialData = [...arr]
        this.setState({
          fileListData: [...arr],
          chooseId1: resourceDetailData.mountId,
        })
      }
    }
  }

  handleSave = () => {
    const { dispatch } = this.props
    dispatch(routerRedux.push('/dataSourceManagement/catalogManagement'))
  };

  handleBack = () => {
    const { dispatch } = this.props
    dispatch(routerRedux.push('/dataSourceManagement/catalogManagement'))
  };

  handleChooseChange = row => {
    this.setState({
      // zcName: row.name,
      zcId: row.id,
      zcType: row.type,
    })
  };

  handleSearch = pagination => {
    const { connectName, connectType, startTimes, endTimes } = this.state
    const { dispatch } = this.props
    dispatch({
      type: 'informationResource/getConnectListss',
      payload: {
        pageNum: pagination ? pagination.current : 1,
        pageSize: pagination ? pagination.pageSize : 10,
        name: connectName || undefined,
        dataType: connectType || undefined,
        beginTime: startTimes || undefined,
        endTime: endTimes || undefined,
        status: 1,
        mount: false,
      },
    })
  };

  handleConnectName = e => {
    this.setState({
      connectName: e.target.value,
    })
  };

  handleConnectType = e => {
    this.setState({
      connectType: e.target.value,
    })
  };

  handleConnectTimeChange = val => {
    const timeArr = val.map(item => {
      if (isMoment(item)) {
        return item.format('YYYY-MM-DD')
      } else {
        return ''
      }
    })
    this.setState({
      startTimes: timeArr[0] ? timeArr[0] : undefined,
      endTimes: timeArr[1] ? timeArr[1] : undefined,
      // connectTime: val,
    })
  };

  handleConnectListChange = pagination => {
    this.handleSearch(pagination)
  };

  handleFileTableChange = async pagination => {
    enableEditFile = []
    const { chooseId } = this.state
    const { dispatch } = this.props
    await dispatch({
      type: 'informationResource/getFileList',
      payload: {
        id: chooseId,
        pagination: { pageNum: pagination.current, pageSize: pagination.pageSize },
      },
    })
    this.setState({
      fileListData: [...enableEditFile],
    })
  };

  showModal2 = () => {
    // this.setState({
    //   visible2: true,
    // })
  };

  handleOk1 = async () => {
    initialData = []
    enableEditFile = []
    const { zcId, zcType } = this.state
    this.setState({
      // chooseName: zcName,
      chooseId: zcId,
      // abc: zcType,
      dataTypes: zcType,
      // visible1: false,
    })
    const { dispatch } = this.props
    if (zcType === 'ftp') {
      await dispatch({
        type: 'informationResource/getFileList',
        payload: {
          id: zcId,
          pagination: { pageNum: 1, pageSize: 10 },
          type: 'ftp',
          type1: 'ftpfile',
        },
      })
      initialData = [...enableEditFile]
      this.setState({
        fileListData: [...enableEditFile],
      })
    } else if (zcType === 'file') {
      await dispatch({
        type: 'informationResource/getFileList',
        payload: {
          id: zcId,
          pagination: { pageNum: 1, pageSize: 10 },
          type: 'file',
          type1: 'file',
        },
      })
      initialData = [...enableEditFile]
      this.setState({
        fileListData: [...enableEditFile],
      })
    } else if (zcType === 'db') {
      await dispatch({
        type: 'informationResource/getFileList',
        payload: {
          id: zcId,
          pagination: { pageNum: 1, pageSize: 10 },
          type: 'db',
          type1: 'struct',
        },
      })
      initialData = [...enableEditFile]
      this.setState({
        fileListData: [...enableEditFile],
      })
    }
  };

  handleOk2 = () => {
    // this.setState({
    //   visible2: false,
    // })
  };

  handleCancel1 = () => {
    this.setState({
      // visible1: false,
      // zcName: '',
      zcId: -1,
      zcType: '',
    })
  };

  handleCancel2 = () => {
    // this.setState({
    //   visible2: false,
    // })
  };

  handleDeleteFile = id => {
    const { fileListData } = this.state
    const fileData = [...fileListData]
    fileData.forEach((item, i) => {
      if (+item.id === +id) {
        fileData.splice(i, 1)
      }
    })
    this.setState({
      fileListData: [...fileData],
    })
  };

  handleResetFile = () => {
    this.setState({
      fileListData: [...initialData],
    })
  };

  handleSaveMountData = () => {
    const { routeId, fileListData, chooseId, dataTypes, initialType, chooseId1 } = this.state
    const { dispatch } = this.props
    const ids = fileListData.map(item => {
      return item.id
    })
    const arr = {}
    if (dataTypes === 'db' || (!dataTypes && initialType === 'db')) {
      if (resourceItemDetail.length <= ids.length) {
        resourceItemDetail.forEach((item, j) => {
          const i = item.id
          arr[i] = ids[j]
        })
      } else {
        ids.forEach((item, j) => {
          arr[resourceItemDetail[j].id] = item
        })
      }
    } else {
      for (let i = 0; i < ids.length; i++) {
        arr[i] = ids[i]
      }
    }
    dispatch({
      type: 'informationResource/saveMountData',
      payload: {
        id: routeId,
        resourceMountDto: {
          infoItemIdMap: arr,
          itemId: chooseId || chooseId1,
          type: dataTypes || initialType,
        },
      },
    })
  };

  handleCancelMount = () => {
    const { routeId } = this.state
    const { dispatch } = this.props
    dispatch({
      type: 'informationResource/saveMountData',
      payload: {
        id: routeId,
        resourceMountDto: { infoItemIdMap: {}, itemId: null, type: '' },
      },
    })
  };

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
  };

  isFolderOrExpand = () => {
    const { isExpandOrFolder } = this.state
    this.setState({
      isExpandOrFolder: !isExpandOrFolder,
    })
  };

  render() {
    // const { resourceVisible, resourceFileVisible, confirmLoading, confirmFileLoading } = this.state;
    const {
      catalogManagement: {
        resourceDetail,
        // connectList,
        // connectPagination,
        // connectFileList,
        connectFileLists,
        // connectFilePagination,
        // itemList,
        itemList,
        itemPagnation,
      },
    } = this.props
    const typess = (connectFileLists && connectFileLists.value && connectFileLists.value.datasourceEntity.type) ? (connectFileLists && connectFileLists.value && connectFileLists.value.datasourceEntity.type) : ''
    const connectArr = (connectFileLists && connectFileLists.value && (connectFileLists.value.ftpfileEntityCollection || connectFileLists.value.fileEntityCollection)) ? (connectFileLists.value.ftpfileEntityCollection || connectFileLists.value.fileEntityCollection) : []
    const connectRight = (connectFileLists && connectFileLists.value && connectFileLists.value.structEntityCollection) ? connectFileLists.value.structEntityCollection : []
    // const connectLeft = [] // (connectFileLists && connectFileLists.value && connectFileLists.value.syncEntity) ? connectFileLists.value.syncEntity :
    const {
      // visible1,
      // visible2,
      // connectName,
      // connectType,
      // connectTime,
      isExpandOrFolder,
    } = this.state
    const columns = [
      {
        title: '序号',
        dataIndex: 'id',
      },
      {
        title: '文件名称',
        dataIndex: 'name',
      },
      {
        title: '类型',
        dataIndex: 'type',
      },
      {
        title: '文件大小',
        dataIndex: 'size',
        render: text => {
          return this.setFileSize(text)
        },
      },
      {
        title: '挂接时间',
        dataIndex: 'uploadTime',
        render(text) {
          return moment(text).format('lll')
        },
      },
    ]
    // if (isNodeOperator) {
    // columns.push({
    //   title: '操作',
    //   render: (text, row) => {
    //     return (
    //       <Popconfirm
    //         title={`是否删除${row.fileName || '此行'}?`}
    //         onConfirm={() => this.handleDeleteFile(row.id)}
    //         >
    //         <a>删除</a>
    //       </Popconfirm>
    //     )
    //   },
    // })
    // }
    columns.forEach(item => {
      item.align = 'center'
    })
    const columnsLeft = [
      {
        title: '信息项名称',
        dataIndex: 'resourceItemName',
      },
      {
        title: '数据类型',
        dataIndex: 'resourceType',
      },
      {
        title: '数据长度',
        dataIndex: 'resourceLength',
      },
    ]
    columnsLeft.forEach(item => {
      item.align = 'center'
    })
    const columnsr = [
      {
        title: '字段',
        dataIndex: 'columnName',
      },
      {
        title: '数据类型',
        dataIndex: 'columnType',
      },
      {
        title: '说明',
        dataIndex: 'note',
      },
    ]
    columnsr.forEach(item => {
      item.align = 'center'
    })
    // const list = [
    //   {
    //     id: 0,
    //     fileName: '城市低保标准表(各市第1季度).xlsx',
    //     types: 'Zip',
    //     fileSize: '1.38MB',
    //     connectionTime: 342323333,
    //   },
    //   {
    //     id: 1,
    //     fileName: '农村低保标准表(各地第1季度).json',
    //     types: 'json',
    //     fileSize: '0.12MB',
    //     connectionTime: 3423233,
    //   },
    //   {
    //     id: 2,
    //     fileName: '人口普查数据.xml',
    //     types: 'jpeg',
    //     fileSize: '1.56MB',
    //     connectionTime: 34223233,
    //   },
    // ]
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
      {
        title: '操作',
        render() {
          return <a>删除</a>
        },
      },
    ]
    columns1.forEach(item => {
      item.align = 'center'
    })
    const columnsModal1 = [
      {
        title: 'ID',
        dataIndex: 'id',
        render: (text, row) => {
          return (
            <div>
              <input type="radio" name="mo1" onChange={this.handleChooseChange.bind(null, row)} />
              <span style={{ marginLeft: 10 }}>{text}</span>
            </div>
          )
        },
      },
      {
        title: '数据名称',
        dataIndex: 'name',
      },
      {
        title: '数据类型',
        dataIndex: 'dataType',
      },
      // {
      //   title: '应用系统名称',
      //   dataIndex: 'systemName',
      // },
      {
        title: '接入时间',
        dataIndex: 'createTime',
        render(text) {
          return moment(text).format('lll')
        },
      },
    ]
    columnsModal1.forEach(item => {
      item.align = 'center'
    })
    const columnsModal2 = [
      {
        title: 'ID',
        dataIndex: 'id',
        render(text) {
          return (
            <div>
              <input type="radio" name="mo2" />
              <span style={{ marginLeft: 10 }}>{text}</span>
            </div>
          )
        },
      },
      {
        title: '文件名称',
        dataIndex: 'fileName',
      },
      {
        title: '类型',
        dataIndex: 'type',
      },
      {
        title: '文件大小',
        dataIndex: 'fileSize',
      },
      {
        title: '上传人',
        dataIndex: 'uploader',
      },
      {
        title: '上传时间',
        dataIndex: 'uploadTime',
        render(text) {
          return moment(text).format('lll')
        },
      },
    ]
    columnsModal2.forEach(item => {
      item.align = 'center'
    })
    return (
      <PageHeaderLayout>
        <div className="btncls">
          <Button onClick={this.handleBack} className="fr mr40">
            返回
          </Button>
        </div>
        <Card>
          <div className={styles.form}>
            <h3>
              信息资源代码:
              <span> {resourceDetail && resourceDetail.resourceCode}</span>
              信息资源名称:
              <span> {resourceDetail && resourceDetail.resourceName}</span>
              信息资源提供方:
              <span> {resourceDetail && resourceDetail.resourceProviderDepartment}</span>
              发布时间:
              <span> {resourceDetail && resourceDetail.resourcePublishTime}</span>
            </h3>
            <h3 style={{ display: isExpandOrFolder ? 'none' : 'block' }}>
              提供方代码:
              <span> {resourceDetail && resourceDetail.resourceProviderCode}</span>
              信息属性分类:
              <span> {resourceDetail && resourceDetail.resourceProjectCatalogType}</span>
              信息资源格式:
              <span> {resourceDetail && resourceDetail.resourceFormatClassify}</span>
              信息资源摘要:
              <span> {resourceDetail && resourceDetail.resourceAbstract}</span>
            </h3>
            <Button style={{ marginLeft: 10 }} onClick={this.isFolderOrExpand}>
              {isExpandOrFolder ? '展开' : '收起'}
            </Button>
            <Divider />
          </div>
          <div style={{ marginBottom: 15 }} className="clearfix">
            <div style={{ display: 'inline-block', marginRight: 20 }}>
              <h3>
                关联数据名称:
                <span style={{ marginLeft: 10 }}>{connectFileLists && connectFileLists && connectFileLists.name}</span>
              </h3>
            </div>
          </div>
          <div>
            <Row>
              <Col
                span={typess === 'mysql' ? 11 : 0}
                >
                <Table
                  columns={columnsLeft}
                  dataSource={itemList}
                  pagination={
                    itemPagnation && {
                      ...itemPagnation,
                      showQuickJumper: true,
                      showTotal: total =>
                        `共 ${Math.ceil(
                          total / itemPagnation.pageSize
                        )}页 / ${total}条 数据`,
                    }
                    // false
                  }
                  rowKey={typess === 'mysql' ? 'id' : null}
                  bordered
                  onChange={this.handleFileTableChange}
                  />
              </Col>
              <Col
                span={typess === 'mysql' ? 2 : 0}
                />
              <Col
                span={typess === 'mysql' ? 11 : 0}
                >
                <Table
                  columns={columnsr}
                  dataSource={connectRight}
                  pagination={
                    // connectFilePagination && {
                    //   ...connectFilePagination,
                    //   showQuickJumper: true,
                    //   showTotal: total =>
                    //     `共 ${Math.ceil(
                    //       total / connectFilePagination.pageSize
                    //     )}页 / ${total}条 数据`,
                    // }
                    false
                  }
                  rowKey={typess === 'mysql' ? 'id' : null}
                  bordered
                  onChange={this.handleFileTableChange}
                  />
              </Col>
              <Col
                span={typess === 'mysql' ? 0 : 24}
                >
                <Table
                  columns={columns}
                  dataSource={connectArr}
                  pagination={
                    // connectFilePagination && {
                    //   ...connectFilePagination,
                    //   showQuickJumper: true,
                    //   showTotal: total =>
                    //     `共 ${Math.ceil(
                    //       total / connectFilePagination.pageSize
                    //     )}页 / ${total}条 数据`,
                    // }
                    false
                  }
                  rowKey={typess === 'mysql' ? null : 'id'}
                  bordered
                  onChange={this.handleFileTableChange}
                  />
              </Col>
            </Row>
          </div>
        </Card>
      </PageHeaderLayout>
    )
  }
}
