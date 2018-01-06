import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
	routes: [{
			path: '/',
			redirect: '/login'
		},
		{
			path: '/allcustomer',
			component: resolve => require(['../components/common/Home.vue'], resolve),
			children: [
				{
					path: '/',
					component: resolve => require(['../components/page/AllCustomer.vue'], resolve)
				},
				{
					path: '/addcustomer',
					component: resolve => require(['../components/page/AddCustomer.vue'], resolve)
				}
			]
		},
		{
			path: '/login',
			component: resolve => require(['../components/page/Login.vue'], resolve)
		},
	]
})