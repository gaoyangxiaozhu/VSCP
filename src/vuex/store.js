import Vue from 'vue'
import Vuex from 'vuex'
import middlewares from './middlewares'
import videoList from './modules/video.list'
import videoDetail from './modules/video.detail'
import auth from './modules/auth'
import videoOptions from './modules/video.options'
import taskOptions from './modules/task.options'
import logins from './modules/logins'
import cameraList from './modules/camera.list'
import showmsg from './modules/showmsg'

const debug = process.env.NODE_ENV !== 'production'
Vue.use(Vuex)
Vue.config.debug = debug
Vue.config.warnExpressionErrors = false

export default new Vuex.Store({
    modules: {
        videoList,
        videoDetail,
        auth,
        videoOptions,
        taskOptions,
        logins,
        cameraList,
        showmsg
    },
    strict: debug,
    middlewares
})
