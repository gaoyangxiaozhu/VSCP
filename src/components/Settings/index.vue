<template>
	<div class="settings-box">
		<div class="settings-container">
		  <h2 class="title">Setting</h2>
			<hr />
		  <div class="profile">
				<!-- nickname-->
		    <div class="control-group" id="settingsForm">
		    	<validator name="settingsValidation">
		        <form class="settings-form" @submit.prevent="mdUser" novalidate>
		          <div class="form-group">
		        		<label class="control-label">nickname</label>
		        		<input
		        			placeholder="2-15 characters, Chinese and English, numbers and underline"
		        			type="text"
		        			:value="nickname"
		        			@input="updateNickname"
		        			v-validate:nickname="{ required: true, minlength: 2, maxlength: 15, nickname:true }"
		        			class="form-control"
		        			v-bind:class="[$settingsValidation.nickname.invalid ? 'ng-invalid' : 'ng-valid', $settingsValidation.nickname.dirty ? 'ng-dirty' : '']" >
		          </div>
							<button type="submit" class="btn btn-block btn-lg btn-primary" :disabled="$settingsValidation.invalid">Save</button>
		        </form>
		      </validator>
		    </div>

			</div>
			<!-- content end -->
		</div>
	</div>
</template>

<script>
import { updateUser,getUserInfo } from '../../vuex/actions'

export default {
    el(){
        return 'settingsForm'
    },
    vuex:{
        getters:{
            nickname: ({auth}) => auth.user.nickname,
            auth: state => state.auth
        },
        actions:{
            updateUser,getUserInfo
        }
    },
    data(){
        return {
            newNickname: ''
        }
    },
    route:{
        activate (transition) {
            !this.auth.token?transition.redirect('/'):transition.next()
        }
    },
    validators: {
        nickname: function (val) {
            return /^[(\u4e00-\u9fa5)0-9a-zA-Z\_\s@]+$/.test(val)
        }
    },
    methods:{
        updateNickname(e){
            this.newNickname = e.target.value
        },
        mdUser(){
            if(this.newNickname){
                this.updateUser({ nickname: this.newNickname })
            }
        }
    }
}
</script>
