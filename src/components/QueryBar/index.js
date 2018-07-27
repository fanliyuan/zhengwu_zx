/* eslint-disable */
/*
 * @Author: ChouEric
 * @Date: 2018-07-02 11:13:20
 * @Last Modified by: ChouEric
 * @Last Modified time: 2018-07-02 11:46:41
 * @描述: 原意为写搜索的组件,但是考虑到需要从外面获取数据渲染Select等,以及需要在修改state的参数,所以延后.
*/
import React, { Component, Fragment } from 'ract'
import { Input, Select, DatePicker, Button, Cascader, Form } from 'antd'
// import Antd, { DatePicker } from 'antd'

// const { RangePicker } = DatePicker

function CreatElement(item, onSearch) {
  switch (item.type.toLowerCase()) {
    case 'input':
      return <Input defaultValue={item.defaultValue} value={item.value} onPressEnter={onSearch} />
    case 'select':
      return (
        <Select defaultValue={item.defaultValue} value={item.value}>
          {item.list.map(sub => {
            return (
              <Select.Option value={sub.id} key={sub.id}>
                {sub.label}
              </Select.Option>
            )
          })}
        </Select>
      )
    case 'cascader':
      return <Cascader options={item.list} />
    default:
      return null
  }
}

function QueryBar(props) {
  try {
    const { data, onSearch = () => {} } = props
    const components = data.map(item => {
      return CreatElement(item, onSearch)
    })
    return <Form>{components}</Form>
  } catch (error) {
    console.log(error)
  } // eslint-disable-line
}

export default QueryBar
