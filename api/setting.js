// 用户反馈
export const sendFeedback = (paramsData) => {
	return uni.$request.post(
		'/app/feedback/add', {
			...paramsData
		}
	);
}
