<template>
	<view class="invite">
		<u-tabs class="tabBox" :list='list' @change='clickTab' :current="current" item-width="375"> 
		</u-tabs>
	
		<view class="doctorTab" v-if="current==0">
			<template v-for="doctor in doctorList" >
				<view class="doctor">
					<view class="docInfo">
						<u-avatar class="avatar" :src="doctor.headimgurl" mode="square"></u-avatar>
						<view class="docDetail">
							<view class="docName">{{doctor.true_name||doctor.nickname}}</view>
							<view :class="{'hospitalName':!!doctor.hospital_name}">{{doctor.hospital_name}}</view>
						</view>
					
					</view>
						
						
					<!-- <view class="doctorInfo">
					    <view class="doctorname">{{decodeURI(doctor.true_name)||doctor.nickname}}</view>
					    <view class="hospitalname" v-show="doctor.hospital_name">{{decodeURI(doctor.hospital_name)}}</view>
					</view> -->
					<view class="btnGp">
						<button class="yuanjiao" type="primary" size="mini" @click="inviteDoc(doctor)">邀请</button>
						<button class="yuanjiao" type="primary" size="mini" @click="onEdit(doctor)" plain>编辑</button>
					</view>
				</view>
			</template>
		</view>
		<view class="drugstoretab" v-if="current==1">
			<view class="drugstore" v-for="(item,index) in drugStoreList">
				<view class='storeContainer'>
					<image class='yaodian' src="/static/images/medicine.png" alt="">
					<view class="storeName">{{item.drugstore_name}}</view>
					<!-- <view class="storeName">广西大参林连锁药店有限公司桂林恭城莲花镇分店</view> -->
				</view>
				<view class="chooseMedicine">
					<view class="title_choose">选择药品</view>
					<view class="selectContainer"  @tap="tapSelection(item,index)">
						<view :class="item.selected=='请选择药品'?'default':'_medicine'">
							{{item.selected}}
						</view>
					<text class="u-iconfont uicon-arrow-down">
					</text>
					</view>
				</view>
				<button class='invitebtn' type="primary" @click="inviteStore(item)">邀请</button>
			</view>
		</view>
		<QrCode @handleClosePopup="resetStorePop" v-if="showPop" :type="codeType" :showPopup="showPop" :copyStoreId="copyStoreId" :copyDrugId="copyDrugId" :copyDrugName="copyDrugName" :url="codeUrl"></QrCode>
		
		<u-select v-model="showSelect" :list="productList" value-name="drug_id" label-name="drug_name" @confirm="confirmSelect" @cancel="confirmCancel" cancel-text="清空选择"></u-select>
	</view>
</template>

<script>
	import html2canvas from '../../components/jcboy-html2canvas/html2canvas.vue'
	import QrCode from './QrCode'
	import {getDrQrCode,getDoctorList,getDrugStoreList,getProductList,getStoreQrCode} from '@/api/youyunInvite.js'
	import {mapState} from 'vuex'
	import {base64ToPath} from '@/utils/base64ToPath.js'
	import {fetchAllDoctorGroupMsg} from '@/api/myGroup.js'
	export default {
		components:{
			html2canvas,
			QrCode
		},
		data() {
			return {
				showSelect:false,
				showPop:false,
				printId:'',
				store_id:'',
				current:0,
				list:[
				{name:'医生'},
				{name:'药店'},
				],
				doctorList:[
				// {
				// 	true_name:'王顾军',
				// 	hospital_name:'第九人民医院',
				// },{
				// 	nickname:'赖春涛',
				// 	hospital_name:'第九人民医院',
				// },
				],
				drugStoreList:[
					// {name:'同仁堂',selected:'请选择药品',show:false,selectedId:''},{name:'新华大药房',selected:'请选择药品',show:false,selectedId:''},
				],
				productList:[
				// {
				// 	drug_yyid:'爱尔真',
				// 	drug_name:'爱尔真',
				// },
				],
				currentStoreIndex:0,
				copyStoreId: '',
				copyDrugId: '',
				copyDrugName: '',
				imgUrl:'',
				storeUrl:'',
				codeUrl:'',
				codeType:''
			}
		},
		onLoad() {
			this.docList();
			//获取药店二维码地址域名
			getStoreQrCode().then(res => {
				this.storeUrl = res.data.url
			});
			this.storeList();
			this.prodList();
		},
		methods: {
			resetStorePop(msg) {
				this.showPop = msg;
				console.log(this.showPop);
			},
			//医生列表
			docList() {
				getDoctorList().then(res => {
					this.doctorList = res.data
					console.log(this.doctorList)
				})
			},
			//获取药店列表
			storeList() {
				getDrugStoreList().then( res => {
					//获取的对象添加selected字段绑定选择框
					this.drugStoreList = res.data
					this.drugStoreList.forEach( item => {
						item.selected = '请选择药品',
						item.show = false;
						item.selectedId = ''
					})
					console.log(this.drugStoreList)
				})
			},
			//获取药店药品列表
			prodList() {
				getProductList().then( res => {
				  this.productList = res.data
				})
			},
			
			tapSelection(item,index) {
				this.currentStoreIndex = index;
				this.showSelect = true
			},
			clickTab(e) {
				console.log(e)
				this.current = e 
			},
			confirmSelect(e) {
				this.drugStoreList[this.currentStoreIndex].selected = e[0].label;
				this.drugStoreList[this.currentStoreIndex].selectedId = e[0].value;
			},
			confirmCancel() {
				this.drugStoreList[this.currentStoreIndex].selected = '请选择药品'
			},
			onEdit(item) {
				this.$Router.push(`/pages/myGroup/doctorInfo?r_id=${item.r_id}`)
			},
			inviteDoc(d) {
				//获取医生二维码
				getDrQrCode(d.link_doctor_id).then(res => {
					this.codeUrl = res.data.url;
					this.codeType = 'doctor';
					this.showPop = true;
				})
				
			},
			async inviteStore(store,storeIndex) {
				if (store.selected == '请选择药品') {
					uni.showToast({
						title: "请先选择药品后邀请",
						icon: "none",
						mask: true,
					})
				}
				else {
					this.codeType = 'store'
					this.copyStoreId = store.drugstore_id
					this.copyDrugId = store.selectedId
					this.copyDrugName = store.selected
					this.codeUrl = this.storeUrl
					this.showPop=true;
				}
				
			},
		}
	}
