import React, { Component } from 'react';
import { connect } from 'dva';
// import { Link } from 'dva/router';
import { Alert } from 'antd';
import Login from 'components/Login';
import styles from './Login.less';

const { UserName, Password, Submit } = Login;

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
  };

  onTabChange = type => {
    this.setState({ type });
  };

  handleSubmit = (err, values) => {
    if (!values.userName || !values.password) {
      this.setState({
        isEmpty: true,
        isError: false,
      });
      return;
    }
    this.setState({
      isEmpty: false,
      isError: true,
    });
    const { type } = this.state;
    const { dispatch } = this.props;
    if (!err) {
      dispatch({
        type: 'login/login',
        payload: {
          ...values,
          type,
        },
      });
    }
  };

  // changeAutoLogin = e => {
  //   // this.setState({
  //   //   autoLogin: e.target.checked,
  //   // });
  // };

  handleDown = () => {
    this.setState({
      isEmpty: false,
      isError: false,
    });
  };

  renderMessage = content => {
    return <Alert style={{ marginBottom: 24 }} message={content} type="error" showIcon />;
  };

  render() {
    const { login, submitting } = this.props;
    const { type, isEmpty, isError } = this.state;
    return (
      <div className={styles.main}>
        <Login defaultActiveKey={type} onTabChange={this.onTabChange} onSubmit={this.handleSubmit}>
          {/* <Tab key="account" tab="账户密码登录"> */}
          <div className={styles.form_content}>
            {login.status === 'error' &&
              login.type === 'account' &&
              !submitting &&
              isError &&
              this.renderMessage('账户或密码错误(密码: 123youe)')}
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
    );
  }
}
