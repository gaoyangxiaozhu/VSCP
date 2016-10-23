<template lang="html">
		<div class="navbar navbar-box navbar-skin">
            <div class="container">
                <div class="navbar-brand">
                    <span class="icon-brand"><i class="fa fa-cloud fa-4x"></i></span>

    			</div>
                <ul class="navbar-nav nav">
    				<li>
    					<a v-link="{ name: 'home' }" class="navbar-item"  title="Home">
    						Home
    					</a>
    				</li>
    				<li>
    					<a v-link="{ name: 'videoStorage' }" class="navbar-item" title="Video Storage">
    						Video Storage
    					</a>
    				</li>
    				<li>

    					<a v-link="{ name: 'videoCompute' }" class="navbar-item"  title="Video Compute">
    						Video Compute
    					</a>
    				</li>
    		  	</ul>
    		  	<ul class="navbar-expanded navbar-nav nav">
    			  	<li v-if="auth.token && auth.user">
    				  	<a href="javascript:;" class="navbar-item expanded-logout" @click="logout()" title="logout">
      						<i class="fa fa-sign-out"></i>
    					</a>
    					<a v-link="{ name: 'settings' }" href="javascript:;" class="navbar-item expanded-avatar" title="{{auth.user.nickname}}">
      						<img :src="auth.user.avatar || defaultAvatar" />
    					</a>
    				</li>
    	      		<li v-else>
    					<a v-link="{ name: 'login', activeClass:'active' }" class="navbar-item login" title="login">
    						Log in
    					</a>
    				</li>
    			</ul>
            </div>

		</div>
</template>

<script>
import { logout, getUserInfo } from '../vuex/actions'
import defaultAvatar from '../assets/images/avatar.png'

export default {
    components:{
    },
    vuex:{
        getters:{
            auth: state => state.auth
        },
        actions:{
            logout,
            getUserInfo
        }
    },
    computed: {
        defaultAvatar() {
            return defaultAvatar
        }
    },
    beforeCompile(){
        document.body.className = 'vscp'
    },
    created (){
        if(this.auth.token){
            this.getUserInfo()
        }
    },
    methods: {
        isCurrentRouteName(routename, prifex){
            switch (prifex) {
            case 'videoStorage':  return /videoStorage/.test(routename)
            case 'VideoCompute': return /VideoCompute/.test(routename)
            default : return false
            }
        }
    }
}
</script>
