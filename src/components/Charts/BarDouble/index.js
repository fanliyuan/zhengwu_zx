/*
 * @Author: ChouEric
 * @Date: 2018-07-16 13:28:04
 * @Last Modified by: ChouEric
 * @Last Modified time: 2018-07-16 17:42:32
*/
import React, { Component } from 'react'
import { Chart, Axis, Tooltip, Geom, Legend, Label, Coord } from 'bizcharts'
import DataSet from '@antv/data-set'
import Debounce from 'lodash-decorators/debounce'
import Bind from 'lodash-decorators/bind'
import autoHeight from '../autoHeight'
import styles from '../index.less'

@autoHeight()
class Bars extends Component {
  state = {
    autoHideXLabels: false,
  }

  componentDidMount() {
    window.addEventListener('resize', this.resize)
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.resize)
  }

  handleRoot = n => {
    this.root = n
  }

  handleRef = n => {
    this.node = n
  }

  @Bind()
  @Debounce(400)
  resize() {
    if (!this.node) {
      return
    }
    const canvasWidth = this.node.parentNode.clientWidth
    const { data = [], autoLabel = true } = this.props
    if (!autoLabel) {
      return
    }
    const minWidth = data.length * 30
    const { autoHideXLabels } = this.state

    if (canvasWidth <= minWidth) {
      if (!autoHideXLabels) {
        this.setState({
          autoHideXLabels: true,
        })
      }
    } else if (autoHideXLabels) {
      this.setState({
        autoHideXLabels: false,
      })
    }
  }

  render() {
    const {
      height,
      title,
      forceFit = true,
      // 数据格式
      data = [
        {
          x: '2018-05-24',
          y1: 123,
          y2: 67,
        },
        {
          x: '2018-05-25',
          y1: 62,
          y2: 13,
        },
        {
          x: '2018-05-26',
          y1: 96,
          y2: 135,
        },
        {
          x: '2018-05-27',
          y1: 235,
          y2: 94,
        },
        {
          x: '2018-05-28',
          y1: 231,
          y2: 159,
        },
      ],
      titleMap = {
        y1: 'y1',
        y2: 'y2',
      },
      hasLegend = true,
      padding,
      color = 'key',
      isVertical = false,
      adjustType = 'dodge',
    } = this.props

    // const { autoHideXLabels } = this.state;

    const scale = {
      x: {
        type: 'cat',
      },
      y: {
        min: 0,
      },
    }

    const ds = new DataSet()
    const dv = ds.createView().source(data)
    const value = 'value'

    dv.transform({
      type: 'map',
      callback(row) {
        const newRow = { ...row }
        newRow[titleMap.y1] = row.y1
        newRow[titleMap.y2] = row.y2
        return newRow
      },
    }).transform({
      type: 'fold',
      fields: [titleMap.y1, titleMap.y2], //
      key: 'key', // key字段
      value: 'value', // value字段
    })

    return (
      <div className={styles.chart} style={{ height }} ref={this.handleRoot}>
        <div ref={this.handleRef}>
          {title && <h4 style={{ marginBottom: 20 }}>{title}</h4>}
          <Chart
            scale={scale}
            height={title ? height - 41 : height}
            forceFit={forceFit}
            data={dv}
            padding={padding || 'auto'}
            >
            {isVertical && <Coord transpose />}
            <Axis name="key" />
            <Axis name="value" />
            {hasLegend && <Legend name="key" />}
            <Tooltip />
            <Geom
              type="interval"
              position="x*value"
              color={color}
              adjust={[{ type: adjustType, marginRatio: 1 / 32 }]}
              >
              <Label content={value} offset={8} />
            </Geom>
          </Chart>
        </div>
      </div>
    )
  }
}

export default Bars
