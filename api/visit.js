// 拜访类型判断
export const checkType = (value) => {
	let check_type_obj = {};
	switch (value){
		case 1:
			check_type_obj = {
				value:1,
				label:'面对面拜访'
			}
			break;
		case 2:
			check_type_obj = {
				value:2,
				label:'线上拜访'
			}
			break;
		case 3:
			check_type_obj = {
				value:3,
				label:'内部会议'
			}
			break;	
		case 4:
			check_type_obj = {
				value:4,
				label:'外部会议'
			}
			break;
		case 5:
			check_type_obj = {
				value:5,
				label:'行政工作'
			}
			break;
		default:
			break;
	}
	return check_type_obj;
}
// 签入
export const checkin = async (params) => {
	return uni.$request.put(
		`/app/visits/check-in`,
		{
			...params
		}
	)
};
// 签入编辑详情
export const checkEditDetail = async (params) => {
	return uni.$request.get(
		`/app/visits/${params.id}`
	)
};
// 签入编辑提交
export const checkinEdit = async (id,params) => {
	return uni.$request.post(
		`/app/visits/check-in/${id}`,
		{
			...params
		}
	)
};
// 检查地理位置是否正确
export const checkGeo = async (params) => {
	return uni.$request.post(
		'/app/visits/check-geo',
		{
			...params
		}
	)
};
// 获取拜访地理位置配置
export const visitCheckConfig = async (params) => {
	return uni.$request.get(
		`/app/visits/config`,
		// `​/app​/visits​/config`,
		{
			...params
		}
	)
};
// 签入列表
export const visitList = async (params) => {
	return uni.$request.post(
		'/app/visits',
		{
			...params
		}
	)
}
// 签出新增详情
export const checkOutInfo = async (params) => {
	return uni.$request.get(
		`/app/visits/new-check-out-info/${params.id}`,
	)
}
// 签出新增/app/visits/check-out
export const checkOut = async (params) => {
	return uni.$request.put(
		`/app/visits/check-out`,
		{
			...params
		}
	)
}
// 签出编辑
export const checkOutEdit = async (id,params) => {
	return uni.$request.post(
		`/app/visits/check-out/${id}`,
		{
			...params
		}
	)
}
// 医生信息增删改
export const operateDocInfo = async (type,params,id) => {
	if(type == 'detail'){
		return uni.$request.get(
			`/app/group-doctors/${params.id}`,
		)
	} else if(type == 'delete'){
		return uni.$request.delete(
			`/app/group-doctors/${params.id}`,
		)	
	} else if(type == 'update') {
		return uni.$request.post(
			`/app/group-doctors/${id}`,
			{
				...params
			}
		)
	}
}
// 报告
// 拜访报告
export const visitReport = async () => {
	return uni.$request.get(
		`/app/report/visit`
	)
}
// BI报告
export const salesReport = async () => {
	return uni.$request.get(
		`/app/report/sales`
	)
}
export const sendMail = async (params) => {
	return uni.$request.post(
		`/app/report/sendSalesMail`,
		{
			...params
		}
	)
}

