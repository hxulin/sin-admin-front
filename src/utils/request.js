import axios from 'axios'
import { MessageBox } from 'element-ui'
import { Notification } from 'element-ui'
import store from '@/store'
import { getToken } from '@/utils/auth'

// create an axios instance
const instance = axios.create({
  baseURL: process.env.VUE_APP_BASE_URL, // api 的 base_url
  timeout: 1000 * 12 // request timeout
});

// 设置post请求头
instance.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

// request interceptor
instance.interceptors.request.use(
    config => {
    // Do something before request is sent
    if (store.getters.token) {
      // 让每个请求携带token-- ['X-Token']为自定义key 请根据实际情况自行修改
      config.headers['Sin-Token'] = getToken();
    }
    return config
  }, error => {
    // Do something with request error
    console.log(error); // for debug
    Promise.reject(error);
  }
);

// response interceptor
instance.interceptors.response.use(
  response => response,
  error => {
    const { response } = error;
    if (response) {
      // 响应状态码不在2xx的范围
      if (response.status === 401) {
        MessageBox.confirm('你已被登出，请重新登录，或者取消继续留在该页面。', '登出提示', {
          confirmButtonText: '重新登录',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          store.dispatch('FedLogOut').then(() => {
            location.reload() // 为了重新实例化vue-router对象 避免bug
          })
        });
        return Promise.reject(undefined);
      }
      return Promise.reject(response.data.msg);
    } else {
      Notification.error({
        title: '网络连接失败',
        message: '当前网络连接不可用'
      });
      return Promise.reject(undefined);
    }
  }
);

export default instance
