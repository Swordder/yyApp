// 用户积分信息
export const fetchAllIntegralMsg = (paramsData = {}) => {
	return uni.$request.get(
		'/app/points/user-total', {
			...paramsData
		}
	);
}

// 用户积分明细
export const fetchIntegralDetail = (paramsData = {}) => {
	return uni.$request.get(
		'/app/points', {
			...paramsData
		}
	);
}

// 积分商品列表
export const fetchIntegralGoodsList = (paramsData = {}) => {
	return uni.$request.get(
		'/app/points/goods', {
			...paramsData
		}
	);
}

// 积分商品详情
export const fetchIntegralGoodsInfo = (paramsData = {}) => {
	return uni.$request.get(
		'/app/points/goods/info', {
			...paramsData
		}
	);
}

// 兑换积分商品
export const exchangeIntegralGoods = (paramsData = {}) => {
	return uni.$request.put(
		'/app/points/exchange', {
			...paramsData
		}
	);
}