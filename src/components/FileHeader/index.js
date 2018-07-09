/*
 * @Author: ChouEric
 * @Date: 2018-07-08 15:32:41
 * @Last Modified by: ChouEric
 * @Last Modified time: 2018-07-08 15:52:21
*/
import React from 'react'
import { Link } from 'dva/router'
import { Button, Divider } from 'antd'
import { isArray, isObject } from 'util'

import styles from './index.less'

export default (props) => {
  const { btnList = [], data = {} } = props
  if (!isArray(btnList) || !isObject(data)) {
    console.log('FileHeader组件属性非法')// eslint-disable-line
    return null
  }
  const btnComs = btnList.map(item => (
    <Link to={item.path} className={styles.fr} key={item.label} >
      <Button type='primary' >
        {item.label}
      </Button>
    </Link>
  ))
  return (
    <div className='common-layout' >
      <div className='clearfix' >
        {btnComs}
      </div>
      <div className={styles.header} >
        目录编码:
        <span>{data.menuCode}</span>
        名称:
        <span>{data.menuName}</span>
        提供方:
        <span>{data.provider}</span>
        创建时间:
        <span>{data.time}</span>
      </div>
      <Divider />
    </div>
  )
}
