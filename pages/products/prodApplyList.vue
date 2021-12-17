<template>
	<view class="content u-p-30">
		<u-cell-group>
			<u-cell-item 
				v-for="(item,index) in apply_names"
				:key = "index"
				class="u-m-b-20 u-p-t-14 u-p-b-14" 
				bg-color="#F3F4F5" 
				:border-bottom="false" 
				:title="item"
				@click="toApplyDetail(index)">
			</u-cell-item>
		</u-cell-group>
	</view>
</template>
<script>
	export default {
		data(){
			return {
				apply_type:'',
				apply_names:[]
			}
		},
		onLoad() {
			this.applyType()
		},
		methods:{
			applyType(){
				let type = this.$Route.query.type;
				type = type.toString();
				switch (type){
					case '1':
						this.apply_type = '产科'
						break;
					case '2':
						this.apply_type = '肾科'
						break;
					case '3':
						this.apply_type = '全科'
						break;
					default:
						this.apply_type = ''
						break;
				};
				this.apply_names = [`力蜚能${this.apply_type}PPT`,`力蜚能${this.apply_type}DA`]
			},
			toApplyDetail(index){
				this.$Router.push({
					path:'/pages/products/prodApplyDetail',
					query:{
						type:this.$Route.query.type,
						apply_type:index
					}
				})
			},
		}
	}
</script>
<style lang="scss" scoped>
	
</style>
