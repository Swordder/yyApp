export default function(to,next,user_info){
	const token = user_info.token;
	// 若已授权，判断是否登录(有token表示已经一键登录，无token表示没有一键登录)
	if(token){
		// 若需要绑定，判断是否已经绑定
		if(to.meta.requireBind){
			// 若无绑定，则去绑定
			if(user_info.auth_status == 2){
				next({
					path: '/pages/mine/bindPhone',
					query: {
						replacePath: to.fullPath
					},
					NAVTYPE: 'push'
				});
			} else {
				// 若已绑定，则判断是否需要认证
				// 若需要，则判断是否已经认证
				if(to.meta.requireAuth){
					if(user_info.verify_status == 1 || user_info.verify_status == 4){
						next({
							path: '/pages/authentication/authentication',
							query: {
								replacePath: to.fullPath
							},
							NAVTYPE: 'replace'
						});
					} else {
						next();
					}
				}  else {
					next()
				}
			}
		} else {
			next()
		}	
	} else {
		next({
			path: '/pages/login/login',
			query: {
				replacePath: to.fullPath
			},
			NAVTYPE: 'replace'
		});
	}
}