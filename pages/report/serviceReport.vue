<template>
	<view class="content">
		<view class="u-flex u-p-t-30 u-p-b-30 u-m-l-40 u-m-r-40 u-row-between title">
			<view class="u-font-32 font_bold">{{info.name}}</view>
			<view class="font_10 u-p-l-20 u-p-r-20">{{info.last_serve_month}}月服务月报</view>
		</view>
		<u-line></u-line>
		<view class="u-p-l-40 u-p-r-40 u-p-t-40">
			<view class="u-border-bottom u-p-b-40">
				<view class="u-m-b-30">
					近6个月流向走势图
				</view>
				<view class="charts-box">
					<qiun-data-charts type="demotype" :opts="serviceReportConfig" :chartData="info.chart" />
				</view>
			</view>	
		</view>
		<view  class="u-p-40">
			<BaseShow v-if="info.current_month" :data="info.current_month"  :title_type="2"></BaseShow>
		</view>
		<u-line :style="{margin:'0 34rpx',width:'auto'}"></u-line>
		<view class="u-p-40">
			<BaseShow v-if="info.last_three_month" :data="info.last_three_month"  :title_type="2"></BaseShow>
		</view>
		<u-line :style="{margin:'0 34rpx',width:'auto'}"></u-line>
		<view class="hos_rank u-m-t-40">
			<view class="u-text-center">
				<text class="custom-icon u-m-r-16 u-font-40">&#xe60b;</text>医院排名
			</view>
			<mescroll-body 
			ref="mescrollRef" @init="mescrollInit" 
			@down="downCallback" @up="upCallback" :up="upOption"
			height="auto">
				<view class="hos_list u-p-40">
					<u-row 
					class="u-m-b-30" 
					align="top" 
					gutter="16"
					v-for="(item,index) in rank_list" :key="item.id">
						<u-col class="u-flex" align="top" span="8">
							<view class="u-m-r-6 u-font-24 rank_num">{{index+1}}</view>
							<view class="">{{item.name}}</view>
						</u-col>
						<u-col span="2">
							<view class="u-text-right" :style="{color:'#5870FE'}">{{item.sum}}</view>
						</u-col>
						<u-col span="2">
							<view v-if="item.rate > 0" class="u-text-right font_color_red"><u-icon name="arrow-upward" color="#F65B6A" size="28"></u-icon>{{item.rate}}%</view>
							<view v-else-if="item.rate < 0" class="u-text-right font_color_green"><u-icon name="arrow-downward" color="#4ED79C" size="28"></u-icon>{{item.rate}}%</view>
							<view v-else class="u-text-right"></u-icon>--</view>
						</u-col>
					</u-row>
					<u-empty v-show="empty_tag" text="没有医院可进行排行~"></u-empty>
				</view>
			</mescroll-body>
			<!-- </scroll-view> -->
		</view>
		<u-line :style="{margin:'0 34rpx',width:'auto'}"></u-line>
		<view class="fix_bt_btn u-flex u-p-30">
			<u-button 
			class="add_btn u-m-r-20" shape="circle" 
			size="medium" 
			@click="err_correction.show = true">
				纠错
			</u-button>
		 	<u-button 
			class="selected u-flex-1" type="primary" shape="circle" size="medium"
			hover-class="none" @click="toNextPage('/pages/report/historyFlow')">查看历史流向明细</u-button>
		</view>
		<!-- model -->
		<ErrorCorrection :err_correct_con="err_correction" @submitCon="submitHelp"></ErrorCorrection>
	</view>
</template>

<script>
	import BaseShow from '@/components/report/BaseShow.vue';
	import ErrorCorrection from '@/components/report/ErrorCorrection.vue';
	import { transactionDetail,hospitalRank } from '@/api/flowReport.js';
	import { forHelp } from '@/api/mine.js';
	import MescrollMixin from "@/uni_modules/mescroll-uni/components/mescroll-uni/mescroll-mixins.js";
	export default {
		mixins: [MescrollMixin],
		data() {
			return {
				info:{},
				rank_list:[],
				empty_tag:false,
				err_correction:{
					show:false,
					content:''
				},
				upOption: {
					auto: true,
					page: {
						num: 0, // 当前页码,默认0,回调之前会加1,即callback(page)会从1开始
						size: 10 // 每页数据的数量,默认10
					},
					noMoreSize: 5, // 配置列表的总数量要大于等于5条才显示'-- END --'的提示
					textNoMore: '~ 呀, 到底了 ~',
					empty: {
						use: false // 不使用自带组件
					},
					toTop: {
						offset: 800,
						radius: 16
					}
				},
			};
		},
		components:{
			BaseShow,
			ErrorCorrection
		},
		onLoad() {
			this.getData();
		},
		methods:{
			async getData(){
				let res = await transactionDetail(this.$Route.query.id);
				let rows = res.data.info.chart.rows;
				let per_obj = {},categories = [],data_obj = {name:'',data:[]};
				for(let i = 0; i < rows.length ; i ++){
					categories.push(rows[i].date);
					data_obj.data.push(rows[i].num);
				};
				let chart_obj = {
					categories:[...categories],
					series:[]
				};
				chart_obj.series.push({...data_obj});
				res.data.info.current_month.title = `${res.data.info.last_serve_month}月数据`;
				per_obj = Object.assign({chart:{},current_month:{},last_three_month:{},overview:{}},{...res.data.info},{chart:chart_obj}) ;
				this.info = {...per_obj};
			},
			async upCallback(page){
				let current = page.num, limit = page.size;
				let params = {
					id:this.$Route.query.id,
					current,
					limit
				};
				let res = await hospitalRank(params);
				const list = res.data.list;
				const total_size = res.data.page.total;
				if(total_size == 0){
					this.empty_tag = true;
				} else {
					this.empty_tag = false;
				}
				const cur_page_len = list.length;
				if (page.num == 1) {
					this.list = []; //如果是第一页需手动制空列表
				}
				this.rank_list = this.rank_list.concat(list); //追加新数据
				this.mescroll.endBySize(cur_page_len, total_size);
				setTimeout(() => {
					this.mescroll.endSuccess(cur_page_len);
				}, 20);
			},
			downCallback(){
				
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
						id:this.$Route.query.id
					}
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
.content{
	padding-bottom: 140rpx;
}
.title{
	.font_10{
		line-height: 40rpx;
		border-radius: 20rpx 0 20rpx 0;
		color: $color-31;
		background-color: #F2F3FF;
	}
}
.rank_num{
	color: $color-31;
	border-radius: 50%;
	padding: 4rpx 10rpx;
	background-color: #E5E9FF;
}
</style>
