import React, { Component } from 'react';
import { Card, Form, Button, Input, TreeSelect } from 'antd';
import { connect } from 'dva';

// import styles from './LimitSet.less';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';

const FormItem = Form.Item;
const { SHOW_PARENT }= TreeSelect;
@Form.create()
class LimitSet extends Component {
  state = {

  }

  handleSubmit = () => {

  }

  render (){
    const { getFieldDecorator } = this.props.form;
    const { data } = this.props;
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
    const treeData = [
      {
        label:'数据资源',
        value:'0-0',
        key:'0-0',
        children:[
          {
            label:'接入管理',
            value:'0-0-0',
            key:'0-0-0',
          },
          {
            label:'接入审核',
            value:'0-0-1',
            key:'0-0-1',
          },
          {
            label:'目录管理',
            value:'0-0-2',
            key:'0-0-2',
          },
          {
            label:'资源注册',
            value:'0-0-3',
            key:'0-0-3',
          },
        ],
      },
    ];
    const tProps = {
      treeData,
      treeCheckable:true,
      showCheckedStrategy:SHOW_PARENT,
      searchPlaceholder:'please select',
    };
    return (
      <PageHeaderLayout>
        <Card>
          <Form onSubmit={this.handleSubmit}>
            <FormItem label="角色名称" {...formItemLayout}>
              {
                getFieldDecorator('roleName',{
                  initialValue:data.roleName,
                })(
                  <Input readonly/>
                )
              }
            </FormItem>
            <FormItem label="角色类型" {...formItemLayout}>
              {
                getFieldDecorator('roleType')(
                  <Input readonly/>
                )
              }
            </FormItem>
            <FormItem label="角色说明" {...formItemLayout}>
              {
                getFieldDecorator('roleIntro',{
                  initialValue:data.roleDescription,
                })(
                  <Input readonly/>
                )
              }
            </FormItem>
            <FormItem label="角色资源权限" {...formItemLayout}>
              {
                getFieldDecorator('limitList',{
                  rules:[
                    {
                      required:true,
                      message:'请选择权限',
                    },
                  ],
                })(
                  <TreeSelect {...tProps} />
                )
              }
            </FormItem>
            <FormItem {...submitLayout}>
              <Button htmlType="submit" type="primary" style={{marginRight:20}}>确定</Button>
              <Button type="primary">取消</Button>
            </FormItem>
          </Form>
        </Card>
      </PageHeaderLayout>
    )
  }
}
export default connect(({roleLimit}) => ({
  data:roleLimit.params,
}))(LimitSet)

