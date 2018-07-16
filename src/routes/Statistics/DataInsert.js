/*
 * @Author: ChouEric
 * @Date: 2018-07-15 17:29:48
 * @Last Modified by: ChouEric
 * @Last Modified time: 2018-07-16 10:41:48
*/
import React, { Component } from 'react';
import { Row, Col, Card } from 'antd';

import { Pie } from 'components/Charts';
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
          </Row>
        </div>
      </PageHeaderLayout>
    );
  }
}
