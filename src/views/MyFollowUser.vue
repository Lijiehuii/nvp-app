<script setup lang="ts">
import { useRouter } from 'vue-router';
import { useUserStores } from "@/stores/user"
import 'vant/es/button/style';
import { ref, onMounted } from 'vue';
import FollowUserCard from "@/components/FollowUserCard.vue"
import type { UserFollow } from "@/typings"
import { Toast } from 'vant';
import 'vant/es/toast/style';

const router = useRouter()

const stores = useUserStores()
const { followUser, filterfollowUser } = stores
const goBack = () => {
    router.go(-1)
}
const myfollow = ref<Array<UserFollow>>([])
onMounted(() => {
    console.log(followUser);
    myfollow.value = followUser
    console.log(myfollow.value);
})

const updatefollowuser = (id: number) => {
    myfollow.value = myfollow.value.filter(m => m.id !== id)
}

const unfollow = (id: number) => {
    filterfollowUser(id)
    updatefollowuser(id)
    Toast.success('已取消关注!');
}
</script>

<template>
    <div class=" w-screen h-screen  bg-white z-10">
        <div class="video-top top h-10 p-con flex justify-between">
            <div @click="goBack">
                <van-icon name="arrow-left" size="20" />
            </div>
            <div class="text-center w-full h-full pl-10 pr-10 overflow-hidden text-ellipsis whitespace-nowrap">
                我的关注<span v-if="(myfollow.length > 1)">{{ '(' + myfollow.length + ')' }}</span>
            </div>
        </div>
        <div class="follow-wrapp relative w-screen overflow-auto" :style="{ height: 'calc(100vh - 40px)' }">
            <div class="user-card" v-for="u in myfollow" :key="u.id">
                <van-swipe-cell>
                    <FollowUserCard :user-data="u" @updatefollowuser="updatefollowuser" />
                    <!-- <div class="flex h-full"> -->
                    <template #right>
                        <van-button right-width="300" square text="不关注" type="danger" class="delete-button"
                            @click="unfollow(u.id)" color="red" />
                    </template>
                    <!-- </div> -->
                </van-swipe-cell>
            </div>
            <div class="absolute top-1/2 -translate-y-1/2  text-center" v-if="(myfollow.length === 0)">
                <van-empty image="https://fastly.jsdelivr.net/npm/@vant/assets/custom-empty-image.png" image-size="80"
                    description="关注列表空空如也,还没有你值得关注的用户吗?" />
            </div>
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