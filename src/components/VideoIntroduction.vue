<script setup lang="ts">
import { ref, toRaw, onMounted, onActivated } from "vue";
import { Api } from "@/apis";
import { getTime, dataSet } from "@/untils"
import type { VideoDataDetail, categories, UserFollow, VideoListListItem } from "@/typings"
import { computed } from "@vue/reactivity";
import VideoLikecard from "./VideoLikecard.vue";
import { useRoute, useRouter } from "vue-router";
import { useUserStores } from "@/stores/user"
import video10934897 from "@/assets/apijs/video10934897";
import videolike10934897 from "@/assets/apijs/videolike10934897";
const props = defineProps<{
    topHeight: number
    videoDetail: VideoDataDetail
    id: string
}>()
const stores = useUserStores()
const { likeVideo, followUser, collectionVideo, updatelikeVideo, filterlikeVideo, updatefollowUser, filterfollowUser, updateCollection, filterCollection } = stores
const router = useRouter()
const route = useRoute()
const VideoLike = ref<Array<VideoListListItem>>([])
const title = ref("")
const categories = ref<Array<categories>>([])
const ip_location = ref("")
const content = ref<string>()
const mycollection = ref(false)
const mylike = ref(false)
const avatar = ref("")
const username = ref("")
const userid = ref(0)
const videoid = ref(0)
const loading = ref(true)
const myfollow = ref(false)
const user = ref(<UserFollow>{})
const islodaing = ref(false)
const videolikeloading = ref(true)

onMounted(async () => {
    getVideoLikeData()
})

const goToUserInfo = (id: number) => {
    router.push(`/userinfo/${id}`)
}

const getVideoLikeData = () => {
    Api.getVideoLikeData(props.id).then(({ data }) => {
        VideoLike.value = data.data.list
        title.value = props.videoDetail.title
        categories.value = props.videoDetail.categories
        ip_location.value = props.videoDetail.ip_location
        content.value = props.videoDetail.content
        mycollection.value = props.videoDetail.collection
        mylike.value = props.videoDetail.like
        myfollow.value = props.videoDetail.author.follow
        avatar.value = props.videoDetail.author.userinfo.avatar
        username.value = props.videoDetail.author.userinfo.username
        userid.value = props.videoDetail.author.userinfo.id
        videoid.value = props.videoDetail.id
        user.value.avatar = avatar.value
        user.value.id = userid.value
        user.value.username = username.value
        user.value.follower = props.videoDetail.author.userinfo.count.count_follower
        dataReset()
    }).catch(err => {
        if (props.id === "11929255") {
            VideoLike.value = videolike10934897.list
            title.value = video10934897.title
            categories.value = video10934897.categories
            ip_location.value = video10934897.ip_location
            content.value = video10934897.content
            mycollection.value = video10934897.collection
            mylike.value = video10934897.like
            myfollow.value = video10934897.author.follow
            avatar.value = video10934897.author.userinfo.avatar
            username.value = video10934897.author.userinfo.username
            userid.value = video10934897.author.userinfo.id
            videoid.value = video10934897.id
            user.value.avatar = avatar.value
            user.value.id = userid.value
            user.value.username = username.value
            user.value.follower = video10934897.author.userinfo.count.count_follower
            props.videoDetail.publish_time = video10934897.publish_time
            props.videoDetail.count.count_view = video10934897.count.count_view
            props.videoDetail.count.count_collect = video10934897.count.count_collect
            props.videoDetail.count.count_like = video10934897.count.count_like
            dataReset()
        } else if (err) {
            console.log(err);
        }
    })
}

const dataReset = () => {
    if (title.value) {
        loading.value = false
    }
    if (VideoLike.value[0]) {
        videolikeloading.value = false
    }
    if (route.query.li) {
        video10934897.count.count_like = Number(route.query.li)
    }
    if (route.query.co) {
        video10934897.count.count_collect = Number(route.query.co)
    }
    let likeVideoArr = toRaw(likeVideo)
    likeVideoArr.map(l => {
        if (l === videoid.value) {
            mylike.value = true
        }
    })

    let followUserArr = toRaw(followUser)
    followUserArr.map(f => {
        if (f.id === userid.value) {
            myfollow.value = true
        }
    })

    let collectionVideoArr = toRaw(collectionVideo)
    collectionVideoArr.map(f => {
        if (f.id === videoid.value) {
            mycollection.value = true
        }
    })
    islodaing.value = false
}

onActivated(() => {
    console.log("我被激活了!");
})

const addTime = computed(() => {
    return getTime(props.videoDetail.publish_time * 1000)
})

const view = computed(() => {
    return dataSet(props.videoDetail.count.count_view)
})

const collection = computed(() => {
    return dataSet(props.videoDetail.count.count_collect)
})

const like = computed(() => {
    return dataSet(props.videoDetail.count.count_like)
})

