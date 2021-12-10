// 代表群组列表
export const fetchDelegateGroupList = (paramsData) => {
	return uni.$request.get(
		'/app/workgroup/search', {
			...paramsData
		}
	);
}

// 代表群组详情
export const fetchDelegateGroupInfo = (paramsData) => {
	return uni.$request.get(
		'/app/workgroup/detail', {
			...paramsData
		}, {
			showLoading: false
		}
	);
}

// 代表群组成员列表
export const fetchDelegateGroupMemberList = (paramsData) => {
	return uni.$request.get(
		'/app/workgroup/member/list', {
			...paramsData
		}
	);
}

// 代表群组待加入成员列表
export const fetchDelegateGroupJoinList = (paramsData) => {
	return uni.$request.get(
		'/app/workgroup/join/list', {
			...paramsData
		}
	);
}

// 可邀请的所有代表
export const fetchAllDelegateList = (paramsData) => {
	return uni.$request.get(
		'/app/workgroup/agents/list', {
			...paramsData
		}
	);
}

// 群组产品列表
export const fetchGroupProjectList = (paramsData) => {
	return uni.$request.get(
		'/app/workgroup/series', {
			...paramsData
		}
	);
}

// 群组二维码
export const fetchGroupQrcode = (paramsData) => {
	return uni.$request.get(
		'/app/workgroup/qrcode', {
			...paramsData
		}
	);
}

// 新增代表群组
export const createDelegateGroup = (paramsData) => {
	return uni.$request.post(
		'/app/workgroup/create', {
			...paramsData
		}
	);
}

// 添加群组成员
export const addDelegateGroupMember = (paramsData) => {
	return uni.$request.post(
		'/app/workgroup/member/add', {
			...paramsData
		}
	);
}

// 删除群组成员
export const delDelegateGroupMember = (paramsData) => {
	return uni.$request.put(
		'/app/workgroup/member/delete', {
			...paramsData
		}
	);
}

// 操作待加入申请
export const handleApplyMember = (paramsData) => {
	return uni.$request.put(
		'/app/workgroup/join/approval', {
			...paramsData
		}
	);
}

// 重命名代表群组
export const resetDelegateGroupName = (paramsData) => {
	return uni.$request.put(
		'/app/workgroup/rename', {
			...paramsData
		}
	);
}

// 修改代表群组公告
export const resetDelegateGroupNotice = (paramsData) => {
	return uni.$request.put(
		'/app/workgroup/notice/change', {
			...paramsData
		}
	);
}

// 修改代表群产品
export const resetGroupProject = (paramsData) => {
	return uni.$request.put(
		'/app/workgroup/series/change', {
			...paramsData
		}
	);
}

// 修改代表群主
export const resetDelegateGroupLeader = (paramsData) => {
	return uni.$request.put(
		'/app/workgroup/newLeader', {
			...paramsData
		}
	);
}

// 解散代表群组
export const dissolveDelegateGroup = (paramsData) => {
	return uni.$request.put(
		'/app/workgroup/delete', {
			...paramsData
		}
	);
}

// 发起投票
export const createGroupVote = (paramsData) => {
	return uni.$request.post(
		'/app/workgroup/vote/create', {
			...paramsData
		}
	);
}

// 投票详情(票数统计)
export const fetchGroupVoteInfo = (paramsData) => {
	return uni.$request.get(
		'/app/workgroup/vote/detail', {
			...paramsData
		}
	);
}

// 进行投票操作
export const handleGroupVoting = (paramsData) => {
	return uni.$request.post(
		'/app/workgroup/vote', {
			...paramsData
		}
	);
}

// 终止投票
export const endGroupVote = (paramsData) => {
	return uni.$request.put(
		'/app/workgroup/vote/cancel', {
			...paramsData
		}
	);
}

// 所有医生群组信息(包含成员列表)
export const fetchAllDoctorGroupMsg = (paramsData) => {
	return uni.$request.get(
		'/app/doctorgroup/info', {
			...paramsData
		}
	);
}

// 医生群组列表
export const fetchDoctorGroupList = (paramsData) => {
	return uni.$request.get(
		'/app/doctorgroup/list', {
			...paramsData
		}
	);
}

// 我的医生群组二维码
export const fetchMyDoctorGroupQrcode = (paramsData = {}) => {
	return uni.$request.get(
		'/app/doctorgroup/qrcode', {
			...paramsData
		}
	);
}

// 创建医生群组
export const createDoctorGroup = (paramsData) => {
	return uni.$request.post(
		'/app/doctorgroup/create', {
			...paramsData
		}
	);
}

// 删除医生群组
export const delDoctorGroup = (paramsData) => {
	return uni.$request.put(
		'/app/doctorgroup/delete', {
			...paramsData
		}
	);
}

// 重命名医生群组
export const renameDoctorGroup = (paramsData) => {
	return uni.$request.put(
		'/app/doctorgroup/rename', {
			...paramsData
		}
	);
}

// 医生群组待加入列表
export const fetchDoctorGroupJoinList = (paramsData) => {
	return uni.$request.get(
		'/app/doctorgroup/join/list', {
			...paramsData
		}
	);
}

// 加入我的医生默认群组
export const joinDefaultDoctorGroup = (paramsData) => {
	return uni.$request.post(
		'/app/doctorgroup/join/add', {
			...paramsData
		}
	);
}

// 群组成员列表
export const fetchDoctorGroupMemberList = (paramsData = {}) => {
	return uni.$request.get(
		'/app/doctorgroup/member/list', {
			...paramsData
		}
	);
}

// 从默认群组加入到具体群组
export const joinDoctorGroup = (paramsData) => {
	return uni.$request.post(
		'/app/doctorgroup/member/add', {
			...paramsData
		}
	);
}

// 从群组删除成员
export const delDoctorGroupMember = (paramsData) => {
	return uni.$request.put(
		'/app/doctorgroup/member/delete', {
			...paramsData
		}
	);
}

// 移动医生群组成员
export const moveDoctorGroupMember = (paramsData) => {
	return uni.$request.put(
		'/app/doctorgroup/member/change', {
			...paramsData
		}
	);
}

// 医生群组成员详情
export const fetchDoctorInfo = (paramsData) => {
	return uni.$request.get(
		'/app/doctorgroup/member/info', {
			...paramsData
		}
	);
}

// 修改医生群组成员信息
export const updateDoctorInfo = (paramsData) => {
	return uni.$request.post(
		'/app/doctorgroup/member/update', {
			...paramsData
		}
	);
}

// 查询手机号对应医生信息
export const fetchDoctorInfoByPhone = (id, mobile) => {
	return uni.$request.get(
		`/app/group-doctors/${id}/valid-merge`, {
			mobile
		}
	);
}

// 使用查询的医生信息更新医生群组信息
export const mergeDoctorInfoByPhone = (id, mergeId) => {
	return uni.$request.post(
		`/app/group-doctors/${id}/merge/${mergeId}`
	);
}

