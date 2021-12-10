// 获取医院列表
export const hospitalList = (params) => {
	return uni.$request.get('/app/hospitals/search',{
			...params
		}
	);
}
// 获取医院详情
export const hospitalDetail = (id,series_id) => {
	return uni.$request.get(`/app/hospitals/${id}`,{
		series_id
	});
}
// 我服务的医院列表
export const serveHosList = (params) => {
	return uni.$request.get(`/app/hospitals/serve`,{...params});
}
// 我服务的医院详情
export const serveHosDetail = (params) => {
	return uni.$request.get(`/app/serve/info-by-hospital`,{
		...params
	});
}
// 我服务的医院药品详情
export const serveDrugDetail = (id) => {
	return uni.$request.get(`/app/serve/serve-product/${id}`);
}
// 解除绑定服务
// 我服务的医院药品详情
export const offServe = (id) => {
	return uni.$request.post(`/app/serve/${id}/remove`);
}
// 申请服务医院
export const applyServe = (params) => {
	return uni.$request.post(`/app/serve/apply`,{
		...params
	});
}