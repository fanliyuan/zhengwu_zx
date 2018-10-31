/*
 * @Author: ChouEric
 * @Date: 2018-07-25 10:32:46
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2018-10-31 10:51:32
 * @Description: FTP步骤2
 */
import React, { Component, Fragment } from 'react'
import { Link } from 'dva/router'
import { Input, Select, Button, Tooltip, Icon, InputNumber } from 'antd'

import styles from './index.less'

const { Option } = Select

export default class Step2 extends Component {
  state = {}

  render() {
    const { mode = 0, rate = 0 } = this.state

    return (
      <Fragment>
        <div className={styles.row} style={{ marginTop: 40 }}>
          <span className={styles.label}>同步模式</span>
          <Select
            value={mode}
            onChange={value => this.setState({ mode: value })}
            className={styles.input}
            >
            <Option value={0} key={0}>
              增量
            </Option>
            <Option value={1} key={1}>
              全量
            </Option>
          </Select>
        </div>
        <div className={styles.row} style={{ marginTop: 40 }}>
          <span className={styles.label}>同步频率</span>
          <Select
            value={rate}
            onChange={value => this.setState({ rate: value })}
            className={styles.input}
            >
            <Option value={0} key={0}>
              定时
            </Option>
            <Option value={1} key={1}>
              实时
            </Option>
            {/* <Option value={2} key={2}>
              手动
            </Option> */}
          </Select>
        </div>
        {rate === 0 ? (
          <div className={styles.row} style={{ marginTop: 40 }}>
            <span className={styles.label}>
              同步频率
              <Tooltip title="“*” 代表取值范围内的全部数字">
                <Icon type="question-circle-o" />
              </Tooltip>
            </span>
            <Input className={styles.time} suffix="分钟" />
            <Input className={styles.time} suffix="小时" />
            <Input className={styles.time} suffix="天" />
            <Input className={styles.time} suffix="月" />
            <Input className={styles.time} prefix="星期" />
          </div>
        ) : null}
        <div className={styles.row}>
          <span className={styles.label}>
            自动停止
            <Tooltip title="0代表用不停止">
              <Icon type="question-circle-o" />
            </Tooltip>
          </span>
          <span>
            报错<InputNumber max={100} min={0} defaultValue={0} className={styles.number} />次后自动停止服务
          </span>
        </div>
        <div className="btnclsb">
          <Link to="/dataSourceManagement/FTP/three">
            <Button type="primary">提交</Button>
          </Link>
        </div>
      </Fragment>
    )
  }
}
