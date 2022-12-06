import { ref } from 'vue'
import { defineStore } from 'pinia'
import type { UserFollow, UserCollection, VideoDataDetail, UserFootprint, NBigCard } from '@/typings'

export const useUserStores = defineStore('user', () => {
    // 用户信息
    const userinfo = ref({})
    userinfo.value = JSON.parse(localStorage.userinfo || '{}')
    const updateUserInfo = (user: {}) => {
        userinfo.value = user
        saveUserInfoStorage()
    }

    const saveUserInfoStorage = () => {
        localStorage.setItem("userinfo", JSON.stringify(userinfo.value))
    }

    // 用户的token
    const token = ref("")
    token.value = localStorage.token || ''
    const updateToken = (t: string) => {
        token.value = t
        saveTokenStorage()
    }

    const saveTokenStorage = () => {
        localStorage.setItem("token", token.value)
    }

    // 用户喜欢的
    const likeVideo = ref<Array<number>>([])
    likeVideo.value = JSON.parse(localStorage.likeVideo || "[]")
    const updatelikeVideo = (id: number) => {
        likeVideo.value = [id, ...likeVideo.value]
        savelikeVideoStorage()
    }
    const filterlikeVideo = (id: number) => {
        likeVideo.value = likeVideo.value.filter(l => l !== id)
        savelikeVideoStorage()

    }
    const savelikeVideoStorage = () => {
        localStorage.setItem("likeVideo", JSON.stringify(likeVideo.value))
    }
    const updatelikeVideoArr = (newArr: Array<number>) => {
        likeVideo.value = newArr
    }

    // 用户关注的
    const followUser = ref<Array<UserFollow>>([])
    followUser.value = JSON.parse(localStorage.followUser || "[]")
    const updatefollowUser = (user: UserFollow) => {
        user.follower++
        followUser.value = [user, ...followUser.value]
        savefollowUser()
    }
    const filterfollowUser = (id: number) => {
        followUser.value = followUser.value.filter(f => f.id !== id)
        console.log("这里是pinia=>", followUser.value);
        savefollowUser()
    }
    const savefollowUser = () => {
        localStorage.setItem("followUser", JSON.stringify(followUser.value))
    }
    const updatefollowUserArr = (newArr: Array<UserFollow>) => {
        followUser.value = newArr
    }

    // 用户收藏的
    const collectionVideo = ref<Array<UserCollection>>([])
    collectionVideo.value = JSON.parse(localStorage.collection || "[]")
    const updateCollection = (video: VideoDataDetail | NBigCard) => {
        let videodata = {
            author: {
                avatar: video.author.userinfo.avatar,
                username: video.author.userinfo.username
            },
            count: {
                count_like: video.count.count_like,
                count_view: video.count.count_view
            },
            cover: video.cover,
            duration: video.duration,
            id: video.id,
            title: video.title,
            share_url: video.share_info.url
        }

        collectionVideo.value = collectionVideo.value.filter(c => {
            return c.id !== video.id
        })

        collectionVideo.value = [videodata, ...collectionVideo.value]
        console.log(collectionVideo.value);
        saveCollectionVideo()
    }

    const filterCollection = (id: number) => {
        collectionVideo.value = collectionVideo.value.filter(c => {
            return c.id !== id
        })
        saveCollectionVideo()
    }
    const updatecollectionVideoArr = (newArr: Array<UserCollection>) => {
        collectionVideo.value = newArr
    }

    const saveCollectionVideo = () => {
        localStorage.setItem("collection", JSON.stringify(collectionVideo.value))
    }

    // 用户作品

    // 用户浏览过的
    const footprint = ref<Array<UserFootprint>>([])
    footprint.value = JSON.parse(localStorage.footprint || "[]")
    const updateFootprint = (foot: UserFootprint) => {
        console.log("这里是存储历史记录的", foot.id);
        if (foot.title) {
            footprint.value = footprint.value.filter(f => f.id !== foot.id)
            footprint.value = [foot, ...footprint.value]
            saveFootprint()
        }
    }
    const filterFootprint = (id: number) => {
        footprint.value = footprint.value.filter(f => {
            return f.id !== id
        })
        console.log(footprint.value);
        saveFootprint()
    }

    const resetfootprint = () => {
        footprint.value = []
        saveFootprint()
    }

    const saveFootprint = () => {
        localStorage.setItem("footprint", JSON.stringify(footprint.value))
    }


    return {
        userinfo,
        token,
        likeVideo,
        followUser,
        collectionVideo,
        footprint,
        updateUserInfo,
        updateToken,
        updatelikeVideo,
        filterlikeVideo,
        updatefollowUser,
        filterfollowUser,
        updatelikeVideoArr,
        updatefollowUserArr,
        updateCollection,
        filterCollection,
        updatecollectionVideoArr,
        updateFootprint,
        filterFootprint,
        resetfootprint
    }
})