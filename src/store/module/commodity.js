import {
	getCategoryList,
	getAttrList,
	getSpuList
} from '@/data/product.js'

export default {
	namespaced: true,
	state: {
		cate_list: [],
		selected_level1: undefined,
		selected_level3: undefined,
		attr_list: [],
		selected_attrlist: [],
		selected_spulist: '',
		spu_list : [],
		start: 0,
		length: 10
	},
	mutations: {
		level1_hover(context, payload) {
			context.selected_level1 = payload
		},

		level3_click(context, payload) {
			context.selected_level3 = payload
		},

		attr_click(context, payload) {
			context.selected_spulist = ''
			context.selected_attrlist[payload.index] = payload.attr
			for(let spu_attr of context.selected_attrlist){
				if(spu_attr != undefined){
					context.selected_spulist += spu_attr.id + ','
					
					
				}
			}
			context.selected_spulist = context.selected_spulist.substring(0,context.selected_spulist.length-1)
			console.log(context.selected_spulist)
			this.dispatch('commodity/get_Spu_List')
			
			
		}
		
						
	},
	actions: {
		get_category_list(context, payload) {
			console.log(context)
			console.log(payload)
			getCategoryList({
					pid: ''
				})
				.then(response => {
					context.state.cate_list = response.data.data
				})
		},

		get_Attr_List(context, payload) {
			console.log(context)
			console.log(payload)
			getAttrList({
				cate_id: context.state.selected_level3.cate_id,
				key_issku: 0,
				key_ishigh: 0
			}).then(response => {
				context.state.attr_list = response.data.data

				context.state.selected_attrlist = []
				for (let i = 1; i <= context.state.attr_list.length; i++) {
					context.state.selected_attrlist.push(undefined)
				}
				console.log(context.state.selected_attrlist)
				

			})
		},

		get_Spu_List(context) {
			console.log(context)
			
			getSpuList({
				spu_name: '',
				spu_title: '',
				spu_status: 1,
				cate_id: context.state.selected_level3.cate_id,
				valueList: context.state.selected_spulist,
				start: context.state.start,
				length: context.state.length
			}).then(response => {
				context.state.spu_list = response.data.data
				console.log(context.state.spu_list)
			})
		}
	},

}
