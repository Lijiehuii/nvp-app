<script setup lang="ts">
import { ref, onMounted, onActivated } from 'vue';
import { Api } from "@/apis";
import { useRouter } from 'vue-router';
import type { BannerList, CategorieList } from "@/typings"
import DiscoverBanner from '@/components/DiscoverBanner.vue';
import DiscoverCateList from '@/components/DiscoverCateList.vue';
import { useHomeStore } from "@/stores/home"
import { Toast } from 'vant';
import 'vant/es/toast/style';
import catedata from '@/assets/apijs/cateData';
const stores = useHomeStore()

const { setDiscoverTop } = stores

const bannerList = ref<BannerList[]>([])
const cateList = ref<CategorieList[]>([])
const router = useRouter()
const fail = ref(false)
const isLoading = ref(true)

onMounted(() => {
    getCateData()
})
onActivated(() => {
    const discoverWrapper = document.getElementById("discover") as HTMLElement;
    discoverWrapper.scrollTop = JSON.parse(localStorage.discoverTop || "0")
})

const getCateData = () => {
    Api.getCateData().then(({ data }) => {
        bannerList.value = data.data.banners
        cateList.value = data.data.categories
    }).catch(err => {
        if (err) {
            fail.value = true
            Toast.fail("获取数据失败！")
        }
    })
}

const getScroll = (e: Event) => {
    const scroll = e.target as HTMLElement
    setDiscoverTop(scroll.scrollTop)
}

const goToSearch = () => {
    router.push("/search")
}

const onRefresh = () => {
    fail.value = false
    // getCateData()
    setTimeout(() => {
        bannerList.value = catedata.banners
        cateList.value = catedata.categories
        Toast.success('已刷新！');
        isLoading.value = false;
    }, 5000);
}

</script>
<template>
    <div class="relative w-screen h-screen">
        <div class="search-box sticky top-0 left-0 bg-white z-10" @click="goToSearch">
            <van-search :disabled="true" placeholder="请输入搜索关键词" />
        </div>
        <div class="discover overflow-auto" id="discover" @scroll="getScroll($event)">
            <div v-if="cateList.length !== 0">
                <DiscoverBanner :banner-list="bannerList" />
                <DiscoverCateList :cate-list="cateList" />
            </div>
            <div class="loading" v-else>
                <van-loading size="50" type="spinner" color="#1989fa" vertical>数据加载中...</van-loading>
            </div>
            <div class="flex w-screen h-full" v-if="fail">
                <van-pull-refresh class="flex bg-white" :style="{
                    height: ' calc(100vh - 104px)'
                }" v-model="isLoading" @refresh="onRefresh">
                    <img class=" m-auto" src="../assets/images/fail.jpg" alt="">
                </van-pull-refresh>
            </div>
        </div>
    </div>
</template>

<style>
.search-box {
    border-bottom: 1px solid #aaa;
}

.discover {
    height: calc(100vh - 54px);
}

.loading {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translateX(-50%) translateY(-50%);
}
</style>