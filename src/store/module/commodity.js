import {getCategoryList,getAttrList} from '@/data/product.js'

export default {
	namespaced : true,
	state: {
		cate_list : [],
		selected_level1 : undefined,
		selected_level3 : undefined,
		attr_list : [],
		selected_attrlist : []
	},
	mutations: {
		level1_hover(context,payload){
			context.selected_level1 = payload
		},
		
		level3_click(context,payload){
			context.selected_level3 = payload
		},
		
		attr_click(context,payload){
			context.selected_attrlist[payload.index] = payload.attr
		}
	},
	actions: {
		get_category_list(context,payload){
			console.log(context)
			console.log(payload)
			getCategoryList({pid : ''})		
			.then( response => {				
				context.state.cate_list = response.data.data
			})
		},
		
		get_Attr_List(context,payload){
			console.log(context)
			console.log(payload)
			getAttrList({
				cate_id : context.state.selected_level3.cate_id,
				key_issku : 0,
				key_ishigh : 0
			}).then( response => {				
				context.state.attr_list = response.data.data
				
				context.state.selected_attrlist = []
				for(let i = 1; i <= context.state.attr_list.length; i++){
					context.state.selected_attrlist.push(undefined)					
				}
				console.log(context.state.selected_attrlist)
				
			})
		}
	},

}