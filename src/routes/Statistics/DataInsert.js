/*
 * @Author: ChouEric
 * @Date: 2018-07-15 17:29:48
 * @Last Modified by: ChouEric
 * @Last Modified time: 2018-07-16 14:19:38
*/
import React, { Component } from 'react';
import { Row, Col, Card } from 'antd';

import { Pie, Bars } from 'components/Charts';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';
import styles from './DataInsert.less';

export default class DataInsert extends Component {
  state = {
    loading: false,
  };

  componentDidMount() {
    this.setState({
      loading: true,
    });
    setTimeout(() => {
      this.setState({
        loading: false,
      });
    }, 300);
  }

  render() {
    const { loading } = this.state;

    const data1 = [
      {
        x: '节点1',
        y: 123,
      },
      {
        x: '节点2',
        y: 76,
      },
      {
        x: '节点3',
        y: 43,
      },
      {
        x: '节点4',
        y: 314,
      },
      {
        x: '节点5',
        y: 231,
      },
    ];
    // 数据模板
    // const data2 = [
    //   { name:'London', 'Jan.': 18.9, 'Feb.': 28.8, 'Mar.' :39.3, 'Apr.': 81.4, 'May': 47, 'Jun.': 20.3, 'Jul.': 24, 'Aug.': 35.6 },
    //   { name:'Berlin', 'Jan.': 12.4, 'Feb.': 23.2, 'Mar.' :34.5, 'Apr.': 99.7, 'May': 52.6, 'Jun.': 35.5, 'Jul.': 37.4, 'Aug.': 42.4},
    // ]
    const data2 = [
      {
        name: '文件数据',
        周一: 213,
        周二: 315,
        周三: 134,
        周四: 83,
        周五: 245,
      },
      {
        name: '表数据',
        周一: 123,
        周二: 87,
        周三: 75,
        周四: 142,
        周五: 178,
      },
    ];

    const colResponsiveProps = {
      xs: 24,
      sm: 24,
      md: 24,
      lg: 12,
      style: { marginBottom: 24 },
    };

    return (
      <PageHeaderLayout>
        <div className="common-layout">
          <Row gutter={16}>
            <Col {...colResponsiveProps}>
              <Card
                loading={loading}
                title="接入数据量分布"
                className={styles.card}
                bordered={false}
              >
                <Pie
                  data={data1}
                  valueFormat={value => value}
                  height={400}
                  inner={0}
                  lineWidth={0}
                  hasLegend
                  showPercent
                  showValue={false}
                />
              </Card>
            </Col>
            <Col {...colResponsiveProps}>
              <Card loading={loading} title="接入数据概览" className={styles.card} bordered={false}>
                <Bars height={400} data={data2} color={['name', ['red', 'blue']]} />
              </Card>
            </Col>
          </Row>
        </div>
      </PageHeaderLayout>
    );
  }
}
