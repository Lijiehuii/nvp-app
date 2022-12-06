<script setup lang="ts">
import { ref, onMounted, defineEmits } from 'vue';
import type { UiMiddleCard, VideoDataDetail } from "@/typings"
import { duration, dataSet } from "@/untils"
import { computed } from '@vue/reactivity';
import { useRouter } from 'vue-router';
import { Toast } from 'vant';
import 'vant/es/toast/style';
import useClipboard from "vue-clipboard3"

const props = defineProps<{
    middleCardData: VideoDataDetail
}>()

const { toClipboard } = useClipboard();

const router = useRouter()
const cover = ref("")
const title = ref("")
const username = ref("")
const videoid = ref(0)
const share_info_url = ref("")
const showShare = ref(false);
let timer: NodeJS.Timeout

const emit = defineEmits<{
    (e: 'updateRecommendData', num: number): void
}>()

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
    },
    {
        name: '不感兴趣',
        icon: new URL('../assets/images/share-icons/unlike.png', import.meta.url).href
    },
    ],
]

onMounted(() => {
    cover.value = props.middleCardData.cover
    title.value = props.middleCardData.title
    username.value = props.middleCardData.author.userinfo.username
    videoid.value = props.middleCardData.id
    share_info_url.value = props.middleCardData.share_info.url
})

const du = computed(() => {
    return duration(props.middleCardData.duration)
})

const view = computed(() => {
    return dataSet(props.middleCardData.count.count_view)
})
const like = computed(() => {
    return dataSet(props.middleCardData.count.count_like)
})

const goToVideoDeatil = (id: number) => {
    router.push(`/video/${id}`)
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
    console.log(videoid.value);
    emit('updateRecommendData', videoid.value)
}

</script>

<template>
    <div class="middle-card w-middle-card mb-3 rounded-ten overflow-hidden" @click="goToVideoDeatil(videoid)">
        <div class="relative">
            <van-image width="100%" height="100" :src="cover" show-loading show-error lazy-load>
                <template v-slot:loading>
                    <van-loading type="spinner" size="20" />
                </template>
            </van-image>
            <div
                class="absolute video-data px-3 py-1 w-full bottom-0 text-white text-xs flex justify-between items-center">
                <div class="flex items-center">
                    <div class="flex items-center mr-2">
                        <van-icon name="eye-o" />
                        <div class=" ml-1">{{ view }}</div>
                    </div>
                    <div class="flex items-center">
                        <van-icon name="good-job-o" />
                        <div class=" ml-1">{{ like }}</div>
                    </div>
                </div>
                <div>{{ du }}</div>
            </div>
        </div>
        <div class="bg-white p-middle-card-text text-start">
            <div class="middle-card-text overflow-hidden mb-1 text-sm font-bold">{{ title }}
            </div>
            <div class=" flex justify-between">
                <div class="text-sm items-center w-2/3 overflow-hidden text-ellipsis whitespace-nowrap">
                    {{ username }}
                </div>
                <div class="more" @click.stop="(showShare = true)">
                    <van-icon name="ellipsis" size="18" />
                </div>
            </div>
        </div>
        <div class=" w-screen" @click.stop="showShare = false">
            <van-share-sheet v-model:show="showShare" title="立即分享给好友" :options="options" @select="selectClick" />
        </div>
    </div>
</template>

<style lang="scss" scoped>
.middle-card-text {
    height: 40px;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
}

.video-data {
    background-image: linear-gradient(180deg, rgba(0, 0, 0, .2), rgba(0, 0, 0, .8));
}

.more {
    display: flex;
    flex: 0 0 18px;
    transform: rotateZ(90deg);
}
</style>