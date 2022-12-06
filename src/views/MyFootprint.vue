<script setup lang="ts">
import { useRouter } from 'vue-router';
import { useUserStores } from "@/stores/user"
import 'vant/es/button/style';
import { ref, onMounted } from 'vue';
import FootprintCard from '@/components/FootprintCard.vue';
import type { UserFootprint } from "@/typings"
import { Toast } from 'vant';
import 'vant/es/toast/style';
import useClipboard from "vue-clipboard3"
import { Dialog } from 'vant';
const { toClipboard } = useClipboard();
const stores = useUserStores()
const { footprint, filterFootprint, resetfootprint } = stores

const router = useRouter()

const showShare = ref(false);
const goBack = () => {
    router.go(-1)
}
const myfootprint = ref<Array<UserFootprint>>([])
const morefootprintcard = ref(<UserFootprint>{})
let timer: NodeJS.Timeout
const options = [
    [{
        name: '微信',
        icon: new URL("../assets/images/share-icons/wechat.png", import.meta.url).href
    },
    {
        name: '朋友圈',
        icon: new URL('../assets/images/share-icons/wechat-moments.png', import.meta.url).href
    },
    {
        name: 'QQ',
        icon: new URL('../assets/images/share-icons/qq.png', import.meta.url).href
    },
    ],
    [{
        name: '复制链接',
        icon: new URL('../assets/images/share-icons/link.png', import.meta.url).href
    }, {
        name: '删除',
        icon: new URL('../assets/images/share-icons/trashcan.png', import.meta.url).href
    }],
]
onMounted(() => {
    console.log();
    myfootprint.value = footprint
    console.log(myfootprint.value);
})

const updatefootprint = (id: number) => {
    myfootprint.value = myfootprint.value.filter(m => m.id !== id)
}

const deleted = (id: number) => {
    filterFootprint(id)
    updatefootprint(id)
    Toast.success('已取消删除该浏览历史!');
}
const more = (data: UserFootprint) => {
    showShare.value = true
    morefootprintcard.value = data
}

const selectClick = (option: { icon: string, name: string }) => {
    console.log(option.name);
    if (option.name === "QQ") {
        return unfind(option.name)
    }
    if (option.name === "微信") {
        return unfind(option.name)
    }
    if (option.name === "复制链接") {
        return copy(morefootprintcard.value.share_url)
    }
    if (option.name === "删除") {
        return deleted(morefootprintcard.value.id)
    }
}

const copy = (val: string) => {
    try {
        toClipboard(val);
        Toast.success("复制成功")
        console.log('复制成功!')
    } catch (e) {
        console.log(e);
    }
};

const unfind = (name: string) => {
    timer = setTimeout(() => {
        Toast.fail("未找到应用" + name + "!")
        clearTimeout(timer)
    }, 500)
}

const cleanfoot = () => {
    Dialog.confirm({
        title: '提示',
        message:
            '确定要清空我的足迹吗？',
    })
        .then(() => {
            // on confirm
            myfootprint.value = []
            resetfootprint()
        })
        .catch(() => {
            // on cancel
        });
}

</script>

<template>
    <div class=" w-screen h-screen  bg-white z-10">
        <div class="video-top top h-10 p-con flex justify-between">
            <div @click="goBack">
                <van-icon name="arrow-left" size="20" />
            </div>
            <div class="text-center w-full h-full pl-10 pr-10 overflow-hidden text-ellipsis whitespace-nowrap">
                我的足迹<span v-if="(myfootprint.length > 1)">{{ '(' + myfootprint.length + ')' }}</span>
            </div>
        </div>
        <div class="follow-wrapp relative w-screen overflow-auto" :style="{ height: 'calc(100vh - 40px)' }">
            <div class="user-card" v-for="f in myfootprint" :key="f.id">
                <van-swipe-cell>
                    <FootprintCard :footprint-data="f" @moreclick="more" />
                    <template #right>
                        <van-button right-width="300" square text="删除" type="danger" class="delete-button"
                            @click="deleted(f.id)" color="red" />
                    </template>
                </van-swipe-cell>
            </div>
            <div class="absolute top-1/2 -translate-y-1/2  text-center" v-if="(myfootprint.length === 0)">
                <van-empty image="https://fastly.jsdelivr.net/npm/@vant/assets/custom-empty-image.png" image-size="80"
                    description="收藏列表空空如也,还没有你值得收藏的吗?" />
            </div>
        </div>
        <div class=" absolute bottom-0" @click.stop="showShare = false">
            <van-share-sheet v-model:show="showShare" title="立即分享给好友" :options="options" @select="selectClick" />
        </div>
        <div class=" absolute bottom-10 right-5" @click.stop="cleanfoot">
            <van-icon name="delete-o" size="25" />
        </div>
    </div>
</template>

<style lang="scss" scoped>
.top {
    border-bottom: 1px solid #999;
}

.delete-button {
    height: 100%;
}
</style>