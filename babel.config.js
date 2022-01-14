module.exports = (api) => {
  api.cache(true);
  return {
    plugins: ['macros'],
    presets: ['@babel/preset-typescript'],
  };
};
