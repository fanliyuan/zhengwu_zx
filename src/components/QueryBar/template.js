/* eslint-disable */
import React from 'react';
import { Form, Button, Row, Col, Select, TreeSelect, DatePicker, Input } from 'antd';
import moment from 'moment';

const { RangePicker } = DatePicker;
const Option = Select.Option;
const FormItem = Form.Item;

class SearchFormLayout extends React.Component {
  constructor(props) {
    super(props);

    this.formItemLayout = {
      labelCol: {
        span: 5,
      },
      wrapperCol: {
        span: 18,
      },
    };

    this.state = { searchParams: {} }; // 用于存储每次筛选的条件，便于后续导出使用
  }

  componentWillReceiveProps(nextProps) {
    // 点击菜单清空搜索框
    if (nextProps.shouldResetSearch) {
      this.props.form.resetFields();
      this.props.resetSearch();
      this.setState({ searchParams: {} });
    }
  }

  // 搜索
  handleSearch = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if(err) {
        return ;
      }
      const searchParams = {/*自行处理筛选参数 */};
      this.setState({ searchParams: StringHelper.deleteUndefined(searchParams) }); // 过滤搜索条件中的空参数，存入state中便于后续导出使用
      this.props.onSearch(StringHelper.deleteUndefined(searchParams)); // 调用搜索事件，调用前引入helpers模块中的StringHelper模块对空参进行过滤
    });
  }

  // 重置
  handleReset = () => {
    this.props.form.resetFields();
    this.setState({ searchParams: {} });
    this.props.handleReset();
  }

  // 导出
  handleExport() {
    this.props.handleExport(this.state.searchParams);
  }

  // 返回
  handleBack = () => {
    this.props.form.resetFields();
    this.setState({ searchParams: {} });
    this.props.handleBack();
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Form className='ant-advanced-search-form' onSubmit={this.handleSearch}>
        <div id='area'>
          <Row>
            <Col xl={6} xs={24} lg={6} md={12}>
              <FormItem {...this.formItemLayout} label='日期'>
                {getFieldDecorator('Time')(
                  <RangePicker
                    style={{ width: '100%' }}
                    showTime={{ hideDisabledOptions: true,defaultValue: [moment('00:00:00', 'HH:mm:ss'), moment('23:59:59', 'HH:mm:ss')]}}
                    format='YYYY-MM-DD HH:mm:ss'
                    placeholder={['开始时间', '结束时间']}
                    getCalendarContainer={() => document.getElementById('area')}
                  />)}
              </FormItem>
            </Col>
            <Col xl={6} xs={24} lg={6} md={12}>
              <FormItem {...this.formItemLayout} label='输入框'>
                {getFieldDecorator('Input')(<Input style={{ width: '100%' }} size='large' placeholder='请输入' />)}
              </FormItem>
            </Col>
            <Col xl={6} xs={24} lg={6} md={12}>
              <FormItem {...this.formItemLayout} label='选择框'>
                {getFieldDecorator('Select',{initialValue: ''})(
                  <Select style={{ width: '100%' }} placeholder='请选择'>
                    <Option value=''>全部</Option>
                  </Select>)}
              </FormItem>
            </Col>
          </Row>
          <Row type='flex' justify='end'>
            <Col style={{marginRight: 16}}><Button type='primary' size='large' htmlType='submit'>搜索</Button></Col>
            <Col style={{marginRight: 16}}><Button type='ghost' size='large' htmlType='reset' onClick={this.handleReset}>重置</Button></Col>
            <Col style={{marginRight: 16}}><Button type='ghost' size='large' onClick={this.handleExport}>导出</Button></Col>
            <Col style={{marginRight: 16}}><Button type='ghost' size='large' onClick={this.handleBack}>返回</Button></Col>
          </Row>
        </div>
      </Form>
    );
  }
}
export default Form.create()(SearchFormLayout);
