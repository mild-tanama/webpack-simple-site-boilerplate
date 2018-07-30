const path = require('path')

const CopyWebpackPlugin = require('copy-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')

const src = path.resolve(__dirname, 'src')
const dist = path.resolve(__dirname, 'dist')

module.exports = {
	mode: 'development',

	entry: [
		src + '/assets/scripts/main.js',
		src + '/assets/scss/style.scss'
	],

	output: {
		filename: 'bundle.js',
		path: dist
	},

	devServer: {
		contentBase: dist,
		port: 3000,
		open: true
	},

	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				use: [
					{
						loader: 'babel-loader',
						options: {
							presets: [
								['env', {'modules': false}]
							]
						}
					}
				]
			},
			{
				test: /\.scss$/,
				exclude: /node_modules/,
				use: ExtractTextPlugin.extract({
					fallback: 'style-loader',
					use: [
						{
							loader: 'css-loader',
							options: { url: false }
						},
						{
							loader: 'postcss-loader',
							options: {
								plugins: [
									require('autoprefixer')({ grid: true })
								]
							},
						},
						'sass-loader'
					],
				})
			},
		]
	},

	plugins: [
		new CopyWebpackPlugin([{
			from: src,
			to: dist,
			ignore: [ '*.js', '*.scss' ]
		}]),
		new ExtractTextPlugin('/assets/css/main.css')
	]
}