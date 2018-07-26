const path = require('path')

const CopyWebpackPlugin = require('copy-webpack-plugin')

const src = path.resolve(__dirname, 'src')
const dist = path.resolve(__dirname, 'dist')

module.exports = {
	mode: 'development',

	devServer: {
		contentBase: 'dist',
		port: 3000,
		open: true
	},

	entry: [
		'./src/assets/scripts/main.js',
		'./src/assets/scss/style.scss'
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
			},
			{
				test: /\.scss$/,
				exclude: /node_modules/,
				use: [
					'style-loader',
					{
						loader: 'css-loader',
						options: {
							url: false,
							sourceMap: true,
							importLoaders: 2
						},
					},
					{
						loader: 'sass-loader',
						options: {
							sourceMap: true,
						}
					}
				]
			}
		]
	},

	plugins: [
		new CopyWebpackPlugin([{
			from: src,
			to: dist,
			ignore: [ '*.js', '*.scss' ]
		}])
	]
}