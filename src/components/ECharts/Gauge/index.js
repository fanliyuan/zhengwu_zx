import React, { Component } from 'react'
import echarts from 'echarts/lib/echarts'
import 'echarts/lib/chart/gauge'
import 'echarts/lib/chart/pie'
import 'echarts/lib/component/tooltip'
import 'echarts/lib/component/legend'
import 'echarts/lib/component/title'

import styles from './index.less'

export default class Guage extends Component {
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
    },() => {
      this.chartRender()
    })
  }

  chartRender() {
    const { title, tooltip, legend, series, onClick = () => {}, id } = this.state
    const echartGuage = echarts.init(document.getElementById(`echart-gauge-${id}`))
    echartGuage.setOption({
      title,
      tooltip,
      legend,
      series,
    })
    echartGuage.on('click', onClick)
  }

  render() {
    const { width, height, id, style } = this.state
    return (
      <div id={`echart-gauge-${id}`} style={{ ...style, width, height }} className={styles.container} />
    )
  }
}