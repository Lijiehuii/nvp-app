<script setup lang="ts">
import { RouterView } from 'vue-router'
import { ref, onBeforeUnmount, onMounted } from 'vue';
const home = {
  active: new URL("./assets/tab-icons/home_act.png", import.meta.url).href,
  inactive: new URL("./assets/tab-icons/home.png", import.meta.url).href
}
const discover = {
  active: new URL("./assets/tab-icons/discover_act.png", import.meta.url).href,
  inactive: new URL("./assets/tab-icons/discover.png", import.meta.url).href
}
const mine = {
  active: new URL("./assets/tab-icons/mine_act.png", import.meta.url).href,
  inactive: new URL("./assets/tab-icons/mine.png", import.meta.url).href
}

onMounted(() => {
  // if (localStorage.selectType === "underfind") {
  //   localStorage.setItem("selectType", "1")
  // }
  localStorage.setItem('selectType', "1")
  localStorage.setItem("mustSeeTop", "0")
  localStorage.setItem("recommendTop", "0")
  localStorage.setItem("selectionTop", "0")
  localStorage.setItem("hotTop", "0")
  localStorage.setItem("discoverTop", "0")

})

</script>

<template>
  <div>
    <router-view v-slot="{ Component }">
      <keep-alive>
        <component :is="Component" :key="$route.name" v-if="$route.meta.keepAlive" />
      </keep-alive>
      <component :is="Component" :key="$route.name" v-if="!$route.meta.keepAlive" />
    </router-view>
    <van-tabbar route active-color="#000" inactive-color="rgb(161, 161, 161)">
      <van-tabbar-item replace to="/home">
        <span>我的</span>
        <template #icon="props">
          <img :src="props.active ? home.active : home.inactive" />
        </template>
      </van-tabbar-item>
      <van-tabbar-item replace to="/discover">
        <span>发现</span>
        <template #icon="props">
          <img :src="props.active ? discover.active : discover.inactive" />
        </template>
      </van-tabbar-item>
      <van-tabbar-item replace to="/mine">
        <span>我的</span>
        <template #icon="props">
          <img :src="props.active ? mine.active : mine.inactive" />
        </template>
      </van-tabbar-item>
    </van-tabbar>
  </div>

</template>

<style lang="scss" scoped>

</style>
