<template>
	<view class="content">
		
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
				<HosDropdown @search="search" type="apply"></HosDropdown>
			</view>
		</u-sticky>
		
		<!-- 医院列表 -->
		<mescroll-body ref="mescrollRef" @init="mescrollInit" @down="downCallback" @up="upCallback" :up="upOption">
			
			<view class="hospital_wrap">
				<u-gap height="20" bg-color="#F5F5F5"></u-gap>
				<view 
				class="hospital_item"
				v-for="item in hos_list"
				:key="item.id">
					<view class="u-flex u-row-between u-p-t-20 u-p-b-20 u-p-l-40 u-p-r-40">
						<view class="u-flex-1 u-m-r-20">
							<view class="hospital_name u-m-b-12">
								{{item.name}}
							</view>
							<view class="hospital_status">
								<u-button 
								hover-class="none"
								v-show="item.level"
								class="u-m-r-12" type="primary" size="mini" shape="circle" 
								:style="{'backgroundColor':'#E9ECFF','color':'#5870FE'}">
								{{item.level}}
								</u-button>
								<template v-if="item.transaction == 1">
									<u-button 
									hover-class="none"
									v-show="item.transaction"
									type="primary" size="mini" shape="circle" 
									:style="{'backgroundColor':'#ffefdf','color':'#ff982a'}">
									已进药
									</u-button>	
								</template>
								<template v-else-if="item.transaction == 2">
									<u-button 
									hover-class="none"
									v-show="item.transaction"
									type="primary" size="mini" shape="circle" 
									:style="{'backgroundColor':'#ffefdf','color':'#ff982a'}">
									未进药
									</u-button>	
								</template>
							</view>
						</view>
						<view class="">
							<template v-if="item.can_apply == 0">
								<view class="" style="color:#999999">
									已有代表服务	
								</view>
							</template>
							<template v-else-if="item.can_apply == 1">
								<u-button 
								@click="toHosDetail(item.id)" 
								type="primary" size="mini" shape="circle" 
								:style="{'backgroundColor':'#5870FE'}">
								可申请
								</u-button>	
							</template>
						</view>
					</view>	
					<u-gap height="20" bg-color="#F5F5F5"></u-gap>
				</view>
			</view>
			<!-- <view v-for="data in dataList"> 数据列表... </view> -->
		 </mescroll-body>
	</view>
</template>

<script>
	import HosDropdown from '@/components/HosDropdown.vue';
	import { hospitalList } from '@/api/hospital.js';
	import MescrollMixin from "@/uni_modules/mescroll-uni/components/mescroll-uni/mescroll-mixins.js";
	export default {
		mixins: [MescrollMixin],
		data() {
			return {
				keyword:'',
				hos_list:[],
				province_id:'',
				city_id:'',
				level:'',
				medic:'',
				other:'',
				upOption: {
					auto: true,
					page: {
						num: 0, // 当前页码,默认0,回调之前会加1,即callback(page)会从1开始
						size: 20 // 每页数据的数量,默认10 (长屏手机页面数据未能满屏, 底部留白)
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
				hos_ids:[]
			};
		},
		components:{
			HosDropdown
		},
		methods:{
			// 获取医院列表
			async upCallback(page){
				let current = page.num, limit = page.size;
				let params = {
					series_id:this.$Route.query.series_id,
					province_id:this.province_id,
					city_id:this.city_id,
					level:this.level,
					transaction:this.medic,
					can_apply:this.other,
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
			search(area,level,medic,other){
				if(area){
					this.province_id = area.province.id;
					this.city_id = area.city.id;
				} 
				if(level){
					this.level = level;
				}
				this.medic = medic;
				this.other = other;
				this.hos_list = [];
				this.mescroll.resetUpScroll();
			},
			toHosDetail(id){
				this.$Router.push({
					path:'/pages/hospital/hospitalDetail',
					query:{
						...this.$Route.query,
						hospital_id:id
					}
				})
			},
			
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
</style>
