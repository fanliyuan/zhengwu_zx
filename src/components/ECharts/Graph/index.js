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
    const { title, tooltip, series, legend, onClick = () => {}, id } = this.state
    const echartRelation = echarts.init(document.getElementById(`echart-relation-${id}`))
    echartRelation.setOption({
      title,
      legend,
      tooltip,
      series,
    })
    echartRelation.on('click', onClick)
  }

  render() {
    const { width, height, id } = this.state
    return (
      <div id={`echart-relation-${id}`} style={{ width, height }} className={styles.container} />
    )
  }
}