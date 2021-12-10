<template>
	<view class="waterfall u-p-30">
		<view 
		class="waterfall_item u-m-b-30"
		v-for="item in check_list"
		:key="item.id"
		@click="toNextPage(item.id,item.check_type)">
			<view class="waterfall_item_hd u-p-l-30 u-p-r-30 u-p-t-24 u-p-b-24">
				<template v-if="check_type == 'record_list'">
					<text v-show="item.check_type == 1" class="check_status" :style="{backgroundColor:'#fee',color:'#f55'}">
						未签出
					</text>
					<text v-show="item.check_type ==2" class="check_status">
						签出
					</text>
					<!-- <text v-else-if="check_type == 'checkin_list'" class="check_status">
						{{item.check_type == 1?'签入':'签出'}}
					</text> -->
				</template>
				<template v-else-if="check_type == 'checkin_list'">
					<text class="check_status">签入</text>
				</template>
				<view class="u-m-t-12">{{item.date}}</view>
			</view>
			<u-line :hair-line="false"></u-line>
			<view class="waterfall_item_bd u-p-30">
				<view class="u-flex u-m-b-20 u-col-top">
					<text class="custom-icon u-m-r-12">&#xe60e;</text>
					<view class="">{{item.type}}</view>
				</view>
				<view v-show="item.hospital" class="u-flex u-m-b-20 u-col-top">
					<text class="custom-icon u-m-r-12">&#xe60e;</text>
					<view class="">{{item.hospital}}</view>
				</view>
				<view v-show ="item.check_type==2">
					<view v-if="item.departs.length !== 0" class="u-flex u-m-b-20 u-col-top">
						<text class="custom-icon u-m-r-12">&#xe60e;</text>
						<view class="">{{item.departs.toString()}}</view>
					</view>
					<view v-if="item.doctors.length !== 0" class="u-flex u-col-top">
						<text class="custom-icon u-m-r-12">&#xe60e;</text>
						<view class="">{{item.doctors.toString()}}</view>
					</view>	
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		props:{
			check_type:String,
			check_list:Array
		},
		data(){
			return{
				empty_tag:false
			}
		},
		mounted() {
		},
		methods:{
			toNextPage(id,type){
				if(this.check_type == 'checkin_list'){
					this.$Router.push({
						path:'/pages/visit/checkoutDetail',
						query:{
							id,
							type:'checkout_add'
						}
					})	
				} else if(this.check_type=="record_list"){
					if(type == 1){
						this.$Router.push({
							path:'/pages/visit/checkin',
							query:{
								id,
								type:'checkin_edit'
							}
						})		
					} else if(type == 2){
						this.$Router.push({
							path:'/pages/visit/checkoutDetail',
							query:{
								id,
								type:'checkout_edit'
							}
						})
					}
					
				}
				
			}
		}
	}
</script>

<style lang="scss" scoped>
	.waterfall{
		width: 100%;
		column-count: 2;
		column-gap: 30rpx;
		.waterfall_item{
			border-radius: 8rpx;
			break-inside: avoid;
			background-color: $color-xf;
			.check_status{
				color: $color-31;
				background-color: $color-45;
				padding: 6rpx 20rpx;
				font-size: 24rpx;
				border-radius: 30rpx;
			}
			.waterfall_item_bd{
				line-height: 40rpx;
				color: $color-x6;
				.custom-icon{
					color: $color-31;
				}
			}	
		}
	}
</style>
