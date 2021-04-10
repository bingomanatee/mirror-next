module.exports = {
  webpack: (config, options) => {
    config.module.rules.push(
      {
        test: /\.svg$/i,
        exclude: /node_modules/,
        use: {
          loader: 'svg-react-loader',
        },
      }
    );

    return config
  },
}
