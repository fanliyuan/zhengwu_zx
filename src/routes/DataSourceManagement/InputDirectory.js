import React, { Component } from 'react'
import { Link } from 'dva/router'
import { Card, Button, Upload } from 'antd'

import styles from './InputDirectory.less'
import PageHeaderLayout from '../../layouts/PageHeaderLayout'

export default class InputDirectory extends Component {
  state = {
    
  }

  render() {
    return (
      <PageHeaderLayout>
        <div className="btncls clearfix">
          <Link to="/dataSourceManagement/catalog">
            <Button className="fr mr40">返回</Button>
          </Link>
        </div>
        <Card>
          <Upload className={styles.infos}>
            <h3>请下载模板按格式填写目录信息资源内容后导入</h3>
            <span>导入目录: </span>
            <Button type="primary"> 选取文件</Button>
          </Upload>
        </Card>
      </PageHeaderLayout>
    )
  }
}
