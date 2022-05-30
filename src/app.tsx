import * as React from 'react';
import { runApp, IAppConfig, useHistory } from 'ice';
import { RecoilRoot } from 'recoil';
import ThemeProvider from '@/themes';
import I18nProvider from '@/locales';

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
    addProvider: ({ children }) => (
      <RecoilRoot>
        <ThemeProvider>
          <I18nProvider>{children}</I18nProvider>
        </ThemeProvider>
      </RecoilRoot>
    ),
    ErrorBoundaryFallback: () => <div>Rendering error</div>,
    // onErrorBoundaryHandler: (error: Error, componentStack: string) => {
    //   // Do something with the error
    // },
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
