const dataList = []
for (let i = 0; i < 100; i++) {
  dataList.push({
    id: i,
    noteTitle: i % 5 ? '订阅审批已通过' : '订阅审批未通过',
    noteTime: new Date().getTime() - 1000 * i * 60 * 60 * 36,
    state: i % 3 ? 'isR' : 'noR',
    content: i % 4 ? '通知通知1' : '通知通知2',
  })
}
const getSysNotices = (req, res) => {
  const pageSize = req.body.pagination.pageSize || 2
  const current = req.body.pagination.current || 1

  const queryState = req.body.query.state

  const queryDataList = dataList.filter(item => {
    return item.state.indexOf(queryState) !== -1
  })
  const total = queryDataList.length
  // const resultDataList = queryDataList.splice((current - 1) * pageSize, pageSize);

  res.send({
    data: queryDataList,
    pagination: {
      pageSize,
      current,
      total,
    },
  })
}

const getDeleteInfo = (req, res) => {
  const idList = req.body.rows
  let backInfo = ''

  dataList.forEach((item, index) => {
    idList.forEach(id => {
      if (+item.id === +id) {
        delete dataList[index]
        backInfo = '删除成功'
      }
    })
  })
  res.send({
    backInfo,
  })
}

const getChangeInfo = (req, res) => {
  const changeIds = req.body.rows
  let changeBack = ''

  dataList.forEach((items, index) => {
    changeIds.forEach(cId => {
      if (+items.id === +cId) {
        dataList[index].state = 'isR'
        changeBack = '已更改为已读'
      }
    })
  })
  res.send({
    changeBack,
  })
}

const selectRowInfo = (req, res) => {
  const selectId = req.body.query.queryId
  let info = {}

  dataList.forEach(item => {
    if (item.id === +selectId) {
      info = item
    }
  })
  res.send({
    ...info,
  })
}

export default {
  getSysNotices,
  getDeleteInfo,
  getChangeInfo,
  selectRowInfo,
}
