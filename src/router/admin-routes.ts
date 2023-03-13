import { RouteMeta, RouteRecordItem, TplRouteRecord } from './types'

const rememberMeta = (listPageName: string): RouteMeta => ({
  activeTarget: listPageName,
  remember: true
})

/** 固定name（非模版）的动态权限路由列表 **/
export const adminDynaRoutes = (): RouteRecordItem[] => [
  // {
  //   path: '/access/users/new',
  //   title: '新增用户',
  //   name: 'UserAdd',
  //   component: 'UserEdit',
  //   rightRelevance: [
  //     'UserList',
  //     (actions: string[]) => actions.includes('add')
  //   ],
  //   meta: { ...rememberMeta('UserList') }
  // },
  // {
  //   path: '/access/users/:id(\\d+)',
  //   title: '编辑用户',
  //   name: 'UserEdit',
  //   rightRelevance: [
  //     'UserList',
  //     (actions: string[]) => actions.includes('edit')
  //   ],
  //   meta: { ...rememberMeta('UserList') }
  // },
  /*
  {
    path: '', // 路由路径
    title: '列表页',  // 路由标题，优先级低于动态菜单返回的title
    name: '', // 路由name，全局唯一，建议项目内所有跳转使用name
    meta: {}
  },
  {
    path: '',
    title: '详情页',
    name: '',
    rightRelevance: '',
    meta: {
      activeTarget: '', // 当前路由页面需要点亮的菜单项对应路由，例如详情页时对应的列表页的菜单项仍然会激活
      remember: true // 当前页面是否需要在返回前一页时恢复前一页的数据状态，用于从详情页返回列表页时恢复列表页之前的状态
    }
  }
  */
]
