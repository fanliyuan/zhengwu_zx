import React, { Component } from 'react';
import { Card, Form, Button } from 'antd';

// import styles from './LimitSet.less';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';

const FormItem = Form.Item;
@Form.create()
export default class LimitSet extends Component {
  state = {

  }

  handleSubmit = () => {

  }

  render (){
    return (
      <PageHeaderLayout>
        <Card>
          <Form onSubmit={this.handleSubmit}>
            <FormItem></FormItem>
          </Form>
        </Card>
      </PageHeaderLayout>
    )
  }
}

