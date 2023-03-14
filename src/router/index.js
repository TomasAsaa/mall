import {
	createRouter,
	createWebHistory
} from 'vue-router'
import carousel from '@/components/carousel.vue'

const routes = [{
	path: '/',
	name: 'carousel',
	component: carousel
}, ]

const router = createRouter({
	history: createWebHistory(process.env.BASE_URL),
	routes
})

export default router
