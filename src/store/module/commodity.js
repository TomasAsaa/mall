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
		special_spulist: [],
		// 选中的商品
		selected_spu : undefined,
		// 选中的商品图片颜色索引
		imglist_index : 0,
		// 商品sku组合的索引
		sku_index : 0,
		// 商品详情页面左边选中的图片
		selected_img : undefined,
		// 商品默认选中的sku的组合
		selected_sku : undefined
	},
	mutations: {
		level1_hover(context, payload) {
			context.selected_level1 = payload
		},

		level3_click(context, payload) {
			context.selected_level3 = payload
		},

		attr_click(context, payload) {
			context.spu_list = []
			context.start = 0
			
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
			context.spu_list = []
			context.start = 0
			
			context.selected_spulist = ''
			context.selected_level3 = payload
			this.dispatch('commodity/get_Spu_List')
			this.dispatch('commodity/get_Attr_List')
		},
		// 下拉滚动事件
		next_page(context){
			context.start = context.start + context.length
			this.dispatch('commodity/get_Spu_List')
		},
		// 搜索点击事件(备用)
		search_click(context){
			context.spu_list = []
			context.start = 0
			context.selected_spulist =''			
			this.dispatch('commodity/get_Spu_List')
		},
		// 商品spu详情点击事件
		spu_click(context, payload){			
			context.selected_spu = payload
			
			// 点击选中商品的sku字符串转成JSON对象赋值到仓库中的selected_sku
			context.selected_sku = JSON.parse(context.selected_spu.skuList[context.sku_index].sku_spuattr)
			console.log(context.selected_sku)
			// 遍历当前所有颜色,确定哪个颜色是默认选中的
			for(let i =0; i <= context.selected_spu.attrKeyList[0].attrValueList; i++){
				if(context.selected_spu.attrKeyList[0].attrValueList[i].value_id ==JSON.parse(this.commodity.selected_spu.skuList[context.sku_index].sku_spuattr)[0].value_id){
					context.imglist_index = i
					
				}
			}
								
		},
		// 商品详情图片点击事件
		spuimge_click(context, payload){
			context.selected_img = payload
		},
		
		// 商品详情页面点击规格属性
		sku_attr_click(context, payload){
			console.log(context)
			console.log(payload)
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
				// context.state.spu_list = response.data.data
				// console.log(context.state.spu_list)
				
				context.state.spu_list = context.state.spu_list.concat(response.data.data)

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
