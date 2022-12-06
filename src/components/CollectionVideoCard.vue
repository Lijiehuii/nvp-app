<script lang="ts" setup>
import { ref, defineProps, onMounted, defineEmits } from 'vue';
import type { UserCollection } from '@/typings';
import { dataSet, duration } from "@/untils"
import { computed } from '@vue/reactivity';
import { useRouter } from 'vue-router';


const props = defineProps<{
    collectionData: UserCollection
}>()

const emit = defineEmits<{
    (e: "moreclick", collectionCard: UserCollection): void
}>()

const videoid = ref(0)
const cover = ref("")
const title = ref("")
const avatar = ref("")
const username = ref("")
const router = useRouter()
const share_url = ref("")

onMounted(() => {
    videoid.value = props.collectionData.id
    cover.value = props.collectionData.cover
    title.value = props.collectionData.title
    avatar.value = props.collectionData.author.avatar
    username.value = props.collectionData.author.username
    share_url.value = props.collectionData.share_url
})


const view = computed(() => {
    return dataSet(props.collectionData.count.count_view)
})

const like = computed(() => {
    return dataSet(props.collectionData.count.count_like)
})

const du = computed(() => {
    return duration(props.collectionData.duration)
})


const goToVideoDeatil = (id: number) => {
    router.push(`/video/${id}`)
}

const clickThis = () => {
    emit("moreclick", props.collectionData)
}
</script>

<template>
    <div class="collect-card mx-2.5 flex pt-2.5 pb-2.5 box-border" @click="goToVideoDeatil(videoid)">
        <div class="flex mr-2 relative flex-middle-card w-middle-card h-middle-card-img rounded-ten overflow-hidden">
            <van-image width="100%" height="100%" :src="cover" show-loading show-error lazy-load>
                <template v-slot:loading>
                    <van-loading type="spinner" size="20" />
                </template>
            </van-image>
            <div class="duration text-right pr-1 pb-1 pt-1 absolute bottom-0 left-0 right-0 text-white text-xs">
                {{ du }}
            </div>
        </div>
        <div class="text-xs w-full flex flex-col justify-around">
            <div class="title text-sm font-bold">{{ title }}</div>
            <div class=" flex text-gray-400">
                <div>{{ "播放量" + view }}</div>
                <span class=" ml-1 mr-1">·</span>
                <div>{{ "喜欢" + like }}</div>
            </div>
            <div class="flex items-center justify-between">
                <div class="flex items-center">
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
                <div class="more" @click.stop="clickThis">
                    <van-icon name="ellipsis" size="18" />
                </div>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.collect-card {
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

    .more {
        display: flex;
        flex: 0 0 18px;
        transform: rotateZ(90deg);
    }


}
</style>