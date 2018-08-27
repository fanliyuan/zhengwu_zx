import React, { Component, Fragment } from 'react'
import { Link } from 'dva/router'
import { connect } from 'dva'
import { Form, Input, Select, Upload, Button, Icon, Modal, Tooltip, Card } from 'antd'

// import copy from 'copy-to-clipboard' //复制到剪切板

import PageHeaderLayout from '../../layouts/PageHeaderLayout'
import config from '../../api/config'
import styles from './AddCarousel.less'

const { uploadServer } = config
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
    first: undefined,
    second: undefined,
    secondList: [],
  }

  componentDidMount() {
    if (this.props.value && this.props.dataList) {
       const secondObject = this.props.dataList.filter(item => this.props.value === item.value)[0] || {}
       const secondList = this.props.dataList.filter(item => item.columnPid === secondObject.columnPid)
       this.setState({
        secondList,
        first: secondObject.columnPid && `${secondObject.columnPid}`,
        second: this.props.value,
       })
    }
  }

  firstChange = (val, column) => {
    this.setState(
      {
        first: val,
        secondList: column.filter(item => item.value === val).length ? column.filter(item => item.value === val)[0].children : [],
      },
      () => {
        this.setState({
          second: this.state.secondList[0] && this.state.secondList[0].value,// eslint-disable-line
        })
        this.props.onChange(this.state.secondList[0] && this.state.secondList[0].value)
      }
    )
  }

  secondChange = val => {
    this.setState(
      {
        second: val,
      },
      () => this.props.onChange(this.state.second)
    )
  }

  render() {
    const { first, second, secondList } = this.state
    const { data = [] } = this.props
    const firstComs = data.map(item => (
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
        <Select value={first} onChange={value => this.firstChange(value, data)} className={styles.select1}>
          {firstComs}
        </Select>
        <Select value={second} onChange={this.secondChange} className={styles.select2}>
          {secondComs}
        </Select>
      </Fragment>
    )
  }
}

@connect(({carouselManagement, loading, articlePublication}) => ({carouselManagement, loading: loading.models.carouselManagement, articlePublication}))
@Form.create() // eslint-disable-line
export default class AddCarousel extends Component {
  state = {
    carouselData: {},
    fileList: [],
    previewVisible: false,
    previewUrl: '',
    imageFlag: false,
  }

  componentDidMount() {
    this.props.dispatch({
      type: 'articlePublication/getColumnList',
    })
    if (this.props.location.pathname === '/portalManagement/addCarousel') {
      this.setState({
        carouselData: {},
      })
    } else {
      this.props.dispatch({
        type: 'carouselManagement/getCarousel',
        payload: {
          params: {
            imgId: this.props.location.state.carouselId,
          },
        },
      })
    }

    this.props.form.validateFields()
  }

  componentWillReceiveProps(props) {
    if (props.carouselManagement.carouselData) {
      this.setState({
        carouselData: props.carouselManagement.carouselData,
      }, () => {
        this.setState({
          fileList: [
            {uid: -1, name: 'default.png', status: 'done', url: props.carouselManagement.carouselData.imagePath},
          ],
        })
      })
    }
  }

  uploadChange = ({ fileList }) => {
    this.setState({
      fileList,
    })
    try {
      if (fileList[0].status === 'done') {
        this.props.form.setFieldsValue({
          imagePath: fileList[0].response.result.data,
        })
      }
    } catch (error) {
     // eslint-disable-next-line 
     console.log(error)
    }
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
    this.props.form.setFieldsValue({
      imgPid: value,
    })
  }

  normFile = e => {
    if (e && e.fileList && e.fileList[0]) {
      if (e.fileList[0].status === 'error') {
        this.setState({
          imageFlag: true,
        })
      }
      return e.fileList[0].status === 'error' ? null : '成功'
    } else {
      console.log('上传失败') // eslint-disable-line
      this.setState({
        imageFlag: false,
      })
      return null
    }
  }

