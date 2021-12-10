<template>
	<view class="location_model">
		<u-modal 
		v-model="geo_obj.location_show" 
		title="超范围打卡" 
		:async-close="true"
		ref="uModal"
		:confirm-style="{color:'#5870FE'}"
		:title-style="{color: '#333333',padding:'40rpx 0',fontSize:'28rpx'}"
		@confirm="submitCon">
			<view class="slot-content u-p-l-30 u-p-r-30">
				<u-button 
				class="u-m-b-20" 
				:class="{active_btn:id == item.id}"
				hover-class="none"
				v-for="item in list"
				:key="item.id"
				@click="select(item.id,item.is_extra_input)">{{item.name}}</u-button>
				<u-input 
				v-if="show_input"
				v-model="value"
				class="u-m-b-40 u-m-t-40" 
				type="textarea" 
				:border="true" 
				@input="saveValue"
				placeholder="请输入内容">
				</u-input>
			</view>
		</u-modal>
	</view>
</template>

<script>
	export default {
		props:['list','geo_obj','type'],
		data(){
			return {
				id:'',
				value:'',
				show_input:false,
			}
		},
		methods:{
			select(id,is_extra_input){
				this.id = id;
				if(this.type == 'checkin'){
					this.$u.vuex('visit_checkin.geo_opt',id);
				} else if (this.type == 'checkout'){
					this.$u.vuex('visit_checkout.geo_opt',id);
				}
				
				if(is_extra_input == 0){
					this.show_input = false;
				} else {
					this.show_input = true;
				}
				// this.$emit('getData')
			},
			saveValue(){
				if(this.type == 'checkin'){
					this.$u.vuex('visit_checkin.geo_comment',this.value);
				} else if (this.type == 'checkout'){
					this.$u.vuex('visit_checkout.geo_comment',this.value);
				}
			},
			submitCon(){
				if(this.id == ''){
					this.$u.toast('请选择');
					this.$refs.uModal.clearLoading();
					return
				}; 
				if(this.show_input&&this.value == ''){
					this.$u.toast('请输入');
					this.$refs.uModal.clearLoading();
					return
				}
				if(this.type == 'checkin'){
					this.$u.vuex('visit_checkin.geo_opt',this.id);
					this.$u.vuex('visit_checkin.geo_comment',this.value);
				} else if (this.type == 'checkout'){
					this.$u.vuex('visit_checkout.geo_opt',this.id);
					this.$u.vuex('visit_checkout.geo_comment',this.value);
				}
				this.$emit('getData',this.id,this.value)
			}
		}
	}
</script>

<style lang="scss" scoped>
	.location_model{
		.u-btn{
			height: 72rpx;
			line-height: 72rpx;
			font-size: 24rpx;
		}
		.active_btn{
			color: $color-31;
			background-color: #E9ECFF;
		}
	}
</style>
