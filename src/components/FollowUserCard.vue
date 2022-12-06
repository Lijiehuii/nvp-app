<script setup lang="ts">
import type { UserFollow } from "@/typings"
import { ref, onMounted, defineEmits } from "vue";
import { dataSet } from "@/untils"
import { computed } from "@vue/reactivity";
import { Dialog } from 'vant';
import { useUserStores } from "@/stores/user"
import { Toast } from 'vant';
import 'vant/es/toast/style';
import { useRouter } from "vue-router";
const props = defineProps<{
    userData: UserFollow
}>()

const emit = defineEmits<{
    (e: 'updatefollowuser', id: number): void
}>()
const router = useRouter()
const stores = useUserStores()
const { filterfollowUser, followUser } = stores
const avatar = ref("")
const userid = ref(0)
const follower = ref(0)
const username = ref("")

onMounted(() => {
    avatar.value = props.userData.avatar
    userid.value = props.userData.id
    follower.value = props.userData.follower
    username.value = props.userData.username
})
const follower_count = computed(() => {
    return dataSet(follower.value)
})

const unfollow = () => {
    Dialog.confirm({
        title: '提示',
        message:
            '不再关注 ' + username.value + ' 吗?',
    })
        .then(() => {
            // on confirm
            console.log(123);
            disfollow()
        })
        .catch(() => {
            // on cancel
        });
}

const disfollow = () => {
    filterfollowUser(userid.value)
    emit('updatefollowuser', userid.value)
    Toast.success('已取消关注!');
}

const goToUserInfo = (id: number) => {
    router.push(`/userinfo/${id}`)
}

</script>
<template>
    <div class="follow-user flex p-2.5 justify-between items-center" @click="goToUserInfo(userid)">
        <div class="flex">
            <div class=" w-14 h-14 rounded-full overflow-hidden mr-2.5">
                <van-image width="100%" height="100%" :src="avatar" show-loading show-error lazy-load>
                    <template v-slot:loading>
                        <van-loading type="spinner" size="20" />
                    </template>
                </van-image>
            </div>
            <div class="flex box-border flex-col justify-around">
                <div class=" w-52  text-ellipsis overflow-hidden whitespace-nowrap">
                    {{ username }}
                </div>
                <div>
                    {{ "粉丝 " + follower_count }}
                </div>
            </div>
        </div>
        <div class="follow-btn" @click.stop="unfollow">
            已关注
        </div>
    </div>
</template>

<style lang="scss" scoped>
.follow-user {
    border-bottom: 1px solid #eee;
}
</style>