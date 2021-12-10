
// 流向月报列表
export const transactionList = async () => {
	return uni.$request.get(
		'/app/transaction/products'
	)
}
// 流向月报详情
export const transactionDetail = async (id) => {
	return uni.$request.get(
		`/app/transaction/products/${id}`
	)
}
// 流向医院排行
export const hospitalRank = async (params) => {
	return uni.$request.get(
		`/app/transaction/products/${params.id}/hospital-rank`,
		{
			...params
		}
	)
};
// 流向月份列表
export const monthList = async (params) => {
	return uni.$request.get(
		`/app/transaction/products/${params.id}/month`,
		{
			...params
		}
	)
};
// 月度流向详情
export const monthFlowDetail = async (params) => {
	return uni.$request.get(
		`/app/transaction/products/${params.id}/details`,
		{
			...params
		}
	)
};
// 月度流向详情
export const flowHosSearch = async (params) => {
	return uni.$request.get(
		`/app/transaction/products/${params.id}/hospitals`,
		{
			...params
		}
	)
};