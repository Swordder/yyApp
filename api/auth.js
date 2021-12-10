// 身份认证提交
export const userVerify = async (params) => {
	return uni.$request.post(
		'/app/user/verify',
		{
			...params
		}
	)
}
// 获取身份认证信息
export const getVerifyInfo = async (params) => {
	return uni.$request.get(
		'/app/user/verify',
		{
			...params
		}
	)
}