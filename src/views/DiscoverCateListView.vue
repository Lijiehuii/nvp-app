<script setup lang="ts">
import { Api } from "@/apis"
import { ref, onMounted } from "vue";
import type { VideoDataDetail } from "@/typings"
import { useRouter } from "vue-router";
import CardList from "@/components/CardList.vue";
import { Toast } from 'vant';
import 'vant/es/toast/style';
const props = defineProps<{
    catename: string
    id: string
}>()

const categoryListData = ref<Array<VideoDataDetail>>([])
const page = ref(1)
const router = useRouter()
const loading = ref(false);
const finished = ref(false);
const refreshing = ref(false);
const error = ref(false);

onMounted(async () => {
    // const { data } = await Api.getCategoryData(props.id, page.value)
    // categoryListData.value = [...categoryListData.value, ...data.data.list]
    getData()
})

const goBack = () => {
    router.go(-1)
}

const getData = () => {
    Api.getCategoryData(props.id, page.value).then(({ data }) => {
        categoryListData.value = [...categoryListData.value, ...data.data.list]
    }).catch(err => {
        console.log("DiscoverCateListView=>数据加载不出来！");
        console.log(err);
    })

}

const onLoad = () => {
    page.value++
    setTimeout(() => {
        if (refreshing.value) {
            categoryListData.value = [];

            page.value = 1
            refreshing.value = false;
            Toast.success("刷新成功！")
        }

        if (page.value > 5) {
            return finished.value = true;
        }
        loading.value = false;
        getData()
        Toast.success("已加载更多数据！")

    }, 500);
};

const onRefresh = () => {
    // 清空列表数据
    finished.value = false;

    // 重新加载数据
    // 将 loading 设置为 true，表示处于加载状态
    loading.value = true;
    onLoad()
};

</script>
<template>
    <div class=" w-screen relative overflow-auto h-screen bg-white z-10">
        <div class="top sticky top-0 left-0 bg-white z-20">
            <div class="w-full h-10 p-con flex justify-between">
                <div @click="goBack">
                    <van-icon name="arrow-left" size="20" />
                </div>
                <div class="text-center w-full h-full pl-10 pr-10 overflow-hidden text-ellipsis whitespace-nowrap">
                    {{ catename }}
                </div>
            </div>
        </div>
        <div class=" overflow-auto" :style="{ height: 'calc(100vh - ' + 50 + 'px)' }"
            v-if="categoryListData.length !== 0">
            <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
                <van-list v-model:loading="loading" :finished="finished" :error="error" :immediate-check="false"
                    error-text="网络不给力,数据加载失败!" finished-text="没有更多了" @load="onLoad">
                    <CardList v-for="(c, i) in categoryListData" :card-data="c" />
                </van-list>
            </van-pull-refresh>
        </div>
        <div class="on-loading" v-else>
            <van-loading size="50" type="spinner" color="#1989fa" vertical>数据加载中...</van-loading>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.top {
    border-bottom: 1px solid #999;
}
</style>