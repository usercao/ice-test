export default {
  store: false,
  vite: true,
  hash: true,
  dropLogLevel: 'log',
  router: {
    configPath: 'src/routes/index.ts',
  },
  proxy: {
    '/api': {
      enable: true,
      target: 'http://127.0.0.1:6001',
    },
  },
};
