import Vue from 'vue'
import VueRouter from 'vue-router'
import VueValidator from 'vue-validator'
import { sync } from 'vuex-router-sync'
import store from './vuex/store'
import configRouter from './routes'
import filters from './utils/filters'
import App from './components/App.vue'
import 'font-awesome/css/font-awesome.css'
import 'bootstrap/dist/css/bootstrap.css'
import 'vue-toast/dist/vue-toast.min.css'
import './assets/styles/css/global.scss'

Vue.config.debug = true
Vue.use(VueRouter)
Vue.use(VueValidator)
Object.keys(filters).forEach(k => Vue.filter(k, filters[k]))

const router = new VueRouter({
    history: true, //启用HTML5 history
    saveScrollPosition: true, //当用户点击回退按钮时,借助HTML5 history中的popstate事件对应的state来重置页面的滚动位置
    suppressTransitionError: true,// true : 在场景切换钩子函数中发生的异常被吞掉
    linkActiveClass: 'active'
})
configRouter(router)
sync(store, router)

router.start(Vue.extend(App), '#root')
window.router = router
