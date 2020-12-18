"use strict";
exports.__esModule = true;
var vue_1 = require("vue");
var vue_router_1 = require("vue-router");
var index_vue_1 = require("@/components/routerView/index.vue");
vue_1["default"].use(vue_router_1["default"]);
var originalPush = vue_router_1["default"].prototype.push;
vue_router_1["default"].prototype.push = function push(location) {
    //@ts-ignore
    return originalPush.call(this, location)["catch"](function (err) { return err; });
};
var routes = [
    {
        path: '/',
        name: 'home',
        redirect: '/',
        meta: {
            cache: true
        },
        component: function () { return Promise.resolve().then(function () { return require('@/components/global/index.vue'); }); },
        children: [
            {
                path: '',
                name: 'index',
                meta: {
                    cache: true
                },
                component: function () { return Promise.resolve().then(function () { return require('@/views/index/index.vue'); }); }
            },
            {
                path: '/login',
                name: 'login',
                redirect: '/login/signin',
                meta: {
                    cache: true
                },
                component: function () { return Promise.resolve().then(function () { return require('@/views/login/index.vue'); }); },
                children: [
                    {
                        path: 'signin',
                        name: 'signin',
                        component: function () { return Promise.resolve().then(function () { return require('@/views/login/signin/index.vue'); }); }
                    },
                    {
                        path: 'signup',
                        name: 'signup',
                        component: function () { return Promise.resolve().then(function () { return require('@/views/login/signup/index.vue'); }); }
                    },
                    {
                        path: 'findusername',
                        name: 'findusername',
                        component: function () { return Promise.resolve().then(function () { return require('@/views/login/findusername/index.vue'); }); }
                    },
                    {
                        path: 'findpassword',
                        name: 'findpassword',
                        component: function () { return Promise.resolve().then(function () { return require('@/views/login/findpassword/index.vue'); }); }
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
                component: function () { return Promise.resolve().then(function () { return require('@/views/active/index.vue'); }); },
                redirect: '/active/:active_type/list',
                children: [
                    {
                        path: 'list',
                        name: 'list',
                        meta: {
                            title: 'list',
                            cache: false
                        },
                        component: function () { return Promise.resolve().then(function () { return require('@/views/active/list/index.vue'); }); }
                    },
                    {
                        path: 'info/:id',
                        name: 'info',
                        meta: {
                            title: 'info'
                        },
                        component: function () { return Promise.resolve().then(function () { return require('@/views/active/info/index.vue'); }); }
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
                component: function () { return Promise.resolve().then(function () { return require('@/views/customer/index.vue'); }); },
                redirect: '/customer/notice',
                children: [
                    {
                        path: 'notice',
                        name: 'notice',
                        meta: {
                            title: '공지사항'
                        },
                        component: function () { return Promise.resolve().then(function () { return require('@/views/customer/notice/index.vue'); }); }
                    },
                    {
                        path: 'problem',
                        name: 'problem',
                        meta: {
                            title: '자주 묻는 질문'
                        },
                        component: function () { return Promise.resolve().then(function () { return require('@/views/customer/problem/index.vue'); }); }
                    },
                    {
                        path: 'answer',
                        name: 'answer',
                        meta: {
                            title: '1:1 문의'
                        },
                        component: function () { return Promise.resolve().then(function () { return require('@/views/customer/answer/index.vue'); }); }
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
                component: function () { return Promise.resolve().then(function () { return require('@/views/club/index.vue'); }); },
                redirect: '/club/creation',
                children: [
                    {
                        path: 'creation',
                        name: 'creation',
                        meta: {
                            title: '클럽창작과비평',
                            cache: true
                        },
                        component: index_vue_1["default"],
                        redirect: '/club/creation',
                        children: [
                            {
                                path: '',
                                meta: {
                                    cache: true
                                },
                                component: function () { return Promise.resolve().then(function () { return require('@/views/club/creation/index.vue'); }); }
                            },
                            {
                                path: 'info/:id',
                                meta: {
                                    title: 'info'
                                },
                                component: function () { return Promise.resolve().then(function () { return require('@/views/club/info/index.vue'); }); }
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
                        component: index_vue_1["default"],
                        redirect: '/club/apply',
                        children: [
                            {
                                path: '',
                                meta: {
                                    cache: true
                                },
                                component: function () { return Promise.resolve().then(function () { return require('@/views/club/apply/index.vue'); }); }
                            },
                            {
                                path: 'info/:id',
                                meta: {
                                    title: 'info'
                                },
                                component: function () { return Promise.resolve().then(function () { return require('@/views/club/info/index.vue'); }); }
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
                component: function () { return Promise.resolve().then(function () { return require('@/views/user/index.vue'); }); },
                redirect: '/user/club',
                children: [
                    {
                        path: 'club',
                        name: 'user_club',
                        meta: {
                            title: '读书会'
                        },
                        component: function () { return Promise.resolve().then(function () { return require('@/views/user/club/index.vue'); }); }
                    },
                    {
                        path: 'pay',
                        name: 'user_pay',
                        meta: {
                            title: '支付列表'
                        },
                        component: function () { return Promise.resolve().then(function () { return require('@/views/user/pay/index.vue'); }); }
                    },
                    {
                        path: 'coupon',
                        name: 'user_coupon',
                        meta: {
                            title: '优惠券'
                        },
                        component: function () { return Promise.resolve().then(function () { return require('@/views/user/coupon/index.vue'); }); }
                    },
                    {
                        path: 'active',
                        name: 'user_active',
                        meta: {
                            title: '我的活动'
                        },
                        component: function () { return Promise.resolve().then(function () { return require('@/views/user/active/index.vue'); }); }
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
                component: function () { return Promise.resolve().then(function () { return require('@/views/serial/index.vue'); }); },
                children: [
                    {
                        path: 'date',
                        name: 'date',
                        meta: {
                            cache: true
                        },
                        component: function () { return Promise.resolve().then(function () { return require('@/views/serial/date/index.vue'); }); }
                    },
                    {
                        path: 'book_info/:id',
                        name: 'book_info',
                        meta: {
                            cache: undefined
                        },
                        component: function () { return Promise.resolve().then(function () { return require('@/views/serial/book_info/index.vue'); }); }
                    },
                    {
                        path: 'chapter_info/:book_id/:info_id',
                        name: 'chapter_info',
                        component: function () { return Promise.resolve().then(function () { return require('@/views/serial/chapter_info/index.vue'); }); }
                    }
                ]
            },
            {
                path: '/service/:type',
                name: 'service',
                meta: {
                    cache: false
                },
                component: function () { return Promise.resolve().then(function () { return require('@/views/service/index.vue'); }); }
            },
            {
                path: '/other',
                name: 'other',
                redirect: '/other/pay/fail',
                component: function () { return Promise.resolve().then(function () { return require('@/views/other/index.vue'); }); },
                meta: {
                    cache: true
                },
                children: [
                    {
                        path: 'pay/:type',
                        name: 'pay',
                        component: function () { return Promise.resolve().then(function () { return require('@/views/other/pay/index.vue'); }); }
                    },
                ]
            },
            {
                path: 'myclub/:id',
                name: 'myclub',
                component: function () { return Promise.resolve().then(function () { return require('@/views/myclub/index.vue'); }); },
                redirect: 'myclub/:id/notice',
                children: [
                    {
                        path: 'notice',
                        name: 'club_notice',
                        component: function () { return Promise.resolve().then(function () { return require('@/views/myclub/notice/index.vue'); }); }
                    },
                    {
                        path: 'task',
                        name: 'club_task',
                        component: function () { return Promise.resolve().then(function () { return require('@/views/myclub/task/index.vue'); }); }
                    },
                    {
                        path: 'discuss',
                        name: 'club_discuss',
                        component: function () { return Promise.resolve().then(function () { return require('@/views/myclub/discuss/index.vue'); }); }
                    },
                ]
            }
        ]
    },
];
var router = new vue_router_1["default"]({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: routes
});
exports["default"] = router;