  handleSave = () => {
    this.props.form.validateFieldsAndScroll((errors, values) => {
      if (!errors) {
        if (this.props.location.pathname === '/portalManagement/addCarousel') {
          this.props.dispatch({
            type: 'carouselManagement/insertCarousel',
            payload: {
              body: {
                imagePath: values.imagePath,
                imgAddress: values.imgAddress,
                imgName: values.imgName,
                imgPid: +values.imgPid,
              },
            },
          })
        } else {
          this.props.dispatch({
            type: 'carouselManagement/updateCarousel',
            payload: {
              body: {
                imgId: this.state.carouselData.imgId,
                imagePath: values.imagePath,
                imgAddress: values.imgAddress,
                imgName: values.imgName,
                imgPid: +values.imgPid,
              },
            },
          })
        }
      } else {
        console.log('表单未通过验证', values) // eslint-disable-line
      }
    })
  }

  render() {
    const { fileList, previewVisible, previewUrl, carouselData, imageFlag  } = this.state
    const { form: {getFieldDecorator, getFieldError, getFieldsError, isFieldTouched}, loading, articlePublication:{ column, secondCategoryList } } = this.props

    const nameError = isFieldTouched('imgName') && getFieldError('imgName')
    const columnError = isFieldTouched('imgPid') && getFieldError('imgPid')
    // const sortError = isFieldTouched('sort') && getFieldError('sort')
    // const urlTypeError = isFieldTouched('urlType') && getFieldError('urlType')
    const urlError = isFieldTouched('imgAddress') && getFieldError('imgAddress')
    const imageError = isFieldTouched('image') && getFieldError('image')

    const btnComs = (
      <Fragment>
        <Link to="/portalManagement/carouselManagement" className={styles.fr}>
          <Button>返回</Button>
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
          <Card loading={loading} bordered={false}>
            <Form>
              <Item
                label="名称"
                {...itemLayout}
                validateStatus={nameError ? 'error' : ''}
                help={nameError ? '请输入名称' : ''}
                >
                {getFieldDecorator('imgName', {
                  initialValue: carouselData.imgName,
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
                {getFieldDecorator('imgPid', {
                  initialValue: carouselData.imgPid && `${carouselData.imgPid}`,
                  rules: [
                    {
                      required: true,
                      message: '请输入名称',
                    },
                  ],
                })(
                  // 这里类似级联
                  <Column data={column} dataList={secondCategoryList} onChange={value => this.columnChange(value)} />
                )}
              </Item>
              {/* <Item
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
              </Item> */}
              <Item
                label="资源地址"
                {...itemLayout}
                validateStatus={urlError ? 'error' : ''}
                help={urlError ? '请输入链接地址' : ''}
                >
                {getFieldDecorator('imgAddress', {
                  initialValue: carouselData.imgAddress,
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
                extra={imageFlag ? '网络或者服务器错误,上传图片失败' : ''}
                >
                {getFieldDecorator('imagePath', {
                  getValueFromEvent: this.normFile,
                  rules: [
                    {
                      required: true,
                      message: '请上传图片',
                    },
                  ],
                })(
                  <Upload
                    action={`${uploadServer}/uploadOssImage`} // 上传地址
                    listType="picture-card"
                    onChange={this.uploadChange}
                    onPreview={this.handlePreview}
                    fileList={fileList}
                    >
                    {fileList.length >= 1 ? null : uploadBtn}
                  </Upload>
                )}
              </Item>
            </Form>
          </Card>
          <Modal visible={previewVisible} footer={null} onCancel={this.previewCancel}>
            <img src={previewUrl} alt="图片预览" style={{ width: '100%' }} />
          </Modal>
          {/* <Button onClick={this.getFieldStates} >获取验证状态</Button> */}
        </div>
      </PageHeaderLayout>
    )
  }
}
