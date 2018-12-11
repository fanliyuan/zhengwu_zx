import React, { PureComponent } from 'react'

import Ellipsis from '@/components/Ellipsis'
import styles from './index.less'

export default class InfoResource extends PureComponent {
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
      infoResource: {
        infoSrcCode = '暂无',
        infoSrcName = '暂无',
        infoSrcProvider = '暂无',
        pubTime = '暂无',
        providerCode = '暂无',
        infoSrcClassify = '暂无',
        infoSrcFormat = '暂无',
        infoSrcSummary = '暂无',
      } = {},
    } = this.props
    return (
      <div className={`${flag ? styles.boxOpen : styles.boxClose} ${styles.box}`}>
        <div style={{ marginBottom: 10 }}>
          <a onClick={this.click} className={styles.button}>
            {flag ? '收起' : '展开'}
          </a>
          <ul className="cf">
            <li>
              <span className={styles.label}>信息资源代码</span>
              <span>
                <Ellipsis lines={1} fullWidthRecognition tooltip>
                  {infoSrcCode}
                </Ellipsis>
              </span>
            </li>
            <li>
              <span>
                <span className={styles.label}>信息资源名称</span>
                <span>
                  <Ellipsis lines={1} fullWidthRecognition tooltip>
                    {infoSrcName}
                  </Ellipsis>
                </span>
              </span>
            </li>
            <li>
              <span className={styles.label}>信息资源提供方</span>
              <span>
                <Ellipsis lines={1} fullWidthRecognition tooltip>
                  {infoSrcProvider}
                </Ellipsis>
              </span>
            </li>
            <li>
              <span className={styles.label}>发布时间</span>
              <span>
                <Ellipsis lines={1} fullWidthRecognition tooltip>
                  {pubTime}
                </Ellipsis>
              </span>
            </li>
            <li>
              <span className={styles.label}>提供方代码</span>
              <span>
                <Ellipsis lines={1} fullWidthRecognition tooltip>
                  {providerCode}
                </Ellipsis>
              </span>
            </li>
            <li>
              <span className={styles.label}>信息属性分类</span>
              <span>
                <Ellipsis lines={1} fullWidthRecognition tooltip>
                  {infoSrcClassify}
                </Ellipsis>
              </span>
            </li>
            <li>
              <span className={styles.label}>信息资源格式</span>
              <span>
                <Ellipsis lines={1} fullWidthRecognition tooltip>
                  {infoSrcFormat}
                </Ellipsis>
              </span>
            </li>
            <li>
              <span className={styles.label}>信息资源摘要</span>
              <span>
                <Ellipsis lines={1} fullWidthRecognition tooltip>
                  {infoSrcSummary}
                </Ellipsis>
              </span>
            </li>
          </ul>
        </div>
      </div>
    )
  }
}
