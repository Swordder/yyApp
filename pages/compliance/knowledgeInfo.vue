<template>
	<view class="content">
		<view v-if="info.type == 1" class="">
			<video :style="{width:'100%',height:'400rpx'}" :src="info.link" controls></video>
		</view>
		<view v-else-if="info.type == 2" @click="toNextPage" class="">
			<u-image width="100%" height="400rpx" src="http://img.youyao99.com/7dfed61ca58e356ce6b6704c61784ead.png"></u-image>
		</view>
		<view class="u-p-30">
			<view class="u-m-b-20" style="fontWeight:bold">
				{{info.title}}
			</view>
			<view class="u-font-24" style="color:#999999">
				{{info.create_time}}
			</view>
		</view>
	</view>
</template>
<script>
	import { knowledgeDetail } from '@/api/compliance.js';
	export default {
		data() {
			return {
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
			},
			toNextPage(){
				this.$Router.push({
					path:'/pages/compliance/knowledgeDetail',
					query:{
						id : this.$Route.query.id
					}
				})
			}
		}
	}
</script>

<style lang="scss">

</style>
