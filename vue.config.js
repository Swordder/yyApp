const TransformPages = require('uni-read-pages')
const {webpack} = new TransformPages();
module.exports = {
	configureWebpack: {
		plugins: [
			new webpack.DefinePlugin({
				ROUTES: webpack.DefinePlugin.runtimeValue(() => {
					const tfPages = new TransformPages({
						includes: ['path', 'name', 'meta','aliasPath','style']
					});
					return JSON.stringify(tfPages.routes)
				}, true )
			})
		]
	},
	// 配置环境变量
	chainWebpack: config => {
	    config
	      .plugin('define')
	      .tap(args => {
	        args[0]['process.env'].NODE_ENV = '"development"'
	        return args
	    })
	},
	transpileDependencies: ['uni-ajax'],
	devServer: {
		https: false,
		disableHostCheck: true,
		// port: 8080,
		// changeOrigin: true,
		// publicPath: '/uniapp/',
		proxy: {
			// '^/api': {
			// 	target: 'http://doctor.yyimgs.com'
			// },
			// '^/v2': {
			// 	target: 'http://doctor.yyimgs.com'
			// },
			'^/apibeta/statistic': {
				target: 'http://wx.qa.youyao99.com'
			},
			'^/apibate/newapi': {
				target: 'http://wx.qa.youyao99.com'
			}
		}
	}
}