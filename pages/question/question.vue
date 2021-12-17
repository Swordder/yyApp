<template>
	<view class="content">
		<view class="u-border-bottom">
			<u-tabs :list="tabs" active-color="#5870FE" :is-scroll="false" :current="current" @change="change"></u-tabs>
		</view>
		<view class="">
			<u-table 
			v-show="list.length !== 0"
			color="#333333" bg-color="#ffffff" 
			padding="30rpx 0" border-color="#ffffff"
			align="center"
			>
				<u-tr class="u-border-bottom">
					<u-th class="u-p-l-10 u-p-r-10" width="50%">问卷名称</u-th>
					<u-th width="30%">已邀请/可用/总量</u-th>
					<u-th width="20%">操作</u-th>
				</u-tr>
				<u-tr class="u-border-bottom" v-for="item in list" :key="item.id">
					<u-td class="u-flex-2 u-p-l-10 u-p-r-10" width="50%" :style="{fontWeight:'bold'}">{{item.name}}A</u-td>
					<u-td class="u-flex" width="30%" :style="{color:'#666666'}">
						<text :style="{color:'#F65B6A'}">{{item.invited}}</text>
						<text>/{{item.rest_invite}}/{{item.invite_quota}}</text>
					</u-td>
					<u-td width="20%">
						<u-button size="mini" shape="circle" @click="toNextPage(item.id)" :custom-style="customStyle">查看</u-button>
					</u-td>
				</u-tr>
			</u-table>
			<u-empty class="u-m-t-60" text="暂时没有问卷哦~" v-show="empty_tag"></u-empty>
		</view>
	</view>
</template>

<script>
	import { getQuestionList } from "@/api/question.js";
	export default {
		data() {
			return {
				tabs: [{
					name: '进行中'
				}, {
					name: '已结束'
				}],
				current: 0,
				list:[],
				customStyle:{
					backgroundColor:'#5870FE',
					color:'#ffffff'
				}
			};
		},
		onLoad() {
			this.change(0);
		},
		methods: {
			// 获取列表
			async change(index) {
				this.list = [];
				this.current = index;
				let status = index == 0?1:2;
				let res = await getQuestionList({status});
				this.list = [...res.data.list];
				if(this.list.length === 0){
					this.empty_tag = true;
				} else {
					this.empty_tag = false;
				}
			},
			toNextPage(id){
				this.$Router.push({
					path:'/pages/question/questionInvitees',
					query:{
						id
					}
				})
			}
		}
	}
</script>
<style lang="scss" scoped>
	.u-table{
		border-left: 0 !important;
		border-top: 0 !important;
		.u-th{
			font-size: 24rpx;
			background-color: $color-xf;
			color: $color-x6;
			font-weight: normal;
		}	
		.u-th,.u-td{
			border-right: 0 none !important;
			border-bottom: 0 none !important;
		}
		.u-tr{
			.u-td{
				height: 100%;
				flex-direction: row;
			}
		}
		.u-tr:nth-of-type(2n){
			background-color: #F2F4FF;
			.u-td{
				background-color: #F2F4FF;
			}
		}
	}

</style>
