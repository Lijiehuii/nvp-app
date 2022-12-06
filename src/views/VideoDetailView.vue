<script setup lang="ts">
import { ref, onMounted, watch } from 'vue';
import { Api } from "@/apis";
import { useRouter, useRoute } from 'vue-router';
import type { VideoDataDetail } from "@/typings"
import VideoIntroduction from "@/components/VideoIntroduction.vue"
import VideoComment from '@/components/VideoComment.vue';
import video10934897 from '@/assets/apijs/video10934897';
import { useHomeStore } from "@/stores/home"
import { Toast } from 'vant';
import 'vant/es/toast/style';
import useClipboard from "vue-clipboard3"
import { computed } from '@vue/reactivity';
import { useUserStores } from "@/stores/user"

const { toClipboard } = useClipboard();
const router = useRouter()
const route = useRoute()
const videoHeight = ref(0)
const topHeight = ref(0)
const url = ref("")
const store = useHomeStore()
const { setHomeRoute } = store
const fail = ref(false)
const loading = ref(true)
const isLoading = ref(true)
const showShare = ref(false);
const share_url = ref("")
const stores = useUserStores()
const videoid = ref(0)
const cover = ref("")
const title = ref("")
const username = ref("")
const avatar = ref("")
const duration = ref(0)
const routeid = ref("")
const { updateFootprint } = stores
let timer: NodeJS.Timeout

const options = [
    [{
        name: '微信',
        icon: new URL("../assets/images/share-icons/wechat.png", import.meta.url).href
    },
    {
        name: '朋友圈',
        icon: new URL('../assets/images/share-icons/wechat-moments.png', import.meta.url).href
    },
    {
        name: 'QQ',
        icon: new URL('../assets/images/share-icons/qq.png', import.meta.url).href
    },
    ],
    [{
        name: '复制链接',
        icon: new URL('../assets/images/share-icons/link.png', import.meta.url).href
    }],
]

const VideoDetail = ref(<VideoDataDetail>{})
const props = defineProps<{
    id: string
}>()

onMounted(() => {
    routeid.value = props.id
    getVideoData()
    loading.value = false
})

const getVideoData = () => {
    Api.getVideoData(routeid.value).then(({ data }) => {
        VideoDetail.value = data.data
        title.value = data.data.title
        url.value = data.data.video.content.progressive[0].url
        share_url.value = data.data.share_info.url
        videoid.value = data.data.id
        cover.value = data.data.cover
        username.value = data.data.author.userinfo.username
        avatar.value = data.data.author.userinfo.avatar
        duration.value = data.data.duration
        resetvideo()
    }).catch(err => {
        if (props.id === "11929255") {
            VideoDetail.value = video10934897
            title.value = video10934897.title
            url.value = video10934897.video.content.progressive[0].url
            share_url.value = video10934897.share_info.url
            videoid.value = video10934897.id
            cover.value = video10934897.cover
            username.value = video10934897.author.userinfo.username
            avatar.value = video10934897.author.userinfo.avatar
            duration.value = video10934897.duration
            resetvideo()
        } else if (err) {
            fail.value = true
            Toast.fail("获取数据失败！")
        }
    })
    videoHeight.value = window.screen.width
    topHeight.value = Math.ceil(videoHeight.value * 0.563) + 84
    let time = new Date().getTime()
    let foot = {
        time,
        id: videoid.value,
        cover: cover.value,
        title: title.value,
        duration: duration.value,
        author: {
            username: username.value,
            avatar: avatar.value,
        },
        share_url: share_url.value
    }
    updateFootprint(foot)
    console.log("足迹=>", foot);
}

const resetvideo = () => {
    if (title.value) {
        loading.value = false
    }
    videoHeight.value = window.screen.width
    topHeight.value = Math.ceil(videoHeight.value * 0.563) + 84
    let time = new Date().getTime()
    let foot = {
        time,
        id: videoid.value,
        cover: cover.value,
        title: title.value,
        duration: duration.value,
        author: {
            username: username.value,
            avatar: avatar.value,
        },
        share_url: share_url.value
    }
    updateFootprint(foot)
    console.log("足迹=>", foot);
}

const goBack = () => {
    router.go(-1)
}

const routevideoid = computed(() => {
    return route.params.id
})

