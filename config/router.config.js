export default [
  // user
  {
    path: '/user',
    component: '../layouts/UserLayout',
    routes: [
      { path: '/user', redirect: '/user/login' },
      { path: '/user/login', component: './User/Login' },
      // { path: '/user/register', component: './User/Register' },
      // { path: '/user/register-result', component: './User/RegisterResult' },
    ],
  },
  // app
  {
    path: '/',
    component: '../layouts/BasicLayout',
    Routes: ['src/pages/Authorized'],
    authority: ['admin', 'operator', 'security', 'auditor', 'forbidButChouEric', 'assessor'],
    routes: [
      // dashboard
      { path: '/', redirect: '/overview/platformoverview' },
      // overview 系统概览
      {
        path: 'overview',
        icon: 'dashboard',
        name: 'overview',
        authority: ['admin', 'operator', 'security', 'auditor', 'admin-n', 'operator-n', 'security-n', 'audit-n', 'assessor-n', 'forbidButChouEric'],
        routes: [
          {
            path: 'platformoverview',
            name: 'platformoverview',
            component: './Overview/PlatformOverview',
          },
          {
            path: 'logging',
            name: 'logging',
            component: './Overview/Logging',
          },
          {
            path: 'systemnotification',
            name: 'systemnotification',
            component: './Overview/SystemNotification',
            authority: ['operator', 'security', 'operator-n'],
          },
          {
            name: 'noticedetail',
            path: 'noticedetail',
            component: './Overview/NoticeDetail',
            hideInMenu: true,
            authority: ['operator', 'security', 'operator-n'],
          },
        ],
      },
      // 审计管理 audit
      {
        name: 'audit',
        icon: 'form',
        path: 'audit',
        routes: [
          {
            name: 'logging',
            path: 'logging',
            component: './Audit/Logging',
          },
          {
            name: 'operation',
            path: 'operation',
            component: './Audit/Operation',
          },
        ],
        authority: ['auditor', 'auditor-n'],
      },
      // 基础设施管理 infrastructure
      {
        name: 'infrastructure',
        icon: 'calculator',
        path: 'infrastructure',
        routes: [
          {
            name: 'node',
            path: 'node',
            component: './InfrastructureManagement/NodeManagement',
          },
          {
            name: 'addnode',
            path: 'addnode',
            hideInMenu: true,
            component: './InfrastructureManagement/AddNode',
          },
          {
            name: 'editnode',
            path: 'editnode',
            hideInMenu: true,
            component: './InfrastructureManagement/AddNode',
          },
          {
            name: 'pass',
            path: 'pass',
            component: './InfrastructureManagement/PassManagement',
          },
          {
            name: 'switch',
            path: 'switch',
            component: './InfrastructureManagement/SwitchManagement',
          },
          {
            name: 'editpass',
            path: 'editpass',
            hideInMenu: true,
            component: './InfrastructureManagement/EditPass',
          },
          {
            name: 'addswitch',
            path: 'addswitch',
            hideInMenu: true,
            component: './InfrastructureManagement/AddSwitch',
          },
          {
            name: 'editswitch',
            path: 'editswitch',
            hideInMenu: true,
            component: './InfrastructureManagement/AddSwitch',
          },
        ],
        authority: ['operator'],
      },
      // 机构用户管理 institutionalUserManage
      {
        name: 'institutionalUserManage',
        icon: 'idcard',
        path: 'institutionalUserManage',
        routes: [
          {
            name: 'institutionalManage',
            path: 'institutionalManage',
            component: './InstitutionalUserManage/InstitutionalManage',
            authority: ['operator'],
          },
          {
            name: 'addInstitution',
            path: 'addInstitution',
            component: './InstitutionalUserManage/AddInstitution',
            hideInMenu: true,
            authority: ['operator'],
          },
          {
            name: 'userManage',
            path: 'userManage',
            component: './InstitutionalUserManage/UserManage',
            authority: ['admin', 'admin-n'],
          },
          {
            name: 'addUser',
            path: 'addUser',
            component: './InstitutionalUserManage/AddUser',
            hideInMenu: true,
            authority: ['admin', 'admin-n'],
          },
          {
            name: 'editUser',
            path: 'editUser',
            component: './InstitutionalUserManage/AddUser',
            hideInMenu: true,
            authority: ['admin', 'admin-n'],
          },
          // {
          //   name: 'roleLimit',
          //   path: 'roleLimit',
          //   component: './InstitutionalUserManage/RoleLimit',
          //   authority: ['security', 'security-n'],
          // },
          {
            name: 'addRole',
            path: 'addRole',
            component: './InstitutionalUserManage/AddRole',
            hideInMenu: true,
            authority: ['security', 'security-n'],
          },
          {
            name: 'limitSet',
            path: 'limitSet',
            component: './InstitutionalUserManage/LimitSet',
            hideInMenu: true,
            authority: ['security', 'security-n'],
          },
          {
            name: 'assignRole',
            path: 'assignRole',
            component: './InstitutionalUserManage/AssignRole',
            authority: ['security', 'security-n'],
          },
        ],
        authority: ['admin', 'security', 'admin-n', 'security-n', 'operator'],
      },
      // 数据资源管理 dataSourceManagement
      {
        name: 'dataSourceManagement',
        icon: 'database',
        path: 'dataSourceManagement',
        routes: [
          // {
          //   name: '接入管理',
          //   path: 'accessManagement',
          //   authority: ['operator', 'operator-n'],
          // },
          // {
          //   name: '新建接入',
          //   path: 'addAccess',
          //   hideInMenu: true,
          //   authority: 'operator-n',
          //   component: './DataSourceManagement/AddAccess',
          // },
          // {
          //   name: '修改接入',
          //   path: 'editAccess',
          //   hideInMenu: true,
          //   authority: 'operator-n',
          // },
          // {
          //   name: '导出',
          //   path: 'exports',
          //   hideInMenu: true,
          //   authority: 'operator-n',
          // },
          // {
          //   name: '接入审核',
          //   path: 'accessAudit', //这个原型里边删除了
          // },
          {
            name: 'sourceClassfiy',
            path: 'sourceClassfiy',
            component: './DataSourceManagement/SourceClassfiy',
            // authority: ['operator', 'operator-n'],
          },
          {
            name: 'addSourceClassfiy',
            path: 'addSourceClassfiy',
            component: './DataSourceManagement/AddSourceClassfiy',
            hideInMenu: true,
            // authority: ['operator', 'operator-n'],
          },
          {
            name: 'sourceManagement',
            path: 'sourceManagement',
            component: './DataSourceManagement/SourceManagement',
            authority: ['operator', 'operator-n'],
          },
          // {
          //   name: '文件资源',
          //   path: 'fileSource',
          //   hideInMenu: true,
          //   authority: ['operator', 'operator-n'],
          // },
          // {
          //   name: '资源审核',
          //   path: 'sourceAudit',
          //   authority: 'assessor-n',
          // },
          {
            name: 'dataBaseSource',
            path: 'dataBaseSource',
            hideInMenu: true,
            component: './DataSourceManagement/DataBaseSource',
            authority: ['operator', 'operator-n'],
          },
          {
            name: 'catalogManagement',
            path: 'catalogManagement',
            component: './DataSourceManagement/CatalogManagement',
            hideInMenu:true,
            // component: './DataSourceManagement/SourceManagement.2',
            authority: ['operator', 'operator-n'],
          },
          // {
          //   name: '新建目录',
          //   path: 'newMenu',
          //   hideInMenu: true,
          //   authority: 'operator-n',
          // },
          // {
          //   name: '修改目录',
          //   path: 'editMenu',
          //   hideInMenu: true,
          //   authority: 'operator-n',
          // },
          // {
          //   name: '查看目录',
          //   path: 'checkMenu',
          //   hideInMenu: true,
          //   authority: 'operator',
          // },
          // {
          //   name: '目录审核',
          //   path: 'catalogAudit',
          //   authority: 'assessor-n',
          // },
          {
            name: 'openShare',
            path: 'openShare',
            hideInMenu: true,
            component: './DataSourceManagement/OpenShare',
            authority: 'operator',
          },
          {
            name: 'openShareFile',
            path: 'openShareFile',
            component: './DataSourceManagement/OpenShareFile',
            hideInMenu: true,
            authority: 'operator',
          },
          // // 这个是否多余?
          // {
          //   name: '资源',
          //   path: 'source',
          //   hideInMenu: true,
          // },
          // {
          //   name: '资源挂接文件',
          //   path: 'resourceConnection',
          //   hideInMenu: true,
          //   authority: ['operator', 'operator-n'],
          // },
          {
            name: 'resourceConnectionData',
            path: 'resourceConnectionData',
            hideInMenu: true,
            component: './DataSourceManagement/ResourceConnectionData',
            authority: ['operator', 'operator-n'],
          },
          {
            name: 'addDirectory',
            path: 'addDirectory',
            component: './DataSourceManagement/AddDirectory',
            hideInMenu:true,
          },
          {
            name: 'inputDirectory',
            path: 'inputDirectory',
            authority: 'operator',
            component: './DataSourceManagement/InputDirectory',
            hideInMenu: true,
          },
          // {
          //   name: '订阅授权',
          //   path: 'subscriptionAudit',
          //   authority: ['assessor-n'],
          // },
          // {
          //   name: '查看授权',
          //   path: 'checkAudit',
          //   hideInMenu: true,
          //   authority: ['assessor-n', 'operator-n'],
          // },
          // {
          //   name: '录入数据库信息',
          //   path: 'inputDataInfo',
          //   hideInMenu: true,
          //   authority: 'operator-n',
          // },
          // {
          //   name: '编辑数据',
          //   path: 'EditData',
          //   hideInMenu: true,
          //   authority: 'operator-n',
          // },
          // {
          //   name: '设置同步计划',
          //   path: 'setPlan',
          //   hideInMenu: true,
          //   authority: 'operator-n',
          // },
          // {
          //   name: '上传本地文件',
          //   path: 'updataFile',
          //   hideInMenu: true,
          //   authority: 'operator-n',
          // },
          // {
          //   name: '设置同步计划',
          //   path: 'ftp',
          //   hideInMenu: true,
          //   authority: 'operator-n',
          // },
          // {
          //   name: '目录',
          //   path: 'catalog',
          //   hideInMenu: true,
          //   authority: 'operator-n',
          // },
          {
            name: 'task',
            path: 'task',
            hideInMenu: true,
            component: './DataSourceManagement/Task',
            authority: ['operator', 'operator-n'],
          },
          {
            name: 'viewDirectory',
            path: 'viewDirectory',
            component: './DataSourceManagement/ViewDirectory',
            hideInMenu: true,
          },
        ],
        authority: ['operator', 'operator-n', 'assessor-n'],
      },
      {
        name: 'dataPublicManagement',
        icon: 'database',
        path: 'dataPublicManagement',
        routes: [
          {
            name: 'dataManager',
            path: 'dataManager',
            // hideInMenu: true,
            component: './DataPublicManagement/DataManager',
            authority: ['operator', 'operator-n'],
          },
        ],
        authority: ['operator', 'operator-n', 'assessor-n'],
      },
      // 数据交换管理 dataSwitchManagement
      {
        name: 'dataSwitchManagement',
        icon: 'sync',
        path: 'dataSwitchManagement',
        routes: [
          // {
          //   name: '资源集市',
          //   path: 'sourceSubscription',
          //   authority: ['operator', 'operator-n'],
          // },
          // {
          //   name: '订阅授权',
          //   path: 'subscriptionAudit',
          //   authority: 'assessor-n',
          // },
          {
            name: 'allSub',
            path: 'allSub',
            component: './DataSwitchManagement/AllSub',
            authority: ['operator', 'operator-n'],
          },
          // {
          //   name: '审核日志',
          //   path: 'logAudit',
          //   hideInMenu: true,
          // },
          // {
          //   name: '资源',
          //   path: 'source',
          //   hideInMenu: true,
          // },
          // {
          //   name: '查看目录',
          //   path: 'viewDirectory',
          //   hideInMenu: true,
          // },
          // {
          //   name: '资源管理',
          //   path: 'sourceManagement',
          //   authority: 'operator-n',
          // },
          {
            name: 'subscriptionTable',
            path: 'subscriptionTable',
            component: './DataSwitchManagement/SubscriptionTable',
            hideInMenu: true,
          },
          // {
          //   name: '订阅(文件)',
          //   path: 'subscriptionFile',
          //   hideInMenu: true,
          // },
        ],
        authority: ['operator', 'operator-n', 'assessor-n'],
      },
      // 开放门户 portalManagement
      {
        name: 'portalManagement',
        icon: 'compass',
        path: 'portalManagement',
        routes: [
          {
            name: 'newsManagement',
            path: 'newsManagement',
            component: './PortalManagement/newsManagement',
          },
          {
            name: 'publicationManagement',
            path: 'publicationManagement',
            component: './PortalManagement/PublicationManagement',
          },
          {
            name: 'publication',
            path: 'publication',
            hideInMenu: true,
            component: './PortalManagement/Publication',
          },
          // {
          //   name: '文章库',
          //   path: 'newsLibrary',
          // },
          {
            name: 'addArticle',
            path: 'addArticle',
            hideInMenu: true,
            component: './PortalManagement/AddArticle',
          },
          {
            name: 'editArticle',
            path: 'editArticle',
            hideInMenu: true,
            component: './PortalManagement/AddArticle',
          },
          {
            name: 'newsLibrary',
            path: 'newsLibrary',
            // hideInMenu: true,
            component: './PortalManagement/NewsLibrary',
          },
          {
            name: 'menuManagement',
            path: 'menuManagement',
            component: './PortalManagement/MenuManagement',
          },
          {
            name: 'carouselManagement',
            path: 'carouselManagement',
            component: './PortalManagement/CarouselManagement',
          },
          {
            name: 'addCarousel',
            path: 'addCarousel',
            hideInMenu: true,
            component: './PortalManagement/AddCarousel',
          },
          {
            name: 'editCarousel',
            path: 'editCarousel',
            hideInMenu: true,
            component: './PortalManagement/AddCarousel',
          },
          {
            name: 'columnPosition',
            path: 'columnPosition',
            component: './PortalManagement/ColumnPosition',
          },
        ],
        authority: ['operator'],
      },
      // 监控告警 monitor
      {
        name: 'monitor',
        icon: 'bell',
        path: 'monitor',
        routes: [
          {
            name: 'nodeMonitor',
            path: 'nodeMonitor',
            component: './Monitor/NodeMonitor',
          },
          {
            name: 'pass',
            path: 'pass',
            component: './Monitor/Pass',
          },
          {
            name: 'insert',
            path: 'insert',
            component: './Monitor/Insert',
          },
          {
            name: 'task',
            path: 'task',
            component: './Monitor/Task',
          },
          {
            name: 'subDetail',
            path: 'subDetail/:id',
            component: './Monitor/SubDetail',
          },
          {
            name: 'pubDetail',
            path: 'pubDetail/:id',
            component: './Monitor/PubDetail',
          },
          {
            name: 'warningOption',
            path: 'warningOption',
            component: './Monitor/WarningOption',
          },
          {
            name: 'warningQuery',
            path: 'warningQuery',
            component: './Monitor/WarningQuery',
            hideInMenu: true,
          },
          {
            name: 'editOption',
            path: 'editOption',
            component: './Monitor/EditWarningOption',
            hideInMenu: true,
          },
          {
            name: 'addWarningOption',
            path: 'addWarningOption',
            component: './Monitor/AddWarningOption',
            hideInMenu: true,
          },
          {
            name: 'editWarningOption',
            path: 'editWarningOption/:id',
            component: './Monitor/AddWarningOption',
            hideInMenu: true,
          },
          {
            name: 'node',
            path: 'node',
            component: './Monitor/Node',
            hideInMenu: true,
          },
          {
            name: 'insertDetail',
            path: 'insertDetail/:id',
            component: './Monitor/InsertDetail',
            hideInMenu: true,
          },
        ],
        authority: ['operator', 'operator-n'],
      },
      // 统计分析 statistics
      {
        name: 'statistics',
        path: 'statistics',
        icon: 'line-chart',
        routes: [
          {
            name: 'dataInsert',
            path: 'dataInsert',
            component: './Statistics/DataInsert',
          },
        ],
        authority: ['operator', 'operator-n'],
      },
      //  >>>>>>预置内容<<<<<<<
      // {
      //   path: '/dashboard',
      //   name: 'dashboard',
      //   icon: 'dashboard',
      //   routes: [
      //     {
      //       path: '/dashboard/analysis',
      //       name: 'analysis',
      //       component: './Dashboard/Analysis',
      //     },
      //     {
      //       path: '/dashboard/monitor',
      //       name: 'monitor',
      //       component: './Dashboard/Monitor',
      //     },
      //     {
      //       path: '/dashboard/workplace',
      //       name: 'workplace',
      //       component: './Dashboard/Workplace',
      //     },
      //   ],
      // },
      // forms
      // {
      //   path: '/form',
      //   icon: 'form',
      //   name: 'form',
      //   routes: [
      //     {
      //       path: '/form/basic-form',
      //       name: 'basicform',
      //       component: './Forms/BasicForm',
      //     },
      //     {
      //       path: '/form/step-form',
      //       name: 'stepform',
      //       component: './Forms/StepForm',
      //       hideChildrenInMenu: true,
      //       routes: [
      //         {
      //           path: '/form/step-form',
      //           name: 'stepform',
      //           redirect: '/form/step-form/info',
      //         },
      //         {
      //           path: '/form/step-form/info',
      //           name: 'info',
      //           component: './Forms/StepForm/Step1',
      //         },
      //         {
      //           path: '/form/step-form/confirm',
      //           name: 'confirm',
      //           component: './Forms/StepForm/Step2',
      //         },
      //         {
      //           path: '/form/step-form/result',
      //           name: 'result',
      //           component: './Forms/StepForm/Step3',
      //         },
      //       ],
      //     },
      //     {
      //       path: '/form/advanced-form',
      //       name: 'advancedform',
      //       authority: ['admin'],
      //       component: './Forms/AdvancedForm',
      //     },
      //   ],
      // },
      // list
      // {
      //   path: '/list',
      //   icon: 'table',
      //   name: 'list',
      //   routes: [
      //     {
      //       path: '/list/table-list',
      //       name: 'searchtable',
      //       component: './List/TableList',
      //     },
      //     {
      //       path: '/list/basic-list',
      //       name: 'basiclist',
      //       component: './List/BasicList',
      //     },
      //     {
      //       path: '/list/card-list',
      //       name: 'cardlist',
      //       component: './List/CardList',
      //     },
      //     {
      //       path: '/list/search',
      //       name: 'searchlist',
      //       component: './List/List',
      //       routes: [
      //         {
      //           path: '/list/search',
      //           redirect: '/list/search/articles',
      //         },
      //         {
      //           path: '/list/search/articles',
      //           name: 'articles',
      //           component: './List/Articles',
      //         },
      //         {
      //           path: '/list/search/projects',
      //           name: 'projects',
      //           component: './List/Projects',
      //         },
      //         {
      //           path: '/list/search/applications',
      //           name: 'applications',
      //           component: './List/Applications',
      //         },
      //       ],
      //     },
      //   ],
      // },
      // 详情页 profile
      // {
      //   path: '/profile',
      //   name: 'profile',
      //   icon: 'profile',
      //   // hideInMenu: true,
      //   routes: [
      //     // profile
      //     {
      //       path: '/profile/basic',
      //       name: 'basic',
      //       component: './Profile/BasicProfile',
      //     },
      //     {
      //       path: '/profile/advanced',
      //       name: 'advanced',
      //       authority: ['admin'],
      //       component: './Profile/AdvancedProfile',
      //     },
      //   ],
      // },
      // 结果页 result
      // {
      //   name: 'result',
      //   icon: 'check-circle-o',
      //   path: '/result',
      //   routes: [
      //     // result
      //     {
      //       path: '/result/success',
      //       name: 'success',
      //       component: './Result/Success',
      //     },
      //     { path: '/result/fail', name: 'fail', component: './Result/Error' },
      //   ],
      // },
      // 个人中心 account
      {
        name: 'account',
        icon: 'user',
        path: '/account',
        hideInMenu: true,
        routes: [
          {
            path: '/account/center',
            name: 'center',
            component: './Account/Center/Center',
            routes: [
              {
                path: '/account/center',
                redirect: '/account/center/articles',
              },
              {
                path: '/account/center/articles',
                component: './Account/Center/Articles',
              },
              {
                path: '/account/center/applications',
                component: './Account/Center/Applications',
              },
              {
                path: '/account/center/projects',
                component: './Account/Center/Projects',
              },
            ],
          },
          {
            path: '/account/settings',
            name: 'settings',
            component: './Account/Settings/Info',
            routes: [
              {
                path: '/account/settings',
                redirect: '/account/settings/base',
              },
              {
                path: '/account/settings/base',
                component: './Account/Settings/BaseView',
              },
              {
                path: '/account/settings/security',
                component: './Account/Settings/SecurityView',
              },
              {
                path: '/account/settings/binding',
                component: './Account/Settings/BindingView',
              },
              {
                path: '/account/settings/notification',
                component: './Account/Settings/NotificationView',
              },
            ],
          },
        ],
      },
      {
        path: 'exception',
        routes: [
          {
            path: '403',
            component: '403',
          },
          {
            path: '500',
            component: '500',
          },
        ],
      },
      {
        component: '404',
      },
    ],
  },
]
