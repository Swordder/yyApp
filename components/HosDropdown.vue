<template>
	<u-dropdown ref="uDropdown" @open="open" @close="close">
		<u-dropdown-item :title="selected.province.name">
			<view class="slot-content u-flex u-row-between u-col-top" style="background-color: #FFFFFF;">
				<scroll-view class="select_l_item" scroll-y="true" style="height: 60vh;width: 300rpx">
					<view
						class="select_item u-p-l-30 u-p-r-30 u-flex u-row-between"
						:class="{ selected: selected.province.id == item.id }"
						v-for="item in province"
						:key="'province-' + item.id"
						@click="getCitys(item)"
					>
						<text>{{ item.name }}</text>
						<u-icon name="checkbox-mark" v-if="selected.province.id == item.id"></u-icon>
					</view>	
				</scroll-view>
				<scroll-view class="select_r_item" scroll-y="true" style="height: 60vh;">
					<view
						class="select_item u-p-l-30 u-p-r-30 u-flex u-row-between"
						:class="{ selected: selected.city.id == item.id }"
						v-for="item in city"
						:key="'city' + item.id"
						@click="selectAera(item)"
					>
						<text>{{ item.name }}</text>
						<u-icon name="checkbox-mark" v-if="selected.city.id == item.id"></u-icon>
					</view>		
				</scroll-view>
			</view>
		</u-dropdown-item>
		<u-dropdown-item title="等级">
			<view class="slot-content" style="background-color: #FFFFFF;">
				<scroll-view scroll-y="true" :style="scroll_style">
					<view class="">
						<u-section class="u-p-l-30 u-p-r-30 u-p-t-20 u-p-b-20" title="医院等级" line-color="#5870FE" :right="false" :bold="false"></u-section>
						<view class="u-flex u-p-l-30 u-p-r-30">
							<view 
							class="hos_level u-text-center u-content-color u-m-t-20 u-m-b-20 u-m-r-20"
							:class="{curr_level:select_level.indexOf(item.id) != -1}"
							v-for="item in hos_level" :key="item.id"
							@click="selectCons(item.id,select_level)">{{item.value}}</view>	
						</view>	
					</view>
					<view v-show="type == 'apply'" class="">
						<view class="">
							<u-section class="u-p-l-30 u-p-r-30 u-p-t-20 u-p-b-20" title="进药状态" line-color="#5870FE" :right="false" :bold="false"></u-section>
							<view class="u-flex u-p-l-30 u-p-r-30">
								<view 
								class="hos_level u-text-center u-content-color u-m-t-20 u-m-b-20 u-m-r-20"
								v-for="item in medicine_status" :key="item.id"
								:class="{curr_level:select_medic.indexOf(item.id) != -1}"
								@click="selectCons(item.id,select_medic)"
								>{{item.value}}</view>	
							</view>	
						</view>
						<view class="">
							<u-section class="u-p-l-30 u-p-r-30 u-p-t-20 u-p-b-20" title="其他" line-color="#5870FE" :right="false" :bold="false"></u-section>
							<view class="u-flex u-p-l-30 u-p-r-30">
								<view 
								class="hos_level u-text-center u-content-color u-m-t-20 u-m-b-20 u-m-r-20"
								v-for="item in other" :key="item.id"
								:class="{curr_level:can_apply.indexOf(item.id) != -1}"
								@click="selectCons(item.id,can_apply)"
								>{{item.value}}</view>	
							</view>	
						</view>
					</view>
				</scroll-view>
				<view class="btns u-flex">
					<u-button class="reset" :hair-line="false" type="" @click="resetCondition">重置</u-button>
					<u-button class="select_level" :hair-line="false" type="primary" @click="selectCondition">确定</u-button>
				</view>
			</view>
		</u-dropdown-item>
	</u-dropdown>
</template>