watch(routevideoid, () => {
    if (route.name === "video") {
        if (Number(routevideoid) !== videoid.value) {
            console.log("视频id不一样");
            routeid.value = String(route.params.id)
            VideoDetail.value = {
                title: '',
                content: '',
                count: {
                    count_like: 0,
                    count_collect: 0,
                    count_view: 0,
                },
                cover: '',
                like: false,
                collection: false,
                author: {
                    follow: false,
                    userinfo: {
                        avatar: "",
                        id: 0,
                        username: "",
                        count: {
                            count_collected: 0,
                            count_followee: 0,
                            count_follower: 0,
                            count_liked: 0,
                            count_popularity: 0,
                        }
                    }
                },
                tags: [],
                duration: 0,
                categories: [],
                publish_time: 0,
                ip_location: "",
                id: 0,
                video: {
                    content: {
                        progressive: []
                    }
                },
                cardtype: "",
                share_info: {
                    url: "",
                }
            }
            title.value = ""
            url.value = ""
            share_url.value = ""
            videoid.value = 0
            cover.value = ""
            username.value = ""
            avatar.value = ""
            duration.value = 0
            title.value = ""
            loading.value = true
            fail.value = false
            isLoading.value = true
            getVideoData()
        }
    }
})

const onRefresh = () => {
    fail.value = false
    setTimeout(() => {
        getVideoData()
        Toast.success('已刷新！');
        isLoading.value = false;
    }, 3000);
}

const selectClick = (option: { icon: string, name: string }) => {
    console.log(option.name);
    if (option.name === "QQ") {
        return unfind(option.name)
    }
    if (option.name === "微信") {
        return unfind(option.name)
    }
    if (option.name === "复制链接") {
        return copy(share_url.value)
    }
}

const copy = (val: string) => {
    try {
        toClipboard(val);
        Toast.success("复制成功")
        console.log('复制成功!')
    } catch (e) {
        console.log(e);
    }
};

const unfind = (name: string) => {
    timer = setTimeout(() => {
        Toast.fail("未找到应用" + name + "!")
        clearTimeout(timer)
    }, 500)
}

</script>

<template>
    <div class="video w-screen h-screen bg-white z-10" ref="videoCon">
        <div class="video-top top h-10 p-con flex justify-between">
            <div @click="goBack">
                <van-icon name="arrow-left" size="20" />
            </div>
            <div class="text-center w-full h-full pl-10 pr-10 overflow-hidden text-ellipsis whitespace-nowrap"
                v-if="title">
                {{ title }}
            </div>
            <div class="more" v-if="title" @click.stop="(showShare = true)">
                <van-icon name="ellipsis" size="20" />
            </div>
        </div>
        <div @click.stop="showShare = false">
            <van-share-sheet v-model:show="showShare" title="立即分享给好友" :options="options" @select="selectClick" />
        </div>
        <div v-if="title">
            <van-skeleton class=" mt-3" title :row="10" :loading="loading">
                <div class=" w-full">
                    <video class="videoel block bg-slate-500"
                        :style="{ height: Math.ceil(videoHeight * 0.563) + 'px', width: videoHeight + 'px' }"
                        :loop="true" :show-mute-btn="true" :show-progress="true" :controls="true"
                        enable-progress-gesture :src="url"></video>
                </div>
                <van-tabs animated swipeable>
                    <van-tab title="简介">
                        <VideoIntroduction :id="id" :video-detail="VideoDetail" :top-height="topHeight" />
                    </van-tab>
                    <van-tab title="评论">
                        <VideoComment :id="id" :top-height="topHeight" />
                    </van-tab>
                </van-tabs>
            </van-skeleton>
        </div>
        <div class="loading" v-else>
            <van-loading size="50" type="spinner" color="#1989fa" vertical>数据加载中...</van-loading>
        </div>
        <div class="flex w-screen" v-if="fail">
            <van-pull-refresh class="flex bg-white" :style="{
                height: ' calc(100vh - 40px)'
            }" v-model="isLoading" @refresh="onRefresh">
                <img src="../assets/images/fail.jpg" alt="">
            </van-pull-refresh>
        </div>
    </div>

</template>

<style lang="scss" scoped>
.video {
    width: 100vw;
    height: 100vh;
    overflow: auto;
}

.top {
    border-bottom: 1px solid #999;
}
</style>