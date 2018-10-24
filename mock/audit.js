import { format0, format24 } from '../src/utils/utils'

const organizationData = [
  {
    value: 100,
    label: '省直属',
    children: [
      {
        value: 2100001,
        label: '省公安厅',
      },
      {
        value: 2100002,
        label: '省检察院',
      },
      {
        value: 2100003,
        label: '省财政厅',
      },
    ],
  },
  {
    value: 101,
    label: '长沙市',
    children: [
      {
        value: 2101001,
        label: '长沙市公安局',
      },
      {
        value: 2101002,
        label: '长沙市检察院',
      },
      {
        value: 2101003,
        label: '长沙市财政局',
      },
    ],
  },
]
const organizationDataArr = []
organizationData.forEach(item => {
  if (item.children) {
    item.children.forEach(sub => {
      organizationDataArr.push(sub)
    })
  }
})

const xing = ['张', '李', '王', '赵', '周', '钱', '孙', '张', '刘', '陈', '郑']
const ming = ['花', '明', '勇', '红', '丽', '雅', '丛', '飞', '超', '松', '魁']
const zhong = ['近', '荣', '锦', '超', '胜', '高', '晓', '来', '永', '伊', '龙']

const logData = []
for (let i = 1; i < 255; i++) {
  const name =
    xing[Math.floor(Math.random() * 11)] +
    (zhong[Math.floor(Math.random() * 20)] || '') +
    ming[Math.floor(Math.random() * 11)]
  logData.push({
    account: `account_${Math.round(Math.random() * 100 + i)}`,
    name,
    id: i,
    organization: organizationDataArr[Math.floor(Math.random() * 6)].value,
    ip: `192.168.${255 - i}.${i}`,
    time: Date.now() - 1000 * 60 * 60 * 15 * i,
    result: i % 3 === 0 ? 0 : 1,
  })
}
const operationData = []
for (let i = 1; i < 109; i++) {
  const name =
    xing[Math.floor(Math.random() * 11)] +
    (zhong[Math.floor(Math.random() * 20)] || '') +
    ming[Math.floor(Math.random() * 11)]
  operationData.push({
    account: `用户${i}`,
    name,
    id: i,
    organization: organizationDataArr[Math.floor(Math.random() * 6)].value,
    ip: `192.168.${255 - i}.${i}`,
    operation: Math.ceil(Math.random() * 3),
    detail: `详细行为${i}`,
    time: Date.now() - 1000 * 60 * 60 * 5 * i,
  })
}

const getAuditLog = (req, res) => {
  const { account, ip, organization, state, date } = req.body.query
  const start = date[0] ? format0(date[0]) : Number.MIN_VALUE
  const end = date[1] ? format24(date[1]) : Number.MAX_VALUE
  const { current, pageSize } = req.body.pagination
  const queryDataList = logData.filter(item => {
    return (
      item.account.indexOf(account) !== -1 &&
      item.ip.indexOf(ip) !== -1 &&
      (item.result === state || state === -1) &&
      (item.organization === organization[organization.length - 1] ||
        !organization[organization.length - 1]) &&
      (item.time >= start && item.time <= end)
    )
  })
  res.send({
    status: 200,
    data: {
      list: queryDataList.splice((current - 1) * pageSize, pageSize),
      pagination: {
        ...req.body.pagination,
        total: queryDataList.length,
      },
    },
  })
}

const getAuditOperation = (req, res) => {
  const { account, ip, organization, operation, date } = req.body.query
  const start = date[0] ? format0(date[0]) : Number.MIN_VALUE
  const end = date[1] ? format24(date[1]) : Number.MAX_VALUE
  const { current, pageSize } = req.body.pagination
  const queryDataList = operationData.filter(item => {
    return (
      item.account.indexOf(account) !== -1 &&
      item.ip.indexOf(ip) !== -1 &&
      (operation === item.operation || operation === -1) &&
      (item.organization === organization[organization.length - 1] ||
        !organization[organization.length - 1]) &&
      (item.time >= start && item.time <= end)
    )
  })
  res.send({
    status: 200,
    data: {
      list: queryDataList.splice((current - 1) * pageSize, pageSize),
      pagination: {
        ...req.body.pagination,
        total: queryDataList.length,
      },
    },
  })
}

export default {
  organizationData,
  getAuditLog,
  getAuditOperation,
}
