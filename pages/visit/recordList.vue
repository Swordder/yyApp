<template>
	<view class="content">
		<view class="search_condition u-p-30">
			<u-form class="form" :model="form" ref="uForm" label-position="top">
				<u-form-item label="拜访签入时间">
					<u-input class="u-m-r-20" disabled v-model="form.check_in_start_at" 
					@click="showCalendar('checkin')" placeholder="请选择开始时间"/>
					至
					<u-input class="u-m-l-20" disabled v-model="form.check_in_end_at" 
					@click="showCalendar('checkin')" placeholder="请选择结束时间"/>
				</u-form-item>
				<u-form-item label="拜访签出时间">
					<u-input class="u-m-r-20" disabled v-model="form.check_out_start_at" 
					@click="showCalendar('checkout')" placeholder="请选择开始时间"/>
					至
					<u-input class="u-m-l-20" disabled v-model="form.check_out_end_at" 
					@click="showCalendar('checkout')" placeholder="请选择结束时间"/>
				</u-form-item>
				<u-form-item label="拜访医院">
					<u-input disabled v-model="form.hospital.label" type="select" @click="hos_show=true" placeholder="请选择医院"/>
					<u-select v-model="hos_show" :list="doctor_list" @confirm="handleSelect($event,'hospital')"></u-select>
				</u-form-item>
				<u-form-item v-show="form.hospital.value != ''" label="拜访科室" right-icon="arrow-right">
					<u-input disabled 
					v-model="form.department" 
					placeholder="请选择科室" 
					@click="toNextPage('/pages/visit/visitDep',form.hospital.value)"/>
				</u-form-item>
				<u-form-item label="拜访类型">
					<u-input v-model="form.type.label" disabled type="select" @click="type_show=true" placeholder="请选择拜访类型"/>
					<u-select v-model="type_show" :list="type_list" @confirm="handleSelect($event,'type')"></u-select>
				</u-form-item>
			</u-form>
			<u-calendar
			v-model="show" 
			mode="range" 
			@change="change"
			active-bg-color="#5870FE"
			range-color="#5870FE"
			></u-calendar>
			<u-button
			class="selected u-m-t-40 u-m-b-10" 
			type="primary" 
			shape="circle" 
			hover-class="none" @click="search">搜索</u-button>
		</view>
		<mescroll-body ref="mescrollRef" @init="mescrollInit" @down="downCallback" @up="upCallback" :up="upOption">
			<VisitWaterFall :check_list="list" :check_type="visit_check_type"></VisitWaterFall>
			<u-empty v-show="empty_tag"></u-empty>
		</mescroll-body>
	</view>
