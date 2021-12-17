<template>
	<view class="page-wrap">

		<u-sticky h5-nav-height="0" :enable="enableSticky">
			<!-- 只能有一个根元素 -->
			<view class="sticky-wrap">
				<view class="u-p-20">
				<u-search
					height="60"
					placeholder="请输入关键字"
					v-model="keyword"
					:show-action="false"
					bg-color="#f7f7f7"
					@change="confirmSearch"
				></u-search>
				</view>
				<district v-if="selectType == 'hospital'" :curProvince="curProvince" :curCity="curCity"></district>
			</view>
		</u-sticky>
		
		<!-- <u-sticky v-if="selectType == 'department'" h5-nav-height="0" :enable="enableSticky">
			<view class="sticky-wrap u-p-20">
				<u-search
					height="60"
					placeholder="请输入科室名称"
					v-model="keyword"
					:show-action="false"
					bg-color="#f7f7f7"
					@change="confirmSearch"
				></u-search>
			</view>
		</u-sticky> -->
		
		<mescroll-body ref="mescrollRef" :up="upOption" @init="mescrollInit" @down="downCallback" @up="upCallback">
			<view class="u-p-l-30 u-p-r-30 u-rela" style="z-index: 1;">
				<view
					class="select-item u-flex u-row-between u-border-bottom"
					:class="{ selected: currentIndex == index }"
					v-for="(item, index) in dataList"
					:key="index"
					@click="selectCurrent(index, item)"
				>
					<view class="">{{ item.name }}</view>
					<u-icon name="checkbox-mark" v-if="currentIndex == index"></u-icon>
				</view>
			</view>
		</mescroll-body>
		
		<view class="fixed-footer u-border-top"><u-button type="primary" shape="circle" @click="confirmSelect">确定</u-button></view>
	</view>
</template>

<script>
import { departments, adaptions } from '@/api/common.js';
import { hospitalList } from '@/api/hospital.js';

import MescrollMixin from '@/uni_modules/mescroll-uni/components/mescroll-uni/mescroll-mixins.js';
import District from '@/components/my-group/District.vue';
export default {
	mixins: [MescrollMixin], // 使用mixin
	components: { District },
	data() {
		return {
			selectType: '', // hospital 医院		department 科室
			dataList: [],
			currentIndex: -1,

			enableSticky: true,
			
			keyword: '',
			level: '',

			curProvince: {},
			curCity: {},
			
			typeOption: {
				hospital: '所在医院',
				department: '所在科室',
				field: '擅长领域'
			},
			
			// 上拉加载的配置(可选, 绝大部分情况无需配置)
			upOption: {
				auto: false,
				page: {
					num: 0, // 当前页码,默认0,回调之前会加1,即callback(page)会从1开始
					size: 20 // 每页数据的数量,默认10
				},
				noMoreSize: 5, // 配置列表的总数量要大于等于5条才显示'-- END --'的提示
				textNoMore: '~ 呀, 到底了 ~',
				empty: {
					use: false // 不使用自带组件
				},
				toTop: {
					offset: 800,
					radius: 16,
					bottom: 200,
				}
			}
		};
	},

	onLoad() {
		this.selectType = this.$Route.query.type;
		
		uni.setNavigationBarTitle({
		    title: this.typeOption[this.selectType]
		});

		uni.$on('hospitalDistrict', data => {
			
			this.dataList = [];
			
			this.curProvince = data.province;
			this.curCity = data.city;
			this.level = data.level;
			this.currentIndex = -1;

			this.mescroll.resetUpScroll();
			this.mescroll.scrollTo(0, 0);
		});
	},
	
	onUnload() {
		uni.$off('hospitalDistrict');
	},

	onShow() {
		this.enableSticky = true;
	},
	onHide() {
		this.enableSticky = false;
	},

	methods: {
		// 选择
		selectCurrent(index, item) {
			this.currentIndex = index;
			
			// uni.$emit('selected', {
			// 	type: this.selectType,
			// 	value: { ...item }
			// });
			
			// this.$Router.back();
		},
		
		confirmSelect() {
			const result = this.dataList[this.currentIndex];
			uni.$emit('selected', {
				type: this.selectType,
				value: { ...result }
			});
			
			this.$Router.back();
		},
		
		confirmSearch() {
			this.$u.debounce(() => {
				this.currentIndex = -1;
				
				this.mescroll.resetUpScroll();
				this.mescroll.scrollTo(0, 0);
			}, 1000)
		},
		
		/*上拉加载的回调: 其中page.num:当前页 从1开始, page.size:每页数据条数,默认10 */
		upCallback(page) {
			
			const METHOD = {
				hospital: hospitalList,
				department: departments,
				field: adaptions
			}
			
			const paramsData = {
				current: page.num,
				limit: 20,
				keywords: this.keyword
			};
			
			if(this.selectType == 'hospital') {
				paramsData.level = this.level.id;
				paramsData.province_id = this.curProvince.id;
				paramsData.city_id = this.curCity.id
			}
			
			METHOD[this.selectType](paramsData)
				.then(res => {
					console.log(res);
					const curPageData = res.data.list;
					const totalSize = res.data.total;
					const curPageLen = curPageData.length;
					if (page.num == 1) {
						this.dataList = []; //如果是第一页需手动制空列表
					}
					
					// this.curProvince = curPageData.province;
					// this.curCity = curPageData.city;
					
					this.dataList = this.dataList.concat(curPageData); //追加新数据
					this.mescroll.endBySize(curPageLen, totalSize);
		
					setTimeout(() => {
						this.mescroll.endSuccess(curPageLen);
					}, 20);
				})
				.catch(() => {
					//联网失败, 结束加载
					this.mescroll.endErr();
				});
		}
	}
};
</script>

<style lang="scss" scoped>
.page-wrap {
	padding-bottom: 120rpx;
}
.sticky-wrap {
	position: relative;
	z-index: 2021;
	background-color: $color-xf;
}

.select-item {
	padding: 30rpx 0;
	min-height: 90rpx;
	&.selected {
		color: $color-31;
	}
}

.fixed-footer {
	position: fixed;
	left: 0;
	bottom: 0;
	width: 100vw;
	padding: 30rpx;
	background-color: $color-xf;
	z-index: 99;
}
</style>
