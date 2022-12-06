<script setup lang="ts">
import { Toast } from 'vant';
import 'vant/es/toast/style';
import { onActivated, onMounted, ref, watch } from 'vue';
import { useRouter } from 'vue-router';
import MyToast from '@/components/MyToast.vue';
import { useUserStores } from "@/stores/user"

const router = useRouter()
const tel = ref("")
const password = ref("")
const checked = ref(false)
const showTicp = ref(false)
const showText = ref("")
const telReg = /^1(3|4|5|7|8)\d{9}$/;
let timer: NodeJS.Timeout

const store = useUserStores()

const { userinfo, updateUserInfo, token, updateToken } = store

// const goBack = () => {
//     router.push('/mine')
// }

onMounted(() => {
    console.log(123);
    console.log(userinfo);
    console.log(token);
})

const goToLogin = () => {
    if (tel.value === '' && password.value === '') {
        return Toast.fail("请输入账号和密码!")
    }
    if (telReg.test(tel.value)) {
        if (password.value.length >= 6) {
            if (checked.value) {
                if (tel.value.length === 11 && (password.value.length > 5 && password.value.length < 14)) {
                    // showTicp.value = true
                    // showText.value = "登录成功!"
                    Toast.success("登录成功!")
                    let lastFour = tel.value.substring(tel.value.length - 4)
                    let t = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOjIzLCJpYXQiOjE1NjQ3MzAwNzksImV4cCI6MTAwMTU2NDczMDA3OH0.YPt-XeLnjV-_1ITaXGY2FhxmCe4NvXuRnRB8OMCfnPo"

                    console.log("lastFour=>", lastFour);
                    let user = {
                        // avatarUrl: "https://thirdwx.qlogo.cn/mmopen/vi_32/POgEwh4mIHO4nibH0KlMECNjjGxQUq24ZEaGT4poC6icRiccVGKSyXwibcPq4BWmiaIGuG1icwxaQX6grC9VemZoJ8rg/132",
                        avatarUrl: "../assets/images/user-pic.jpg",
                        nickname: "手机用户" + lastFour,
                        ip_location: "广州"
                    }
                    // let empty = {
                    //     avatarUrl: "",
                    //     nickname: ""
                    // }
                    console.log(user);
                    console.log(t);
                    updateUserInfo(user)
                    updateToken(t)
                    timer = setTimeout(() => {
                        showTicp.value = false
                        router.push("/")
                        clearTimeout(timer)
                    }, 500)
                } else {
                    // showTicp.value = true
                    // showText.value = "账号或密码错误，请重新输入！"
                    Toast.fail("账号或密码错误，请重新输入！")

                }
                console.log("电话=>:", tel.value);
                console.log("密码=>", password.value);
                console.log("验证都通过");
            } else {
                // showTicp.value = true
                // showText.value = "请先勾选用户同意选项"
                Toast.fail("请先勾选用户同意选项")
                console.log("请先勾选用户同意选项");
            }
        } else {
            // showTicp.value = true
            // showText.value = "请输入6~13位的密码!"
            Toast.fail("请输入6~13位的密码!")
            console.log("请输入6~13位的密码");
        }
    } else {
        // Toast("请输入正确的手机号码!")
        // showTicp.value = true
        // showText.value = "请输入正确的手机号码!"
        Toast.fail("请输入正确的手机号码!")
        console.log("请输入正确的手机号码!");
    }
}

watch(showTicp, (newVal) => {
    if (newVal) {
        timer = setTimeout(() => {
            showTicp.value = false
            clearTimeout(timer)
        }, 2000)
    }
})

</script>

<template>
    <div class="flex flex-col relative w-screen h-screen bg-white z-10">
        <div class="w-full top h-10 p-con flex justify-between">
            <!-- <div @click="goBack">
                <van-icon name="cross" size="20" />
            </div> -->
        </div>
        <div class="flex flex-col justify-between w-full h-full p-2.5">
            <div class="">
                <div class=" mt-7 text-2xl font-bold mb-12">
                    登录后更精彩
                    <div></div>
                </div>
                <div class="login-wrapper ">
                    <van-cell-group inset>
                        <!-- 输入手机号，调起手机号键盘 -->
                        <van-field v-model="tel" maxlength="11" type="tel" label="手机号" required placeholder="请输入手机号" />
                        <!-- 输入密码 -->
                        <van-field v-model="password" type="password" maxlength="13" label="密码" required
                            placeholder="请输入密码" />
                    </van-cell-group>
                    <div class=" mt-5 pl-7 pr-7">
                        <van-button :style="{ height: '35px' }" color="rgb(229, 76, 60)" round size="large"
                            @click="goToLogin">登录
                        </van-button>
                    </div>
                    <div class=" mt-4 flex flex-wrap items-center justify-center">
                        <div class=" mr-2">
                            <van-checkbox :style="{ fontSize: '12px' }" icon-size="12px" v-model="checked"
                                checked-color="rgb(229, 76, 60)" shape="square">
                            </van-checkbox>
                        </div>
                        <div class=" text-xs">
                            我已同意<span class=" text-blue-400">《新视界用户协议》</span>和<span class="text-blue-400">《隐私条款》</span>
                        </div>
                        <div class="text-xs mt-2 text-gray-500">
                            :未注册的手机号将自动注册
                        </div>
                    </div>
                </div>
            </div>
            <div class=" w-full flex justify-center mb-5">
                <div class="w-7 h-7 mr-5">
                    <img src="@/assets/images/share-icons/qq.png" alt="">
                </div>
                <div class="w-7 h-7 ml-5">
                    <img src="@/assets/images/share-icons/wechat.png" alt="">
                </div>
            </div>
        </div>
        <!-- <MyToast :show="showTicp" :show-text="showText" /> -->
    </div>
</template>

<style lang="scss" scoped>
.top {
    border-bottom: 1px solid #999;
}
</style>