<template>
	<view class="content u-p-l-30 u-p-r-30 u-p-t-30">
		<view class="title u-m-b-10 u-text-center u-font-36">{{date}}</view>
		<u-tabs :list="tab_list" active-color="#5870FE" font-size="28" :is-scroll="false" :current="current" @change="change"></u-tabs>
		<u-line class="u-m-b-20"></u-line>
		<view class="rp_list">
			<VisitRpData v-if="current == 0" :sale_report="sale_num_report" @showCurSelect="showSelect"></VisitRpData>
			<VisitValue v-else-if="current == 1" :value_report="sale_value_report" @showCurSelect="showSelect"></VisitValue>
		</view>
		<u-select v-model="show_select" :list="cur_level" @confirm="confirm($event,cur_product_name)"></u-select>
		<u-empty v-show="empty_tag"></u-empty>
		<view class="fix_bt_btn u-p-30">
			<u-button 
			class="selected" 
			type="primary" 
			shape="circle" 
			hover-class="none"
			@click="openModel">导出</u-button>
		</view>
		<!-- model -->
		<view>
			<u-modal 
			v-model="show" 
			title="邮箱" 
			show-cancel-button
			:confirm-style="{color:'#5870FE'}" @confirm="sendEmial">
				<view class="u-p-l-60 u-p-r-60 u-p-t-40 u-p-b-40">
					<u-input 
					v-model.trim="email"
					:border="true"
					placeholder="请输入邮箱" />
				</view>
			</u-modal>
		</view>
	</view>
</template>
<script>
	import { salesReport,sendMail } from '@/api/visit.js';
	import VisitRpData from '@/components/visit/VisitRpData.vue';
	import VisitValue from '@/components/visit/VisitValue.vue';
	export default {
		data() {
			return {
				date:'',
				email:'',
				tab_list:[{
					name: '数量'
				}, {
					name: '金额'
				}],
				current: 0,
				sale_num_data:{},
				sale_num_report:[],
				cur_level:[],
				cur_product_name:'',
				sale_value_data:{},
				sale_value_report:{},
				show:false,
				show_select:false,
			};
		},
		components:{
			VisitRpData,
			VisitValue
		},
		onLoad() {
			this.getList()
		},
		methods:{
			async getList(){
				let res = await salesReport();
				// this.date = res.data.month;
				// 判断是销量还是金额
				if (this.current == 0) {
					this.date = res.data.saleNum.month;
				} else {
					this.date = res.data.saleValue.month;
				};
				// 销量的数据处理
				let res_sale_data = res.data.saleNum.report;
				this.sale_num_data = {...res_sale_data};
				for(let prop in res_sale_data){
					let arr = [];
					let obj = {
						level:[],
						level_str:''
					};
					obj = {...obj,...res_sale_data[prop][Object.keys(res_sale_data[prop])[0]]};
					for(let prop2 in res_sale_data[prop]){
						arr.push({
							value:res_sale_data[prop][prop2].id,
							label:prop2
						});
					}
					obj.level = arr;
					obj.level_str = arr[0].label;
					this.sale_num_report.push(obj);
				}
				// 金额的数据处理
				let res_value_data = res.data.saleValue.report;
				this.sale_value_data = {...res_value_data};
				let obj = {
					level:[],
					level_str:''
				};
				let arr = [];
				obj = {...obj,...res_value_data[Object.keys(res_value_data)[0]]};
				for(let prop in res_value_data){
					arr.push({
						value:res_sale_data[prop].id,
						label:prop
					});
				}
				obj.level = arr;
				obj.level_str = arr[0].label;
				this.sale_value_report = {...obj};
			},
			// 获取select的list值
			showSelect(name){
				this.show_select = true;
				this.cur_product_name = name;
				if(this.current == 0){
					for(let i = 0;i<this.sale_num_report.length;i++){
						if(this.sale_num_report[i]['product_name_cn']==name){
							this.cur_level = this.sale_num_report[i].level;
						}
					}	
				} else if(this.current == 1){
					this.cur_level = this.sale_value_report.level;
				}
			},
			// 更新select选择下的对象
			confirm(e){
				let name = this.cur_product_name;
				if(this.current == 0){
					let len = this.sale_num_report.length;
					for(let i = 0;i<len;i++){
						if(this.sale_num_report[i]['product_name_cn']==name){
							let level = this.sale_num_report[i].level;
							let splice_obj = {...this.sale_num_data[name][e[0].label],level:level,level_str:e[0].label};
							this.sale_num_report[i] = {...splice_obj}
							let obj = {...this.sale_num_report[i],...splice_obj};
							this.$set(this.sale_num_report, i, obj);
						}
					}	
				} else if(this.current == 1){
					let obj = {...this.sale_value_data[e[0].label],level_str:e[0].label};
					this.sale_value_report = {...this.sale_value_report,...obj};
				}
			},
			change(index) {
				this.current = index;
			},
			openModel(){
				this.show = true;
			},
			async sendEmial(){
				if(this.email == ''){
					this.openModel();
					this.$u.toast('请输入邮箱地址')
					return
				} else {
					let res = await sendMail({email:this.email});
					if(res.errcode != 0){
						this.$u.toast(res.errmsg)
						return
					} else {
						this.$u.toast('发送成功')
						this.show = false;
					}
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	.content{
		padding-bottom: 140rpx;
	}
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
	}
</style>
