/*
 * @Author: ChouEric
 * @Date: 2018-07-03 16:54:02
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2018-10-18 13:30:28
 * @描述: 监控告警 -- 节点系统监控  -- 统称监控详情 ( 系统告警 和 -- 系统告警设置 ) 

*/
import React, { Component } from 'react'
import { Link } from 'dva/router'
import Line from 'components/ECharts/Line'
import { Tabs, Table, Input, Select, Cascader, Button, DatePicker, Form, message, Card } from 'antd'
import moment from 'moment'

// import { TimelineChart } from 'components/Charts'
import PageHeaderLayout from '../../layouts/PageHeaderLayout'
import { getRandom } from '../../utils/faker'
import styles from './Node.less'

const lineData = [
  ['time', '13:00', '13:05', '13:10', '13:15', '13:20', '13:25', '13:30', '13:35'],
  ['移动', 220, 182, 191, 134, 150, 120, 110, 125],
  // ['电信', 120, 110, 125, 145, 122, 165, 122, 220],
  // ['联通', 123, 123, 123, 7, 342, 32, 34, 95],
]
function getLineSerie({color = 'red', color1 = 'rgba(0,0,0,0)'}) {
  return {
    type: 'line',
    symbol: 'circle',
    symbolSize: 5,
    lineStyle: {
      normal: {
        width: 2,
      },
    },
    areaStyle: {
      normal: {
        color: {
          type: 'linear',
          x: 0,
          y: 0,
          x2: 0,
          y2: 1,
          colorStops: [{
            offset: 0,
            color, // 0% 处的颜色
            opacity: 1,
          }, {
            offset: 1,
            color: color1, // 100% 处的颜色
          }],
          globalCoord: false, // 缺省为 false
        },
      },
    },
    itemStyle: {
      normal: {
        color,
        width: 2,
      },
    },
    seriesLayoutBy: 'row',
  }
}
   // 组装折线图的配置
const lineOption = {
backgroundColor: '#424956',
tooltip: {
  trigger: 'axis',
  axisPointer: {
    lineStyle: {
      color: '#57617B',
    },
  },
},
grid: {
  left: '3%',
  right: '4%',
  bottom: '3%',
  containLabel: true,
},
dataset: {
  source: lineData,
},
xAxis: [{
  type: 'category',
  splitLine:{
    show:true,
  },
  boundaryGap: false,
  axisLine: {
    lineStyle: {
      color: '#57617B',
    },
  },
}],
yAxis: [{
  type: 'value',
  name: '单位（%）',
  axisTick: {
    show: false,
  },
  axisLine: {
    lineStyle: {
      color: '#57617B',
    },
  },
  axisLabel: {
    margin: 10,
    textStyle: {
      fontSize: 14,
    },
  },
  splitLine: {
    lineStyle: {
      color: '#57617B',
      type: 'dashed',
      opacity: 0.5,
    },
  },
}],
series: [
  getLineSerie({color: 'blue'}), 
  // getLineSerie({color: 'red'}),
  // getLineSerie({color: 'green'}),
],
}
const usageType = ['CPU利用率', '内存利用率', '硬盘利用率', '网络利用率']
const dataOption = []
for (let i = 0; i < 178; i++) {
  dataOption.push({
    id: i,
    name: usageType[Math.floor(Math.random() * 4)] + i,
    target: usageType[Math.floor(Math.random() * 4)].replace('利用率', ''),
    threshold: Math.floor(Math.random() * 60 + 40),
    period: '5分钟',
    boolean: Math.round(Math.random()) === 1 ? '有效' : '无效',
  })
}
const dataWarning = []
for (let i = 0; i < 145; i++) {
  dataWarning.push({
    id: i,
    time: moment(new Date() - 1000 * 60 * 60 * 15 * i, 'x').format('lll'),
    name: usageType[Math.floor(Math.random() * 4)],
    value: Math.floor(Math.random() * 30 + 40),
  })
}

