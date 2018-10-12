import React, { Component } from "react"
import echarts from 'echarts/lib/echarts'
import 'echarts/lib/chart/graph'
import 'echarts/lib/component/legend'
import 'echarts/lib/component/tooltip'
import 'echarts/lib/component/title'

import styles from './index.less'

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
    const { title, tooltip, xAxis, yAxis, series, legend } = this.state
    const echartRelation = echarts.init(document.getElementById('echart-relation'))
    echartRelation.setOption({
      title,
      legend,
      tooltip,
      xAxis,
      yAxis,
      series,
    })
  }

  render() {
    const { width, height } = this.props
    return (
      <div id="echart-relation" style={{ width, height }} className={styles.container} />
    )
  }
}