const getters = {
    // 标识用户是否已完成登录初始化、路由权限信息是否已加载
    loginInit: status => status.user.loginInit,
    token: status => status.user.token,
    menuList: status => status.user.menuList,
    noPermissionPath: staus => staus.user.noPermissionPath,



    addRouters: state => state.permission.addRouters,
    language: state => state.app.language,
    sidebar: state => state.app.sidebar,
    size: state => state.app.size,
    device: state => state.app.device,
    avatar: state => state.user.avatar,
    name: state => state.user.name,
    introduction: state => state.user.introduction,
    roles: state => state.user.roles,
    permission_routers: state => state.permission.routers,
    visitedViews: state => state.tagsView.visitedViews,
    cachedViews: state => state.tagsView.cachedViews,
    errorLogs: state => state.errorLog.logs
};
export default getters
