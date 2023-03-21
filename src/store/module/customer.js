import {
	regist,
	login,
	getUserInfo
} from '@/data/customer.js'

import router from '@/router'

export default {
	namespaced : true,
	state: {
		user_phone: '',
		user_password: '',
		repeat_password : '',
		user_name : '',
		username : '', 
		password : '',
		user_info : undefined
	},
	mutations: {
		
	},
	actions: {
		register(context){
			if(context.user_password == context.repeat_password){
				regist({
					user_phone: context.state.user_phone,
					user_password: context.state.user_password,
					user_name: context.state.user_name
				}).then(response => {					
					if(response.data.httpcode == 200){
						router.push({name : 'logon'})
					}		
				})
			}else{
				alert('密码输入不一致')
			}
			
		},
		
		logon(context){						
			login({
				username: context.state.username,
				password: context.state.password					
			}).then(response => {
				if(response.data.httpcode == 200){	
				
					localStorage.setItem('token',response.data.data)
					
					router.push({name : 'carousel'})
										
					this.dispatch('customer/get_UserInfo')
				}else{
				alert('用户或密码错误')
			}
			})			
			
		},
		
		get_UserInfo(context){
			getUserInfo().then(response => {
				console.log(response)
				// 将用户信息放到本地仓库
				context.state.user_info = response.data.data
				// 将用户信息放到本地缓存
				localStorage.setItem('user_info',JSON.stringify(response.data.data))
			})
			
		}
	}

}