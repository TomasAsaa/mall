<template>
	<div>
		<img :src="'http://localhost:8001/img/' + selected_img" style="width: 200px;">
		<div class="mt-2">
			<img v-for="img of data.attrKeyList[0].attrValueList" :key="img.value_id + img.value_name"
				:src="'http://localhost:8001/img/' + img.value_images[0]" style="width: 30px;"
				:class="{'border-red' : selected_img == img.value_images[0]}"
				@click="img_click(img.value_images[0])"
				:title="img.value_images[0]">
								
		</div>
		<div class="text-bolder text-lg  text-red mt-2">1999</div>
		<div class="text-sm text-secondary mt-2">{{data.spu_name}}</div>
	</div>
</template>

<script>
	export default {
		props: ['data'],
		data() {
			return{
				selected_img : this.data.attrKeyList[0].attrValueList[0].value_images[0]
			}
		},
		
		mounted() {
			console.log(this.selected_img)
		},
		
		methods : {
			img_click(x){
				this.selected_img = x
			}
		}
	}
</script>

<style>
</style>
