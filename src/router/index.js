import {
	createRouter,
	createWebHistory
} from 'vue-router'
import carousel from '@/components/carousel.vue'
import attrlist from '@/components/attrlist.vue'
import spuInfo from '@/components/spuInfo.vue'
import register from '@/components/register.vue'
import logon from '@/components/logon.vue'

const routes = [{
		path: '/',
		name: 'carousel',
		component: carousel
	},
	{
		path: '/attrlist',
		name: 'attrlist',
		component: attrlist
	},
	{
		path: '/spuInfo',
		name: 'spuInfo',
		component: spuInfo
	},
	{
		path: '/register',
		name: 'register',
		component: register
	},
	{
		path: '/logon',
		name: 'logon',
		component: logon
	}
]

const router = createRouter({
	history: createWebHistory(process.env.BASE_URL),
	routes
})

export default router
