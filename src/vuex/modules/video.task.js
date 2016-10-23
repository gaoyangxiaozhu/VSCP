import {
	VIDEO_TASK_LIST,
	ADD_VIDEO_TASK_LIST,
	REQUEST_VIDEO_TASK_LIST,
	GET_VIDEO_TASK_LIST_FAILURE
} from '../types'

const state = {
  	isFetching: false,
  	isMore: true,
  	items: []
}

const mutations = {
  	[REQUEST_VIDEO_TASK_LIST](state){
    	state.isFetching = true
  	},
  	[VIDEO_TASK_LIST](state, action){
    	state.isFetching = false
    	state.isMore = action.isMore
    	state.items = action.videotaskList
  	},
  	[GET_VIDEO_TASK_LIST_FAILURE](state){
    	state.isFetching = false
  	},
  	[ADD_VIDEO_TASK_LIST](state, action){
    	state.isFetching = false
    	state.isMore = action.isMore
    	state.items = [...state.items, ...action.videoList]
  	}
}

export default {
  	state,
  	mutations
}
