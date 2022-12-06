<script setup lang="ts">
import { ref, onMounted, onActivated, onUnmounted } from 'vue';
import { Api } from "@/apis";
import type { BannerList } from "@/typings"
import { useHomeStore } from "@/stores/home"

import MustSeeView from '@/components/MustSeeView.vue';
import RecommendView from '@/components/RecommendView.vue';
import SelectionView from '@/components/SelectionView.vue';
import HotView from '@/components/HotView.vue';

import mustSee from '@/assets/apijs/mustSee';
import recommend from "@/assets/apijs/recommend"
import selection from '@/assets/apijs/selection';
import hot from '@/assets/apijs/hot';

const active = ref(1);
const stores = useHomeStore()

const { setSelectType } = stores

// const date = ref('')
// const topStories = ref<TopStoryType>()
// const storiesArr = ref<StoryType[]>()

const bannerList = ref<BannerList[]>()


onMounted(async () => {
  if (localStorage.selectType === undefined) {
    active.value = 1
  }

  // console.log(123);
  // let { data } = await Api.getStoriesLatest()
  // console.log("mustSee=>", mustSee);
  // console.log("recommend=>", recommend);
  // console.log("selection=>", selection);
  // console.log("hot=>", hot);
})

onActivated(() => {
  if (localStorage.getItem("selectType") === null) {
    active.value = 1
  } else {
    active.value = JSON.parse(localStorage.selectType)
  }
})

onUnmounted(() => {
  localStorage.removeItem("selectType")
})

const onClickTab = (title: any) => {
  setSelectType(title.name)
}
</script>

<template>
  <div class="home">
    <van-tabs v-model:active="active" @click-tab="onClickTab">
      <van-tab title="入场必看">
        <KeepAlive>
          <MustSeeView />
        </KeepAlive>
      </van-tab>
      <van-tab title="推荐">
        <KeepAlive>
          <RecommendView />
        </KeepAlive>
      </van-tab>
      <van-tab title="编辑精选">
        <KeepAlive>
          <SelectionView />
        </KeepAlive>
      </van-tab>
      <van-tab title="热门">
        <KeepAlive>
          <HotView />
        </KeepAlive>
      </van-tab>
    </van-tabs>
  </div>
</template>

<style lang="scss" scoped>
.home {
  background-color: #f1f1f1;
}
</style>