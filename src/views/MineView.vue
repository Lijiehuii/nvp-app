<script setup lang="ts">
import { onActivated, onMounted, ref } from "vue"
import { Dialog } from 'vant';
import { useUserStores } from "@/stores/user"
import 'vant/es/dialog/style';
import { Toast } from 'vant';
import 'vant/es/toast/style';
import { useRouter } from "vue-router";
import { computed } from "@vue/reactivity";
const str = ref("")
const usepic = ref("")
const avatarUrl: string = "https://thirdwx.qlogo.cn/mmopen/vi_32/POgEwh4mIHO4nibH0KlMECNjjGxQUq24ZEaGT4poC6icRiccVGKSyXwibcPq4BWmiaIGuG1icwxaQX6grC9VemZoJ8rg/132"
const username = ref("")
const myfollow = ref(0)
const mycollection = ref(0)
const store = useUserStores()
const { followUser, collectionVideo, updateUserInfo, updateToken } = store
const router = useRouter()
onMounted(() => {
    str.value = new URL("../assets/images/user-pic.jpg", import.meta.url).href
    console.log(str.value);
    console.log(JSON.parse(localStorage.userinfo).avatarUrl);
    usepic.value = new URL(JSON.parse(localStorage.userinfo).avatarUrl, import.meta.url).href
    console.log(usepic.value);
    username.value = JSON.parse(localStorage.userinfo).nickname
    myfollow.value = followUser.length
    mycollection.value = collectionVideo.length
})

const loginout = () => {
    Dialog.confirm({
        title: '提示',
        message:
            '确定要退出登录吗？',
    })
        .then(() => {
            // on confirm
            localStorage.setItem('selectType', "1")
            localStorage.setItem("mustSeeTop", "0")
            localStorage.setItem("recommendTop", "0")
            localStorage.setItem("selectionTop", "0")
            localStorage.setItem("hotTop", "0")
            localStorage.setItem("discoverTop", "0")
            updateUserInfo({})
            updateToken("")
            Toast.success("已退出登录！")
            router.replace("/login")
            location.reload()
        })
        .catch(() => {
            // on cancel
        });
}

const followcount = computed(() => {
    return myfollow
})

const colletcionount = computed(() => {
    return mycollection
})

onActivated(() => {
    myfollow.value = JSON.parse(localStorage.followUser || "[]").length
    mycollection.value = JSON.parse(localStorage.collection || "[]").length
})

const goToMyfollow = () => {
    router.push("/myfollow")
}

const goToMycollection = () => {
    router.push("/mycollection")
}

const goToMyfootprint = () => {
    router.push("/myfootprint")
}

</script>

<template>
    <div class="mine w-screen h-screen">
        <div class=" w-screen h-52 flex flex-col items-center justify-center">
            <div class="avatar w-24 h-24 rounded-full overflow-hidden">
                <!-- <img :src="usepic !== '' ? usepic : avatarUrl"> -->
                <van-image width="100%" height="100%" :src="usepic" show-loading show-error lazy-load>
                    <template v-slot:loading>
                        <van-loading type="spinner" size="20" />
                    </template>
                </van-image>
            </div>
            <div class=" text-base text-black font-bold mt-2.5">{{ username }}</div>
        </div>
        <div class="panel my-5 mx-1.5 bg-white rounded-lg flex justify-around">
            <div class="pannel-item ite">
                <span>0</span>
                <span class=" text-sm text-gray-400">作品</span>
            </div>
            <div class="pannel-item ite" @click="goToMyfollow">
                <span>{{ followcount }}</span>
                <span class=" text-sm text-gray-400">关注</span>
            </div>
            <div class="pannel-item ite" @click="goToMycollection">
                <span>{{ colletcionount }}</span>
                <span class=" text-sm text-gray-400">收藏</span>
            </div>
            <div class="pannel-item ite">
                <span>0</span>
                <span class=" text-sm text-gray-400">粉丝</span>
            </div>
        </div>
        <div class="panel my-5 mx-1.5 bg-white rounded-lg flex flex-col justify-around">
            <div class="list pannel-list " @click="goToMyfootprint">
                <span>浏览历史</span>
                <van-icon name="arrow" />
            </div>
            <div class="list pannel-list">
                <span>我的设置</span>
                <van-icon name="arrow" />
            </div>
            <div class="list pannel-list" @click="loginout">
                <span>退出登录</span>
                <van-icon name="arrow" />
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.mine {
    background-image: linear-gradient(180deg, rgb(246, 213, 208), rgb(245, 236, 237));

    .avatar {
        border: 1px solid #fff;
        box-shadow: 0 1px 5px black;
    }

    .panel {
        box-shadow: 0px 3px 2px #999;

        .ite {
            width: calc(100% / 4);
        }

        .list {
            border-bottom: 1px solid #aaa;
        }
    }


}
</style>