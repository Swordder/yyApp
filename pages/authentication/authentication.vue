<template>
	<view class="content u-p-l-30 u-p-r-30">
		<u-toast ref="uToast" />
		<u-form :model="form_data" ref="uForm">
			<u-form-item class="u-p-t-10 u-p-b-10" label-width="240" label="真实姓名" :required="true">
				<u-input v-model.trim="form_data.name" maxlength="10" placeholder="请输入姓名" @input="saveData('name')" />
			</u-form-item>
			<u-form-item class="u-p-t-10 u-p-b-10" 
			label-width="240" label="曾服务的医院" 
			right-icon="arrow-right">
				<u-input @click="toNextPage('/pages/authentication/everServeHos')" v-model="form_data.hospital" disabled placeholder="请选择曾服务的医院"/>
			</u-form-item>
			<u-form-item class="u-p-t-10 u-p-b-10" label-width="240" label="可服务的城市" :required="true">
				<u-input v-model="form_data.city" type="select" @click="show = true" placeholder="请选择城市"/>
				<u-select v-model="show" :list="city_list" @confirm="confirm"></u-select>
			</u-form-item>
			<u-form-item class="u-p-t-10 u-p-b-10" label-width="240" label="服务公司" :required="true" right-icon="arrow-right">
				<u-input @click="toNextPage('/pages/authentication/company',1)" v-model="form_data.serve_company.name" disabled placeholder="请选择服务公司"/>
			</u-form-item>
			<u-form-item v-show="form_data.serve_company.id == '13'" class="u-p-t-10 u-p-b-10" label-width="240" label="公司名称" :required="true">
				<u-input v-model="form_data.other_company_name"  placeholder="请输入公司名称" @input="saveData('other_com_name')"/>
			</u-form-item>
			<u-form-item class="u-p-t-10 u-p-b-10" label-width="240" label="医药推广年限" :required="true">
				<u-input v-model="form_data.work_year" @input="saveData('work_year')" placeholder="请输入推广年限"/>
			</u-form-item>
			<u-form-item class="u-p-t-10 u-p-b-10" label-width="240" label="近期服务的公司" right-icon="arrow-right">
				<u-input @click="toNextPage('/pages/authentication/serviceCompany')" v-model="form_data.company" disabled placeholder="点击填写详细信息"/>
			</u-form-item>
			<u-form-item class="u-p-t-10 u-p-b-10" label-width="240" label="熟悉的科室" :required="true" right-icon="arrow-right">
				<u-input @click="toNextPage('/pages/authentication/departments','auth')" v-model="form_data.department" disabled placeholder="点击选择科室"/>
			</u-form-item>
			<u-form-item class="u-p-t-10 u-p-b-10" label-width="240" label-position="top" label="您擅长的服务方向">
				<u-checkbox-group @change="checkboxGroupChange" :wrap="true">
					<u-checkbox 
					class="u-p-b-28" 
					v-model="item.checked" 
					shape="circle" 
					v-for="(item, index) in checkboxList" 
					:key="index" :name="item.name"
					>
						{{ item.name }}
					</u-checkbox>
				</u-checkbox-group>
			</u-form-item>
		</u-form>
		<u-button class="u-m-t-60" @click="submit()" hover-class="none" shape="circle" type="primary">提交</u-button>
	</view>
