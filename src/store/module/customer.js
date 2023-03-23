import {
	regist,
	login,
	getUserInfo,
	getUserAddress,
	getChina,
	addUserAddress
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
		// 用户信息
		user_info : undefined,
		// 用户收货地址
		user_address : [],
		// 收获列表信息
		uaddr_name : '',
		uaddr_phone : '',
		uaddr_province : '',
		uaddr_city : '',
		uaddr_district : '',
		uaddr_address : '',
		uaddr_isdefault : 0,
		// 行政地区列表
		city_list : []
	},
	mutations: {
		uaddr_provincechange(context){
			context.uaddr_city = '',
			context.uaddr_district = ''
		}
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
		// 有令牌就可以,不需要携带参数
		get_UserInfo(context){
			getUserInfo().then(response => {
				console.log(response)
				// 将用户信息放到本地仓库
				context.state.user_info = response.data.data
				// 将用户信息放到本地缓存
				localStorage.setItem('user_info',JSON.stringify(response.data.data))
			})
			
		},
		// 有令牌就可以,不需要携带参数
		get_UserAddress(context){
			getUserAddress().then(response => {
				// 获取用户收获信息列表,赋值到仓库中
				context.state.user_address = response.data.data
				console.log(context.state.user_address)			
			})
		},
		// 获取到所有行政地区列表
		get_China(context){
			getChina().then(response => {
				// 获取行政地区列表,赋值到仓库中
				context.state.city_list = response.data.data
				console.log(context.state.city_list)			
			})
		},
		// 新增用户收获信息
		add_UserAddress(context){			
			addUserAddress({
				uaddr_name : context.state.uaddr_name,
				uaddr_phone : context.state.uaddr_phone,
				uaddr_province : context.state.uaddr_province.name,
				uaddr_city : context.state.uaddr_city.name,
				uaddr_district : context.state.uaddr_district == '' ? '' : context.state.uaddr_district.name,
				uaddr_address : context.state.uaddr_address,
				uaddr_isdefault : context.state.uaddr_isdefault
			}).then(response => {				
				if(response.data.httpcode == 200){
					alert('保存成功')
					// 让保存成功的数据直接显示出来
					context.state.user_address.push(response.data.data)
					
				}						
			})
			
			
		},
	}

}