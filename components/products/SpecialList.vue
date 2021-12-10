<template>
	<view class="special_list">
		<view class="u-flex u-m-b-30 u-col-top" v-for="(item,index) in special_list" :key="index">
			<view 
				class="u-m-r-16" 
				:style="{
					backgroundColor:styles.indexColor,
					width:styles.width,
					color:styles.fontColor,
					height:styles.height,
					textAlign:styles.textAlign
					}">
				0{{index+1}}
			</view>
			<view class="u-flex-1">
				<view class="title u-m-b-8" :style="{color:styles.color}">{{item.title}}</view>
				<view v-show="item.sub_title" class="sub_title u-font-24">{{item.sub_title}}</view>
			</view>
		</view>
	</view>
</template>
<script>
	export default {
		props:['special_list','styles'],
		data(){
			return {
				
			}
		}
	}
</script>
<style lang="scss" scoped>
	
</style>
