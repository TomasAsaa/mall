import {getCategoryList} from '@/data/product.js'

export default {
	namespaced : true,
	state: {
		cate_list : [],
		selected_level1 : undefined
	},
	mutations: {
		level1_hover(context,payload){
			context.selected_level1 = payload
		}
	},
	actions: {
		get_category_list(context,payload){
			console.log(context)
			console.log(payload)
			getCategoryList({pid : ''})		
			.then( response => {				
				context.state.cate_list = response.data.data
				console.log(context.state.cate_list)
			})
		}
	},

}