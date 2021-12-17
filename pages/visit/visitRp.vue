<template>
	<view class="content u-p-30">
		<view class="title u-m-b-30 u-text-center u-font-36">{{date?date:''}}</view>
		<view class="rp_list">
			<view 
			class="rp_list_item u-m-b-30 u-p-l-30 u-p-r-30 u-p-b-20"
			v-for="(item,index) in list"
			:key="index"
			>
				<view class="u-flex u-row-between u-p-t-30 u-p-b-30">
					<view class="sub_title u-font-32">{{item.product_name_cn}}</view>
					<view class="u-flex">
						<view class="u-m-r-20 u-font-24" :style="{color:'#999999'}">机构级别</view>
						<view class="" @click="showSelect(item.product_name_cn)">
							<text class="u-m-r-12 u-font-24" :style="{color:'#5870FE'}">{{item.level_str}}</text>
							<u-icon name="arrow-down" color="#5870FE" size="28"></u-icon>
						</view>
					</view>
				</view>
				<view class="u-m-b-20 u-p-l-40 u-p-r-40 u-p-t-20 u-p-b-20" :style="{backgroundColor:'#F7F8FF'}">
					<u-row gutter="16" align="top">
						<u-col class="u-m-b-30" span="4">
							<view class="grid-text u-font-32">{{item.of_tgt_ins}}</view>
							<view class="grid-text u-font-xs">目标机构数量</view>
						</u-col>
						<u-col class="u-m-b-30" span="4">
							<view class="grid-text u-font-32">{{item.of_ins_visited}}</view>
							<view class="grid-text u-font-xs">拜访机构数量</view>
						</u-col>
						<u-col class="u-m-b-30" span="4">
							<view class="grid-text u-font-32">{{item.coverage}}</view>
							<view class="grid-text u-font-xs">覆盖率</view>
						</u-col>
						<u-col class="u-m-b-30" span="4">
							<view class="grid-text u-font-32">{{item.of_calls}}</view>
							<view class="grid-text u-font-xs">拜访数量</view>
						</u-col>
						<u-col class="u-m-b-30" span="4">
							<view class="grid-text u-font-32">{{item.frequency}}</view>
							<view class="grid-text u-font-xs">拜访频率</view>
						</u-col>
						<u-col class="u-m-b-30" span="4">
							<view class="grid-text u-font-32">{{item.base_num}}</view>
							<view class="grid-text u-font-xs">Base已列名<br/>机构数</view>
						</u-col>
						<u-col class="" span="4">
							<view class="grid-text u-font-32">{{item.base_standard_num}}</view>
							<view class="grid-text u-font-xs">Base已列名<br/>达标j机构数</view>
						</u-col>
						<u-col class="" span="4">
							<view class="grid-text u-font-32">{{item.base_rage}}</view>
							<view class="grid-text u-font-xs">达标率</view>
						</u-col>
					</u-row>
				</view>
				<view class="u-m-b-20 u-p-l-40 u-p-r-40 u-p-t-20 u-p-b-20" :style="{backgroundColor:'#F7F8FF'}">
					<u-row class="u-m-b-20" gutter="16" align="top">
						<u-col class="u-m-b-30" span="4">
							<view class="grid-text u-font-32">{{item.vacant_days}}</view>
							<view class="grid-text u-font-xs">空岗率</view>
						</u-col>
						<u-col class="u-m-b-30" span="4">
							<view class="grid-text u-font-32">{{item.dif}}</view>
							<view class="grid-text u-font-xs">DIF</view>
						</u-col>
						<u-col class="u-m-b-30" span="4">
							<view class="grid-text u-font-32">{{item.dif_percent}}</view>
							<view class="grid-text u-font-xs">DIF比率</view>
						</u-col>
						<u-col class="" span="4">
							<view class="grid-text u-font-32">{{item.working_hours}}</view>
							<view class="grid-text u-font-xs">工作小时/DIF</view>
						</u-col>
					</u-row>
				</view>
			</view>
		</view>
		<u-select v-model="show" :list="cur_level" @confirm="confirm"></u-select>
		<u-empty v-show="empty_tag"></u-empty>
	</view>
</template>

<script>
	import { visitReport } from '@/api/visit.js';
	export default {
		data() {
			return {
				show:false,
				date:'',
				list:[],
				cur_level:[],
				cur_product_name:'',
				total_data:{},
			};
		},
		onShow() {
			this.getList()
		},
		methods:{
			async getList(){
				let res = await visitReport();
				this.date = res.data.month;
				let res_data = res.data.report;
				this.total_data = {...res_data};
				// 循环获取每个药品第一层机构下的对象，并放入list中
				for(let prop in res_data){
					let arr = [];
					let obj = {
						level:[],
						level_str:''
					};
					obj = {...obj,...res_data[prop][Object.keys(res_data[prop])[0]]};
					for(let prop2 in res_data[prop]){
						arr.push({
							value:res_data[prop][prop2].id,
							label:prop2
						});
					}
					obj.level = arr;
					obj.level_str = arr[0].label;
					this.list.push(obj);
				}
			},
			// 获取select的list值
			showSelect(name){
				this.show = true;
				this.cur_product_name = name;
				for(let i = 0;i<this.list.length;i++){
					if(this.list[i]['product_name_cn']==name){
						this.cur_level = this.list[i].level;
					}
				}
			},
			// 更新select选择下的对象
			confirm(e){
				let name = this.cur_product_name
				for(let i = 0;i<this.list.length;i++){
					if(this.list[i]['product_name_cn']==name){
						let level = this.list[i].level;
						let splice_obj = {...this.total_data[name][e[0].label],level:level,level_str:e[0].label};
						this.list[i] = {...splice_obj}
						let obj = {...this.list[i],...splice_obj};
						this.$set(this.list, i, obj);
					}
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	.title{
		font-weight: bold;
		color: $color-31;
	}
	.sub_title{
		font-weight: bold;
	}
	.rp_list_item{
		border-radius: 16rpx;
		box-shadow: 0px 2px 12px 0px rgba(204, 213, 224, 0.5);
		.u-font-32{
			font-weight: bold;
		}
		.u-font-xs{
			color: $color-x9;
			transform: scale(0.9);
			transform-origin: left;
		}
	}
</style>
