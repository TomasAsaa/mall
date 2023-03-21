import {
	regist
} from '@/data/customer.js'

export default {
	namespaced : true,
	state: {
		user_phone: '',
		user_password: '',
		repeat_password : '',
		user_name : ''
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
					console.log(response)		
				})
			}else{
				alert('密码输入不一致')
			}
			
		}
	},

}