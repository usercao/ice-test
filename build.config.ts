import vitePluginRequire from 'vite-plugin-require';

export default {
  store: false,
  // vite: true,
  hash: true,
  // eslint: true,
  // tsChecker: true,
  dropLogLevel: 'log',
  router: { configPath: 'src/routes' },
  babelPlugins: ['macros'],
  babelPresets: ['@babel/preset-typescript'],
  // CSS Sourcemap support during dev (experimental) 2.9.0
  vite: { css: { devSourcemap: true } },
  vitePlugins: [vitePluginRequire()],
};
