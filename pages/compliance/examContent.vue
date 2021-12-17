<template>
	<view class="content u-p-t-40 u-p-l-40 u-p-r-40 u-p-b-40">
		<view class=" u-m-b-30">第{{curr_index+1}}/{{start_data.total}}题</view>
		<u-line-progress active-color="#5870FE" :percent="percent"></u-line-progress>
		<view class="qu_list">
			<view class="qu_list_item u-m-t-40">
				<view class="question u-flex u-row-left u-col-top u-m-b-40">
					<view class="u-m-r-20 qu_type">
						[{{questions.type.desc}}]
					</view>
					<view class="u-flex-1">
						{{questions.name}}
					</view>
				</view>
				<view class="answer">
					<view class="answer_item">
						<view 
						class=" u-flex u-row-left u-col-top u-m-b-30"
						v-if="questions.type.id == 1 || questions.type.id == 2" 
						v-for="item in questions.options"
						:key="item.id"
						@click="selectAnswer(item.id,questions.type.id)">
							<template v-if="questions.type.id == 1">
								<view class="u-m-r-20 qu_type">
									<text v-if="answer_ids[0] == item.id" class="custom-icon selected">&#xe601;</text>
									<text v-else class="custom-icon">&#xe668;</text>
								</view>
							</template>
							<template v-else-if="questions.type.id == 2">
								<view class="u-m-r-20 qu_type">
									<text v-if="answer_ids.indexOf(item.id) !=-1" class="custom-icon selected">&#xe620;</text>
									<text v-else class="custom-icon">&#xe69c;</text>
								</view>
							</template>
							<view class="u-flex-1" >
								{{item.name}}
							</view>	
						</view>
						<view class="" v-else-if="questions.type.id == 3">
							<u-input class="u-p-20" type="textarea" placeholder="请输入答案"></u-input>
						</view>
					</view>
				</view>
			</view>
		</view>
		<view class="fix_bt_btn u-flex u-p-30">
			<u-button class="add_btn u-m-r-20" shape="circle" @click="previousQu()">
				上一题
			</u-button>
		 	<u-button class="selected u-flex-1" type="primary" 
			shape="circle" hover-class="none" @click="nextQu()">
			{{(curr_index+1) == start_data.total?'交卷':'下一题'}}
			</u-button>
		</view>
		
	</view>
</template>