</template>
<script>
	import VisitWaterFall from '@/components/visit/VisitWaterFall.vue';
	import { serveHosList } from '@/api/hospital.js';
	import { visitList } from '@/api/visit.js';
	import MescrollMixin from "@/uni_modules/mescroll-uni/components/mescroll-uni/mescroll-mixins.js";
	export default {
		mixins: [MescrollMixin],
		data() {
			return {
				list:[],
				doctor_list:[],
				visit_check_type:'record_list',
				form:{
					check_in_start_at:'',
					check_in_end_at:'',
					check_out_start_at:'',
					check_out_end_at:'',
					hospital:{
						value:'',
						label:''
					},
					department:'',
					type:{
						value:'',
						label:''
					},
				},
				time_type:'',
				show:false,
				hos_show:false,
				type_show:false,
				type_list:[
					{
						value: 1,
						label: '面对面拜访'
					}, {
						value: 2,
						label: '线上拜访'
					}, {
						value: 3,
						label: '内部会议'
					}, {
						value: 4,
						label: '外部会议'
					}, {
						value: 5,
						label: '行政类工作'
					}
				],
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
			VisitWaterFall
		},
		onShow() {
			this.getList();
			this.init();
		},
		methods:{
			// 初始化数据
			init(){
				let { 
					check_in_start_at,
					check_in_end_at,
					check_out_start_at,
					check_out_end_at,
					hospital,
					departs,
					type
				} = this.visit_search_condition;
				this.form.check_in_start_at = check_in_start_at?check_in_start_at:'';
				this.form.check_in_end_at = check_in_end_at?check_in_end_at:'';
				this.form.check_out_start_at = check_out_start_at?check_out_start_at:'';
				this.form.check_out_end_at = check_out_end_at?check_out_end_at:'';
				this.form.department = (departs&&departs.length !== 0)?departs.map(item =>item.name).toString():'';
				this.form.hospital = hospital?hospital:{value:'',label:''};
				this.form.type = type?type:{value:'',label:''};
				
			},
			// 获取医生列表
			async getList(){
				let res = await serveHosList();
				if(res.data.list.length === 0){
					this.doctor_list = [];
				} else {
					this.doctor_list = res.data.list.map(item => {
						return {
							value:item.id,
							label:item.name
						}
					});
				}
			},
			async upCallback(page){
				let form = this.form;
				let { departs } = this.visit_search_condition;
				let office_id = (departs&&departs.length !== 0)?departs.map(item =>item.id):[];
				let current = page.num, limit = page.size;
				let params = {
					check_in_start_at:form.check_in_start_at,
					check_in_end_at:form.check_in_end_at,
					check_out_start_at:form.check_out_start_at,
					check_out_end_at:form.check_out_end_at,
					hospital_id:form.hospital.value?form.hospital.value:0,
					office_id,
					visit_type:form.type.value,
					// visit_type:form.value,
					current,
					limit
				}
				let res = await visitList(params);
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
				this.list = this.list.concat(list); //追加新数据
				this.mescroll.endBySize(cur_page_len, total_size);
				setTimeout(() => {
					this.mescroll.endSuccess(cur_page_len);
				}, 20);
			},
			// 时间
			showCalendar(type){
				this.show = true;
				this.time_type = type;
			},
			change(e){
				if(this.time_type == 'checkin'){
					this.form.check_in_start_at = e.startDate;
					this.form.check_in_end_at = e.endDate;
					this.$u.vuex('visit_search_condition.check_in_start_at',e.startDate);
					this.$u.vuex('visit_search_condition.check_in_end_at',e.startDate);
				} else if(this.time_type == 'checkout'){
					this.form.check_out_start_at = e.startDate;
					this.form.check_out_end_at = e.endDate;
					this.$u.vuex('visit_search_condition.check_out_start_at',e.startDate);
					this.$u.vuex('visit_search_condition.check_out_end_at',e.startDate);
				}
			},
			// 操作select选项
			handleSelect(e,type){
				let cur_arr = ['hospital','type'];
				let index = cur_arr.indexOf(type);
				// console.log(index)
				if(index !== -1){
					this.form[cur_arr[index]] = {...e[0]};
					this.$u.vuex(`visit_search_condition.${[cur_arr[index]]}`,e[0]);
				};
				if(type == 'hospital'){
					this.$u.vuex(`visit_search_condition.departs`,[]);
					this.form.department = '';
				};
			},
			search(){
				this.list = [];
				this.mescroll.resetUpScroll();
			},
			toNextPage(url,hospital_id){
				this.$Router.push({
					path:url,
					query:{
						hospital_id,
						type:'visit_record_search'
					}
				})
			}
			
		}
	}
</script>

<style lang="scss" scoped>
	@import '@/static/css/visit.scss';
.content{
	height: 100%;
	background-color: $color-f5;
	/* top: 0;
	left: 0;
	right: 0;
	bottom: 0; */
	.search_condition{
		background-color: $color-xf;
	}
	.u-btn{
		background-color: $color-31;
		line-height: 72rpx;
	}
	.u-calendar{
		.u-btn{
			background-color: $color-31;
			line-height: 72rpx;
		}
	}
}
</style>
