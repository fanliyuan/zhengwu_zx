import React, { Component, Fragment } from 'react'

import styles from './index.less'

export default class InfoSourceDetail extends Component {
  render() {
    const {
      infoSourceDetail: {
        infoSrcCode,
        infoSrcName,
        infoSrcClassify,
        infoSrcProvider,
        infoSrcProviderCode,
        infoSrcProviderDepartment,
        updateCircle,
        pubDate,
        shareDate,
        infoSrcType,
        linkSrcCode,
        infoItem,
        infoSrcSummary,
      } = {},
    } = this.props
    return (
      <Fragment>
        <h2>信息资源详情</h2>
        <div className={styles.detail}>
          <div>
            <span className="colon">信息资源代码</span>
            <span>{infoSrcCode}</span>
          </div>
          <div>
            <span className="colon">信息资源名称</span>
            <span>{infoSrcName}</span>
          </div>
          <div>
            <span className="colon">信息资源属性分类</span>
            <span>{infoSrcClassify}</span>
          </div>
          <div>
            <span className="colon">信息资源提供方</span>
            <span>{infoSrcProvider}</span>
          </div>
          <div>
            <span className="colon">提供方代码</span>
            <span>{infoSrcProviderCode}</span>
          </div>
          <div>
            <span className="colon">提供方内部部门</span>
            <span>{infoSrcProviderDepartment}</span>
          </div>
          <div>
            <span className="colon">更新周期</span>
            <span>{updateCircle}</span>
          </div>
          <div>
            <span className="colon">发布日期</span>
            <span>{pubDate}</span>
          </div>
          <div>
            <span className="colon">共享日期</span>
            <span>{shareDate}</span>
          </div>
          <div>
            <span className="colon">信息资源格式</span>
            <span>{infoSrcType}</span>
          </div>
          <div>
            <span className="colon">关联资源代码</span>
            <span>{linkSrcCode}</span>
          </div>
          <div>
            <span className="colon">信息项</span>
            <span>{infoItem}</span>
          </div>
          <div>
            <span className="colon">信息资源摘要</span>
            <span>{infoSrcSummary}</span>
          </div>
        </div>
      </Fragment>
    )
  }
}
