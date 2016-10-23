import {
	GET_CAMERA_LIST_SUCCESS,
	GET_CAMERA_LIST_FAILURE
} from '../types'

const state = {
    items:[],
    error: false,
    msg: ''
}

const mutations = {
    [GET_CAMERA_LIST_FAILURE](state, action){
        state.items = []
        state.error = true
        state.msg = action.msg
  	},
    [GET_CAMERA_LIST_SUCCESS](state, action){
        state.items = action.cameraList
        state.error = false
        state.msg = ''
  	}
}

export default {
    state,
  	mutations
}
