const webpack = require("webpack");
const HtmlWebpackPlugin = require('html-webpack-plugin');

const fs = require("fs");
const path = require("path");

const dotEnv = require("dotenv").config({ path: path.resolve(__dirname, "../.env") });
const CopyPlugin = require("copy-webpack-plugin");
const TsconfigPathsPlugin = require("tsconfig-paths-webpack-plugin");

// Remove output directory
const OUTPUT_DIR = path.resolve(__dirname, "../../../output/crusher-electron-app/");
fs.rmdirSync(OUTPUT_DIR, { force: true, recursive: true });

const commonConfig = {
	mode: process.env.NODE_ENV || "development",
	module: {
		rules: [
			{
				test: /\.tsx?$/,
				use: [
					{
						loader: "babel-loader",
					},
					{
					loader: "ts-loader",
					options: {
						transpileOnly: true,
					},
				},
				],
			},
			{
				test: /\.css$/i,
				use: [
				  "style-loader",
				  "css-loader",
				  {
					loader: "postcss-loader",
				  },
				],
			},
			{
				test: /\.(woff|woff2|ttf|eot)$/,
				use: 'file-loader?name=fonts/[name].[ext]!static'
			},
		],
	},
	output: {
		filename: "[name].js",
		path: OUTPUT_DIR,
	},
	resolve: {
		extensions: [".tsx", ".ts", ".js"],
		plugins: [new TsconfigPathsPlugin({ configFile: path.resolve(__dirname, "../tsconfig.json") })],
	},
	optimization: {
		minimize: false,
	},
};

const webpackHotModuleReloadUrl = `webpack-hot-middleware/client?path=http://localhost:3000/__webpack_hmr`;
const publicPath = `http://localhost:3000/`

const finalConfig = [
	{
		...commonConfig,
		target: "electron-main",
		plugins: [
			new webpack.EnvironmentPlugin({
				NODE_ENV: "production",
				...dotEnv.parsed,
			}),
			new CopyPlugin({
				patterns: [{ from: path.dirname(require.resolve("playwright/package.json")), to: "playwright" }],
			}),
			new CopyPlugin({
				patterns: [
					{ from: "package.release.json", to: "package.json" },
					{ from: "static", to: "static" },
				],
			}),
		],
		entry: {
			app: path.resolve(__dirname, "../src/main-process/main.ts"),
		},
		externals: ["playwright"],
	},
	{
		...commonConfig,
		entry: { renderer: [webpackHotModuleReloadUrl, path.resolve(__dirname, '../src/ui/index') ]},
		output: {...commonConfig.output, publicPath},
		target: 'electron-renderer',
		plugins: [
            new webpack.HotModuleReplacementPlugin(),
			new HtmlWebpackPlugin({
			  template: path.join(__dirname, '../static', 'index.html'),
			  chunks: ['renderer'],
			}),
		],
		
	},
	{
		...commonConfig,
		target: "electron-preload",
		entry: {
			["renderer-preload"]: path.resolve(__dirname, "../src/preload/renderer.ts"),
		},
	},
	{
		...commonConfig,
		target: "electron-preload",
		entry: {
			["webview-preload"]: path.resolve(__dirname, "../src/preload/webview.ts"),
		},
	},
];

module.exports = finalConfig.filter((config) => config !== null);
