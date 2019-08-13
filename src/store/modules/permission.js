import store from '@/store'
import {asyncRouterMap, constantRouterMap} from '@/router'

/**
 * 通过路由配置判断菜单是否与当前用户权限匹配
 * @param route 菜单路由
 */
function hasPermission(route) {
    if (route.meta && route.meta.auth) {
        return store.getters.menuList.includes(route.meta.auth);
    }
    return true;
}

/**
 * 递归过滤异步路由表，返回符合用户权限的路由表
 * @param routes asyncRouterMap
 * @param noPermissionPath 记录无访问权限的路由信息, 当访问时返回403页面
 */
function filterAsyncRouter(routes, noPermissionPath) {
    const result = [];
    routes.forEach(route => {

        // ES6 扩展运算符, 将数组转为用逗号分隔的参数序列
        const tmp = {...route};
        if (hasPermission(tmp)) {
            if (tmp.children) {
                tmp.children = filterAsyncRouter(tmp.children, noPermissionPath);
            }
            result.push(tmp);
        } else {
            // 无权限访问的路由信息
            noPermissionPath.push(tmp.meta.auth);
        }
    });
    return result;
}

const permission = {
    state: {
        routers: [],
        addRouters: []
    },
    mutations: {
        SET_ROUTERS: (state, routers) => {
            state.addRouters = routers;
            state.routers = constantRouterMap.concat(routers);
        }
    },
    actions: {
        GenerateRoutes({commit}) {
            return new Promise(resolve => {
                let noPermissionPath = [];
                commit('SET_ROUTERS', filterAsyncRouter(asyncRouterMap, noPermissionPath));
                commit('SET_NO_PERMISSION_PATH', noPermissionPath);
                commit('SET_LOGIN_INIT', true);  // 登录初始化完成
                resolve();
            });
        }
    }
};

export default permission
