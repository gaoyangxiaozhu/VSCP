import {
	VIDEO_LIST,
	ADD_VIDEO_LIST,
	REQUEST_VIDEO_LIST,
	GET_VIDEO_LIST_FAILURE
} from '../types'

const state = {
    isFetching: false,
    isMore: true,
    items: [],
    isError: false
}

const mutations = {
    [REQUEST_VIDEO_LIST](state){
        state.isFetching = true
  	},
  	[VIDEO_LIST](state, action){
      state.isFetching = false
      state.isError = false
      state.isMore = action.isMore
      state.items = action.videoList
      console.log(state.items)
  	},
  	[GET_VIDEO_LIST_FAILURE](state){
      state.isFetching = false
      state.isError = true
  	},
  	[ADD_VIDEO_LIST](state, action){
      state.isFetching = false
      state.isError = false
      state.isMore = action.isMore
      state.items = [...state.items, ...action.videoList]
  	}
}

export default {
  	state,
  	mutations
}
