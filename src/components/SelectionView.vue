<script setup lang="ts">
import { ref, onMounted, onActivated } from 'vue';
import { Api } from '@/apis';
import type { UiBigCard, NBigCard, BigCardData } from "@/typings"
import BigCard from './BigCard.vue';
import { useHomeStore } from "@/stores/home"
import selection from '@/assets/apijs/selection';
import { Toast } from 'vant';
import 'vant/es/toast/style';

const SelectionData = ref<Array<NBigCard>>([])
const store = useHomeStore()
const fail = ref(false)
const isLoading = ref(true)

const { setSelectionTop } = store

onMounted(async () => {
    getSelectionData()

})

const getSelectionData = () => {
    Api.getSelectionData().then(({ data }) => {
        data.data.children = data.data.children.filter(s => {
            return s.type === "uiBigCard"
        })
        console.log(data);
        SelectionData.value = data.data.children.map((s: UiBigCard) => {
            return {
                ...s.children[0].model.resource,
                collection: false,
                like: false,
                cardtype: "selection",
                author: {
                    ...s.children[0].model.resource.author,
                    follow: false
                }
            };
        })
    }).catch(err => {
        if (err) {
            fail.value = true
            console.log("获取***编辑精选***数据失败");
        }
    })
}

onActivated(() => {
    console.log("我被激活了!");
    const selectionWrapper = document.getElementById("selection") as HTMLElement;
    selectionWrapper.scrollTop = JSON.parse(localStorage.selectionTop || "0")
})

const getScroll = (e: Event) => {
    const scroll = e.target as HTMLElement
    setSelectionTop(scroll.scrollTop)
}

const updateSelectionData = (bigcarddata: BigCardData) => {
    if (bigcarddata.cardtype === "selection") {
        SelectionData.value = SelectionData.value.filter(s => s.id !== bigcarddata.id)
    }
}

const onRefresh = () => {
    fail.value = false
    Toast.success('正在尝试与服务重新连接,请稍等!');

    setTimeout(() => {
        selection.children = selection.children.filter(s => {
            return s.type === "uiBigCard"
        })
        console.log(selection);
        SelectionData.value = selection.children.map((s) => {
            return {
                ...s.children[0].model.resource,
                collection: false,
                like: false,
                cardtype: "selection",
                author: {
                    ...s.children[0].model.resource.author,
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
    <div class="selection-see flex overflow-auto h-page" id="selection" @scroll="getScroll($event)">
        <div class="w-full p-con" v-if="SelectionData.length !== 0">
            <div v-for="(s, i) in SelectionData" :key="s.id">
                <BigCard :big-card="s" @update-home-data="updateSelectionData" />
            </div>
        </div>
        <div class="m-auto" v-if="(!fail && SelectionData.length == 0)">
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
    width: 100vw;
    height: calc(100vh - 99px);
}
</style>