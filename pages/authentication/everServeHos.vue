<template>
	<view class="content u-rela">
		
		<!-- 医院列表 -->
		<mescroll-body 
			ref="mescrollRef" 
			@init="mescrollInit" 
			@down="downCallback" 
			@up="upCallback" 
			:up="upOption">
			<u-sticky bg-color="#FFFFFF" :enable="true">
				<view class="sticky">
					<view class="search_hd u-p-l-30 u-p-r-30">
						<u-search 
						class="u-p-t-20 u-p-b-20" 
						placeholder="请输入医院名称" 
						v-model="keyword" 
						:show-action="false" 
						input-align="center"
						@change="$u.debounce(search, 500)">
						</u-search>
						<u-line color="#F3F3F3" :hair-line="false"></u-line>	
					</view>	
					<HosDropdown @search = "search"></HosDropdown>
				</view>
			</u-sticky>
			<view class="hospital_wrap">
				
				<u-gap height="20" bg-color="#F5F5F5"></u-gap>
				<view 
				class="hospital_item" 
				v-for="item in hos_list" 
				:key="item.id"
				>
				
					<view class="u-flex u-row-between u-p-t-20 u-p-b-20 u-p-l-40 u-p-r-40">
						<view class="u-flex-1 u-m-r-20" @click="getDetail(item.id)">
							<view class="hospital_name u-m-b-12">
								{{item.name}}
							</view>
							<view class="hospital_status">
								<u-button v-show="item.level" hover-class="none" class="u-m-r-12" type="primary" size="mini" shape="circle" :style="{'backgroundColor':'#E9ECFF','color':'#5870FE'}">{{item.level}}</u-button>
								<template v-if="item.transaction == 1">
									<u-button hover-class="none" 
									type="primary" size="mini" shape="circle" 
									:style="{'backgroundColor':'#ffefdf','color':'#ff982a'}">
									已进药
									</u-button>	
								</template>
								<template v-if="item.transaction == 2">
									<u-button hover-class="none" 
									type="primary" size="mini" shape="circle" 
									:style="{'backgroundColor':'#ffefdf','color':'#ff982a'}">
									未进药
									</u-button>	
								</template>
							</view>
						</view>
						<view class="u-font-40" @click="selectHos(item)">
							<text v-if="hos_ids.indexOf(item.id) == -1" class="custom-icon">&#xe668;</text>
							<text v-else class="custom-icon">&#xe601;</text>
						</view>
					</view>	
					<u-gap height="20" bg-color="#F5F5F5"></u-gap>
				</view>
				<u-empty class="u-m-t-80" v-show="empty_tag" mode="search"></u-empty>
			</view>
		</mescroll-body>
		<view class="btns u-flex">
			<u-button class="select_num" :hair-line="false" type="" @click="showList()">已选择 
			<text class="yellow u-m-l-14 u-m-r-14"> {{select_hos_list.length}} </text> 个
			</u-button>
			<u-button class="select_hos" :hair-line="false" type="primary" @click="backPage()">确定</u-button>
		</view>
		<!-- modeal层  -->
		<u-modal v-model="show" :show-title="false" :confirm-style="{color:'#5870FE'}" :content-style="{'fontSize':'28rpx'}">
			<view class="slot-content">
				<HosDetail :info="info"></HosDetail>
			</view>
		</u-modal>
		<!-- popup弹层 -->
		<view class="">
			<u-popup mode="bottom" v-model="popup_show">
				<view class="content u-p-l-30 u-p-r-30 u-p-t-30 u-p-b-60">
					<scroll-view scroll-y="true" style="height: 600rpx;">
						<view v-if="select_hos_list.length !== 0">
							<template v-for="item in select_hos_list" >
								<view class="u-flex u-row-between" :key="item.id">
									<view class="u-p-t-30 u-p-b-30">
										<view class="">
											{{item.name}}
										</view>
										<view class="u-m-t-16">
											<u-button hover-class="none" size="mini" shape="circle" :style="{'backgroundColor':'#E9ECFF','color':'#5870FE'}">{{item.level}}</u-button>
										</view>
									</view>
									<view class="yellow" @click="selectHos(item)">
										<u-icon size="48" name="close-circle"></u-icon>
									</view>
								</view>	
								<u-line></u-line>
							</template>
						</view>
						<view v-else class="u-m-t-60">
							<u-empty text="还没有选择医院哦~" mode="data"></u-empty>
						</view>
					</scroll-view>
				</view>
			</u-popup>
		</view>
	</view>
