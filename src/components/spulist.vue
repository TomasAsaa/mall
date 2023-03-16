<template>
	<div class="d-flex flex-wrap">
		<spu v-for="spu of list" :key="spu.spu_id + spu.spu_name" style="width: 200px;" class="mx-3 mt-6" :data ='spu'></spu>
	</div>
</template>

<script>
	import spu from '@/components/spu.vue'

	export default {
		props: ['list'],

		components : {
			spu
		}
	}
</script>

<style>
</style>
