import { IRouterConfig, lazy } from 'ice';

const routerConfig: IRouterConfig[] = [
  {
    path: '/',
    exact: true,
    component: lazy(() => import('@/pages/Home')),
  },
  { path: '/', redirect: '/' },
];

export default routerConfig;
