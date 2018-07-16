/*
 * @Author: ChouEric
 * @Date: 2018-07-16 13:28:04
 * @Last Modified by: ChouEric
 * @Last Modified time: 2018-07-16 14:24:20
*/
import React, { Component } from 'react';
import { Chart, Axis, Tooltip, Geom, Legend } from 'bizcharts';
import DataSet from '@antv/data-set';
import Debounce from 'lodash-decorators/debounce';
import Bind from 'lodash-decorators/bind';
import autoHeight from '../autoHeight';
import styles from '../index.less';

@autoHeight()
class Bars extends Component {
  state = {
    autoHideXLabels: false,
  };

  componentDidMount() {
    window.addEventListener('resize', this.resize);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.resize);
  }

  handleRoot = n => {
    this.root = n;
  };

  handleRef = n => {
    this.node = n;
  };

  @Bind()
  @Debounce(400)
  resize() {
    if (!this.node) {
      return;
    }
    const canvasWidth = this.node.parentNode.clientWidth;
    const { data = [], autoLabel = true } = this.props;
    if (!autoLabel) {
      return;
    }
    const minWidth = data.length * 30;
    const { autoHideXLabels } = this.state;

    if (canvasWidth <= minWidth) {
      if (!autoHideXLabels) {
        this.setState({
          autoHideXLabels: true,
        });
      }
    } else if (autoHideXLabels) {
      this.setState({
        autoHideXLabels: false,
      });
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
          name: 'London',
          'Jan.': 18.9,
          'Feb.': 28.8,
          'Mar.': 39.3,
          'Apr.': 81.4,
          May: 47,
          'Jun.': 20.3,
          'Jul.': 24,
          'Aug.': 35.6,
        },
        {
          name: 'Berlin',
          'Jan.': 12.4,
          'Feb.': 23.2,
          'Mar.': 34.5,
          'Apr.': 99.7,
          May: 52.6,
          'Jun.': 35.5,
          'Jul.': 37.4,
          'Aug.': 42.4,
        },
      ],
      hasLegend = true,
      padding,
      color = 'name',
    } = this.props;

    // const { autoHideXLabels } = this.state;

    const scale = {
      x: {
        type: 'cat',
      },
      y: {
        min: 0,
      },
    };

    const ds = new DataSet();
    const dv = ds.createView().source(data);
    const key = 'key';
    const value = 'value';
    const fields = Object.keys(data[0]).filter(item => item !== 'name');
    dv.transform({
      type: 'fold',
      fields, // 展开字段集
      key, // key字段
      value, // value字段
    });

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
            <Axis name="key" />
            <Axis name="value" />
            {hasLegend && <Legend />}
            <Tooltip crosshairs={{ type: 'y' }} />
            <Geom
              type="interval"
              position={`${key}*${value}`}
              color={color}
              adjust={[{ type: 'dodge', marginRatio: 1 / 32 }]}
            />
          </Chart>
        </div>
      </div>
    );
  }
}

export default Bars;
