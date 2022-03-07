import { IRouterConfig, lazy } from 'ice';
import BasicLayout from '@/layouts/BasicLayout';

const routerConfig: IRouterConfig[] = [
  {
    path: '/forget',
    exact: true,
    component: lazy(() => import('@/pages/Account/contents/Forget')),
  },
  {
    path: '/login',
    exact: true,
    component: lazy(() => import('@/pages/Account/contents/Login')),
  },
  {
    path: '/signup',
    exact: true,
    component: lazy(() => import('@/pages/Account/contents/Signup')),
  },
  {
    path: '/',
    component: BasicLayout,
    children: [
      {
        path: '/user',
        exact: true,
        component: lazy(() => import('@/pages/Home')),
        // pageConfig: {
        //   title: '主页',
        //   scrollToTop: true,
        //   // auth: ['admin'],
        //   // 自定义配置
        //   foo: 'bar',
        // },
      },
      {
        path: '/',
        redirect: '/user',
      },
      // {
      //   // 404 没有匹配到的路由
      //   component: NotFound
      // },
    ],
  },
];

export default routerConfig;
