/*
 * @Author: ChouEric
 * @Date: 2018-08-21 16:55:35
 * @Last Modified by: ChouEric
 * @Last Modified time: 2018-08-21 16:56:16
 * @Description: 这里需要个优化,就是密码错误等登录错误需要清除错误密码,后期可能还有验证码的功能
 */
import React, { Component } from 'react'
import { connect } from 'dva'
// import { Link } from 'dva/router';
import { Alert } from 'antd'
import Login from 'components/Login'
import styles from './Login.less'

const sha = require('sha.js')
// sha('sha1').update('1993520').digest('hex')  用法,update()参数是需要加密的字符串

const { UserName, Password, Submit } = Login

@connect(({ login, loading }) => ({
  login,
  submitting: loading.effects['login/login'] || loading.effects['login/token'],
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
      return
    }
    this.setState({
      isEmpty: false,
      isError: true,
    })
    const { expireTime, refreshTime } = this.state
    const { dispatch } = this.props
    if (!err) {
      const sha1Password = sha('sha1').update(values.password).digest('hex')
      dispatch({
        type: 'login/login',
        payload: {
          accountName: values.userName,
          accountPasswd: sha1Password,
          expireTime,
          refreshTime,
        },
      })
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

  renderMessage = content => {
    return <Alert style={{ marginBottom: 24 }} message={content} type="error" showIcon />
  }

  render() {
    const { login, submitting } = this.props
    const { type, isEmpty, isError } = this.state
    return (
      <div className={styles.main}>
        <Login defaultActiveKey={type} onTabChange={this.onTabChange} onSubmit={this.handleSubmit}>
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
            <UserName name="userName" placeholder="请输入用户名称" />
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
