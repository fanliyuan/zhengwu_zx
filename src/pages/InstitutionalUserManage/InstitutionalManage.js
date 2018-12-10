import React, { Component } from 'react'
import { Table, Button, Input, Card, DatePicker, Popconfirm, Select, message } from 'antd'
import moment from 'moment'
import { Throttle, Bind } from 'lodash-decorators'
import { connect } from 'dva'
import { routerRedux } from 'dva/router'
import { format0, format24 } from '../../utils/utils'

import styles from './InstitutionalManage.less'
import PageHeaderLayout from '@/components/PageHeaderWrapper'

const { Option } = Select
const { RangePicker } = DatePicker
@connect(({ Institution }) => ({
  Institution,
}))
export default class InstitutionalManage extends Component {
  state = {
    provice:"所属省",
    city:"所属市",
    area:"所属区域",
    institutionName:"",
    times:[],
  }

  componentDidMount = () => {
    const { dispatch } = this.props
    dispatch({
      type:'Institution/querys',
      payload:{pageNum:1,pageSize:10},
    })
    dispatch({
      type:'Institution/getOneLevel',
    })
  }

  provinceSelectChange = () => {
    // this.setState({
    //   province:val,
    // })
  }

  handleAdd = () => {
    const { dispatch } = this.props
    dispatch({
      type:'Institution/editId',
      payload:{deptId:-1},
    })
    dispatch(routerRedux.push('/institutionalUserManage/addInstitution'))
  }

  handleDelete =  async (id) => {
    const { dispatch } = this.props
    await dispatch({
      type:'Institution/deleteItem',
      payload:{pkId:+id},
    })
  }

  handleEdit = (deptId) => {
    const { dispatch } = this.props
    dispatch({
      type:'Institution/editId',
      payload:{deptId:+deptId},
    })
    dispatch(routerRedux.push('/institutionalUserManage/addInstitution'))
  }

  handleTableChange = pagination => {
    const { institutionName, times, provice, city, area } = this.state // provice, city, area,
    // const proCityAreaInfo = provice
    const timeValue = times.map(item => {
      if(moment.isMoment(item)){
        return item.format('x')
      }
      else {
        return ''
      }
    })
    let citys = 0
    let areas = 0
    const provices  = (provice === '所属省' ? undefined : provice)
    if(city === '所属市' && provices){
      message.info('市必选')
      return 
    }
    else if (city !== '所属市') {
      citys = city 
    }
    if(area === '所属区域' && provices){
      message.info('区域必选')
      return 
    }
    else if(area !== '所属区域'){
      areas = area 
    }
    const info = provices ? (`${provices}|${  citys}|${  areas}`) : undefined 
    const { dispatch } = this.props
    dispatch({
      type:'Institution/querys',
      payload:{pageNum:pagination.current,pageSize:pagination.pageSize, proCityAreaInfo: info, deptName:institutionName || undefined,startTime:timeValue[0] ? format0(+timeValue[0]) : undefined,endTime:+timeValue[1] ? format24(+timeValue[1]) : undefined},
    })
  }

  handleProChange = (val) => {
    this.setState({
      provice:val,
      city:"所属市",
      area:"所属区域",
    })
    const params = +val === "所属省" ? '' : +val.slice(0,val.indexOf('|'))
    const { dispatch } = this.props
    dispatch({
      type:'Institution/getTwoLevel',
      payload:{provinceId:params},
    })
  }

  handleCityChange = (val) => {
    this.setState({
      city:val,
      area:"所属区域",
    })
    const params = +val === "所属市" ? '' : +val.slice(0,val.indexOf('|'))
    const { dispatch } = this.props
    dispatch({
      type:'Institution/getThreeLevel',
      payload:{cityId:params},
    })
  }

  handleAreaChange = (val) => {
    this.setState({
      area:val,
    })
  }

  handleTimeChange = val => {
    this.setState({
      times:val,
    })
  }

  handleInstitutionChange = e => {
    this.setState({
      institutionName:e.target.value,
    })
  }

  handleResetBtn = () => {
    const { dispatch } = this.props
    this.setState({
      provice:"所属省",
      city:"所属市",
      area:"所属区域",
      institutionName:"",
      times:[],
    })
    dispatch({
      type:'Institution/querys',
      payload:{pageNum:1,pageSize:10},
    })
  }

