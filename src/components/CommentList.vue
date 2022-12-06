<script setup lang="ts">
import { ref, onMounted } from "vue";
import type { Comment } from "@/typings"
import { getTime } from "@/untils"
import { computed } from '@vue/reactivity';
const props = defineProps<{
    commentData: Comment
}>()

const avatar = ref("")
const username = ref("")
const content = ref("")
const ip_location = ref("")
const localusername = ref("")

onMounted(() => {
    avatar.value = props.commentData.userInfo.avatar
    username.value = props.commentData.userInfo.username
    content.value = props.commentData.content
    ip_location.value = props.commentData.ip_location
    localusername.value = JSON.parse(localStorage.userinfo).nickname
})

const commentAddTime = computed(() => {
    return getTime(props.commentData.addtime * 1000)
})
</script>

<template>
    <div class="comment-list p-1 flex">
        <div class="user-pic w-8 h-8 rounded-full mr-2.5 overflow-hidden flex-user-pic">
            <van-image width="100%" height="100%" :src="avatar" show-loading show-error lazy-load>
                <template v-slot:loading>
                    <van-loading type="spinner" size="20" />
                </template>
            </van-image>
        </div>
        <div>
            <div class=" text-sm flex items-center text-gray-500">{{ username }} <div class="mine"
                    v-if="(username === localusername)">我的</div>
            </div>
            <div class=" pt-1 pb-1 text-base break-words text-black">{{ content }}</div>
            <div class="flex text-xs">
                <div>{{ commentAddTime }}</div>
                <div class="ml-1 mr-1" v-if="ip_location">·</div>
                <div>{{ ip_location }}</div>
            </div>
        </div>
    </div>
</template>
<style lang="scss" scoped>
.comment-list {
    border-bottom: 1px solid #eee;

    .mine {
        color: brown;
        font-size: 20px;
        transform: scale(.5);
    }
}
</style>