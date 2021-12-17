<template>
	<view class="content u-p-l-30 u-p-r-30">
		<u-form class="form" :model="form" ref="uForm" label-position="top">
			<u-form-item required label="拜访类型">
				<u-input v-model="form.type.label" disabled type="select" @click="type_show = true" placeholder="请选择拜访类型" />
				<u-select v-model="type_show" :list="type_list" @confirm="confirm"></u-select>
			</u-form-item>

			<!-- <u-form-item :required="form.type.value == '1'||form.type.value == '2'" label="拜访医院" right-icon="arrow-right">
				<u-input disabled v-model="form.hospital.name" placeholder="请选择医院" @click="toHospital()"/>
			</u-form-item> -->
			<!-- <u-form-item v-if="form.type.value == '1'||form.type.value == '2'" required label="拜访医院" right-icon="arrow-right">
				<u-input disabled v-model="form.hospital.name" placeholder="请选择医院" @click="toHospital()"/>
			</u-form-item>
			<u-form-item v-else label="拜访医院" right-icon="arrow-right">
				<u-input disabled v-model="form.hospital.name" placeholder="请选择医院" @click="toHospital()"/>
			</u-form-item> -->

			<u-form-item :required="[1, 2].indexOf(form.type.value) > -1" label="拜访医院" right-icon="arrow-right">
				<u-input disabled v-model="form.hospital.name" placeholder="请选择医院" @click="toHospital()" />
			</u-form-item>

			<u-form-item required label="拍照">
				<UploadCom @receiveImgList="getImgList" :pics_list="form.pics" :type="check_type"></UploadCom>
			</u-form-item>

			<u-form-item class="location u-rela" required label="所在位置">
				<u-input disabled v-model="form.position" placeholder="请选择定位打卡" />
				<view class="u-abso" @click="getCurLocation()">
					<u-icon class="u-m-r-12" name="map" color="#5870FE" size="36"></u-icon>
					获取地理位置
				</view>
			</u-form-item>
		</u-form>

		<view class="fix_bt_btn u-p-30"  :style="{zIndex:4}">
			<u-button class="selected" type="primary" shape="circle" @click="submit" hover-class="none">提交</u-button>
		</view>
		
		<!-- model -->
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
import LocationModel from '@/components/visit/LocationModel.vue';
import { location } from '@/api/common.js';
import { checkGeo, visitCheckConfig, checkin, checkEditDetail, checkinEdit, checkType } from '@/api/visit.js';
import * as qiniu from 'qiniu-js';

