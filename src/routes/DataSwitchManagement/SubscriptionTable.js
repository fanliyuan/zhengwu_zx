/*
 * @Author: ChouEric
 * @Date: 2018-07-18 13:36:45
 * @Last Modified by: ChouEric
 * @Last Modified time: 2018-09-26 13:56:38
 * @描述: 数据资源管理 -- 资源集市 -- 订阅(表)
*/
import React, { Component } from 'react'
import { Form, Input, InputNumber, Select, Button, Table, Card, Divider, Icon } from 'antd'
import { Link, routerRedux } from 'dva/router'

import { connect } from 'dva'
import PageHeaderLayout from '../../layouts/PageHeaderLayout'
import styles from './SubscriptionTable.less'

const { Option } = Select

function ButtonList(props) {
  const { onClick = () => {}, disabled = false, isNodeOperator = false } = props
  return (
    <div className="btncls clearfix">
      <Link to="/dataSwitchManagement/allSub" className="fr mr40">
        <Button>返回</Button>
      </Link>
      {isNodeOperator && (
        <Button type="primary" onClick={onClick} disabled={disabled} className="fr mr40">
          保存
        </Button>
      )}
    </div>
  )
}
function Label(props) {
  const { label, children, className = styles.span } = props
  return (
    <span className={className}>
      <span className={styles.label}>{label}</span>
      {children}
    </span>
  )
}

@Form.create()
@connect()
export default class SubscriptionTable extends Component {
  state = {
    isNodeOperator: false,
    subInfo: {},
  }

  componentDidMount() {
    this.setState({
      isNodeOperator: localStorage.getItem('antd-pro-authority') === 'operator-n',
    })
    const { state: {subInfo={}} = {} } = this.props.history.location
    this.setState({
      subInfo,
    })
  }

