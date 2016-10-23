<template lang="html">
    <div class="slidebar">
        <div class="brand">
            <span>v</span>
            <span>s</span>
            <span>c</span>
            <span>p</span>
        </div>
        <div class="nav nav-stack">
            <div class="nav-item camera-intro-box" >
                <div class="camera-intro" data-id="{{ item.id }}" v-for="item in cameraList" track-by="id">
                    <div class="camera-name" @click="changeChanId(item.id, $event)">
                        <i class="fa fa-video-camera"></i>
                        <span>{{ item.name }} </span>
                        <span> {{ item.open }}</span>
                    </div>
                    <div class="camera-years">
                            <div data-year="{{ year }}" @click.stop="showCalendar(year, item.id, $event)"> <span>{{ year }}</span> </div>
                    </div>
                </div>
            </div>
        </div>
        <Calendar :year="year" :month="month" :day="day" :open="isOpen" :trigger-dom="triggerDom"></Calendar>
    </div>

</template>

<script>
import { changeVideoOptions } from '../../vuex/actions'

import Calendar from '../Calendar/index.vue'

export default {
    components: { Calendar },
    props: [ 'cameraList', 'chanId', 'year', 'month', 'day'],
    data () {
        return {
            isOpen: false, // default close calendar
            triggerDom: ''
        }
    },
    attached () {
        this.triggerDom = document.body
    },
    methods: {
        openSubmenu(event){
            const target = event.currentTarget
            const parent = target.parentNode
            if(parent.classList.contains('open')){
                parent.classList.remove('open')
                return
            }
            parent.classList.add('open')
        },
        changeChanId(chanId, event){
            this.chanId = chanId
            this.openSubmenu(event)
        },
        changeYear(year){
            this.year = year
        },
        showCalendar(year, chanId, event){
            // if already open calendar and chanId , year is not change
            if(this.year == year && this.chanId == chanId && this.isOpen) return


            if(this.chanId != chanId) {
                this.changeChanId(chanId)
            }
            if(this.year != year){
                this.changeYear(year)
            }
            this.triggerDom = event.currentTarget
            this.isOpen = true

            if(this.chanId != chanId || this.year != year){
                this.changeVideoOptions({ chanId: this.chanId, year: year, month: 1, day: 1 })
                this.handleChangeVideoOptions({ chanId: this.chanId, year: year, month: 1, day: 1 })
            }
        },
        handleChangeDate(date){
            let chanId = this.chanId
            this.changeVideoOptions({ ...date, ...{ 'chanId': chanId } })
            this.handleChangeVideoOptions({ ...date, ...{ 'chanId': chanId } })
        },
        handleChangeVideoOptions(options){
            this.$parent.handleChangeVideoOptions(options)
        }
    },
    vuex:{
        getters:{

        },
        actions:{
            changeVideoOptions
        }
    }
}
</script>

<style lang="sass">
@import "../../assets/styles/css/mixin";
@import "../../assets/styles/css/variable";
.slidebar{

    text-align: center;
    > .brand{
        span{
            font-size: 4em;
            &:nth-child(1){
                color: $baseRedColor;
            }
            &:nth-child(2){
                color: $baseYellowColor;
            }
            &:nth-child(3){
                color: $baseGreenColor;
            }
        }
    }
    .camera-intro{
        position: relative;

        padding: 10px 0 0 20px;
        text-align: left;

        .camera-name{
            font-size: 20px;
            color: $linkBaseColor;
            cursor: pointer;

            &:hover{
                color: $linkBaseHoverColor;
            }
        }
        .camera-years{

            height: 0;
            overflow: hidden;
            padding-left: 40px;

            transition: height .3s ease-in-out;
            > div{
                position: relative;

                padding: 5px;

                cursor: pointer;

                &:before{
                    content:"";

                    position: absolute;
                    top: 50%;
                    left: -35px;

                    width: 0;
                    height: 0;

                    transition: width .2s ease-in .1s;

                    border: 1px solid $baseBorderColor;
                }

                span{

                    opacity: 0;
                    transition: opacity .2s ease-in-out .2s;
                }
            }
        }

        &:before{
            content: "";

            position: absolute;
            left: 25px;
            top: 28px;
            z-index: -1;
            height: 0;

            transition: height .2s ease-in;

            border: 1px solid $baseBorderColor;
        }

        &.open{
            &::before{

                height: 57%;
            }
            .camera-years{
                height: auto;
                > div {
                    opacity: 1;
                    &:before{
                        width: 35px;
                    }

                    span{
                        opacity: 1;
                    }
                }

            }

        }
    }
}

</style>
