import {
	createStore
} from 'vuex'
import website from './module/website.js'


export default createStore({

	modules: {
		website
	}
})
