// 修改头像
export const updateAvatar = async (data) => {
	return uni.$request.post(
		'/app/user/avatar',
		{
			...data
		}
	)
}
// 修改手机号
export const updateMobile = async (data) => {
	return uni.$request.post(
		'/app/user/mobile',
		{
			...data
		}
	)
}
// 个人二维码
export const fetchMyQrcode = (data) => {
	return uni.$request.get(
		'/app/user/qrcode'
	)
}
// 求助
export const forHelp = (params) => {
	return uni.$request.post(
		'/app/user/help',
		{
			...params
		}
	)
}