<script>
	import { examStart,examQuestion,examAnswer,examSubmit } from '@/api/compliance.js';
	export default {
		data() {
			return {
				curr_index:0,
				percent:0,
				start_data:{},
				questions:{
					name:'',
					options:[],
					question_id:'',
					type:{}
				},
				answer_ids:[],
				answer_content:'',
				answer_list:[],
			};
		},
		onLoad() {
			this.getStartData()
		},
		methods:{
			// 获取试卷初始数据
			async getStartData(){
				let res = await examStart(this.$Route.query.id);
				this.start_data = {...res.data};
				this.percent = (1/Number(res.data.total))*100;
				this.getQuestion(res.data.next_question_id,res.data.request_id);
			},
			// 获取每个试题
			async getQuestion(question_id,request_id){
				let params = {
					id:this.$Route.query.id,
					question_id,
					request_id
				};
				let res = await examQuestion(params);
				this.questions = {...res.data};
			},
			// 选择或输入答案
			selectAnswer(answer_id,qu_type){
				let index = this.answer_ids.indexOf(answer_id);
				// 判断试题类型并进行答题
				switch (qu_type){
					case 1:
						if(this.answer_ids.length == 0){
							this.answer_ids.push(answer_id);
						} else {
							this.answer_ids.splice(index,1,answer_id);
						}
						break;
					case 2:
						if(index == -1){
							this.answer_ids.push(answer_id);
						} else {
							this.answer_ids.splice(index,1);
						}
						break;
					case 3:
						break;
					default:
						break;
				}
			},
			// 答题
			answerQu(){
				let id = this.$Route.query.id;
				let params = {
					id,
					question_id:this.questions.question_id,
					request_id:this.start_data.request_id,
					option_ids:this.answer_ids,
					content:this.answer_content
				};
				return examAnswer(params);
			},
			// 上一题
			previousQu(){
				if(this.curr_index == 0){
					this.$u.toast('已经是第一题')
					return
				};
				this.percent = this.curr_index/this.start_data.total*100;
				let index = this.curr_index-1;
				this.curr_index = index;
				this.getQuestion(this.answer_list[index].question_id,this.start_data.request_id);
				this.answer_ids = [...this.answer_list[index].answer_ids];
				this.answer_content = this.answer_list[index].answer_content;
			},
			// 下一题
			async nextQu(){
				// 判断本题是否已作答
				if(this.answer_ids.length === 0){
					this.$u.toast('请对本题作答');
					return
				};
				// 作答则提交当前答案
				let res = await this.answerQu();
				let result = res.data.result;
				if(res.errcode != 0){
					this.$u.toast(res.errmsg)
					return
				};	
				// 判断是否是最后一题,若是，则交卷并跳转结果页面
				if(result.is_last == 1){
					let params = {
						id:this.$Route.query.id,
						request_id:this.start_data.request_id
					}
					
					let res = await examSubmit(params);
					if(res.errcode != 0){
						this.$u.toast(res.errmsg)
						return
					};
					this.$Router.push({
						path:'/pages/compliance/examResult',
						query:{
							...params,
							...res.data.result
						}
					})
					return
				} else if(result.is_last == 0){
					console.log(2)
					// 判断答题列表是否为空，并保存当前答题
					let len = this.answer_list.length;
					let count = 0;
					let curr_index = this.curr_index;
					let answer_obj = {
						question_id:this.questions.question_id,
						answer_ids:this.answer_ids,
						answer_content:this.answer_content,
						curr_index
					};
					if(len === 0){
						// 若为空，则push当前题目答案,并获取下一题
						this.answer_list.push(answer_obj);
						let next_qu_res = await this.getQuestion(result.next_question_id,this.start_data.request_id);
						if(res.errcode != 0){
							this.$u.toast(res.errmsg)
							return
						};
						this.answer_ids = [];
						this.answer_content = '';
					} else {
						// 先验证当前答案是否已存在于答题列表
						// 若存在，则重新更新答案，
						this.answer_list.forEach((item,index) => {
							if(answer_obj.question_id == item.question_id){
								this.answer_list.splice(index,1,answer_obj);
							} else {
								count++
							} 
							if(this.answer_list.length == count){
								this.answer_list.push(answer_obj);
								this.answer_ids = [];
								this.answer_content = '';
							}
						})
						// 再获取下一题，并验证下一题是否也已存在于答题列表
						let next_qu_res = await this.getQuestion(result.next_question_id,this.start_data.request_id);
						if(res.errcode != 0){
							this.$u.toast(res.errmsg)
							return
						};
						let next_count = 0;
						this.answer_list.forEach((item,index) => {
							if(result.next_question_id == item.question_id){
								this.answer_ids = [...item.answer_ids];
								this.answer_content = item.answer_content;
							} else {
								next_count++
							} 
							if(len == next_count){
								this.answer_ids = [];
								this.answer_content = '';
							}
						})
					}
					this.curr_index++;
					let num = this.curr_index+1;
					this.percent = num/this.start_data.total*100;
				}
			},
		}
	}
</script>

<style lang="scss" scoped>
.qu_list_item{
	padding-bottom: 10rpx;
	.question{
		font-weight: bold;
		.qu_type{
			color: $color-31;
		}	
	}	
}
.answer_item{
	color: $color-x6;
	.custom-icon{
		font-size: 40rpx;
	}
	.selected{
		color: $color-31;
	}
}
</style>
