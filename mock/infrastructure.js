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
const nodeList = [
  {
    value: 100001,
    label: '长沙市公安局',
    rank: 1,
  },
  {
    value: 100002,
    label: '长沙市财政局',
    rank: 1,
  },
  {
    value: 100003,
    label: '长沙市检察院',
    rank: 1,
  },
  {
    value: 100004,
    label: '株洲市检察院',
    rank: 1,
  },
  {
    value: 100005,
    label: '株洲市消防队',
    rank: 1,
  },
  {
    value: 100,
    label: '长沙市',
  },
  {
    value: 101,
    label: '株洲市',
  },
]
const InfrastructureNodeData = []
for (let i = 0; i < 255; i ++) {
  InfrastructureNodeData.push({
    organization: organizationDataArr[Math.floor(Math.random() * 6)].value,
    ip: `192.168.${  255  - i  }.${  i}`,
    status: Math.round(Math.random()),
    name: 100001 + Math.floor(Math.random()*6),
    parentNode: 100 + Math.round(Math.random()),
    id: i,
  })
}

const getInfrastructureNode = (req, res) => {



  res.send({
    status: 200,
    data: {
      list: InfrastructureNodeData,
      pagination: {},
    },
  })
}

const getNodeList = (req, res) => {
  res.send({
    status: 200,
    data: nodeList,
  })
}

export default {
  getInfrastructureNode,
  getNodeList,
}
