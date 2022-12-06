<script setup lang="ts">
import { ref, onMounted, watch } from "vue";
import type { UserinfoDetail, UserFollow } from "@/typings"
import { dataSet } from "@/untils"
import { computed } from "@vue/reactivity";
import { useUserStores } from "@/stores/user"
import { useRoute } from "vue-router";
const props = defineProps<{
    userinfo: UserinfoDetail
}>()

const stores = useUserStores()

const { followUser, updatefollowUser, filterfollowUser } = stores

const avatar = ref("")
const route = useRoute()
const follow = ref(false)
const userid = ref(0)
const p_location = ref("")
const username = ref("")
const user = ref(<UserFollow>{})
const loading = ref(true)
// const count_followee = ref<number>()
const hadfollower = ref(0)
// const count_popularity = ref<number>()
const verify_description = ref<string>()

onMounted(() => {
    getuserinfodata()

})

const getuserinfodata = () => {
    avatar.value = props.userinfo.avatar
    follow.value = props.userinfo.follow
    userid.value = props.userinfo.id
    hadfollower.value = props.userinfo.count.count_follower
    p_location.value = props.userinfo.ip_location
    username.value = props.userinfo.username
    verify_description.value = props.userinfo.verify_description
    user.value.avatar = avatar.value
    user.value.id = userid.value
    user.value.username = username.value
    user.value.follower = hadfollower.value
    let followUserArr = followUser
    followUserArr.map(f => {
        if (f.id === userid.value) {
            follow.value = true
            props.userinfo.count.count_follower++
        }
    })

    if (username.value) {
        loading.value = false
    }
}

const routeuserid = computed(() => {
    return route.params.id
})

watch(routeuserid, () => {
    if (route.name === "userinfo") {
        if (Number(routeuserid.value) !== userid.value) {
            loading.value = true
            avatar.value = ""
            follow.value = false
            userid.value = 0
            hadfollower.value = 0
            p_location.value = ""
            username.value = ""
            verify_description.value = ""
            user.value.avatar = ""
            user.value.id = 0
            user.value.username = ""
            user.value.follower = 0
            let followUserArr = followUser
            console.log(username.value);
            followUserArr.map(f => {
                if (f.id === userid.value) {
                    follow.value = true
                    props.userinfo.count.count_follower++
                }
            })
            getuserinfodata()
        }
    }
})

const followee = computed(() => {
    return dataSet(props.userinfo.count.count_followee)
})
const follower = computed(() => {
    return dataSet(props.userinfo.count.count_follower)
})
const popularity = computed(() => {
    return dataSet(props.userinfo.count.count_popularity)
})


const followStatus = () => {
    if (follow.value) {
        props.userinfo.count.count_follower--
        filterfollowUser(userid.value)
    } else if (!follow.value) {
        props.userinfo.count.count_follower++
        updatefollowUser(user.value)
    }
    follow.value = !follow.value
}

</script>

<template>
    <van-skeleton class=" mt-4" title :row="10" :loading="loading">
        <div class=" w-full pt-5 pr-2.5 pb-4 pl-2.5">
            <div class=" flex">
                <div class="user-pic w-12 h-12 rounded-full overflow-hidden mr-4">
                    <van-image width="100%" height="100%" :src="avatar" show-loading show-error lazy-load>
                        <template v-slot:loading>
                            <van-loading type="spinner" size="20" />
                        </template>
                    </van-image>
                </div>
                <div class=" text-xl">
                    <div class=" mb-1.5">{{ username }}</div>
                    <div class=" text-sm">{{ p_location }}</div>
                </div>
            </div>
            <div class=" text-gray-400 mt-5 mb-5">{{ verify_description ? verify_description : "暂无简介" }}</div>
            <div class=" flex justify-between items-center">
                <div class="flex">
                    <div class="user-data">
                        <div class=" user-data-count">{{ popularity }}</div>
                        人气
                    </div>
                    <div class="user-data">
                        <div class=" user-data-count">{{ follower }}</div>
                        粉丝
                    </div>
                    <div class="user-data">
                        <div class=" user-data-count">{{ followee }}</div>
                        关注
                    </div>
                </div>
                <div class="follow-status un-follow" :class="{ followed: follow }" @click="followStatus">
                    {{ follow ? "已关注" : "关注" }}
                </div>
            </div>
        </div>
    </van-skeleton>
</template>

<style lang="scss" scoped>
.user-pic {
    border: 2px solid #000;
}

.followed {
    color: #999;
    background-color: rgba(0, 0, 0, .2);
}
</style>