// 消息列表
export const fetchNewsList = (params) => {
	return uni.$request.get(
		`/app/message/list`,
		{
			...params
		}
	)
};

// 消息详情
export const fetchNewsDetail = (msg_yyid) => {
	return uni.$request.get(
		`/app/message/detail`,
		{
			msg_yyid
		}
	)
};