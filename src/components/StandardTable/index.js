/*
 * @Author: ChouEric
 * @Date: 2018-12-07 11:09:17
 * @Last Modified by: ChouEric
 * @Last Modified time: 2018-12-08 10:43:18
 * @Description: 此组件经过修改,可以适应 项目需求, 也可以再改造
 */
import React, { PureComponent } from 'react'
import { Table } from 'antd'
import styles from './index.less'

function initTotalList(columns) {
  const totalList = []
  columns.forEach(column => {
    if (column.needTotal) {
      totalList.push({ ...column, total: 0 })
    }
  })
  return totalList
}

class StandardTable extends PureComponent {
  constructor(props) {
    super(props)
    const { columns } = props
    const needTotalList = initTotalList(columns)

    this.state = {
      selectedRowKeys: [],
      needTotalList,
    }
  }

  // static getDerivedStateFromProps(nextProps) {
  //   // clean state
  //   if (nextProps.selectedRows.length === 0) {
  //     const needTotalList = initTotalList(nextProps.columns);
  //     return {
  //       selectedRowKeys: [],
  //       needTotalList,
  //     };
  //   }
  //   return null;
  // }

  handleRowSelectChange = (selectedRowKeys, selectedRows) => {
    let { needTotalList } = this.state
    needTotalList = needTotalList.map(item => ({
      ...item,
      total: selectedRows.reduce((sum, val) => sum + parseFloat(val[item.dataIndex], 10), 0),
    }))
    const { onSelectRow } = this.props
    if (onSelectRow) {
      onSelectRow(selectedRows)
    }

    this.setState({ selectedRowKeys, needTotalList })
  };

  handleTableChange = (pagination, filters, sorter) => {
    const { onChange } = this.props
    if (onChange) {
      onChange(pagination, filters, sorter)
    }
  };

  cleanSelectedKeys = () => {
    this.handleRowSelectChange([], [])
  };

  render() {
    const { selectedRowKeys } = this.state
    const {
      dataSource: list,
      pagination,
      loading,
      bordered,
      columns,
      rowKey,
      showSelect = null,
    } = this.props

    const paginationProps = {
      // showSizeChanger: true, // 显示改变分页大小
      showQuickJumper: true,
      hideOnSinglePage: true,
      showTotal(total) {
        return `共 ${Math.ceil(total / 10)}页 / ${total} 条数据`
      },
      ...pagination,
    }

    const rowSelection = {
      selectedRowKeys,
      onChange: this.handleRowSelectChange,
      getCheckboxProps: record => ({
        disabled: record.disabled,
      }),
    }

    return (
      <div className={styles.standardTable}>
        {/* <div className={styles.tableAlert}>
          <Alert
            message={
              <Fragment>
                已选择 <a style={{ fontWeight: 600 }}>{selectedRowKeys.length}</a> 项&nbsp;&nbsp;
                {needTotalList.map(item => (
                  <span style={{ marginLeft: 8 }} key={item.dataIndex}>
                    {item.title}
                    总计&nbsp;
                    <span style={{ fontWeight: 600 }}>
                      {item.render ? item.render(item.total) : item.total}
                    </span>
                  </span>
                ))}
                <a onClick={this.cleanSelectedKeys} style={{ marginLeft: 24 }}>
                  清空
                </a>
              </Fragment>
            }
            type="info"
            showIcon
          />
        </div> */}
        <Table
          loading={loading}
          bordered={bordered}
          rowKey={rowKey || 'key'}
          rowSelection={showSelect && rowSelection}
          dataSource={list}
          columns={columns}
          pagination={paginationProps}
          onChange={this.handleTableChange}
          />
      </div>
    )
  }
}

export default StandardTable
