<script setup lang="ts">
import { ref, onMounted} from 'vue';
import { Api } from '@/apis';
import type { Comment, MyMsg } from "@/typings"
import CommentListCard from './CommentList.vue';
import { Toast } from 'vant';
import 'vant/es/toast/style';
import videoresource10934897 from '@/assets/apijs/videoresource10934897';
const props = defineProps<{
    topHeight: number
    id: string
}>()

const CommentList = ref<Array<Comment>>([])
const loading = ref(true)
const inputVal = ref("")
const userinfo = ref(<MyMsg>{})
const islodaing = ref(false)
const comment = ref({
    addtime: 0,
    ip_location: "",
    userInfo: {
        avatar: "",
        username: "",
    },
    content: ""
})

onMounted(async () => {
    getVideoCommentData()
    userinfo.value = JSON.parse(localStorage.userinfo)
})

const getVideoCommentData = () => {
    Api.getVideoCommentData(props.id).then(({ data }) => {
        CommentList.value = data.data.list
        loading.value = false
        islodaing.value = false
    }).catch(err => {
        if (props.id === "11929255") {
            CommentList.value = videoresource10934897.list
            loading.value = false
            islodaing.value = false
        } else if (err) {
            console.log(err);
        }
    })
}


const sendComment = () => {
    let time = Math.floor((new Date().getTime()) / 1000)

    comment.value.addtime = time
    comment.value.content = inputVal.value
    comment.value.ip_location = userinfo.value.ip_location
    comment.value.userInfo.avatar = new URL(userinfo.value.avatarUrl, import.meta.url).href
    comment.value.userInfo.username = userinfo.value.nickname

    CommentList.value = [comment.value, ...CommentList.value]
    Toast.success('发布成功!');
    inputVal.value = ""
}

</script>

<template>
    <div class=" p-con box-border relative overflow-auto" :style="{ height: 'calc(100vh - ' + topHeight + 'px)' }">
        <van-skeleton title :row="10" :loading="loading">
            <div v-if="!islodaing">
                <div class=" pb-5 overflow-auto" :style="{ height: 'calc(100vh - ' + (topHeight + 20) + 'px)' }">
                    <div v-for="(c, i) in CommentList" :key="c.addtime">
                        <CommentListCard :comment-data="c" />
                    </div>
                </div>
                <div class="comment-input">
                    <input v-model="inputVal" type="text" placeholder="我有话要说">
                    <button class=" rounded-lg bg-gray-100" :disabled="!inputVal" @click="sendComment">发布</button>
                </div>
                <div class="absolute w-5/6 text-center -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2"
                    v-if="CommentList.length === 0">
                    暂时还没有人评论,快发布评论抢沙发~
                </div>
            </div>
            <div class="loading" v-else>
                <van-loading size="50" type="spinner" color="#1989fa" vertical>数据加载中...</van-loading>
            </div>
        </van-skeleton>
    </div>
</template>

<style lang="scss" scoped>
.none {
    display: none;
}

.comment-input {
    width: 100%;
    height: 40px;
    box-sizing: border-box;
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    display: flex;
    padding: 10px 15px;
    background-color: #fff;
    justify-content: space-between;
    align-items: center;

    input {
        width: 100%;
        height: 100%;
        background-color: #ddd;
        color: #000;
        border-radius: 5px;
        font-size: 13px;
        padding-left: 10px;
        margin-right: 10px;
    }

    button {
        font-size: 12px;
        flex: 0 0 40px;
        height: 30px;
        padding: 0;
        margin: 0;

        &:disabled {
            color: #ddd;
        }

    }
}
</style>
