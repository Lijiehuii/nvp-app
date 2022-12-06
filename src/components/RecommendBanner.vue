<script setup lang="ts">
import { ref } from 'vue';
import type { UiBanner } from "@/typings"
const props = defineProps<{
    recommendBanner: Array<UiBanner>
}>()

const current = ref(1)

const onChange = (index: number) => {
    current.value = index + 1
};

</script>

<template>
    <div class="w-full relative p-con pb-0">
        <van-swipe class="my-swipe" :autoplay="3000" :show-indicators="false" lazy-render @change="onChange">
            <van-swipe-item v-for="(r, i) in recommendBanner" :key="i">
                <van-image width="100%" height="200" :src="r.model.cover" radius="10">
                    <template v-slot:loading>
                        <van-loading type="spinner" size="20" />
                    </template>
                </van-image>
            </van-swipe-item>
        </van-swipe>
        <div class="absolute right-7 bottom-5 text-white">
            <p><span class=" text-lg">{{ current }}</span>{{ "/" + recommendBanner.length }}</p>
        </div>
    </div>
</template>