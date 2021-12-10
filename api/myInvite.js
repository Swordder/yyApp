// 我的邀请列表
export const fetchMyInviteList = () => {
	return uni.$request.get(
		'/app/invite/list'
	);
}