</template>
<script>
	import { getProvince } from '@/api/common.js';
	import { userVerify } from '@/api/auth.js';
	export default {
		data() {
			return {
				form_data: {
					name: '',
					hospital: '',
					city: '',
					serve_company:{
						id:'',
						name:''
					},
					other_company_name:'',
					work_year:'',
					company:'',
					department:'',
					direction:''
				},
				show:false,
				city_list: [],
				checkboxList: [
					{
						name: '医院列名服务',
						checked: false,
						disabled: false
					},
					{
						name: '学术营销服务',
						checked: false,
						disabled: false
					}
				],
				radio: '',
				submit_params:{}
			};
		},
		onLoad() {
			// this.$u.vuex('auth_data',{})
			this.getProvinces();
		},
		onShow(){
			this.initForm();
		},
		onReady() {
		},
		methods:{
			// 初始化或者处理表单数据
			initForm(){
				let keys = Object.keys(this.auth_data);
				if(keys.length === 0) return;
				let auth_data = {...this.auth_data};
				//处理成展示所需要的格式
				this.form_data.name = auth_data.name?auth_data.name:'';
				// 医院
				this.form_data.hospital = keys.indexOf('hos_list') != -1?auth_data.hos_list.map(item => {
					return item.name
				}).toString():'';
				this.form_data.city = auth_data.province?auth_data.province.label:'';
				this.form_data.serve_company = auth_data.serve_company?auth_data.serve_company:{id:'',name:''};
				this.form_data.other_company_name = auth_data.other_com_name?auth_data.other_com_name:'';
				this.form_data.work_year = auth_data.work_year?auth_data.work_year:'';
				this.form_data.company = keys.indexOf('ever_serve_com') != -1?`已经填写${auth_data.ever_serve_com.length}家公司`:'';
				// 科室
				this.form_data.department = keys.indexOf('departments') != -1?auth_data.departments.map(item => {
					return item.name
				}).toString():'';
				// 服务方向
				if(keys.indexOf('direction') != -1){
					if(auth_data.direction == 3){
						this.checkboxList.map(val => {
							val.checked = true;
						})
					} else if(auth_data.direction == 1){
						this.checkboxList.map(val => {
							if(val.name == '医院列名服务'){
								val.checked = true;
							}
						})
					} else if(auth_data.direction == 2){
						if(val.name == '学术营销服务'){
							val.checked = true;
						}
					}
				}
			},
			// 获取城市
			async getProvinces(){
				let res = await getProvince();
				res.data.list.map(item => {
					this.city_list.push({
						value:item.id,
						label:item.name
					})
				})
			},
			// 选择城市
			confirm(e){
				this.form_data.city = e[0].label;
				this.$u.vuex('auth_data.province',e[0]);
				this.initForm()
			},
			// 将输入数据写入vuex
			saveData(type){
				if(type === 'name'){
					this.$u.vuex('auth_data.name',this.form_data.name);
				} else if(type === 'other_com_name'){
					this.$u.vuex('auth_data.other_com_name',this.form_data.other_company_name);
				} else if(type === 'work_year'){
					this.$u.vuex('auth_data.work_year',this.form_data.work_year);
				}
			},
			// 选择医院的服务方向
			checkboxGroupChange(e){
				if(e.length === 2){
					this.$u.vuex('auth_data.direction',3);
				} else if(e.length == 1){
					if(e.toString() == '医院列名服务'){
						this.$u.vuex('auth_data.direction',1);
					} else {
						this.$u.vuex('auth_data.direction',2);
					}
				} else {
					this.$u.vuex('auth_data.direction','');
				}
			},
			async submit(){
				// 处理提交数据
				let keys = Object.keys(this.auth_data);
				if(keys.length === 0) {
					this.$refs.uToast.show({
						title: '请填写必要数据',
						type: 'error',
					})
					return
				};
				let auth_data = {...this.auth_data};
				// 姓名
				if(!auth_data.name){
					this.$refs.uToast.show({
						title: '请输入姓名',
						type: 'error',
					})
					return 
				}
				this.submit_params.name = auth_data.name;
				// 曾服务的医院
				if(keys.indexOf('hos_list') != -1){
					this.submit_params.hospital_ids = auth_data.hos_list.length!== 0? auth_data.hos_list.map(item => {
						return item.id
					}):[]
				};
				// 可服务的城市
				if(!auth_data.province){
					this.$refs.uToast.show({
						title: '请选择城市',
						type: 'error',
					})
					return 
				}
				this.submit_params.province_id = auth_data.province.value;
				// 服务的公司
				if(!auth_data.serve_company){
					this.$refs.uToast.show({
						title: '请选择曾服务的公司',
						type: 'error',
					})
					return 
				}
				this.submit_params.company_id = auth_data.serve_company.id;
				if(this.submit_params.company_id == 13 && !auth_data.other_com_name){
					this.$refs.uToast.show({
						title: '请输入公司名称',
						type: 'error',
					})
					return 
				}
				this.submit_params.other_company_name = auth_data.other_company_name;
				// 公司服务年限
				if(!auth_data.work_year){
					this.$refs.uToast.show({
						title: '请输入医院推广年限',
						type: 'error',
					})
					return 
				}
				this.submit_params.working_age = auth_data.work_year;
				// 近期服务的公司
				if(keys.indexOf('ever_serve_com') != -1){
					let obj = {};
					this.submit_params.serve_company = auth_data.ever_serve_com.length !== 0?auth_data.ever_serve_com.map(item => {
						obj.company_id = item.company.id;
						obj.field_id = item.territory.length !== 0?item.territory.map(item2 => {
							return item2.id
						}):[];
						obj.adaption_id = item.indications.length !== 0?item.indications.map(item3 => {
							return item3.id
						}):[];
						obj.product_name = item.drug;
						return obj
					}):[]
				};
				// 科室
				if(!auth_data.departments){
					this.$refs.uToast.show({
						title: '请选择科室',
						type: 'error',
					})
					return 
				};
				this.submit_params.department_ids = auth_data.departments.length!== 0? auth_data.departments.map(item => {
					return item.id
				}):[]
				// 服务方向
				this.submit_params.direction = auth_data.direction?auth_data.direction:'';
				let params = this.submit_params;
				let res = await userVerify(params);
				if(res.errcode == 0){
					this.$u.toast('申请成功')
				}
				this.$u.vuex('auth_data',{})
				let _this = this;
				setTimeout(function(){
					if(_this.$Route.query.replacePath){
						_this.$Router.push({
							path:replacePath
						})
					} else {
						_this.$Router.pushTab({
							path:'/pages/index/index'
						})	
					}
					// _this.$Router.pushTab('/pages/mine/mine');	
				},1000)
			},
			toNextPage(url,type){
				if(type){
					this.$Router.push({
						path:url,
						query:{
							'type':type
						}
					})
				} else {
					this.$Router.push({
						path:url
					})	
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
.uni-input-input{
	color: $color-31;
}
</style>
