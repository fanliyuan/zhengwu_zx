import { createElement } from 'react';
import dynamic from 'dva/dynamic';
import pathToRegexp from 'path-to-regexp';
import { getMenuData } from './menu';

let routerDataCache;

const modelNotExisted = (app, model) =>
  // eslint-disable-next-line
  !app._models.some(({ namespace }) => {
    return namespace === model.substring(model.lastIndexOf('/') + 1);
  });

// wrapper of dynamic
const dynamicWrapper = (app, models, component) => {
  // () => require('module')
  // transformed by babel-plugin-dynamic-import-node-sync
  if (component.toString().indexOf('.then(') < 0) {
    models.forEach(model => {
      if (modelNotExisted(app, model)) {
        // eslint-disable-next-line
        app.model(require(`../models/${model}`).default);
      }
    });
    return props => {
      if (!routerDataCache) {
        routerDataCache = getRouterData(app);
      }
      return createElement(component().default, {
        ...props,
        routerData: routerDataCache,
      });
    };
  }
  // () => import('module')
  return dynamic({
    app,
    models: () =>
      models.filter(model => modelNotExisted(app, model)).map(m => import(`../models/${m}.js`)),
    // add routerData prop
    component: () => {
      if (!routerDataCache) {
        routerDataCache = getRouterData(app);
      }
      return component().then(raw => {
        const Component = raw.default || raw;
        return props =>
          createElement(Component, {
            ...props,
            routerData: routerDataCache,
          });
      });
    },
  });
};

function getFlatMenuData(menus) {
  let keys = {};
  menus.forEach(item => {
    if (item.children) {
      keys[item.path] = { ...item };
      keys = { ...keys, ...getFlatMenuData(item.children) };
    } else {
      keys[item.path] = { ...item };
    }
  });
  return keys;
}

