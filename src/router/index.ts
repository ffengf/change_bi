import Vue from 'vue';
import VueRouter, { RouteConfig } from 'vue-router';

Vue.use(VueRouter);

//跳转相同路由报错
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location: import("vue-router").RawLocation) {
	//@ts-ignore
	return originalPush.call(this, location).catch((err: any) => err)
}

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
				redirect: '/login/signin',
				component: () => import('@/views/login/index.vue'),
				children: [
					{
						path: 'signin',
						name: 'signin',
						component: () => import('@/views/login/signin/index.vue'),
					},
					{
						path: 'signup',
						name: 'signup',
						component: () => import('@/views/login/signup/index.vue'),
					},
					{
						path: 'resetpass',
						name: 'resetpass',
						component: () => import('@/views/login/resetpass/index.vue'),
					},
					{
						path: 'findusername',
						name: 'findusername',
						component: () => import('@/views/login/findusername/index.vue'),
					},
					{
						path: 'findpassword',
						name: 'findpassword',
						component: () => import('@/views/login/findpassword/index.vue'),
					},
				]
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
