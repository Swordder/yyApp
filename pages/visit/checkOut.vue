<template>
	<view class="content">
		<mescroll-body ref="mescrollRef" @init="mescrollInit" @down="downCallback" @up="upCallback" :up="upOption">
			<VisitWaterFall :check_list="list" :check_type="visit_check_type"></VisitWaterFall>
			<u-empty v-show="empty_tag"></u-empty>
		</mescroll-body>
	</view>
</template>
<script>
	import VisitWaterFall from '@/components/visit/VisitWaterFall.vue';
	import { visitList } from '@/api/visit.js';
	import MescrollMixin from "@/uni_modules/mescroll-uni/components/mescroll-uni/mescroll-mixins.js";
	export default {
		mixins: [MescrollMixin],
		data() {
			return {
				list:[],
				visit_check_type:'checkin_list',
				empty_tag:false,
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
			};
		},
		components:{
			VisitWaterFall
		},
		onShow() {
			this.canReset && this.mescroll.scrollTo(0,0) 
			this.canReset&&this.mescroll.resetUpScroll()
			this.canReset = true 
		},
		methods:{
			async upCallback(page){
				let date = new Date();
				let year = date.getFullYear();
				let month = date.getMonth()+1 < 10?`0${date.getMonth()+1}`:date.getMonth()+1;
				let day = date.getDate();
				let start_time = `${year}-${month}-${day} 00:00:00`;
				let end_time = `${year}-${month}-${day} 23:59:59`;
				let current = page.num, limit = page.size;
				let params = {
					check_in_start_at:start_time,
					check_in_end_at:end_time,
					check_out_start_at:'',
					check_out_end_at:'',
					hospital_id:0,
					office_id:[],
					check_type:1,
					visit_type:0,
					current,
					limit
				}
				let res = await visitList(params);
				const list = res.data.list;
				const total_size = res.data.page.total;
				if(total_size == 0){
					this.empty_tag = true;
				} else {
					this.empty_tag = false;
				}
				const cur_page_len = list.length;
				if (page.num == 1) {
					this.list = []; //如果是第一页需手动制空列表
				}
				this.list = this.list.concat(list); //追加新数据
				this.mescroll.endBySize(cur_page_len, total_size);
				setTimeout(() => {
					this.mescroll.endSuccess(cur_page_len);
				}, 20);
			}
			
		}
	}
</script>
<style lang="scss" scoped>
	.content{
		height: 100%;
		background-color: $color-f5;
	}
</style>
