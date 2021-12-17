<template>
	<view class="page-wrap">
		<u-cell-group :border="false">
			<u-cell-item class="cell-item" title="头像" :arrow="false">
				<!-- <yq-avatar
					slot="right-icon"
					ref="avatarEdit"
					selWidth="500upx"
					selHeight="500upx"
					:avatarSrc="doctorInfo.headimgurl"
					avatarStyle="width: 80upx; height: 80upx; border-radius: 50%;background: #e4e4e4;"
				></yq-avatar> -->
				<u-avatar :src="doctorInfo.headimgurl" size="80"></u-avatar>
			</u-cell-item>
			<u-cell-item class="cell-item" title="微信昵称" :arrow="false">
				<view slot="right-icon">{{ doctorInfo.nickname }}</view>
			</u-cell-item>
			<u-cell-item class="cell-item" title="真实姓名" @click="showDialog('name')">
				<view slot="right-icon">{{ doctorInfo.true_name }}</view>
			</u-cell-item>
			<u-cell-item class="cell-item" title="性别" @click="showSelect('genders')">
				<view slot="right-icon">{{ (doctorInfo.gender && genders[doctorInfo.gender-1]) ? genders[doctorInfo.gender-1].label : '' }}</view>
			</u-cell-item>
			<u-cell-item class="cell-item" title="联系电话" @click="showDialog('phone')">
				<view slot="right-icon">{{ doctorInfo.mobile_num }}</view>
			</u-cell-item>
			<u-cell-item class="cell-item" title="所在医院" @click="toSelect('hospital')">
				<view slot="right-icon" class="u-line-2 u-text-right" style="width: 500rpx;">{{ doctorInfo.hospital_name }}</view>
			</u-cell-item>
			<u-cell-item class="cell-item" title="所在科室" @click="toSelect('department')">
				<view slot="right-icon" class="u-line-2 u-text-right" style="width: 500rpx;">{{ doctorInfo.depart_name }}</view>
			</u-cell-item>
			<u-cell-item class="cell-item" title="级别" @click="showSelect('positions')">
				<view slot="right-icon">{{ doctorInfo.position }}</view>
			</u-cell-item>
			<u-cell-item class="cell-item" title="职称" @click="showSelect('jobs')">
				<view slot="right-icon">{{ doctorInfo.job_title }}</view>
			</u-cell-item>
			<u-cell-item class="cell-item" title="擅长领域" @click="toSelect('field')">
				<view slot="right-icon" class="u-line-2 u-text-right" style="width: 500rpx;">{{ doctorInfo.field_name }}</view>
			</u-cell-item>
			<u-cell-item class="cell-item" title="门诊情况" @click="showClinic">
				<view slot="right-icon" v-if="doctorInfo.clinic_type > 0">
					<u-button class="u-m-r-10" type="primary" size="mini" shape="circle">{{ ['', '专家', '普通'][doctorInfo.clinic_type]  }}</u-button>
					 {{ doctorInfo.clinic_rota }}</view>
			</u-cell-item>
			<u-cell-item class="cell-item" title="当前分组">
				<view slot="right-icon">{{ doctorInfo.group_name }}</view>
			</u-cell-item>
		</u-cell-group>

		<!-- 弹窗输入(姓名/手机) -->
		<dialog-input v-if="dialogShowFlag" :show="dialogShowFlag" :dialogType="dialogShowType" @dialogConfirm="handleDialogConfirm" @dialogClose="hideDialog" />
		
		<!-- 选择门诊时间 -->
		<clinic v-if="clinicShowFlag" radio :type="doctorInfo.clinic_type" :config="doctorInfo.clinic_rota" @confirm="confirmClinic"></clinic>

		<!-- 性别/级别/职称 -->
		<!-- <u-picker mode="selector" v-model="selectShowFlag" :default-selector="[rangeIndex]" :range="rangeOption" @confirm="confrimSelect"></u-picker> -->
		<u-select v-model="selectShowFlag" safe-area-inset-bottom mode="single-column" :list="rangeOption" @confirm="confrimSelect"></u-select>
		
		<!-- 关联信息 -->
		<u-popup v-model="showRelationFlag" mode="center" border-radius="16" :mask-close-able="false" width="570rpx" >
			<view class="relation-wrap" v-if="showRelationFlag">
				<view class="u-text-center u-font-28 u-p-b-20" style="font-weight: 900;">关联信息自动录入</view>
				
				<view class="u-flex u-col-top u-m-t-20">
					<view class="label u-flex u-col-center">
						<u-icon name="checkmark-circle-fill" color="#5870FE" size="28" />
						<view class="u-m-l-20">真实姓名</view>
					</view>
					<view class="">{{ relationMsg.name }}</view>
				</view>
				<view class="u-flex u-col-top u-m-t-20">
					<view class="label u-flex u-col-center">
						<u-icon name="checkmark-circle-fill"  color="#5870FE" size="28" />
						<view class="u-m-l-20">性别</view>
					</view>
					<view class="">{{ (relationMsg.gender && genders[relationMsg.gender]) ? genders[relationMsg.gender].label : '' }}</view>
				</view>
				<view class="u-flex u-col-top u-m-t-20">
					<view class="label u-flex u-col-center">
						<u-icon name="checkmark-circle-fill"  color="#5870FE" size="28" />
						<view class="u-m-l-20">所在医院</view>
					</view>
					<view class="">{{ relationMsg.hospital.name }}</view>
				</view>
				<view class="u-flex u-col-top u-m-t-20">
					<view class="label u-flex u-col-center">
						<u-icon name="checkmark-circle-fill"  color="#5870FE" size="28" />
						<view class="u-m-l-20">所在科室</view>
					</view>
					<view class="">{{ relationMsg.depart.name }}</view>
				</view>
				<view class="u-flex u-col-top u-m-t-20">
					<view class="label u-flex u-col-center">
						<u-icon name="checkmark-circle-fill"  color="#5870FE" size="28" />
						<view class="u-m-l-20">级别</view>
					</view>
					<view class="">{{ relationMsg.job_title }}</view>
				</view>
				<view class="u-flex u-col-top u-m-t-20">
					<view class="label u-flex u-col-center">
						<u-icon name="checkmark-circle-fill"  color="#5870FE" size="28" />
						<view class="u-m-l-20">职称</view>
					</view>
					<view class="">
						{{ relationMsg.position }}
					</view>
				</view>
				<view class="u-flex u-col-top u-m-t-20">
					<view class="label u-flex u-col-center">
						<u-icon name="checkmark-circle-fill"  color="#5870FE" size="28" />
						<view class="u-m-l-20">擅长领域</view>
					</view>
					<view class="">
						{{ relationMsg.field.name }}
					</view>
				</view>
				<view class="u-flex u-col-top u-m-t-20">
					<view class="label u-flex u-col-center">
						<u-icon name="checkmark-circle-fill"  color="#5870FE" size="28" />
						<view class="u-m-l-20">门诊情况</view>
					</view>
					<view class="u-flex-1 u-line-3">
						{{ relationMsg.clinic_rota }}
					</view>
				</view>
				
				<view class="u-flex u-row-between u-m-t-40">
					<u-button type="primary" shape="circle" plain @click="confirmRelation(0)">暂不录入</u-button>
					<u-button type="primary" shape="circle" @click="confirmRelation(1)">确认录入</u-button>
				</view>
				
			</view>
		</u-popup>
		
	</view>
