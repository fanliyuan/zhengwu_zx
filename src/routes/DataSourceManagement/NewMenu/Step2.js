/*
 * @Author: ChouEric
 * @Date: 2018-07-05 16:45:01
 * @Last Modified by: ChouEric
 * @Last Modified time: 2018-07-06 10:51:11
 * @描述: 这个页面的上传应该是 上传完数据,然后后台处理,返回给前台,前台再核对,确认
*/
import React, { PureComponent, Fragment } from 'react';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import { Form, Button, Radio } from 'antd';

import TableForm from './TableForm';
// import styles from './index.less'

const { Item } = Form;

@connect()
@Form.create()
export default class Step2 extends PureComponent {
  state = {
    data: {
      method: 1,
    },
    tableData: [
      {
        infoCode: '00001',
        key: '1',
      },
    ],
  };

  onChange = val => {
    this.setState({
      tableData: val,
    });
  };

  methodChange = e => {
    this.setState({
      data: {
        method: e.target.value,
      },
    });
  };

  goBack = () => {
    this.props.dispatch(routerRedux.push('/dataSourceManagement/newMenu/one'));
  };

  goForward = () => {
    this.props.dispatch(routerRedux.push('/dataSourceManagement/newMenu/three'));
  };

  render() {
    // const { form: { getFieldDecorator, validateFields }, dispatch } = this.props
    const { data, tableData } = this.state;

    return (
      <Fragment>
        <Form>
          <Item lable="名称">
            <Radio.Group value={data.method} onChange={this.methodChange}>
              <Radio value={1}>从数据资源导入</Radio>
              <Radio value={2}>导入已有目录</Radio>
              <Radio value={3}>手工建立</Radio>
            </Radio.Group>
          </Item>
          <Item label="信息项">
            <TableForm value={tableData} onChange={val => this.onChange(val)} />
          </Item>
        </Form>
        <div style={{ textAlign: 'center' }}>
          <Button size="large" style={{ marginRight: 40 }} onClick={this.goBack}>
            上一步
          </Button>
          <Button size="large" type="primary" style={{ marginRight: 40 }} onClick={this.goForward}>
            提交
          </Button>
        </div>
      </Fragment>
    );
  }
}