  @Bind()
  @Throttle(1000)
  handleSearchBtn(){
    const { institutionName, times, provice, city, area } = this.state // provice, city, area,
    // const proCityAreaInfo = provice
    const timeValue = times.map(item => {
      if(moment.isMoment(item)){
        return item.format('x')
      }
      else {
        return ''
      }
    })
    let citys = 0
    let areas = 0
    const provices  = (provice === '所属省' ? undefined : provice)
    if(city === '所属市' && provices){
      message.info('市必选')
      return 
    }
    else if (city !== '所属市') {
      citys = city 
    }
    if(area === '所属区域' && provices){
      message.info('区域必选')
      return 
    }
    else if(area !== '所属区域'){
      areas = area 
    }
    const info = provices ? (`${provices}|${  citys}|${  areas}`) : undefined 
    const { dispatch } = this.props
    
    dispatch({
      type:'Institution/querys',
      payload:{pageNum:1,pageSize:10, proCityAreaInfo: info, deptName:institutionName || undefined,startTime:timeValue[0] ? format0(+timeValue[0]) : undefined,endTime:+timeValue[1] ? format24(+timeValue[1]) : undefined},
    })
  }

  render() {
    const { city, provice, area, institutionName, times } = this.state
    const { Institution:{list, paginations, provices, cities, areas} } = this.props
    const ProData = provices.map(item => {
      return (<Option value={`${item.provinceId }|${ item.name}`} key={item.id}>{item.name}</Option>)
    })
    const cityData = cities.map(item => {
      return (<Option value={`${ item.cityId}|${item.name }`} key={item.id}>{item.name}</Option>)
    })
    const areaData = areas.map(item => {
      return (<Option value={`${ item.areaId}|${item.name }`} key={item.id}>{item.name}</Option>)
    })
    // const pagination = { pageSize:10,current:1 }
    const columns = [
      {
        title: '机构名称',
        dataIndex: 'deptName',
        align: 'left',
      },
      {
        title: '联系人',
        dataIndex: 'chargeUser',
      },
      {
        title: '联系人手机号',
        dataIndex: 'chargePhone',
      },
      // {
      //   title: '排序',
      //   dataIndex: 'deptOrder',
      // },
      {
        title: '所属省市区',
        dataIndex: 'proCityAreaInfo',
      },
      {
        title: '更新时间',
        dataIndex: 'updateTime',
        render(text) {
          return text ? moment(+text).format('lll') : ''
        },
      },
      {
        title: '操作',
        render:(text,row) => {
          return (
            <div>
              <span className={styles.editBtn} onClick={this.handleEdit.bind(null,row.deptId)}>
                修改
              </span>
              <Popconfirm title="是否删除当前行" onConfirm={() => this.handleDelete(row.deptId)}>
                <span className={styles.editBtn} style={{ marginRight: 16 }}>删除</span>
              </Popconfirm>
            </div>
          )
        },
      },
    ]
    columns.forEach(item => {
      if (item.title !== '机构名称') {
        item.align = 'center'
      }
    })
    return (
      <PageHeaderLayout>
        <Card>
          <div className={styles.form}>
            <Input placeholder="机构名称" style={{ width: 150, marginRight: 20 }} value={institutionName} onChange={this.handleInstitutionChange} />
            {/* <Cascader options={data2} placeholder="所在省市区" style={{ marginRight: 20 }} />, */}
            <Select value={provice} onChange={this.handleProChange} style={{width:120,marginRight:20}} placeholder="所属省">
              {ProData}
            </Select>
            <Select value={city} onChange={this.handleCityChange} style={{width:120,marginRight:20,display:provice !== "所属省"? 'inline-block' : 'none'}} placeholder="所属市">
              {cityData}
            </Select>
            <Select value={area} onChange={this.handleAreaChange} style={{width:120,marginRight:20,display:city !== "所属市" ? 'inline-block' : 'none'}} placeholder="所属区域">
              {areaData}
            </Select>
            <RangePicker style={{ marginRight: 20, width:200 }} value={times} onChange={this.handleTimeChange} />
            <Button className='mr16' type="primary" onClick={this.handleSearchBtn}>搜索</Button>
            <Button onClick={this.handleResetBtn}>重置</Button>
          </div>
          <div className={styles.createBtn}>
            <Button icon="plus" type="primary" onClick={this.handleAdd}>
              新建
            </Button>
          </div>
          <div>
            <Table columns={columns} dataSource={list} pagination={paginations && {...paginations, showQuickJumper: true, showTotal: (total) => `共 ${Math.ceil(total / paginations.pageSize)}页 / ${total}条 数据`}} rowKey="deptId" onChange={this.handleTableChange} bordered />
          </div>
        </Card>
      </PageHeaderLayout>
    )
  }
}
