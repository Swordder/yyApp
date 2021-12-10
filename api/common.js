// 获取省份
export const getProvince = () => {
	return uni.$request.get(`/app/region/provinces`);
}
// 获取城市
export const getCity = (id) => {
	return uni.$request.get(`/app/region/provinces/${id}/city`);
}
// 公司列表
export const companyList = (params) => {
	return uni.$request.get('/app/company',{
		...params
	});
}
// 治疗领域
export const adaptions = (params) => {
	return uni.$request.get('/app/adaptions/field',{
		...params
	});
}
// 适应症
export const indication = (params) => {
	return uni.$request.get('/app/adaptions/adaption',{
		...params
	});
}
// 科室
export const departments = (params) => {
	return uni.$request.get('/app/departments',{
		...params
	});
}
// 图片上传或者更新
// 获取token
export const getPicToken = (params) => {
	return uni.$request.post('/app/upload/token',{
		...params
	});
}
// 记录上传文件/app/upload
export const uploadFile = (params) => {
	return uni.$request.put('/app/upload',{
		...params
	});
}
// 获取地理位置
export const location = (params) => {
	return uni.$request.get('/app/geo',{
		...params
	});
}
// 获取服务的药品
export const serveSeries = () => {
	return uni.$request.get('/app/serve/series');
}
// 获取或者添加服务的科室
export const serveDeps = (params={}) => {
	if(Object.keys(params).indexOf('keywords') !== -1){
		return uni.$request.get(
			'/app/departments/serve',
			{
				...params
			},
		);	
	} else {
		return uni.$request.put(
			'/app/departments/serve',
			{
				...params
			},
		);	
	}
}
// 添加或者获取医生
export const serveDoctor = (params={}) => {
	if(Object.keys(params).indexOf('keywords') !== -1){
		return uni.$request.get(
			'/app/visits/doctors',
			{
				...params
			},
		);	
	} else {
		return uni.$request.put(
			'/app/visits/doctors',
			{
				...params
			},
		);	
	}
}

