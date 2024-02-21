## RTLCSS-Plugin for Webpack

RTLCSS Plugin is a Simple & Updated Webpack RTLCSS Plugin to help you transform your entire website to support Right-To-Left.

## Installation
```bash
npm i rtlcss-plugin
```

## Use:
<pre>
module.exports = {
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
    <b>plugins: [
      new RtlCssPlugin({
        filename: 'app-rtl.css'
      })
    ],</b>
}
</pre>