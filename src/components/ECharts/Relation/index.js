import React, { Component } from "react"
import echarts from 'echarts/lib/echarts'
import 'echarts/lib/chart/graph' 
import 'echarts/lib/chart/lines'
import 'echarts/lib/component/tooltip'
import 'echarts/lib/component/title'

export default class Relation extends Component {
  state = {
    title: {},
    tooltip: {},
    xAxis: {},
    yAxis: {},
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
    const { title, tooltip, xAxis, yAxis, series } = this.state
    const echartRelation = echarts.init(document.getElementById('echart-relation'))
    echartRelation.setOption({
      title,
      tooltip,
      xAxis,
      yAxis,
      series,
    })
  }

  render() {
    const { width=500, height=500 } = this.props
    return (
      <div id="echart-relation" style={{ width, height }} />
    )
  }
}