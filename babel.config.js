module.exports = (api) => {
  api.cache(true);
  return {
    presets: ['@babel/preset-typescript'],
    plugins: ['macros'],
  };
};
