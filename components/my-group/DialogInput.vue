<template>
	<u-mask :show="show" :zoom="false" @click="closeDialog">
		<view class="dialog-content" @click.stop>
			<view class="header">{{ title }}</view>

			<!-- 群组贡献比例 -->
			<view class="u-flex u-row-center u-col-center" v-if="dialogType == 'vote'">
				<view class="u-m-r-20">当前贡献比例</view>
				<view class="input-vote u-flex u-row-center">
					<u-input v-model="inputValue" :placeholder="placeholder" type="number" @blur="inputBlur" :maxlength="maxlength" />
					<text style="color: #999;">%</text>
				</view>
			</view>

			<!-- 群组公告 -->
			<view class="u-p-l-40 u-p-r-40" v-else-if="dialogType == 'notice'">
				<view class="input-notice"><u-input v-model="inputValue" :placeholder="placeholder" @blur="inputBlur" type="textarea" height="150" :maxlength="maxlength" fixed /></view>
			</view>

			<!-- 其他 -->
			<view class="input-wrap" v-else><u-input v-model="inputValue" :placeholder="placeholder" @blur="inputBlur" :maxlength="maxlength" /></view>

			<view class="footer u-flex u-row-center u-col-center u-m-t-40"><view class="btn-confirm" @click="confirmInput">确定</view></view>
		</view>
	</u-mask>
</template>

<script>
export default {
	name: 'DialogInput',
	props: {
		show: {
			type: Boolean,
			default: false
		},
		dialogType: {
			type: String,
			default: ''
		}
	},
	data() {
		return {
			inputValue: '',

			title: '提示',
			placeholder: '请输入内容',
			maxlength: 20,
			dialogConfig: {
				name: {
					title: '修改医生姓名',
					placeholder: '请输入姓名',
					maxlength: 10
				},
				phone: {
					title: '修改医生手机号',
					placeholder: '请输入手机号',
					maxlength: 11
				},
				createGroup: {
					title: '新建分组',
					placeholder: '请输入群组名称',
					maxlength: 20
				},
				resetName: {
					title: '分组重命名',
					placeholder: '请输入群组名称',
					maxlength: 20
				},
				notice: {
					title: '群公告',
					placeholder: '请输入公告内容',
					maxlength: 200
				},
				vote: {
					title: '发起更改贡献消费积分投票',
					placeholder: '请输入比例',
					maxlength: 2
				},
				collect: {
					title: '收藏夹',
					placeholder: '请输入收藏夹名称',
					maxlength: 20
				}
			}
		};
	},
	created() {
		if (this.dialogType) {
			this.title = this.dialogConfig[this.dialogType].title || '提示';
			this.placeholder = this.dialogConfig[this.dialogType].placeholder || '请输入内容';
			this.maxlength = this.dialogConfig[this.dialogType].maxlength || 20;
		}
	},
	methods: {
		closeDialog() {
			this.$emit('dialogClose');
		},
		confirmInput() {
			if (this.inputValue) {
				if (this.dialogType == 'phone' && !this.$u.test.mobile(this.inputValue)) {
					this.$u.toast('请输入正确的手机号!');
					return;
				}

				this.$emit('dialogConfirm', this.inputValue);
			} else {
				this.$u.toast('输入内容不能为空!');
			}
		},
		// 输入框失去焦点
		inputBlur() {
			uni.pageScrollTo({
				scrollTop: 0,
				duration: 100
			});
		}
	}
};
</script>

<style lang="scss" scoped>
.dialog-content {
	position: absolute;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -60%);
	width: 570rpx;
	border-radius: 16rpx;
	background: $color-31;
	font-size: 28rpx;
	color: $color-xf;
	overflow: hidden;
	.header {
		padding: 40rpx;
		text-align: center;
	}
	.input-wrap {
		margin: auto;
		padding: 8rpx 20rpx;
		width: 460rpx;
		height: 88rpx;
		border-radius: 4rpx;
		background: #fff;
	}
	.input-notice {
		padding: 8rpx 20rpx;
		border-radius: 4rpx;
		background: #fff;
	}
	.input-vote {
		padding: 8rpx 20rpx;
		width: 274rpx;
		height: 88rpx;
		border-radius: 4rpx;
		background: #fff;
	}
	.footer {
		width: 100%;
		height: 152rpx;
		background: #fff;
	}
	.btn-confirm {
		width: 320rpx;
		height: 72rpx;
		line-height: 72rpx;
		border-radius: 36rpx;
		text-align: center;
		background-color: #5870fe;
	}
}
</style>
