import React, { Component } from 'react';
import { Card, Steps, Form, Radio, Upload } from 'antd';

// import styles from './Ftp.less';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';

const { Step } = Steps;
const FormItem = Form.Item;
const RadioGroup = Radio.Group;
@Form.create()
export default class Ftp extends Component {
  state = {

  }

  handleSubmit = () => {

  }

  render (){
    const { getFieldDecorator } = this.props.form;
    const chooseProps = {
      action:'//jsonplaceholder.typicode.com/posts/',
      onChange({ file, fileList }) {
        if (file.status !== 'uploading') {
          console.log(file, fileList);
        }
      },
      // defaultFileList:[],
    }
    const labelLayout = {
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
    const formLayout = {
      wrapperCol:{
        xs:{span:24},
        sm:{span:10,offset:7},
      },
    }
    return (
      <PageHeaderLayout>
        <Card>
          <Steps current={0} style={{marginBottom:20}}>
            <Step title="选择文件或文件夹" />
            <Step title="设置同步计划" />
            <Step title="完成" />
          </Steps>
          <Form onSubmit={this.handleSubmit}>
            <FormItem label="选择类型" {...labelLayout}>
              {
                getFieldDecorator('chooseType',{
                  initialValue:'0',
                })(
                  <RadioGroup>
                    <Radio value='0'>文件夹</Radio>
                    <Radio value='1'>文件</Radio>
                  </RadioGroup>
                )
              }
            </FormItem>
            <FormItem {...formLayout}>
              {
                getFieldDecorator('chooseFile')(
                  <Upload {...chooseProps}>
                    <span style={{cursor:'pointer',color:'#1890FF'}}>去选择</span>
                  </Upload>
                )
              }
            </FormItem>
          </Form>
        </Card>
      </PageHeaderLayout>
    )
  }
}