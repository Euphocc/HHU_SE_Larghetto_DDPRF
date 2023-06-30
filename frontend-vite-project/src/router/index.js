import { createRouter, createWebHistory } from 'vue-router'
import NotFound from '../components/module_display/NotFound.vue'
import UserInfo from '../components/module_display/UserInfo.vue'
import NewModule from '../components/module_display/NewModule.vue'
import UploadPredict from '../components/module_display/UploadPredict.vue'
import About from '../components/module_display/About.vue'
import Login from '../components/module_display/Login.vue'

const router = createRouter({
    // 指定路由模式
    history: createWebHistory(),
    // 路由地址
    routes: [
        {
            path: '',
            redirect: '/About',
        }, {
            path: '/',
            name: 'About',
            component: About,
        }, {
            path: '/UserInfo',
            name: 'UserInfo',
            component: UserInfo,
        }, {
            path: '/NewModule',
            name: 'NewModule',
            component: NewModule,
        }, {
            path: '/UploadPredict',
            name: 'UploadPredict',
            component: UploadPredict,
        }, {
            path: '/:pathMatch(.*)*',
            name: 'NotFound',
            component: NotFound,
        }, {
            path: '/About',
            name: 'About',
            component: About,
        }, {
            path: '/Login',
            name: 'Login',
            component: Login,
        }
    ]
})
router.beforeEach((to, from, next) => {
    if (localStorage.isLogin === 'true') {// 已登录
        if (to.name === 'Login') {
            next({ name: 'About' });// 重复登录跳转到主页
        }
        else next();
    } else {
        if (to.name === 'Login') {// 未登录则判断是否为主页，避免无限循环
            next();
        } else if (to.name === 'About') {
            next();
        }
        else {
            next({ name: 'Login' });// 强制导航守卫
        }
    }
})

export default router