</script>

<style lang="scss">
.doctorTab{
	position: relative;
	padding: 20rpx;
}
.doctor{
	display: flex;
	flex-direction: row;
	justify-content: flex-start;
	align-items: center;
	border-top: 2rpx,solid,#F3F3F3;
	border-bottom: 2rpx solid #F3F3F3;
	padding: 10rpx 0;
}
.avatar{
	width: 88rpx;
	height: 88rpx;
	border-radius: 16rpx;
}
.docInfo{
	display: flex;
	width: 320rpx ;
	margin-right: 80rpx;
}
.docDetail{
	display: flex;
	flex-direction: column;
	margin-left: 20rpx;
	max-width: 140rpx;
}
.docName{
	font-size: 28rpx;
	font-family: PingFangSC-Medium, PingFang SC;
	font-weight: 600;
	color: #333333;
	line-height: 40rpx;
	margin-bottom: 8rpx;
}
.hospitalName{
	background: #D6A779;
	border-radius: 4rpx;
	font-size: 20rpx;
	font-family: PingFangSC-Regular, PingFang SC;
	font-weight: 400;
	color: #FFFFFF;
	padding: 4rpx 4rpx;
	text-align: left;
}
.hidden_img{
	position: absolute;
	right:-9999rpx;
	text-align: center;
}
.btnGp{
	display: flex;
	justify-content: space-around;
	width: 300rpx;
}
.yuanjiao{
	border-radius: 58rpx;
}
.drugstoretab{
	padding: 30rpx;
}
.drugstore{
	text-align: center;
	max-width: 690rpx;
	background: #FFFFFF;
	box-shadow: 0 0 20rpx 0 rgba(216, 216, 216, 0.5);
	border-radius:16rpx;
	padding-bottom: 40rpx;
	margin-bottom: 30rpx;
}
.storeContainer{
	border-bottom:2rpx solid #F3F3F3;
	display:flex;
	justify-content:flex-start;
	align-items:center;
	padding:26rpx 30rpx;
}
.yaodian{
	width: 48rpx;
	height: 48rpx;
	margin-right: 40rpx;
	object-fit: fit;
}
.storeName{
	text-align: left;
	max-width: 480rpx;
	font-size: 32rpx;
	font-family: SourceHanSansCN-Bold, SourceHanSansCN,PingFangSC-Bold, PingFang SC;
	font-weight: 700;
	color: #333333;
	line-height: 48rpx;
}
.chooseMedicine{
	display: flex;
	padding: 0 40rpx;
	flex-direction: column;
	align-items: flex-start;
	margin-top: 24rpx;
}
.title_choose{
	font-weight:700;
	color:#333333;
	font-size: 24rpx ;
	font-family: SourceHanSansCN-Bold, SourceHanSansCN,PingFangSC-Bold, PingFang SC;
}
.default{
	color: #BBBBBB;
	float:left
}
._medicine{
	color: #333333;
	float:left
}
.selectContainer{
	text-align: left;
	width: 100%;
	border-bottom: 2rpx solid #F3F3F3;
	margin-bottom: 40rpx;
	margin-top: 8rpx;
	padding-bottom: 6rpx;
}
.invitebtn{
	width:460rpx;
	height:72rpx;
	border-radius:36rpx;
	background:#1989fa;
	line-height: 72rpx;
}
.queren{
	position: relative;
	top:28rpx;
	&:after{
		border: none;
		border-top:3rpx solid #bbb;
		border-top-left-radius:0 ;
		border-top-right-radius: 0;
		border-bottom-right-radius:10rpx;
		border-bottom-left-radius: 10rpx;
	}
	
}
.canvas-hide {
	position: fixed;
	
	right: 50vw;
	bottom: 50vh;
	// z-index: -9999;
	// opacity: 0;
}
/* .doctorTab{
  position: relative;
  padding: 0rpx 30rpx 20rpx;
}
.doctor{
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  border-top: 2rpx,solid,#F3F3F3;
  border-bottom: 2rpx solid #F3F3F3;
  padding: 10rpx 0;
}
.invite{
	width:96rpx;
	height:52rpx;
	background: #0088CE;
	border-radius: 36rpx;
	font-size: 24rpx;
	font-family: PingFangSC-Regular, PingFang SC;
	font-weight: 400;
	color: rgba(255,255,255,0.9);
	border: transparent;
} */
</style>

   
      
      