const path = require('path');
module.exports = {
	publicPath: '/',
	outputDir: 'dist',
	lintOnSave: false,
	runtimeCompiler: true,
	productionSourceMap: false,
	parallel: require('os').cpus().length > 1,
	configureWebpack: {
		resolve: {
			alias: {
				'css': path.join(__dirname, 'src/assets/styles'),
				'@images': path.join(__dirname, 'src/assets/img')
			}
		}
	},
	chainWebpack: config => {
		config
			.plugin('html')
			.tap(args => {
				args[0].title = 'switch'
				return args
			})
	},
	devServer: {
		proxy: {
			'/api': {
				target: 'http://124.70.186.118:8081/api/',
				ws: true,
				changOrigin: true,
				pathRewrite: {
					'^/api': ''
				}
			}
		},
		port:8000,
	}
}
