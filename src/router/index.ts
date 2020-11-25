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
			{
				path: '/customer',
				name: 'customer',
				meta:{
					title:'고객센터'
				},
				component: () => import('@/views/customer/index.vue'),
				redirect: '/customer/notice',
				children:[
					{
						path: 'notice',
						name: 'notice',
						meta:{
							title:'공지사항'
						},
						component: () => import('@/views/customer/notice/index.vue'),
					},
					{
						path: 'problem',
						name: 'problem',
						meta:{
							title:'자주 묻는 질문'
						},
						component: () => import('@/views/customer/problem/index.vue'),
					},
					{
						path: 'answer',
						name: 'answer',
						meta:{
							title:'1:1 문의'
						},
						component: () => import('@/views/customer/answer/index.vue'),
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