export const getRouterData = app => {
  const routerConfig = {
    '/': {
      component: dynamicWrapper(app, ['user', 'login'], () => import('../layouts/BasicLayout')),
    },
    '/overview/analysis': {
      component: dynamicWrapper(app, ['chart'], () => import('../routes/Overview/Analysis')),
    },
    '/overview/logging': {
      component: dynamicWrapper(app, ['overviewLogging'], () =>
        import('../routes/Overview/Logging')
      ),
    },
    '/overview/platformOverview': {
      component: dynamicWrapper(app, [], () => import('../routes/Overview/PlatformOverview')),
    },
    // '/overview/workplace': {
    //   component: dynamicWrapper(app, ['project', 'activities', 'chart'], () =>
    //     import('../routes/Dashboard/Workplace')
    //   ),
    //   // hideInBreadcrumb: true,
    //   // name: '工作台',
    //   // authority: 'admin',
    // },
    '/audit/logging': {
      component: dynamicWrapper(app, ['auditLogging'], () => import('../routes/Audit/Logging')),
    },
    '/overview/SystemNotification': {
      component: dynamicWrapper(app, ['SystemNotification'], () =>
        import('../routes/Overview/SystemNotification')
      ),
    },
    '/overview/noticeDetail/:params': {
      component: dynamicWrapper(app, ['SystemNotification'], () =>
        import('../routes/Overview/noticeDetail')
      ),
    },
    '/audit/operation': {
      component: dynamicWrapper(app, ['auditOperation', 'auditLogging'], () =>
        import('../routes/Audit/Operation')
      ),
    },
    '/infrastructure/node': {
      component: dynamicWrapper(app, ['infrastructureManagementNode'], () =>
        import('../routes/InfrastructureManagement/NodeManagement')
      ),
    },
    '/infrastructure/addNode': {
      component: dynamicWrapper(app, [], () =>
        import('../routes/InfrastructureManagement/AddNode')
      ),
    },
    '/infrastructure/pass': {
      component: dynamicWrapper(app, ['passOperation'], () =>
        import('../routes/InfrastructureManagement/PassManagement')
      ),
    },
    '/infrastructure/editPass': {
      component: dynamicWrapper(app, ['passOperation'], () =>
        import('../routes/InfrastructureManagement/EditPass')
      ),
    },
    '/infrastructure/switch': {
      component: dynamicWrapper(app, [], () =>
        import('../routes/InfrastructureManagement/SwitchManagement')
      ),
    },
    '/infrastructure/addSwitch': {
      component: dynamicWrapper(app, [], () =>
        import('../routes/InfrastructureManagement/AddSwitch')
      ),
    },
    '/institutionalUserManage/institutionalManage': {
      component: dynamicWrapper(app, [], () =>
        import('../routes/InstitutionalUserManage/InstitutionalManage')
      ),
    },
    '/institutionalUserManage/addInstitution': {
      component: dynamicWrapper(app, [], () =>
        import('../routes/InstitutionalUserManage/AddInstitution')
      ),
    },
    '/institutionalUserManage/userManage': {
      component: dynamicWrapper(app, [], () =>
        import('../routes/InstitutionalUserManage/UserManage')
      ),
    },
    '/institutionalUserManage/addUser': {
      component: dynamicWrapper(app, [], () => import('../routes/InstitutionalUserManage/AddUser')),
    },
    '/institutionalUserManage/roleLimit': {
      component: dynamicWrapper(app, ['roleLimit'], () =>
        import('../routes/InstitutionalUserManage/RoleLimit')
      ),
    },
    '/institutionalUserManage/addRole': {
      component: dynamicWrapper(app, [], () => import('../routes/InstitutionalUserManage/AddRole')),
    },
    '/institutionalUserManage/limitSet': {
      component: dynamicWrapper(app, ['roleLimit'], () =>
        import('../routes/InstitutionalUserManage/LimitSet')
      ),
    },
    '/institutionalUserManage/assignRole': {
      component: dynamicWrapper(app, [], () =>
        import('../routes/InstitutionalUserManage/AssignRole')
      ),
    },
    '/dataSourceManagement/accessManagement': {
      component: dynamicWrapper(app, [], () =>
        import('../routes/DataSourceManagement/AccessManagement')
      ),
    },
    '/dataSourceManagement/addAccess': {
      component: dynamicWrapper(app, [], () => import('../routes/DataSourceManagement/AddAccess')),
    },
    '/dataSourceManagement/inputDataInfo': {
      component: dynamicWrapper(app, [], () =>
        import('../routes/DataSourceManagement/InputDataInfo')
      ),
    },
    '/dataSourceManagement/setPlan': {
      component: dynamicWrapper(app, [], () => import('../routes/DataSourceManagement/SetPlan')),
    },
    '/dataSourceManagement/updataFile': {
      component: dynamicWrapper(app, [], () => import('../routes/DataSourceManagement/UpdataFile')),
    },
    '/dataSourceManagement/ftp': {
      component: dynamicWrapper(app, [], () => import('../routes/DataSourceManagement/Ftp')),
    },
    '/dataSourceManagement/ftpSetPlan': {
      component: dynamicWrapper(app, [], () => import('../routes/DataSourceManagement/FtpSetPlan')),
    },
    '/dataSourceManagement/task': {
      component: dynamicWrapper(app, [], () => import('../routes/DataSourceManagement/Task')),
    },
    '/dataSourceManagement/catalog': {
      component: dynamicWrapper(app, [], () => import('../routes/DataSourceManagement/Catalog')),
    },
    '/dataSourceManagement/accessAudit': {
      component: dynamicWrapper(app, [], () =>
        import('../routes/DataSourceManagement/AccessAudit')
      ),
    },
    '/dataSourceManagement/sourceManagement': {
      component: dynamicWrapper(app, [], () =>
        import('../routes/DataSourceManagement/SourceManagement')
      ),
    },
    '/dataSourceManagement/fileSource': {
      component: dynamicWrapper(app, [], () => import('../routes/DataSourceManagement/FileSource')),
    },
    '/dataSourceManagement/fileSourceDetail/:id': {
      component: dynamicWrapper(app, [], () =>
        import('../routes/DataSourceManagement/FileSourceDetail')
      ),
    },
    '/dataSourceManagement/sourceAudit': {
      component: dynamicWrapper(app, [], () =>
        import('../routes/DataSourceManagement/SourceAudit')
      ),
    },
    '/dataSourceManagement/catalogManagement': {
      component: dynamicWrapper(app, [], () =>
        import('../routes/DataSourceManagement/CatalogManagement')
      ),
    },
    '/dataSourceManagement/catalogAudit': {
      component: dynamicWrapper(app, [], () =>
        import('../routes/DataSourceManagement/CatalogAudit')
      ),
    },
    '/dataSourceManagement/subscriptionAudit': {
      component: dynamicWrapper(app, [], () =>
        import('../routes/DataSourceManagement/SubscriptionAudit')
      ),
    },
    '/dataSourceManagement/newMenu': {
      component: dynamicWrapper(app, [], () => import('../routes/DataSourceManagement/NewMenu')),
    },
    '/dataSourceManagement/newMenu/one': {
      component: dynamicWrapper(app, [], () =>
        import('../routes/DataSourceManagement/NewMenu/Step1')
      ),
    },
    '/dataSourceManagement/newMenu/two': {
      component: dynamicWrapper(app, [], () =>
        import('../routes/DataSourceManagement/NewMenu/Step2')
      ),
    },
    '/dataSourceManagement/newMenu/three': {
      component: dynamicWrapper(app, [], () =>
        import('../routes/DataSourceManagement/NewMenu/Step3')
      ),
    },
    '/dataSourceManagement/auditLog': {
      component: dynamicWrapper(app, [], () => import('../routes/DataSourceManagement/AuditLog')),
    },
    '/dataSourceManagement/checkAudit': {
      component: dynamicWrapper(app, [], () => import('../routes/DataSourceManagement/CheckAudit')),
    },
    '/dataSwitchManagement/subscriptionAudit': {
      component: dynamicWrapper(app, [], () =>
        import('../routes/DataSwitchManagement/SubscriptionAudit')
      ),
    },
    '/dataSwitchManagement/sourceSubscription': {
      component: dynamicWrapper(app, [], () =>
        import('../routes/DataSwitchManagement/SourceSubscription')
      ),
    },
    '/dataSwitchManagement/dataManagement': {
      component: dynamicWrapper(app, [], () =>
        import('../routes/DataSwitchManagement/DataManagement')
      ),
    },
    '/dataSwitchManagement/allSub': {
      component: dynamicWrapper(app, [], () => import('../routes/DataSwitchManagement/AllSub')),
    },
    '/portalManagement/newsManagement': {
      component: dynamicWrapper(app, [], () => import('../routes/PortalManagement/NewsManagement')),
    },
    '/portalManagement/publicationManagement': {
      component: dynamicWrapper(app, [], () =>
        import('../routes/PortalManagement/PublicationManagement')
      ),
    },
    '/portalManagement/publication': {
      component: dynamicWrapper(app, [], () => import('../routes/PortalManagement/Publication')),
    },
    '/portalManagement/newsLibrary': {
      component: dynamicWrapper(app, [], () => import('../routes/PortalManagement/NewsLibrary')),
    },
    '/portalManagement/menuManagement': {
      component: dynamicWrapper(app, [], () => import('../routes/PortalManagement/MenuManagement')),
    },
    '/portalManagement/carouselManagement': {
      component: dynamicWrapper(app, [], () =>
        import('../routes/PortalManagement/CarouselManagement')
      ),
    },
    '/portalManagement/addArticle': {
      component: dynamicWrapper(app, [], () => import('../routes/PortalManagement/AddArticle')),
    },
    '/portalManagement/addCarousel': {
      component: dynamicWrapper(app, [], () => import('../routes/PortalManagement/AddCarousel')),
    },
    '/monitor/node': {
      component: dynamicWrapper(app, [], () => import('../routes/Monitor/Node')),
    },
    '/monitor/pass': {
      component: dynamicWrapper(app, [], () => import('../routes/Monitor/Pass')),
    },
    '/monitor/insert': {
      component: dynamicWrapper(app, [], () => import('../routes/Monitor/Insert')),
    },
    '/monitor/insertDetail/:params': {
      component: dynamicWrapper(app, [], () => import('../routes/Monitor/InsertDetail')),
    },
    '/monitor/insertResource': {
      component: dynamicWrapper(app, [], () => import('../routes/Monitor/InsertResource')),
    },
    '/monitor/task': {
      component: dynamicWrapper(app, [], () => import('../routes/Monitor/Task')),
    },
    '/monitor/pubDetail': {
      component: dynamicWrapper(app, [], () => import('../routes/Monitor/PubDetail')),
    },
    '/monitor/subDetail': {
      component: dynamicWrapper(app, [], () => import('../routes/Monitor/SubDetail')),
    },
    '/monitor/warningOption': {
      component: dynamicWrapper(app, [], () => import('../routes/Monitor/WarningOption')),
    },
    '/monitor/editWarningOption': {
      component: dynamicWrapper(app, [], () => import('../routes/Monitor/EditWarningOption')),
    },
    '/monitor/addWarningOption': {
      component: dynamicWrapper(app, [], () => import('../routes/Monitor/AddWarningOption')),
    },
    '/monitor/warningQuery': {
      component: dynamicWrapper(app, [], () => import('../routes/Monitor/WarningQuery')),
    },
    '/result/success': {
      component: dynamicWrapper(app, [], () => import('../routes/Result/Success')),
    },
    '/result/fail': {
      component: dynamicWrapper(app, [], () => import('../routes/Result/Error')),
    },
    '/exception/403': {
      component: dynamicWrapper(app, [], () => import('../routes/Exception/403')),
    },
    '/exception/404': {
      component: dynamicWrapper(app, [], () => import('../routes/Exception/404')),
    },
    '/exception/500': {
      component: dynamicWrapper(app, [], () => import('../routes/Exception/500')),
    },
    '/exception/trigger': {
      component: dynamicWrapper(app, ['error'], () =>
        import('../routes/Exception/triggerException')
      ),
    },
    '/user': {
      component: dynamicWrapper(app, [], () => import('../layouts/UserLayout')),
    },
    '/user/login': {
      component: dynamicWrapper(app, ['login'], () => import('../routes/User/Login')),
    },
    '/user/register': {
      component: dynamicWrapper(app, ['register'], () => import('../routes/User/Register')),
    },
    '/user/register-result': {
      component: dynamicWrapper(app, [], () => import('../routes/User/RegisterResult')),
    },
    // '/user/:id': {
    //   component: dynamicWrapper(app, [], () => import('../routes/User/SomeComponent')),
    // },
  };
  // Get name from ./menu.js or just set it in the router data.
  const menuData = getFlatMenuData(getMenuData());

  // Route configuration data
  // eg. {name,authority ...routerConfig }
  const routerData = {};
  // The route matches the menu
  Object.keys(routerConfig).forEach(path => {
    // Regular match item name
    // eg.  router /user/:id === /user/chen
    const pathRegexp = pathToRegexp(path);
    const menuKey = Object.keys(menuData).find(key => pathRegexp.test(`${key}`));
    let menuItem = {};
    // If menuKey is not empty
    if (menuKey) {
      menuItem = menuData[menuKey];
    }
    let router = routerConfig[path];
    // If you need to configure complex parameter routing,
    // https://github.com/ant-design/ant-design-pro-site/blob/master/docs/router-and-nav.md#%E5%B8%A6%E5%8F%82%E6%95%B0%E7%9A%84%E8%B7%AF%E7%94%B1%E8%8F%9C%E5%8D%95
    // eg . /list/:type/user/info/:id
    router = {
      ...router,
      name: router.name || menuItem.name,
      authority: router.authority || menuItem.authority,
      hideInBreadcrumb: router.hideInBreadcrumb || menuItem.hideInBreadcrumb,
    };
    routerData[path] = router;
  });
  return routerData;
};
