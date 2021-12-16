module.exports = {
  presets: [
    '@babel/preset-env',
    '@babel/preset-typescript',
    ["@babel/preset-react", {
      "runtime": "automatic"
    }],
  ],
  plugins: ['@babel/plugin-transform-runtime', "@babel/transform-regenerator", "@babel/plugin-syntax-dynamic-import","@babel/plugin-transform-modules-commonjs"]
};