const CPUData = []
const memoryData = []
const diskData = []
const newworkData = []
for (let i = 0; i < 50; i++) {
  CPUData.push({
    x: +Date.now() + 5000 * i - 5000 * 365,
    y1: getRandom(10, 2),
  })
  memoryData.push({
    x: +Date.now() + 5000 * i - 5000 * 365,
    y1: getRandom(8, 2),
  })
  diskData.push({
    x: +Date.now() + 5000 * i - 5000 * 365,
    y1: Math.round(Math.random()) + getRandom(9, 0) * 0.1,
  })
  newworkData.push({
    x: +Date.now() + 5000 * i - 5000 * 365,
    y1: getRandom(20, 0),
  })
}

export default class Node extends Component {
  state = {
    query1: {
      warningName: '',
      warningTime: [],
    },
    query2: {
      dataOriginName: '',
      serverAddress: '',
      organization: [],
      state: -1,
    },
    isChanged1: false,
    isChanged2: false,
    defaultActiveKey: 'system',
    loading: false,
  }

  componentWillMount = () => {
    this.setState({
      defaultActiveKey: this.props.location.state || 'system',
      loading: true,
    })
    setTimeout(() => {
      this.setState({
        loading: false,
      })
    }, 300)
  }

  warningNameChange = e => {
    const { query1 } = this.state
    this.setState({
      query1: {
        ...query1,
        warningName: e.target.value,
      },
      isChanged1: true,
    })
  }

  warningTimeChange = value => {
    const { query1 } = this.state
    this.setState({
      query1: {
        ...query1,
        warningTime: value,
      },
      isChanged1: true,
    })
  }

  search = () => {
    if (!this.state.isChanged1) return false
    message.success('this.state.query1')
  }

  dataOriginNameChange = e => {
    const { query2 } = this.state
    this.setState({
      query2: {
        ...query2,
        dataOriginName: e.target.value,
      },
      isChanged2: true,
    })
  }

  serverAddressChagne = e => {
    const { query2 } = this.state
    this.setState({
      query2: {
        ...query2,
        serverAddress: e.target.value,
      },
      isChanged2: true,
    })
  }

  organizationChange = value => {
    const { query2 } = this.state
    this.setState({
      query2: {
        ...query2,
        organization: value,
      },
      isChanged2: true,
    })
  }

  stateChange = value => {
    const { query2 } = this.state
    this.setState({
      query2: {
        ...query2,
        state: value,
      },
      isChanged2: true,
    })
  }

  searchOption = () => {
    if (!this.state.isChanged2) {
      return false
    }
    message.success('this.state.query2')
  }

