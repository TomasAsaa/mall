<template>
	<div class="d-flex flex-wrap">
		<div v-for="spu of list" :key="spu.spu_id + spu.spu_name" style="width: 200px;" class="mx-3 mt-6">
			<img :src="'http://localhost:8001/img/' + spu.attrKeyList[0].attrValueList[0].value_images
[0]" style="width: 200px;">
			<div class="mt-2">
				<img v-for="img of spu.attrKeyList[0].attrValueList" :key="img.value_id + img.value_name"
				:src="'http://localhost:8001/img/' + img.value_images[0]"				
				style="width: 30px;">				
			</div>
			<div class="text-bolder text-lg  text-red mt-2">1999</div>
			<div class="text-sm text-secondary mt-2">{{spu.spu_name}}</div>
		</div>		
	</div>
</template>

<script>
	// import spu from '@/components/spu.vue'

	export default {
		props: ['list'],

		// components : {
		// 	spu
		// }
	}
</script>

<style>
</style>
