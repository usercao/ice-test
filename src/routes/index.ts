import { IRouterConfig, lazy } from 'ice';
import BasicLayout from '@/layouts/BasicLayout';

const routerConfig: IRouterConfig[] = [
  {
    path: '/',
    component: BasicLayout,
    children: [
      {
        path: '/user',
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
