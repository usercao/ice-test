import vitePluginRequire from 'vite-plugin-require';

export default {
  store: false,
  vite: true,
  hash: true,
  // eslint: true,
  // tsChecker: true,
  dropLogLevel: 'log',
  router: {
    configPath: 'src/routes/index.ts',
  },
  babelPlugins: ['macros'],
  babelPresets: ['@babel/preset-typescript'],
  vitePlugins: [vitePluginRequire()],
  proxy: {
    '/api': {
      target: 'https://www.mexo.io',
      changeOrigin: true,
      cookieDomainRewrite: 'localhost',
      headers: {
        Referer: 'https://www.mexo.io',
      },
    },
    '/s_api': {
      target: 'https://www.mexo.io',
      changeOrigin: true,
      cookieDomainRewrite: 'localhost',
      headers: {
        Referer: 'https://www.mexo.io',
      },
    },
    '/api/v1': {
      target: 'https://test-senior.mexo.io',
      // target: 'https://senior.mexo.io', // 正式
      changeOrigin: true,
      cookieDomainRewrite: 'localhost',
      headers: {
        Referer: 'https://test-senior.mexo.io',
        // Referer: 'https://senior.mexo.io', // 正式
      },
    },
  },
};