export default {
	data() {
		return {
			form: {
				type: {
					value: '',
					label: ''
				},
				hospital: {
					id: '',
					name: '',
					org_type: ''
				},
				pics: [],
				position: ''
			},
			type_show: false,
			type_list: [
				{
					value: 1,
					label: '面对面拜访'
				},
				{
					value: 2,
					label: '线上拜访'
				},
				{
					value: 3,
					label: '内部会议'
				},
				{
					value: 4,
					label: '外部会议'
				},
				{
					value: 5,
					label: '行政类工作'
				}
			],
			check_type: 'checkin',
			location_show: false,
			lat: '',
			lng: '',
			config_list: [],
			geo_opt: '',
			geo_comment: ''
		};
	},
	components: {
		UploadCom,
		LocationModel
	},
	onLoad() {},
	beforeRouteLeave(to, from, next) {
		if(to.BACKTYPE) {
		   next({
				// delta: 2,
				path:'/pages/visit/visit',
				NAVTYPE: 'back'
		   })
		} else {
		   next()
		}
	},
	// onBackPress(options) {
	// 	if (options.from === 'navigateBack') {  
	// 		return false;  
	// 	}  
	// 	uni.navigateBack({  
	// 		delta: 2  
	// 	});    
	// 	return true;  
	// }, 
	onShow() {
		let data = this.visit_checkin;
		if (this.$Route.query.id) {
			if (data.checkin_type && data.id == this.$Route.query.id) {
				this.init();
			} else {
				this.getDetail();
			}
		} else {
			if (data && data.id) {
				this.$u.vuex('visit_checkin', {});
			} else {
				this.init();
			}
		}
	},
	methods: {
		// 获取初始值
		init() {
			let { id, checkin_type, hospital, pics, position, lat, lng, geo_opt, geo_comment } = this.visit_checkin;
			this.form.type = checkin_type ? checkin_type : { value: '', label: '' };
			this.form.hospital = hospital
				? hospital
				: {
						id: '',
						name: '',
						org_type: ''
				  };
			this.form.pics = pics ? [...pics] : [];
			this.form.position = position ? position : '';
			this.lat = lat ? lat : '';
			this.lng = lng ? lng : '';
			this.geo_opt = geo_opt ? geo_opt : '';
			this.geo_comment = geo_comment ? geo_comment : '';
		},
		// 获取编辑详情
		async getDetail() {
			let query = this.$Route.query;
			let res = await checkEditDetail({
				id: query.id
			});
			let info = res.data.info;
			let info_keys = Object.keys(info);
			let vuex_keys = ['id', 'checkin_type', 'hospital', 'pics', 'position', 'lat', 'lng', 'geo_opt', 'geo_comment'];
			vuex_keys.forEach(item => {
				if (item == 'checkin_type') {
					let obj = checkType(info.visit_type);
					this.$u.vuex(`visit_checkin.checkin_type`, obj);
				}
				if (info_keys.indexOf(item) !== -1) {
					this.$u.vuex(`visit_checkin.${item}`, info[item]);
				}
				// if(item == 'hospital') {

				// this.form.hospital = info.hospital.name?info.hospital:{
				// 	name:'该条件下未曾选择拜访医院'
				// };
				// }
			});
			this.init();
		},
		confirm(e) {
			this.form.type = e[0];
			this.$u.vuex('visit_checkin.checkin_type', e[0]);
		},
		toHospital() {
			this.$Router.push({
				path: '/pages/visit/serveHospitals'
			});
		},
		// 照片开始
		getImgList(arr) {
			this.form.pics = [...arr];
			this.$u.vuex('visit_checkin.pics', this.form.pics);
		},
		// 照片结束
		// 获取地理位置
		getCurLocation() {
			uni.showLoading({
				title: '定位中'
			});

			// #ifdef H5
			// ==================== TODO h5 定位 ====================
			// #endif
			
			// APP获取地理位置
			// #ifdef APP-PLUS
				uni.getLocation({
					// type:'wgs84',
					type: "gcj02",
					geocode: true,
					success:async res => {
						this.lat = res.latitude;
						this.lng = res.longitude;
						this.$u.vuex('visit_checkin.lat',res.latitude);
						this.$u.vuex('visit_checkin.lng',res.longitude);
						Object.keys(res.address).forEach(item =>{
							this.form.position += res.address[item];
						})
						this.checkLocation(res.latitude,res.longitude,'gcj-02');
						this.$u.vuex('visit_checkin.position',this.form.position);
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
				});
			// #endif
		},
		// check地理位置
		async checkLocation(lat,lng,coordinate_type){
			let { checkin_type ,hospital } = this.visit_checkin;
			if(checkin_type.value == 1 || checkin_type.value == 2){
				let params = {
					hospital_id:hospital?hospital.id:0,
					lat,
					lng,
					coordinate_type
				};
				let geo_res = await checkGeo(params);
				if (geo_res.data.result == 0) {
					this.location_show = true;
					let visit_config = await visitCheckConfig({type:2});
					this.config_list = [...visit_config.data.config];
				}
			}
		},
		// 超范围打卡数据获取
		beyondLocation(id,con){
			this.location_show = !this.location_show;
			this.geo_opt = id;
			this.geo_comment = con;
		},
		// 提交
		async submit() {
			//
			let form = this.form;
			let { hospital,lat } = this.visit_checkin;
			let query = this.$Route.query;
			if (form.type.value == '') {
				this.$u.toast('请选择拜访类型');
				return;
			}
			if ((form.type.value == 1 || form.type.value == 2) && form.hospital.id == '') {
				this.$u.toast('请选择拜访医院');
				return;
			}
			if (form.pics.length === 0) {
				this.$u.toast('请上传照片');
				return;
			}
			if (form.position == '') {
				this.$u.toast('请获取地理位置');
				return;
			}
			let coordinate_type;
			// #ifdef H5
			coordinate_type = 'gps';
			// #endif
			// #ifdef APP-PLUS
			coordinate_type = 'gcj-02';
			// #endif
			let pics = this.form.pics.map(item => {
				return Number(item.id);
			});
			let params = {
				visit_type: form.type.value,
				hospital_id: hospital ? hospital.id : 0,
				pics,
				lat: this.lat,
				lng: this.lng,
				coordinate_type,
				position: this.form.position,
				geo_opt: this.geo_opt,
				geo_comment: this.geo_comment
			};
			let res ;
			if(query.id){
				res = await checkinEdit(query.id,params);
			} else {
				res = await checkin(params);
			}
			if (res.errcode == 0) {
				let _this = this;
				_this.$u.toast('操作成功');
				_this.$u.vuex('visit_checkin', {});
				setTimeout(function() {
					_this.$Router.push({
						path: '/pages/visit/visit'
					});
				}, 1000);
			}
		}
	}
};
</script>
<style lang="scss" scoped>
@import '@/static/css/visit.scss';
</style>
