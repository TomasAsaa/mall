<template>
	<div class="container d-flex mt-3 position-relative">
		<div class="w-17 box-shadow rounded border-box p-3 mr-2 text-xs text-secondary">
			<div class="my-2">
				<div class="text-hover-red text-secondary my-1 text-sm"
				v-for="level1 of commodity.cate_list" :key="level1.cate_id + level1.cate_name" 
				@mouseover="level1_hover(level1)">{{level1.cate_name}}
									
					<div class="cate border-box px-3 text-secondary py-2 bg-white box-shadow position-absolute" 
					style="width: 810px; height: 490px;" v-show="level1 == commodity.selected_level1">
						<div class="d-flex align-items-start"
						v-for="level2 of level1.children" :key="level2.cate_id + level2.cate_name">
							<div class="mr-3 my-2 d-flex w-10 text-hover-red">{{level2.cate_name}}</div>
							<div class="d-flex flex-wrap w-90">
								<router-link to="/attrlist" class="mx-1 my-2 text-hover-red text-decoration-none text-secondary"
								v-for="level3 of level2.children" :key="level3.cate_id + level3.cate_name"
								@click="level3_click(level3)">{{level3.cate_name}}</router-link>
							</div>
						</div>
					</div>
				</div>				
			</div>			
		</div>
		<div class="w-66 ml-1 overflow-hidden position-relative mr-2">
			<div class="d-flex" :style="{'margin-left':-792*website.carousel_index+'px'}">
				<img :src="require('@/assets/' + 'carousel01.jpg')" class="w-min-792" style="height: 490px;">
				<img :src="require('@/assets/' + 'carousel02.jpg')" class="w-min-792" style="height: 490px;">
				<img :src="require('@/assets/' + 'carousel03.jpg')" class="w-min-792" style="height: 490px;">
				<img :src="require('@/assets/' + 'carousel04.jpg')" class="w-min-792" style="height: 490px;">
				<img :src="require('@/assets/' + 'carousel05.jpg')" class="w-min-792" style="height: 490px;">
			</div>
			<div class="d-flex control position-absolute">
				<div class="circle mx-1" style="width: 15px; height: 15px;"
				@click="carousel_clicked(0)"
				:class="{'bg-white' : website.carousel_index == 0,'bg-white-opacity' : website.carousel_index != 0}"></div>
				<div class="circle mx-1 " style="width: 15px; height: 15px;"
				@click="carousel_clicked(1)"
				:class="{'bg-white' : website.carousel_index == 1,'bg-white-opacity' : website.carousel_index != 1}"></div>
				<div class="circle mx-1 " style="width: 15px; height: 15px;"
				@click="carousel_clicked(2)"
				:class="{'bg-white' : website.carousel_index == 2,'bg-white-opacity' : website.carousel_index != 2}"></div>
				<div class="circle mx-1 " style="width: 15px; height: 15px;"
				@click="carousel_clicked(3)"
				:class="{'bg-white' : website.carousel_index == 3,'bg-white-opacity' : website.carousel_index != 3}"></div>
				<div class="circle mx-1 " style="width: 15px; height: 15px;"
				@click="carousel_clicked(4)"
				:class="{'bg-white' : website.carousel_index == 4,'bg-white-opacity' : website.carousel_index != 4}"></div>
				
			</div>
		</div>
		<div class="w-15 d-flex flex-column justify-content-between">
			<img :src="require('@/assets/' + 'carousel-right01.jpg')" class="w-100">
			<img :src="require('@/assets/' + 'carousel-right01.jpg')" class="w-100">
			<img :src="require('@/assets/' + 'carousel-right01.jpg')" class="w-100">
		</div>
	</div>
</template>

<script>
	import {mapState,mapActions,mapMutations} from 'vuex'
		
	export default {
		computed : {
			...mapState(['website','commodity'])
		},
		methods : {
			...mapActions({
				'getCategoryList' : 'commodity/get_category_list'
			}),
			...mapMutations({
				'level1_hover' : 'commodity/level1_hover',
				'level3_click' : 'commodity/level3_click'
			}),		
			carousel_clicked(x){
				this.website.carousel_index = x
			}
		},
		mounted() {			
			this.getCategoryList('')			
		}
	}
</script>

<style>
	.control{
		right: 20px;
		bottom: 20px;
	}
	
	.cate{
		top: 0px;
		left: 200px;
		z-index: 99;
	}
</style>