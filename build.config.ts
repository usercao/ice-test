import vitePluginRequire from 'vite-plugin-require';
// import { viteRequire } from 'vite-require'; // error

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
  // vitePlugins: [viteRequire()],
  // plugins: [
  //   [
  //     'build-plugin-ice-i18n',
  //     {
  //       locales: ['zh-CN', 'en-US', 'es-ES', 'pt-PT'],
  //       defaultLocale: 'zh-CN',
  //     },
  //   ],
  // ],
};
