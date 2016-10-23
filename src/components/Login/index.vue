<template>
<div class="signin-box">
	<div class="signin-container">
	    <h4 class="title">Login</h4>
	    <div id="signinForm">
		    <validator name="signinValidation">
		      <form class="signin-form form-horizontal" @submit.prevent="login($signinValidation)" novalidate>
		    	    <div class="form-group">
		    	  		<div class="input-group">
		    	        <div class="input-group-addon">
		    	        	<i class="fa fa-envelope-o"></i>
		    	        </div>
		    	        <input type="text"
		    	        	v-model="user.email"
		    	        	v-validate:email="{ required: true, minlength: 3, maxlength: 30, email:true }"
		    	        	class="form-control"
		    	        	:class="[$signinValidation.email.invalid ? 'ng-invalid' : 'ng-valid', $signinValidation.email.dirty ? 'ng-dirty' : '']"
		    	        	placeholder="Email" />
		    	      </div>
		    	    </div>
		          <div class="form-group">
		        		<div class="input-group">
		              <div class="input-group-addon"><i class="fa fa-unlock-alt"></i></div>
		              <input type="password"
		              	v-model="user.password"
		              	v-validate:password="{ required: true }"
		              	class="form-control"
		              	:class="[$signinValidation.password.invalid ? 'ng-invalid' : 'ng-valid', $signinValidation.password.dirty ? 'ng-dirty' : '']"
		              	placeholder="Password" />
		            </div>
		          </div>
		          <div class="form-group">
		          	<button class="btn btn-primary btn-lg btn-block" type="submit" id="signin_btn" :disabled="$signinValidation.invalid">Login</button>
		          </div>
		    	</form>

		    </validator>
	    </div>
	</div>
</div>
</template>

<script>
import { localLogin } from '../../vuex/actions'

export default {
    el (){
        return '#signinForm'
    },
    vuex:{
        getters:{
            logins: ({logins}) => logins.items,
            token: ({auth}) => auth.token
        },
        actions:{
            localLogin
        }
    },
    validators: {
        email: function (val) {
            return /^(\w)+(\.\w+)*@(\w)+((\.\w+)+)$/.test(val)
        }
    },
    data (){
        return {
            user:{
                email:'',
                password:''
            }
        }
    },
    route: {
        activate:function (transition) {
            this.token?transition.redirect('/'):transition.next()
        }
    },
    created () {
        this.getCaptchaUrl()
        this.getSnsLogins()
    },
    methods: {
        login(signinValidation){
            if(signinValidation.valid){
                this.localLogin(this.user)
            }
        }
    }
}
</script>
