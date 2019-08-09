import qs from 'qs'
import request from '@/utils/request'

export function getCaptcha() {
    return request({
        url: '/static/images/securityCode.png?t=' + new Date().getTime(),
        method: 'get',
        responseType: 'blob'
    });
}

export function loginByUsername(loginInfo) {
    loginInfo.loginName = loginInfo.loginName.trim();
    loginInfo.captcha = loginInfo.captcha.trim();
    return request({
        url: '/login',
        method: 'post',
        data: qs.stringify(loginInfo)
    })
}

export function logout() {
    return request({
        url: '/logout',
        method: 'post'
    })
}

export function getUserInfo() {
    return request({
        url: '/user/info',
        method: 'get'
    })
}

