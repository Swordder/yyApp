<template>
	<view class="content u-p-l-30 u-p-r-30">
		<u-form class="form" label-width="140" :model="form" ref="uForm">
			<u-form-item label="姓名" :required="true">
				<u-input v-model="form.name" @input="saveValue('name')" placeholder="请输入姓名"/>
			</u-form-item>
			<u-form-item label="性别">
				<u-input disabled v-model="form.sex.label" @click="sex_show=true" type="select" placeholder="请选择性别"/>
				<u-select v-model="sex_show" :list="sex_list" @confirm="handleSelect($event,'sex')"></u-select>
			</u-form-item>
			<u-form-item label="联系电话" :required="true">
				<u-input v-model="form.mobile" type="number" @input="saveValue('mobile')" placeholder="请输入手机号"/>
			</u-form-item>
			<u-form-item label="所在医院">
				<u-input v-model="form.hospital.name" disabled/>
			</u-form-item>
			<u-form-item required label="所在科室" right-icon="arrow-right">
				<u-input disabled 
				v-model="form.department" 
				required
				placeholder="请选择科室" 
				@click="toNextPage('/pages/authentication/departments')"/>
			</u-form-item>
			<u-form-item label="级别">
				<u-input disabled 
				type="select"
				v-model="form.position.label" 
				@click="position_show = true" 
				placeholder="请选择级别"/>
				<u-select v-model="position_show" :list="positions" @confirm="handleSelect($event,'position')"></u-select>
			</u-form-item>
			<u-form-item label="职称">
				<u-input disabled type="select" v-model="form.job.label" @click="job_show = true" placeholder="请选择产品"/>
				<u-select v-model="job_show" :list="jobs" @confirm="handleSelect($event,'job')"></u-select>
			</u-form-item>
			<u-form-item label="擅长领域" right-icon="arrow-right">
				<u-input disabled 
				v-model="form.territory" 
				placeholder="请选择擅长领域" 
				@click="toNextPage('/pages/authentication/territory')"/>
			</u-form-item>
			<u-form-item label="门诊情况" right-icon="arrow-right">
				<u-input 
				v-model="form.clinic" 
				@click="show=true" disabled placeholder="请选择"/>
			</u-form-item>
		</u-form>
		<view class="fix_bt_btn u-p-30">
			<u-button 
			class="selected" 
			type="primary" 
			shape="circle" 
			hover-class="none" @click="submint()">{{this.$Route.query.doctor_id?'修改医生':'新增医生'}}</u-button>
		</view>
		<!-- model -->
		<u-modal 
		v-model="show" :show-title="false" :async-close="true"
		:mask-close-able="true"
		show-cancel-button :confirm-style="{color:'#5870FE'}"
		:content-style="{fontSize:'28rpx',color:'#747474'}"
		@cancel="cancelClin"
		@confirm="confirmClin">
			<view class="slot-content u-m-t-20">
				<u-tabs 
				:list="model_tabs" 
				:is-scroll="false" 
				:show-bar="false" 
				:current="current" 
				:active-item-style="{color:'#5870FE'}"
				@change="change"></u-tabs>
				<view class="u-p-30 u-border-top u-flex u-col-top" :style="{height:'260rpx'}">
					<view class="u-flex-1 u-border-right" :style="{overflowY: 'scroll',height:'100%',padding:'0 30rpx'}">
						<view class="u-m-b-20" 
						:class="{active:item == week_str}"
						:style="{lineHeight:'48rpx'}" 
						v-for="(item,index) in week_list" 
						:key="index"
						@click="selectClin(item,'week')">
							{{item}}
						</view>
					</view>
					<view class="u-flex-1" :style="{overflowY: 'scroll',height:'100%',padding:'0 30rpx'}">
						<view class="u-m-b-20" 
						:class="{active:item == day_str}"
						:style="{lineHeight:'48rpx'}" 
						v-for="(item,index) in day_list" 
						:key="index"
						@click="selectClin(item,'day')">
							{{item}}
						</view>	
					</view>
				</view>
			</view>
		</u-modal>
	</view>
