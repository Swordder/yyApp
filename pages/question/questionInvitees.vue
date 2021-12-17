<template>
	<view class="content">
		<view class="qu_invite_top">
			<view class="u-p-30 title">
				<view class="u-flex">
					<view class="u-m-r-20 u-font-32 u-line-2">
						{{name}}
					</view>
					<u-button 
					shape="circle" 
					:custom-style="customStyle2" 
					v-if="invite_more == 1"
					@click="toNextPage">发起邀请</u-button>
				</view>
			</view>	
			<view class="u-m-l-30 u-m-r-30 qu_invite_data">
				<u-row class="u-p-40" gutter="16">
					<u-col span="6" class="u-m-b-16">
						<view class="">
							<text class="custom-icon u-m-r-12">&#xe60e;</text>
							<text class="u-m-r-20" :style="{color:'#999999'}">总计</text>
							<text>{{statistical.invite_quota}} 个</text>
						</view>
					</u-col>
					<u-col span="6" class="u-m-b-16">
						<view class="">
							<text class="custom-icon u-m-r-12">&#xe60e;</text>
							<text class="u-m-r-20" :style="{color:'#999999'}">已作答</text>
							<text>{{statistical.answered}} 个</text>
						</view>
					</u-col>
					<u-col span="6">
						<view class="">
							<text class="custom-icon u-m-r-12">&#xe60e;</text>
							<text class="u-m-r-20" :style="{color:'#999999'}">作废</text>
							<text>{{statistical.invalid}} 个</text>
						</view>
					</u-col>
					<u-col span="6">
						<view class="">
							<text class="custom-icon u-m-r-12">&#xe60e;</text>
							<text class="u-m-r-20" :style="{color:'#999999'}">未邀请</text>
							<text>{{statistical.rest_invite}} 个</text>
						</view>
					</u-col>
				</u-row>
			</view>
		</view>
		<view class="">
			<u-table 
			v-show="list.length !== 0"
			color="#333333" bg-color="#ffffff" 
			padding="30rpx 0" border-color="#ffffff"
			align="center"
			>
				<u-tr class="u-border-bottom">
					<u-th class="u-p-l-10 u-p-r-10" width="40%">微信名称</u-th>
					<u-th width="30%">状态</u-th>
					<u-th width="30%">操作</u-th>
				</u-tr>
				<u-tr class="u-border-bottom" v-for="item in list" :key="item.id">
					<u-td class="u-flex-2 u-p-l-10 u-p-r-10" width="40%" :style="{fontWeight:'bold'}">{{item.wechat_name}}A</u-td>
					<u-td class="u-flex" width="30%">
						<text v-if="item.status == 1" :style="{color:'#F65B6A'}">未作答</text>
						<text v-else-if="item.status == 2" :style="{color:'#4ED79C'}">已作答</text>
						<text v-else-if="item.status == 3" :style="{color:'#FF9D34'}">已作废</text>
					</u-td>
					<u-td width="30%">
						<u-button 
						v-show="item.status != 2" size="mini" 
						shape="circle" :custom-style="customStyle"
						@click="invite(item.id,item.status)">
						{{item.status == 1?'提醒作答':'重新邀请'}}
						</u-button>
					</u-td>
				</u-tr>
			</u-table>
			<u-empty class="u-m-t-60" text="暂时没有数据~" v-show="empty_tag"></u-empty>
		</view>
	</view>
</template>
<script>
	import { getQuestionInvite,noticeAns,reinvite } from "@/api/question.js";
	export default {
		data() {
			return {
				list:[],
				statistical:{},
				name:'',
				invite_more:-1,
				customStyle:{
					backgroundColor:'#5870FE',
					color:'#ffffff'
				},
				customStyle2:{
					color:'#5870FE'
				}
			};
		},
		onLoad() {
			this.getList();
		},
		methods: {
			// 获取列表
			async getList() {
				let id = this.$Route.query.id;
				let res = await getQuestionInvite(id);
				this.name = res.data.paper_name;
				this.invite_more = res.data.invite_more;
				this.statistical = {...res.data.statistical};
				this.list = [...res.data.list];
				if(this.list.length === 0){
					this.empty_tag = true;
				} else {
					this.empty_tag = false;
				}
			},
			async invite(id,status){
				let res;
				if(status == 1){
					res = await noticeAns({invite_id:id});
					
				} else if(status == 3){
					res = await reinvite({invite_id:id})
				};
				if(res.errcode == 0){
					this.$u.toast('邀请成功');
					return
				} else {
					this.$u.toast(res.errmsg);
				}
			},
			toNextPage(){
				this.$Router.push({
					path:"/pages/question/surveyInvite",
					query:{
						id:this.$Route.query.id
					}
				})
			}
		}
	}
</script>
<style lang="scss" scoped>
	.qu_invite_top{
		height: 348rpx;
		background-color: $color-f5;
		.title{
			height: 240rpx;
			background-color: $color-31;
			color: $color-xf;
		}
		.qu_invite_data{
			background-color: $color-xf;
			margin-top: -80rpx;
			.custom-icon{
				color: $color-31;
			}
		}
		
	}
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
