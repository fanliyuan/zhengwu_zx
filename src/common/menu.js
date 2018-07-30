import { isUrl } from '../utils/utils'

const menuData = [
  {
    name: '系统概览',
    icon: 'dashboard',
    path: 'overview',
    children: [
      // {
      //   name: '概览',
      //   path: 'analysis',
      // },
      {
        name: '平台概览',
        path: 'platformOverview',
        authority: ['operator'],
      },
      {
        name: '登录日志',
        path: 'logging',
      },
      {
        name: '节点概览',
        path: 'nodeOverview',
        authority: ['operator-n'],
      },
      {
        name: '系统通知',
        path: 'systemNotification',
        authority: ['operator', 'security', 'operator-n'],
      },
      {
        name: '通知详情',
        path: 'noticeDetail',
        hideInMenu: true,
        authority: ['operator', 'operator-n'],
      },
      // {
      //   name: '工作台',
      //   path: 'workplace',
      //   // hideInBreadcrumb: true,
      //   // hideInMenu: true,
      // },
    ],
    authority: [
      'admin',
      'security',
      'auditor',
      'operator',
      'admin-n',
      'security-n',
      'auditor-n',
      'assessor-n',
      'operator-n',
    ],
  },
  {
    name: '审计管理',
    icon: 'form',
    path: 'audit',
    children: [
      {
        name: '登录审计',
        path: 'logging',
      },
      {
        name: '操作审计',
        path: 'operation',
      },
    ],
    authority: ['auditor', 'auditor-n'],
  },
  {
    name: '基础设施管理',
    icon: 'calculator',
    path: 'infrastructure',
    children: [
      {
        name: '节点管理',
        path: 'node',
      },
      {
        name: '新建节点',
        path: 'addNode',
        hideInMenu: true,
      },
      {
        name: '修改节点',
        path: 'editNode',
        hideInMenu: true,
      },
      {
        name: '通道管理',
        path: 'pass',
      },
      {
        name: '交换域管理',
        path: 'switch',
      },
      {
        name: '修改通道',
        path: 'editPass',
        hideInMenu: true,
      },
      {
        name: '新建交换域',
        path: 'addSwitch',
        hideInMenu: true,
      },
    ],
    authority: ['operator'],
  },
  {
    name: '机构用户管理',
    icon: 'idcard',
    path: 'institutionalUserManage',
    children: [
      {
        name: '机构管理',
        path: 'institutionalManage',
        authority: ['operator'],
      },
      {
        name: '新建机构',
        path: 'addInstitution',
        hideInMenu: true,
        authority: ['operator'],
      },
      {
        name: '用户管理',
        path: 'userManage',
        authority: ['admin', 'admin-n'],
      },
      {
        name: '新建用户',
        path: 'addUser',
        hideInMenu: true,
        authority: ['admin', 'admin-n'],
      },
      // {
      //   name: '角色管理',
      //   path: 'roleLimit',
      //   authority: ['security', 'security-n'],
      // },
      {
        name: '新建角色',
        path: 'addRole',
        hideInMenu: true,
        authority: ['security', 'security-n'],
      },
      {
        name: '权限设置',
        path: 'limitSet',
        hideInMenu: true,
        authority: ['security', 'security-n'],
      },
      {
        name: '分配角色',
        path: 'assignRole',
        authority: ['security', 'security-n'],
      },
    ],
    authority: ['admin', 'security', 'admin-n', 'security-n', 'operator'],
  },
  {
    name: '数据资源管理',
    icon: 'database',
    path: 'dataSourceManagement',
    children: [
      {
        name: '接入管理',
        path: 'accessManagement',
        authority: ['operator', 'operator-n'],
      },
      {
        name: '新建接入',
        path: 'addAccess',
        hideInMenu: true,
        authority: 'operator-n',
      },
      {
        name: '修改接入',
        path: 'editAccess',
        hideInMenu: true,
        authority: 'operator-n',
      },
      // {
      //   name: '接入审核',
      //   path: 'accessAudit', //这个原型里边删除了
      // },
      {
        name: '资源管理',
        path: 'sourceManagement',
        authority: ['operator', 'operator-n'],
      },
      {
        name: '文件资源',
        path: 'fileSource',
        hideInMenu: true,
        authority: ['operator', 'operator-n'],
      },
      {
        name: '资源审核',
        path: 'sourceAudit',
        authority: 'assessor-n',
      },
      {
        name: '数据库资源',
        path: 'dataBaseSource',
        hideInMenu: true,
        authority: ['operator', 'operator-n'],
      },
      {
        name: '目录管理',
        path: 'catalogManagement',
        authority: ['operator', 'operator-n'],
      },
      {
        name: '新建目录',
        path: 'newMenu',
        hideInMenu: true,
        authority: 'operator-n',
      },
      {
        name: '修改目录',
        path: 'editMenu',
        hideInMenu: true,
        authority: 'operator-n',
      },
      {
        name: '查看目录',
        path: 'checkMenu',
        hideInMenu: true,
        authority: 'operator',
      },
      {
        name: '目录审核',
        path: 'catalogAudit',
        authority: 'assessor-n',
      },
      {
        name: '开放共享',
        path: 'openShare',
        hideInMenu: true,
        authority: 'operator-n',
      },
      {
        name: '开放共享文件',
        path: 'openShareFile',
        hideInMenu: true,
        authority: 'operator-n',
      },
      // 这个是否多余?
      {
        name: '资源',
        path: 'source',
        hideInMenu: true,
      },
      {
        name: '资源挂接文件',
        path: 'resourceConnection',
        hideInMenu: true,
        authority: ['operator', 'operator-n'],
      },
      {
        name: '资源挂接数据',
        path: 'resourceConnectionData',
        hideInMenu: true,
        authority: ['operator', 'operator-n'],
      },
      // {
      //   name: '新建目录',
      //   path: 'addDirectory',
      //   hideInMenu:true,  //这个页面及路由是重复的,不用了
      // },
      {
        name: '导入目录',
        path: 'inputDirectory',
        authority: 'operator-n',
        hideInMenu: true,
      },
      {
        name: '订阅审核',
        path: 'subscriptionAudit',
        authority: ['assessor-n', 'operator-n'],
      },
      {
        name: '查看授权',
        path: 'checkAudit',
        hideInMenu: true,
        authority: ['assessor-n', 'operator-n'],
      },
      {
        name: '录入数据库信息',
        path: 'inputDataInfo',
        hideInMenu: true,
        authority: 'operator-n',
      },
      {
        name: '设置同步计划',
        path: 'setPlan',
        hideInMenu: true,
        authority: 'operator-n',
      },
      {
        name: '上传本地文件',
        path: 'updataFile',
        hideInMenu: true,
        authority: 'operator-n',
      },
      {
        name: '设置同步计划',
        path: 'ftp',
        hideInMenu: true,
        authority: 'operator-n',
      },
      {
        name: '目录',
        path: 'catalog',
        hideInMenu: true,
        authority: 'operator-n',
      },
      {
        name: '任务',
        path: 'task',
        hideInMenu: true,
        authority: ['operator', 'operator-n'],
      },
      {
        name: '查看目录',
        path: 'viewDirectory',
        hideInMenu: true,
      },
    ],
    authority: ['operator', 'operator-n', 'assessor-n'],
  },
  {
    name: '数据交换管理',
    icon: 'sync',
    path: 'dataSwitchManagement',
    children: [
      {
        name: '资源集市',
        path: 'sourceSubscription',
        authority: ['operator', 'operator-n'],
      },
      {
        name: '订阅审核',
        path: 'subscriptionAudit',
        authority: 'assessor-n',
      },
      {
        name: '所有订阅',
        path: 'allSub',
        authority: ['operator', 'operator-n'],
      },
      {
        name: '审核日志',
        path: 'logAudit',
        hideInMenu: true,
      },
      {
        name: '资源',
        path: 'source',
        hideInMenu: true,
      },
      {
        name: '查看目录',
        path: 'viewDirectory',
        hideInMenu: true,
      },
      {
        name: '资源管理',
        path: 'sourceManagement',
        authority: 'operator-n',
      },
      {
        name: '订阅(表)',
        path: 'subscriptionTable',
        hideInMenu: true,
      },
      {
        name: '订阅(文件)',
        path: 'subscriptionFile',
        hideInMenu: true,
      },
    ],
    authority: ['operator', 'operator-n', 'assessor-n'],
  },
  {
    name: '开放门户管理',
    icon: 'compass',
    path: 'portalManagement',
    children: [
      {
        name: '文章分类',
        path: 'newsManagement',
      },
      {
        name: '文章发布',
        path: 'publicationManagement',
      },
      {
        name: '发布',
        path: 'publication',
        hideInMenu: true,
      },
      {
        name: '文章库',
        path: 'newsLibrary',
      },
      {
        name: '新建文章',
        path: 'addArticle',
        hideInMenu: true,
      },
      {
        name: '修改文章',
        path: 'editArticle',
        hideInMenu: true,
      },
      {
        name: '文章库',
        path: 'newsLibrary',
        hideInMenu: true,
      },
      {
        name: '目录分类管理',
        path: 'menuManagement',
      },
      {
        name: '轮播图管理',
        path: 'carouselManagement',
      },
      {
        name: '新增轮播图',
        path: 'addCarousel',
        hideInMenu: true,
      },
      {
        name: '栏目管理',
        path: 'columnPosition',
      },
    ],
    authority: ['operator'],
  },
  {
    name: '监控告警',
    icon: 'bell',
    path: 'monitor',
    children: [
      {
        name: '告警配置',
        path: 'warningOption',
      },
      {
        name: '新增告警配置',
        path: 'addWarningOption',
        hideInMenu: true,
      },
      {
        name: '编辑告警配置',
        path: 'editWarningOption',
        hideInMenu: true,
      },
      {
        name: '节点监控',
        path: 'nodeMonitor',
      },
      {
        name: '监控详情',
        path: 'node',
        hideInMenu: true,
      },
      {
        name: '告警设置',
        path: 'editOption',
        hideInMenu: true,
      },
      {
        name: '通道监控',
        path: 'pass',
      },
      {
        name: '接入监控',
        path: 'insert',
      },
      {
        name: '接入源数据监控',
        path: 'insertDetail',
        hideInMenu: true,
      },
      {
        name: '任务监控',
        path: 'task',
      },
      {
        name: '告警查询',
        path: 'warningQuery',
        // hideInMenu: true,
      },
    ],
    authority: ['operator', 'operator-n'],
  },
  {
    name: '统计分析',
    path: 'statistics',
    icon: 'line-chart',
    children: [
      {
        name: '数据接入分析',
        path: 'dataInsert',
      },
    ],
    authority: ['operator', 'operator-n'],
  },
  // {
  //   name: '结果页',
  //   icon: 'check-circle-o',
  //   path: 'result',
  //   children: [
  //     {
  //       name: '成功',
  //       path: 'success',
  //     },
  //     {
  //       name: '失败',
  //       path: 'fail',
  //     },
  //   ],
  // },
  // {
  //   name: '异常页',
  //   icon: 'warning',
  //   path: 'exception',
  //   children: [
  //     {
  //       name: '403',
  //       path: '403',
  //     },
  //     {
  //       name: '404',
  //       path: '404',
  //     },
  //     {
  //       name: '500',
  //       path: '500',
  //     },
  //     {
  //       name: '触发异常',
  //       path: 'trigger',
  //       hideInMenu: true,
  //     },
  //   ],
  // },
  {
    name: '账户',
    icon: 'user',
    path: 'user',
    authority: 'guest',
    children: [
      {
        name: '登录',
        path: 'login',
      },
      {
        name: '注册',
        path: 'register',
      },
      {
        name: '注册结果',
        path: 'register-result',
      },
    ],
  },
]

function formatter(data, parentPath = '/', parentAuthority) {
  return data.map(item => {
    let { path } = item
    if (!isUrl(path)) {
      path = parentPath + item.path
    }
    const result = {
      ...item,
      path,
      authority: item.authority || parentAuthority,
    }
    if (item.children) {
      result.children = formatter(item.children, `${parentPath}${item.path}/`, item.authority)
    }
    return result
  })
}

export const getMenuData = () => formatter(menuData)
