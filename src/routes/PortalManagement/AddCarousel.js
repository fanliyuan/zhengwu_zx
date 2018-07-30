import React, { Component, Fragment } from 'react'
import { Link } from 'dva/router'
import {
  Form,
  Input,
  Select,
  Radio,
  Upload,
  Button,
  InputNumber,
  Icon,
  Modal,
  message,
  Tooltip,
} from 'antd'
// import copy from 'copy-to-clipboard' //复制到剪切板

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

function hasErrors(fieldErrors) {
  return Object.keys(fieldErrors).some(item => fieldErrors[item])
}

class Column extends Component {
  state = {
    first: 1,
    second: 11,
  }

  componentWillReceiveProps(nextProps) {
    if ('value' in nextProps) {
      this.setState(nextProps.value)
    }
  }

  firstChange = val => {
    this.setState(
      {
        first: val,
      },
      () => this.props.onChange({ ...this.state })
    )
  }

  secondChange = val => {
    this.setState(
      {
        second: val,
      },
      () => this.props.onChange({ ...this.state })
    )
  }

  render() {
    const { first, second } = this.state
    const { firstList = [], secondList = [] } = this.props
    const firstComs = firstList.map(item => (
      <Select.Option value={item.value} key={item.value}>
        {item.label}
      </Select.Option>
    ))
    const secondComs = secondList.map(item => (
      <Select.Option value={item.value} key={item.value}>
        {item.label}
      </Select.Option>
    ))
    return (
      <Fragment>
        <Select value={first} onChange={this.firstChange} className={styles.select1}>
          {firstComs}
        </Select>
        <Select value={second} onChange={this.secondChange} className={styles.select2}>
          {secondComs}
        </Select>
      </Fragment>
    )
  }
}

@Form.create() // eslint-disable-line
export default class AddCarousel extends Component {
  state = {
    name: '',
    column: { first: 1, second: 11 },
    sort: 1,
    urlType: 1,
    url: '',
    image: false,
    previewVisible: false,
    previewUrl: '',
    fileList: [],
    columnList: [
      {
        value: 1,
        label: '首页',
        children: [
          {
            value: 11,
            label: '最新动态',
          },
          {
            value: 12,
            label: '重要新闻',
          },
          {
            value: 13,
            label: '通知公告',
          },
          {
            value: 14,
            label: '最新政策',
          },
          {
            value: 15,
            label: '政策解读',
          },
          {
            value: 16,
            label: '热门政题',
          },
        ],
      },
      {
        value: 2,
        label: '开发动态',
        children: [
          {
            value: 21,
            label: '动态1',
          },
          {
            value: 22,
            label: '动态2',
          },
        ],
      },
      {
        value: 3,
        label: '目录',
        children: [
          {
            value: 31,
            label: '目录1',
          },
          {
            value: 32,
            label: '目录2',
          },
        ],
      },
    ],
    sColList: [],
  }

  componentDidMount() {
    if (!this.state.sColList.length) {
      this.setState({
        sColList: this.state.columnList[0].children, // eslint-disable-line
      })
    }
    this.props.form.validateFields()
  }

  uploadChange = ({ fileList }) => {
    this.setState({
      fileList,
    })
  }

