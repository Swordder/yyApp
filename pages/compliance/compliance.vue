<template>
	<view class="content u-p-30">
		<view 
		v-for="(item,index) in list" 
		:key="item.id" 
		class="compliance_list u-m-b-40 u-rela"
		@click="toNextPage(item.path)">
			<u-image width="100%" height="200" :src="item.img_url"></u-image>
			<u-row class="u-absolute u-p-l-60 u-p-r-60 u-p-t-40 u-p-b-40" gutter="16" justify="space-around">
				<u-col span="9">
					<view class="u-font-36 u-m-b-8">{{item.title}}</view>
					<view class="u-font-24">{{item.sub_title}}</view>
				</u-col>
				<u-col span="3" text-align="right">
					<u-icon :name="item.icon_name" color="#ffffff" size="90"></u-icon>
				</u-col>
			</u-row>	
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				list:[
					{
						id:1,
						img_url:'http://img.youyao99.com/aed89ad36b30b669ae7c86d4d826ce95.png',
						title:'知识库',
						sub_title:'各产品文献、视频、技能培训、合规政策的知识中心',
						icon_name:'file-text',
						path:'/pages/compliance/knowledge'
					},
					{
						id:2,
						img_url:'http://img.youyao99.com/e6c185e2421d7f45fe2b48d88afdf372.png',
						title:'考试',
						sub_title:'各产品相关知识的综合性测验，检测学习的成果',
						icon_name:'edit-pen',
						path:'/pages/compliance/exam'
					}
				]
			};
		},
		methods:{
			toNextPage(path){
				this.$Router.push({
					path
				})
			}
		}
	}
</script>

<style lang="scss">
.compliance_list{
	box-shadow: 0 0.16rem 0.266667rem 0 rgba(127, 155, 226, 0.5);
	border-radius: 16rpx;
	.u-row{
		top: 0;
		left: 0;
		color: $color-xf;
		.u-font-36{
			font-weight: bold;
		}
	}
}
</style>
