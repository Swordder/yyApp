// 获取知识列表
export const knowledgeList = async (params) => {
	return uni.$request.get(
		'/app/knowledge/search',
		{
			...params
		}
	)
}
// 顶层目录
export const topDir = async () => {
	return uni.$request.get(
		'/app/knowledge/top-dirs'
	)
}
// 知识库树状列表
export const knowledgeTree = async (params) => {
	return uni.$request.get(
		'/app/knowledge',
		{
			...params
		}
	)
};
// 知识库详细资料
export const knowledgeDetail = async (id,params) => {
	return uni.$request.get(
		`/app/knowledge/${id}`,
		{
			...params
		}
	)
};
// 考试
// 考试列表
export const examList = async (params) => {
	return uni.$request.get(
		`/app/exams`,
		{
			...params
		}
	)
};
// 考试详情
export const examDetail = async (id) => {
	return uni.$request.get(
		`/app/exams/${id}`
	)
};
// 开始考试
export const examStart = async (id) => {
	return uni.$request.post(
		`/app/exams/${id}/start`
	)
};
// 获取考试试题
export const examQuestion = async (params) => {
	return uni.$request.get(
		`/app/exams/${params.id}/question`,
		{
			...params
		}
	)
};
// 考试回答题目
export const examAnswer = async (params) => {
	return uni.$request.post(
		`/app/exams/${params.id}/answer`,
		{
			...params
		}
	)
};
// 考试交卷
export const examSubmit = async (params) => {
	return uni.$request.post(
		`/app/exams/${params.id}/submit`,
		{
			...params
		}
	)
};
// 试题回顾
export const examReview = async (params) => {
	return uni.$request.get(
		`/app/exams/${params.id}/review`,
		{
			...params
		}
	)
};
// 获取考试协议
export const examAgreement = async (type,params) => {
	if(type == '1'){
		return uni.$request.get(
			`/app/exams/${params.id}/agreement`
		)
	} else if(type == 2){
		return uni.$request.post(
			`/app/exams/${params.id}/agreement`,
			{
				...params
			}
		)
	}
};
// 试题回顾
export const examAgreeView = async (params) => {
	return uni.$request.get(
		`/app/exams/${params.id}/agree-view`,
		{
			...params
		}
	)
};