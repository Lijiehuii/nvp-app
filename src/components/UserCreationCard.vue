<script setup lang="ts">
import { ref, onMounted } from 'vue';
import type { CreationList } from "@/typings"
import { computed } from '@vue/reactivity';
import { duration, dataSet, getTime } from "@/untils"
import { useRouter } from 'vue-router';
const props = defineProps<{
    creation: CreationList
}>()
const router = useRouter()
const cover = ref("")
const title = ref("")

onMounted(() => {
    cover.value = props.creation.resource.cover
    title.value = props.creation.resource.title
})

const like = computed(() => {
    return dataSet(props.creation.resource.count.count_like)
})

const view = computed(() => {
    return dataSet(props.creation.resource.count.count_view)
})

const du = computed(() => {
    return duration(props.creation.resource.duration)
})

const addTime = computed(() => {
    return getTime(props.creation.resource.publish_time * 1000)
})

const goToVideoDeatil = (id: number) => {
    router.push(`/video/${id}`)
}

</script>

<template>
    <div class="like-card m-2.5 flex pt-2.5 pb-2.5 box-border " @click="goToVideoDeatil(creation.resource.id)">
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
        <div class=" text-xs flex flex-col justify-around">
            <div class="title text-sm font-bold">{{ title }}</div>
            <div>
                {{ addTime }}
            </div>
            <div class=" flex text-gray-400">
                <div>{{ "播放量" + view }}</div>
                <span class=" ml-1 mr-1">·</span>
                <div>{{ "喜欢" + like }}</div>
            </div>
        </div>
    </div>
</template>
<style lang="scss" scoped>
.like-card {
    border-bottom: 1px solid #999;

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