  render() {
    const {
      query1: { warningName, warningTime },
      query2: { dataOriginName, serverAddress, organization, state },
      defaultActiveKey,
      loading,
    } = this.state
    const stateList = [
      {
        value: -1,
        lable: '全部状态',
      },
      {
        value: 0,
        lable: '连接正常',
      },
      {
        value: 1,
        lable: '连接失败',
      },
    ]
    const organizationList = [
      {
        value: 101,
        label: '省直属',
        children: [
          {
            value: 101001,
            label: '省公安厅',
          },
          {
            value: 101002,
            label: '省设计院',
          },
        ],
      },
      {
        value: 102,
        label: '广州市',
        children: [
          {
            value: 102001,
            label: '市公安局',
          },
          {
            value: 102002,
            label: '市财政局',
          },
          {
            value: 102003,
            label: '市交通局',
          },
        ],
      },
    ]
    const columnsWarning = [
      {
        title: '告警时间',
        dataIndex: 'time',
      },
      {
        title: '告警名称',
        dataIndex: 'name',
      },
      {
        title: '当前值',
        dataIndex: 'value',
      },
    ]
    columnsWarning.forEach(item => {
      item.align = 'center'
    })
    const columnsOption = [
      {
        title: '告警名称',
        dataIndex: 'name',
      },
      {
        title: '监控对象',
        dataIndex: 'target',
      },
      {
        title: '告警阈值',
        dataIndex: 'threshold',
      },
      {
        title: '检测周期',
        dataIndex: 'period',
      },
      {
        title: '是否有效',
        dataIndex: 'boolean',
      },
      {
        title: '操作',
        dataIndex: 'operation',
        render: (text, row) => {
          return <Link to={`/monitor/editOption/${row.id}`}>修改</Link>
        },
      },
    ]
    columnsOption.forEach(item => {
      item.align = 'center'
    })

    const stateComs = stateList.map(item => {
      return (
        <Select.Option value={item.value} key={item.value}>
          {item.lable}
        </Select.Option>
      )
    })

    return (
      <PageHeaderLayout>
        <Tabs defaultActiveKey={defaultActiveKey}>
          <Tabs.TabPane tab="系统监控" key="system">
            <div style={{ textAlign: 'center' }}>
              <Card
                loading={loading}
                title="CPU利用率(当前值4%)"
                style={{ width: 600, display: 'inline-block', marginRight: 100 }}
                >
                {/* <TimelineChart
                  data={CPUData}
                  titleMap={{ y1: 'CPU利用率' }}
                  height={300}
                  showArea
                  /> */}
                <Line
                  {...lineOption}
                  height={300}
                  />
              </Card>
              <Card
                loading={loading}
                title="内存使用(当前值0.5G，6.3%，峰值1G，12%)"
                style={{ width: 600, display: 'inline-block' }}
                >
                {/* <TimelineChart
                  data={memoryData}
                  titleMap={{ y1: '内存使用' }}
                  height={300}
                  showArea
                  /> */}
                <Line
                  {...lineOption}
                  height={300}
                  />
              </Card>
            </div>
            <div style={{ textAlign: 'center', marginTop: 40 }}>
              <Card
                loading={loading}
                title="硬盘使用(当前值30T，6%；峰值40T，8%)"
                style={{ width: 600, display: 'inline-block', marginRight: 100 }}
                >
                {/* <TimelineChart
                  data={diskData}
                  titleMap={{ y1: '硬盘使用' }}
                  height={300}
                  showArea
                  /> */}
                <Line
                  {...lineOption}
                  height={300}
                  />
              </Card>
              <Card
                loading={loading}
                title="网络利用率(当前值8%)"
                style={{ width: 600, display: 'inline-block' }}
                >
                {/* <TimelineChart
                  data={newworkData}
                  titleMap={{ y1: '网络利用率' }}
                  height={300}
                  showArea
                  /> */}
                <Line
                  {...lineOption}
                  height={300}
                  />
              </Card>
            </div>
          </Tabs.TabPane>
          <Tabs.TabPane tab="系统告警" key="warning">
            <div className={styles.layout}>
              <Form className={styles.search}>
                <Input
                  value={warningName}
                  onChange={this.warningNameChange}
                  className={styles.input}
                  />
                <DatePicker.RangePicker
                  value={warningTime}
                  onChange={this.warningTimeChange}
                  className={styles.date}
                  />
                <Button type="primary" icon="search" onClick={this.search}>
                  搜索
                </Button>
              </Form>
              <Table columns={columnsWarning} dataSource={dataWarning} bordered rowKey="id" />
            </div>
          </Tabs.TabPane>
          <Tabs.TabPane tab="系统告警设置" key="option">
            <div className={styles.layout}>
              <Form className={styles.search}>
                <Input
                  value={dataOriginName}
                  onChange={this.dataOriginNameChange}
                  className={styles.input}
                  />
                <Input
                  value={serverAddress}
                  onChange={this.serverAddressChagne}
                  className={styles.input}
                  />
                <Cascader
                  options={organizationList}
                  value={organization}
                  onChange={this.organizationChange}
                  placeholder="请选择机构"
                  className={styles.select}
                  />
                <Select value={state} onChange={this.stateChange} className={styles.select}>
                  {stateComs}
                </Select>
                <Button type="primary" icon="search" onClick={this.searchOption}>
                  搜索
                </Button>
              </Form>
              <Table columns={columnsOption} dataSource={dataOption} bordered rowKey="id" />
            </div>
          </Tabs.TabPane>
        </Tabs>
      </PageHeaderLayout>
    )
  }
}
