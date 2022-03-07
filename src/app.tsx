import { runApp, IAppConfig } from 'ice';
import { RecoilRoot } from 'recoil';
import Cookies from 'js-cookie';
import { GlobalStyle } from '@/assets/styles/global';
import { IconfontStyle } from '@/assets/styles/iconfont';
import I18nProvider from '@/locales';

const appConfig: IAppConfig = {
  app: {
    rootId: 'ice-container',
    // 可选，自定义添加 Provider
    addProvider: ({ children }) => {
      return (
        <RecoilRoot>
          <GlobalStyle />
          <IconfontStyle />
          <I18nProvider>{children}</I18nProvider>
        </RecoilRoot>
      );
    },
    getInitialData: async () => {
      // const { username, age } = await request.get('/api/user');
      // const theme = localStorage.getItem('theme');
      // // 任意的操作：比如读写 cookie 等
      // return { theme, username, age };
      // const { username, count } = await request.get('/api/data');
      // return {
      //   // initialStates 是约定好的字段，会透传给 store 的初始状态
      //   initialStates: {
      //     user: { name: username },
      //     counter: { count },
      //   },
      // };
      // // 模拟服务端返回的数据
      // const data = await request('/api/auth');
      // const { role, starPermission, followPermission } = data;
      // // 约定权限必须返回一个 auth 对象
      // // 返回的每个值对应一条权限
      // return {
      //   auth: {
      //     admin: role === 'admin',
      //     guest: role === 'guest',
      //     starRepo: starPermission,
      //     followRepo: followPermission,
      //   },
      // };
    },
    ErrorBoundaryFallback: () => <div>渲染错误</div>,
    onErrorBoundaryHandler: (error: Error, componentStack: string) => {
      // Do something with the error
    },
    auth: {
      // 可选的，设置无权限时的展示组件，默认为 null
      NoAuthFallback: <div>没有权限...</div>,
      // 或者传递一个函数组件
      // NoAuthFallback: () => <div>没有权限..</div>
    },
  },
  request: {
    baseURL: '/',
    headers: {},
    interceptors: {
      request: {
        onConfig: (config) => {
          const __temp = config;
          const locale: string = Cookies.get('locale') || 'es-es';
          __temp.headers = {
            'accept-language': locale,
          };
          return __temp;
        },
        onError: (error) => {
          return Promise.reject(error);
        },
      },
      response: {
        onConfig: (response) => {
          if (response.data.code !== 0) {
            // todo: 添加失败提示
            console.log(response.data.msg);
          }
          return response;
        },
        onError: (error: any) => {
          // 请求出错：服务端返回错误状态码
          console.log(error.response.data);
          console.log(error.response.status);
          console.log(error.response.headers);
          return Promise.reject(error);
        },
      },
    },
  },
  router: {
    type: 'browser',
    basename: '/',
    fallback: <div>loading...</div>,
    modifyRoutes: (routes) => {
      return routes;
    },
  },
};

runApp(appConfig);
