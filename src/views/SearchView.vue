<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { Api } from "@/apis"
import { Dialog } from 'vant';
import hotkeywordApi from '@/assets/apijs/hotkeyword';
import type { Keyword, SarchVideo } from "@/typings"
import SearchListCard from '@/components/SearchListCard.vue';
import kw from '@/assets/apijs/kw';
import { Toast } from 'vant';
import 'vant/es/toast/style';


const router = useRouter()
const searchInput = ref("")
const searchHistory = ref<Array<string>>([])
const hotKeyword = ref<Array<Keyword>>([])
const SearchList = ref<Array<SarchVideo>>([])
const fail = ref(false)
const loading = ref(true)
const isLoading = ref(true)

let timer: NodeJS.Timeout

onMounted(() => {
    hotKeyword.value = hotkeywordApi.list
    loading.value = false
    if (localStorage.searchHistory !== undefined) {
        searchHistory.value = JSON.parse(localStorage.searchHistory)
    }
})

const goBack = () => {
    router.push("/discover")
}

const input = () => {
    if (searchInput.value.length !== 0) {
        clearTimeout(timer)
        timer = setTimeout(() => {
            console.log(searchInput.value);
            goToSearch(searchInput.value)
            saveSearchHistory()
        }, 500)
    } else if (searchInput.value.length === 0) {
        clearTimeout(timer)
        fail.value = false
        SearchList.value = []

    }
}

const goToSearch = (inputVal: string) => {
    console.log("正在搜索");
    Api.getSearchData(inputVal).then(({ data }) => {
        console.log(data);
        SearchList.value = data.data.list
        console.log("SearchList=>", SearchList.value);
        loading.value = false
    }).catch(err => {
        if (searchInput.value === "青春") {
            SearchList.value = kw.data.list
            loading.value = false
        } else if (err) {
            loading.value = false
            fail.value = true
            Toast.fail("数据请求失败！")
            console.log("数据请求失败！");
        }
    })
}

const saveSearchHistory = () => {
    if (searchInput.value !== '') {
        searchHistory.value = searchHistory.value?.filter(h => {
            return h !== searchInput.value
        })

        let arr = [searchInput.value, ...searchHistory.value]
        searchHistory.value = arr
        localStorage.setItem("searchHistory", JSON.stringify(searchHistory.value))
    }
}

const setSearchInput = (name: string) => {
    searchInput.value = name
    SearchList.value = []
    loading.value = true
    goToSearch(name)
    saveSearchHistory()
}

const cleanHistory = () => {
    Dialog.confirm({
        title: '提示',
        message:
            '确定要清空搜索历史吗？',
    })
        .then(() => {
            // on confirm
            searchHistory.value = []
            localStorage.setItem("searchHistory", JSON.stringify(searchHistory.value))
        })
        .catch(() => {
            // on cancel
        });

}

const deletebtn = (val: string) => {
    searchHistory.value = searchHistory.value.filter(s => {
        return s !== val
    })
}

const onRefresh = () => {
    loading.value = true
    fail.value = false
    setTimeout(() => {
        goToSearch(searchInput.value)
        Toast.success('已刷新！');
        isLoading.value = false;
    }, 3000);
}

</script>

<template>
    <div class=" w-screen h-screen bg-white z-10">
        <div class="w-full pl-2.5 pr-2.5 top flex items-center sticky top-0 left-0">
            <div @click="goBack">
                <van-icon name="arrow-left" size="20" />
            </div>
            <div class="w-full">
                <van-search v-model="searchInput" @input="input" placeholder="请输入搜索关键词" :clearable="true" />
            </div>
        </div>
        <div>
            <div class="search-list w-screen overflow-auto"
                v-if="(searchInput.length !== 0 && SearchList.length !== 0)">
                <SearchListCard v-for="(s, i) in SearchList" :search-data="s" :key="i" />
            </div>
            <div class="flex w-screen " v-if="fail">
                <van-pull-refresh class="flex bg-white" :style="{
                    height: ' calc(100vh - 55px)'
                }" v-model="isLoading" @refresh="onRefresh">
                    <img src="../assets/images/fail.jpg" alt="">
                </van-pull-refresh>
            </div>
        </div>
        <div class="search-ticps" v-if="searchInput === ''">
            <div class="ticps-title" v-if="searchHistory?.length > 0">
                <div class="keyword-title">
                    搜索历史
                    <div class="" @click="cleanHistory">
                        <van-icon size="20" name="delete-o" />
                    </div>
                </div>
                <div class="ticp-list">
                    <div class="ticp-list-item relative" v-for="(sh, i) in searchHistory" :key="i"
                        @click="setSearchInput(sh)">
                        {{ sh }}<div
                            class="deletebtn flex justify-center items-center absolute -right-2 -top-2 rounded-full bg-gray-300"
                            @click.stop="deletebtn(sh)"><van-icon name="cross" /></div>
                    </div>
                </div>
            </div>
            <div class="ticps-title">
                <div class="keyword-title">
                    热门搜索
                </div>
                <div class="ticp-list">
                    <div class="ticp-list-item" v-for="(hky, i) in hotKeyword" :key="i"
                        @click="setSearchInput(hky.name)">{{ hky.name }}</div>
                </div>
            </div>
        </div>
        <div class="on-loading" v-if="loading">
            <van-loading size="50" type="spinner" color="#1989fa" vertical>正在努力搜索中...</van-loading>
        </div>
    </div>
</template>

<style lang="scss">
.top {
    border-bottom: 1px solid #999;
}

.deletebtn {
    transform: scale(.7);
    width: 20px;
    height: 20px;
}

.search-list {
    height: calc(100vh - 55px);
}
</style>