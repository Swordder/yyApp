<template>
	<view class="ni_bonus u-p-l-30 u-p-r-30 u-p-b-40">
		<view class="form_cal u-p-l-40 u-p-r-40 u-p-t-30 u-p-b-30">
			<view class="u-m-b-20 font_color_red">
				注：个人区域及单家医院YTD达成85%方可计奖
			</view>
			<view class="form_item u-m-b-30">
				<view>当年考核月数</view>
				<view class="u-m-t-10">
					<u-input class="u-p-l-10 u-p-r-10" type="number" v-model.trim="month" @input="inputCal($event,1)" data-name="target" placeholder="请输入大于0的值" />
				</view>
			</view>
			<view class="form_item">
				<view class="month_avg_show u-flex">
					<view>单家医院截至当月累计销售</view>
				</view>
				<view class="u-m-t-10 ">
					<u-input class="u-p-l-10 u-p-r-10" type="number" v-model.trim="hos_sales" @input="inputCal($event,2)" data-name="sales" placeholder="请输入" />
				</view>
			</view>
			<view class="form_item">
				<view>单家医院截至上月累计销售</view>
				<view class="u-m-t-10">
					<u-input class="u-p-l-10 u-p-r-10" type="number" v-model.trim="last_mon_hos_sales" @input="inputCal($event,3)" placeholder="请输入" />
				</view>
			</view>
			<view class="form_item">
				<view>2020年4月-2020年12月单家医院月均销售</view>
				<view class="u-m-t-10">
					<u-input class="u-p-l-10 u-p-r-10" type="number" v-model.trim="month_avg" @input="inputCal($event,4)" placeholder="请输入" />
				</view>
			</view>
			
		</view>
		<view class="form_result u-m-16">
			<view class="re_item u-flex u-row-between u-p-t-20 u-p-b-20 u-border-bottom">
				<view class="re_type">
					<text class="custom-icon u-m-r-12 font_blue">&#xe60e;</text>
					<text>YTD月均增量</text>
				</view>
				<view class="re_num font_blue">
					<text>{{ytd_mon_sales != null?ytd_mon_sales:null}}盒</text>
				</view>
			</view>
			<view class="re_item u-flex u-row-between u-p-t-20 u-p-b-20 u-border-bottom">
				<view class="re_type">
					<text class="custom-icon u-m-r-12 font_blue">&#xe60e;</text>
					<text>单盒奖金</text>
				</view>
				<view class="re_num font_blue">
					<text>{{single_bonus}}元</text>
				</view>
			</view>
			<view class="re_item u-flex u-row-between u-p-t-20 u-p-b-20 u-border-bottom">
				<view class="re_type">
					<text class="custom-icon u-m-r-12 font_blue">&#xe60e;</text>
					<text>YTD应发奖金</text>
				</view>
				<view class="re_num font_blue">
					<text>{{ytd_bonus != null?ytd_bonus:null}}</text>
					元
				</view>
			</view>
			<view class="font_10 note u-m-t-20">注：若当月应发奖金为负值，则显示为0;<br />数据按照四舍五入保留两位小数计算</view>
		</view>
		<view class="bonus_result u-rela u-text-center">
			<u-image width="100%" height="232" src="http://img.youyao99.com/7464915268ce4a2b2957e540711b6cf8.png"></u-image>
			<view class="u-abso">
				<view class="font_blue">当月应发奖金(元)</view>
				<view class="bonus_num font_blue font_bold">{{getBonus}}</view>
				<view class="tip font_10">该奖金仅供参考，最终结果以财务部数据为准</view>
			</view>
		</view>
	</view>
</template>
<script>
	export default {
		data(){
			return {
				month:null,
				hos_sales:null,
				last_mon_hos_sales:null,
				month_avg:null,
				single_bonus:null,
				ytd_mon_sales:null,
				ytd_bonus:null,
				his_single_bonus:null,
				his_ytd_mon_sales:null,
				his_ytd_bonus:null,
			}
		},
		computed:{
			getBonus(){
				if(this.month == 1){
					return this.ytd_bonus;
				};
				if(this.ytd_bonus != null){
					if(this.history_bonus == null){
						this.history_bonus = 0;
					};
					let bonus = Math.round((this.ytd_bonus - this.his_ytd_bonus)*100)/100;
					if(bonus < 0){
						return 0
					} else  {
						return bonus
					}
				} else {
					return 0;
				}
			}
		},
		methods:{
			inputCal(e,type){
				switch (type) {
					case 1:
						this.month = e;
						break;
					case 2:
						this.hos_sales = e;
						break;
					case 3:
						this.last_mon_hos_sales = e;
						break;
					case 4:
						this.month_avg = e;
						break;
					default:
						break;
				};
				// YTD月均增量
				if(this.hos_sales != null && this.month != null && this.month_avg != null){
					this.ytd_mon_sales = strategyHosAddBonus.ytdMonAdd(this.hos_sales,this.month,this.month_avg);
				} else {
					this.ytd_mon_sales = null;
				};
				// 单盒奖金计算
				if(this.ytd_mon_sales != null){
					this.single_bonus = strategyHosAddBonus.singleBonus(this.ytd_mon_sales);
				} else {
					this.single_bonus = null;
				};
				// YTD应发奖金
				if(this.ytd_mon_sales != null && this.single_bonus != null && this.month != null){
					this.ytd_bonus = strategyHosAddBonus.ytdBonus(this.ytd_mon_sales,this.single_bonus,this.month);
				} else {
					this.ytd_bonus = null;
				};
				// 历史YTD月均增量
				if(this.last_mon_hos_sales != null && this.month != null && this.month_avg != null){
					this.his_ytd_mon_sales = strategyHosAddBonus.hisYtdMonAdd(this.last_mon_hos_sales,this.month,this.month_avg);
				} else {
					this.his_ytd_mon_sales = null;
				};
				// // 历史单盒奖金
				if(this.his_ytd_mon_sales != null){
					this.his_single_bonus = strategyHosAddBonus.singleBonus(this.his_ytd_mon_sales);
				} else {
					this.his_single_bonus = null;
				};
				// 历史应发奖金
				if(this.his_ytd_mon_sales != null && this.his_single_bonus != null && this.month != null){
					this.his_ytd_bonus = Math.round((Number(this.his_ytd_mon_sales)*Number(this.his_single_bonus)*(Number(this.month) -1))*100)/100;
				} else {
					this.his_ytd_bonus = null;
				};
			}
		}
	}
</script>
<style lang="scss" scoped>
	@import '@/static/css/calculate.scss';
</style>