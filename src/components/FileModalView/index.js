import React, {Fragment, PureComponent} from 'react'
import { Alert, Card, Divider, Table } from 'antd'
import DescriptionList from '@/components/DescriptionList'
import Ellipsis from '@/components/Ellipsis'

import styles from './index.less'

const { Description } = DescriptionList

export default class FileModalView extends PureComponent {

  render() {
    const { data } = this.props
    return (
      <Fragment>
        {data.keyArr.length === 0 && (
          <Alert
            message="页面正努力加载中......"
            style={{ marginBottom: 20 }}
            type="info"
            showIcon
            />
        )}
        {data.keyArr.length > 0 && (
          <Card bordered={false}>
            <DescriptionList size="large" title="基础信息" style={{ marginBottom: 32 }}>
              <Description term="数据名称">
                <Ellipsis lines={1} fullWidthRecognition tooltip>
                  {data.currentDetail.name}
                </Ellipsis>
              </Description>
              <Description term="文件所属单位">
                <Ellipsis lines={1} fullWidthRecognition tooltip>
                  {data.currentDetail.createUnit}
                </Ellipsis>
              </Description>
              <Description term="数据描述">
                <Ellipsis lines={1} fullWidthRecognition tooltip>
                  {data.currentDetail.describe}
                </Ellipsis>
              </Description>
              <Description term="负责人姓名">
                <Ellipsis lines={1} fullWidthRecognition tooltip>
                  {data.currentDetail.dutyName}
                </Ellipsis>
              </Description>
              <Description term="负责人手机号">
                <Ellipsis lines={1} fullWidthRecognition tooltip>
                  {data.currentDetail.dutyPhone}
                </Ellipsis>
              </Description>
              <Description term="负责人职位">
                <Ellipsis lines={1} fullWidthRecognition tooltip>
                  {data.currentDetail.dutyPosition}
                </Ellipsis>
              </Description>
            </DescriptionList>
            <Divider style={{ marginBottom: 32 }} />
            <div className={styles.title}>文件信息</div>
            <Table
              style={{ marginBottom: 24 }}
              dataSource={data.currentList}
              columns={data.tableColumn}
              rowKey="id"
              />
          </Card>
        )}
      </Fragment>
    )
  }
}