/*
 * @Author: ChouEric
 * @Date: 2018-07-24 18:12:55
 * @Last Modified by: ChouEric
 * @Last Modified time: 2018-08-06 13:51:58
 * @Description: 新增文章
 *  react-quill富文本编辑器的图片没有标识,可能会更改https://github.com/margox/braft-editor
 */
import React, { Component, Fragment } from 'react'
import { Link, routerRedux } from 'dva/router'
import { Form, Input, Select, Upload, Modal, Button, Icon, Radio, message } from 'antd'
import ReactQuill from 'react-quill'
import { connect } from 'dva'
import fetch from 'dva/fetch'

import PageHeaderLayout from '../../layouts/PageHeaderLayout'
import 'react-quill/dist/quill.snow.css'
import styles from './AddArticle.less'

const { Item } = Form
const formItemLayout = {
  labelCol: {
    span: 2,
  },
  wrapperCol: {
    span: 22,
  },
}
const savaLayout = {
  labelCol: {
    span: 6,
  },
  wrapperCol: {
    span: 12,
  },
}

// base64转换为blob流
const convertBase64UrlToBlob = urlData => {
  // 去掉url的头，并转换为byte
  const bytes = window.atob(urlData.split(',')[1])
  // 处理异常,将ascii码小于0的转换为大于0
  const ab = new ArrayBuffer(bytes.length)
  const ia = new Uint8Array(ab)
  ia.forEach((i, index) => {
    ia[index] = bytes.charCodeAt(index)
  })
  return new Blob([ia], {
    type: urlData
      .split(',')[0]
      .split(':')[1]
      .split(';')[0],
  })
}
// 上传图片成功后替换img的url地址
/**
 * 
 * @param {string} value quill组件onChange事件传入的html字符串
 * @param {object} delta quill组件onChange事件出入的delta对象,包含当前插入的对象
 * @param {object} _this 当前页面组件的this,不传或者传入错误,函数将报错
 */
const base64UrlToUrl = (value, delta, _this) => {
  try {
    const { ops } = delta
    const uploadURL = 'http://192.168.100.16:8804/uploadImage' // 图片上传文件服务器
    const downloadURL = 'http://192.168.100.16:8804/dowloadImage' // 图片下载文件服务器
    if (
      ops &&
      ops[ops.length - 1] &&
      ops[ops.length - 1].insert &&
      ops[ops.length - 1].insert.image
    ) {
      const imgURL = ops[ops.length - 1].insert.image
      const image = convertBase64UrlToBlob(imgURL)
      const formData = new FormData()
      formData.append('file', image, 'image.jpg')
      fetch(uploadURL,{
          method: 'POST',
          body: formData,
        }
      ).then(res => {
        return res.json()
      }).then(res => {
        if (res.code !== 0) {
          message.error('图片上传失败,请删除图片重试!')
          console.log('返回结果非0', res.code)// eslint-disable-line
          return null
        }
        // 这里是替换地址操作
        _this.setState({
          quillText: value.replace(imgURL, downloadURL+res.result.data),
        }, () => {
          if (_this.state.hasSubmit) {
            // 这里跳转
          }
        })
      }).catch(err => {
        message.error('图片上传失败,网络不通或者请求错误!')
        console.log('请求错误')// eslint-disable-line
        console.log(err)// eslint-disable-line
      })
    }
  } catch (error) {
    console.log(error)// eslint-disable-line
  }
}

@Form.create()
@connect(({ addArtice }) => ({
  addArtice,
}))
export default class AddArticle extends Component {
  state = {
    quillText: '',
    articleData: {},
    saveData: {},
    fileList: [],
    previewVisible: false,
    previewImage: '',
    saveVisible: false,
    hasSubmit: false,// eslint-disable-line
  }

  componentDidMount() {
  }

  // eslint-disable-next-line
  handleQuillChange = (value, delta, source, editor) => {
    this.setState({
      quillText: value,
    })
    base64UrlToUrl(value, delta, this)
  }

  handleUploadChange = ({ fileList }) => this.setState({ fileList })

  handlePreviewChange = file => {
    this.setState({
      previewImage: file.url || file.thumbUrl,
      previewVisible: true,
    })
  }

  handlePreviewCancel = () => {
    this.setState({
      previewVisible: false,
    })
  }

  handleSave = () => {
    // this.setState({
    //   saveVisible: true,
    // })
    const { dispatch } = this.props
    // 这里是base64的正则,提交前需要保证所有地址被替换,也就是需要个标识符,代表是否已经提交
    const base64Reg = /src="data:image\/[a-z]{3,4};base64,.*"/
    console.log(base64Reg.test('<p>111<img src="data:image/jpeg;base64,/1231231231321">'))// eslint-disable-line
    dispatch(routerRedux.push('/portalManagement/newsLibrary'))
  }

  saveCancel = () => {
    this.setState({
      saveVisible: false,
    })
  }

  render() {
    const { getFieldDecorator } = this.props.form
    const { fileList, previewImage, previewVisible, saveVisible } = this.state
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
    }
    // const classifyList = [
    //   {
    //     value: 0,
    //     label: '惠民',
    //   },
    //   {
    //     value: 1,
    //     label: '法规',
    //   },
    // ]
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
    ]
    const btnComs = (
      <Fragment>
        <Link to="/portalManagement/newsLibrary" className={styles.fr}>
          <Button>返回</Button>
        </Link>
        <Button className={styles.fr}>预览</Button>
        <Button type="primary" className={styles.fr} onClick={this.handleSave}>
          保存
        </Button>
      </Fragment>
    )
    // const classifyComs = classifyList.map(item => (
    //   <Select.Option value={item.value} key={item.value}>
    //     {item.label}
    //   </Select.Option>
    // ))
    const uploadButton = (
      <div>
        <Icon type="plus" />
        <div className="ant-upload-text">点击上传</div>
      </div>
    )
    const columnComs = columnList.map(item => (
      <Select.Option value={item.value} key={item.value}>
        {item.label}
      </Select.Option>
    ))

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
            <Item label="关键字" {...formItemLayout}>
              {getFieldDecorator('keyWord', {
                initialValue: this.state.articleData.keyWords,
                rules: [
                  {
                    required: true,
                    message: '请输入检索关键字',
                  },
                ],
              })(<Input className={styles.input} placeholder="关键字1;关键字2" />)}
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
                  {/* <Select className={styles.select1}>{classifyComs}</Select> */}
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
            <Item
              label="封面图"
              {...formItemLayout}
              extra={
                <div style={{ color: '#e4393c' }}>
                  说明：最大不超过5M,格式支持jpg、png、gif、bmp
                </div>
              }
              >
              <Upload
                action="//jsonplaceholder.typicode.com/posts/" // 上传地址
                onPreview={this.handlePreviewChange}
                onChange={this.handleUploadChange}
                listType="picture-card"
                >
                {fileList.length >= 1 ? null : uploadButton}
              </Upload>
              <Modal visible={previewVisible} onCancel={this.handlePreviewCancel} footer={null}>
                <img alt="上传预览" style={{ width: '100%' }} src={previewImage} />
              </Modal>
            </Item>
            <Item label="内容" {...formItemLayout}>
              {<ReactQuill
                value={this.state.quillText}
                modules={quillModules}
                onChange={this.handleQuillChange}
                className={styles.quill}
                />}
            </Item>
            <Item
              label="附件"
              {...formItemLayout}
              extra={
                <div style={{ color: '#e4393c' }}>说明：单个文件最大不超过100M,最多上传5个文件</div>
              }
              >
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
    )
  }
}
