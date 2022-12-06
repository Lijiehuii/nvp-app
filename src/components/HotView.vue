<script setup lang="ts">
import { ref, onMounted, onActivated } from 'vue';
import { Api } from '@/apis';
import type { UiBigCard, NBigCard, BigCardData } from "@/typings"
import BigCard from './BigCard.vue';
import hot from "@/assets/apijs/hot"
import { useHomeStore } from "@/stores/home"
import { Toast } from 'vant';
import 'vant/es/toast/style';

const hotdata = ref<Array<NBigCard>>([])
const store = useHomeStore()
const fail = ref(false)
const isLoading = ref(true)

const { setHotTop } = store

onMounted(() => {
    getHotData()

})

const getHotData = () => {
    Api.getHotData().then(({ data }) => {
        console.log(data);
        data.data.children = data.data.children.filter(h => {
            return h.type === "uiBigCard"
        })
        hotdata.value = data.data.children.map((s: UiBigCard) => {
            return {
                ...s.children[0].model.resource,
                collection: false,
                like: false,
                cardtype: "hot",
                author: {
                    ...s.children[0].model.resource.author,
                    follow: false
                }
            };
        })
    }).catch(err => {
        if (err) {
            fail.value = true
            console.log("获取***热门***数据失败");
        }
    })

}

onActivated(() => {
    console.log("我被激活了!");
    const hotWrapper = document.getElementById("hot") as HTMLElement;
    hotWrapper.scrollTop = JSON.parse(localStorage.hotTop || "0")
})

const getScroll = (e: Event) => {
    const scroll = e.target as HTMLElement
    setHotTop(scroll.scrollTop)
}


const updateHotData = (bigcarddata: BigCardData) => {
    if (bigcarddata.cardtype === "hot") {
        hotdata.value = hotdata.value.filter(h => h.id !== bigcarddata.id)
    }
}

const onRefresh = () => {
    fail.value = false
    Toast.success('正在尝试与服务重新连接,请稍等!');
    setTimeout(() => {
        hot.children = hot.children.filter(h => {
            return h.type === "uiBigCard"
        })
        console.log(hot);

        hotdata.value = hot.children.map(h => {
            return {
                ...h.children[0].model.resource,
                collection: false,
                like: false,
                cardtype: "hot",
                author: {
                    ...h.children[0].model.resource.author,
                    follow: false
                }
            };
        })
        Toast.success('刷新成功！');
        isLoading.value = false;
    }, 5000);

}

</script>

<template>
    <div class="selection-see flex overflow-auto h-page " id="hot" @scroll="getScroll($event)">
        <div class="w-full p-con" v-if="hotdata.length !== 0">
            <div v-for="(s, i) in hotdata" :key="s.id">
                <BigCard :big-card="s" @update-home-data="updateHotData" />
            </div>
        </div>
        <div class="m-auto" v-if="(!fail && hotdata.length == 0)">
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
.selection-see {
    height: calc(100vh - 99px);
}
</style>