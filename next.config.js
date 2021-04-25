const UNSPLASH_ACCESS = process.env.UNSPLASH_ACCESS;

module.exports = {
  env: {
    UNSPLASH_ACCESS
  },
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
