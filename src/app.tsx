import * as React from 'react';
import { runApp, IAppConfig, useHistory } from 'ice';
import { RecoilRoot } from 'recoil';
import ThemeProvider from '@/themes';
import I18nProvider from '@/locales';
import { getCookieLan } from '@/utils/tools';

const NoAuth = () => {
  const history = useHistory();
  React.useEffect(() => {
    history.push('/login');
  }, [history]);
  return null;
};

const appConfig: IAppConfig = {
  app: {
    rootId: 'ice-container',
    // 可选，自定义添加 Provider
    addProvider: ({ children }) => {
      return (
        <RecoilRoot>
          <ThemeProvider>
            <I18nProvider>{children}</I18nProvider>
          </ThemeProvider>
        </RecoilRoot>
      );
    },
    getInitialData: async () => {},
    ErrorBoundaryFallback: () => <div>渲染错误</div>,
    onErrorBoundaryHandler: (error: Error, componentStack: string) => {
      // Do something with the error
    },
  },
  request: {
    // baseURL: '',
    // headers: {},
    interceptors: {
      request: {
        onConfig: (config2) => {
          const _temp = config2;
          // 老项目抛弃之后修改
          const locale: string = getCookieLan();
          // 老项目抛弃之后修改
          _temp.headers = {
            'accept-language': locale,
          };
          return _temp;
        },
        onError: (error) => {
          return Promise.reject(error);
        },
      },
      response: {
        onConfig: (response) => {
          // 兼容单点登录401情况
          // if (response.data.code !== 0) {
          //   message.error(response.data.msg);
          // }
          return response;
        },
        onError: (error: any) => {
          // 请求出错：服务端返回错误状态码
          // console.log(error.response.data);
          // console.log(error.response.status);
          // console.log(error.response.headers);
          return Promise.reject(error);
        },
      },
    },
  },
  router: {
    type: 'browser',
    basename: '/',
    // fallback: <div style={{ textAlign: 'center' }}>loading...</div>,
    fallback: <div />,
    modifyRoutes: (routes) => {
      return routes;
    },
  },
  auth: { NoAuthFallback: <NoAuth /> },
};

runApp(appConfig);
