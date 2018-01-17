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
				},
				{
					path: '/allsite',
					component: resolve => require(['../components/page/AllSite.vue'], resolve)
				},
				{
					path: '/addsite',
					component: resolve => require(['../components/page/AddSite.vue'], resolve)
				},
				{
					path: '/updatesite/:id',
					component: resolve => require(['../components/page/AddSite.vue'], resolve),
					props: true
				},
				{
					path: '/allcompany',
					component: resolve => require(['../components/page/AllCompany.vue'], resolve)
				},
				{
					path: '/addcompany',
					component: resolve => require(['../components/page/AddCompany.vue'], resolve)
				},
				{
					path: '/updatecompany/:id',
					component: resolve => require(['../components/page/AddCompany.vue'], resolve),
					props: true
				}
			]
		},
		{
			path: '/login',
			component: resolve => require(['../components/page/Login.vue'], resolve)
		},
	]
})