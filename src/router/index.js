import Vue from 'vue'
import Router from 'vue-router'
import Layout from '@/views/layout/Layout'

Vue.use(Router);
/**
 * hidden: true                   if `hidden:true` will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu, whatever its child routes length
 *                                if not set alwaysShow, only more than one route under the children
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noredirect           if `redirect:noredirect` will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    will control the page roles (you can set multiple roles)
    title: 'title'               the name show in sub-menu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar
    noCache: true                if true, the page will no be cached(default is false)
    breadcrumb: false            if false, the item will hidden in breadcrumb(default is true)
    affix: true                  if true, the tag will affix in the tags-view
  }
 **/
export const constantRouterMap = [{
    path: '/redirect',
    component: Layout,
    hidden: true,
    children: [{
        path: '/redirect/:path*',
        component: () => import('@/views/redirect/index')
    }]
}, {
    path: '',
    component: Layout,
    redirect: 'dashboard',
    children: [{
        path: 'dashboard',
        component: () => import('@/views/dashboard/index'),
        name: 'Dashboard',
        meta: {title: '首页', icon: 'dashboard', noCache: true, affix: true}
    }]
}, {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
}, {
    path: '/404',
    component: () => import('@/views/errorPage/404'),
    hidden: true
}, {
    path: '/403',
    component: () => import('@/views/errorPage/403'),
    hidden: true
}, {
    path: '/guide',
    component: Layout,
    redirect: '/guide/index',
    children: [{
        path: 'index',
        component: () => import('@/views/guide/index'),
        name: 'Guide',
        meta: {title: '引导页', icon: 'guide', noCache: true}
    }]
}];


export default new Router({
    // mode: 'history', // require instance support
    scrollBehavior: () => ({y: 0}),
    routes: constantRouterMap
});


export const asyncRouterMap = [{
    path: '/system',
    component: Layout,
    redirect: 'noredirect',
    name: 'System',
    meta: {
        title: '系统管理',
        icon: 'system'
    },
    children: [{
        path: 'user',
        component: () => import('@/views/system/user'),
        name: 'User',
        meta: {
            title: '用户管理',
            noCache: true
        }
    }, {
        path: '101',
        component: () => import('@/views/errorPage/403'),
        name: 'Page101',
        meta: {
            title: '角色管理',
            noCache: true
        }
    }, {
        path: '102',
        component: () => import('@/views/errorPage/403'),
        name: 'Page102',
        meta: {
            title: '部门管理',
            noCache: true
        }
    }, {
        path: '103',
        component: () => import('@/views/errorPage/403'),
        name: 'Page103',
        meta: {
            title: '字典管理',
            noCache: true
        }
    }, {
        path: '104',
        component: () => import('@/views/errorPage/403'),
        name: 'Page104',
        meta: {
            title: '菜单管理',
            noCache: true
        }
    }]
}, {
    path: '/error',
    component: Layout,
    redirect: 'noredirect',
    name: 'ErrorPages',
    meta: {
        title: '错误页面',
        icon: '404'
    },
    children: [{
        path: '403',
        component: () => import('@/views/errorPage/403'),
        name: 'Page403',
        meta: {
            title: '403',
            noCache: true
        }
    }, {
        path: '404',
        component: () => import('@/views/errorPage/404'),
        name: 'Page404',
        meta: {
            title: '404',
            noCache: true
        }
    }]
}, {
    path: '/permission',
    component: Layout,
    redirect: '/permission/index',
    alwaysShow: true, // will always show the root menu
    meta: {
        // auth: '/permission',
        title: '权限测试页',
        icon: 'lock',
        roles: ['admin', 'editor'] // you can set roles in root nav
    },
    children: [{
        path: 'page',
        component: () => import('@/views/permission/page'),
        name: 'PagePermission',
        meta: {
            // auth: '/permission/pagePermission',
            title: '页面权限',
            roles: ['admin'] // or you can only set roles in sub nav
        }
    }, {
        path: 'directive',
        component: () => import('@/views/permission/directive'),
        name: 'DirectivePermission',
        meta: {
            title: '指令权限',
            auth: '/permission/directive'
            // if do not set roles, means: this page does not require permission
        }
    }]
}, {
    path: '*',
    redirect: '/404',
    hidden: true
}];
