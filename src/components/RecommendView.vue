<script setup lang="ts">
import { ref, onMounted, onActivated } from 'vue';
import { Api } from "@/apis";
import type { UiBanner, VideoDataDetail } from "@/typings"
import { useHomeStore } from "@/stores/home"
import RecommendBanner from "@/components/RecommendBanner.vue"
import MiddleCard from "@/components/MiddleCard.vue"
import recommend from '@/assets/apijs/recommend';
import recommend2 from '@/assets/apijs/recommend2';
import { Toast } from 'vant';
import 'vant/es/toast/style';

const bannerList = ref<UiBanner[]>([])
const middleData = ref<Array<any>>([])
let recommendData = ref<Array<VideoDataDetail>>([])
const fail = ref(false)
const isLoading = ref(true)
const store = useHomeStore()

const { setRecommendTop } = store

onMounted(() => {
    getRecommendData()
})

const getRecommendData = () => {
    Api.getRecommendData().then(({ data }) => {
        console.log(data);
        bannerList.value = data.data.children[0].children as UiBanner[]

        middleData.value = data.data.children.filter(c => {
            return c.type === "uiMiddleCard"
        })
        recommendData.value = middleData.value.map((m) => {
            return {
                ...m.children[0].model.resource,
                cardtype: "recommend"
            }
        })
    }).catch(err => {
        if (err) {
            fail.value = true
            console.log("获取***推荐***数据失败");
        }
    })
}

onActivated(() => {
    console.log("我被激活了!");
    const recommendWrapper = document.getElementById("recommend") as HTMLElement;
    recommendWrapper.scrollTop = JSON.parse(localStorage.recommendTop)
})

const onRefresh = () => {
    fail.value = false
    Toast.success('正在尝试与服务重新连接,请稍等!');

    setTimeout(() => {
        bannerList.value = recommend2.data.children[0].children as UiBanner[]
        middleData.value = recommend2.data.children.filter(r => {
            return r.type === "uiMiddleCard"
        })
        recommendData.value = middleData.value.map((m) => {
            return {
                ...m.children[0].model.resource,
                cardtype: "recommend"
            }
        })
        isLoading.value = false;
        Toast.success('刷新成功！');
    }, 5000);

}
const getScroll = (e: Event) => {
    const scroll = e.target as HTMLElement
    setRecommendTop(scroll.scrollTop)
}

const updateRecommendData = (id: number) => {
    recommendData.value = recommendData.value.filter(r => r.id !== id)
}

</script>

<template>
    <div class="recommendWrapper flex" id="recommend" @scroll="getScroll($event)">
        <div class="w-full" v-if="middleData.length !== 0">
            <RecommendBanner :recommend-banner="bannerList" />
            <div class="middle-wrapper flex flex-wrap justify-between">
                <MiddleCard v-for="(r, i) in recommendData" :middle-card-data="r" :key="r.id"
                    @update-recommend-data="updateRecommendData" />
            </div>
        </div>
        <div class="m-auto" v-if="(!fail && middleData.length == 0)">
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
</template>

<style lang="scss" scoped>
.recommendWrapper {
    width: 100vw;
    height: calc(100vh - 99px);
    overflow: auto;
    // background-color: #;

    .middle-wrapper {
        padding: 10px;
    }
}
</style>