</template>

<script>
import DialogInput from '@/components/my-group/DialogInput.vue';
import Clinic from '@/components/my-group/Clinic.vue';

import { fetchDoctorInfo, updateDoctorInfo, fetchDoctorInfoByPhone, mergeDoctorInfoByPhone } from '@/api/myGroup.js';
export default {
	components: {
		DialogInput, Clinic
	},
	data() {
		return {
			doctorInfo: {},
			
			relationMsg: {},
			showRelationFlag: false,

			dialogShowFlag: false,
			dialogShowType: '',
			
			clinicShowFlag: false,

			selectShowFlag: false,
			selectShowType: '',
			rangeIndex: 0,
			rangeOption: [],
			
		};
	},
	onLoad() {
		this.doctorInfoMsg();

		uni.$on('selected', data => {

			const resultData = {};
			const { id, name } = data.value;

			if (data.type == 'hospital') {
				resultData.hospital_yyid = id;
				resultData.hospital_name = name;
			} else if (data.type == 'department') {
				resultData.depart_id = id;
				resultData.depart_name = name;
			} else if (data.type == 'field') {
				resultData.field_id = id;
				resultData.field_name = name;
			}

			this.doctorInfo = Object.assign(this.doctorInfo, resultData);
			
			this.updateInfo();
		});
	},
	onUnload() {
		uni.$off('selected');
	},
	methods: {
		doctorInfoMsg() {
			const member_id = this.$Route.query.member_id || '';
			const r_id = this.$Route.query.r_id || '';
			fetchDoctorInfo({ member_id, r_id }).then(res => {
				this.doctorInfo = res.data;
			});
		},

		toSelect(type) {
				this.$Router.push(`/pages/myGroup/select?type=${type}`);
		},
		
		showClinic() {
			this.clinicShowFlag = true;
		},
		
		confirmClinic(data) {
			
			if(data) {
				this.doctorInfo.clinic_type = data.type;
				const result = data.config.find(item => {
					return item.morning || item.afternoon || item.night
				})
				
				if(result && Object.keys(result).length) {
					this.doctorInfo.clinic_rota = `${result.week}-${result.morning > 0 ? '上午' : (result.afternoon > 0 ? '下午' : (result.night > 0 ? '晚上' : ''))}`;
				} else {
					this.doctorInfo.clinic_rota = ''
				}
				
				this.updateInfo();
			}
			
			this.clinicShowFlag = false;
		},

		showDialog(type) {
			this.dialogShowType = type;
			this.dialogShowFlag = true;
		},

		hideDialog() {
			this.dialogShowType = '';
			this.dialogShowFlag = false;
		},

		async handleDialogConfirm(val) {
			console.log(this.dialogShowType, val);
			const KEY = {
				name: 'true_name',
				phone: 'mobile_num'
			};
			this.doctorInfo[KEY[this.dialogShowType]] = val;
			
			if (this.dialogShowType == 'phone') {
				const resData = await fetchDoctorInfoByPhone(this.doctorInfo.id, val);
				if(resData.errcode == 0 && resData.data.info.id) {
					this.relationMsg = resData.data.info;
					this.showRelationFlag = true;
				}
			} else {
				this.updateInfo();
			}
			this.hideDialog();
		},
		
		async confirmRelation(type) {
			let paramsData = {};
			if(type == 1) {
				
				await mergeDoctorInfoByPhone(this.doctorInfo.id, this.relationMsg.id);
				
				paramsData = {
					true_name: this.relationMsg.name,
					gender: this.relationMsg.sex,
					mobile_num: this.relationMsg.mobile,
					hospital_yyid: this.relationMsg.hospital.id,
					hospital_name: this.relationMsg.hospital.name,
					depart_id: this.relationMsg.depart.id,
					position: this.relationMsg.position,
					job_title: this.relationMsg.job_title,
					field_id: this.relationMsg.field_id || this.relationMsg.field.id,
					clinic_type: this.relationMsg.clinic_type,
					clinic_rota: this.relationMsg.clinic_rota
				}
				
			}
			
			this.updateInfo(paramsData);
			this.showRelationFlag = false;
		},

		showSelect(type) {
			this.selectShowType = type;
			this.rangeIndex = 0;
			this.rangeOption = this[type];
			this.selectShowFlag = true;
		},

		confrimSelect(selects) {
			const KEY = {
				genders: 'gender',
				positions: 'position',
				jobs: 'job_title'
			};
			
			const result = selects[0];

			this.rangeIndex = result.value;
			
			this.doctorInfo[KEY[this.selectShowType]] = this.selectShowType == 'genders' ? this.rangeIndex : this.rangeOption[this.rangeIndex - 1].label;

			this.updateInfo();
		},

		updateInfo(params) {
			
			const paramsData = Object.assign({},this.doctorInfo, params);
			
			const { id, true_name, gender, mobile_num, hospital_yyid, hospital_name, depart_id, position, job_title, field_id, clinic_type, clinic_rota } = paramsData;
			updateDoctorInfo({
				id,
				true_name,
				gender,
				mobile_num,
				hospital_yyid,
				hospital_name,
				depart_id,
				position,
				job_title,
				field_id,
				clinic_type,
				clinic_rota
			}).then(res => {
				this.doctorInfoMsg();
			});
		}
	}
};
</script>

<style lang="scss" scoped>
.page-wrap {
	padding: 0 30rpx 30rpx;
}
.cell-item {
	padding: 20rpx 0;
}

.relation-wrap {
	padding: 40rpx 54rpx;
	color: $color-x3;
	font-size: 28rpx;
	.label {
		margin-right: 40rpx;
		flex-shrink: 0;
		width: 160rpx;
		color: $color-x9;
	}
}
</style>
