// 收藏夹列表
export const fetchCollectList = (params) => {
	return uni.$request.get(
		`/app/favorites/list`
	)
};

// 收藏夹详情
export const fetchCollectDetail = (params) => {
	return uni.$request.get(
		`/app/favorites/detail`,
		{
			...params
		}
	)
};

// 新建收藏夹
export const createCollect = (params) => {
	return uni.$request.post(
		`/app/favorites/add`,
		{
			...params
		}
	)
};

// 删除收藏夹
export const deleteCollect = (params) => {
	console.log(params);
	return uni.$request.put(
		`/app/favorites/delete`,
		{
			...params
		}
	)
};

// 重命名收藏夹
export const renameCollect = (params) => {
	return uni.$request.put(
		`/app/favorites/rename`,
		{
			...params
		}
	)
};

// 收藏夹添加内容
export const collectAddContent = (params) => {
	return uni.$request.post(
		`/app/favorites/resource/add`,
		{
			...params
		}
	)
};

// 收藏夹删除内容
export const collectdelContent = (params) => {
	return uni.$request.put(
		`/app/favorites/resource/delete`,
		{
			...params
		}
	)
};