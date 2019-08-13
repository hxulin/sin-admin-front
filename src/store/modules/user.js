import {loginByUsername, logout, getUserInfo} from '@/api/login'
import {getToken, setToken, removeToken} from '@/utils/auth'

const user = {
    state: {
        uid: '',
        loginName: '',
        nickname: '',
        avatar: '',
        token: getToken(),
        loginInit: false,  // 标识用户是否已完成登录初始化、路由权限信息是否已加载
        menuList: [],
        noPermissionPath: [],  // 记录当前用户无访问权限的路径

        status: '',
        code: '',
        introduction: '',
        roles: [],
        setting: {
            articlePlatform: []
        }
    },

    mutations: {
        SET_UID: (state, uid) => {
            state.uid = uid;
        },
        SET_LOGIN_NAME: (state, loginName) => {
            state.loginName = loginName;
        },
        SET_NICKNAME: (state, nickname) => {
            state.nickname = nickname;
        },
        SET_AVATAR: (state, avatar) => {
            state.avatar = avatar;
        },
        SET_TOKEN: (state, token) => {
            state.token = token;
        },
        SET_LOGIN_INIT: (state, loginInit) => {
            state.loginInit = loginInit;
        },
        SET_MENU_LIST: (state, menuList) => {
            state.menuList = menuList;
        },
        SET_NO_PERMISSION_PATH: (state, noPermissionPath) => {
            state.noPermissionPath = noPermissionPath;
        },




        SET_CODE: (state, code) => {
            state.code = code
        },

        SET_INTRODUCTION: (state, introduction) => {
            state.introduction = introduction
        },
        // SET_SETTING: (state, setting) => {
        //   state.setting = setting
        // },
        // SET_STATUS: (state, status) => {
        //   state.status = status
        // },
        SET_ROLES: (state, roles) => {
            state.roles = roles
        }
    },

    actions: {

        // 用户名登录
        LoginByUsername({commit}, loginInfo) {
            return new Promise((resolve, reject) => {
                loginByUsername(loginInfo).then(response => {
                    const result = response.data;
                    if (result.code === 0) {
                        const token = result.data;
                        commit('SET_TOKEN', token);
                        setToken(token);
                    } else {
                        reject(result.msg);
                    }
                    resolve();
                }).catch(error => {
                    reject(error);
                })
            })
        },

        // 获取用户信息
        GetUserInfo({commit}) {
            return new Promise((resolve, reject) => {
                getUserInfo().then(response => {
                    const result = response.data;
                    const loginInfo = result.data.loginInfo;

                    commit('SET_UID', loginInfo.id);
                    commit('SET_LOGIN_NAME', loginInfo.loginName);
                    commit('SET_NICKNAME', loginInfo.nickname);
                    commit('SET_AVATAR', loginInfo.avatar);
                    commit('SET_MENU_LIST', result.data.menuList);

                    resolve(response)
                }).catch(error => {
                    reject(error)
                })
            })
        },

        // 登出
        LogOut({commit, state}) {
            return new Promise((resolve, reject) => {
                logout(state.token).then(() => {
                    commit('SET_TOKEN', '');
                    commit('SET_MENU_LIST', []);
                    commit('SET_NO_PERMISSION_PATH', []);
                    commit('SET_LOGIN_INIT', false);  // 重置登录初始化信息
                    removeToken();
                    resolve();
                }).catch(error => {
                    reject(error);
                })
            })
        },

        // 前端登出
        FedLogOut({commit}) {
            return new Promise(resolve => {
                commit('SET_TOKEN', '');
                commit('SET_MENU_LIST', []);
                commit('SET_NO_PERMISSION_PATH', []);
                commit('SET_LOGIN_INIT', false);  // 重置登录初始化信息
                removeToken();
                resolve();
            });
        },

        // 动态修改权限
        ChangeRoles({commit, dispatch}, role) {
            return new Promise(resolve => {
                commit('SET_TOKEN', role);
                setToken(role);
                getUserInfo(role).then(response => {
                    const data = response.data;
                    commit('SET_ROLES', data.roles);
                    commit('SET_NAME', data.name);
                    commit('SET_AVATAR', data.avatar);
                    commit('SET_INTRODUCTION', data.introduction);
                    dispatch('GenerateRoutes', data);  // 动态修改权限后 重绘侧边菜单
                    resolve()
                })
            })
        }
    }
};

export default user
