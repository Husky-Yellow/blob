const nav = require('./utils/nav.js')
const { cssSidebar, webpackSidebar } = nav
module.exports = {
  title: 'HuskyBear',
  description: '一个狗和一只熊的历程就此开启',
  base: '/blob/',
  head: [
    ['link', { rel: 'icon', href: 'https://gitee.com/husky-bear/picture-bed/raw/master/情人节可爱卡通手绘柴犬与哈士奇情侣png图片.png' }]
  ],
  port: 3000,
  serviceWorker: true,
  markdown: {
    lineNumbers: false
  },
  themeConfig: {
    lastUpdated: '最后更新时间',
    sidebar: 'auto',
    repo: 'https://gitee.com/husky-bear/blob',
    repoLabel: 'Gitee',
    nav: [
      {
        text: '前端知识',
        link: '/interview/'
      },
      {
        text: '前端',
        items: [
          {
            text: 'Css',
            items: [
              {
                text: 'CSS',
                link: '/css/index'
              }
            ]
          },
          {
            text: 'JavaScript',
            items: [
              {
                text: 'JavaScript属性',
                link: '/javascript/javascriptApi'
              },
              {
                text: 'JavaScript设计模式',
                link: '/javascript/javascriptObj'
              },
              {
                text: '空间坐标',
                link: '/javascript/SpatialCoordinates'
              },
              {
                text: '原型链',
                link: '/javascript/prototype'
              },
            ]
          },
          {
            text: '浏览器',
            items: [
              { text: '浏览器原理', link: '/browser/' }
            ]
          },
          {
            text: '手写实现',
            items: [
              { text: '手写实现', link: '/handwritten/Index' }
            ]
          },
          {
            text: 'Vue',
            items: [
              { text: 'Api', link: '/vue/nextTick' },
              { text: 'Vue源码分析', link: '/vue/vueAnalysis' }
            ]
          },
          {
            text: 'TypeScript',
            items: [
              { text: 'TypeScript基础', link: '/typescript/' }
            ]
          },
          // {
          //   text: 'VuePress',
          //   items: [
          //     { text: 'VuePress基础', link: '/vuepress/' }
          //   ]
          // },
        ]
      },
      {
        text: 'Git',
        items: [
          { text: 'Git配置', link: '/git/deploy' },
          { text: 'Git搜索', link: '/git/search' }
        ]
      },
      {
        text: '自动化测试',
        items: [
          {
            text: '前端测试',
            items: [
              { text: 'Vue应用测试', link: '/test/vueTest' }
            ]
          }
        ]
      },
    ],
    sidebar: {
      // '/css/': [cssSidebar],
      // '/webpack/': [webpackSidebar]
    }
  },
  configureWebpack: {
    resolve: {
      alias: {
        '@images': '../images',
        '@vuepress': '../images/vuepress',
        '@components': '../.vuepress/components'
      }
    }
  }
}
