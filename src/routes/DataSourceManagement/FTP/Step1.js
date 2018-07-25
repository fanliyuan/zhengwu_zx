/*
 * @Author: ChouEric
 * @Date: 2018-07-24 23:33:06
 * @Last Modified by: ChouEric
 * @Last Modified time: 2018-07-25 09:35:47
 * @Description: 有几个bug需要解决, 1 双击选择会造成文件夹 闪烁 , 2 选择完成后应该收起文件夹, 3 选择的滚动条可以自动,但是自动会造成闪烁
 */
import React, { Component, Fragment } from 'react';
import { Link } from 'dva/router';
import { Radio, Button, Tree, message, Tooltip, Icon, Input } from 'antd';

import { isArray } from 'util';
import styles from './index.less';

const { DirectoryTree, TreeNode } = Tree;

const fromData = [
  {
    title: '文件夹1',
    key: '1',
    children: [
      {
        title: '文件1',
        key: '1-1',
      },
      {
        title: '文件2',
        key: '1-2',
      },
      {
        title: '文件3',
        key: '1-3',
      },
    ],
  },
  {
    title: '文件夹2',
    key: '2',
    children: [
      {
        title: '数据1',
        key: '2-1',
        children: [
          {
            title: '文件1',
            key: '2-1-1',
          },
          {
            title: '文件2',
            key: '2-1-2',
          },
          {
            title: '文件3',
            key: '2-1-3',
          },
        ],
      },
      {
        title: '数据2',
        key: '2-2',
        children: [
          {
            title: '文件1',
            key: '2-2-1',
          },
          {
            title: '文件2',
            key: '2-2-2',
          },
          {
            title: '文件3',
            key: '2-2-3',
          },
        ],
      },
    ],
  },
];

function renderTreeNode(renderList) {
  if (!isArray(renderList)) {
    return null;
  }
  return renderList.map(item => {
    if (!isArray(item.children)) {
      return <TreeNode title={item.title || '佚名'} key={item.key} isLeaf />;
    } else {
      return (
        <TreeNode title={item.title || '佚名'} key={item.key}>
          {renderTreeNode(item.children)}
        </TreeNode>
      );
    }
  });
}

export default class Step1 extends Component {
  state = {
    fromServerData: [],
    toServerData: [],
    optionData: {},
  };

  typeChange = e => {
    this.setState({
      optionData: { ...this.state.optionData, type: e.target.value }, // eslint-disable-line
    });
  };

  newhange = e => {
    this.setState({
      optionData: { ...this.state.optionData, isNew: e.target.value }, // eslint-disable-line
    });
  };

  fromChange = (e, node) => {
    message.success(`选择了${node.props.title}`);
  };

  render() {
    /* eslint-disable */
    const {
      fromServerData,
      toServerData,
      optionData,
      optionData: { type = 0, fromServer, toServer, isNew = 0, directoryName = '' },
    } = this.state;

    return (
      <Fragment>
        <div className={styles.row} style={{ marginTop: 40 }}>
          <span className={styles.label}>选择类型</span>
          <Radio.Group value={type} onChange={this.typeChange}>
            <Radio value={0} key={0}>
              文件夹
            </Radio>
            <Radio value={1} key={1}>
              文件
            </Radio>
          </Radio.Group>
        </div>
        <div className={styles.row}>
          <span className={styles.label}>
            资源路径
            <Tooltip title="点击展开目录,双击选择">
              <Icon type="question-circle-o" />
            </Tooltip>
          </span>
          <DirectoryTree onDoubleClick={this.fromChange} className={styles.directory}>
            {renderTreeNode(fromData)}
          </DirectoryTree>
        </div>
        <div className={styles.row}>
          <span className={styles.label}>
            注册储存路径
            <Tooltip title="点击展开目录,双击选择">
              <Icon type="question-circle-o" />
            </Tooltip>
          </span>
          <DirectoryTree className={styles.directory}>{renderTreeNode(fromData)}</DirectoryTree>
        </div>
        <div className={styles.row}>
          <span className={styles.label}>
            新建文件夹
            <Tooltip title="是否需要在当前路径下创建新文件夹">
              <Icon type="question-circle-o" />
            </Tooltip>
          </span>
          <Radio.Group value={isNew} onChange={this.newhange}>
            <Radio value={0} key={0}>
              否
            </Radio>
            <Radio value={1} key={1}>
              是
            </Radio>
          </Radio.Group>
        </div>
        {isNew === 1 ? (
          <div className={styles.row}>
            <span className={styles.required}>文件夹名</span>
            <Input
              value={directoryName}
              onChange={e =>
                this.setState({ optionData: { ...optionData, directoryName: e.target.value } })
              }
              className={styles.input}
            />
          </div>
        ) : null}
        <div className="btnclsb">
          <Link to="/dataSourceManagement/FTP/two">
            <Button type="primary">下一步</Button>
          </Link>
        </div>
      </Fragment>
    );
  }
}
