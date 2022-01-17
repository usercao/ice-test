export default {
  store: false,
  vite: true,
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
  plugins: [
    [
      'build-plugin-ice-i18n',
      {
        locales: ['en-US', 'es-ES', 'pt-BR', 'zh-CN'],
        defaultLocale: 'zh-CN',
        i18nRouting: true,
      },
    ],
  ],
};
