const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin")
const CopyWebpackPlugin = require("copy-webpack-plugin")
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCssAssetsWebpackPlugin = require("optimize-css-assets-webpack-plugin");
const TerserWebpackPlugin = require("terser-webpack-plugin");

const optimization = function () {
   const config = { splitChunks: { chunks: "all" } };
   if (isProd) {
      config.minimizer = [
         new OptimizeCssAssetsWebpackPlugin(),
         new TerserWebpackPlugin()
      ]
   }
   return config;
}

const isDev = process.env.NODE_ENV == "development";
const isProd = process.env.NODE_ENV == "production";


const babelOptions = preset => {
   const opts = {
      presets: [
         '@babel/preset-env'
      ],
      plugins: [
         '@babel/plugin-proposal-class-properties'
      ]
   }

   if (preset) {
      opts.presets.push(preset)
   }

   return opts
}

const jsLoaders = () => {
   const loaders = [{
      loader: 'babel-loader',
      options: babelOptions()
   }]

   return loaders
}

console.log(`dev = ${isDev} :: prod = ${isProd}`)

module.exports = {
   context: path.resolve(__dirname, "src"),
   mode: "development",
   entry: {
      main: ["@babel/polyfill", "./index.tsx"],
      analytics: "./analytics.ts"
   },
   devtool: isDev ? "eval" : "source-map",
   output: {
      filename: isDev ? "[name].js" : "[name].[contenthash].js",
      path: path.resolve(__dirname, "dist")
   },
   resolve: {
      extensions: ['.js', '.json', '.png', '.ts', '.jsx', '.tsx'],
      alias: {
         '@models': path.resolve(__dirname, 'src/models'),
         '@': path.resolve(__dirname, 'src'),
      }
   },
   optimization: optimization(),
   devServer: {
      port: 5000,
      hot: isDev
   },
   plugins: [
      new HtmlWebpackPlugin({
         template: "./index.html",
         minify: {
            collapseWhitespace: isProd
         }
      }),
      new CleanWebpackPlugin(),
      new CopyWebpackPlugin({
         patterns: [
            {
               from: path.resolve(__dirname, "./src/assets/img/favicon2.webp"),
               to: path.resolve(__dirname, "dist")
            }
         ]
      },),
      new MiniCssExtractPlugin({
         filename: isDev ? "[name].css" : "[name].[contenthash].css",
      })
   ],
   module: {
      rules: [
         {
            test: /\.css$/i,
            use: [{
               loader: MiniCssExtractPlugin.loader,
               options: {
                  publicPath: (resourcePath, context) => {
                     return path.relative(path.dirname(resourcePath), context) + "/";
                  },
               },
            },
               "css-loader"
            ],
         },
         {
            test: /\.less$/i,
            use: [{
               loader: MiniCssExtractPlugin.loader,
               options: {
                  publicPath: (resourcePath, context) => {
                     return path.relative(path.dirname(resourcePath), context) + "/";
                  },
               },
            },
               "css-loader",
               "less-loader"
            ],
         },
         {
            test: /\.(png|jpe?g|gif|ttf|woff2?|eot)$/i,
            type: 'asset/resource'
         },
         {
            test: /\.m?js$/,
            exclude: /node_modules/,
            use: jsLoaders()
         },
         {
            test: /\.m?ts$/,
            exclude: /node_modules/,
            use: {
               loader: "babel-loader",
               options: {
                  presets: [
                     "@babel/preset-env",
                     "@babel/preset-typescript"
                  ]
               }
            }
         },
         {
            test: /\.m?[jt]sx$/,
            exclude: /node_modules/,
            use: {
               loader: "babel-loader",
               options: {
                  presets: [
                     "@babel/preset-env",
                     "@babel/preset-typescript",
                     "@babel/preset-react"
                  ]
               }
            }
         }
      ],
   },
}