  handlePreview = file => {
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

  columnChange = value => {
    this.state.columnList.some(item => {
      if (item.value === value.first) {
        value.second = item.children[0].value
        this.setState({
          sColList: item.children,
        })
        return true
      } else {
        return false
      }
    })
  }

  normFile = e => {
    if (e && e.fileList && e.fileList[0]) {
      if (e.fileList[0].status === 'error') {
        this.setState({
          image: true,
        })
      }
      return e.fileList[0].status === 'error' ? null : '成功'
    } else {
      console.log('上传失败') // eslint-disable-line
      this.setState({
        image: false,
      })
      return null
    }
  }

  handleSave = () => {
    this.props.form.validateFieldsAndScroll((errors, values) => {
      if (!errors) {
        message.success('通过表单验证,可以提交,控制台将打印表单值')
        console.log(values) // eslint-disable-line
      } else {
        console.log('表单未通过验证', values) // eslint-disable-line
      }
    })
  }

  render() {
    const {
      name,
      column,
      sort,
      urlType,
      url,
      image,
      fileList,
      previewUrl,
      previewVisible,
      sColList,
      columnList,
    } = this.state
    const { getFieldDecorator, getFieldError, getFieldsError, isFieldTouched } = this.props.form

    const fColList = columnList.map(item => ({ value: item.value, label: item.label }))

    const nameError = isFieldTouched('name') && getFieldError('name')
    const columnError = isFieldTouched('column') && getFieldError('column')
    const sortError = isFieldTouched('sort') && getFieldError('sort')
    const urlTypeError = isFieldTouched('urlType') && getFieldError('urlType')
    const urlError = isFieldTouched('url') && getFieldError('url')
    const imageError = isFieldTouched('image') && getFieldError('image')

    const btnComs = (
      <Fragment>
        <Link to="/portalManagement/carouselManagement" className={styles.fr}>
          <Button type="primary">返回</Button>
        </Link>
        <Button
          type="primary"
          className={styles.fr}
          disabled={hasErrors(getFieldsError())}
          onClick={this.handleSave}
        >
          保存
        </Button>
      </Fragment>
    )
    const uploadBtn = (
      <Fragment>
        <Icon type="upload" />
        <div>点击上传</div>
      </Fragment>
    )

    return (
      <PageHeaderLayout>
        <div className="common-layout">
          {/* 面包屑行的按钮 */}
          <div className="btncls">{btnComs}</div>
          <Form>
            <Item
              label="名称"
              {...itemLayout}
              validateStatus={nameError ? 'error' : ''}
              help={nameError ? '请输入名称' : ''}
            >
              {getFieldDecorator('name', {
                initialValue: name,
                rules: [
                  {
                    required: true,
                    message: '请输入名称',
                  },
                ],
              })(<Input className={styles.input} />)}
            </Item>
            <Item
              label="栏目"
              {...itemLayout}
              validateStatus={columnError ? 'error' : ''}
              help={columnError ? '选择栏目' : ''}
            >
              {getFieldDecorator('column', {
                initialValue: column,
                rules: [
                  {
                    required: true,
                    message: '请输入名称',
                  },
                ],
              })(
                // 这里类似级联
                <Column firstList={fColList} secondList={sColList} onChange={this.columnChange} />
              )}
            </Item>
            <Item
              label="排序"
              {...itemLayout}
              validateStatus={sortError ? 'error' : ''}
              help={sortError ? '请输入排序' : ''}
            >
              {getFieldDecorator('sort', {
                initialValue: sort,
                rules: [
                  {
                    required: true,
                    message: '请输入排序',
                  },
                ],
              })(<InputNumber className={styles.input} />)}
            </Item>
            <Item
              label="资源地址类型"
              {...itemLayout}
              validateStatus={urlTypeError ? 'error' : ''}
              help={urlTypeError ? '请选择链接类型' : ''}
            >
              {getFieldDecorator('urlType', {
                initialValue: urlType,
                rules: [
                  {
                    required: true,
                    message: '请输入名称',
                  },
                ],
              })(
                <Radio.Group>
                  <Radio value={0}>绝对路径</Radio>
                  <Radio value={1}>相对路径</Radio>
                </Radio.Group>
              )}
            </Item>
            <Item
              label="资源地址"
              {...itemLayout}
              validateStatus={urlError ? 'error' : ''}
              help={urlError ? '请输入链接地址' : ''}
            >
              {getFieldDecorator('url', {
                initialValue: url,
                rules: [
                  {
                    required: true,
                    message: '请输入名称',
                  },
                ],
              })(<Input className={styles.input} />)}
            </Item>
            <Item
              label={
                <span>
                  封面图&nbsp;
                  <Tooltip title="说明：宽高1920*600，最大不超过5M，格式支持jpg 、png、gif、bmp">
                    <Icon type="question-circle-o" />
                  </Tooltip>&nbsp;
                </span>
              }
              {...itemLayout}
              validateStatus={imageError ? 'error' : ''}
              help={imageError ? '请上传封面图' : ''}
              extra={image ? '网络或者服务器错误,上传图片失败' : ''}
            >
              {getFieldDecorator('image', {
                getValueFromEvent: this.normFile,
                rules: [
                  {
                    required: true,
                    message: '请上传图片',
                  },
                ],
              })(
                <Upload
                  action="//jsonplaceholder.typicode.com/posts/" // 上传地址
                  listType="picture-card"
                  onChange={this.uploadChange}
                  onPreview={this.handlePreview}
                >
                  {fileList.length >= 1 ? null : uploadBtn}
                </Upload>
              )}
            </Item>
          </Form>
          <Modal visible={previewVisible} footer={null} onCancel={this.previewCancel}>
            <img src={previewUrl} alt="图片预览" style={{ width: '100%' }} />
          </Modal>
          {/* <Button onClick={this.getFieldStates} >获取验证状态</Button> */}
        </div>
      </PageHeaderLayout>
    )
  }
}
