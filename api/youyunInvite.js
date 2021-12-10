//医生邀请码
export const getDrQrCode = link_doctor_id => {
	return uni.$request.post('/app/aerogen/qrcode/doctor', {
		link_doctor_id
	})
}

//药店二维码
export const getStoreQrCode = () => {
	return uni.$request.get('/app/aerogen/qrcode/drugstore')
}

//获取医生列表
export const getDoctorList =() =>{
	return uni.$request.get('/app/aerogen/doctor/list')
}

//获取药店列表
export const getDrugStoreList = () => {
	return uni.$request.get('/app/aerogen/drugstore/list')
} 

//获取药店药品列表
export const getProductList = () => {
	return uni.$request.get('/app/aerogen/product/list')
}