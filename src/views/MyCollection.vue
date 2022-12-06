<script setup lang="ts">
import { useRouter } from 'vue-router';
import { useUserStores } from "@/stores/user"
import 'vant/es/button/style';
import { ref, onMounted } from 'vue';
import CollectionVideoCard from '@/components/CollectionVideoCard.vue';
import type { UserCollection } from "@/typings"
import { Toast } from 'vant';
import 'vant/es/toast/style';
import useClipboard from "vue-clipboard3"
const router = useRouter()
const stores = useUserStores()
const { toClipboard } = useClipboard();

const showShare = ref(false);
let timer: NodeJS.Timeout
const { collectionVideo, filterCollection } = stores
const morecollectioncard = ref(<UserCollection>{})
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
const goBack = () => {
    router.go(-1)
}
const mycollection = ref<Array<UserCollection>>([])
onMounted(() => {
    console.log();
    mycollection.value = collectionVideo
    console.log(mycollection.value);
})

const updatefollowuser = (id: number) => {
    mycollection.value = mycollection.value.filter(m => m.id !== id)
}

const uncollection = (id: number) => {
    filterCollection(id)
    updatefollowuser(id)
    Toast.success('已取消收藏!');
}

const more = (data: UserCollection) => {
    showShare.value = true
    morecollectioncard.value = data
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
        return copy(morecollectioncard.value.share_url)
    }
    if (option.name === "删除") {
        return uncollection(morecollectioncard.value.id)
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

</script>

<template>
    <div class=" w-screen h-screen  bg-white z-10">
        <div class="video-top top h-10 p-con flex justify-between">
            <div @click="goBack">
                <van-icon name="arrow-left" size="20" />
            </div>
            <div class="text-center w-full h-full pl-10 pr-10 overflow-hidden text-ellipsis whitespace-nowrap">
                我的收藏<span v-if="(mycollection.length > 1)">{{ '(' + mycollection.length + ')' }}</span>
            </div>
        </div>
        <div class="follow-wrapp relative w-screen overflow-auto" :style="{ height: 'calc(100vh - 40px)' }">
            <div class="user-card" v-for="u in mycollection" :key="u.id">
                <van-swipe-cell>
                    <CollectionVideoCard :collection-data="u" @moreclick="more" />
                    <template #right>
                        <van-button right-width="300" square text="不收藏" type="danger" class="delete-button"
                            @click="uncollection(u.id)" color="red" />
                    </template>
                    <!-- </div> -->
                </van-swipe-cell>
            </div>
            <div class="absolute top-1/2 -translate-y-1/2  text-center" v-if="(mycollection.length === 0)">
                <van-empty image="https://fastly.jsdelivr.net/npm/@vant/assets/custom-empty-image.png" image-size="80"
                    description="收藏列表空空如也,还没有你值得收藏的吗?" />
            </div>
        </div>
        <div class=" absolute bottom-0" @click.stop="showShare = false">
            <van-share-sheet v-model:show="showShare" title="立即分享给好友" :options="options" @select="selectClick" />
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