<template>
	<!-- 门诊 -->
	<u-popup v-model="showPopup" mode="center" border-radius="16" width="570rpx" height="940rpx" @close="closePopup">
		<view class="popup-container">
			<u-tabs v-if="showPopupTabs" :list="typeList" :is-scroll="false" :bold="false" :item-width="284" :bar-height="4" :current="curTypeIndex" @change="checkType"></u-tabs>

			<view class="u-flex u-border-top">
				<view class="u-flex-1 u-flex u-flex-col u-col-center u-border-right">
					<view
						class="btn-config u-m-t-30"
						:class="{ active: hasChceked(index) || curWeekIndex == index }"
						v-for="(config, index) in workConfig"
						:key="index"
						@click="curWeekIndex = index"
					>
						{{ config.week }}

						<view class="icon-wrap u-flex u-row-right u-col-top u-p-2" v-if="curWeekIndex == index"><u-icon name="checkmark" color="#ffffff" size="20"></u-icon></view>
					</view>
				</view>
				<view class="u-flex-1 u-flex u-flex-col u-col-center">
					<template v-if="curWeekIndex != -1">
						<view class="btn-config u-m-t-30" :class="{ active: workConfig[curWeekIndex].morning }" @click="checkTime('morning')">
							上午
							<view class="icon-wrap u-flex u-row-right u-col-top u-p-2" v-if="workConfig[curWeekIndex].morning"><u-icon name="checkmark" color="#ffffff" size="20"></u-icon></view>
						</view>
						<view class="btn-config u-m-t-30" :class="{ active: workConfig[curWeekIndex].afternoon }" @click="checkTime('afternoon')">
							下午
							<view class="icon-wrap u-flex u-row-right u-col-top u-p-2" v-if="workConfig[curWeekIndex].afternoon">
								<u-icon name="checkmark" color="#ffffff" size="20"></u-icon>
							</view>
						</view>
						<view class="btn-config u-m-t-30" :class="{ active: workConfig[curWeekIndex].night }" @click="checkTime('night')">
							晚上
							<view class="icon-wrap u-flex u-row-right u-col-top u-p-2" v-if="workConfig[curWeekIndex].night"><u-icon name="checkmark" color="#ffffff" size="20"></u-icon></view>
						</view>
					</template>
				</view>
			</view>

			<view class="u-m-t-40 u-p-l-30 u-p-r-30"><u-button type="primary" shape="circle" @click="confirmOutpatient">确定</u-button></view>
		</view>
	</u-popup>
</template>

<script>
const WEEK_CONFIG = [
	{
		week: '周一',
		morning: 0,
		afternoon: 0,
		night: 0
	},
	{
		week: '周二',
		morning: 0,
		afternoon: 0,
		night: 0
	},
	{
		week: '周三',
		morning: 0,
		afternoon: 0,
		night: 0
	},
	{
		week: '周四',
		morning: 0,
		afternoon: 0,
		night: 0
	},
	{
		week: '周五',
		morning: 0,
		afternoon: 0,
		night: 0
	},
	{
		week: '周六',
		morning: 0,
		afternoon: 0,
		night: 0
	},
	{
		week: '周日',
		morning: 0,
		afternoon: 0,
		night: 0
	}
];
export default {
	name: 'Clinc',
	props: {
		type: {
			type: Number,
			default: 1
		},
		config: {
			type: String,
			default: ''
		},
		radio: {
			type: Boolean,
			default: false
		}
	},
	data() {
		return {
			showPopup: false,
			showPopupTabs: false,
			curTypeIndex: 0,
			curWeekIndex: -1,
			typeList: [
				{
					type: 1,
					name: '专家'
				},
				{
					type: 2,
					name: '普通'
				}
			],
			workConfig: [].concat(WEEK_CONFIG)
		};
	},
	computed: {
		normalConfig() {
			try {
				const result = JSON.parse(this.config);
				if (result) {
					return result;
				}
				return [].concat(WEEK_CONFIG);
			} catch (e) {
				return [].concat(WEEK_CONFIG);
			}
		}
	},
	watch: {
		showPopup(newVal) {
			if (newVal) {
				this.curTypeIndex = (this.type + 1) % 2;
				const newConfig = this.workConfig.map((item, index) => {
					if (this.normalConfig[index]) {
						return Object.assign({}, item, this.normalConfig[index]);
					}
				});
				this.workConfig = [].concat(newConfig);
			}

			setTimeout(() => {
				this.showPopupTabs = newVal;
			}, 300);
		},
		curWeekIndex(nVal, oVal) {
			if (this.radio) {
				const target = this.workConfig[oVal];
				for (let key in target) {
					if (['week'].indexOf(key) < 0) {
						target[key] = 0;
					}
				}
			}
		}
	},

	created() {
		this.showPopup = true;
	},
	beforeDestroy() {
		this.showPopup = false;
	},
	methods: {
		closePopup() {
			this.$emit('confirm');
		},

		// 选择门诊信息
		checkType(index) {
			this.curTypeIndex = index;
		},
		checkTime(type) {
			const target = this.workConfig[this.curWeekIndex];
			if (this.radio) {
				for (let key in target) {
					if (['week', type].indexOf(key) < 0) {
						target[key] = 0;
					}
				}
			}

			target[type] = (target[type] * 1 + 1) % 2;
			// this.workConfig[this.curWeekIndex] = target
		},

		hasChceked(index) {
			if (this.workConfig[index]) {
				const { morning, afternoon, night } = this.workConfig[index];
				return morning || afternoon || night;
			}
			return false;
		},

		// 确认门诊信息
		confirmOutpatient() {
			const type = this.curTypeIndex + 1;

			const config = {
				type,
				config: this.workConfig
			};

			this.$emit('confirm', config);
		}
	}
};
</script>

<style lang="scss" scoped>
.popup-container {
	position: relative;
	display: block;
}

.btn-config {
	position: relative;
	width: 180rpx;
	height: 72rpx;
	text-align: center;
	line-height: 68rpx;
	border: 2rpx solid #c4c9d2;
	background-color: #ffffff;
	border-radius: 8rpx;
	font-size: 28rpx;
	color: $color-x6;
	box-sizing: border-box;
	overflow: hidden;
	&.active {
		background: rgba(88, 112, 254, 0.1);
		border: 2rpx solid #5870fe;
		color: #5870fe;
	}

	.icon-wrap {
		position: absolute;
		top: 0;
		right: 0;
		width: 36rpx;
		height: 36rpx;
		background: #5870fe;
		border-bottom-left-radius: 36rpx;
	}
}
</style>
