<template>
	<u-dropdown ref="uDropdown" border-bottom style="background-color: #FFFFFF;" @open="open" @close="close">
		<u-dropdown-item :title="selected.province.name || $attrs.curProvince.name || '省'">
			<view class="slot-content" style="background-color: #FFFFFF;">
				<scroll-view scroll-y="true" style="height: 60vh;">
					<view
						class="select-item u-p-20 u-flex u-row-between"
						:class="{ selected: selected.province.id == item.id }"
						v-for="item in province"
						:key="'province-' + item.id"
						@click="selectDistrict('province', item)"
					>
						<text>{{ item.name }}</text>
						<u-icon name="checkbox-mark" v-if="selected.province.id == item.id"></u-icon>
					</view>
				</scroll-view>
			</view>
		</u-dropdown-item>
		<u-dropdown-item :title="selected.city.name || $attrs.curCity.name || '市'">
			<view class="slot-content" style="background-color: #FFFFFF;">
				<scroll-view scroll-y="true" style="height: 60vh;">
					<view
						class="select-item u-p-20 u-flex u-row-between"
						:class="{ selected: selected.city.id == item.id }"
						v-for="item in city"
						:key="'city-' + item.id"
						@click="selectDistrict('city', item)"
					>
						<text>{{ item.name }}</text>
						<u-icon name="checkbox-mark" v-if="selected.city.id == item.id"></u-icon>
					</view>
				</scroll-view>
			</view>
		</u-dropdown-item>
		<u-dropdown-item :title="selected.level.name || '医院等级'">
			<view class="slot-content" style="background-color: #FFFFFF;">
				<scroll-view scroll-y="true" style="height: 60vh;">
					<view
						class="select-item u-p-20 u-flex u-row-between"
						:class="{ selected: selected.level.id == item.id }"
						v-for="(item, index) in hos_level"
						:key="index"
						@click="selectDistrict('level', item)"
					>
						<text>{{ item.name }}</text>
						<u-icon name="checkbox-mark" v-if="selected.level.id == item.id"></u-icon>
					</view>
				</scroll-view>
			</view>
		</u-dropdown-item>
	</u-dropdown>
</template>

<script>

import { getProvince, getCity } from '@/api/common.js';
export default {
	name: 'district',
	data() {
		return {
			province: [],
			city: [],

			hos_level: [
				{
					name: '全部',
					id: ''
				},
				{
					name: '三级',
					id: 8
				},
				{
					name: '二级',
					id: 4
				},
				{
					name: '一级',
					id: 2
				},
				{
					name: '未定级',
					id: 1
				}
			],

			selected: {
				province: {},
				city: {},
				level: {}
			}
		};
	},

	created() {
		this.fetchDistrict('province');
	},

	methods: {
		// 获取行政区域
		fetchDistrict(type) {
			// if (type == 'city' && !this.selected.province.id) {
			// 	this.$u.toast('请选择省份!');
			// 	return;
			// }
			
			const MOTHOD = {
				province: getProvince,
				city: getCity
			}
			
			let paramsId = ''
			
			if(type == 'city') {
				paramsId = this.selected.province.id
			}
			

			MOTHOD[type](paramsId).then(res => {
				console.log(res);
				
				if (type == 'province') {
					this.province = [{id: '', name: '全国'},...res.data.list];
				} else if (type == 'city') {
					this.city = res.data.list;
				}
			});
		},

		// 选择行政区域
		selectDistrict(type, item) {
			const emitData = {}
			if (type == 'province') {
				this.selected.province = {}
				this.selected.city = {}
				this.selected.province = { ...item };
			} else if (type == 'city') {
				this.selected.city = { ...item };
			} else if (type == 'level') {
				this.selected.level = { ...item };
			}

			uni.$emit('hospitalDistrict', this.selected);
			this.$refs.uDropdown.close();
		},

		async open(index) {
			if (index == 1 && !this.selected.province.id) {
				this.$u.toast('请选择省份!');
				this.$refs.uDropdown.close();
				return;
			} else if ( index == 1) {
				await this.fetchDistrict('city')
			}
			// 展开某个下来菜单时，先关闭原来的其他菜单的高亮
			// 同时内部会自动给当前展开项进行高亮
			this.$refs.uDropdown.highlight();
		},
		close(index) {
			// 关闭的时候，给当前项加上高亮
			// 当然，您也可以通过监听dropdown-item的@change事件进行处理
			this.$refs.uDropdown.highlight(index);
		}
	}
};
</script>

<style lang="scss" scoped>
.select-item {
	height: 90rpx;
	&.selected {
		color: $color-31;
	}
}
</style>
