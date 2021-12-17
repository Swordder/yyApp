<template>
	<view class="content">
		<web-view :src="url"></web-view>
	</view>
</template>

<script>
	import { knowledgeDetail } from '@/api/compliance.js';
	export default {
		data() {
			return {
				// pdf.js的viewer.html所在路径
				// 注意：静态的html文件需要放在根路径下的 hybrid/html 文件夹中
				// base_url : 'http://www.xiangdong.xyz/pdf/web/viewer.html',
				base_url : '/hybrid/html/web/viewer.html',
							   
				file_url: '',// pdf文件
				// 最终显示在web-view中的路径
				url: '',
				info:{}
			};
		},
		onLoad() {
			this.getDetail()
		},
		methods:{
			async getDetail(){
				let query = this.$Route.query;
				let params = {
					id:query.id
				};
				let res = await knowledgeDetail(query.id,params);
				this.info = res.data.info;
				this.file_url = this.info.link;
				// h5 和 安卓
				this.url = `${this.base_url}?file=${this.file_url}`;
			},
			toNextPage(){
				
			}
		}
	}
</script>

<style lang="scss" scoped>

</style>