</template>
<script>
	import HosDropdown from '@/components/HosDropdown.vue';
	import HosDetail from '@/components/HosDetail.vue';
	import { hospitalList,hospitalDetail } from '@/api/hospital.js';
	import MescrollMixin from "@/uni_modules/mescroll-uni/components/mescroll-uni/mescroll-mixins.js";
	import { mapMutations } from 'vuex';
	export default {
		mixins: [MescrollMixin],
		data() {
			return {
				keyword:'',
				hos_list:[],
				province_id:'',
				city_id:'',
				level:'',
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
				select_hos_list:[],
				hos_ids:[],
				info:{},
				show:false,
				popup_show:false
			};
		},
		components:{
			HosDropdown,
			HosDetail
		},
		onLoad() {
			if(!this.auth_data.hos_list){
				return
			}
			this.select_hos_list = [...this.auth_data.hos_list];
			this.hos_ids = this.select_hos_list.length !== 0?this.select_hos_list.map(item => {
				return item.id
			}):[]
		},
		methods:{
			...mapMutations([
				'SELECTHOS'
			]),
			// 获取医院列表
			async upCallback(page){
				let current = page.num, limit = page.size;
				let params = {
					series_id:'',
					province_id:this.province_id,
					city_id:this.city_id,
					level:this.level,
					transaction:'',
					can_apply:'',
					keywords:this.keyword,
					current,
					limit
				}
				let res = await hospitalList(params);
				const cur_list = res.data.list;
				const total_size = res.data.page.total;
				if(total_size == 0){
					this.empty_tag = true;
				} else {
					this.empty_tag = false;
				}
				const cur_page_len = cur_list.length;
				if (page.num == 1) {
					this.hos_list = []; //如果是第一页需手动制空列表
				}
				this.hos_list = this.hos_list.concat(cur_list); //追加新数据
				this.mescroll.endBySize(cur_page_len, total_size);
				setTimeout(() => {
					this.mescroll.endSuccess(cur_page_len);
				}, 20);
			},
			// 搜索
			search(area,level){
				if(area){
					this.province_id = area.province.id;
					this.city_id = area.city.id;
				} 
				if(level){
					this.level = level;
				}
				this.hos_list = [];
				this.mescroll.resetUpScroll();
			},
			// 选择医院
			selectHos(item){
				// this.$u.vuex('auth_data.hos_list',[...this.select_hos_list]);
				this.SELECTHOS(item);
				this.select_hos_list = [...this.auth_data.hos_list];
				this.$u.vuex('auth_data.hos_list',[...this.select_hos_list]);
				this.hos_ids = this.select_hos_list.length !== 0?this.select_hos_list.map(item => {
					return item.id
				}):[];
			},
			// 获取医院详情
			async getDetail(id){
				let res = await hospitalDetail(id,'');
				if(res.errcode != 0){
					return
				};
				this.info = { ...res.data.info };
				this.show = true;
			},
			// 展示已选医院列表
			showList(){
				this.popup_show = !this.popup_show;
			},
			downCallback(){
			},
			toHosDetail(){
				
			},
			backPage(){
				this.$Router.back()
			}
		}
	}
</script>

<style lang="scss" scoped>
.hospital_name{
	font-weight: bold;
}
.sticky{
	background-color: $color-xf;
	box-shadow: 0 2rpx 20rpx 0 rgba(99, 124, 199, 0.2);
}
.custom-icon{
	font-size: 48rpx;
	color: $color-31;
}
.btns{
	position: fixed;
	bottom: 0;
	left: 0;
	right: 0;
	z-index: 10076;
	background-color: $color-xf;
	box-shadow:0px 2px 12px 0px rgba(204,213,224,0.5);
}
.select_num{
	width: 340rpx;
	color: $color-31;
	background-color: $color-xf;
	border-radius: 0;
}
.yellow{
		color: $color-33;
	}
.select_hos{
	flex: 1;
	border-radius: 0;
	background-color: $color-31;
}
</style>
