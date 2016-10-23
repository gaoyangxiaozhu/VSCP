import { UserResource, AuthResource, VideoResource, CameraResource } from './resources'

export default {
    localLogin(data) {
        return AuthResource.save({id:'local'}, data)
    },
    getSnsLogins() {
        return UserResource.get({id:'snsLogins'})
    },
    getMe() {
        return UserResource.get({id:'me'})
    },
    mdUser(data) {
        return UserResource.update({id:'mdUser'},data)
    },
    getCameraList(){
        return CameraResource.get({id: 'getFrontCameraList'})
    },
    //video related
    getFrontVideoList(options) {
        return VideoResource.get({id: 'getFrontVideoList', ...options})
    },

    getFrontVideoCount() {
        return VideoResource.get({id: 'getFrontVideoCount'})
    },
    getFrontVideo(id) {
        return VideoResource.get({id: id, controller: 'getFrontVideo'})
    },
    getFrontVideoTaskList(options){
        return VideoResource.get({id: 'getFrontVideoTaskList', ...options})
    }
}
