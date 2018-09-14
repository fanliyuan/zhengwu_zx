/*
 * @Author: ChouEric
 * @Date: 2018-07-24 18:12:55
 * @Last Modified by: ChouEric
 * @Last Modified time: 2018-09-14 11:37:30
 * @Description: 新增文章
 *  react-quill富文本编辑器的图片没有标识,可能会更改https://github.com/margox/braft-editor
 *  目前 图片 在上传成功后有闪烁的问题,解决办法之一就是在返回公网图片地址之后,作为自定义属性加上去,
 *  例如 data-src="base64..." 然后在提交前,统一替换data-src为src,然后把src替换为空;
 */
import React, { Component, Fragment } from 'react'
import { Link } from 'dva/router'
import { Form, Input, Select, Upload, Modal, Button, Icon, message, Tooltip } from 'antd'
import ReactQuill from 'react-quill'
import { connect } from 'dva'
import fetch from 'dva/fetch'
import moment from 'moment'

import PageHeaderLayout from '../../layouts/PageHeaderLayout'
import config from '../../api/config'
import 'react-quill/dist/quill.snow.css'
import styles from './AddArticle.less'

function getCookie(params) {
  const temp = document.cookie.match(new RegExp(`${params}=.*;`))
  const other = document.cookie.match(new RegExp(`${params}=.*`))
  if (temp) {
    return temp[0].replace(`${params}=`,'')
  } else if (other) {
    return other[0].replace(`${params}=`,'')
  } else {
    return ''
  }
}

// 为了实现控制输入字数功能
class MyInput extends Component {
  state = {
    value: '',
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.value) {
      this.setState({
        value: nextProps.value,
      })
    }
  }

  onChange = e => {
    this.setState({
      value: e.target.value.substr(0,50) || '',
    }, () => {
      const { value } = this.state
      this.props.onItemChange(value)
    })
  }

  render() {
    const {value} = this.state
    const {placeholder, className} = this.props
    return <Input value={value} onChange={this.onChange} placeholder={placeholder} className={className} />
  }
}

const { downloadServer, uploadServer } = config

const { Item } = Form
const formItemLayout = {
  labelCol: {
    span: 2,
  },
  wrapperCol: {
    span: 22,
  },
}

