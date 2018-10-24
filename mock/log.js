import { format0, format24 } from '../src/utils/utils'

const getLog = (req, res) => {
  const dataList = []
  for (let i = 1; i < 255; i++) {
    dataList.push({
      id: i,
      // ip: '192.168.' + (255 - i) + '.' + i,
      ip: `192.168.${255-i}.${i}`,
      time: new Date().getTime() -  1000 * 60 * 60 * 36 * i,
      result: i % 3 === 0 ? 0 : 1,
    })
  }
  // req.body.pagination =
  const pageSize = req.body.pagination.pageSize || 2
  const current = req.body.pagination.current || 1

  const queryIP = req.body.query.IPValue
  const queryDate = req.body.query.date
  const start = queryDate[0] ? format0(queryDate[0]) : Number.MIN_VALUE
  const end = queryDate[1] ? format24(queryDate[1]) : Number.MAX_VALUE
  const queryState = req.body.query.state

  const queryDataList = dataList.filter(item => {
    return (item.ip.indexOf(queryIP) !== -1 && (item.result === queryState ||queryState === -1) && (item.time >= start && item.time <= end))
  })

  const total = queryDataList.length
  const resultDataList = queryDataList.splice((current - 1) * pageSize, pageSize)

  res.send({
    data: resultDataList,
    pagination: {
      current,
      pageSize,
      total,
    },
  })

}
const getState = (req, res) => {
  res.send([
    {
      value: 0,
      label: '登录失败',
    },
     {
       value: 1,
       label: '登录成功',
     },
  ])
}
export default {
  getLog,
  getState,
}
