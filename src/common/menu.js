import { isUrl } from '../utils/utils';

const menuData = [
  {
    name: '系统概览',
    icon: 'dashboard',
    path: 'overview',
    children: [
      {
        name: '概览',
        path: 'analysis',
      },
      {
        name: '登录日志',
        path: 'logging',
      },
      {
        name: '系统通知',
        path: 'systemNotification',
      },
      {
        name: '通知详情',
        path: 'noticeDetail',
        hideInMenu: true,
      },
      // {
      //   name: '工作台',
      //   path: 'workplace',
      //   // hideInBreadcrumb: true,
      //   // hideInMenu: true,
      // },
    ],
    authority: ['user', 'admin'],
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
    authority: ['user'],
  },
  {
    name: '基础设施管理',
    icon: 'dashboard',
    path: 'infrastructure',
    children: [
      {
        name: '节点管理',
        path: 'node',
      },
      {
        name: '新建节点',
        path: 'addNode',
        hideInMenu:true,
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
        hideInMenu:true,
      },
      {
        name: '新建交换域',
        path: 'addSwitch',
        hideInMenu:true,
      },
    ],
  },
  {
    name:'机构用户管理',
    icon:'dashboard',
    path:'institutionalUserManage',
    children: [
      {
        name:'机构管理',
        path:'institutionalManage',
      },
      {
        name:'新建机构',
        path:'addInstitution',
        hideInMenu:true,
      },
      {
        name:'用户管理',
        path:'userManage',
      },
      {
        name:'新建用户',
        path:'addUser',
        hideInMenu:true,
      },
      {
        name:'角色权限',
        path:'roleLimit',
      },
      {
        name:'新建角色',
        path:'addRole',
        hideInMenu:true,
      },
      {
        name:'权限设置',
        path:'limitSet',
        hideInMenu:true,
      },
      {
        name:'分配角色',
        path:'assignRole',
      },
    ],
  },
  {
    name:'数据资源管理',
    icon:'dashboard',
    path:'dataSourceManagement',
    children:[
      {
        name:'接入管理',
        path:'accessManagement',
      },
      {
        name:'新建接入',
        path:'addAccess',
        hideInMenu:true,
      },
      {
        name:'接入审核',
        path:'accessAudit',
      },
      {
        name:'资源管理',
        path:'sourceManagement',
      },
      {
        name:'文件资源',
        path:'fileSource',
      },
      {
        name:'资源审核',
        path:'sourceAudit',
      },
      {
        name:'目录管理',
        path:'catalogManagement',
      },
      {
        name:'目录审核',
        path:'catalogAudit',
      },
      {
        name:'订阅审核',
        path:'subscriptionAudit',
      },
      {
        name:'录入数据库信息',
        path:'inputDataInfo',
      },
      {
        name:'设置同步计划',
        path:'setPlan',
      },
      {
        name:'上传本地文件',
        path:'updataFile',
      },
      {
        name:'ftp',
        path:'ftp',
      },
      {
        name:'ftp设置同步计划',
        path:'ftpSetPlan',
      },
      {
        name:'目录',
        path:'catalog',
      },
      {
        name:'任务',
        path:'task',
      },
    ],
  },
  {
    name:'数据交换管理',
    icon:'dashboard',
    path:'dataSwitchManagement',
    children:[
      {
        name:'资源订阅',
        path:'sourceSubscription',
      },
      {
        name:'订阅审核',
        path:'subscriptionAudit',
      },
      {
        name: '所有订阅',
        path: 'allSub',
      },
      {
        name: '数据管理',
        path: 'dataManagement',
      },
    ],
  },
  {
    name: '开放门户管理',
    icon: 'dashboard',
    path: 'portalManagement',
    children: [
      {
        name: '资讯管理',
        path: 'newsManagement',
      },
      {
        name: '发布管理',
        path: 'publicationManagement',
        hideInMenu: true,
      },
      {
        name: '发布',
        path: 'publication',
        hideInMenu: true,
      },
      {
        name: '资讯库',
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
    ],
  },
  {
    name: '监控告警',
    icon: 'dashboard',
    path: 'monitor',
    children: [
      {
        name: '告警配置',
        path: 'warningOption',
      },
      {
        name: '节点监控',
        path: 'node',
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
];

function formatter(data, parentPath = '/', parentAuthority) {
  return data.map(item => {
    let { path } = item;
    if (!isUrl(path)) {
      path = parentPath + item.path;
    }
    const result = {
      ...item,
      path,
      authority: item.authority || parentAuthority,
    };
    if (item.children) {
      result.children = formatter(item.children, `${parentPath}${item.path}/`, item.authority);
    }
    return result;
  });
}

export const getMenuData = () => formatter(menuData);
