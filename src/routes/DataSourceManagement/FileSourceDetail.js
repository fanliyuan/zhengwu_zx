/*
 * @Author: ChouEric
 * @Date: 2018-07-06 17:49:15
 * @Last Modified by: ChouEric
 * @Last Modified time: 2018-07-08 15:08:30
*/
import React, { Component } from 'react'
import { Link } from 'dva/router'
import { Divider, Button, Card, Input  } from 'antd'
import moment from 'moment'

import FileHeader from 'components/FileHeader'
import PageHeaderLayout from '../../layouts/PageHeaderLayout'
import styles from './FileSourceDetail.less'

export default class FileSourceDetail extends Component {
  state = {
    loading: true,
    data:{},
  }

  componentDidMount() {
    setTimeout(() => {
      this.setState({
        loading: false,
        data: this.props.location.state || {},
      })
    }, 300);
  }

  render() {
    const fileHeaderData = {
      menuCode: '3300031306381126/00001',
      menuName: '资产负债表信息',
      provider: '规划局',
      time: moment().format('lll'),
    }
    const btnList = [
      {
        label: '返回',
        path: '/dataSourceManagement/fileSource',
      },
    ]

    return (
      <PageHeaderLayout>
        <div className='common-layout' >
          <FileHeader data={fileHeaderData} btnList={btnList} />
          <Card loading={this.state.loading} bordered={false} >
            <h2>
              资源挂接
            </h2>
            <ul className={styles.box} >
              <li>
                <span>资源名称</span>:
                <span>{this.state.data.name && this.state.data.name.substring(0,this.state.data.name.lastIndexOf('.'))}</span>
              </li>
              <li>
                <span>数据类型</span>:
                <span>{this.state.data.fileType}</span>
              </li>
              <li>
                <span>节点</span>:
                <span>{this.state.data.node || '石家庄市民政部' }</span>
              </li>
              <li>
                <span>所属机构</span>:
                <span>{this.state.data.node || '石家庄市民政部' }</span>
              </li>
              <li>
                <span>应用系统名称</span>:
                <span>{this.state.data.node || '统计系统' }</span>
              </li>
              <li>
                <span>注册时间</span>:
                <span>{moment(this.state.data.uploadTime).format('lll') }</span>
              </li>
              <li>
                <span>资源</span>:
                <span>
                  <a>查看</a>
                </span>
              </li>
            </ul>
            <div style={{textAlign: 'center'}} >
              <Button type='primary' >修改</Button>
            </div>
          </Card>
        </div>
      </PageHeaderLayout>
    )
  }
}
