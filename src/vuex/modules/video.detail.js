import {
	VIDEO_DETAIL
} from '../types'

const state = {
  	item:{}
}

const mutations = {
  	[VIDEO_DETAIL](state, action){
    	state.item = {...state.item, ...action.videoDetail }
  	}
}

export default {
  	state,
  	mutations
}
