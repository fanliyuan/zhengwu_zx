import React, { Component } from 'react';
import { Form, Card, Input, TreeSelect, Checkbox, Button } from 'antd';

// import styles from './AddSwitch.less';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';

const { SHOW_PARENT } = TreeSelect;
const FormItem = Form.Item;
const { TextArea } = Input;
@Form.create()
export default class AddSwitch extends Component {
  state = {
    
  }

  onChange = () => {

  }

  onChange1 = () => {

  }

  handleSubmit = () => {
   
  }

  render(){
    const FormItemLayout = {
      labelCol:{
        xs:{ span:24 },
        sm:{ span:7 },
        md:{span:7},
      },
      wrapperCol:{
        xs:{ span:10 },
        sm:{ span:12 },
        md:{span:10},
      },
    }
    const submitFormLayout = {
      wrapperCol:{
        xs:{ span:24, offset:0},
        sm:{ span:10, offset:7},
      },
    }
    const { getFieldDecorator, getFieldValue } = this.props.form;
    const treeData = [
      {
        label:'一级机构1',
        value:'0-0',
        key:'0-0',
        children:[
          {
            label:'二级机构1',
            value:'0-0-0',
            key:'0-0-0',
          },
          {
            label:'二级机构2',
            value:'0-0-1',
            key:'0-0-1',
          },
          {
            label:'二级机构3',
            value:'0-0-2',
            key:'0-0-2',
          },
          {
            label:'二级机构4',
            value:'0-0-3',
            key:'0-0-3',
          },
        ],
      },
      {
        label:'一级机构2',
        value:'0-1',
        key:'0-1',
        children:[
          {
            label:'二级机构1',
            value:'0-1-0',
            key:'0-1-0',
          },
          {
            label:'二级机构2',
            value:'0-1-1',
            key:'0-1-1',
          },
          {
            label:'二级机构3',
            value:'0-1-2',
            key:'0-1-2',
          },
          {
            label:'二级机构4',
            value:'0-1-3',
            key:'0-1-3',
          },
        ],
      },
  ];
  const treeData1 = [
    {
      label:'一级节点1',
      value:'0-2',
      key:'0-2',
      children:[
        {
          label:'二级节点1',
          value:'0-2-0',
          key:'0-2-0',
        },
        {
          label:'二级节点2',
          value:'0-2-1',
          key:'0-2-1',
        },
        {
          label:'二级节点3',
          value:'0-2-2',
          key:'0-2-2',
        },
        {
          label:'二级节点4',
          value:'0-2-3',
          key:'0-2-3',
        },
      ],
    },
    {
      label:'一级节点2',
      value:'0-3',
      key:'0-3',
      children:[
        {
          label:'二级节点1',
          value:'0-3-0',
          key:'0-3-0',
        },
        {
          label:'二级节点2',
          value:'0-3-1',
          key:'0-3-1',
        },
        {
          label:'二级节点3',
          value:'0-3-2',
          key:'0-3-2',
        },
        {
          label:'二级节点4',
          value:'0-3-3',
          key:'0-3-3',
        },
      ],
    },
];
  const tProps = {
    treeData,
    // value:this.state.value,
    onChange:this.onChange,
    treeCheckable:true,
    showCheckedStrategy:SHOW_PARENT,
    searchPlaceholder:'Please select',
    style:{
      width:300,
    },
  }
  const tProps1 = {
    treeData:treeData1,
    // value:this.state.value,
    onChange:this.onChange1,
    treeCheckable:true,
    showCheckedStrategy:SHOW_PARENT,
    searchPlaceholder:'Please select',
    style:{
      width:300,
    },
  }
    return (
      <PageHeaderLayout>
        <Card>
          <Form onSubmit={this.handleSubmit}>
            <FormItem label="交换域名称" {...FormItemLayout}>
              {getFieldDecorator('switchName',{
                rules:[
                  {
                    required:true,
                    message:'填写交换域名称',
                  },
                ],
              })(
                <Input />
              )}
            </FormItem>
            <FormItem label="业务范围机构" {...FormItemLayout}>
              {getFieldDecorator('fieldJg',{
                rules:[
                  {
                    required:true,
                    message:'业务范围机构必选',
                  },
                ],
              })(
                <TreeSelect {...tProps} />
              )}
            </FormItem>
            <FormItem label="业务范围节点" style={{display:getFieldValue('fieldJg') === undefined ? 'none' : 'block'}} {...FormItemLayout}>
              {getFieldDecorator('fieldNode',{
                rules:[
                  {
                    required:true,
                    message:'业务范围节点必选',
                  },
                ],
              })(
                <TreeSelect {...tProps1}/>
              )}
            </FormItem>
            <FormItem label="交换域描述" {...FormItemLayout}>
              {
                getFieldDecorator('switchDescription')(
                  <TextArea rows={4}/>
                )
              }
            </FormItem>
            <FormItem label="状态" {...FormItemLayout}>
              {
                getFieldDecorator('status')(
                  <Checkbox>停用</Checkbox>
                )
              }
            </FormItem>
            <FormItem {...submitFormLayout}>
              <Button type="primary" htmlType="submit" style={{marginRight:20}}>确定</Button>
              <Button type="primary">取消</Button>
            </FormItem>
          </Form>
        </Card>
      </PageHeaderLayout>
    )
  }
}