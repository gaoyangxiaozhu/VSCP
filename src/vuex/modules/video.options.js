import {
    CHANGE_VIDEO_OPTIONS
} from '../types'

const state = {
    item: {
        currentPage: 1,
        itemsPerPage: 5,
        type: 'raw', //raw or concentrate
        source: 'hik', // hik or other off-line video sources
        chanId: '',
        year: '',
        month: '',
        day: ''
    }
}

const mutations = {
    [CHANGE_VIDEO_OPTIONS](state, action) {
    	state.item = {...state.item, ...action.options}
    }
}

export default {
  	state,
  	mutations
}
