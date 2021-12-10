
export const productList = () => {
	return uni.$request.get('/app/products');
}