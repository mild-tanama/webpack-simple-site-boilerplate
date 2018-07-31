const path = require('path')

const CopyWebpackPlugin = require('copy-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')

const src = path.resolve(__dirname, 'src')
const dist = path.resolve(__dirname, 'dist')

module.exports = [
	{
		mode: 'development',

		devServer: {
			contentBase: dist,
			port: 3000,
			open: true
		},

		entry: [
			src + '/assets/scripts/main.js',
		],

		output: {
			filename: 'bundle.js',
			path: dist
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
				}
			]
		},
	},
	{
		mode: 'development',

		entry: [
			src + '/assets/scss/style.scss'
		],

		output: {
			filename: 'style.css',
			path: dist
		},

		module: {
			rules: [
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
				}
			]
		},

		plugins: [
			new CopyWebpackPlugin([{
				from: src,
				to: dist,
				ignore: [ '*.js', '*.scss', '.DS_store' ]
			}]),
			new ExtractTextPlugin('style.css')
		]
	}
]