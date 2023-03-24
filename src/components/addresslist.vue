<template>
	<div class="container d-flex justify-content-between mt-3 flex-wrap">
		<address1 v-for="addr of customer.user_address" :key="'userAddr' + addr.uaddr_id" :data='addr'></address1>
		<address2></address2>
	</div>
</template>

<script>
	import address1 from '@/components/address1.vue'
	import address2 from '@/components/address2.vue'
	import {mapActions,mapState} from 'vuex'
	
	
	export default{
		components : {
			address1,
			address2
		},
		mounted() {
			// 获取到用户收货信息列表
			this.get_UserAddress()
			this.get_China()
		},
		methods : {
			...mapActions({
				'get_UserAddress' : 'customer/get_UserAddress',
				'get_China' : 'customer/get_China'
			})
		},
		computed : {
			...mapState(['customer'])
		}
	}
</script>

<style>
</style>