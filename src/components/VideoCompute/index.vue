<template lang="html">
    <div class="container video-compute">
            <div class="row">
                <div class="col-xs-3">
                    <Slidebar :camera-list="cameraList" :year="year" :month="month"  :day="day" :chan-id="chanId"></Slidebar>
                </div>
                <div class="col-xs-9">
                    <router-view></router-view>
                </div>
            </div>
    </div>
</template>

<script>

import { changeVideoOptions, getCameraList } from '../../vuex/actions'

import Loginmodal from '../Login/modal.vue'
import Scrolltop from '../Scrolltop/index.vue'
import Slidebar from '../Slidebar/index.vue'

const today = new Date()
export default {
    components: { Loginmodal, Scrolltop, Slidebar },
    computed:{
        chanId: {
            get(){
                return this._chanId
            },
            set(newVal){
                this.changeVideoOptions({ chanId: newVal })
            }
        },
        year: {
            get(){
                return this._year
            },
            set(newVal){
                this.changeVideoOptions({ year: newVal })
            }
        },
        month: {
            get(){
                return this._month
            },
            set(newVal){
                this.changeVideoOptions({ month: newVal })
            }
        },
        day: {
            get(){
                return this._day
            },
            set(newVal){
                this.changeVideoOptions({ day: newVal })
            }
        },
        page: {
            get(){
                return this._page
            },
            set(newVal){
                this.changeVideoOptions({ currentPage: newVal })
            }
        }
    },
    route: {
        data(transition){
            const routername = this.$route.name
            /*
                whether is VideoStorage or VideoStorageList route
                if current cameraList is null, nedd call this.getCameraList to get cameraList

                but  when $route.name is VideoStorage , we need according to current condation to init current videoOptons store
             */
            if(routername == 'videoCompute'){
                if(this.cameraList.length > 1){ // if current cameraList is already init
                    this.chanId = this.cameraList[0]['id']
                    this.year = today.getFullYear()
                    this.month = today.getMonth() + 1
                    this.day = today.getDate()
                    transition.next()

                }else{
                    this.getCameraList().then(() => {
                        if(!this.isError){
                            this.chanId = this.cameraList[0]['id']
                            this.year = today.getFullYear()
                            this.month = today.getMonth() + 1
                            this.day = today.getDate()
                        }
                        transition.next()
                    })
                }
            }else{
                // if current route is VideoStorageList and cameraList is null , call getCameraList to get it
                if(this.cameraList.length < 1){
                    this.getCameraList().then(() => {
                        transition.next()
                    })
                }
            }
        }
    },
    attached(){
    },
    methods:{
        openLoginModal(){
            this.$refs.modal.showModal()
        },
        handleChangeVideoOptions(options){
            this.updateStorageSubRoute(options)
        },
        updateStorageSubRoute(options){
            this.$route.router.go({
                name: 'videoComputeList',
                params:{
                    chanId: options.chanId,
                    year: options.year,
                    month: options.month,
                    day: options.day
                },
                query:{
                    page: options.currentPage || options.page || 1
                }
            })
        }
    },
    vuex:{
        getters:{
            cameraList: ({ cameraList }) => cameraList.items,
            _year : ({ videoOptions }) => videoOptions.item.year,
            _month: ({ videoOptions }) => videoOptions.item.month,
            _day: ({ videoOptions }) => videoOptions.item.day,
            _chanId: ({ videoOptions }) => videoOptions.item.chanId,
            _page: ({ videoOptions }) => videoOptions.item.currentPage,
            isError: ( { cameraList }) => cameraList.error
        },
        actions:{
            changeVideoOptions,
            getCameraList
        }
    }
}
</script>
