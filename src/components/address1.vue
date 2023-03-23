<template>
	<div class="w-45 box-shadow p-4 border-box rounded-lg mb-3" v-show="true">
		<div class="d-flex text-bold text-secondary">
			<div>张三</div>
			<div class="ml-3 mr-auto">上海市</div>
			<div class="text-muted hand">x</div>
		</div>
		<div class="mt-3 d-flex text-xs text-muted">
			<div class="mr-2 w-15 text-right">收货人:</div>
			<div class="text-secondary">张三</div>
		</div>
		<div class="mt-3 d-flex text-xs text-muted">
			<div class="mr-2 w-15 text-right">所在地区:</div>
			<div class="text-secondary">南京</div>
		</div>
		<div class="mt-3 d-flex text-xs text-muted">
			<div class="mr-2 w-15 text-right">地址:</div>
			<div class="text-secondary mr-auto">江苏</div>
			<div>编辑</div>
		</div>
		<div class="mt-3 d-flex text-xs text-muted">
			<div class="mr-2 w-15 text-right">手机:</div>
			<div class="text-secondary mr-auto">32423423</div>
			<div class="hand">设为默认</div>
		</div>
	</div>
	
	<div class="w-45 p-4 box-shadow border-box rounded-lg mx-4 d-flex flex-column justify-content-between" v-show="false">
		<input type="text" placeholder="请输入收货人姓名" class="rounded border-gray outline-none py-1 px-3 mt-3">
		<input type="text" placeholder="请输入收货人手机号码" class="rounded border-gray outline-none py-1 px-3 mt-3">
		<div class="d-flex justify-content-between mt-3">
			<select name="" id="" class="w-33 rounded border-gray outline-none py-1 px-3"></select>
			<select name="" id="" class="w-33 rounded border-gray outline-none py-1 px-3"></select>
			<select name="" id="" class="w-33 rounded border-gray outline-none py-1 px-3"></select>
		</div>
		<input type="text" placeholder="请输入收货人详细地址" class="rounded border-gray outline-none py-1 px-3 mt-3">
		<div class="d-flex justify-content-end mt-3">
			<button class="mx-3 border-0 text-white py-2 px-5 rounded bg-green">保存</button>
			<button class="mx-3 border-0 text-white py-2 px-5 rounded bg-red">取消</button>
		</div>
	</div>
</template>

<script>
</script>

<style>
</style>