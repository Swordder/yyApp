<template>
	<view class="content u-p-l-30 u-p-r-30">
		<u-form class="form" :model="form" ref="uForm" label-position="top">
			<u-form-item label="拜访类型">
				<u-input v-model="form.type.label" disabled placeholder="请选择拜访类型"/>
			</u-form-item>
			<u-form-item label="拜访医院">
				<u-input disabled v-model="form.hospital.name" placeholder=""/>
			</u-form-item>
			<u-form-item v-show="form.hospital.org_type == 1" required label="拜访科室" right-icon="arrow-right">
				<u-input disabled 
				v-model="form.department" 
				placeholder="请选择科室" 
				@click="toNextPage('/pages/visit/visitDep',form.hospital.id,'dep')"/>
			</u-form-item>
			<u-form-item v-show="form.hospital.org_type == 1" label="拜访医生" right-icon="arrow-right">
				<u-input disabled 
				v-model="form.doctor" 
				placeholder="请选择医生" 
				@click="toNextPage('/pages/visit/visitDocList',form.hospital.id,'doc')"/>
			</u-form-item>
			<u-form-item 
			:required="form.type.value == 1||form.type.value == 2||form.type.value == 4" 
			label="沟通产品" right-icon="arrow-right">
				<u-input disabled v-model="form.product" @click="prod_show = true" placeholder="请选择产品"/>
				<!-- <u-select v-model="prod_show" :list="prod_list" @confirm="selectProd"></u-select> -->
			</u-form-item>
			<u-form-item 
			:required="form.type.value == 1||form.type.value == 2||form.type.value == 4" 
			label="拜访结果">
				<u-input type="textarea" v-model="form.result" @input="saveData('result')"/>
			</u-form-item>
			<u-form-item
			:required="form.type.value == 1||form.type.value == 2" 
			label="后续计划">
				<u-input type="textarea" v-model="form.next" @input="saveData('next')"/>
			</u-form-item>
			<u-form-item required label="拍照">
				<UploadCom @receiveImgList="getImgList" :pics_list="form.pics" :type="check_type"></UploadCom>
			</u-form-item>
			<u-form-item class="location u-rela" required label="所在位置">
				<u-input disabled v-model="form.position" placeholder="请选择定位打卡"/>
				<view class="u-abso" @click="getCurLocation()">
					<u-icon class="u-m-r-12" name="map" color="#5870FE" size="36"></u-icon>
					获取地理位置
				</view>
			</u-form-item>
		</u-form>
		<view class="fix_bt_btn u-p-30" :style="{zIndex:4}">
			<u-button 
			class="selected" 
			type="primary" 
			shape="circle" 
			hover-class="none" @click="submit">{{this.$Route.query.type=="checkout_edit"?'签出修改':'签出'}}</u-button>
		</view>
		<!-- model -->
		<!-- 产品 -->
		<u-modal
		v-model="prod_show" title="选择药品"
		:mask-close-able="true"
		show-cancel-button :confirm-style="{color:'#5870FE'}"
		:content-style="{fontSize:'28rpx',color:'#747474'}"
		@confirm="confirmModel">
			<view class="slot-content u-p-40">
				<view 
				v-for="(item,index) in prod_list" :key="item.id" 
				class="u-flex u-m-b-16"
				@click="selectProd(item)">
					<template>
						<text v-if="select_ids.indexOf(item.id) == -1" class="custom-icon u-m-r-30">&#xe69c;</text>
						<text v-else class="custom-icon u-m-r-30" :style="{color:'#5870FE'}">&#xe620;</text>
					</template>
					<view class="">
						{{item.name}}
					</view>
				</view>
			</view>
		</u-modal>
		<LocationModel
		:geo_obj="{
			location_show,
		}"
		:type="check_type"
		:list="config_list" 
		@getData="beyondLocation"
		></LocationModel>
	</view>