</template>
<script>
	import { serveDoctor } from '@/api/common.js';
	import { operateDocInfo } from '@/api/visit.js';
	export default {
		data() {
			return {
				form:{
					name:'',
					sex:{
						value:'',
						label:''
					},
					mobile:'',
					hospital:{
						id:'',
						name:'',
						org_type:''
					},
					department:'',
					position:{
						value:'',
						label:''
					},
					job:{
						value:'',
						label:''
					},
					territory:'',
					clinic:''
				},
				sex_list:[
					{
						value:1,
						label:'男'
					},
					{
						value:2,
						label:'女'
					}
				],
				model_tabs:[
					{
						name: '专家',
					}, {
						name: '普通',
					}
				],
				current:0,
				tabs_id:1,
				week_list:['周一','周二','周三','周四','周五','周六','周日'],
				week_str:'',
				day_list:['上午','下午','夜班'],
				day_str:'',
				show:false,
				sex_show:false,
				position_show:false,
				job_show:false,
				clinic_type:1,
				// clinic_type:{
				// 	id:'',
				// 	value:''
				// },
				clinic_rota:''
			}
		},
		onShow() {
			if(this.$Route.query.doctor_id){
				this.getDetial();
			} else {
				this.init()
			}
			
		},
		methods: {
			// 获取详情
			async getDetial(){
				let query = this.$Route.query;
				let res = await operateDocInfo('detail',{id:query.doctor_id});
				let info = res.data.info;
				this.$u.vuex('doctor_info.name',info.name);
				this.$u.vuex('doctor_info.sex',{value:info.sex,label:info.sex==1?'男':'女'});
				this.$u.vuex('doctor_info.hospital',info.hospital);
				this.$u.vuex('doctor_info.mobile',info.mobile);
				this.$u.vuex('doctor_info.departs',[info.depart]);
				this.$u.vuex('doctor_info.position',{value:'',label:info.position});
				this.$u.vuex('doctor_info.job',{value:'',label:info.job_title});
				this.$u.vuex('doctor_info.territory',[info.field]);
				this.$u.vuex('doctor_info.clinic_type',info.clinic_type);
				// 门诊情况
				this.splitClin(info.clinic_rota);
				this.$u.vuex('doctor_info.clinic_rota',`${this.week_str}${this.day_str}`);
				this.init();
			},
			// 分割门诊时间
			splitClin(clinic_rota){
				let week_arr = ['周一','周二','周三','周四','周五','周六','周日'];
				week_arr.map(item => {
					if(clinic_rota.indexOf(item) !== -1){
						this.week_str = item;
						this.day_str = clinic_rota.split(item)[1];
					}
				})
			},
			// 初始化数据
			init(){
				let doctor_info = this.doctor_info;
				let {name,sex,hospital,mobile,departs,position,job,territory,clinic_type,clinic_rota} = doctor_info;
				// let init_arr = [ 'name','sex','hospital','mobile','departs','position','job','territory','clinic_type','clinic_rota'];
				this.form.name = name?name:'';
				this.form.sex = sex?sex:{value:'',label:''};
				this.form.mobile = mobile?mobile:'';
				// 医院
				if(hospital){
					this.form.hospital = hospital;
				} else {
					if(this.visit_checkout.hospital){
						this.$u.vuex('doctor_info.hospital',this.visit_checkout.hospital);
						this.form.hospital = this.visit_checkout.hospital;
					} else {
						this.form.hospital = {id:'',name:'',org_type:''}
					}
				}
				this.form.department = departs&&departs.length !== 0?departs.map(item => item.name).toString():'';
				this.form.position = position?position:{value:'',label:''};
				this.form.job = job?job:{value:'',label:''};
				this.form.territory = territory&&territory.length !== 0?territory.map(item => item.name).toString():'';
				if(clinic_type&&clinic_type == 1){
					this.splitClin(clinic_rota);
					this.form.clinic = '专家'+clinic_rota;
				} else if(clinic_type&&clinic_type == 2){
					this.splitClin(clinic_rota);
					this.form.clinic = '普通'+clinic_rota;
				} else {
					this.form.clinic = '';
				}
			},
			saveValue(type){
				if(type == 'name'){
					this.$u.vuex('doctor_info.name',this.form.name);
				} else if(type == 'mobile'){
					this.$u.vuex('doctor_info.mobile',this.form.mobile)
				}
			},
			// select选择
			handleSelect(e,type){
				let cur_arr = ['sex','position','job'];
				let index = cur_arr.indexOf(type);
				if(index !== -1){
					this.form[cur_arr[index]] = {...e[0]};
					this.$u.vuex(`doctor_info.${[cur_arr[index]]}`,e[0]);
				}
			},
			// 门诊选择
			change(index){
				this.current = index;
				index == 0?this.clinic_type = 1:this.clinic_type = 2;
				// index == 0?this.tabs_id = 1:this.tabs_id = 2;
				this.week_str = '';
				this.day_str = '';
			},
			toNextPage(path){
				this.$Router.push({
					path,
					query:{
						type :'doctor'
					}
				})
			},
			// 门诊选择
			selectClin(data,type){
				if(type == 'week'){
					this.week_str = data
				} else if(type == 'day') {
					this.day_str = data
				};
			},
			cancelClin(){
				this.week_str = '';
				this.day_str = "";
				this.current = 0;
			},
			confirmClin(){
				if(this.week_str == ''||this.day_str == ''){
					this.$u.toast('请选择门诊状态');
					return
				};
				let clinic_type_str = this.clinic_type == 1?'专家':'普通';
				this.form.clinic = clinic_type_str+this.week_str+this.day_str;
				this.$u.vuex('doctor_info.clinic_type',this.clinic_type);
				this.$u.vuex('doctor_info.clinic_rota',`${this.week_str}${this.day_str}`);
				this.show = false;
			},
			async submint(){
				let query = this.$Route.query;
				let doctor_info = this.doctor_info;
				let { departs,territory } = doctor_info;
				let form = this.form;
				let regNum = /^1[0-9]{10}$/;
				if(form.name == ''||form.mobile == ''||form.department == ''){
					this.$u.toast('请填入必填项')
					return
				};
				if(!regNum.test(form.mobile)){
					this.$u.toast('手机格式不正确')
					return
				};
				let depart_id = departs&&departs.length !== 0?departs.map(item => item.id).toString():'';
				let field_id = territory&&territory.length !== 0?territory.map(item => item.id).toString():'';
				
				let params = {
					name:form.name ,
					sex: form.sex.value,
					mobile: form.mobile,
					position: form.position.label,
					job_title: form.job.label,
					field_id,
					hospital_id: form.hospital.id,
					depart_id,
					clinic_type: this.clinic_type.id,
					clinic_rota: this.week_str+this.day_str
				};
				if(query.type == 'add'){
					let res = await serveDoctor(params);	
				} else if(query.type == 'edit'){
					let res = await operateDocInfo('update',params,query.doctor_id);
				};
				this.$u.vuex('doctor_info',{})
				this.$Router.back();
			}
			
		}
	}
</script>

<style lang="scss" scoped>
// @import '@/static/css/visit.scss';
.u-form-item{
	padding: 8rpx 0;
}
.active{
	color: $color-31;
	border-bottom: 2rpx solid $color-31;
}
</style>
