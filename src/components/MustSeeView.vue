<script setup lang="ts">
import { ref, onMounted, watch, onActivated } from 'vue';
import { Api } from '@/apis';
import type { UiBigCard, NBigCard, BigCardData } from "@/typings"
import BigCard from './BigCard.vue';
import { useHomeStore } from "@/stores/home"
import mustSee from '@/assets/apijs/mustSee';
import { Toast } from 'vant';
import 'vant/es/toast/style';
const mustSeeData = ref<Array<NBigCard>>([])
const stores = useHomeStore()
const fail = ref(false)
const dataIsLoading = ref(false)
const isLoading = ref(true)

const { setMustSeeTop } = stores

onMounted(() => {
    dataIsLoading.value = true
    getMustSeeData()

})


const getMustSeeData = () => {
    Api.getMustSeeData().then(({ data }) => {
        mustSeeData.value = data.data.children.map(m => {
            return {
                ...m.children[0].model.resource,
                collection: false,
                like: false,
                cardtype: "mustsee",
                author: {
                    ...m.children[0].model.resource.author,
                    follow: false
                }
            };
        })
        dataIsLoading.value = false
    }).catch(err => {
        if (err) {
            fail.value = true
            console.log("获取***入场必看***数据失败");
        }
    })
}

const onRefresh = () => {
    dataIsLoading.value = true
    fail.value = false
    Toast.success('正在尝试与服务重新连接,请稍等!');

    setTimeout(() => {
        mustSeeData.value = mustSee.children.map(m => {
            return {
                ...m.children[0].model.resource,
                collection: false,
                like: false,
                cardtype: "mustsee",
                author: {
                    ...m.children[0].model.resource.author,
                    follow: false
                }
            };
        })
        Toast.success('刷新成功！');
        isLoading.value = false;
        dataIsLoading.value = false
    }, 5000);

}

onActivated(() => {
    console.log("我被激活了!");
    const mustSeewrapper = document.getElementById("mustsee") as HTMLElement;
    mustSeewrapper.scrollTop = JSON.parse(localStorage.mustSeeTop || "0")
})
const updateMusetData = (bigcarddata: BigCardData) => {
    if (bigcarddata.cardtype === "mustsee") {
        mustSeeData.value = mustSeeData.value.filter(m => m.id !== bigcarddata.id)
    }
}

const getScroll = (e: Event) => {
    const scroll = e.target as HTMLElement
    setMustSeeTop(scroll.scrollTop)
}

</script>

<template>
    <div class="must-see flex overflow-auto h-page" id="mustsee" @scroll="getScroll($event)">
        <div class="w-full p-con" v-if="mustSeeData.length !== 0">
            <div v-for="(m, i) in mustSeeData" :key="m.id">
                <BigCard :big-card="m" @update-home-data="updateMusetData" />
            </div>
        </div>
        <div class="m-auto" v-if="(!fail && mustSeeData.length == 0)">
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
.must-see {
    height: calc(100vh - 99px);
}
</style>