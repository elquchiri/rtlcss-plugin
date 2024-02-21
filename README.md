## RTLCSS-Plugin for Webpack

RTLCSS Plugin helps you transform your hole web site to support Right-To-Left.

## Installation
```bash
npm i rtlcss-plugin
```

## Use
```bash
entry: {
  app: []
},
output: {
  path: path.resolve(__dirname, 'public/build'),
  filename: '[name].js',
  publicPath: '/build/',
},
module: {
  rules: [
    {
      test: /\.scss$/,
      use: [
        miniCssExtractPlugin.loader,
        'css-loader',
        'sass-loader',
      ],
    },
  ],
},
plugins: [
  new RtlCssPlugin({
    filename: 'app-rtl.css'
  })
],
```