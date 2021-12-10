<template>
	<view class="ni_bonus u-p-l-30 u-p-r-30 u-p-b-40">
		<view class="form_cal u-p-l-40 u-p-r-40 u-p-t-30 u-p-b-30">
			<view class="form_item u-m-b-30">
				<view>当年考核月数</view>
				<view class="u-m-t-10">
					<u-input class="u-p-l-10 u-p-r-10" type="number" v-model.trim="month" @input="inputCal($event,1)" data-name="target" placeholder="请输入大于0的值" />
				</view>
			</view>
			<view class="form_item">
				<view class="month_avg_show u-flex">
					<view>截至当月累计指标</view>
				</view>
				<view class="u-m-t-10 ">
					<u-input class="u-p-l-10 u-p-r-10" type="number" v-model.trim="standard" @input="inputCal($event,2)" data-name="sales" placeholder="请输入" />
				</view>
			</view>
			<view class="form_item">
				<view>截至当月累计销售</view>
				<view class="u-m-t-10">
					<u-input class="u-p-l-10 u-p-r-10" type="number" v-model.trim="sales" @input="inputCal($event,3)" placeholder="请输入" />
				</view>
			</view>
			<view class="form_item">
				<view>截至上月累计指标</view>
				<view class="u-m-t-10">
					<u-input class="u-p-l-10 u-p-r-10" type="number" v-model.trim="lsat_standard" @input="inputCal($event,4)" placeholder="请输入" />
				</view>
			</view>
			<view class="form_item">
				<view>截至上月累计销售</view>
				<view class="u-m-t-10">
					<u-input class="u-p-l-10 u-p-r-10" type="number" v-model.trim="lsat_sales" @input="inputCal($event,5)" placeholder="请输入" />
				</view>
			</view>
			<view class="form_item">
				<view>2020年4月-2020年12月月均销售</view>
				<view class="u-m-t-10">
					<u-input class="u-p-l-10 u-p-r-10" type="number" v-model.trim="month_avg" @input="inputCal($event,6)" placeholder="请输入" />
				</view>
			</view>
		</view>
		<view class="form_result u-m-16">
			<view class="re_item u-flex u-row-between u-p-t-20 u-p-b-20 u-border-bottom">
				<view class="re_type">
					<text class="custom-icon u-m-r-12 font_blue">&#xe60e;</text>
					<text>奖金基数</text>
				</view>
				<view class="re_num font_blue">
					<text>{{base_bonus}}元</text>
				</view>
			</view>
			<view class="re_item u-flex u-row-between u-p-t-20 u-p-b-20 u-border-bottom">
				<view class="re_type">
					<text class="custom-icon u-m-r-12 font_blue">&#xe60e;</text>
					<text>达成率/达成系数</text>
				</view>
				<view class="re_num font_blue">
					<text> {{achieve_rate != null?achieve_rate:null}} % / {{achieve_index==null?null : achieve_index}}</text>
				</view>
			</view>
			<view class="re_item u-flex u-row-between u-p-t-20 u-p-b-20 u-border-bottom">
				<view class="re_type">
					<text class="custom-icon u-m-r-12 font_blue">&#xe60e;</text>
					<text>增长率/增长系数</text>
				</view>
				<view class="re_num font_blue">
					<text> {{growth_rate != null?growth_rate:null}} % / {{growth_index == null?null : growth_index}}</text>
				</view>
			</view>
			<view class="re_item u-flex u-row-between u-p-t-20 u-p-b-20 u-border-bottom">
				<view class="re_type">
					<text class="custom-icon u-m-r-12 font_blue">&#xe60e;</text>
					<text>YTD应发奖金</text>
				</view>
				<view class="re_num font_blue">
					<text>{{ytd_bonus}}</text>
					元
				</view>
			</view>
			<view class="font_10 note u-m-t-20">注：若当月应发奖金为负值，则显示为0;<br />达成率、增长率等所有涉及百分比的数据按照四舍五入百分比保留两位小数计算<br /></view>
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
	import { niStrategies } from '@/api/calculate.js';
	export default {
		data(){
			return {
				month:null,
				standard:null,
				sales:null,
				lsat_standard:null,
				lsat_sales:null,
				month_avg:null,
				his_base_bonus:null,
				his_achieve_rates:null,
				his_achieve_index:null,
	
				history_bonus:null,
				base_bonus:null,
				achieve_rate:null,
				achieve_index:null,
				growth_rate:null,
				growth_index:null,
				// month_bonus:null,
				ytd_bonus:null,
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
		          let bonus = Math.round((this.ytd_bonus - this.history_bonus)*100)/100;
		          if(bonus < 0){
		            return 0
		          } else  {
		            return bonus
		          }
		        } else {
		          return 0
		        }
		    }
		},
		methods:{
			inputCal(e,type){
				console.log(e)
				switch (type) {
				  case 1:
					this.month = e;
					break;
				  case 2:
					this.standard = e;
					break;
				  case 3:
					this.sales = e;
					break;
				  case 4:
					this.lsat_standard = e;
					break;
				  case 5:
					this.lsat_sales = e;
					break;
				  case 6:
					this.month_avg = e;
					break;
				  default:
					break;
				}
				// 计算奖金基数
				if(this.sales != null && this.month != null){
				  this.base_bonus = niStrategies.bonusBase(this.sales,this.month);
				} else {
				  this.base_bonus = null;
				};
				// 达成率和达成系数计算
				if(this.sales != null&&this.standard != null){
				  this.achieve_rate = niStrategies.totalAchieveRate(this.sales,this.standard);
				} else {
				  this.achieve_rate = null;
				};
				if(this.sales != null && this.month != null && this.achieve_rate != null){
				  let month_avg = Number(this.sales)/Number(this.month);
				  this.achieve_index = niStrategies.totalAchieveIndex(this.achieve_rate,month_avg);
				} else {
				  this.achieve_index = null;
				};
				// 增长率/增长系数
				if(this.sales != null && this.month != null && this.month_avg != null){
				  let month_avg = Math.abs(this.month_avg);
				  this.growth_rate = niStrategies.growthRate(this.sales,this.month,month_avg);
				} else {
				  this.growth_rate = null;
				};
				if(this.sales != null && this.month != null && this.growth_rate != null){
				  let month_avg = Number(this.sales)/Number(this.month);
				  this.growth_index = niStrategies.growthRateIndex(this.growth_rate,month_avg);
				} else {
				  this.growth_index = null;
				};
				// YTD
				if(this.base_bonus != null && this.achieve_index != null && this.growth_index != null && this.month){
				  this.ytd_bonus = Math.round(Number(this.base_bonus)*Number(this.achieve_index)*Number(this.growth_index)*Number(this.month)*100)/100;
				} else {
				  this.ytd_bonus = null;
				};
				// 历史奖金计算
				if(this.month == 1){
				  return
				}
				// 历史奖金基数
				if(this.lsat_sales != null && this.month != null){
				  this.his_base_bonus = niStrategies.hisBonusBase(this.lsat_sales,this.month);
				} else {
				  this.his_base_bonus = null;
				};
				// 历史达成率
				if(this.lsat_sales != null && this.lsat_standard != null){
				  this.his_achieve_rates = niStrategies.hisAchRate(this.lsat_sales,this.lsat_standard);
				} else {
				  this.his_achieve_rate = null;
				};
				// 历史达成系数
				if(this.lsat_sales != null && this.month != null && this.his_achieve_rates != null){
				  let month_avg = Number(this.lsat_sales)/(Number(this.month)-1);
				  this.his_achieve_index = niStrategies.totalAchieveIndex(this.his_achieve_rates,month_avg);
				} else {
				  this.his_achieve_index = null;
				};
				// 历史增长率
				if(this.lsat_sales != null && this.month != null && this.month_avg != null){
				  this.his_add_rate = niStrategies.hisAddRate(this.lsat_sales,this.month,this.month_avg);
				} else {
				  this.his_add_rate = null;
				};
				// 历史增长系数
				if(this.lsat_sales != null && this.month != null && this.his_add_rate != null){
				  let month_avg = Number(this.lsat_sales)/(Number(this.month)-1);
				  this.his_add_index = niStrategies.growthRateIndex(this.his_add_rate,month_avg);
				} else {
				  this.his_add_index = null;
				};
				// 历史奖金
				if(this.his_base_bonus != null && this.his_achieve_index != null && this.his_add_index != null && this.month != null){
				  this.history_bonus = Number(this.his_base_bonus)*Number(this.his_achieve_index)*Number(this.his_add_index)*(Number(this.month)-1);
				} else {
				  this.history_bonus = null;
				};
			},
		}
	}
</script>
<style lang="scss" scoped>
	@import '@/static/css/calculate.scss';
</style>