<script>
	import { getProvince, getCity } from '@/api/common.js';
	export default {
		name:"HosDropdown",
		props:['type'],
		data() {
			return {
				scroll_style:{
					height: "200rpx"
				},
				province: [],
				city: [],
				selected: {
					province: {},
					city: {},
					level: {}
				},
				hos_level:[
					{
						value:'三级',
						show:false,
						id:8
					},
					{
						value:'二级',
						show:false,
						id:4
					},
					{
						value:'一级',
						show:false,
						id:2
					},
					{
						value:'未定级',
						show:false,
						id:1
					}
				],
				select_level:[],
				select_medic:[],
				can_apply:[],
				level:'',
				medic:'',
				others:'',
				medicine_status:[
					{
						value:'未进药',
						show:false,
						id:2
					},
					{
						value:'已进药',
						show:false,
						id:1
					}
				],
				other:[
					{
						value:'可申请',
						show:false,
						id:1
					},
				],
			};
		},
		mounted() {
			// 判断从哪里过来的
			if(this.type == 'apply'){
				this.scroll_style.height = '540rpx';
			} else {
				this.scroll_style.height = '200rpx';
			}
			this.getTotalPtovince()
		},
		methods:{
			// 获取全部省市数据
			async getTotalPtovince(){
				let res = await getProvince();
				this.province = [{id:0,name:'全国'},...res.data.list];
				this.selected.province = {id:0,name:'全国'};
				this.city = [{id:0,name:'全部'}];
				this.selected.city = {id:0,name:'全部'};
			},
			async getCitys(obj){
				
				let result = [];
				
				// 获取目标省份下属城市( 0为全国, 会有报错信息)
				if(obj.id != 0) {
					const res = await getCity(obj.id);
					result = res.data.list
				}
				
				this.city = [{id:0,name:'全部'}, ...result];
				this.selected.province = { ...obj };
			},
			selectAera(obj){
				this.selected.city = {...obj};
				this.level = this.select_level.length !== 0?this.select_level.reduce((prev,curr) => {
					return Number(prev)+Number(curr) 
				}):'';
				this.$emit('search',this.selected,this.level);
				this.$refs.uDropdown.close();
			},
			// 选择筛选条件
			selectCons(id,type_condition){
				let index = type_condition.indexOf(id);
				if(type_condition.indexOf(id) == -1){
					type_condition.push(id);
				} else {
					type_condition.splice(index,1)
				}
			},
			// 重置
			resetCondition(){
				this.select_level = [];
				this.select_medic = [];
				this.can_apply = [];
			},
			// 确定筛选等级
			selectCondition(){
				this.level = this.select_level.length !== 0?this.select_level.reduce((prev,curr) => {
					return Number(prev)+Number(curr) 
				}):'';
				this.medic = this.select_medic.length !== 0?this.select_medic.reduce((prev,curr) => {
					return Number(prev)+Number(curr) 
				}):'';
				this.others = this.can_apply.length !== 0?this.can_apply.reduce((prev,curr) => {
					return Number(prev)+Number(curr) 
				}):'';
				this.$emit('search',this.selected,this.level,this.medic,this.others);
				this.$refs.uDropdown.close();
			},
			open(index) {
				// 展开某个下来菜单时，先关闭原来的其他菜单的高亮
				// 同时内部会自动给当前展开项进行高亮
				this.$refs.uDropdown.highlight();
			},
			close(index) {
				// 关闭的时候，给当前项加上高亮
				// 当然，您也可以通过监听dropdown-item的@change事件进行处理
				this.$refs.uDropdown.highlight(index);
			},
		}
	}
</script>

<style lang="scss" scoped>
.select_item{
	line-height: 80rpx;
}
.select_l_item{
	// width: 40%;
	background-color: $color-f5;
}
.select_r_item{
	flex: 1;
}
.selected{
	background-color: $color-xf;
	color: $color-31;
}
.hos_level{
	width: 160rpx;
	line-height: 60rpx;
	color: $color-x9;
	border: 2rpx solid $color-xd;
	border-radius: 4rpx;
}
.reset{
	width: 240rpx;
	color: $color-31;
	border-top: 2rpx solid $color-31;
	background-color: $color-xf;
	border-radius: 0;
}
.select_level{
	flex: 1;
	border-radius: 0;
	background-color: $color-31;
}
.curr_level{
	color: $color-31;
	background-color: #DEE2FF;
	border-color: $color-31;
}
</style>
