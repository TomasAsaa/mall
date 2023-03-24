import {
	regist,
	login,
	getUserInfo,
	getUserAddress,
	getChina,
	addUserAddress,
	updateUserAddress
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
		// 用户收货信息
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
		city_list : [],
		// 编辑状态的收货地址
		edit_address : undefined
	},
	mutations: {
		// 上级行政地区改变,下级置空
		uaddr_provincechange(context){
			context.uaddr_city = '',
			context.uaddr_district = ''
		},
		// 收获信息面板点击编辑按钮
		editaddress_click(context,payload){
			context.edit_address = payload
			console.log(context.edit_address)
			context.uaddr_name = payload.uaddr_name
			context.uaddr_phone = payload.uaddr_phone			
			context.uaddr_address = payload.uaddr_address
			
			for(let first of context.city_list){
				if(first.name == payload.uaddr_province){
					context.uaddr_province = first
					break
				}
			}
			for(let second of context.uaddr_province.children){
				if(second.name == payload.uaddr_city){
					context.uaddr_city = second
					break
				}
			}
			for(let third of context.uaddr_city.children){
				if(third.name == payload.uaddr_district){
					context.uaddr_district = third
					break
				}
			}
			
			
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
		// 保存修改的收货地址
		update_UserAddress(context){
			updateUserAddress({
				uaddr_name : context.state.uaddr_name,
				uaddr_phone : context.state.uaddr_phone,
				uaddr_province : context.state.uaddr_province.name,
				uaddr_city : context.state.uaddr_city.name,
				uaddr_district : context.state.uaddr_district == '' ? '' : context.state.uaddr_district.name,
				uaddr_address : context.state.uaddr_address,
				uaddr_isdefault : context.state.uaddr_isdefault,
				uaddr_id : context.state.edit_address.uaddr_id
			}).then(response => {				
				if(response.data.httpcode == 200){
					alert('修改成功')
					// 更新仓库用户收货信息
					for(let i=0; i<=context.state.user_address.length-1; i++){
						if(context.state.user_address[i].uaddr_id == context.state.edit_address.uaddr_id){
							context.state.user_address[i].uaddr_name = context.state.uaddr_name
							context.state.user_address[i].uaddr_phone = context.state.uaddr_phone
							context.state.user_address[i].uaddr_province = context.state.uaddr_province.name
							context.state.user_address[i].uaddr_city = context.state.uaddr_city.name
							context.state.user_address[i].uaddr_district = context.state.uaddr_district.name
							context.state.user_address[i].uaddr_address = context.state.uaddr_address
						}
					}
					
					context.state.edit_address = undefined
					
					
										
				}
				
				
								
			})
			
		},
	}

}