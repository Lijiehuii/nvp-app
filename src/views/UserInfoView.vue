<script setup lang="ts">
import { ref, onMounted, watch, onActivated, computed } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { Api } from '@/apis';
import type { UserinfoDetail } from "@/typings"
import UserInfo from "@/components/UserInfo.vue"
import UserCreation from '@/components/UserCreation.vue';
import UseLike from "@/components/UserLike.vue"
import { Toast } from 'vant';
import 'vant/es/toast/style';
import useClipboard from "vue-clipboard3"
import user10884012 from '@/assets/apijs/user10884012';
const props = defineProps<{
    id: string
}>()

const { toClipboard } = useClipboard();

const router = useRouter()
const route = useRoute()
const userinfoData = ref(<UserinfoDetail>{})
const username = ref("")
const share_info_url = ref("")
const showShare = ref(false);
const fail = ref(false)
const loading = ref(true)
const isLoading = ref(true)
const userid = ref(0)
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
    }],
]
let timer: NodeJS.Timeout

onMounted(async () => {
    console.log("123", route.params.id);
    getUserInfoDetailData(props.id)
})

const routeuserid = computed(() => {
    return route.params.id
})

watch(routeuserid, () => {
    if (route.name === "userinfo") {
        if (Number(routeuserid.value) !== userid.value) {
            console.log(routeuserid.value, userid.value);
            console.log("userid发生了改变!");
            userinfoData.value = {
                follow: false,
                id: 0,
                username: "",
                avatar: "",
                ip_location: "",
                verify_description: "",
                count: {
                    count_popularity: 0,
                    count_follower: 0,
                    count_followee: 0,
                },
                share_info: {
                    url: ""
                }
            }
            username.value = ""
            share_info_url.value = ""
            userid.value = 0
            loading.value = true
            getUserInfoDetailData(String(routeuserid.value))
        }
    }
})

const getUserInfoDetailData = (id: string) => {
    Api.getUserInfoDetailData(id).then(({ data }) => {
        userinfoData.value = data.data
        username.value = data.data.username
        share_info_url.value = data.data.share_info.url
        userid.value = data.data.id
        loading.value = false
    }).catch(err => {
        if (props.id === "10884012") {
            userinfoData.value = user10884012
            username.value = user10884012.username
            share_info_url.value = user10884012.share_info.url
            loading.value = false
        } else if (err) {
            fail.value = true
            Toast.fail("获取数据失败！")
        }
    })
}

const onRefresh = () => {
    fail.value = false
    setTimeout(() => {
        getUserInfoDetailData(String(routeuserid.value))
        Toast.success('已刷新！');
        isLoading.value = false;
    }, 3000);
}

const goBack = () => {
    router.go(-1)
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
        return copy(share_info_url.value)
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
    <div class="w-screen h-screen relative overflow-auto  bg-white z-10">
        <div class="w-full box-border top h-10 p-con flex justify-between">
            <div @click="goBack">
                <van-icon name="arrow-left" size="20" />
            </div>
            <div v-if="username"
                class="text-center w-full h-full pl-10 pr-10 overflow-hidden text-ellipsis whitespace-nowrap">
                {{ username }}
            </div>
            <div class="more" v-if="username" @click.stop="(showShare = true)">
                <van-icon name="ellipsis" size="20" />
            </div>
        </div>
        <div class="w-full" v-if="username">
            <van-skeleton class=" mt-4" title :row="10" :loading="loading">
                <div class="p-2.5">
                    <UserInfo :userinfo="userinfoData" />
                </div>
                <van-tabs animated swipeable>
                    <van-tab title="作品">
                        <UserCreation :id="id" />
                    </van-tab>
                    <van-tab title="喜欢">
                        <UseLike :id="id" />
                    </van-tab>
                </van-tabs>
            </van-skeleton>
        </div>
        <div class="on-loading" v-else>
            <van-loading size="50" type="spinner" color="#1989fa" vertical>数据加载中...</van-loading>
        </div>
        <div @click.stop="showShare = false">
            <van-share-sheet v-model:show="showShare" title="立即分享给好友" :options="options" @select="selectClick" />
        </div>
        <div class="flex w-screen" v-if="fail">
            <van-pull-refresh class="flex bg-white" :style="{
                height: ' calc(100vh - 40px)'
            }" v-model="isLoading" @refresh="onRefresh">
                <img src="../assets/images/fail.jpg" alt="">
            </van-pull-refresh>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.top {
    border-bottom: 1px solid #999;
}
</style>