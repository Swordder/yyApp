<script>
	export default {
		onLaunch: function() {
			// 锁定竖屏  
			// plus.screen.lockOrientation("portrait-primary");  
			// console.log('App Launch')
		},
		onShow: function() {
			// console.log( process.env.NODE_ENV )
			
			// #ifdef APP-PLUS
			
			
			 var args = plus.runtime.arguments;  
			 console.log(args);
			    if(args){  
			        // 处理args参数，如直达到某新页面等  
			    }  
					
			// #endif
		},
		onHide: function() {
			// console.log('App Hide')
		}
	}
</script>

<style lang="scss">
	// 阿里矢量图标库引用
	@import './static/css/iconfont.css';
	@import 'uview-ui/iconfont.css';
	@import "uview-ui/index.scss";
	uni-page-wrapper{
		font-size: 28rpx;
		color: $color-x3;
		uni-page-body{
			color: $color-x3;
		}
	}
	/*每个页面公共css */
</style>
