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
		spu_list: [],
		start: 0,
		length: 10,
		search_keyword: '',
		category_list: [],
		// 商品专场id
		cateid_list: [130, 34, 20, 219],
		// 专场商品数据
		special_spulist: []
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
			for (let spu_attr of context.selected_attrlist) {
				if (spu_attr != undefined) {
					context.selected_spulist += spu_attr.id + ','


				}
			}
			context.selected_spulist = context.selected_spulist.substring(0, context.selected_spulist.length - 1)
			console.log(context.selected_spulist)
			this.dispatch('commodity/get_Spu_List')


		},

		spu_category_click(context, payload) {
			context.selected_level3 = payload
			this.dispatch('commodity/get_Spu_List')
			this.dispatch('commodity/get_Attr_List')
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
				cate_id: context.state.selected_level3 == undefined ? null : context.state.selected_level3
					.cate_id,
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
				spu_name: context.state.search_keyword == '' ? '' : context.state.search_keyword,
				spu_title: '',
				spu_status: 1,
				cate_id: context.state.selected_level3 == undefined ? null : context.state.selected_level3.cate_id,
				valueList: context.state.selected_spulist,
				start: context.state.start,
				length: context.state.length
			}).then(response => {
				context.state.spu_list = response.data.data
				console.log(context.state.spu_list)


				if (context.state.category_list.length == 0) {
					context.state.category_list = response.data.categoryList
				}
				console.log(context.state.category_list)
			})
		},
		get_special_spulist(context){
			for(let i = 0; i<=context.state.cateid_list.length-1; i++){
				console.log(context)				
				getSpuList({
					spu_name: '',
					spu_title: '',
					spu_status: 1,
					cate_id: context.state.cateid_list[i],
					valueList: '',
					start: 0,
					length: 5
				}).then(response => {
					context.state.special_spulist[i] = response.data
					
				})
			}
			console.log(context.state.special_spulist)
			
			
			
		}
		
	},


}
