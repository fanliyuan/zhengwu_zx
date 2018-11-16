import React from 'react'
import { Input, Icon } from 'antd'
import styles from './index.less'

const map = {
  UserName: {
    component: Input,
    props: {
      size: 'large',
      prefix: <Icon type="user" className={styles.prefixIcon} />,
      placeholder: 'admin',
      maxLength: 50,
    },
    rules: [
      {
        required: false,
        message: 'Please enter username!',
      },
      // {
      //   max: 50,
      //   message: '不能超过五十个字符!',
      // },
    ],
  },
  Password: {
    component: Input,
    props: {
      size: 'large',
      prefix: <Icon type="lock" className={styles.prefixIcon} />,
      type: 'password',
      placeholder: '888888',
      maxLength: 50,
    },
    rules: [
      {
        required: false,
        message: 'Please enter password!',
      },
      // {
      //   max: 50,
      //   message: '不能超过五十个字符!',
      // },
    ],
  },
  Mobile: {
    component: Input,
    props: {
      size: 'large',
      prefix: <Icon type="mobile" className={styles.prefixIcon} />,
      placeholder: 'mobile number',
    },
    rules: [
      {
        required: false,
        message: 'Please enter mobile number!',
      },
      {
        pattern: /^1\d{10}$/,
        message: 'Wrong mobile number format!',
      },
    ],
  },
  Captcha: {
    component: Input,
    props: {
      size: 'large',
      prefix: <Icon type="mail" className={styles.prefixIcon} />,
      placeholder: 'captcha',
    },
    rules: [
      {
        required: false,
        message: 'Please enter Captcha!',
      },
    ],
  },
}

export default map
