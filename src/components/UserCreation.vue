<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { Api } from '@/apis';
import type { CreationList } from "@/typings"
import UserCreationCard from './UserCreationCard.vue';
import userarticle10884012 from '@/assets/apijs/userarticle10884012';

const props = defineProps<{
    id: string
}>()

const creationListArr = ref<Array<CreationList>>()

onMounted(async () => {
    getUserCreationData()
})

const getUserCreationData = () => {
    Api.getUserCreationData(props.id).then(({ data }) => {
        creationListArr.value = data.data.list
    }).catch(err => {
        if (props.id === "10884012") {
            creationListArr.value = userarticle10884012.list
        } else if (err) {
            console.log(err);
        }
    })
}
</script>

<template>
    <div class=" w-full overflow-auto" :style="{ height: 'calc(100vh - ' + 294 + 'px)' }">
        <div v-if="creationListArr">
            <UserCreationCard v-for="(c, i) in creationListArr" :key="i" :creation="c" />
        </div>
        <div class="on-loading" v-else>
            <van-loading size="30" type="spinner" color="#1989fa" vertical>数据加载中...</van-loading>
        </div>
    </div>
</template>