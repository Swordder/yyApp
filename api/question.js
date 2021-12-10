// 问卷列表
export const getQuestionList = (params) => {
	return uni.$request.get(
		`/app/questionnaires`,
		{
			...params
		}
	);
}
// 问卷受邀人列表
export const getQuestionInvite = (id,params) => {
	return uni.$request.get(
		`/app/questionnaires/${id}/invitees`,
		{
			...params
		}
	);
}
// 问卷提醒作答
export const noticeAns = (params) => {
	return uni.$request.post(
		`/app/questionnaires/${params.invite_id}/notice-answer`,
		{
			...params
		}
	);
}
// 问卷重新提醒
export const reinvite = (params) => {
	return uni.$request.post(
		`/app/questionnaires/${params.invite_id}/re-invite`,
		{
			...params
		}
	);
}
// 可邀医生列表
export const docInviteList = (params) => {
	return uni.$request.get(
		`/app/questionnaires/${params.id}/doctors`,
		{
			...params
		}
	);
}
// 邀请医生
export const inviteDoc = (params) => {
	return uni.$request.put(
		`/app/questionnaires/${params.id}/invite`,
		{
			...params
		}
	);
}