// const savaLayout = {
//   labelCol: {
//     span: 6,
//   },
//   wrapperCol: {
//     span: 12,
//   },
// }

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
    const uploadURL = `${uploadServer}/uploadOssImage` // 图片上传文件服务器
    // eslint-disable-next-line
    const downloadURL = `${downloadServer}/downloadImage` // 图片下载文件服务器 
    if (
      ops &&
      ops[ops.length - 1] &&
      ops[ops.length - 1].insert &&
      ops[ops.length - 1].insert.image
    ) {
      const imgURL = ops[ops.length - 1].insert.image
  
      if (!imgURL || imgURL === 'null') {
        return null
      }
      const image = convertBase64UrlToBlob(imgURL)
  
      const formData = new FormData()
      formData.append('file', image, 'image.jpg')
      fetch(`${uploadURL}?tenantId=${localStorage.getItem('tenantId') || localStorage.getItem('accountId')}`,{
          method: 'POST',
          body: formData,
          headers: {
            accessToken: getCookie('accessToken'),
          },
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
          quillText: value.replace(imgURL, res.result.data),
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
@connect(({ articleLibrary, loading }) => ({
  articleLibrary,
  loading: loading.models.articleLibrary,
}))
export default class AddArticle extends Component {
  state = {
    quillText: '',
    // articleData: {},
    // saveData: {},
    // saveVisible: false,
    fileList: [],
    previewVisible: false,
    previewImage: '',
    previewArticle: false,
    hasSubmit: false,// eslint-disable-line
    coverUrl: '',
    uploadFileList: [],
    previewHTML: '',
    fileResponse: '',
    timeFlag: undefined,
  }

  componentDidMount() {
    this.setState({
      quillText: '',
    })
    this.props.dispatch({
      type: 'articleLibrary/getCategories',
    })
    if (this.props.location.pathname === '/portalManagement/AddArticle') {
     this.props.dispatch({
       type: 'articleLibrary/saveArticleInfo',
       payload: {},
     })
    } else {
      this.props.dispatch({
        type: 'articleLibrary/getArticleInfo',
        payload: {
          params: {
            articleId: this.props.location.state.articleId,
          },
        },
      })
    }
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.articleLibrary.articleInfo !== nextProps.articleLibrary.articleInfo && nextProps.articleLibrary.articleInfo.articleContent) {
      this.setState({
        quillText: nextProps.articleLibrary.articleInfo.articleContent,
      })
    }
    if (this.props.articleLibrary.articleInfo !== nextProps.articleLibrary.articleInfo && nextProps.articleLibrary.articleInfo.imgPath) {
      const {imgPath} = nextProps.articleLibrary.articleInfo
      this.setState({
        coverUrl: imgPath,
        fileList: [{uid: -1, name: 'default.png', status: 'done', url: imgPath}],
      })
    }
    if (this.props.articleLibrary.articleInfo !== nextProps.articleLibrary.articleInfo && nextProps.articleLibrary.articleInfo.filePath) {
      this.setState({
        uploadFileList: [{uid: -2, name: '已有附件', status: 'done'}],
      })
    }
  }

  titleChange = value => {
    // const value = e.target.value
    this.props.form.setFieldsValue({
      articleTitle: value,
    })
    this.props.form.validateFields(['articleTitle'])
  }

  originChange = value => {
    // const value = e.target.value
    this.props.form.setFieldsValue({
      articleSource: value,
    })
    this.props.form.validateFields(['articleSource'])
  }

  // eslint-disable-next-line
  handleQuillChange = (value, delta, source, editor) => {
    this.setState({
      quillText: value,
    })
    base64UrlToUrl(value, delta, this)
  }

  // keywordChange = arrValue => {
  //   return arrValue
  //   // return e.target.value.trim()
  // }

  // keywordNormalize = (value, preValues) => {
  //   console.log(value)
  //   return value
  // }

  handleUploadChange = ({ fileList, file }) => {
    this.setState({ fileList })
    try {
      if (file.status === 'done') {
        this.setState({
          coverUrl: file.response.result.data,
        })
      }
    } catch (error) {
     // eslint-disable-next-line 
     console.log(error)
    }
  }

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

  handlePreviewArticle = () => {
    const { quillText } = this.state
    this.setState({
      previewArticle: true,
    previewHTML: `<h1 class="ql-align-center">${this.props.form.getFieldValue('articleTitle')}</h1><p class="ql-align-center" style="color:silver;font-size:14px;margin:16px 0;" ><span style="margin-right: 120px" >来源 : ${this.props.form.getFieldValue('articleSource')}</span><span>日期 : ${moment(Date.now()).format('ll')}</span></p>${quillText}`,
    })
  }

  handlePreviewArticleCancle = () => {
    this.setState({
      previewArticle: false,
    })
  }

  handleUploadFile = ({ file, fileList }) => {
    // if (fileList.length !== 0) {
    //   this.setState({
    //     uploadFileList: fileList.filter(item => item.status === 'done').map(item => {
    //       return {
    //         name: item.name,
    //         lastModifined: item.lastModifined,
    //         url: item.response.result.data,
    //         lastModifinedPerson: localStorage.getItem('accountRealName') || localStorage.getItem('accountName') || localStorage.getItem('accountId'),
    //       }
    //     }),
    //     fileResponse: fileList[0] && fileList[0].response.result.data,
    //   })
    // } else {
    //   this.setState({
    //     uploadFileList: [],
    //     fileResponse: '',
    //   })
    // }
    this.setState({
      uploadFileList: [[...fileList].pop()],
    })
    if (file && file.status === 'done') {
      this.setState({
        fileResponse: file.response.result.data,
      })
    } else {
      this.setState({
        fileResponse: '',
      })
    }
  }

  handleRemove = () => {
    this.setState({
      fileResponse: '',
      uploadFileList: [],
    })
  }

  // saveChange = () => {
  //   this.setState({
  //     saveVisible: true,
  //   })
  // }

  // saveCancel = () => {
  //   this.setState({
  //     saveVisible: false,
  //   })
  // }

  handleSave = () => {
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        const { dispatch } = this.props
        const { quillText, coverUrl, fileResponse } = this.state
        values.articleWord = values.articleWord.join(',')
        // 这里是base64的正则,提交前需要保证所有地址被替换,也就是需要个标识符,代表是否已经提交
        const base64Reg = /src="data:image\/[a-z]{3,4};base64,.*"/
        // console.log(base64Reg.test('<p>111<img src="data:image/jpeg;base64,/1231231231321">'))// eslint-disable-line
        if (base64Reg.test(quillText)) {
          message.error('图片上传中,请勿操作操作页面.')
          clearInterval(this.state.timeFlag)
          this.setState({
            timeFlag: setInterval(() => {
              if (base64Reg.test(quillText)) {
                clearInterval(this.state.timeFlag)// eslint-disable-line
                message.success('图片上传完成')
                // this.handleSave()
              }
            },1000),
          })
          return null
        }
        // return console.log(values)
        if (this.props.location.pathname === '/portalManagement/AddArticle') {
              // console.log('新增')// eslint-disable-line
              dispatch({
                type: 'articleLibrary/insertArticle',
                payload: {
                  body: {
                    articleContent: quillText,
                    ...values,
                    articlePname: localStorage.getItem('accountRealName') || localStorage.getItem('accountName') || localStorage.getItem('accountId'),
                    imgPath: coverUrl,
                    // filePath: uploadFileList.length === 0 ? undefined : JSON.stringify(uploadFileList),
                    filePath: fileResponse,
                  },
                },
              })
        } else {
          dispatch({
            type: 'articleLibrary/updateArticle',
            payload: {
              body: {
                articleContent: quillText,
                ...values,
                articleId: this.props.location.state.articleId,
                articlePname: localStorage.getItem('accountRealName') || localStorage.getItem('accountName') || localStorage.getItem('accountId'),
                imgPath: coverUrl,
                // filePath: uploadFileList.length === 0 ? undefined : JSON.stringify(uploadFileList),
                filePath: fileResponse,
              },
            },
          })
        }
      }
    })
  }

  render() {
    const { getFieldDecorator } = this.props.form
    const { fileList, uploadFileList, previewImage, previewVisible, previewArticle, previewHTML } = this.state
    const { articleLibrary: { articleInfo, categoryList } } = this.props
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

    const btnComs = (
      <Fragment>
        <Link to="/portalManagement/newsLibrary" className={styles.fr}>
          <Button>返回</Button>
        </Link>
        <Button className={styles.fr} onClick={this.handlePreviewArticle}>预览</Button>
        <Button type="primary" className={styles.fr} onClick={this.handleSave}>
          保存
        </Button>
      </Fragment>
    )
    
    const uploadButton = (
      <div>
        <Icon type="plus" />
        <div className="ant-upload-text">点击上传</div>
      </div>
    )
    const columnComs = categoryList.filter(item => item.categoryName !== '全部分类').map(item => (
      <Select.Option value={item.categoryId} key={item.categoryId}>
        {item.categoryName}
      </Select.Option>
    ))

    return (
      <PageHeaderLayout>
        <div className="common-layout">
          <div className="btncls clearfix">{btnComs}</div>
          <Form>
            <Item label="标题" {...formItemLayout}>
            
              {getFieldDecorator('articleTitle', {
                initialValue: articleInfo.articleTitle,
                rules: [
                  {
                    required: true,
                    message: '请输入标题',
                  },
                  {
                    max: 50,
                    message: '文章标题不超过50个字符',
                  },
                ],
              // })(<Input className={styles.input} onChange={this.titleChange} />)}
              })(<MyInput className={styles.input} onItemChange={this.titleChange} />)}
            </Item>
            <Item label={<span>关键字 <Tooltip title='输入逗号(,)或者按下回车将自动分隔关键字'><Icon type='question-circle-o' /></Tooltip></span>} {...formItemLayout}>
              {getFieldDecorator('articleWord', {
                initialValue: articleInfo.articleWord && articleInfo.articleWord.split(','),
                // getValueFromEvent: this.keywordChange,
                // normalize: this.keywordNormalize,
                rules: [
                  {
                    required: true,
                    message: '请输入检索关键字',
                  },
                  {
                    max: 50,
                    message: '最多设置50个关键字',
                    transform: (arrValue=[]) => arrValue.join(''),
                  },
                ],
              // })(<Input className={styles.input} placeholder="关键字1;关键字2" />)}
              })(<Select mode='tags' dropdownStyle={{display: 'none'}} tokenSeparators={[',', '，']} className={styles.input} />)}
            </Item>
            <Item label="分类" {...formItemLayout}>
              {getFieldDecorator('articleFid', {
                initialValue: articleInfo.articleFid,
                rules: [
                  {
                    required: true,
                    message: '请选择分类',
                  },
                ],
              })(
                <Select className={styles.select2}>{columnComs}</Select>
              )}
            </Item>
            <Item label={<span>来源 <Tooltip title='文章来自某某媒体或者原创'><Icon type='question-circle-o' /></Tooltip></span>} {...formItemLayout}>
              {getFieldDecorator('articleSource', {
                initialValue: articleInfo.articleSource,
                rules: [
                  {
                    required: true,
                    message: '请输入文章来源',
                  },
                  {
                    max: 50,
                    message: '来源不超过50个字符',
                  },
                ],
              })(<MyInput className={styles.input} onItemChange={this.originChange} />)}
            </Item>
            <Item
              label="封面图"
              {...formItemLayout}
              extra={
                <span style={{ color: '#e4393c' }}>
                  说明：最大不超过5M,格式支持jpg、png、gif、bmp
                </span>
              }
              >
              <Upload
                action={`${uploadServer}/uploadOssImage?tenantId=${localStorage.getItem('tenantId') || localStorage.getItem('accountId')}`} // 上传地址
                headers={{accessToken: getCookie('accessToken')}}
                fileList={fileList}
                listType="picture-card"
                onPreview={this.handlePreviewChange}
                onChange={this.handleUploadChange}
                beforeUpload={file => {
                  if (file.type.startsWith('image/')) {
                    if (file.size <= 5 * 1024 *1024) {
                      return true
                    } else {
                      message.error('图片文件超过5M')
                      return false
                    }
                  } else {
                    message.error('请上传图片文件')
                    return false
                  }
                }}
                >
                {fileList.length >= 1 ? null : uploadButton}
              </Upload>
              <Modal visible={previewVisible} onCancel={this.handlePreviewCancel} footer={null} className={styles.img}>
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
                <div style={{ color: '#e4393c' }}>说明：文件最大不超过100M,多文件请上传压缩文件</div>
              }
              >
              <Upload 
                action={`${uploadServer}/uploadOssFile?tenantId=${localStorage.getItem('tenantId') || localStorage.getItem('accountId')}`} // 上传地址
                headers={{accessToken: getCookie('accessToken')}}
                beforeUpload={file => {
                  if (file.size <= 100 * 1024 * 1024) {
                    return true
                  } else {
                    message.error('文件大小超过100M')
                    return false
                  }
                }}
                fileList={uploadFileList}
                onChange={this.handleUploadFile}
                onRemove={this.handleRemove}
                >
                <Button>
                  <Icon type="upload" /> 上传
                </Button>
              </Upload>
            </Item>
          </Form>
          {/* <Modal
            visible={saveVisible}
            onCancel={this.saveCancel}
            title="保存"
            className={styles.box}
            >
            <Form>
              <Item label="保存类型" {...savaLayout}>
                {getFieldDecorator('saveType', {
                  initialValue: ~~articleInfo.articleTopState,
                  rules: [
                    {
                      required: true,
                      message: '请选择保存类型',
                    },
                  ],
                })(
                  <Radio.Group>
                    <Radio value={1}>是</Radio>
                    <Radio value={0}>否</Radio>
                  </Radio.Group>
                )}
              </Item>
            </Form>
          </Modal> */}
          <Modal visible={previewArticle} onCancel={this.handlePreviewArticleCancle} className={styles.preview} footer={null}>
            <div className='ql-editor'>
              <div 
                dangerouslySetInnerHTML={{__html: previewHTML}} // eslint-disable-line
                />
            </div>
          </Modal>
        </div>
      </PageHeaderLayout>
    )
  }
}
