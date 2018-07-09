import React, { Component } from 'react';
import { Input, Card, Form, TreeSelect, InputNumber, Cascader, Button } from 'antd';

import PageHeaderLayout from '../../layouts/PageHeaderLayout';
// import styles from './AddInstitution.less';

const FormItem = Form.Item;
const { TextArea } = Input
@Form.create()
export default class AddInstitution extends Component {
  state = {

  }
 
 handleSubmit = () => {

 }

  render (){
    const { getFieldDecorator } = this.props.form;
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
    }
    const submitLayout = {
      wrapperCol:{
        xs:{span:24,offset:0},
        sm:{span:10,offset:7},
      },
    }
    const treeData = [
      {
        label:'某一级机构1',
        value:'0-0',
        key:'0-0',
        children:[
          {
            label:'某二级机构1',
            value:'0-0-0',
            key:'0-0-0',
          },
          {
            label:'某二级机构2',
            value:'0-0-1',
            key:'0-0-1',
          },
        ],
      },
      {
        label:'某一级机构2',
        value:'0-1',
        key:'0-1',
        children:[
          {
            label:'某二级机构3',
            value:'0-1-0',
            key:'0-1-0',
          },
          {
            label:'某二级机构4',
            value:'0-1-1',
            key:'0-1-1',
          },
        ],
      },
  ];
  const provinceData = [
    {
      value: '0',
      label: '山东省',
      children: [{
        value: '0-0',
        label: '菏泽市',
        children: [{
          value: '0-0-0',
          label: '曹县',
        }],
      }],
    },
  ];
    return (
      <PageHeaderLayout>
        <Card>
          <Form onSubmit={this.handleSubmit}>
            <FormItem label="机构名称" {...formItemLayout}>
              {getFieldDecorator('name',{
                rules:[
                  {
                    required:true,
                    message:'请输入用户名',
                  },
                ],
              })(
                <Input placeholder="用户名"/>
              )}
            </FormItem>
            <FormItem label="上级机构" {...formItemLayout}>
              {
                getFieldDecorator("parentJg")(
                  <TreeSelect 
                    treeData={treeData}
                    placeholder="please select"
                    treeDefaultExpandAll
                  />
                )
              }
            </FormItem>
            <FormItem label="排序" {...formItemLayout}>
              {
                getFieldDecorator('sort',{
                  rules:[
                    {
                      required:true,
                      message:'请输入排序',
                    },
                  ],
                })(
                  <InputNumber />
                )
              }
            </FormItem>
            <FormItem label="负责人" {...formItemLayout}>
              {
                getFieldDecorator('manager')(
                  <Input placeholder="姓名"/>
                )
              }
            </FormItem>
            <FormItem label="负责人手机" {...formItemLayout}>
              {
                getFieldDecorator('managerNum')(
                  <Input placeholder="11位数字"/>
                )
              }
            </FormItem>
            <FormItem label="所属省市区" {...formItemLayout}>
              {
                getFieldDecorator('province')(
                  <Cascader options={provinceData} />
                )
              }
            </FormItem>
            <FormItem label="详细地址" {...formItemLayout}>
              {
                getFieldDecorator('addressDetail')(
                  <TextArea row={4}/>
                )
              }
            </FormItem>
            <FormItem {...submitLayout}>
              <Button type="primary" htmlType="submit" style={{marginRight:20}}>确定</Button>
              <Button type="primary">取消</Button>
            </FormItem>
          </Form>
        </Card>
      </PageHeaderLayout>
    )
  }
}