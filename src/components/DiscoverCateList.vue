<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import type { CategorieList } from "@/typings"
const props = defineProps<{
    cateList: Array<CategorieList>
}>()

const router = useRouter()

const goToCateList = (name: string, id: number) => {
    router.push('/cate/' + name + "/" + id)
}
</script>

<template>
    <div class="pl-3 pr-3 p-bar">
        <div class="mb-3 text-lg font-bold text-black">作品</div>
        <div class=" flex flex-wrap justify-between">
            <div class="flex w-cate h-cate rounded-ten relative mb-3" v-for="(c, i) in cateList"
                @click="goToCateList(c.category_name, c.id)" :key="i">
                <van-image width="100%" height="100%" radius="10" :src="c.cover" lazy-load show-loading show-error>
                    <template v-slot:loading>
                        <van-loading type="spinner" size="20" />
                    </template>
                </van-image>
                <div class=" text-sm text-white absolute top-3 left-3">{{ c.category_name }}</div>
            </div>
        </div>
    </div>
</template>

<style>

</style>