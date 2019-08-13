import router from './router'
import store from './store'
import {Notification} from "element-ui";
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css'// progress bar style
import {getToken} from '@/utils/auth' // getToken from cookie

NProgress.configure({showSpinner: false});  // NProgress Configuration

const whiteList = ['/login', '/auth-redirect'];  // no redirect whitelist

router.beforeEach((to, from, next) => {
    NProgress.start();  // start progress bar
    if (getToken()) { // determine if there has token
        /* has token*/
        if (to.path === '/login') {
            next({path: '/'});
            NProgress.done() // if current page is dashboard will not trigger	afterEach hook, so manually handle it
        } else {
            if (!store.getters.loginInit) {  // 判断当前用户是否已拉取完user_info信息
                store.dispatch('GetUserInfo').then(response => { // 拉取user_info
                    store.dispatch('GenerateRoutes').then(() => {  // 生成可访问的路由表
                        router.addRoutes(store.getters.addRouters);  // 动态添加可访问路由表
                        // next({...to, replace: true});  // TODO 原代码, 浏览器报错：Uncaught (in promise) undefined
                        next({to, replace: true});  // 确保addRoutes已完成, set the replace: true so the navigation will not leave a history record
                    });
                }).catch(err => {
                    store.dispatch('FedLogOut').then(() => {
                        Notification.error({
                            title: '登录失败',
                            message: err
                        });
                        next({path: '/'})
                    })
                });
            } else {
                // 权限判断
                if (store.getters.noPermissionPath.includes(to.redirectedFrom)) {
                    next({path: '/401', replace: true, query: {noGoBack: true}});
                } else {
                    next();
                }
            }
        }
    } else {
        /* has no token*/
        if (whiteList.indexOf(to.path) !== -1) { // 在免登录白名单，直接进入
            next()
        } else {
            next(`/login?redirect=${to.path}`);  // 否则全部重定向到登录页
            NProgress.done() // if current page is login will not trigger afterEach hook, so manually handle it
        }
    }
});

router.afterEach(() => {
    NProgress.done(); // finish progress bar
});