  render() {
    const { isNodeOperator,subInfo: { subscriberName, publisherDeptName, resourceId } } = this.state
    const columns = [
      {
        title: '字段',
        dataIndex: 'field',
        align: 'center',
      },
      {
        title: '类型',
        dataIndex: 'classify',
        align: 'center',
      },
      {
        title: '描述',
        dataIndex: 'description',
        align: 'center',
      },
    ]
    const arrowColumns = [
      {
        title: '',
        dataIndex: 'key',
        render: () => {
          return (
            <Divider dashed orientation="right" className={styles.divider}>
              <Icon type="right" />
            </Divider>
          )
        },
      },
    ]
    const data = [
      {
        id: 1,
        key: 1,
        field: 'id',
        classify: 'init',
      },
      {
        id: 2,
        key: 2,
        field: 'name',
        classify: 'varchar',
      },
      {
        id: 3,
        key: 3,
        field: 'gender',
        classify: 'varchar',
      },
    ]
    return (
      <PageHeaderLayout>
        <div className="common-layout">
          <ButtonList onClick={this.handleSave} isNodeOperator={isNodeOperator} />
          <div>
            <Label label="订阅名称">
              <Input className={styles.value} disabled={!isNodeOperator} value={subscriberName} />
            </Label>
            <Label label="目录名称">石家庄东城区国土数据</Label>
          </div>
          <div>
            <Label label="发布机构">{publisherDeptName}</Label>
            <Label label="数据类型">数据库</Label>
          </div>
          <div>
            <Label label="所属分类">国土数据</Label>
            <Label label="详情">
              {/* <Link to={`/dataSourceManagement/viewDirectory${}`}>查看</Link> */}
              <a onClick={() => this.props.dispatch(routerRedux.push('/dataSourceManagement/viewDirectory', {resourceId}))}>查看</a>
            </Label>
          </div>
          <div>
            <Label label="发布模式">
              <Select className={styles.method} disabled={!isNodeOperator}>
                <Option value={0}>全量</Option>
                <Option value={1}>增量</Option>
              </Select>
              <Select className={styles.method} disabled={!isNodeOperator}>
                <Option value={0}>日志</Option>
                <Option value={1}>数据</Option>
              </Select>
            </Label>
          </div>
          <div>
            <Label label="发布频率">
              <Select className={styles.rate} disabled={!isNodeOperator}>
                <Option value={0}>定时</Option>
              </Select>
            </Label>
          </div>
          <div>
            <Label label="定时设置" className={styles.timeSetting}>
              <InputNumber
                max={60}
                min={0}
                className={styles.time}
                placeholder="分钟"
                disabled={!isNodeOperator}
                />
              <InputNumber
                max={23}
                min={0}
                className={styles.time}
                placeholder="小时"
                disabled={!isNodeOperator}
                />
              <Input className={styles.time} placeholder="日" disabled={!isNodeOperator} />
              <Input className={styles.time} placeholder="月" disabled={!isNodeOperator} />
              <Input className={styles.time} placeholder="星期" disabled={!isNodeOperator} />
            </Label>
          </div>
          <div>
            <Label label="订阅存储数据库">
              <Select className={styles.rate} disabled={!isNodeOperator}>
                <Option value={1}>数据库1</Option>
                <Option value={2}>数据库2</Option>
                <Option value={3}>数据库3</Option>
                <Option value={4}>数据库5</Option>
              </Select>
            </Label>
          </div>
          <div>
            <span className={styles.label}>订阅存储数据表</span>
            <Card className={styles.card}>
              <div className="mb16">
                <span className={styles.tableLabel}>发布表名</span>
                <span className={styles.tableValue}>table1</span>
                <span className={styles.tableLabel}>订阅存储表</span>
                <Select className={styles.tableSelect} disabled={!isNodeOperator}>
                  <Option value={0}>自动创建</Option>
                  <Option value={1}>映射</Option>
                </Select>
              </div>
              <Table
                dataSource={data}
                title={() => <span>源表 : table1</span>}
                columns={columns}
                className={styles.table}
                bordered
                />
              <Table
                dataSource={data}
                title={() => (
                  <span>
                    {isNodeOperator ? (
                      <span className='operate clearfix'>
                        <a className="fl">自动映射</a>
                        <a className="fr">清除映射</a>
                      </span>
                    ) : (
                      <span className='operate clearfix'>
                        <span className="fl" style={{ cursor: 'no-drop', color: 'silver' }}>
                          自动映射
                        </span>
                        <span className="fr" style={{ cursor: 'no-drop', color: 'silver' }}>
                          清除映射
                        </span>
                      </span>
                    )}
                  </span>
                )}
                columns={arrowColumns}
                className={styles.arrow}
                pagination={false}
                />
              <Table
                dataSource={data}
                title={() => <span>目标表 : table1</span>}
                columns={columns}
                className={styles.table}
                bordered
                />
            </Card>
            <Card className={styles.card}>
              <div className="mb16">
                <span className={styles.tableLabel}>发布表名</span>
                <span className={styles.tableValue}>table1</span>
                <span className={styles.tableLabel}>订阅存储表</span>
                <Select className={styles.tableSelect} disabled={!isNodeOperator}>
                  <Option value={0}>自动创建</Option>
                  <Option value={1}>映射</Option>
                </Select>
              </div>
              <Table
                dataSource={data}
                title={() => <span>源表 : table1</span>}
                columns={columns}
                className={styles.table}
                bordered
                />
              <Table
                dataSource={data}
                title={() => (
                  <span>
                    {isNodeOperator ? (
                      <span className='operate clearfix'>
                        <a className="fl">自动映射</a>
                        <a className="fr">清除映射</a>
                      </span>
                    ) : (
                      <span className='operate clearfix'>
                        <span className="fl" style={{ cursor: 'no-drop', color: 'silver' }}>
                          自动映射
                        </span>
                        <span className="fr" style={{ cursor: 'no-drop', color: 'silver' }}>
                          清除映射
                        </span>
                      </span>
                    )}
                  </span>
                )}
                columns={arrowColumns}
                className={styles.arrow}
                pagination={false}
                />
              <Table
                dataSource={data}
                title={() => <span>目标表 : table1</span>}
                columns={columns}
                className={styles.table}
                bordered
                />
            </Card>
          </div>
        </div>
      </PageHeaderLayout>
    )
  }
}
