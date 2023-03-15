<template>
	<div class="container box-shadow rounded py-2 px-4">
		<div class="d-flex text-muted mt-2"
		v-for="(attr,index) of commodity.attr_list" :key="'attr' + attr.key_id">
			<div class="text-right w-15 mx-2 p-1">{{attr.key_name}}</div>
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
</template>

<script>
	import {mapActions,mapState,mapMutations} from 'vuex'
	
	export default{
		methods: {
			...mapActions({
				'get_Attr_List' : 'commodity/get_Attr_List',
				
			}),
			
			...mapMutations({
				'attr_click' : 'commodity/attr_click'
			})
		},
		computed: {
			...mapState(['commodity'])
		},
		mounted() {
			this.get_Attr_List()
		}
	}
</script>

<style>
</style>