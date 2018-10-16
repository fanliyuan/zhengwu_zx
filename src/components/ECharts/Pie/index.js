import React, { Component } from 'react'
import echarts from 'echarts/lib/echarts'
import 'echarts/lib/chart/pie'
import 'echarts/lib/component/tooltip'
import 'echarts/lib/component/legend'

import styles from './index.less'

export default class Pie extends Component {
  state = {
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
    const { title, legend, tooltip, series, onClick = () => {}, id } = this.state
    const echartPie = echarts.init(document.getElementById(`echart-pie-${id}`))
    echartPie.setOption({
      title,
      legend,
      tooltip,
      series,
    })
    echartPie.on('click',onClick)
  }

  render() {
    const { width, height, id } = this.state
    return <div id={`echart-pie-${id}`} style={{ width, height }} className={styles.container} />
  }
}