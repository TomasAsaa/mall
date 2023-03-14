import {
	createStore
} from 'vuex'
import website from './module/website.js'
import commodity from './module/commodity.js'


export default createStore({

	modules: {
		website,
		commodity
	}
})
