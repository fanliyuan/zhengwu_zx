// https://umijs.org/config/
import os from 'os'
import pageRoutes from './router.config'
import webpackPlugin from './plugin.config'
import defaultSettings from '../src/defaultSettings'

const plugins = [
  [
    'umi-plugin-react',
    {
      antd: true,
      dva: {
        hmr: true,
      },
      targets: {
        ie: 11,
      },
      locale: {
        enable: true, // default false
        default: 'zh-CN', // default zh-CN
        baseNavigator: true, // default true, when it is true, will use `navigator.language` overwrite default
      },
      dynamicImport: {
        loadingComponent: './components/PageLoading/index',
      },
      ...(!process.env.TEST && os.platform() === 'darwin'
        ? {
            dll: {
              include: ['dva', 'dva/router', 'dva/saga', 'dva/fetch'],
              exclude: ['@babel/runtime'],
            },
            hardSource: true,
          }
        : {}),
    },
  ],
]

// judge add ga
// if (process.env.APP_TYPE === 'site') {
//   plugins.push([
//     'umi-plugin-ga',
//     {
//       code: 'UA-72788897-6',
//     },
//   ])
// }

export default {
  // add for transfer to umi
  plugins,
  targets: {
    ie: 11,
  },
  define: {
    APP_TYPE: process.env.APP_TYPE || '',
  },
  // 路由配置
  routes: pageRoutes,
  // Theme for antd
  // https://ant.design/docs/react/customize-theme-cn
  theme: {
    'primary-color': defaultSettings.primaryColor,
  },
  // externals: {
  //   '@antv/data-set': 'DataSet',
  // },
  proxy: {
    // 用户机构代理
    '/userapi/': {
      target: 'http://cdyoue.com.cn:19106',
      changeOrigin: true,
      pathRewrite: { '^/userapi/': '' },
    },
    // 中心节点后台代理
    '/api/': {
      target: 'http://cdyoue.com.cn:19006',
      changeOrigin: true,
      pathRewrite: { '^/api/': '' },
    },
    // 开放门户代理
    '/portalapi/': {
      target: 'http://cdyoue.com.cn:19082',
      changeOrigin: true,
      pathRewrite: { '^/portalapi': '' },
    },
  },
  ignoreMomentLocale: false,
  lessLoaderOptions: {
    javascriptEnabled: true,
  },
  disableRedirectHoist: true,
  cssLoaderOptions: {
    modules: true,
    getLocalIdent: (context, localIdentName, localName) => {
      if (
        context.resourcePath.includes('node_modules') ||
        context.resourcePath.includes('ant.design.pro.less') ||
        context.resourcePath.includes('global.less')
      ) {
        return localName
      }
      const match = context.resourcePath.match(/src(.*)/)
      if (match && match[1]) {
        const antdProPath = match[1].replace('.less', '')
        const arr = antdProPath
          .split('/')
          .map(a => a.replace(/([A-Z])/g, '-$1'))
          .map(a => a.toLowerCase())
        return `antd-pro${arr.join('-')}-${localName}`.replace(/--/g, '-')
      }
      return localName
    },
  },
  manifest: {
    basePath: '/',
  },
  chainWebpack: webpackPlugin,
  // devtool: 'cheap-module-source-map',
}
