import React, { Fragment } from 'react';
import { Link, Redirect, Switch, Route } from 'dva/router';
import DocumentTitle from 'react-document-title';
import { Icon, Tooltip } from 'antd';
import GlobalFooter from '../components/GlobalFooter';
import styles from './UserLayout.less';
import logo from '../assets/logo.png';
import { getRoutes } from '../utils/utils';

const links = [];

const copyright = (
  <Fragment>
    Copyright <Icon type="copyright" /> www.youedata.cn,All Rights Reserved
  </Fragment>
);

class UserLayout extends React.PureComponent {
  getPageTitle() {
    const { routerData, location } = this.props;
    const { pathname } = location;
    let title = '政务系统';
    if (routerData[pathname] && routerData[pathname].name) {
      title = `${routerData[pathname].name} - 政务系统`;
    }
    return title;
  }

  render() {
    const { routerData, match } = this.props;
    return (
      <DocumentTitle title={this.getPageTitle()}>
        <div className={styles.container}>
          <div className={styles.content}>
            <Tooltip
              title={
                <div>
                  <div>管理员 : admin</div>
                  <div>安全员 : security</div>
                  <div>审计员 : auditor</div>
                  <div>操作员 : operator</div>
                  <div>节点管理员 : admin-n</div>
                  <div>节点安全员 : security-n</div>
                  <div>节点审核员 : auditor-n</div>
                  <div>节点审计员 : assessor-n</div>
                  <div>节点操作员 : operator-n</div>
                </div>
              }
            >
              <Icon type="question-circle-o" />
            </Tooltip>
            <div className={styles.top}>
              <div className={styles.header}>
                <Link to="/">
                  <img alt="logo" className={styles.logo} src={logo} />
                  {/* <span className={styles.title}>Ant Design</span> */}
                </Link>
              </div>
              <div className={styles.superTitle}>政务数据共享交换开放系统</div>
              {/* <div className={styles.desc}>Ant Design 是西湖区最具影响力的 Web 设计规范</div> */}
            </div>
            <Switch>
              {getRoutes(match.path, routerData).map(item => (
                <Route
                  key={item.key}
                  path={item.path}
                  component={item.component}
                  exact={item.exact}
                />
              ))}
              <Redirect exact from="/user" to="/user/login" />
            </Switch>
          </div>
          <GlobalFooter links={links} copyright={copyright} className={styles.footers} />
        </div>
      </DocumentTitle>
    );
  }
}

export default UserLayout;
