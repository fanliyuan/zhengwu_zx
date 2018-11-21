import React, {Component} from 'react'
import { Form, Button, Input, Select, Cascader, DatePicker } from 'antd'

const { Item: FormItem } = Form

@Form.create()
export default class SearchForm extends Component {
  state = {
    data: {},
  }

  componentDidMount() {
    const { form: { getFieldsValue } } = this.props
    const data = getFieldsValue()
    this.setState({
      data, 
    })
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.isChanged) {
      const { form: { setFieldsValue }, onChange } = this.props
      const { data } = this.state
      setFieldsValue(data)
      if (onChange) {
        onChange()
      } else {
        console.log('onChange方法必须写,onChange是为了修改父组件中isChange的值为false,否则会造成死循环') // eslint-disable-line
      }
    }
  }

  handleReset = () => {
    const { form: { resetFields, getFieldsValue }, formOptions: { searchHandler = () => {} } } = this.props
    resetFields()
    const data = getFieldsValue()
    this.setState({
      data,
    })
    searchHandler({}, true)
  }

  handleSearch = () => {
    const { formOptions:{searchHandler = () => {}}, form: { getFieldsValue } } = this.props
    const value = getFieldsValue()
    this.setState({
      data: {
        ...value,
      },
    })
    searchHandler(value, true)
  }

  render() {
    const { form: { getFieldDecorator }, formOptions: {formData = [], hasReset = true} = {} } = this.props
    const FormItems = []
    formData.forEach(item => {
      const {allowClear = false} = item
      switch (item.type) {
        case 'Select':
          FormItems.push(
            <FormItem className='w120 fl mr16' {...item.itemOptions} key={item.name+item.type}>
              {
                getFieldDecorator(item.name)(
                  <Select placeholder={item.placeholder} allowClear={allowClear}>{item.children}</Select>
                )
              }
            </FormItem>
          )
          break
        case 'Cascader':
          FormItems.push(
            <FormItem className='w150 fl mr16' {...item.itemOptions} key={item.name+item.type}>
              {
                getFieldDecorator(item.name)(
                  <Cascader className='' options={item.options} placeholder={item.placeholder} {...item.cascaderOptions} />
                )
              }
            </FormItem>
          )
          break
        case 'RangePicker':
          FormItems.push(
            <FormItem className='w220 fl mr16' {...item.itemOptions} key={item.name+item.type}>
              {
                getFieldDecorator(item.name)(
                  <DatePicker.RangePicker />
                )
              }
            </FormItem>
          )
          break
        // case 'Input':
        //   FormItems.push(
        //     <FormItem className='w150 fl mr16' {...item.itemOptions} key={item.name+item.type}>
        //       {getFieldDecorator(item.name)(
        //         <Input maxLength={item.maxLength} placeholder={item.placeholder} className={item.className}>{item.children}</Input>)}
        //     </FormItem>)
        //   break
        default:
          FormItems.push(
            <FormItem className='w150 fl mr16' {...item.itemOptions} key={item.name+item.type}>
              {getFieldDecorator(item.name)(
                <Input maxLength={item.maxLength} placeholder={item.placeholder} onPressEnter={this.handleSearch} className={item.className} />)}
            </FormItem>)
          break
      }
    })
    FormItems.push(<FormItem className='w82 fl mr16' key='searchbutton'><Button type='primary' icon='search' onClick={this.handleSearch}>搜索</Button></FormItem>)
    if (hasReset) {
      FormItems.push(<FormItem className='w64 fl' key='resetbutton'><Button onClick={this.handleReset}>重置</Button></FormItem>)
    }
    return <Form className='cf'>{FormItems}</Form>
  }
}