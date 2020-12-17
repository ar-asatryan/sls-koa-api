/* eslint-disable @typescript-eslint/no-var-requires */
"use strict";

const path = require("path");
const slsw = require("serverless-webpack");
const nodeExternals = require("webpack-node-externals");
const CopyWebpackPlugin = require("copy-webpack-plugin");

const entries = {};

Object.keys(slsw.lib.entries).forEach(key => {
  entries[key] = ["./source-map-install.js", slsw.lib.entries[key]];
});

const use = [
  { loader: "cache-loader" },
  {
    loader: "ts-loader",
    options: {
      experimentalWatchApi: true,
      happyPackMode: true,
      transpileOnly: true
    }
  }
];

if (slsw.lib.webpack.isLocal) {
  use[2] = use[1];
  use[1] = {
    loader: "thread-loader",
    options: {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      poolTimeout: Infinity,
      workers: require("os").cpus().length - 1
    }
  };
}

const plugins = [
  new CopyWebpackPlugin({
    patterns: ["serverless.yml", "email-templates/**", "data/**"]
  })
];

module.exports = {
  devtool: "eval-cheap-module-source-map",
  entry: entries,
  externals: [nodeExternals()],
  mode: slsw.lib.webpack.isLocal ? "development" : "production",
  module: { rules: [{ test: /\.tsx?$/, use }] },
  output: {
    filename: "[name].js",
    libraryTarget: "commonjs2",
    path: path.join(__dirname, ".webpack"),
    pathinfo: false
  },
  plugins,
  resolve: { extensions: [".js", ".jsx", ".json", ".ts", ".tsx"] },
  stats: "minimal",
  target: "node"
};
