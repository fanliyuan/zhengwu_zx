/*
 * @Author: ChouEric
 * @Date: 2018-07-06 17:49:38
 * @Last Modified by: ChouEric
 * @Last Modified time: 2018-07-24 16:59:04
*/
import React, { PureComponent, Fragment } from 'react';
// import { routerRedux } from 'dva/router'
import Result from 'components/Result';

// import styles from './index.less'

// const { Item } = Form

export default class Step3 extends PureComponent {
  state = {
    show: false,
  };

  componentDidMount = () => {
    this.setState({
      show: this.props.location.state.show,
    });
  };

  render() {
    const { show } = this.state;
    return (
      <Fragment>
        <Result type="success" title="提交成功" />
        {show && (
          <div style={{ textAlign: 'center' }}>
            <p>目录建立成功！“目录信息项与城市低保表”资源数据项映射成功!</p>
            <p>请去设置资源表检索关系，否则将无法共享或交换数据。</p>
            <a>去设置</a>
          </div>
        )}
      </Fragment>
    );
  }
}
