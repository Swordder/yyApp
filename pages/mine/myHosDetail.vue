<template>
	<view class="content u-p-30">
		<view class="u-m-b-40">
			<view class="hos_name u-font-36 u-m-b-10">
				{{hos_info.hospital_name}}
			</view>
			<view class="u-m-b-12">
				<u-button
				hover-class="none"
				v-show="hos_info.hospital_level"
				class="u-m-r-12" type="primary" size="mini" shape="circle" 
				:style="{'backgroundColor':'#E9ECFF','color':'#5870FE'}">
				{{hos_info.hospital_level}}
				</u-button>
			</view>
			<view class="hospital_add">
				<u-icon class="u-m-r-20" name="map" color="#5870FE" size="36"></u-icon>
				{{hos_info.hospital_addr}}
			</view>
		</view>
		<view class="serve_drug_list">
			<view 
			class="serve_drug_item u-p-l-40 u-p-r-40 u-m-b-30" 
			v-for="(item,index) in list" 
			:key="item.id">
			<view class="serve_header u-p-t-30 u-p-b-30">
				<view class="u-flex u-row-between">
					<view class="u-font-32 drug_name">
						{{item.name}}
					</view>
					<view class="">
						<u-button 
						class="bind_serve"
						v-if="item.status.status == 1" 
						size="mini" shape="circle" hover-class="none" 
						@click="open(item.id)"
						>{{item.status.desc}}
						</u-button>
						<view v-else class="off_serve">
							解除服务审核中
						</view>
					</view>
				</view>	
				<view class="star u-flex u-row-left u-m-t-20 u-font-24">
					<view class="">
						服务评级
					</view>
					<u-rate disabled active-color="#FFDB4F" inactive-color="#b2b2b2" gutter="20" :current="item.star"></u-rate>
				</view>
				<view v-show="item.status.status != 0" class="">
					<view v-if="data_list[index]" class="charts-box u-m-t-20">
						<qiun-data-charts type="demotype" :opts="serviceReportConfig" :chartData="data_list[index].chart" />
					</view>
					<view v-show="show_id == index">
						<u-line class="u-m-t-40 u-m-b-40"></u-line>
						<view v-if="data_list[index]">
							<BaseShow :data="data_list[index].current_month" :title_type="1"></BaseShow>
						</view>
						<u-line class="u-m-t-40 u-m-b-40"></u-line>
						<view v-if="data_list[index]" class="">
							<BaseShow :data="data_list[index].last_three_month" :title_type="1"></BaseShow>
						</view>
						<u-line class="u-m-t-40 u-m-b-40"></u-line>
						<view v-if="data_list[index]" class="history_data">
							<view class="u-m-b-20">
								历史数据
							</view>
							<view class="u-text-center u-m-b-20">
								<view class="total font_bold">
									{{data_list[index].overview.total?data_list[index].overview.total:'无数据'}}
								</view>
								<view class="font_10">
									总计
								</view>
							</view>
							<view class="u-flex u-text-center">
								<view class="u-flex-1">
									<view class="">
										{{data_list[index].overview.max?data_list[index].overview.max:'无数据'}}
									</view>
									<view class="font_10">
										单月最高（{{data_list[index].overview.month?data_list[index].overview.month:'无数据'}})
									</view>
								</view>
								<view class="u-flex-1">
									<view class="">
										{{data_list[index].overview.avg?data_list[index].overview.avg:'无数据'}}
									</view>
									<view class="font_10">
										月平均
									</view>
								</view>
							</view>
						</view>
						<u-line class="u-m-t-40 u-m-b-40"></u-line>
						<view class="btns u-flex">
							<u-button shape="circle" size="medium" hover-class="none" :custom-style="customStyle1" @click="err_correction.show = true">纠错</u-button>
							<u-button shape="circle" size="medium" hover-class="none" :custom-style="customStyle2" @click="toNextPage('/pages/report/historyFlow',item.product_id)">查看历史流向明细</u-button>
						</view>
					</view>
					<u-line class="u-m-t-40"></u-line>	
					<view
					class="collapse u-text-center u-p-t-30"
					@click="collapseShow(index)">
						<text v-if="show_id == index" class="custom-icon u-m-r-16 font_bold u-font-40">&#xe626;</text>
						<text v-else class="custom-icon u-m-r-16 font_bold u-font-40">&#xe66a;</text>
						{{show_id != index?'点击查看更多':'收起'}}
					</view>
				</view>
				<view v-show="item.status.status == 0" class="u-text-center u-m-b-20 u-m-t-40">
					<u-image width="176" mode="widthFix" :style="{margin:'0 auto'}" src="http://img.youyao99.com/639F0D88ECAB5C70E41BF08EC343CB65.png"></u-image>
					<view class="u-font-24">审核中</view>
				</view>
			</view>
			</view>
		</view>
		<!-- modeal层  -->
		<ErrorCorrection :err_correct_con="err_correction" @submitCon="submitHelp"></ErrorCorrection>
		<view class="">
			<u-modal 
			v-model="show" title="解除服务须知" 
			:title-style="{fontWeight: 'bold'}" 
			show-cancel-button
			:content-style="{fontSize:'28rpx',lineHeight:'40rpx',color:'#666666'}"
			:confirm-style="{color:'#5870FE'}"
			@confirm="offServe()">
				<view class="slot-content u-p-40">
					<view class="u-m-b-20">
						1.解除服务后，其他优药代表将可以申请在该医院服务该药品
					</view>
					<view class="u-m-b-20">
						2.解除服务需要平台进行审核，审核时间一般为3个工作日以内
					</view>
					<view class="">
						3.平台审核通过后，服务解除将会在次月一日正式生效
					</view>
				</view>
			</u-modal>
		</view>
	</view>
