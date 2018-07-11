import React, { Component } from 'react';
import { Card, Button, Steps, Upload, Icon, Message } from 'antd';

import PageHeaderLayout from '../../layouts/PageHeaderLayout';
import styles from './UpdataFile.less';

const { Step } = Steps;
const Dragger = Upload.Dragger;
export default class UpdataFile extends Component {
  state = {
    stepNum:0,
  }

  render () {
    const { stepNum } = this.state;
    const props = {
      name:'file',
      multiple:true,
      action:'//jsonplaceholder.typicode.com/posts/',
      onChange(info){
        const state = info.file.status;
        if(status !== 'uploading'){

        }
        if(status === 'done'){
          Message.success(`${info.file.name} file upload successfully`)
        } else if(status === 'error'){
          Message.error(`${info.file.name} file upload failed`)
        }
      }
    }
    return(
      <PageHeaderLayout>
        <Card>
          <Steps className={styles.loadings} current={stepNum}>
            <Step title="上传本地文件"/>
            <Step title="完成"/>
          </Steps>
          <Dragger {...props} className={styles.draggers}>
            <p>
              <Icon type="inbox" />
            </p>
            <p>
              把文件拖到这里
            </p>
            <p>
              或选取文件
            </p>
          </Dragger>
          <p className={styles.extra}>
            最大上传文件大小:50MB
          </p>
          <Button type="primary">提交</Button>
        </Card>
      </PageHeaderLayout>
    )
  }
}