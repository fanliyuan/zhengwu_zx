import React, { Component } from 'react';
import { connect } from 'dva';
import { Link, routerRedux } from 'dva/router';

import { Card, Form, Select, Checkbox, Button, message } from 'antd';

// import styles from './EditPass.less';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';

const FormItem = Form.Item;
const { Option } = Select;
@Form.create()
class EditPass extends Component {
  state = {};

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll(err => {
      // values
      if (!err) {
        message.success('提交成功, 即将返回上一页');
        setTimeout(() => {
          this.props.dispatch(routerRedux.push('/infrastructure/pass'));
        }, 1000);
        // const { dispatch } = this.props;
        // dispatch({
        //   type:'',
        //   payload:values,
        // })
      }
    });
  };

  render() {
    const { data } = this.props;
    const { getFieldDecorator } = this.props.form; // getFieldValue
    const startData = [
      { value: '0', label: '石家庄市发展改革委', id: 0 },
      { value: '1', label: '北京发展改革委', id: 1 },
    ];
    const startNode = startData.map(item => {
      return (
        <Option value={item.value} title={item.label} key={item.id}>
          {item.label}
        </Option>
      );
    });
    const endData = [
      { value: '0', label: '石家庄市民政部', id: 0 },
      { value: '1', label: '北京民政部', id: 1 },
    ];
    const targetNode = endData.map(item => {
      return (
        <Option value={item.value} title={item.label} key={item.id}>
          {item.label}
        </Option>
      );
    });
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 7 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 12 },
        md: { span: 10 },
      },
    };

    return (
      <PageHeaderLayout>
        <Card>
          <Form onSubmit={this.handleSubmit}>
            <FormItem label="起始节点" {...formItemLayout}>
              {getFieldDecorator('startNode', {
                initialValue: data.startCode,
                rules: [
                  {
                    required: true,
                    message: '请选择起始节点',
                  },
                ],
              })(<Select placeholder="起始节点">{startNode}</Select>)}
            </FormItem>
            <FormItem label="目标节点" {...formItemLayout}>
              {getFieldDecorator('endNode', {
                initialValue: data.targetCode,
                rules: [
                  {
                    required: true,
                    message: '请选择目标节点',
                  },
                ],
              })(<Select placeholder="目标节点">{targetNode}</Select>)}
            </FormItem>
            <FormItem label="双向传输" {...formItemLayout}>
              {getFieldDecorator('twoWayTransfer', {
                valuePropName: 'checked',
                initialValue: !!+data.isTwoWay,
              })(<Checkbox>启用</Checkbox>)}
            </FormItem>
            <FormItem label="压缩传输" {...formItemLayout}>
              {getFieldDecorator('compressTransfer', {
                valuePropName: 'checked',
                initialValue: !!+data.isCompress,
              })(<Checkbox>启用</Checkbox>)}
            </FormItem>
            <FormItem label="加密传输" {...formItemLayout}>
              {getFieldDecorator('enCryptTransfer', {
                valuePropName: 'checked',
                initialValue: !!+data.isEncrypt,
              })(<Checkbox>启用</Checkbox>)}
            </FormItem>
            <div className="btnclsb">
              <Button type="primary" htmlType="submit" className="mr64">
                提交
              </Button>
              <Link to="/infrastructure/pass">
                <Button>取消</Button>
              </Link>
            </div>
          </Form>
        </Card>
      </PageHeaderLayout>
    );
  }
}
export default connect(({ passOperation }) => ({
  data: passOperation.params,
}))(EditPass);
