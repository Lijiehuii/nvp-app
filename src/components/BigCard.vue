<script setup lang="ts">
import { ref, onMounted, defineEmits, toRaw, onActivated } from 'vue';
import { useRouter } from 'vue-router';
import type { NBigCard, BigCardData, UserFollow, UserCollection } from '@/typings';
import { dataSet, duration } from "@/untils"
import { computed } from '@vue/reactivity';
import { options } from "@/untils"
import { Toast } from 'vant';
import 'vant/es/toast/style';
import useClipboard from "vue-clipboard3"
import { useUserStores } from "@/stores/user"
// import { watch } from 'fs';

const props = defineProps<{
    bigCard: NBigCard
}>()

const emit = defineEmits<{
    (e: 'updateHomeData', bigcarddata: BigCardData): void
}>()

const stores = useUserStores()

const { likeVideo, followUser, collectionVideo,
    updatelikeVideo,
    filterlikeVideo,
    updatelikeVideoArr,
    updatefollowUser,
    filterfollowUser,
    updatefollowUserArr,
    updateCollection,
    filterCollection,
    updatecollectionVideoArr
} = stores

const { toClipboard } = useClipboard();
const userid = ref(0)
const avatar = ref("")
const username = ref("")
const follow = ref(false)
const title = ref('')
const collection = ref(false)
const like = ref(false)
const cover = ref("")
const videoid = ref(0)
const share_info_url = ref("")
const showShare = ref(false);
const cardtype = ref("")
const bigcarddata = ref(<BigCardData>{})
const follower = ref(0)
const user = ref(<UserFollow>{})
const locallikeVideo = ref<Array<number>>([])
const localfollowuser = ref<Array<UserFollow>>([])
const localcollection = ref<Array<UserCollection>>([])
let timer: NodeJS.Timeout

onMounted(() => {
    userid.value = props.bigCard.author.userinfo.id
    avatar.value = props.bigCard.author.userinfo.avatar
    username.value = props.bigCard.author.userinfo.username
    follow.value = props.bigCard.author.follow
    like.value = props.bigCard.like
    title.value = props.bigCard.title
    collection.value = props.bigCard.collection
    cover.value = props.bigCard.cover
    videoid.value = props.bigCard.id
    share_info_url.value = props.bigCard.share_info.url
    cardtype.value = props.bigCard.cardtype
    bigcarddata.value.id = videoid.value
    bigcarddata.value.cardtype = cardtype.value
    follower.value = props.bigCard.author.userinfo.count.count_follower
    user.value.avatar = avatar.value
    user.value.id = userid.value
    user.value.username = username.value
    user.value.follower = follower.value

    let likeVideoArr = toRaw(likeVideo)
    likeVideoArr.map(l => {
        if (l === videoid.value) {
            like.value = true
            props.bigCard.count.count_like++
        }
    })

    let followUserArr = toRaw(followUser)
    followUserArr.map(f => {
        if (f.id === userid.value) {
            follow.value = true
        }
    })

    let collectionVideoArr = toRaw(collectionVideo)
    collectionVideoArr.map(f => {
        if (f.id === videoid.value) {
            collection.value = true
        }
    })
})

onActivated(() => {
    locallikeVideo.value = JSON.parse(localStorage.likeVideo || "[]")
    updatelikeVideoArr(locallikeVideo.value)
    like.value = false
    locallikeVideo.value.findIndex((item, index) => {
        if (item === videoid.value && !like.value) {
            like.value = true
            props.bigCard.count.count_like++
        }
    })

    localfollowuser.value = JSON.parse(localStorage.followUser || "[]")
    updatefollowUserArr(localfollowuser.value)
    follow.value = false
    localfollowuser.value.map(item => {
        if (item.id === userid.value) {
            follow.value = true
        }
    })

    localcollection.value = JSON.parse(localStorage.collection || "[]")
    updatecollectionVideoArr(localcollection.value)
    collection.value = false
    localcollection.value.map(item => {
        if (item.id === videoid.value) {
            console.log(item.title);
            collection.value = true
            props.bigCard.count.count_collect++
        }
    })
})
const router = useRouter()

const count_view = computed(() => {
    return dataSet(props.bigCard.count.count_view)
})
const du = computed(() => {
    return duration(props.bigCard.duration)
})

