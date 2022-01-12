import { IRouterConfig, lazy } from 'ice';
// import WrapperPage from '@/components/Auth';

const routerConfig: IRouterConfig[] = [
  {
    path: '/',
    component: lazy(() => import('@/pages/Home')),
    // wrappers: [WrapperPage],
    // pageConfig: {
    //   auth: ['admin'],
    // },
  },
];

export default routerConfig;
