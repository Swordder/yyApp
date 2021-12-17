<template>
	<view class="content u-p-l-40 u-p-r-40">
		<u-sticky bg-color="#FFFFFF">
			<view class="search_hd">
				<u-search 
				class="u-p-b-20" 
				placeholder="请输入关键字" 
				v-model.trim="keyword" 
				:show-action="false" 
				input-align="center"
				@change="$u.debounce(search, 500)">
				</u-search>
				<u-line color="#F3F3F3" :hair-line="false"></u-line>	
			</view>
		</u-sticky>
		<view class="company_list">
			<mescroll-body ref="mescrollRef" @init="mescrollInit" @down="downCallback" @up="upCallback" :up="upOption">
				<template v-for="item in company_list">
					<view 
					class="u-p-t-24 u-p-b-24" 
					:class="{active:cur_select == item.id}"
					:key="item.id" 
					@click="selectCom(item)">
						{{item.name}}
					</view>
					<u-line v-if="cur_select == item.id" color="#5870FE" :hair-line="false"></u-line>
					<u-line v-else color="#F3F3F3" :hair-line="false"></u-line>
				</template>
			</mescroll-body>
			<!-- <u-empty text="尚未搜索数据哦~" mode="data"></u-empty> -->
			<u-empty v-show="company_list.length === 0" text="没有搜索结果~" mode="search"></u-empty>
		</view>
	</view>
</template>
<script>
	import { companyList } from '@/api/common.js';
	import MescrollMixin from "@/uni_modules/mescroll-uni/components/mescroll-uni/mescroll-mixins.js";
	export default{
		mixins: [MescrollMixin],
		data(){
			return {
				keyword:'',
				company_list:[],
				cur_select:'',
				upOption: {
					auto: true,
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
						radius: 16
					}
				}
			}
		},
		onShow() {
			if(this.$Route.query.type == 1){
				this.cur_select = this.auth_data.serve_company?this.auth_data.serve_company.id:'';
			} else if(this.$Route.query.type == 2){
				// let serve_data = uni.getStorageSync('serve_inner_data');
				
				// uni.setStorageSync('serve_inner_data',Object.assign({},{...serve_data},{'company':obj}))
			}
		},
		methods:{
			downCallback(){
				
			},
			async upCallback(page){
				let current = page.num, limit = page.size;
				let params = {
					keywords: this.keyword,
					current,
					limit
				}
				let res = await companyList(params);
				const cur_list = res.data.list;
				const total_size = res.data.page.total;
				const cur_page_len = cur_list.length;
				if (page.num == 1) {
					this.company_list = []; //如果是第一页需手动制空列表
				}
				this.company_list = this.company_list.concat(cur_list); //追加新数据
				this.mescroll.endBySize(cur_page_len, total_size);
				setTimeout(() => {
					this.mescroll.endSuccess(cur_page_len);
				}, 20);
			},
			selectCom(obj){
				if(this.$Route.query.type == 1){
					this.cur_select = obj.id;
					if(obj.id != 13){
						this.$u.vuex('auth_data.other_com_name','')
					}
					this.$u.vuex('auth_data.serve_company',obj)
				} else if(this.$Route.query.type == 2){
					let serve_data = uni.getStorageSync('serve_inner_data');
					uni.setStorageSync('serve_inner_data',Object.assign({},{...serve_data},{'company':obj}))
				}
				this.$Router.back();
			},
			search(){
				this.company_list = [];
				this.mescroll.resetUpScroll();
			}
		}
	}
</script>

<style lang="scss" scoped>
	.active{
		color: $color-31;
		
	}
</style>