const setFollowStatus = () => {
    if (myfollow.value) {
        filterfollowUser(userid.value)
    } else if (!myfollow.value) {
        updatefollowUser(user.value)
    }
    myfollow.value = !myfollow.value
}

const collectionStatus = () => {
    if (mycollection.value) {
        props.videoDetail.count.count_collect--
        filterCollection(videoid.value)

    } else if (!mycollection.value) {
        props.videoDetail.count.count_collect++
        updateCollection(props.videoDetail)
    }
    mycollection.value = !mycollection.value
}


const likeStatus = () => {
    if (mylike.value) {
        props.videoDetail.count.count_like--
        filterlikeVideo(videoid.value)
    } else if (!mylike.value) {
        props.videoDetail.count.count_like++
        updatelikeVideo(videoid.value)
    }
    mylike.value = !mylike.value
}

</script>

<template>
    <div class="p-con overflow-auto" :style="{ height: 'calc(100vh - ' + topHeight + 'px)' }">
        <div v-if="!islodaing">
            <van-skeleton title :row="11" :loading="loading">
                <div class="text-lg mb-2 font-bold text-black">{{ title }}</div>
                <div class=" text-xs mb-2 flex flex-wrap text-gray-400">
                    <div class=" mr-5" v-for="(la, i) in categories" :key="i">
                        {{ la.category_name }} - {{ la?.sub?.category_name }}
                    </div>
                    <div class=" mr-5">
                        {{ addTime }} · {{ ip_location }}
                    </div>
                    <div class=" mr-5">
                        {{ view + "次播放" }}
                    </div>
                </div>
                <div class="text-sm text-neutral-600 font-semibold">
                    {{ content }}
                </div>
                <div class="flex mt-3 mb-3 justify-around">
                    <div class=" flex flex-col items-center" @click="collectionStatus">
                        <van-icon name="star" color="rgb(246, 173, 42)" size="25" v-if="mycollection">
                        </van-icon>
                        <van-icon name="star-o" size="25" v-else="!mycollection">
                        </van-icon>
                        {{ collection ? collection : "" }}
                    </div>
                    <div class=" flex flex-col items-center" @click="likeStatus">
                        <van-icon name="good-job" color="rgb(218, 84, 70)" size="25" v-if="mylike">
                        </van-icon>
                        <van-icon name="good-job-o" size="25" v-else="!mylike"></van-icon>
                        {{ like ? like : "" }}
                    </div>
                </div>
                <div class="label pt-2.5 pb-1.5 flex flex-wrap">
                    <div class=" flex bg-gray-100 items-center text-xs flex-col p-1.5 mr-1.5 mb-1.5 border-t border-b rounded-sm"
                        v-for="(tag, i) in videoDetail.tags" :key="i">
                        {{ tag.name }}
                    </div>
                </div>
                <div class="author pt-3.5 pb-3.5 box-border">
                    <div class="title text-base font-bold mb-2.5">创作人</div>
                    <div class="author-info flex box-border justify-between items-center text-sm rounded-xl"
                        @click="goToUserInfo(userid)">
                        <div v-if="avatar" class="rounded-full overflow-hidden">
                            <van-image class="block" width="40" round height="40" :src="avatar" show-loading show-error
                                lazy-load>
                                <template v-slot:loading>
                                    <van-loading type="spinner" size="20" />
                                </template>
                            </van-image>
                        </div>
                        <div class=" w-24 text-ellipsis overflow-hidden whitespace-nowrap text-center">
                            {{ username }}
                        </div>
                        <div class="follow-status w-16 text-center text-xs box-border rounded-full"
                            :class="{ follow: myfollow }" @click.stop="setFollowStatus">
                            {{ myfollow ? "已关注" : "关注" }}
                        </div>
                    </div>
                </div>
            </van-skeleton>
            <div v-if="(VideoLike.length !== 0)">
                <van-skeleton title :row="11" :loading="videolikeloading">
                    <div class="text-base font-bold mb-2.5">相似视频</div>
                    <VideoLikecard v-for="(like, i) in VideoLike" :like-data="like" :key="i" :localvideo="videoid" />
                </van-skeleton>
            </div>
        </div>
        <div class="loading" v-else>
            <van-loading size="50" type="spinner" color="#1989fa" vertical>数据加载中...</van-loading>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.none {
    display: none;
}

.label {
    border-top: 1px solid #eee;
    border-bottom: 1px solid #eee;
}

.author {
    border-bottom: 1px solid #eee;

    .author-info {
        width: 70%;
        padding: 15px 10px;
        box-shadow: 2px 2px 5px #aaa;
    }

    .follow-status {
        padding: 3px 5px;
        color: rgb(230, 75, 63);
        background-color: rgb(253, 238, 233);

        &.follow {
            color: rgb(162, 162, 162);
            background-color: rgb(240, 240, 240);
        }
    }
}
</style>