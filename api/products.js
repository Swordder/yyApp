// 产品详情
export const productDetail = (series_id) => {
	return uni.$request.get(`/app/series/${series_id}?id=${series_id}`);
}
// 查看说明书/app/products/{id}/manual
export const productIntro = (prod_id) => {
	return uni.$request.get(`/app/products/${prod_id}/manual?id=${prod_id}`);
}
// 产品文献和解读
export const productInterpret = (prod_id,current,limit) => {
	return uni.$request.get(`/app/products/${prod_id}/interpret?id=${prod_id}&current=${current}&limit
=${limit}`);
}
// 文献详情
export const interpretDetail = (interpret_id) => {
	return uni.$request.get(`/app/interprets/${interpret_id}?id=${interpret_id}`);
}