export default function (router) {
    router.map({
        '/': {
            name: 'home',
            component: require('./components/Home/index.vue')
        },
        '/login': {
            name: 'login',
            component: require('./components/Login/index.vue')
        },
        '/settings': {
            name: 'settings',
            component: require('./components/Settings/index.vue')
        },
        '/storage':{
            name: 'videoStorage',
            component: require('./components/VideoStorage/index.vue'),
            subRoutes: {
                '/':{
                    component: require('./components/VideoStorage/storageList.vue')
                },
                '/list/:chanId/:year/:month/:day':{
                    name: 'videoStorageList',
                    component: require('./components/VideoStorage/storageList.vue')
                }
            }
        },
        '/compute':{
            name: 'videoCompute',
            component: require('./components/VideoCompute/index.vue')
        },
        '*': {
            component: require('./components/NotFound.vue')
        }
    })
}
