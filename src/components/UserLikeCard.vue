<script lang="ts" setup>
import { ref, defineProps, onMounted } from 'vue';
import type { LikeList } from '@/typings';
import { dataSet, duration } from "@/untils"
import { computed } from '@vue/reactivity';
import { useRouter } from 'vue-router';
const props = defineProps<{
    likeData: LikeList
}>()

const router = useRouter()
const videoid = ref(0)
const cover = ref("")
const title = ref("")
const avatar = ref("")
const username = ref("")
const userid = ref(0)

const loading = ref(true)

onMounted(() => {
    videoid.value = props.likeData.resource.id
    cover.value = props.likeData.resource.cover
    title.value = props.likeData.resource.title
    avatar.value = props.likeData.resource.author.userinfo.avatar
    username.value = props.likeData.resource.author.userinfo.username
    userid.value = props.likeData.resource.author.userinfo.id
    if (cover.value !== undefined) {
        loading.value = false
    }
})


const view = computed(() => {
    return dataSet(props.likeData.resource.count.count_view)
})

const like = computed(() => {
    return dataSet(props.likeData.resource.count.count_like)
})

const du = computed(() => {
    return duration(props.likeData.resource.duration)
})

const goToVideoDeatil = (id: number) => {
    router.push(`/video/${id}`)
}


</script>

<template>
    <div class="like-card m-2.5 flex pt-2.5 pb-2.5 box-border " @click="goToVideoDeatil(videoid)">
        <van-skeleton title :row="3" :loading="loading">
            <div
                class="flex mr-2 relative flex-middle-card w-middle-card h-middle-card-img rounded-ten overflow-hidden">
                <van-image width="100%" height="100%" :src="cover" show-loading show-error lazy-load>
                    <template v-slot:loading>
                        <van-loading type="spinner" size="20" />
                    </template>
                </van-image>
                <div class="duration text-right pr-1 pb-1 pt-1 absolute bottom-0 left-0 right-0 text-white text-xs">
                    {{ du }}
                </div>
            </div>
            <div class=" text-xs flex flex-col justify-around">
                <div class="title text-sm font-bold">{{ title }}</div>
                <div class=" flex text-gray-400">
                    <div>{{ "播放量" + view }}</div>
                    <span class=" ml-1 mr-1">·</span>
                    <div>{{ "喜欢" + like }}</div>
                </div>
                <div class=" flex items-center">
                    <div class="w-4 mr-1 h-4 rounded-full overflow-hidden">
                        <van-image width="100%" height="100%" :src="avatar" show-loading show-error lazy-load>
                            <template v-slot:loading>
                                <van-loading type="spinner" size="20" />
                            </template>
                        </van-image>
                    </div>
                    <div class="text-xs">
                        {{ username }}
                    </div>
                </div>
            </div>
        </van-skeleton>
    </div>
</template>

<style lang="scss" scoped>
.like-card {
    border-bottom: 1px solid #aaa;

    .title {
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
    }

    .duration {
        background-image: linear-gradient(180deg, rgba(0, 0, 0, .1), rgba(0, 0, 0, .7));
    }
}
</style>