</template>
<script>
	import BaseShow from '@/components/report/BaseShow.vue';
	import ErrorCorrection from '@/components/report/ErrorCorrection.vue';
	import { serveHosDetail, offServe, serveDrugDetail } from '@/api/hospital.js';
	export default {
		data(){
			return {
				hos_info:{},
				list:[],
				data_list:[],
				show:false,
				err_correction:{
					show:false,
					content:''
				},
				product_id:'',
				show_id : -1,
				customStyle1:{
					color:'#5870FE'
				},
				customStyle2:{
					backgroundColor:'#5870FE',
					color:'#ffffff'
				},
			}
		},
		components:{
			BaseShow,
			ErrorCorrection
		},
		onLoad() {
			this.getHosDetail()
		},
		methods:{
			async getHosDetail(){
				let res = await serveHosDetail({
					hospital_id:this.$Route.query.hospital_id
				});
				this.hos_info = {...res.data.info};
				this.list = [...res.data.list];
				res.data.list.map(async item => {
					let per_obj = {},categories = [],data_obj = {name:'',data:[]};
					let data_res = await serveDrugDetail(item.id);
					let rows = data_res.data.chart.rows;
					for(let i = 0; i < rows.length ; i ++){
						categories.push(rows[i].date);
						data_obj.data.push(rows[i].num);
					};
					let chart_obj = {
						categories:[...categories],
						series:[]
					};
					chart_obj.series.push({...data_obj});
					data_res.data.current_month.title = '当月数据';
					per_obj = Object.assign({chart:{},current_month:{},last_three_month:{},overview:{}},{...data_res.data},{chart:chart_obj}) ;
					this.data_list.push({
						...per_obj
					});
				})
			},
			open(id){
				this.show = true;
				this.product_id = id;
			},
			async offServe(){
				let res = await offServe(this.product_id);
				if(res.errcode == 0){
					this.$u.toast('解绑服务申请成功');
					this.getHosDetail();
				}
			},
			async submitHelp(){
				if(this.err_correction.content == ''){
					this.$u.toast('请输入修改内容');
					this.err_correction.show = true;
					return
				}
				let params = {
					content:this.err_correction.content,
					type:4,
					mail:''
				};
				let res = await forHelp(params);
				if(res.data.errcode == 0){
					this.$u.toast('提交成功');
					return
				} else {
					this.$u.toast(res.errmsg);
				}
			},
			collapseShow(index){
				if(this.show_id === index){
					this.show_id = -1;
				} else {
					this.show_id = index;
				}
			},
			toNextPage(path,id){
				this.$Router.push({
					path,
					query:{
						id,
						hospital_id:this.$Route.query.hospital_id
					}
				})
			}
		}
	}
</script>
<style lang="scss" scoped>
	.hos_name{
		font-weight: bold;
	}
	.serve_drug_item{
		box-shadow: 0px 4rpx 24rpx 0px rgba(204, 213, 224, 0.5);
		border-radius: 8rpx;
		.drug_name{
			font-weight: bold;
		}
		.bind_serve{
			color: $color-31;
		}
		.off_serve{
			color: #FF982A;
		}
		.star{
			color: $color-x6;
		}
	}
	.history_data{
		.total{
			font-size: 44rpx;
		}
		.font_10{
			transform-origin: center;
			color: $color-x9;
		}
	}
	.collapse{
		color: $color-31;
	}
</style>
