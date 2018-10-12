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
    const { tooltip, series, legend, onClick = () => {} } = this.state
    const echartTree = echarts.init(document.getElementById('echart-tree'))
    echartTree.setOption({
      tooltip,
      series,
      legend,
    })
    echartTree.on('click', onClick)
  }

  render() {
    const { width=500, height=500 } = this.props
    return (
      <div id="echart-tree" style={{ width, height }} />
    )
  }
}