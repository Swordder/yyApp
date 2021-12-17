<template>
	<view class="content">
		<u-sticky :enable="true">
			<view class="sticky u-p-t-30 u-p-l-30 u-p-r-30 u-p-b-70">
				<view class="search_hd">
					<u-search 
					class="u-m-b-40"
					bg-color="#ffffff"
					placeholder="请输入关键字" 
					v-model="keyword" 
					:show-action="false" 
					input-align="center"
					@change="$u.debounce(search, 500)">
					</u-search>
				</view>
				<view class="u-flex u-row-between">
					<view class="">学习资料共计{{list.length}}类</view>
					<view class="condition u-font-24" @click="show=true">
						<text class="custom-icon u-font-28">&#xe645;</text>
						{{show_type}}
					</view>
				</view>
			</view>
		</u-sticky>
		<view v-if="keyword == ''" class="collapse">
			<view class="collapse_item" v-for="item in list" :key="item.id" @click="collapse(1,item.id)">
				<template v-if="item.type == 1">
					<view class="collapse_item_hd u-flex u-row-between u-p-t-24 u-p-b-24 u-p-l-30 u-p-r-30">
						<view class="">
							<text class="custom-icon u-m-r-20 u-font-36" :style="{color:'#FFCD45'}">&#xe63e;</text>
							<text :style="{fontWeight:'bold'}">{{item.name}}</text>
						</view>
						<view class="">
							<text v-if="collapse_id == item.id" class="custom-icon">&#xe649;</text>
							<text v-else class="custom-icon">&#xe661;</text>
						</view>
					</view>
				</template>
				<template v-else-if="item.type == 2">
					<view class="collapse_con">
						<view @click.stop="toNextPage(item.id)" class="collapse_con_item u-p-24">
							<text class="custom-icon u-m-r-12 u-p-l-40">&#xe60e;</text>
							<text class="">{{item.name}}</text>
						</view>
					</view>
				</template>
				<u-line :hair-line="false"></u-line>
				<view v-show="collapse_id == item.id" class="collapse_item_bd u-p-l-30" v-for="item2 in item.children" :key="item2.id">
					<template v-if="item2.type == 1">
						<view @click.stop="collapse(2,item2.id)" class="collapse_item_hd u-flex u-row-between u-p-t-24 u-p-b-24 u-p-l-30 u-p-r-30">
							<view class="">
								<text class="custom-icon u-m-r-20 u-font-36" :style="{color:'#FFCD45'}">&#xe63e;</text>
								<text :style="{fontWeight:'bold'}">{{item2.name}}</text>
							</view>
							<view class="">
								<text v-if="child_id == item2.id" class="custom-icon">&#xe649;</text>
								<text v-else class="custom-icon">&#xe661;</text>
							</view>
						</view>
					</template>
					<template v-else-if="item2.type == 2">
						<view class="collapse_con">
							<view @click.stop="toNextPage(item2.id)" 
							class="collapse_con_item u-p-24">
								<text class="custom-icon u-m-r-12 u-p-l-40">&#xe60e;</text>
								<text class="">{{item2.name}}</text>
							</view>
						</view>
					</template>
					<u-line :hair-line="false"></u-line>
					<view v-show="child_id == item2.id" class="collapse_con">
						<view @click.stop="toNextPage(item3.id)" 
						class="collapse_con_item u-p-24" v-for="item3 in item2.children" :key="item3.id">
							<text class="custom-icon u-m-r-12 u-p-l-40">&#xe60e;</text>
							<text class="">{{item3.name}}</text>
						</view>
					</view>	
				</view>
			</view>
		</view>
		<view v-else class="collapse">
			<view class="collapse_item">
				<view v-show="search_list.length!==0" class="collapse_con">
					<view 
					@click.stop="toNextPage(item.id)" 
					v-for="item in search_list" 
					:key="item.id" class="collapse_con_item u-border-bottom u-p-24">
						<text class="custom-icon u-m-r-12 u-p-l-20">&#xe60e;</text>
						<text class="">{{item.name}}</text>
					</view>
				</view>
				<u-empty class="u-p-t-80" v-show="empty" text="呀~,空的" mode="list"></u-empty>
			</view>
		</view>
		<!-- popup层 -->
		<view>
			<u-popup v-model="show" mode="right" width="400rpx">
				<view class="u-p-40">
					<view 
					class="popup_item u-m-b-20" 
					@click="topDirSearch(item.name,item.id)"
					:class="{active:top_dir_id == item.id}" v-for="item in top_dir_list" :key="item.id">
						{{item.name}}
					</view>
				</view>
			</u-popup>
		</view>
	</view>
</template>
<script>
	import { knowledgeList,topDir,knowledgeTree } from '@/api/compliance.js';
	export default {
		data(){
			return {
				keyword:'',
				show:false,
				list:[],
				top_dir_list:[{
					id:0,
					name:'全部'
				}],
				top_dir_id:0,
				collapse_id:'',
				child_id:'',
				search_list:[],
				show_type:'全部',
				empty:false
			}
		},
		onLoad() {
			this.getTreeList();
			this.getTopDir();
		},
		methods:{
			// 获取树状列表
			async getTreeList(){
				let params = {
					dir_id:this.top_dir_id
				};
				let res = await knowledgeTree(params);
				this.list = [...res.data.list];
			},
			// 获取搜索列表
			async search(){
				let params = {
					keywords:this.keyword
				};
				this.top_dir_id = 0;
				this.show_type = '全部';
				let res = await knowledgeList(params);
				this.search_list = [...res.data.list];
				if(this.search_list.length == 0){
					this.empty = true;
				} else {
					this.empty = false;
				}
			},
			// 获取顶层目录
			async getTopDir(){
				let res = await topDir();
				this.top_dir_list = this.top_dir_list.concat(res.data.list);
			},
			topDirSearch(name,id){
				// this.keyword = name;
				this.top_dir_id = id;
				this.show = false;
				this.show_type = name;
				this.getTreeList();
			},
			// 折叠
			collapse(type,id){
				if(type == 1){
					if(this.collapse_id == id){
						this.collapse_id = ''
					} else {
						this.collapse_id = id
					}	
					return
				} else if(type == 2){
					if(this.child_id == id){
						this.child_id = ''
					} else {
						this.child_id = id
					}
				}
			},
			toNextPage(id){
				this.$Router.push({
					path:'/pages/compliance/knowledgeInfo',
					query:{
						id
					}
				})
			}
		}
	}
</script>
<style lang="scss" scoped>
	.sticky{
		background-color: $color-31;
		padding-bottom: 40rpx;
		.u-flex{
			color: $color-xf;
		}
		.condition{
			color: $color-31;
			background-color: $color-xf;
			border-radius: 30rpx;
			padding: 8rpx 20rpx;
		}
	}
	.collapse{
		margin-top: -30rpx;
		background-color: $color-xf;
		border-radius: 30rpx 30rpx 0 0;
		.collapse_item_bd{
			// display: none;
			background-color: #F9FAFF;
			.collapse_con_item{
				border-bottom: 2rpx solid $color-f5;
				.custom-icon{
					color: #DEE2E6;
				}
			}
		}	
	}
	
	.popup_item{
		padding: 12rpx 30rpx;
		
	}
	.active{
		color: $color-31;
		background-color: #E9ECFF;
		border-radius: 32rpx;
	}
</style>
