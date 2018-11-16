/*
 * @Author: ChouEric
 * @Date: 2018-08-21 16:55:35
 * @Last Modified by: ChouEric
 * @Last Modified time: 2018-11-12 09:41:33
 * @Description: 这里需要个优化,就是密码错误等登录错误需要清除错误密码,后期可能还有验证码的功能
 */
import React, { Component } from 'react'
import { connect } from 'dva'
import { Alert } from 'antd'
import { Throttle, Bind } from 'lodash-decorators'

import Login from '@/components/Login'
import styles from './Login.less'

// const sha = require('sha.js')
// sha('sha1').update('1993520').digest('hex')  用法,update()参数是需要加密的字符串

const { UserName, Password, Submit } = Login

@connect(({ login, loading }) => ({
  login,
  submitting: loading.effects['login/login'],
}))
export default class LoginPage extends Component {
  state = {
    type: 'account',
    // autoLogin: true,
    isEmpty: false,
    isError: true,
  }

  componentDidMount() {
  }

  onTabChange = type => {
    this.setState({ type })
  }

  handleSubmit = (err, values) => {
    if (!values.userName || !values.password) {
      this.setState({
        isEmpty: true,
        isError: false,
      })
      return null
    }
    if (!err) {
      this.setState({
        isEmpty: false,
        isError: true,
      })
      this.handleLogin(values)
    }
  }

  // changeAutoLogin = e => {
  //   // this.setState({
  //   //   autoLogin: e.target.checked,
  //   // });
  // };

  handleDown = () => {
    this.setState({
      isEmpty: false,
      isError: false,
    })
  }

  // 登录节流
  @Bind()
  @Throttle(1000)
  handleLogin(values) {
    const { dispatch } = this.props
      // const sha1Password = sha('sha1').update(values.password).digest('hex')
    dispatch({
      type: 'login/login',
      payload: {
        accountName: values.userName,
        accountPasswd: values.password,
      },
    })
  }

  renderMessage = content => {
    return <Alert style={{ marginBottom: 24 }} message={content} type="error" showIcon />
  }

  render() {
    const { login, submitting } = this.props
    const { type, isEmpty, isError } = this.state
    return (
      <div className={styles.main}>
        {/* 使用了 resetFlag标识符,来代表父组件中通知子组件是否需要清空密码的标记,典型的数据驱动,而不是自定义事件驱动 */}
        <Login defaultActiveKey={type} onTabChange={this.onTabChange} onSubmit={this.handleSubmit} resetFlag={submitting}>
          {/* <Tab key="account" tab="账户密码登录"> */}
          <div className={styles.form_content}>
            {login.status === 'error' &&
              login.type === 'account' &&
              !submitting &&
              isError &&
              this.renderMessage('账户或密码错误(密码: youedata)')}
            {/* <UserName name="userName" placeholder="admin/user" />
            <Password name="password" placeholder="888888/123456" /> */}
            {isEmpty && this.renderMessage('账号或密码不能为空')}
            <UserName name="userName" placeholder="请输入用户名" />
            <Password name="password" placeholder="请输入登录密码" />
          </div>
          {/* </Tab> */}
          {/* <Tab key="mobile" tab="手机号登录">
            {login.status === 'error' &&
              login.type === 'mobile' &&
              !submitting &&
              this.renderMessage('验证码错误')}
            <Mobile name="mobile" />
            <Captcha name="captcha" />
          </Tab>
          <div>
            <Checkbox checked={autoLogin} onChange={this.changeAutoLogin}>
              自动登录
            </Checkbox>
            <a style={{ float: 'right' }} href="">
              忘记密码
            </a>
          </div> */}
          <Submit loading={submitting}>登录</Submit>
          <div className={styles.other}>
            {/* 其他登录方式
            <Icon className={styles.icon} type="alipay-circle" />
            <Icon className={styles.icon} type="taobao-circle" />
            <Icon className={styles.icon} type="weibo-circle" />
            <Link className={styles.register} to="/user/register">
              注册账户
            </Link> */}
          </div>
        </Login>
      </div>
    )
  }
}
