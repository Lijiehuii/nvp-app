<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { Api } from '@/apis';
import UserLikeCard from './UserLikeCard.vue';
import type { LikeList } from "@/typings"
import userlike10884012 from '@/assets/apijs/userlike10884012';
const props = defineProps<{
    id: string
}>()
console.log(props.id);

const likeListArr = ref<Array<LikeList>>()

onMounted(async () => {
    getUserLikeData()
})

const getUserLikeData = () => {
    Api.getUserLikeData(props.id).then(({ data }) => {
        likeListArr.value = data.data.list
    }).catch(err => {
        if (props.id === "10884012") {
            likeListArr.value = userlike10884012.list
        }
    })
}
</script>

<template>
    <div class=" w-full overflow-auto" :style="{ height: 'calc(100vh - ' + 294 + 'px)' }">
        <div v-if="likeListArr">
            <UserLikeCard v-for="(l, i) in likeListArr" :like-data="l" />
        </div>
        <div class="on-loading" v-else>
            <van-loading size="30" type="spinner" color="#1989fa" vertical>数据加载中...</van-loading>
        </div>
    </div>
</template>