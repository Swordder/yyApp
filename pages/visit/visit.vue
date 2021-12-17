<template>
	<view class="content u-p-30">
		<u-row gutter="2">
			<u-col class="u-m-b-30 u-p-l-0 u-p-r-14" span="6">
				<navigator class="u-rela" url="/pages/visit/checkIn">
					<u-image width="100%" height="160" src="http://img.youyao99.com/64d08e724934b47fd26294e531b91f96.png"></u-image>
					<view class="u-abso">签入</view>
				</navigator>
			</u-col>
			<u-col class="u-m-b-30 u-p-r-0 u-p-l-14" span="6">
				<navigator class="u-rela" url="/pages/visit/checkOut">
					<u-image width="100%" height="160" src="http://img.youyao99.com/f077f82dd51fecd9ecbbd42024b4a626.png"></u-image>
					<view class="u-abso">签出</view>
				</navigator>
			</u-col>
			<u-col class="u-m-b-30 u-p-l-0 u-p-r-14" span="6">
				<navigator class="u-rela" url="/pages/visit/recordList">
					<u-image width="100%" height="160" src="http://img.youyao99.com/99d88298a20fb0f2b7f08cf0c3a3b560.png"></u-image>
					<view class="u-abso">所有拜访记录</view>
				</navigator>
			</u-col>
			<u-col class="u-m-b-30 u-p-r-0 u-p-l-14" span="6">
				<navigator class="u-rela" url="/pages/visit/visitRp">
					<u-image width="100%" height="160" src="http://img.youyao99.com/906b39c797f881493c68696fc43009ab.png"></u-image>
					<view class="u-abso">拜访报告</view>
				</navigator>
			</u-col>
			<u-col class="u-m-b-30 u-p-l-0 u-p-r-14" span="6">
				<navigator class="u-rela" url="/pages/visit/salesRp">
					<u-image width="100%" height="160" src="http://img.youyao99.com/a94fbadc91b31be00b79de96a745abc6.png"></u-image>
					<view class="u-abso">销售报告</view>
				</navigator>
			</u-col>
		</u-row>
	</view>
</template>
<script>
	export default {
		data() {
			return {
				
			};
		},
		methods:{
			
		}
	}
</script>
<style lang="scss" scoped>
.u-abso{
	font-size: 32rpx;
	color: $color-xf;
	top: 60rpx;
	left: 30rpx;
}
</style>
