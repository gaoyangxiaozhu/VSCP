<template lang="html">
    <div class="video-compute-list">
        <div class="table-container">
            <div class="table-toolbar">
                <div class="btn-group">
                    <button type="button" name="button" class="btn btn-primart"></button>
                </div>
            </div>
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
                                <div class="">
                                    <input type="checkbox" v-model="video.selected" v-change="selectedItem(item)" tabindex="0">
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>

        </div>
        <div class="video-list-box" v-if="!$loadingRouteData" transition="showstorage">
            <div class="video-item"  v-for="video in videoList">
                <div class="flex-row">
                    <div class="s1 video-heading">
                        <div class="video-name">
                            <span>{{ video.name }}</span>
                            <i></i>
                        </div>

                    </div>
                </div>
                <div class="flex-row">
                    <div class="flex-column s1">
                        <div class="s1 video-size text-muted">
                            {{ video.size }}M
                        </div>
                        <div class="flex-column video-intro">
                            <div class="s1 video-start-time">
                            {{ video.startTime }}
                            </div>
                            <div class="s1 video-total-time">
                            {{ video.totalTime }}s
                            </div>
                        </div>
                    </div>

                </div>
                <div class="flex-row video-operate">
                    <div class="s1">
                        <button class="btn btn-primary" name="play">Play Video</button>
                        <button class="btn btn-default" name="download">Download</button>
                    </div>
                </div>
            </div>
        </div>
        <div v-if="!$loadingRouteData">
            <Pagination :options="options" :more="isMore"></Pagination>
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
    route: {
        data(transition){

            let options = this.options
            let chanId
            let year
            let month
            let day
            let currentPage
            let urlOptions

            if(transition.to.name != 'videoStorage'){
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
                this.getVideoList(options, false).then(()=> transition.next())
            }, 600)

        }
    },
    transitions:{
        showstorage:{
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
            showLoading: true // show loading effect only transition effect over
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
    vuex:{
        getters:{
            _options: ({ videoOptions }) => videoOptions.item,
            videoList: ({ videoList }) => videoList.items,
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

.showstorage-transition{
    transition: all .2s ease-in;
    opacity: 1;
}
.showstorage-enter, .showstorage-leave{
    opacity: 0;
}
</style>
