import React, { Component, Fragment } from 'react';
import { Link } from 'dva/router';
import { Form, Input, Select, Upload, Modal, Button, Icon, Radio } from 'antd';
import ReactQuill from 'react-quill';

import PageHeaderLayout from '../../layouts/PageHeaderLayout';
import 'react-quill/dist/quill.snow.css';
import styles from './AddArticle.less';

const { Item } = Form;
const formItemLayout = {
  labelCol: {
    span: 2,
  },
  wrapperCol: {
    span: 22,
  },
};
const savaLayout = {
  labelCol: {
    span: 6,
  },
  wrapperCol: {
    span: 12,
  },
};

@Form.create()
export default class AddArticle extends Component {
  state = {
    quillText: '',
    articleData: {},
    saveData: {},
    fileList: [],
    previewVisible: false,
    previewImage: '',
    saveVisible: false,
  };

  handleQuillChange = value => {
    this.setState({
      quillText: value,
    });
  };

  handleUploadChange = ({ fileList }) => this.setState({ fileList });

  handlePreviewChange = file => {
    this.setState({
      previewImage: file.url || file.thumbUrl,
      previewVisible: true,
    });
  };

  handlePreviewCancel = () => {
    this.setState({
      previewVisible: false,
    });
  };

  handleSave = () => {
    this.setState({
      saveVisible: true,
    });
  };

  saveCancel = () => {
    this.setState({
      saveVisible: false,
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    const { fileList, previewImage, previewVisible, saveVisible } = this.state;
    const quillModules = {
      toolbar: [
        [{ header: [1, 2, 3, 4, 5, 6, false] }],
        [{ size: ['small', false, 'large', 'huge'] }],
        [{ align: [] }],
        [{ indent: '-1' }, { indent: '+1' }],
        ['bold', 'italic', 'underline', 'strike'],
        [{ color: [] }, { background: [] }],
        [{ font: [] }],
        [{ link: true }],
        [{ image: true }],
      ],
    };
    const classifyList = [
      {
        value: 0,
        label: '惠民',
      },
      {
        value: 1,
        label: '法规',
      },
    ];
    const columnList = [
      {
        value: 0,
        label: '最新动态',
      },
      {
        value: 1,
        label: '重要新闻',
      },
      {
        value: 2,
        label: '通知公告',
      },
      {
        value: 3,
        label: '最新政策',
      },
      {
        value: 4,
        label: '政策解读',
      },
      {
        value: 5,
        label: '热门政题',
      },
    ];
    const btnComs = (
      <Fragment>
        <Link to="/portalManagement/newsLibrary" className={styles.fr}>
          <Button>返回</Button>
        </Link>
        <Button type="primary" className={styles.fr} onClick={this.handleSave}>
          保存
        </Button>
      </Fragment>
    );
    const classifyComs = classifyList.map(item => (
      <Select.Option value={item.value} key={item.value}>
        {item.label}
      </Select.Option>
    ));
    const uploadButton = (
      <div>
        <Icon type="plus" />
        <div className="ant-upload-text">点击上传</div>
      </div>
    );
    const columnComs = columnList.map(item => (
      <Select.Option value={item.value} key={item.value}>
        {item.label}
      </Select.Option>
    ));

    return (
      <PageHeaderLayout>
        <div className="common-layout">
          <div className="btncls clearfix">{btnComs}</div>
          <Form>
            <Item label="标题" {...formItemLayout}>
              {getFieldDecorator('title', {
                initialValue: this.state.articleData.title,
                rules: [
                  {
                    required: true,
                    message: '请输入标题',
                  },
                ],
              })(<Input className={styles.input} />)}
            </Item>
            <Item label="检索关键字" {...formItemLayout}>
              {getFieldDecorator('keyWord', {
                initialValue: this.state.articleData.keyWords,
                rules: [
                  {
                    required: true,
                    message: '请输入检索关键字',
                  },
                ],
              })(<Input className={styles.input} />)}
            </Item>
            <Item label="分类" {...formItemLayout}>
              {getFieldDecorator('classify', {
                initialValue: this.state.articleData.classify,
                rules: [
                  {
                    required: true,
                    message: '请选择分类',
                  },
                ],
              })(
                <Fragment>
                  <Select className={styles.select1}>{classifyComs}</Select>
                  <Select className={styles.select2}>{columnComs}</Select>
                </Fragment>
              )}
            </Item>
            <Item label="来源" {...formItemLayout}>
              {getFieldDecorator('origin', {
                initialValue: this.state.articleData.origin,
                rules: [
                  {
                    required: true,
                    message: '请输入检索关键字',
                  },
                ],
              })(<Input className={styles.input} />)}
            </Item>
            <Item label="封面图" {...formItemLayout}>
              <Upload
                action="//jsonplaceholder.typicode.com/posts/" // 上传地址
                onPreview={this.handlePreviewChange}
                onChange={this.handleUploadChange}
                listType="picture-card"
                // headers={{
                //   "Access-Control-Allow-Origin": "*",
                // }}
              >
                {fileList.length >= 1 ? null : uploadButton}
              </Upload>
              <Modal visible={previewVisible} onCancel={this.handlePreviewCancel} footer={null}>
                <img alt="上传预览" style={{ width: '100%' }} src={previewImage} />
              </Modal>
            </Item>
            <Item label="内容" {...formItemLayout}>
              <ReactQuill
                value={this.state.quillText}
                modules={quillModules}
                onChange={this.handleQuillChange}
                className={styles.quill}
              />
            </Item>
            <Item label="附件" {...formItemLayout}>
              <Upload action="//jsonplaceholder.typicode.com/posts/">
                <Button>
                  <Icon type="upload" /> Upload
                </Button>
              </Upload>
            </Item>
          </Form>
          <Modal
            visible={saveVisible}
            onCancel={this.saveCancel}
            title="保存"
            className={styles.box}
          >
            {/* <div>
              <span>保存类型</span>
              <Radio.Group value >
                <Radio value='' ></Radio>
              </Radio.Group>
            </div> */}
            <Form>
              <Item label="保存类型" {...savaLayout}>
                {getFieldDecorator('saveType', {
                  initialValue: this.state.saveData.hot,
                  rules: [
                    {
                      required: true,
                      message: '请选择保存类型',
                    },
                  ],
                })(
                  <Radio.Group>
                    <Radio value="0">是</Radio>
                    <Radio value="1">否</Radio>
                  </Radio.Group>
                )}
              </Item>
            </Form>
          </Modal>
        </div>
      </PageHeaderLayout>
    );
  }
}
