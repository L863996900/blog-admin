import Vue from 'vue'
import VueRouter from 'vue-router'
// import ViewUI from 'view-design';

import Login from '../views/Login/login.vue'
import Layout from '../views/Layout.vue'

const Index = () => import('../views/Admin/index.vue')
const User = () => import('../views/Admin/user.vue')
const Leave = () => import('../views/Leave/leave.vue')
const Create = () => import('../views/Article/create.vue')
const ArticleList = () => import('../views/Article/list.vue')
const Comments = () => import('../views/Comments/comments.vue')
const Reply = () => import('../views/Reply/reply.vue')
Vue.use(VueRouter)

const routes = [
    {
        path: '/login',
        meta: {
            title: "登录",
            noAuth: true
        },
        component: Login,
    },
    {
        path: '/',
        component: Layout,
        children: [
            {
                path: '/',
                name: 'index',
                meta: {
                    module: "/",
                    title: '首页'
                },
                component: Index,
            },

            //todo: 管理员
            {
                path: 'admin',
                name: 'admin',
                meta: {
                    module: "/admin",
                    group: "set",
                    title: '管理员 - 列表'
                },
                component: User,
            },
            // todo: 分类管理
            // {
            //     path: 'category',
            //     name: 'category',
            //     meta: {
            //     module: "/category",
            //     group: "category",
            //     title: '分类 - 列表'
            //     },
            //     component:  Category,
            // },
            //todo: 留言管理
            {
                path: 'leave',
                name: 'leave',
                meta: {
                    module: "/leave",
                    group: "leave",
                    title: '留言 - 列表'
                },
                component: Leave,
            },
            //todo: 文章管理
            {
                path: 'article',
                name: 'article',
                meta: {
                    module: "/article",
                    group: "article",
                    title: '文章 - 列表'
                },
                component: ArticleList,
            },
            {
                path: 'article/create',
                name: 'article/create',
                meta: {
                    module: "/article/create",
                    group: "article",
                    title: '文章 - 创建'
                },
                component: Create,
            },
            //todo: 评论管理
            {
                path: 'comments',
                name: 'comments',
                meta: {module: "/comments", group: "comments", title: '评论 - 列表'},
                component: Comments,
            },
            //todo: 回复评论管理
            {
                path: 'reply/:comment_id',
                name: 'reply',
                meta: {module: "/comments", group: "comments", title: '回复评论 - 列表'},
                component: Reply,
            }
        ]
    }
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes,
    scrollBehavior(to, from, savedPosition) {
        if (savedPosition) {
            return savedPosition
        } else {
            return {x: 0, y: 0}
        }
    }
})

// router.beforeEach(async (to, from, next) => {
//     ViewUI.LoadingBar.start();
//     let token =localStorage.getItem("userToken");
//     if (token) {
//         this.$store.dispatch('admin/auth').then(() => {
//             next()
//
//         }).catch(err => {
//             ViewUI.Message.error(err.data.msg || '权限未授权')
//             setTimeout(() => {
//                 next('/login')
//             }, 1500);
//         })
//
//     } else {
//         // 判断是否需要登录
//         if (to.meta.noAuth) {
//             next()
//
//         } else {
//             ViewUI.Message.error('权限未授权')
//             setTimeout(() => {
//                 next('/login')
//             }, 1500)
//         }
//     }
// });
//
// router.afterEach(() => {
//     ViewUI.LoadingBar.finish();
//     window.scrollTo(0, 0);
// });
export default router
