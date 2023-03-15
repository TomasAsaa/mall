import {
	createRouter,
	createWebHistory
} from 'vue-router'
import carousel from '@/components/carousel.vue'
import attrlist from '@/components/attrlist.vue'

const routes = [{
		path: '/',
		name: 'carousel',
		component: carousel
	},
	{
		path: '/attrlist',
		name: 'attrlist',
		component: attrlist
	}
]

const router = createRouter({
	history: createWebHistory(process.env.BASE_URL),
	routes
})

export default router
