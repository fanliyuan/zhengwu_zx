import React, { Component, Fragment } from 'react'
import { Link } from 'dva/router'
import { Form, Input, Select, Radio, Upload, Button, InputNumber, Icon, Modal } from 'antd'

import PageHeaderLayout from '../../layouts/PageHeaderLayout'
import styles from './AddCarousel.less'

const { Item } = Form
const itemLayout = {
  labelCol: {
    span: 2,
  },
  wrapperCol: {
    span: 20,
  },
}

@Form.create()
export default class AddCarousel extends Component {
  state = {
    name: '',
    column: [],
    sort: 0,
    urlType: '',
    url: '',
    image: '',
    previewVisible: false,
    previewUrl: '',
    fileList: [],
  }

  uploadChange = ({fileList}) => {
    this.setState({
      fileList,
    })
  }

  handlePreview = (file) => {
    this.setState({
      previewUrl: file.url || file.thumbUrl,
      previewVisible: true,
    })
  }

  previewCancel = () => {
    this.setState({
      previewVisible: false,
    })
  }

  render() {
    const { name, column, sort, urlType, url, image, fileList, previewUrl, previewVisible } = this.state
    const { getFieldDecorator } = this.props.form
    const fColList = [
      {
        value: 0,
        label: '首页',
      },
      {
        value: 1,
        label: '开发动态',
      },
      {
        value: 2,
        label: '目录',
      },
    ]
    const sColList = [
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

    const fColComs = fColList.map(item => (
      <Select.Option value={item.value} key={item.value} >{item.label}</Select.Option>
    ))
    const sColComs = sColList.map(item => (
      <Select.Option value={item.value} key={item.value} >{item.label}</Select.Option>
    ))

    const btnComs = (
      <Fragment>
        <Link to='/portalManagement/carouselManagement' className={styles.fr} ><Button type='primary' >返回</Button></Link>
        <Button type='primary' className={styles.fr} >保存</Button>
      </Fragment>
    )
    const uploadBtn = (
      <Fragment>
        <Icon type='upload' />
        <div>点击上传</div>
      </Fragment>
    )

    return (
      <PageHeaderLayout>
        <div className='common-layout' >
          <div className='clearfix' >
            {btnComs}
          </div>
          <Form>
            <Item label='名称' {...itemLayout} >
              {
                getFieldDecorator('name', {
                  initialValue: name,
                  rules: [
                    {
                      required: true,
                      message: '请输入名称',
                    },
                  ],
                })(
                  <Input className={styles.input} />
                )
              }
            </Item>
            <Item label='栏目' {...itemLayout} >
              {
                getFieldDecorator('column', {
                  initialValue: column,
                  rules: [
                    {
                      required: true,
                      message: '请输入名称',
                    },
                  ],
                })(
                  // 这里类似级联
                  <Fragment>
                    <Select className={styles.select1}>
                      {fColComs}
                    </Select>
                    <Select className={styles.select2}>
                      {sColComs}
                    </Select>
                  </Fragment>
                )
              }
            </Item>
            <Item label='排序' {...itemLayout} >initialValue
              {
                getFieldDecorator('sort', {
                  initValue: sort,
                  rules: [
                    {
                      required: true,
                      message: '请输入排序',
                    },
                  ],
                })(
                  <InputNumber className={styles.input} />
                )
              }
            </Item>
            <Item label='资源地址类型' {...itemLayout} >
              {
                getFieldDecorator('urlType', {
                  initialValue: urlType,
                  rules: [
                    {
                      required: true,
                      message: '请输入名称',
                    },
                  ],
                })(
                  <Radio.Group>
                    <Radio value='0' >绝对路径</Radio>
                    <Radio value='1' >相对路径</Radio>
                  </Radio.Group>
                )
              }
            </Item>
            <Item label='资源地址' {...itemLayout} >
              {
                getFieldDecorator('url', {
                  initialValue: url,
                  rules: [
                    {
                      required: true,
                      message: '请输入名称',
                    },
                  ],
                })(
                  <Input className={styles.input} />
                )
              }
            </Item>
            <Item label='封面图' {...itemLayout} >
              {
                getFieldDecorator('image', {
                  rules: [
                    {
                      required: true,
                      message: '请上传图片',
                    },
                  ],
                })(
                  <Upload
                    action="//jsonplaceholder.typicode.com/posts/" // 上传地址
                    listType='picture-card'
                    onChange={this.uploadChange}
                    onPreview={this.handlePreview}
                  >
                    {fileList.length >= 1 ? null : uploadBtn}
                  </Upload>
                )
              }
            </Item>
          </Form>
          <Modal visible={previewVisible} footer={null} onCancel={this.previewCancel} >
            <img src={previewUrl} alt='图片预览' style={{width: '100%'}} />
          </Modal>
        </div>
      </PageHeaderLayout>
    )
  }
}
