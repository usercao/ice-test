export default {
  catalogs: [
    {
      path: '<rootDir>/src/locales/{locale}/index',
      include: ['<rootDir>/src'],
      exclude: ['**/node_modules/**'],
    },
  ],
  compileNamespace: 'ts',
  locales: ['en-US', 'es-ES', 'pt-PT'],
  fallbackLocales: {
    default: 'en-US',
  },
  sourceLocale: 'en-US',
};
