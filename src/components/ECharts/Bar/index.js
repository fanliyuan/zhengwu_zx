import React, { Component } from 'react'
import echarts from 'echarts/lib/echarts'
import 'echarts/lib/chart/bar'
import 'echarts/lib/component/title'
import 'echarts/lib/component/tooltip'
import 'echarts/lib/component/legend'
import 'echarts/lib/component/grid'
import 'echarts/lib/component/axis'

import styles from './index.less'

export default class Bar extends Component {
  state = {
    id: Math.random().toString().substr(3,10),
  }

  componentDidMount() {
    const { props } = this
    this.setState({
      ...props,
    },this.chartRender)
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      ...nextProps,
    },this.chartRender)
  }

  chartRender() {
    const { id, dataset, title, legend, tooltip, xAxis, yAxis, series, onClick=()=>{} } = this.state
    const echartBar = echarts.init(document.getElementById(`echart-bar-${id}`))
    echartBar.setOption({
      title,
      legend,
      tooltip,
      dataset,
      xAxis,
      yAxis,
      series,
    })
    echartBar.on('click', onClick)
  }
  
  render() {
    const { height, width, id } = this.state
    return (
      <div id={`echart-bar-${id}`} style={{width, height}} className={styles.container} />
    )
  }
}