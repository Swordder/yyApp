// 微信登录
export const wxLogin = async (data) => {
	return uni.$request.post(
		'/app/auth/wechat',
		{
			...data
		}
	)
}
// 发送验证码
export const sendCode = async (data) => {
	return uni.$request.post(
		'/app/sms/verify',
		{
			...data
		}
	)
}
// 微信绑定手机号登录
export const wxMobilLogin = (data) => {
	return uni.$request.put(
		'/app/auth/wechat-bind-mobile',
		{
			...data
		}
	)
}
// 检查是否绑定手机号
export const checkBind = () => {
	return uni.$request.get(
		'/app/user/check-bind-mobile'
	)
}

// 记录更新微信信息
export const recordWechatInfo = (data) => {
	return uni.$request.put(
		'/app/wechat/record',
		{
			...data
		}
	)
}
// 获取用户信息
export const getUserInfo = () => {
	return uni.$request.get('/app/user');
}
// 退出登录
export const logout = () => {
	return uni.$request.post('/app/auth/logout')
}