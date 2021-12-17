<template>
	<view class="content">
		<web-view :src="url"></web-view>
	</view>
</template>

<script>
	import { examAgreeView } from '@/api/compliance.js';
	export default {
		data() {
			return {
				// pdf.js的viewer.html所在路径
				// 注意：静态的html文件需要放在根路径下的 hybrid/html 文件夹中
				// base_url : 'http://www.xiangdong.xyz/pdf/web/viewer.html',
				base_url : '/hybrid/html/web/viewer.html',
				file_url: '',// pdf文件
				url:'',
				
			};
		},
		onLoad() {
			this.getDetail()
		},
		methods:{
			async getDetail(){
				let params = {
					id : this.$Route.query.id
				};
				let res = await examAgreeView(params);
				this.file_url = res.data.pdf;
				// h5 和 安卓
				this.url = `${this.base_url}?file=${this.file_url}`;
			}
		}
	}
</script>

<style lang="scss">

</style>
