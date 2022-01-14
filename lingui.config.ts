export default {
  catalogs: [
    {
      path: '<rootDir>/src/locales/{locale}/messages',
      include: ['<rootDir>/src'],
      exclude: ['**/node_modules/**'],
    },
  ],
  compileNamespace: 'ts',
  format: 'po',
  locales: ['en-US', 'es-ES', 'pt-BR', 'zh-CN'],
  sourceLocale: 'en-US',
  fallbackLocales: {
    default: 'en-US',
  },
};
