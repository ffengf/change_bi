import Vue from 'vue';
import VueRouter, { RouteConfig } from 'vue-router';

Vue.use(VueRouter);

const routes: RouteConfig[] = [
	{
		path: '/',
		name: 'Home',
		component: () => import('@/components/global/index.vue'),
		children: [
			{
				path: '',
				name: 'index',
				component: () => import('@/views/index/index.vue'),
			},
			{
				path: '/login',
				name: 'login',
				component: () => import('@/views/login/index.vue'),
			},
		]
	},
];

const router = new VueRouter({
	mode: 'history',
	base: process.env.BASE_URL,
	routes,
});

export default router;
