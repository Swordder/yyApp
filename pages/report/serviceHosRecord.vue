<template>
	<view class="content">
		<u-sticky bg-color="#FFFFFF" :enable="true">
			<view class="sticky">
				<view class="search_hd u-p-l-30 u-p-r-30">
					<u-search 
					class="u-p-t-20 u-p-b-20" 
					placeholder="请输入医院名称"
					v-model="keyword"
					:show-action="false" 
					input-align="center"
					@change="$u.debounce(search, 500)">
					</u-search>
					<u-line color="#F3F3F3" :hair-line="false"></u-line>	
				</view>	
			</view>
		</u-sticky>
		<view class="list">
			<view 
			class="list_item u-p-l-40 u-p-r-40 u-p-t-24 u-p-b-24 u-border-bottom"
			v-for="item in list" :key="item.id"
			@click="toFlowList(item.id)">
				{{item.name}}
			</view>
		</view>
		<u-empty class="u-m-t-40" v-show="empty_tag" text="没有数据哦~"></u-empty>
	</view>
</template>

<script>
	import { flowHosSearch } from '@/api/flowReport.js';
	export default {
		data() {
			return {
				keyword:'',
				list:[],
				empty_tag:false
			};
		},
		onLoad() {
			this.search()
		},
		methods:{
			async search(){
				let params = {
					id:this.$Route.query.id,
					keywords:this.keyword
				};
				let res = await flowHosSearch(params);
				this.list = [...res.data.list];
				if(this.list.length === 0){
					this.empty_tag = true;
				} else {
					this.empty_tag = false;
				}
			},
			toFlowList(hospital_id){
				this.$Router.push({
					path:'/pages/report/historyFlow',
					query:{
						id : this.$Route.query.id,
						hospital_id
					}
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
.list_item{
	color: $color-x6;
}
</style>