const count_like = computed(() => {
    return dataSet(props.bigCard.count.count_like)
})

const count_collect = computed(() => {
    return dataSet(props.bigCard.count.count_collect)
})

const setFollowStatus = () => {
    if (follow.value) {
        filterfollowUser(userid.value)
    } else if (!follow.value) {
        updatefollowUser(user.value)
    }
    follow.value = !follow.value
}

const collectionStatus = () => {
    if (collection.value) {
        props.bigCard.count.count_collect--
        filterCollection(videoid.value)
    } else if (!collection.value) {
        props.bigCard.count.count_collect++
        updateCollection(props.bigCard)
    }
    collection.value = !collection.value
}

const likeStatus = () => {
    if (like.value) {
        props.bigCard.count.count_like--
        filterlikeVideo(videoid.value)
    } else if (!like.value) {
        props.bigCard.count.count_like++
        updatelikeVideo(videoid.value)
    }
    like.value = !like.value
}

const goToVideoDeatil = (id: number) => {
    router.push({
        path: `/video/${id}`,
        query: {
            li: props.bigCard.count.count_like,
            co: props.bigCard.count.count_collect
        }
    })
}

const goToUserInfo = (id: number) => {
    router.push(`/userinfo/${id}`)
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
        return copy(share_info_url.value)
    }
    if (option.name === "不感兴趣") {
        console.log(bigcarddata.value);
        return clickThis()
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

const clickThis = () => {
    emit('updateHomeData', bigcarddata.value)
    Toast.success("已为你过滤掉该视频!")
}

</script>

<template>
    <div class=" w-full big-card mb-3 bg-white  rounded-ten">
        <div class="p-con flex justify-between">
            <div class="left flex items-center" @click="goToUserInfo(userid)">
                <div class="w-avatar mr-2 h-avatar rounded-full overflow-hidden">
                    <van-image width="100%" height="100%" :src="avatar" show-loading show-error lazy-load>
                        <template v-slot:loading>
                            <van-loading type="spinner" size="20" />
                        </template>
                    </van-image>
                </div>
                <div class=" w-52 overflow-hidden text-ellipsis whitespace-nowrap">{{ username }}</div>
            </div>
            <div class="right flex items-center">
                <div class="mr-2.5 text-sm text-red-600" :class="{ followed: follow }" @click="setFollowStatus">
                    {{ follow ? "已关注" : "+ 关注" }}
                </div>
                <div class="more" @click.stop="(showShare = true)">
                    <van-icon name="ellipsis" size="18" />
                </div>
            </div>
        </div>
        <div class="middle">
            <div class="p-con font-bold w-11/12 overflow-hidden text-ellipsis whitespace-nowrap">{{ title }}</div>
            <div class="relative" @click="goToVideoDeatil(videoid)">
                <van-image width="100%" height="200" :src="cover" show-loading show-error lazy-load>
                    <template v-slot:loading>
                        <van-loading type="spinner" size="20" />
                    </template>
                </van-image>
                <div class="data text-right absolute pr-2 pb-2 pt-2 bottom-0 left-0 text-xs right-0 text-white">
                    {{ count_view + " 观看" + " | " + du }}
                </div>
            </div>
        </div>
        <div class="bottom p-con flex justify-around">
            <div class="flex items-center" @click.stop="collectionStatus">
                <div class=" mr-2">
                    <van-icon color="rgb(244, 173, 40)" size="25" name="star" v-if="collection" />
                    <van-icon size="25" name="star-o" v-else />
                </div>
                {{ count_collect }}
            </div>
            <div class="flex items-center">
                <div class=" mr-2" @click.stop="likeStatus">
                    <van-icon name="good-job" color="rgb(216, 77, 64)" size="25" v-if="like" />
                    <van-icon name="good-job-o" size="25" v-else />
                </div>
                {{ count_like }}
            </div>
        </div>
        <div @click.stop="showShare = false">
            <van-share-sheet v-model:show="showShare" title="立即分享给好友" :options="options" @select="selectClick" />
        </div>
    </div>
</template>

<style lang="scss" scoped>
.followed {
    color: #999;
}

.more {
    display: flex;
    flex: 0 0 18px;
    transform: rotateZ(90deg);
}

.data {
    background-image: linear-gradient(180deg, rgba(0, 0, 0, 0), rgba(0, 0, 0, .7));
}
</style>