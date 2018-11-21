import React, { Component, Fragment } from 'react'

import SearchForm from '@/components/SearchForm'

export default class Demo extends Component {
  state = {
    isChange: false,
  }

  handleChange = () => {
    this.setState({
      isChange: false,
    })
  }

  handleSearch = value => {
    // value就是搜索所需要的参数
    console.log(value) // eslint-disable-line
  }

  render() {
    const { isChange } = this.state
    // 表格的配置信息.
    // 更多信息详情查看原文件
    const formOptions = {
      formData: [
        {
          name: 'accountName',
          type: 'Input', // 默认为 Input
          placeholder: '用户',
        },
        {
          name: 'createTime',
          type: 'RangePicker',
        },
      ],
    }
    return(
      <Fragment>
        <SearchForm isChanged={isChange} formOptions={formOptions} onChange={this.handleChange} searchHandler={this.handleSearch} />
      </Fragment>
    )
  }
}