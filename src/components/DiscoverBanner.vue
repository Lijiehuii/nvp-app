<script setup lang="ts">
import { ref } from 'vue';
import type { BannerList } from '@/typings';
const props = defineProps<{
    bannerList: Array<BannerList>
}>()

const current = ref(1)

const onChange = (index: number) => {
    current.value = index + 1
};

</script>

<template>
    <div class="w-screen relative p-con">
        <div class=" block w-full h-50">
            <van-swipe class="my-swipe" :autoplay="3000" :show-indicators="false" lazy-render @change="onChange">
                <van-swipe-item v-for="(b, i) in bannerList" :key="i">
                    <van-image width="100%" height="200" :src="b.cover" radius="10">
                        <template v-slot:loading>
                            <van-loading type="spinner" size="20" />
                        </template>
                    </van-image>
                </van-swipe-item>
            </van-swipe>
        </div>
        <div class="absolute right-7 bottom-5 text-white">
            <p><span class=" text-lg">{{ current }}</span>{{ "/" + bannerList.length }}</p>
        </div>
    </div>
</template>
