export default {
  store: false,
  vite: false,
  hash: true,
  dropLogLevel: 'log',
  router: {
    configPath: 'src/routes/index.ts',
  },
  babelPlugins: ['macros'],
  babelPresets: ['@babel/preset-typescript'],
  proxy: {
    '/api': {
      enable: true,
      target: 'http://127.0.0.1:6001',
    },
  },
};
