<template lang="html">
    <div class="video-compute-list" >
        <div class="toolbar">
            <div class="checkbox">
                <label for="selectedAll">
                    <input type="checkbox" name="checkedAll" id="checkedAll" v-model="checkedAll" @change="selectedAllItem"/>
                    <span class="text-green">Selected Current All Videos</span>
                </label>
            </div>
            <div class="btn-group">

                <button type="button" name="button" class="btn btn-primary" v-if="checkedItem" transition="showbutton" @click.stop="startVideoJob">Start Video Compute Task</button>
            </div>
            <div class="intro" v-if="checkedNums">
                <span class="title">The Number of Choosed Videos: </span>
                <span class="text text-big-style-1">{{ checkedNums }}</span>
            </div>
        </div>
        <div class="table-container" v-if="!$loadingRouteData" transition="showcompute">
            <div>
                <table class="table table-bordered">
                    <thead>
                        <tr>
                            <th></th>
                            <th>Name</th>
                            <th>Size</th>
                            <th>Format</th>
                            <th>Start Time</th>
                            <th>Total Time</th>
                            <th>From</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="video in videoList">
                            <td class="checkbox">
                                <input type="checkbox" v-model="video.checked" @change="selectedItem(video)" tabindex="0"/>
                            </td>
                            <td>
                                <span> {{ video.name }}</span>
                            </td>
                            <td>
                                <span>{{ video.size}}M</span>
                            </td>
                            <td>
                                <span>{{ video.format }}</span>
                            </td>
                            <td>
                                <span>{{ video.startTime }}</span>
                            </td>
                            <td>
                                <span>{{ video.totalTime }}</span>
                            </td>
                            <td>
                                <span> {{ options.source }}</span>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
        <div v-if="!$loadingRouteData">
            <Pagination routename="videoComputeList" :options="options" :more="isMore"></Pagination>
        </div>
        <div class="loading" v-if="$loadingRouteData & showLoading">
            <span></span>
            <span></span>
            <span></span>
            <span>LOADING</span>
        </div>
    </div>
</template>
<script>

import { changeVideoOptions, getVideoList } from '../../vuex/actions'

import Pagination from '../Pagination/index.vue'
export default {
    components:{ Pagination },
    props: ['checkedList'],
    route: {
        /*
            each time we use route data hook functio to get videoList
        */
        data(transition){
            let options = this.options
            let chanId
            let year
            let month
            let day
            let currentPage
            let urlOptions

            if(transition.to.name != 'videoCompute'){
                if(this.$route && this.$route.params){
                    chanId  = this.$route.params.chanId
                    year = this.$route.params.year
                    month = this.$route.params.month
                    day = this.$route.params.day
                }
                if(this.$route && this.$route.query){
                    currentPage = this.$route.query.page
                }
                urlOptions = {  chanId, year, month, day, currentPage }
                this.options = { ...options, ...urlOptions }
            }

            setTimeout(()=>{
                options = this.options
                this.getVideoList(options, false).then(()=> {
                    this._videoList.forEach((item, index) => {
                        /*
                            Vue wraps an observed array’s mutation methods so they will  trigger view updates, even we push object t oarray

                            description:
                                I first make videoLsit as computed property:
                                like this:
                                {
                                    ...
                                    computed:{
                                        videoLsit: function(){
                                            return this._videoList.map((item, index) => {
                                                item.checked = false
                                                return item
                                            })
                                        }
                                }

                                }

                                but the problem is that when I update item's checked property , it would not trigger dom update beacuse
                                the cache mechanism of vue computed property( computed proeprty only re-evaluate when the dependencies have changed , in this case `_videoList`)

                                so i realize it as data property
                         */
                        this.videoList.push(Object.assign({}, item, { checked: false }))
                    })
                    transition.next()
                })
            }, 600)

        }
    },
    transitions:{
        showcompute:{
            beforeLeave(){
                this.showLoading = false
            },
            afterLeave(){
                this.showLoading = true
            }
        }
    },
    data(){
        return {
            showLoading: true, // show loading effect only transition effect over
            checkedAll: false, // whether select all video file in current page
            checkedItem: false, // whether have select at lease one video file
            videoList: [],
            checkedNums: 0
        }
    },
    computed: {
        options:{
            get(){
                return this._options
            },
            set(newVal){
                this.changeVideoOptions(newVal)
            }
        }
    },
    methods:{
        selectedItem(item){

            if(item.checked){
                this.checkedItem = true
                if(this.checkedList.indexOf(item.name) < 0){
                    this.checkedList.push(item.name)
                    this.checkedNums++
                }
            }else{
                this.checkedAll = false
                const index = this.checkedList.indexOf(item.name)
                if( index > -1){
                    this.checkedList.splice(index, 1)
                    this.checkedNums--
                }

                if(this.checkedList.length == 0 ) {
                    this.checkedNums = 0
                    this.checkedItem = false
                }
            }
        },
        selectedAllItem(){

            if(this.checkedAll){
                this.checkedItem = true

                this.videoList.forEach((item, index) => {
                    const name = item.name
                    if(this.checkedList.indexOf(name) < 0){
                        this.checkedList.push(name)
                        item.checked = true
                        this.checkedNums++
                    }
                })
            }else{
                this.checkedItem = false
                this.checkedNums = 0
                this.checkedList = []
                this.videoList.forEach((item, index) => item.checked = false )
            }
        },
        startVideoJob(){
            this.$parent.startVideoJob()
        }
    },
    vuex:{
        getters:{
            _options: ({ videoOptions }) => videoOptions.item,
            _videoList: ({ videoList }) => videoList.items,
            isMore: ({ videoList }) => videoList.isMore,
            isFetching: ({ videoList }) => videoList.isFetching
        },
        actions:{
            getVideoList,
            changeVideoOptions
        }
    }
}
</script>

<style lang="sass" scoped>
@import "../../assets/styles/css/mixin";
@import "../../assets/styles/css/variable";

.showcompute-transition{
    transition: all .2s ease-in;
    opacity: 1;
}
.showcompute-enter, .showcompute-leave{
    opacity: 0;
}

.showbutton-transition{
    transition: all .1s ease-in-out;
    opacity: 1;
}
.showbutton-enter, .showbutton-leave{
    opacity: 0;
}


.video-compute-list{
        .toolbar{
            .intro{
                position: relative;
                top: -7px;

                float:right;
                margin-right: 15px;

                color: black;
            }
        }
}
</style>
