<template>	
	<div class="w-45 rounded box-shadow d-flex align-items-center justify-content-center hand" style="min-height: 200px;"
	v-show="!edit" @click="add_click(true)">
		<span class="text-max text-bolder">+</span>
	</div>
	<div class="w-45 p-4 box-shadow border-box rounded-lg mx-4 d-flex flex-column justify-content-between"
	v-show="edit">
		<input type="text" placeholder="请输入收货人姓名" class="rounded border-gray outline-none py-1 px-3 mt-3"
		v-model="customer.uaddr_name">
		<input type="text" placeholder="请输入收货人手机号码" class="rounded border-gray outline-none py-1 px-3 mt-3"
		v-model="customer.uaddr_phone">
		<div class="d-flex  mt-3">
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
			<button class="mx-3 border-0 text-white py-2 px-5 rounded bg-green">保存</button>
			<button class="mx-3 border-0 text-white py-2 px-5 rounded bg-red hand"
			@click="add_click(false)">取消</button>
		</div>
		
	
	</div>
</template>

<script>
	import {mapState,mapMutations} from 'vuex'
	
	export default{
		data(){
			return {
				edit : false
			}
		},
		methods : {
			add_click(x){
				this.edit = x
			},
			...mapMutations({
				'uaddr_provincechange' : 'customer/uaddr_provincechange'
			})			
		},
		computed: {
			...mapState(['customer'])
		}
	}
</script>

<style>
</style>