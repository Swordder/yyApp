<template>
	<view class="content u-p-30">
		<view class="note u-font-24 u-m-b-20">注：工作经验由近及远，至少填写一个</view>
		<u-toast ref="uToast" />
		<view class="company_list">
			<view 
				class="company_list_item u-p-30 u-rela u-m-b-20" 
				v-for="(item,index) in list" :key="index">
				<view class="u-flex u-row-left u-col-top u-m-b-20">
					<view class="u-m-r-20">公司名称</view>
					<view class="u-flex-1">{{item.company_name}}</view>
				</view>
				<view class="u-flex u-row-left u-col-top u-m-b-20">
					<view class="u-m-r-20">治疗领域</view>
					<view class="u-flex-1">{{item.territory}}</view>
				</view>
				<view class="u-flex u-row-left u-col-top u-m-b-20">
					<view class="u-m-r-20">适应症</view>
					<view class="u-flex-1">{{item.indications}}</view>
				</view>
				<view class="u-flex u-row-left u-col-top u-m-b-20">
					<view class="u-m-r-20">产品名称</view>
					<view class="u-flex-1">{{item.drug_name}}</view>
				</view>
				<!-- <view class="">
				</view> -->
				<text class="custom-icon u-abso" @click="deleteData(index)">&#xe62f;</text>
			</view>
		</view>
		<view class="company_form u-p-12">
			<u-form class="u-p-l-16 u-p-r-16" :model="form" ref="uForm">
				<u-form-item class="u-p-t-10 u-p-b-10" label-width="160" label="公司名称" :required="true">
					<u-input v-model.trim="form.company_name"  @click="toNextPage('/pages/authentication/company')" disabled placeholder="请输入公司名称" />
				</u-form-item>
				<u-form-item class="u-p-t-10 u-p-b-10" label-width="160" label="治疗领域" :required="true">
					<u-input @click="toNextPage('/pages/authentication/territory')" v-model.trim="form.territory" disabled placeholder="请选择治疗领域" />
				</u-form-item>
				<u-form-item class="u-p-t-10 u-p-b-10" label-width="160" label="适应症" :required="true">
					<u-input @click="toNextPage('/pages/authentication/indications')" v-model.trim="form.indications" disabled placeholder="请选择适应症" />
				</u-form-item>
				<u-form-item class="u-p-t-10 u-p-b-10" label-width="160" label="产品名称" :required="true">
					<u-input v-model.trim="form.drug_name" @input="setValue" placeholder="请输入产品名称" />
				</u-form-item>
				<u-button class="u-m-t-30 u-m-b-20 add_btn" size="mini" type="primary" hover-class="none" shape="circle" @click="addCompany()">确定添加</u-button>
			</u-form>
		</view>
		<u-button class="u-m-t-30 u-m-b-20 add_btn" type="primary" shape="circle" @click="backPage">确定</u-button>
	</view>
</template>
<script>
	export default {
		data(){
			return{
				form: {
					company_name: '',
					territory:'',
					indications:'',
					drug_name:''
				},
				list:[],
			}
		},
		onLoad() {
			
		},
		onShow() {
			if(!this.auth_data.ever_serve_com){
				this.$u.vuex('auth_data.ever_serve_com',[])
			}
			this.initData();
			this.initShowList()
		},
		methods:{
			initData(){
				// 初始化表格
				let serve_data = uni.getStorageSync('serve_inner_data');
				if(serve_data){
					this.form.company_name = serve_data.company?serve_data.company.name:'';
					// 治疗领域处理
					if(serve_data.territory){
						this.form.territory = serve_data.territory.length !== 0?serve_data.territory.map(item => {
							return item.name
						}).toString():''
					}
					// 适应
					if(serve_data.indications){
						this.form.indications = serve_data.indications.length !== 0?serve_data.indications.map(item => {
							return `${item.name}`
						}).toString():''
					}
					this.form.drug_name = serve_data.drug?serve_data.drug:'';
				}
			},
			// 初始化列表
			initShowList(){
				let vuex_com_list = this.auth_data.ever_serve_com?this.auth_data.ever_serve_com:[];
				this.list = [];
				if(vuex_com_list.length !== 0){
					vuex_com_list.forEach(item => {
						let show_list_obj = {};
						show_list_obj.company_name = item.company.name;
						show_list_obj.territory = item.territory.map(item => {
							return item.name
						}).toString();
						show_list_obj.indications = item.indications.map(item => {
							return item.name
						}).toString();
						show_list_obj.drug_name = item.drug;
						this.list.push(show_list_obj);
					})
				};
			},
			// 添加公司
			addCompany(){
				let serve_data = uni.getStorageSync('serve_inner_data');
				let form = this.form;
				if(!form.company_name || !form.territory || !form.indications || !form.drug_name){
					this.$refs.uToast.show({
						title: '请填写必要数据',
						type: 'error',
					})
					return
				};
				// 将曾服务的公司处理成所需要的格式
				// // 处理成vuex所需要的格式
				/* let vuex_obj = {};
				vuex_obj.company_id = serve_data.company.id;
				vuex_obj.field_id = serve_data.territory.length !== 0?serve_data.territory.map(item => {
					return item.id
				}):[];
				vuex_obj.adaption_id = serve_data.indications.length !== 0?serve_data.indications.map(item => {
					return item.id
				}):[];
				vuex_obj.product_name = serve_data.drug; */
				let serve_arr = [];
				serve_arr.push(serve_data);
				// this.$u.vuex('auth_data.ever_serve_com',[])
				// console.log()
				this.$u.vuex('auth_data.ever_serve_com',[...this.auth_data.ever_serve_com,...serve_arr])
				// 从vuex处取得添加的数据，处理成列表
				// return
				this.initShowList();
				uni.removeStorageSync('serve_inner_data');
				this.form = {
					company_name: '',
					territory:'',
					indications:'',
					drug_name:''
				};
			},
			// 删除公司
			deleteData(index){
				let vuex_com_list = this.auth_data.ever_serve_com;
				vuex_com_list.splice(index,1);
				this.$u.vuex('auth_data.ever_serve_com',[...vuex_com_list]);
				this.initShowList()
			},
			// 将input改变的值写入本地存储
			setValue(e){
				let serve_data = uni.getStorageSync('serve_inner_data');
				uni.setStorageSync('serve_inner_data',Object.assign({},{...serve_data},{'drug':this.form.drug_name}))
			},
			toNextPage(url){
				this.$Router.push({
					path:url,
					query:{
						'type':2
					}
				})
			},
			backPage(){
				this.$Router.back();
			}
		}
	}
</script>

<style lang="scss" scoped>
	.note{
		color: $color-35;
	}
	.company_list_item{
		line-height: 40rpx;
		background-color: $color-45;
		border-radius: 8rpx;
		.u-m-r-20{
			width: 120rpx;
		}
		.u-flex-1{
			color: $color-31;
		}
		.custom-icon{
			top: -16rpx;
			right: -16rpx;
			z-index: 2;
			font-size: 48rpx;
			color: $color-d8;
		}
	}
	.company_form{
		border: 2rpx solid #C4C9D2;
	}
	.add_btn{
		line-height: 60rpx;
		// width: 180rpx;
		background-color: $color-31;
	}
</style>