</template>
<script>
import UploadCom from '@/components/visit/UploadCom.vue';
import { checkGeo,visitCheckConfig,checkOutInfo,checkEditDetail,checkType,checkOut,checkOutEdit } from '@/api/visit.js';
import { serveSeries } from '@/api/common.js';
import LocationModel from '@/components/visit/LocationModel.vue';
export default {
	data() {
		return {
			form: {
				type: {
					value:'',
					label:''
				},
				hospital: {
					id:'',
					name:'',
					org_type:''
				},
				pics:[],
				department:'',
				doctor:'',
				product:'',
				result:'',
				next:'',
				position: '',
			},
			check_type:'checkout',
			type_show:false,
			prod_show:false,
			select_list:[],
			select_ids:[],
			prod_list:[],
			location_show:false,
			lat:'',
			lng:'',
			config_list:[],
			geo_opt:'',
			geo_comment:''
		};
	},
	components:{
		UploadCom,
		LocationModel
	},
	// beforeRouteLeave(to, from, next) {
	// 	console.log(to)
	// 	if(to.BACKTYPE) {
	// 	   next({
	// 			// delta: 2,
	// 			path:'/pages/visit/visit',
	// 			NAVTYPE: 'back'
	// 	   })
	// 	} else {
	// 	   next()
	// 	}
	// },
	onShow() {
		let data = this.visit_checkout;
		let query = this.$Route.query;
		if(query.type){
			// 判断是新增还是编辑后，判断是否再次调用接口
			if(query.type == 'checkout_edit'){
				if(query.id == data.id){
					this.init()
				} else {
					this.getDetail();
				}
			} else if(query.type == 'checkout_add'){
				if(query.id == data.id){
					this.init()
				} else {
					this.$u.vuex('visit_checkout',{});
					this.getInfo();
				}
			};
		}
		this.getProdList();
	},
	methods:{
		//获取详情
		async getDetail(){
			let query = this.$Route.query;
			let res = await checkEditDetail({id:query.id});
			let info = res.data.info;
			let info_keys = Object.keys(info);
			let vuex_keys = [
				'id','checkout_type','hospital', 
				'departs','doctors','series_ids',
				'result','next','pics', 'position',
				'lat','lng','geo_opt','geo_comment'
			];
			vuex_keys.forEach(item => {
				if(item == 'checkout_type') {
					let obj = checkType(info.visit_type);
					this.$u.vuex(`visit_checkout.checkout_type`,obj)
				}
				if(info_keys.indexOf(item) !== -1){
					this.$u.vuex(`visit_checkout.${item}`,info[item])
				}
				
			})
			this.init()
		},
		async getInfo(){
			let res = await checkOutInfo({
				id:this.$Route.query.id
			});
			let info = res.data.info;
			let type = checkType(info.visit_type);
			let hospital = info.hospital.name?info.hospital:{
				name:'该条件下未曾选择拜访医院'
			}
			// 临时用
			this.$u.vuex('visit_checkout.id',info.id);
			this.$u.vuex('visit_checkout.checkout_type',type);
			this.$u.vuex('visit_checkout.hospital',hospital);
			this.init()
		},
		// 初始化数据
		init(){
			let { id,checkout_type,hospital,departs,doctors,series_ids,result,next,pics,position,lat,lng,geo_opt,geo_comment } = this.visit_checkout;
			this.form.type = checkout_type;
			this.form.hospital = hospital;
			this.form.department = departs&&departs.length !== 0?departs.map(item => item.name).toString():'';
			this.form.doctor = doctors&&doctors.length !== 0?doctors.map(item => item.name).toString():'';
			this.form.product = series_ids&&series_ids.length !== 0?series_ids.map(item => item.name).toString():'';
			this.form.result = result?result:'';
			this.form.next = next?next:'';
			this.form.pics = pics?[...pics]:[];
			this.form.position = position?position:'';
			this.lat = lat?lat:'';
			this.lng = lng?lng:'';
			this.geo_opt = geo_opt?geo_opt:'';
			this.geo_comment = geo_comment?geo_comment:'';
		},
		// 照片开始
		getImgList(arr){
			this.form.pics = [...arr];
			this.$u.vuex('visit_checkout.pics',this.form.pics);
		},
		// 照片结束
		// 获取地理位置
		getCurLocation() {
			
			uni.showLoading({
			    title: '定位中'
			});
			
			// #ifdef H5
			
			// #endif
			// APP获取地理位置
			// #ifdef APP-PLUS
				uni.getLocation({
					// type:'wgs84',
					type: "gcj02",
					geocode: true,
					success: res => {
						this.lat = res.latitude;
						this.lng = res.longitude;
						Object.keys(res.address).forEach(item =>{
							this.form.position += res.address[item];
						})
						this.$u.vuex('visit_checkout.lat',res.latitude);
						this.$u.vuex('visit_checkout.lng',res.longitude);
						this.checkLocation(res.latitude,res.longitude,'gcj-02');
						this.$u.vuex('visit_checkout.position',this.form.position);
					},
					fail: res => {
						console.log('fail')
					},
					complete: res => {
						uni.hideLoading()
						
						if(res.errMsg == 'getLocation:ok') {
							this.$u.toast('定位成功!');
						} else {
							this.$u.toast('定位失败!');
						}
						
					}
				})
			// #endif
		},
		// check地理位置
		async checkLocation(lat,lng,coordinate_type){
			let { checkout_type ,hospital } = this.visit_checkout;
			if(checkout_type.value == 1 || checkout_type.value == 2){
				let params = {
					hospital_id:hospital?hospital.id:0,
					lat,
					lng,
					coordinate_type
				}
				let geo_res = await checkGeo(params);
				if(geo_res.data.result == 0){
					this.location_show = true;
					let visit_config = await visitCheckConfig({type:2});
					this.config_list = [...visit_config.data.config];
				}
			};
		},
		// 超范围打卡数据获取
		beyondLocation(id,con){
			this.location_show = !this.location_show;
			this.geo_opt = id;
			this.geo_comment = con;
		},
		// 获取药品列表
		async getProdList(){
			let res = await serveSeries();
			this.prod_list = res.data.list;
		},
		selectProd(data){
			let num = 0;
			let len = this.select_list.length;
			if(len === 0){
				this.select_list.push(data)
			} else {
				this.select_list.forEach((item,index) => {
					if(item.id == data.id){
						this.select_list.splice(index,1)
					} else {
						num++
					}
					if(num == len){
						this.select_list.push(data)
					}
				})
			};
			this.select_ids = this.select_list.length !== 0?this.select_list.map(item => {
				return item.id
			}):[];
			this.form.product = this.select_list.length !== 0?this.select_list.map(item => item.name).toString():'';
			this.$u.vuex('visit_checkout.series_ids',[...this.select_list]);
		},
		confirmModel(){
			this.prod_show = false;
		},
		// 将输入数据写入vuex
		saveData(type){
			if(type === 'result'){
				this.$u.vuex('visit_checkout.result',this.form.result);
			} else if(type === 'next'){
				this.$u.vuex('visit_checkout.next',this.form.next);
			} 
		},
		// 提交数据
		async submit(){
			let form = this.form;
			let query = this.$Route.query;
			let { id,departs,doctors,series_ids,pics,lat } = this.visit_checkout;
			let depart_ids = departs?departs.map(item => item.id):[];
			let doctor_ids = doctors?doctors.map(item => item.id):[];
			let series_id = series_ids?series_ids.map(item => item.id):[];
			let pics_ids = pics?pics.map(item => item.id):[];
			let coordinate_type;
			// 判断
			if(form.hospital.org_type == 1&&form.department === ''){
				this.$u.toast('请选择拜访科室');
				return
			};
			if(form.type.value == 1||form.type.value == 2||form.type.value == 4){
				if(form.product == ''){
					this.$u.toast('请选择沟通产品');
					return	
				};
				if(form.result == ''){
					this.$u.toast('请输入拜访结果');
					return	
				}
			};
			if((form.type.value == 1||form.type.value == 2)&&form.next == ''){
				this.$u.toast('请输入后续计划');
				return
			};
			if(form.pics.length === 0){
				this.$u.toast('请上传照片');
				return
			};
			if(form.position == ''||this.lat == ''){
				this.$u.toast('请获取定位');
				return
			};
			// #ifdef H5
			coordinate_type = 'gps';
			// #endif
			// #ifdef APP-PLUS
			coordinate_type = 'gcj-02';
			// #endif
			// lat:31.231706,lng:121.472644,
			let params = {
				check_in_id: this.$Route.query.id,
				hospital_id: form.hospital.id?form.hospital.id:0,
				visit_type: form.type.value,
				depart_ids,
				doctor_ids,
				series_ids: series_id,
				result: form.result,
				next: form.next,
				pics: pics_ids,
				lat: this.lat,
				lng: this.lng,
				coordinate_type,
				position: form.position,
				geo_opt: this.geo_opt,
				geo_comment: this.geo_comment
			};
			let res;
			if(query.type == 'checkout_edit'){
				res = await checkOutEdit(id,params);
			} else if (query.type == 'checkout_add'){
				res = await checkOut(params);
			}
			if(res.errcode != 0){
				this.$u.toast(res.errmsg)
				return
			}
			this.$Router.back()
			this.$u.vuex('visit_checkout',{})
		},
		toNextPage(url,hospital_id,to){
			this.$Router.push({
				path:url,
				query:{
					hospital_id,
					// to,
					// type:'visit'
				}
			})
		}
	}
};
</script>
<style lang="scss" scoped>
@import '@/static/css/visit.scss';
.content{
	padding-bottom: 140rpx;
}
</style>
