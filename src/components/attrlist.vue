<template>
	<div class="container box-shadow rounded py-2 px-4 border-box">
		<div class="d-flex mt-2 text-muted" v-if="commodity.search_keyword != ''"><!-- 此处v-if有bug -->
			<div class="text-right w-15 mx-2 p-1">分类：</div>
			<div class="mx-2 p-1 w-7 hand" 
			@click="level3_click()" :class="{'text-red' : commodity.selected_level3 == undefined}"
			>全部分类</div>
			<div class="mx-2 p-1 hand"
			v-for="cate of commodity.category_list" :key="cate.cate_name+  cate.cate_id"
			@click="level3_click(cate)" :class="{'text-red' : commodity.selected_level3 == cate}">{{cate.cate_name}}</div>						
		</div>
		
		
		<div class="d-flex text-muted mt-2"
		v-for="(attr,index) of commodity.attr_list" :key="'attr' + attr.key_id">
			<div class="text-right w-15 mx-2 p-1">{{attr.key_name}}:</div>
			<div class="mx-2 p-1 w-5 hand" :class="{'text-red' : commodity.selected_attrlist[index] == undefined}"
			@click="attr_click({'index' : index, 'attr' : undefined})">全部</div>
			<div class="d-flex flex-wrap">
				<div class="mx-2 p-1 hand"
				v-for="attr_value of attr.spuAttrValueList" :key="attr_value.value_name + attr_value.value_id"
				@click="attr_click({'index' : index, 'attr' : attr_value})"
				:class="{'text-red' : commodity.selected_attrlist[index] == attr_value}">{{attr_value.value_name}}</div>
			</div>			
		</div>
	</div>
	
	<div class="container">		
		<spulist :list = 'commodity.spu_list'></spulist>
	</div>
</template>

<script>
	import {mapActions,mapState,mapMutations} from 'vuex'
	import spulist from '@/components/spulist.vue'
	
	export default{
		methods: {
			...mapActions({
				'get_Attr_List' : 'commodity/get_Attr_List',
				'get_Spu_List' : 'commodity/get_Spu_List',
				
			}),
			
			...mapMutations({
				'attr_click' : 'commodity/attr_click',
				'level3_click' : 'commodity/spu_category_click',
				'next_page' : 'commodity/next_page'
				
			})
		},
		computed: {
			...mapState(['commodity'])
		},
		mounted() {
			this.get_Attr_List()
			if(this.commodity.selected_level3 != undefined){
				this.get_Spu_List()
			}
						
			window.onscroll = () =>{

				if(window.innerHeight + document.documentElement.scrollTop >= document.documentElement.scrollHeight){
					console.log('到底了')
					this.next_page()
				}
			}			
		},
		unmounted() {
			this.commodity.spu_list =[]
			this.commodity.start = 0
			this.commodity.selected_level3 = undefined
			this.commodity.category_list = []
			this.commodity.search_keyword = ''
			this.commodity.selected_spulist = ''
		},
		components : {
			spulist : spulist
		}
	}
	
	
	
</script>

<style>
</style>