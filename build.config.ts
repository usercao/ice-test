import vitePluginRequire from 'vite-plugin-require';

export default {
  store: false,
  vite: true,
  hash: true,
  // eslint: true,
  dropLogLevel: 'log',
  router: {
    configPath: 'src/routes/index.ts',
  },
  babelPlugins: ['macros'],
  babelPresets: ['@babel/preset-typescript'],
  vitePlugins: [vitePluginRequire()],
  proxy: {
    '/api': {
      enable: true,
      target: 'http://127.0.0.1:6001',
    },
  },
};
