import React, { Component } from 'react'

// 引入 ECharts 主模块
import echarts from 'echarts/lib/echarts'
import 'echarts/lib/chart/tree'
import 'echarts/lib/component/tooltip'
import 'echarts/lib/component/legend'

export default class Tree extends Component{
  state = {
    tooltip: {},
    legend: {},
    series: [],
    id: Math.random().toString().substr(3,10),
  }

  componentDidMount() {
    const { props } = this
    this.setState({
      ...props,
    },() => {
      this.chartRender()
    })
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      ...nextProps,
    }, () => {
      this.chartRender()
    })
  }

  chartRender() {
    const { tooltip, series, legend, onClick = () => {}, id } = this.state
    const echartTree = echarts.init(document.getElementById(`echart-tree-${id}`))
    echartTree.setOption({
      tooltip,
      series,
      legend,
    })
    echartTree.on('click', onClick)
  }

  render() {
    const { width=500, height=500, id } = this.props
    return (
      <div id={`echart-tree-${id}`} style={{ width, height }} />
    )
  }
}