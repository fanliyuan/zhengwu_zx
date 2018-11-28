import React, { PureComponent } from 'react'

import Ellipsis from '@/components/Ellipsis'
import styles from './index.less'

export default class DataFileInfo extends PureComponent {
  state = {
    flag: false,
  }

  click = () => {
    const { flag } = this.state
    this.setState({
      flag: !flag,
    })
  };

  render() {
    const { flag } = this.state
    const {
      dataBaseInfo: {
        dataType = '',
        name = '',
        createUnit = '',
        dutyName = '',
        dutyPhone = '',
        dutyPosition = '',
        describe = '',
      } = {},
    } = this.props
    return (
      <div className={flag ? styles.boxOpen : styles.boxClose}>
        <div style={{ marginBottom: 10 }}>
          <a onClick={this.click} className={styles.button}>
            {flag ? '收起' : '展开'}
          </a>
          <span className="mr40">
            <span className={styles.label}>数据类型</span>
            <span className={styles.value2}>
              <Ellipsis lines={1} fullWidthRecognition tooltip>
                {dataType}
              </Ellipsis>
            </span>
          </span>
          <span className="mr40">
            <span className={styles.label}>数据名称</span>
            <span className={styles.value3}>
              <Ellipsis lines={1} fullWidthRecognition tooltip>
                {name}
              </Ellipsis>
            </span>
          </span>
        </div>
        <div>
          <span className="mr40">
            <span className={styles.label}>文件所属单位</span>
            <span className={styles.value2}>
              <Ellipsis lines={1} fullWidthRecognition tooltip>
                {createUnit}
              </Ellipsis>
            </span>
          </span>
          <span className="mr40">
            <span className={styles.label}>负责人姓名</span>
            <span className={styles.value2}>
              <Ellipsis lines={1} fullWidthRecognition tooltip>
                {dutyName}
              </Ellipsis>
            </span>
          </span>
          <span className="mr40">
            <span className={styles.label}>负责人手机号</span>
            <span className={styles.value2}>
              <Ellipsis lines={1} fullWidthRecognition tooltip>
                {dutyPhone}
              </Ellipsis>
            </span>
          </span>
          <span className="mr40">
            <span className={styles.label}>负责人职位</span>
            <span className={styles.value2}>
              <Ellipsis lines={1} fullWidthRecognition tooltip>
                {dutyPosition}
              </Ellipsis>
            </span>
          </span>
          <span className="mr40">
            <span className={styles.label}>数据描述</span>
            <span className={styles.value2}>
              <Ellipsis lines={1} fullWidthRecognition tooltip>
                {describe}
              </Ellipsis>
            </span>
          </span>
        </div>
      </div>
    )
  }
}
