import Vue from 'vue';
import VueRouter, { RouteConfig } from 'vue-router';
import Rview from "@/components/routerView/index.vue";
Vue.use(VueRouter);


const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location: import("vue-router").RawLocation) {
	//@ts-ignore
	return originalPush.call(this, location).catch((err: any) => err)
}

const routes: RouteConfig[] = [
	{
		path: '/',
		name: 'home',
		redirect: '/',
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
			{
				path: '/club',
				name: 'club',
				meta:{
					title:'모임신청'
				},
				component: () => import('@/views/club/index.vue'),
				redirect: '/club/creation',
				children:[
					{
						path: 'creation',
						name: 'creation',
						meta:{
							title:'클럽창작과비평'
						},
						component: Rview,
						redirect: '/club/creation',
						children:[
							{
								path: '',
								component: () => import('@/views/club/creation/index.vue'),
							},
							{
								path:'info/:id',
								meta:{
									title:'info'
								},
								component: () => import('@/views/club/info/index.vue'),
							}
						]
					},
					{
						path: 'apply',
						name: 'apply',
						meta:{
							title:'북클럽필라멘트'
						},
						component: Rview,
						redirect: '/club/apply',
						children:[
							{
								path: '',
								component: () => import('@/views/club/apply/index.vue'),
							},
							{
								path:'info/:id',
								meta:{
									title:'info'
								},
								component: () => import('@/views/club/info/index.vue'),
							}
						]
					},
				]
			},
			{
				path: '/user',
				name: 'user',
				meta:{
					title:'我的'
				},
				component: () => import('@/views/user/index.vue'),
				redirect: '/user/myclub',
				children:[
					{
						path: 'myclub',
						name: 'myclub',
						meta:{
							title:'读书会'
						},
						component: () => import('@/views/user/myclub/index.vue'),
					}
				]
			},
			{
				path: '/serial',
				name: 'serial',
				redirect: '/serial/date',
				component: () => import('@/views/serial/index.vue'),
				children:[
					{
						path:'date',
						name:'date',
						component:() => import('@/views/serial/date/index.vue')
					}
				]
			}
		]
	},
];

const router = new VueRouter({
	mode: 'history',
	base: process.env.BASE_URL,
	routes,
});

export default router;
