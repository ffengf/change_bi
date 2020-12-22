import Vue from 'vue';
import VueRouter, { RouteConfig } from 'vue-router';
import Rview from "@/components/routerView/index.vue";
import { component } from 'vue/types/umd';
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
		meta:{
			cache:true
		},
		component: () => import('@/components/global/index.vue'),
		children: [
			{
				path: '',
				name: 'index',
				meta: {
					cache: true
				},
				component: () => import('@/views/index/index.vue'),
			},
			{
				path: '/login',
				name: 'login',
				redirect: '/login/signin',
				meta: {
					cache: true
				},
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
				path: '/active/:active_type',
				name: 'active',
				meta: {
					title: '이벤트',
					cache: true
				},
				component: () => import('@/views/active/index.vue'),
				redirect: '/active/:active_type/list',
				children: [
					{
						path: 'list',
						name: 'list',
						meta: {
							title: 'list',
							cache: false
						},
						component: () => import('@/views/active/list/index.vue'),
					},
					{
						path: 'info/:id',
						name: 'info',
						meta: {
							title: 'info'
						},
						component: () => import('@/views/active/info/index.vue'),
					},
				]
			},
			{
				path: '/customer',
				name: 'customer',
				meta: {
					title: '고객센터',
					cache: true
				},
				component: () => import('@/views/customer/index.vue'),
				redirect: '/customer/notice',
				children: [
					{
						path: 'notice',
						name: 'notice',
						meta: {
							title: '공지사항'
						},
						component: () => import('@/views/customer/notice/index.vue'),
					},
					{
						path: 'problem',
						name: 'problem',
						meta: {
							title: '자주 묻는 질문'
						},
						component: () => import('@/views/customer/problem/index.vue'),
					},
					{
						path: 'answer',
						name: 'answer',
						meta: {
							title: '1:1 문의'
						},
						component: () => import('@/views/customer/answer/index.vue'),
					},
				]
			},
			{
				path: '/club',
				name: 'club',
				meta: {
					title: '모임신청',
					cache: true
				},
				component: () => import('@/views/club/index.vue'),
				redirect: '/club/creation',
				children: [
					{
						path: 'creation',
						name: 'creation',
						meta: {
							title: '클럽창작과비평',
							cache: true
						},
						component: Rview,
						redirect: '/club/creation',
						children: [
							{
								path: '',
								meta:{
									cache: true
								},
								component: () => import('@/views/club/creation/index.vue'),
							},
							{
								path: 'info/:id',
								meta: {
									title: 'info'
								},
								component: () => import('@/views/club/info/index.vue'),
							}
						]
					},
					{
						path: 'apply',
						name: 'apply',
						meta: {
							title: '북클럽필라멘트',
							cache: true
						},
						component: Rview,
						redirect: '/club/apply',
						children: [
							{
								path: '',
								meta:{
									cache: true
								},
								component: () => import('@/views/club/apply/index.vue'),
							},
							{
								path: 'info/:id',
								meta: {
									title: 'info'
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
				meta: {
					title: '마이페이지',
					cache: true
				},
				component: () => import('@/views/user/index.vue'),
				redirect: '/user/club',
				children: [
					{
						path: 'club',
						name: 'user_club',
						meta: {
							title: '독서모임'
						},
						component: () => import('@/views/user/club/index.vue'),
					},
					{
						path: 'pay',
						name: 'user_pay',
						meta: {
							title: '결제내역'
						},
						component: () => import('@/views/user/pay/index.vue'),
					},
					{
						path: 'coupon',
						name: 'user_coupon',
						meta: {
							title: '쿠폰조회'
						},
						component: () => import('@/views/user/coupon/index.vue'),
					},
					{
						path: 'active',
						name: 'user_active',
						meta: {
							title: '나의 이벤트'
						},
						component: () => import('@/views/user/active/index.vue'),
					}
				]
			},
			{
				path: '/serial',
				name: 'serial',
				redirect: '/serial/date',
				meta: {
					cache: true
				},
				component: () => import('@/views/serial/index.vue'),
				children: [
					{
						path: 'date',
						name: 'date',
						meta: {
							cache: true
						},
						component: () => import('@/views/serial/date/index.vue')
					},
					{
						path: 'book_info/:id',
						name: 'book_info',
						meta: {
							cache: undefined
						},
						component: () => import('@/views/serial/book_info/index.vue')
					},
					{
						path: 'chapter_info/:book_id/:info_id',
						name: 'chapter_info',
						component: () => import('@/views/serial/chapter_info/index.vue')
					}
				]
			},
			{
				path: '/service/:type',
				name: 'service',
				meta: {
					cache: false
				},
				component: () => import('@/views/service/index.vue')
			},
			{
				path: '/other',
				name: 'other',
				redirect: '/other/pay/fail',
				component: () => import('@/views/other/index.vue'),
				meta: {
					cache: true
				},
				children: [
					{
						path: 'pay/:type',
						name: 'pay',
						component: () => import('@/views/other/pay/index.vue'),
					},
				]
			},
			{
				path: 'myclub/:id',
				name: 'myclub',
				component: () => import('@/views/myclub/index.vue'),
				redirect:'myclub/:id/notice',
				children:[
					{
						path: 'notice',
						name:'club_notice',
						component: () => import('@/views/myclub/notice/index.vue')
					},
					{
						path: 'task',
						name:'club_task',
						component: () => import('@/views/myclub/task/index.vue')
					},
					{
						path: 'discuss',
						name:'club_discuss',
						component: () => import('@/views/myclub/discuss/index.vue')
					},
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
