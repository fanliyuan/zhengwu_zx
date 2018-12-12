import React, { Fragment, PureComponent } from 'react'
import { Card } from 'antd'
import router from 'umi/router'
import DescriptionList from '@/components/DescriptionList'
import Ellipsis from '@/components/Ellipsis'

const { Description } = DescriptionList

export default class ViewCard extends PureComponent {
  render() {
    const { data } = this.props
    return (
      <Fragment>
        <Card bordered={false}>
          <DescriptionList
            size="large"
            col={data.col}
            title={data.title}
            style={{ marginBottom: 32 }}
            titlestyle={{ fontWeight: 'bold' }}
            >
            {data.data.map(item => {
              if (item.fullWidth) {
                return (
                  <Description term={item.key} key={item.key} style={{ width: '100%' }}>
                    <Ellipsis lines={item.lines} fullWidthRecognition tooltip>
                      {item.value}
                    </Ellipsis>
                  </Description>
                )
              }
              if (item.link) {
                return (
                  <Description term={item.key} key={item.key}>
                    <Ellipsis lines={1} fullWidthRecognition>
                      <a onClick={() => router.push(`${item.href}`)}>{item.value}</a>
                    </Ellipsis>
                  </Description>
                )
              }
              return (
                <Description term={item.key} key={item.key}>
                  <Ellipsis lines={1} fullWidthRecognition tooltip>
                    {item.value}
                  </Ellipsis>
                </Description>
              )
            })}
          </DescriptionList>
        </Card>
      </Fragment>
    )
  }
}
