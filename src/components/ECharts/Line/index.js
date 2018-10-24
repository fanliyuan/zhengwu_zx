import React, { Component } from 'react'
import echarts from 'echarts/lib/echarts'
import 'echarts/lib/chart/line'
import 'echarts/lib/chart/bar'
import 'echarts/lib/component/title'
import 'echarts/lib/component/tooltip'
import 'echarts/lib/component/legend'
import 'echarts/lib/component/grid'
import 'echarts/lib/component/axis'

import styles from './index.less'

export default class Line extends Component {
  state = {
    id: Math.random().toString().substr(3,10),
  }

  componentDidMount() {
    const { props } = this
    this.setState({
      ...props,
    }, () => {
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
    const { title, tooltip, legend, series, grid, xAxis, yAxis, dataset, onClick = () => {}, id } = this.state
    const echartLine = echarts.init(document.getElementById(`echart-line-${id}`))
    echartLine.setOption({
      title,
      legend,
      tooltip,
      grid,
      xAxis,
      yAxis,
      series,
      dataset,
    })
    echartLine.on('click', onClick)
  }

  render() {
    const { width, height, id } = this.state
    return (
      <div id={`echart-line-${id}`} style={{width, height}} className={styles.container} />
    )
  }
}