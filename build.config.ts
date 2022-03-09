import vitePluginRequire from 'vite-plugin-require';

export default {
  store: false,
  vite: true,
  hash: true,
  eslint: true,
  tsChecker: true,
  dropLogLevel: 'log',
  router: {
    configPath: 'src/routes/index.ts',
  },
  babelPlugins: ['macros'],
  babelPresets: ['@babel/preset-typescript'],
  vitePlugins: [vitePluginRequire()],
  proxy: {
    '/api/v1': {
      enable: true,
      target: 'https://test-senior.mexo.io',
      // target: 'https://senior.mexo.io', // 正式
    },
    '/api': {
      enable: true,
      target: 'https://www.mexo.io',
      changeOrigin: true,
      https: true,
      headers: {
        Referer: 'https://www.mexo.io',
      },
      cookieDomainRewrite: 'localhost',
    },
  },
};
