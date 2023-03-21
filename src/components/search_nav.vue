<template>
	<div class="container d-flex align-items-center mt-3">
		<div class="w-10 mr-5">
			<img :src="require('@/assets/' + 'logo.png')" style="width: 100%;">
		</div>
		<div class="w-72 d-flex flex-column align-items-center">
			<div class="d-flex" style="min-width: 72%;">
				<input type="text" class="w-50 border-right-none rounded-left outline-none border-red px-3 py-2"
					placeholder="啦啦啦啦啦" v-model="commodity.search_keyword">
				<router-link to="/attrlist" @click="get_SpuList()"
					class="text-decoration-none px-3 py-2 bg-red text-white border-0 rounded-right mr-3 hand">搜索
				</router-link>
				<router-link to="/cart" class="text-decoration-none border-gray px-5 py-1 rounded text-red">我的购物车
				</router-link>
			</div>
			<div class="mt-2 d-flex text-xs text-secondary">
				<div class="mx-2 hand text-red">春日环游记</div>
				<div class="mx-2 hand text-hover-red">iphone12</div>
				<div class="mx-2 hand text-hover-red">小米</div>
				<div class="mx-2 hand text-hover-red">榴莲尝鲜</div>
				<div class="mx-2 hand text-hover-red">生鲜五折</div>
				<div class="mx-2 hand text-hover-red">品质家电</div>
				<div class="mx-2 hand text-hover-red">新品激光</div>
				<div class="mx-2 hand text-hover-red">春茶</div>
				<div class="mx-2 hand text-hover-red">正品农贸</div>
				<div class="mx-2 hand text-hover-red">9就够了</div>
				<div class="mx-2 hand text-hover-red">愚人节好物</div>
			</div>
			<div class="d-flex mt-3 text-secondary text-lighter">
				<div class="mx-2 hand text-red">秒杀</div>
				<div class="mx-2 hand text-hover-red">优惠券</div>
				<div class="mx-2 hand text-hover-red">会员</div>
				<div class="mx-2 hand text-hover-red">品牌闪购</div>
				<div class="mx-2 hand text-hover-red">拍卖</div>
				<div class="mx-2 hand text-hover-red">家电数码</div>
				<div class="mx-2 hand text-hover-red">超市日用</div>
				<div class="mx-2 hand text-hover-red">蔬菜</div>
				<div class="mx-2 hand text-hover-red">好货</div>
				<div class="mx-2 hand text-hover-red">服饰</div>
			</div>
		</div>
	</div>
</template>

<script>
	import {mapState,mapActions,mapMutations} from 'vuex'
	
	export default {
		
		computed: {
			...mapState(['commodity'])
		},
		
		methods:{
			...mapActions({
				'get_SpuList' : 'commodity/get_Spu_List'
			}),
			
			...mapMutations({
				'search_click' : 'commodity/search_click'
			})
			
		}
	}
</script>

<style>
</style>
