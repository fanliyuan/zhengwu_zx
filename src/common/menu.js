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
        name: '通道管理',
        path: 'pass',
      },
      {
        name: '交换域管理',
        path: 'switch',
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
        name:'用户管理',
        path:'userManage',
      },
      {
        name:'角色权限',
        path:'roleLimit',
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
