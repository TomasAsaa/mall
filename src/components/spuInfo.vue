<template>
	<div class="d-flex container mt-3">
		<div class="d-flex flex-column align-items-center" style="450px">
			<img 
			:src="'http://127.0.0.1:8001/img/' + commodity.selected_img" style="width: 450px;">
			<div class="d-flex align-items-center mt-3">
				<span class="text-bolder text-muted text-xxl hand" @click="left_click()">&lt;</span>
				<div class="overflow-hidden" style="width: 440px;">
					<div class="d-flex" :style="{marginLeft : -115 * i + 'px'}">
						<img v-for="(img,index) of commodity.selected_spu.attrKeyList[0].attrValueList[commodity.imglist_index].value_images"
						:key="'img' + index" style="width: 110px;"
						:src="'http://127.0.0.1:8001/img/' + img"
						:class="{'border-red' : img == commodity.selected_img}"
						@click="spuimge_click(img)">											
					</div>
				</div>
				<span class="text-bolder text-muted text-xxl hand" @click="right_click()">&gt;</span>
			</div>			
		</div>
		<div style="width: 46.875rem;">
			<div class="text-bolder text-xl">{{commodity.selected_spu.skuList[commodity.sku_index].sku_name}}</div>
			<div class="d-flex align-items-end mt-3">
				<div class="text-red text-bolder text-lg">现价：</div>
				<div class="text-red text-xxl text-bolder">{{commodity.selected_spu.skuList[commodity.sku_index].sku_price}}</div>
				<div class="text-bolder text-muted ml-3">原价：</div>
				<div class="text-muted text-lg text-bolder text-decoration-line-through">{{commodity.selected_spu.skuList[commodity.sku_index].sku_originalprice}}</div>
			</div>
			<div class="text-muted text-bold mt-3">库存：{{commodity.selected_spu.skuList[commodity.sku_index].sku_quantity}}</div>
			<div
			v-for="(attr,index) of commodity.selected_spu.attrKeyList"
			:key="'attr' + attr.key_id">
				<template v-if="attr.attrValueList[0].value_images.length != 0">
					<div class="d-flex mt-3 align-items-center">
						<div class="text-muted text-bolder mt-2 w-15">{{attr.key_name}}</div>
						<div class="d-flex flex-wrap w-85">
							<div class="text-muted hand border-gray text-bolder rounded-lg mx-2 mt-2 p-2 d-flex align-items-center"
							v-for="(key,index) of attr.attrValueList" :key="'key' + key.value_name"
							:class="{'border-red' : index == commodity.imglist_index}"
							@click="imgsmall_listclick(index)">
								<img :src="'http://127.0.0.1:8001/img/' + key.value_images[0]" style="height: 3.125rem;">
								<span class="text-center">{{key.value_name}}</span>
							</div>
							
						</div>
					</div>					
				</template>
			
			
				<template v-if="attr.attrValueList[0].value_images.length == 0">
					<div class="d-flex mt-3 align-items-center">
						<div class="text-muted text-bolder mt-2 w-15">{{attr.key_name}}</div>
						<div class="d-flex flex-wrap w-85">
							<div class="text-muted hand border-gray text-bolder rounded-lg mx-2 mt-2 p-2"
							v-for="key of attr.attrValueList" :key="'key' + key.value_name"
							:class="{'border-red' : key.value_id == commodity.selected_sku[index].value_id}">{{key.value_name}}</div>
						</div>
					</div>					
				</template>
				
			</div>
			<div class="d-flex mt-3">
				<input type="text" class="outline-none border-red py-2 px-3">
				<button class="bg-red border-0 py-2 px-3 mx-3 text-white">加入购物车</button>
				<button class="bg-red border-0 py-2 px-3 mx-3 text-white">立即购买</button>
			</div>
		</div>
	</div>
	
	<div class="container mt-5">
		<img :src="require('@/assets/' + 'spu_introduce_01.jpg')" style="width: 100%;">
	</div>
</template>

<script>
	import {mapState,mapMutations} from 'vuex'
	export default{
		data() {
			return{
				i : 0
			}
		},
		computed : {
			...mapState(['commodity'])
			
		},
		mounted() {	
			// 将仓库默认选中的图片换成选中的第一张图片
			console.log(JSON.parse(this.commodity.selected_spu.skuList[0].sku_spuattr)[0].value_id)
			this.commodity.selected_img = this.commodity.selected_spu.attrKeyList[0].attrValueList[this.commodity.imglist_index].value_images[0]
		},
		methods : {
			left_click(){
				if(this.i > 0){
					this.i--
				}
			},
			right_click(){
				if(this.i < this.commodity.selected_spu.attrKeyList[0].attrValueList[this.commodity.imglist_index].value_images.length-4){
					this.i++
				}
			},
			...mapMutations({
				'spuimge_click' : 'commodity/spuimge_click',
				'sku_attr_click' : 'commodity/sku_attr_click'
			}),
			imgsmall_listclick(x){
				this.commodity.imglist_index = x
				// 切换了图片数组之后,需要将左侧最大图片换成数组第一张图片
				this.commodity.selected_img = this.commodity.selected_spu.attrKeyList[0].attrValueList[this.commodity.imglist_index].value_images[0]
			}
		}
		
	}
</script>

<style>
</style>