import api from '../api'
import * as types from './types'
import { saveCookie, signOut } from '../utils/authService'

export const showMsg = ({dispatch}, content, type='error') => {
    dispatch(types.SHOW_MSG, { content:content, type:type })
}

export const hideMsg = ({dispatch}) => {
    dispatch(types.HIDE_MSG)
}


export const logout = ({dispatch, router}) => {
    signOut()
    dispatch(types.LOGOUT_USER)
    window.location.pathname = '/'
}

export const localLogin = (store, userInfo) => {
    api.localLogin(userInfo).then(response => {
        if(!response.ok){
            return showMsg(store, response.data.error_msg || 'Login Failed...')
        }
        const token = response.data.token
        saveCookie('token', token)
        getUserInfo(store)
        store.dispatch(types.LOGIN_SUCCESS, {token: token })
        showMsg(store,'Login successful, welcome!','success')
        store.router.go({path:'/'})
    }, response => {
        showMsg(store, response.data.error_msg || 'Login Failed...')
    })
}
export const getUserInfo = ({ dispatch }) => {
    api.getMe().then(response => {
        if(!response.ok){
            return dispatch(types.USERINFO_FAILURE)
        }
        dispatch(types.USERINFO_SUCCESS, { user: response.data })
    }, response => {
        dispatch(types.USERINFO_FAILURE)
    })
}

export const updateUser = (store, userInfo) => {
    api.mdUser(userInfo).then(response => {
        if(!response.ok){
            return showMsg(store, 'Failed to update user information!')
        }
        store.dispatch(types.UPDATE_USER_SUCCESS, { user: response.data.data })
        showMsg(store,'Update User information success!', 'success')
    }, response => {
        showMsg(store, 'Failed to update user information!')
    })
}

export const getCameraList = ({ dispatch }) => {
    return api.getCameraList().then(response => {
        if(!response.ok){
            return dispatch(types.GET_CAMERA_LIST_FAILURE)
        }
        dispatch(types.GET_CAMERA_LIST_SUCCESS, { cameraList: response.data })
    }).catch(response => {
        dispatch(types.GET_CAMERA_LIST_FAILURE, { msg: response.message })
    })
}

//更改options
export const changeVideoOptions = ({ dispatch }, options) => {

    console.log('options:', options)
    dispatch(types.CHANGE_VIDEO_OPTIONS, { options: options })
}
export const changeTaskOptions = ({ dispatch }, options) => {
    dispatch(types.CHANGE_TASK_OPTIONS, { options: options })
}

//getVideoList
export const getVideoList = ({ dispatch }, options, isAdd) => {
    dispatch(types.REQUEST_VIDEO_LIST)
    return api.getFrontVideoList(options).then(response => {
        if(!response.ok){

            return dispatch(types.GET_VIDEO_LIST_FAILURE)
        }
        const data = response.data
        const isMore = !(data.length < options.itemsPerPage)

        isAdd
        ? dispatch(types.ADD_VIDEO_LIST,{
            videoList: data,
            isMore: isMore
        })
        : dispatch(types.VIDEO_LIST,{
            videoList: data,
            isMore:isMore
        })

    }).catch(response => {
        dispatch(types.GET_VIDEO_LIST_FAILURE)
    })
}

export const getVideoDetail = ({ dispatch }, id, user) => {
    return api.getFrontVideo(id).then(response => {
        if(response.ok){
            let video = response.data.data
            dispatch(types.VIDEO_DETAIL, { videoDetail: {...video} })
        }
    })
}

export const getVideoTaskList = ({ dispatch }, options, isAdd) => {
    dispatch(types.REQUEST_VIDEO_TASK_LIST)
    api.getFrontVideoTaskList(options).then(response => {
        if(!response.ok){
            return dispatch(types.GET_VIDEO_TASK_LIST_FAILURE)
        }
        const json = response.data
        const isMore = !(json.data.length < options.itemsPerPage)

        isAdd
        ? dispatch(types.ADD_VIDEO_TASK_LIST, {
            videotaskList: json.data,
            isMore: isMore
        })
        : dispatch(types.VIDEO_TASK_LIST, {
            videotaskList: json.data,
            isMore: isMore
        })
    }, response => {
        dispatch(types.GET_VIDEO_TASK_LIST_FAILURE)
    })
}
