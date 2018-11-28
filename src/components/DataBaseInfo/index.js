import React, { PureComponent } from 'react'

import Ellipsis from '@/components/Ellipsis'
import styles from './index.less'

export default class DataBaseInfo extends PureComponent {
  state = {
    flag: false,
  };

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
        dataBaseName = '',
        dataBaseType = '',
        dataName = '',
        updateTime = '',
        createUnit = '',
        appsysName = '',
        dutyName = '',
        dutyPhone = '',
        dutyPosition = '',
        describe = '',
      } = {},
    } = this.props
    return (
      <div className={flag ? styles.boxOpen : styles.boxClose}>
        <div>
          <a onClick={this.click} className={styles.button}>
            {flag ? '收起' : '展开'}
          </a>
          <span className="mr40">
            <span className={styles.name}>数据库</span>
            <span className={styles.value1}>
              <Ellipsis lines={1} fullWidthRecognition tooltip>
                {dataBaseName}
              </Ellipsis>
            </span>
          </span>
          <span className="mr40">
            <span className={styles.label}>数据类型</span>
            <span className={styles.value2}>
              <Ellipsis lines={1} fullWidthRecognition tooltip>
                {dataBaseType}
              </Ellipsis>
            </span>
          </span>
          <span className="mr40">
            <span className={styles.label}>数据名称</span>
            <span className={styles.value3}>
              <Ellipsis lines={1} fullWidthRecognition tooltip>
                {dataName}
              </Ellipsis>
            </span>
          </span>
          <span className="mr40">
            <span className={styles.label}>数据更新时间</span>
            <span className={styles.value5}>
              <Ellipsis lines={1} fullWidthRecognition tooltip>
                {updateTime}
              </Ellipsis>
            </span>
          </span>
        </div>
        <div>
          <span className="mr40">
            <span className={styles.label}>建库单位</span>
            <span className={styles.value2}>
              <Ellipsis lines={1} fullWidthRecognition tooltip>
                {createUnit}
              </Ellipsis>
            </span>
          </span>
          <span className="mr40">
            <span className={styles.label}>应用系统名称</span>
            <span className={styles.value2}>
              <Ellipsis lines={1} fullWidthRecognition tooltip>
                {appsysName}
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
