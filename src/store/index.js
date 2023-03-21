import {
	createStore
} from 'vuex'
import website from './module/website.js'
import commodity from './module/commodity.js'
import customer from './module/customer.js'


export default createStore({

	modules: {
		website,
		commodity,
		customer
	}
})
