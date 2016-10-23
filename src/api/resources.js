import Vue from 'vue'
import VueResource from 'vue-resource'
import { API_ROOT } from '../config'
import { getCookie, signOut } from '../utils/authService'

Vue.use(VueResource)

// HTTP相关
Vue.http.options.crossOrigin = true

Vue.http.interceptors.push((request, next)=>{
    // 这里对请求体进行处理
    request.headers = request.headers || {}
    if (getCookie('token')) {
        request.headers.Authorization = 'Bearer ' + getCookie('token').replace(/(^\")|(\"$)/g, '')
    }
    next((response) => {
        // 这里可以对响应的结果进行处理
        if (response.status === 401) {
            signOut()
            window.location.pathname = '/login'
        }
    })
})

export const UserResource = Vue.resource(API_ROOT + '/users/{id}')
export const AuthResource = Vue.resource(API_ROOT + '/auth/{id}')
export const VideoResource = Vue.resource(API_ROOT + '/video/{id}/{controller}')
export const CameraResource = Vue.resource(API_ROOT + '/camera/{id}')
