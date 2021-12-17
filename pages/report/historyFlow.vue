<template>
	<view class="content">
		<u-sticky bg-color="#FFFFFF" :enable="true">
			<view class="sticky">
				<view class="search_hd u-p-l-30 u-p-r-30" @click="toNextPage('/pages/report/serviceHosRecord')">
					<u-search 
					class="u-p-t-20 u-p-b-20" 
					placeholder="请输入医院名称"
					v-model="hospital_name"
					:disabled="true"
					:show-action="false" 
					input-align="center">
					</u-search>
					<u-line color="#F3F3F3" :hair-line="false"></u-line>	
				</view>	
			</view>
		</u-sticky>
		<u-gap height="20" bg-color="#F5F5F5"></u-gap>
		<view class="u-flex u-p-40 u-row-between">
			<view class="u-flex-1">
				<view class="u-m-b-12 u-font-32 font_bold">
					{{product.name}}历史流向记录
				</view>
				<view class="font_10">
					2021-11-15
				</view>
			</view>
			<view class="calendar u-text-center" @click="show = true">
				<u-icon name="calendar" size="50"></u-icon>
			</view>
		</view>
		<u-gap height="20" bg-color="#F5F5F5"></u-gap>
		<view class="data_show">
			<view class="data_show_item" v-for="(item,index) in list">
				<view class="u-flex u-row-between u-p-l-40 u-p-r-40 u-p-t-24 u-p-b-24 u-border-bottom">
					<view class="">{{item.month}}月总计</view>
					<view class="font_blue">{{item.sum}}</view>
				</view>
				<view class="u-p-l-40 u-p-r-40 u-p-t-30">
					<view v-if="!$Route.query.hospital_id" class="u-p-t-10">
						<view class="u-font-24 u-m-b-20 font_blue">
							<u-icon class="u-m-r-8" name="clock" size="32"></u-icon>{{item.month}}
						</view>
						<view class="u-flex u-row-between u-m-b-30" v-for="(item2,index2) in item.details" :key="index">
							<view class="u-flex-1 u-m-r-20">
								{{item2.hospital_name}}
							</view>
							<view v-if="item2.sum > 0" class="font_color_red">+{{item2.sum}}</view>
							<view v-else-if="item2.sum < 0" class="font_color_green">-{{item2.sum}}</view>
							<view v-else class="">--</view>
						</view>
					</view>
					
					<view v-else class="u-p-t-10">
						<!-- <view class="u-font-24 u-m-b-20 font_blue">
							<u-icon class="u-m-r-8" name="clock" size="32"></u-icon>8月29日
						</view> -->
						<view class="u-flex u-row-between u-m-b-30"  v-for="(item2,index2) in item.details" :key="index">
							<view class="u-flex-1 u-m-r-20">
								{{item2.month}}
							</view>
							<view v-if="item2.sum > 0" class="font_color_red">+{{item2.sum}}</view>
							<view v-else-if="item2.sum < 0" class="font_color_green">-{{item2.sum}}</view>
							<view v-else class="">--</view>
						</view>
					</view>
				</view>
			</view>
			<u-gap v-show="!empty_tag" height="20" bg-color="#F5F5F5"></u-gap>
		</view>
		<u-empty class="u-m-t-40" v-show="empty_tag" text="没有数据哦~"></u-empty>
		<view class="fix_bt_btn u-p-20">
			<u-button shape="circle" size="medium" :custom-style="{color:'#5870FE',width:'100%'}" @click="err_correction.show = true">纠错</u-button>
		</view>
		<!-- modeal层  -->
		<ErrorCorrection :err_correct_con="err_correction" @submitCon="submitHelp"></ErrorCorrection>
		<u-modal 
		v-model="show" 
		:show-title="false" 
		:show-cancel-button="true"
		:confirm-style="{color:'#5870FE'}" 
		:content-style="{'fontSize':'28rpx'}">
			<view class="slot-content u-p-40">
				<view 
				class=" u-flex u-row-between u-p-20 u-border-bottom" 
				:class="{active_status:month_index == index}"
				v-for="(item,index) in month_list" :key="index"
				@click="selectMonth(item.month,index)">
					<view class="">
						{{item.month.split('-')[0]}}年{{item.month.split('-')[1]}}月
					</view>
					<view class="flow_status u-font-24">
						{{item.is_trend == 0?'未结算':'已结算'}}
					</view>
				</view>
			</view>
		</u-modal>
	</view>
</template>

<script>
	import { forHelp } from '@/api/mine.js';
	import { monthList,monthFlowDetail } from '@/api/flowReport.js';
	import ErrorCorrection from '@/components/report/ErrorCorrection.vue';
	export default {
		data() {
			return {
				show:false,
				list:[],
				hospital_name:'',
				month_list:[],
				month_index:-1,
				month:'',
				product:{},
				empty_tag:false,
				err_correction:{
					show:false,
					content:''
				},
			};
		},
		components:{
			ErrorCorrection
		},
		onLoad() {
			this.getMonthList();
			this.getList();
		},
		methods:{
			async getList(){
				let query = this.$Route.query;
				let hospital_id = query.hospital_id?query.hospital_id:'';
				let params = {
					id:query.id,
					hospital_id,
					month:this.month
				};
				let res = await monthFlowDetail(params);
				this.product = {...res.data.product};
				this.hospital_name = res.data.hospital.name?res.data.hospital.name:'';
				this.list = [...res.data.list];
				if(res.data.list.length === 0){
					this.empty_tag = true;
				} else {
					this.empty_tag = false;
				}
			},
			async getMonthList(){
				let query = this.$Route.query;
				let hospital_id = query.hospital_id?query.hospital_id:'';
				let params = {
					id:query.id,
					hospital_id
				};
				let res = await monthList(params);
				this.month_list = [...res.data.list];
			},
			selectMonth(month,index){
				this.month = month;
				this.month_index = index;
				this.show=false;
				this.getList();
			},
			async submitHelp(){
				if(this.err_correction.content == ''){
					this.$u.toast('请输入修改内容');
					this.err_correction.show = true;
					return
				}
				let params = {
					content:this.err_correction.content,
					type:4,
					mail:''
				};
				let res = await forHelp(params);
				if(res.data.errcode == 0){
					this.$u.toast('提交成功');
					return
				} else {
					this.$u.toast(res.errmsg);
				}
			},
			toNextPage(path){
				this.$Router.push({
					path,
					query:{
						id : this.$Route.query.id
					}
				})
			}
		}
	}
</script>
<style lang="scss" scoped>
	.content{
		padding-bottom: 120rpx;
		.calendar{
			width: 80rpx;
			height: 80rpx;
			border-radius: 50%;
			background-color: $color-31;
			color: $color-xf;
			line-height: 88rpx;
		}
		.font_10{
			color: $color-x9;
		}
		.slot-content{
			color: $color-x6;
			.active_status,
			.flow_status{
				color: $color-31;
				background-color: #F1F3FF;
			}
			.active_status{
				border-bottom-color: $color-31;
			}
			.flow_status{
				padding: 6rpx 16rpx;
				border-radius: 30rpx;
			}
		}		
	}

</style>
