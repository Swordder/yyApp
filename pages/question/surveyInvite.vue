<template>
	<view class="content u-p-l-30 u-p-r-30">
		<u-sticky class="" bg-color="#FFFFFF">
			<view class="search_hd">
				<u-search 
				class="u-p-b-20" 
				placeholder="请输入关键字" 
				v-model="keyword" 
				:show-action="false" 
				input-align="center"
				@change="$u.debounce(search, 500)">
				</u-search>
				<u-line color="#F3F3F3" :hair-line="false"></u-line>	
			</view>
		</u-sticky>
		<mescroll-body ref="mescrollRef" @init="mescrollInit" @down="downCallback" @up="upCallback" :up="upOption">
			<view 
			class="u-flex u-row-between u-border-bottom u-p-t-20 u-p-b-20"
			v-for="item in list" :key="item.doctor_id">
				<view class="">
					{{item.name}}
				</view>
				<view v-if="item.status == 0" class="status">
					未关注
				</view>
				<view v-else-if="item.status == 1" class="invite" @click="sendInvite(item.doctor_id)">
					去邀请
				</view>
				<view v-else-if="item.status == 2" class="status">
					已邀请
				</view>
			</view>
			<u-empty class="u-m-t-40" v-show="empty_tag" text="没数据哦~" mode="search"></u-empty>
		</mescroll-body>
	</view>
</template>
<script>
	import { docInviteList,inviteDoc } from '@/api/question.js';
	import MescrollMixin from "@/uni_modules/mescroll-uni/components/mescroll-uni/mescroll-mixins.js";
	export default {
		mixins: [MescrollMixin],
		data() {
			return {
				keyword:'',
				list:[],
				empty_tag:false,
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
			};
		},
		methods:{
			async upCallback(page){
				let current = page.num, limit = page.size;
				let params = {
					id:this.$Route.query.id,
					keywords: this.keyword,
					current,
					limit
				}
				let res = await docInviteList(params);
				const cur_list = res.data.list;
				const total_size = res.data.page.total;
				const cur_page_len = cur_list.length;
				if(total_size == 0){
					this.empty_tag = true;
				} else {
					this.empty_tag = false;
				}
				if (page.num == 1) {
					this.list = []; //如果是第一页需手动制空列表
				}
				this.list = this.list.concat(cur_list); //追加新数据
				this.mescroll.endBySize(cur_page_len, total_size);
				setTimeout(() => {
					this.mescroll.endSuccess(cur_page_len);
				}, 20);
			},
			async search(){
				this.list = [];
				this.mescroll.resetUpScroll();
			},
			downCallback(){
				
			},
			async sendInvite(doctor_id){
				let params = {
					id:this.$Route.query.id,
					doctor_id
				};
				let res = await inviteDoc(params);
				if(res.data.errcode == 0){
					this.$u.toast('发送成功');
					return
				} else {
					this.$u.toast(res.errmsg);
				}
			}
		}
	}
</script>
<style lang="scss" scoped>
.status{
	color: $color-x9;
}
.invite{
	font-size: 24rpx;
	color: $color-xf;
	background-color: $color-31;
	padding: 0rpx 20rpx;
	border-radius: 30rpx;
}
</style>
