<template>
	<div class="w-45 box-shadow p-4 border-box rounded-lg mb-3"
	v-show="customer.edit_address != data">
		<div class="d-flex text-bold text-secondary">
			<div>{{data.uaddr_name}}</div>
			<div class="ml-3 mr-auto">{{data.uaddr_province}}</div>
			<div class="text-muted hand">x</div>
		</div>
		<div class="mt-3 d-flex text-xs text-muted">
			<div class="mr-2 w-15 text-right">收货人:</div>
			<div class="text-secondary">{{data.uaddr_name}}</div>
		</div>
		<div class="mt-3 d-flex text-xs text-muted">
			<div class="mr-2 w-15 text-right">所在地区:</div>
			<div class="text-secondary">{{data.uaddr_province}}{{data.uaddr_city}}{{data.uaddr_district}}</div>
		</div>
		<div class="mt-3 d-flex text-xs text-muted">
			<div class="mr-2 w-15 text-right">地址:</div>
			<div class="text-secondary mr-auto">{{data.uaddr_address}}</div>
			<div @click="editaddress_click(data)" class="hand">编辑</div>
		</div>
		<div class="mt-3 d-flex text-xs text-muted">
			<div class="mr-2 w-15 text-right">手机:</div>
			<div class="text-secondary mr-auto">{{data.uaddr_phone}}</div>
			<div class="hand">设为默认</div>
		</div>
	</div>
	
	<template v-if="customer.edit_address != undefined">
		<div class="w-45 p-4 box-shadow border-box rounded-lg mx-4 d-flex flex-column justify-content-between"
		v-show="customer.edit_address == data">
			<input type="text" placeholder="请输入收货人姓名" class="rounded border-gray outline-none py-1 px-3 mt-3"
			v-model="customer.uaddr_name">
			<input type="text" placeholder="请输入收货人手机号码" class="rounded border-gray outline-none py-1 px-3 mt-3"
			v-model="customer.uaddr_phone">
			<div class="d-flex mt-3">
				<select name="" id="" class="w-33 rounded border-gray outline-none py-1 px-3 mr-2"
				v-model="customer.uaddr_province" @change="uaddr_provincechange()">
					<option v-for="uaddr_province of customer.city_list" :key="uaddr_province.id"
					:value="uaddr_province">{{uaddr_province.name}}</option>
				</select>
				<select name="" id="" class="w-33 rounded border-gray outline-none py-1 px-3 mr-2"
				v-model="customer.uaddr_city">
					<option v-for="uaddr_city of customer.uaddr_province.children" :key="uaddr_city.id"
					:value="uaddr_city">{{uaddr_city.name}}</option>
				</select>
				<select name="" id="" class="w-33 rounded border-gray outline-none py-1 px-3"
				v-if="customer.uaddr_city.children != ''"
				v-model="customer.uaddr_district">
					<option v-for="uaddr_district of customer.uaddr_city.children" :key="uaddr_district.id"
					:value="uaddr_district">{{uaddr_district.name}}</option>
				</select>
			</div>
			<input type="text" placeholder="请输入收货人详细地址" class="rounded border-gray outline-none py-1 px-3 mt-3"
			v-model="customer.uaddr_address">
			<div class="d-flex justify-content-end mt-3">
				<button class="mx-3 border-0 text-white py-2 px-5 rounded bg-green"
				@click="update_UserAddress()">保存</button>
				<button class="mx-3 border-0 text-white py-2 px-5 rounded bg-red">取消</button>
			</div>
		</div>
		
		
	</template>	
</template>

<script>
	import {mapMutations,mapState,mapActions} from 'vuex'
	
	export default{
		props : ['data'],
		methods : {
			...mapMutations({
				'editaddress_click' : 'customer/editaddress_click',
				'uaddr_provincechange' : 'customer/uaddr_provincechange'
			}),
			...mapActions({
				'update_UserAddress' : 'customer/update_UserAddress'
			})
		},
		computed : {
			...mapState(['customer'])
		}
	}
</script>

<style>
</style>