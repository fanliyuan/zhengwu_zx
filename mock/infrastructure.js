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
];
const organizationDataArr = [];
organizationData.forEach(item => {
  if (item.children) {
    item.children.forEach(sub => {
      organizationDataArr.push(sub);
    });
  }
});
const nodeList = [
  {
    value: 1001,
    label: '长沙市',
    children: [
      {
        value: 100101,
        label: '长沙市公安局',
      },
      {
        value: 100102,
        label: '长沙市财政局',
      },
      {
        value: 100103,
        label: '长沙市检察院',
      },
    ],
  },
  {
    value: 1002,
    label: '株洲市',
    children: [
      {
        value: 100201,
        label: '株洲市检察院',
      },
      {
        value: 100202,
        label: '株洲市消防队',
      },
    ],
  },
];
let nodeArr = [];
nodeList.forEach(item => {
  if (Array.isArray(item.children)) {
    nodeArr = [...nodeArr, ...item.children];
  }
});
const InfrastructureNodeData = [];
for (let i = 0; i < 255; i++) {
  const random = Math.ceil(Math.random() * (nodeArr.length - 1));
  InfrastructureNodeData.push({
    organization: organizationDataArr[Math.floor(Math.random() * 6)].value,
    ip: `192.168.${255 - i}.${i}`,
    state: Math.round(Math.random()),
    name: nodeArr[random].label + i,
    parentNode: nodeArr[random].value,
    id: i,
  });
}

const getInfrastructureNode = (req, res) => {
  const {
    query: { ip, node, parentNode, organization, state },
    pagination: { current = 1, pageSize = 10 },
  } = req.body;
  const queryList = InfrastructureNodeData.filter(item => {
    return (
      item.ip.indexOf(ip) !== -1 &&
      item.name.indexOf(node) !== -1 &&
      (item.parentNode === parentNode[1] || !parentNode[1]) &&
      (item.organization === organization[1] || !organization[1]) &&
      (item.state === state || state === -1)
    );
  });

  res.send({
    status: 200,
    data: {
      list: queryList.splice((current - 1) * pageSize, pageSize),
      pagination: { current, pageSize, total: queryList.length },
    },
  });
};

const getNodeList = (req, res) => {
  res.send({
    status: 200,
    data: nodeList,
  });
};

export default {
  getInfrastructureNode,
  getNodeList,
};
