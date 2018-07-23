/*
 * @Author: ChouEric
 * @Date: 2018-07-10 13:22:34
 * @Last Modified by: ChouEric
 * @Last Modified time: 2018-07-23 18:07:40
*/
import React, { Component, Fragment } from 'react';
import { Link } from 'dva/router';
import {
  Form,
  Input,
  InputNumber,
  Radio,
  Select,
  Cascader,
  Checkbox,
  Button,
  Row,
  Col,
  Modal,
} from 'antd';

import PageHeaderLayout from '../../layouts/PageHeaderLayout';
import styles from './AddWarningOption.less';

const { Item } = Form;
const itemLayout = {
  labelCol: {
    span: 2,
  },
  wrapperCol: {
    span: 22,
  },
};
const modalLayout = {
  labelCol: {
    span: 6,
  },
  wrapperCol: {
    span: 14,
  },
};

@Form.create()
export default class AddWarningOption extends Component {
  state = {
    modalVisibility: false,
  };

  submit = e => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, value) => {
      if (!err) {
        console.log(value); // eslint-disable-line
      }
    });
  };

  methodChange = e => {
    this.setState({
      modalVisibility: e.target.value === 1,
    });
  };

  render() {
    const { modalVisibility } = this.state;
    const { getFieldDecorator } = this.props.form;
    const nodeOptions = [
      {
        value: 100,
        label: '省直属',
        children: [
          {
            value: 100001,
            label: '省公安局厅',
          },
          {
            value: 100002,
            label: '省财厅',
          },
        ],
      },
      {
        value: 101,
        label: '广州市',
        children: [
          {
            value: 101001,
            label: '广州市消防局',
          },
          {
            value: 101002,
            label: '广州市烟草局',
          },
        ],
      },
    ];

    return (
      <PageHeaderLayout>
        <div className="common-layout">
          <Form onSubmit={this.submit}>
            <Item label="告警名称" {...itemLayout}>
              {getFieldDecorator('name', {
                rules: [{ required: true, message: '请输入名称' }],
              })(<Input className={styles.input} />)}
            </Item>
            <Item label="告警时间间隔" {...itemLayout}>
              {getFieldDecorator('period', {
                rules: [{ required: true, message: '请输入时间' }],
              })(<InputNumber style={{ width: 166, marginRight: 4 }} />)}
              分钟
            </Item>
            <Item label="告警方式" {...itemLayout}>
              {getFieldDecorator('method', {
                initialValue: 0,
                rules: [{ required: true, message: '请选择方式' }],
              })(
                <Radio.Group onChange={this.methodChange}>
                  <Radio value={0}>短信</Radio>
                  <Radio value={1}>邮件</Radio>
                </Radio.Group>
              )}
            </Item>
            <Item label="姓名" {...itemLayout}>
              {getFieldDecorator('person', {
                rules: [{ required: true, message: '请输入姓名' }],
              })(<Input className={styles.input} />)}
            </Item>
            <Item label="电话" {...itemLayout}>
              {getFieldDecorator('mobile', {
                rules: [
                  { required: true, message: '请输入手机号' },
                  { pattern: /1[3-9][0-9]{9}/, message: '请输入正确的手机号' },
                ],
              })(<Input className={styles.input} />)}
            </Item>
            <Item label="监控节点" {...itemLayout}>
              {getFieldDecorator('node', {
                rules: [{ required: true, message: '请选择节点' }],
              })(
                <Cascader options={nodeOptions} className={styles.input} placeholder="请选择节点" />
              )}
            </Item>
            <Item label="监控内容" {...itemLayout} required>
              {getFieldDecorator('monitorContext', {
                // rules: [{ required: true, message: '请选择监控内容' }],
              })(
                <Fragment>
                  <Row style={{ width: 500, border: '1px solid #ccc', padding: 8 }}>
                    <Col span={12}>
                      <Checkbox>接入源</Checkbox>
                      <div className={styles.checkBox}>
                        <Checkbox className={styles.checkInner}>接入源1</Checkbox>
                        <Checkbox className={styles.checkInner}>接入源2</Checkbox>
                        <Checkbox className={styles.checkInner}>接入源3</Checkbox>
                      </div>
                    </Col>
                    <Col span={12}>
                      <Checkbox>通道</Checkbox>
                      <div className={styles.checkBox}>
                        <Checkbox className={styles.checkInner}>通道1</Checkbox>
                        <Checkbox className={styles.checkInner}>通道2</Checkbox>
                        <Checkbox className={styles.checkInner}>通道3</Checkbox>
                      </div>
                    </Col>
                  </Row>
                  <div style={{ width: 500, border: '1px solid #ccc', padding: 8, marginTop: 8 }}>
                    <div>
                      <Checkbox style={{ width: 80 }}>传输</Checkbox>
                      <Select style={{ display: 'inline-block', width: 150 }}>
                        <Select.Option value={0}>全部</Select.Option>
                        <Select.Option value={1}>包含</Select.Option>
                        <Select.Option value={2}>不包含</Select.Option>
                      </Select>
                      <Input placeholder="告警代码" style={{ width: 200, marginLeft: 20 }} />
                    </div>
                    <div>
                      <Checkbox style={{ width: 80 }}>数据库</Checkbox>
                      <Select style={{ display: 'inline-block', width: 150 }}>
                        <Select.Option value={0}>全部</Select.Option>
                        <Select.Option value={1}>包含</Select.Option>
                        <Select.Option value={2}>不包含</Select.Option>
                      </Select>
                      <Input placeholder="告警代码" style={{ width: 200, marginLeft: 20 }} />
                    </div>
                  </div>
                </Fragment>
              )}
            </Item>
            <Item label="状态" {...itemLayout}>
              {getFieldDecorator('state', {
                valuePropName: 'checked',
              })(<Checkbox>停用</Checkbox>)}
            </Item>
            <Item wrapperCol={{ span: 24 }} style={{ textAlign: 'center' }}>
              <Button type="primary" htmlType="submit" className="mr64">
                提交
              </Button>
              <Link to="/monitor/warningOption">
                <Button>取消</Button>
              </Link>
            </Item>
          </Form>
          <Modal
            title="编辑邮箱服务器"
            visible={modalVisibility}
            onCancel={() => this.setState({ modalVisibility: false })}
          >
            <Form>
              <Item label="邮箱服务器" {...modalLayout}>
                {getFieldDecorator('emailServer', {
                  rules: [{ required: true, message: '请输入服务器地址' }],
                })(<Input />)}
              </Item>
              <Item label="端口" {...modalLayout}>
                {getFieldDecorator('emailAno', {
                  rules: [
                    { required: true, message: '请输入端口' },
                    { pattern: /^\d{1,}$/, message: '请输入正确端口号' },
                  ],
                })(<Input />)}
              </Item>
              <Item label="用户名" {...modalLayout}>
                {getFieldDecorator('emailUser', {
                  rules: [{ required: true, message: '请输入用户名' }],
                })(<Input />)}
              </Item>
              <Item label="用户密码" {...modalLayout}>
                {getFieldDecorator('emailPassword', {
                  rules: [{ required: true, message: '请输入用户密码' }],
                })(<Input />)}
              </Item>
              <Item label="邮件接收地址" {...modalLayout}>
                {getFieldDecorator('receiveServer', {
                  rules: [{ required: true, message: '请输入邮件接收地址' }],
                })(<Input />)}
              </Item>
            </Form>
          </Modal>
        </div>
      </PageHeaderLayout>
    );
  }
}
