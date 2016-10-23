import {
    CHANGE_TASK_OPTIONS
} from '../types'

const state = {
    item:{
        currentPage: 1,
        itemsPerPage: 25,
        type: 'concentrate', //concentrate, forwarding, detecting
    }
}

const mutations = {
    [CHANGE_TASK_OPTIONS](state, action) {
    	state.item = {...state.item, ...action.options}
    }
}

export default {
  	state,
  	mutations
}
