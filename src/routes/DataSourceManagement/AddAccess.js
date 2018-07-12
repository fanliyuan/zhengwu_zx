import React, { Component } from 'react';
import { Input, Card, Form, Button, Cascader } from 'antd';

import PageHeaderLayout from '../../layouts/PageHeaderLayout';
// import styles from './AddAccess.less';

const FormItem = Form.Item;
@Form.create()
export default class AddAccess extends Component {
  state = {

  }

  handleSubmit = () => {

  }

  render () {
    const { getFieldDecorator, getFieldValue } = this.props.form;
    const formItemLayout = {
      labelCol:{
        xs:{span:24},
        sm:{span:7},
      },
      wrapperCol:{
        xs:{span:24},
        sm:{span:12},
        md:{span:10},
      },
    };
    const submitLayout = {
      wrapperCol:{
        xs:{span:24,offset:0},
        sm:{span:10,offset:7},
      },
    }
    const options = [
      {
        label:'半结构化存储',
        value:'0',
        children:[
          {
            label:'FTP',
            value:'0-0',
          },
          {
            label:'SFTP',
            value:'0-1',
          },
          {
            label:'本地文件',
            value:'0-2',
          },
        ],
      },
      {
        label:'关系型数据库',
        value:'1',
        children:[
          {
            label:'FTP',
            value:'0-0',
          },
          {
            label:'SFTP',
            value:'0-1',
          },
          {
            label:'本地文件',
            value:'0-2',
          },
        ],
      },
      {
        label:'流数据存储',
        value:'2',
        children:[
          {
            label:'FTP',
            value:'0-0',
          },
          {
            label:'SFTP',
            value:'0-1',
          },
          {
            label:'本地文件',
            value:'0-2',
          },
        ],
      },
    ]
    return (
      <PageHeaderLayout>
        <Card>
          <Form onSubmit={this.handleSubmit}>
            <FormItem label="名称" {...formItemLayout}>
              {
                getFieldDecorator('name')(
                  <Input placeholder="名称" />
                )
              }
            </FormItem>
            <FormItem label="类型" {...formItemLayout} extra={getFieldValue('types') && getFieldValue('types')[1].slice(-1) === '2' ? '选择本地文件后,在资源注册时直接选择本地文件即可' :''}>
              {
                getFieldDecorator('types')(
                  <Cascader options={options} />
                )
              }
            </FormItem>
            <FormItem label="FTP地址" {...formItemLayout} style={{display:getFieldValue('types') && getFieldValue('types')[1].slice(-1) === '2' ? 'none':'block'}}>
              {
                getFieldDecorator('address')(
                  <Input />
                )
              }
            </FormItem>
            <FormItem label="FTP端口" {...formItemLayout} style={{display:getFieldValue('types') && getFieldValue('types')[1].slice(-1) === '2' ? 'none':'block'}}>
              {
                getFieldDecorator('port')(
                  <Input />
                )
              }
            </FormItem>
            <FormItem label="用户名" {...formItemLayout} style={{display:getFieldValue('types') && getFieldValue('types')[1].slice(-1) === '2' ? 'none':'block'}}>
              {
                getFieldDecorator('userName')(
                  <Input />
                )
              }
            </FormItem>
            <FormItem label="密码" {...formItemLayout} style={{display:getFieldValue('types') && getFieldValue('types')[1].slice(-1) === '2' ? 'none':'block'}}>
              {
                getFieldDecorator('psd')(
                  <Input type="password" />
                )
              }
            </FormItem>
            <FormItem label="连通性测试" {...formItemLayout} style={{display:getFieldValue('types') && getFieldValue('types')[1].slice(-1) === '2' ? 'none':'block'}}>
              <a href="">测试</a>
            </FormItem>

            {/* <FormItem {...submitLayout}>
              <span>选择本地文件后,在资源注册时直接选择本地文件即可</span>
            </FormItem> */}
            <FormItem {...submitLayout}>
              <Button type="primary" htmlType="submit">确定</Button>
            </FormItem>
          </Form>
        </Card>
      </PageHeaderLayout>
    )
  }
}