import { ref, toRaw } from 'vue'
import { defineStore } from 'pinia'

export const useHomeStore = defineStore('home', () => {
    const selectType = ref<number>()
    selectType.value = JSON.parse(localStorage.selectType || "1")
    function setSelectType(type: number) {
        selectType.value = type
        localStorage.setItem('selectType', JSON.stringify(type))
    }

    const mustSeeTop = ref(0)
    function setMustSeeTop(scrollTop: number) {
        mustSeeTop.value = scrollTop
        localStorage.setItem('mustSeeTop', JSON.stringify(scrollTop))
    }

    const recommendTop = ref(0)
    function setRecommendTop(scrollTop: number) {
        recommendTop.value = scrollTop
        localStorage.setItem('recommendTop', JSON.stringify(scrollTop))
    }

    const selectionTop = ref(0)
    function setSelectionTop(scrollTop: number) {
        selectionTop.value = scrollTop
        localStorage.setItem('selectionTop', JSON.stringify(scrollTop))

    }

    const hotTop = ref(0)
    function setHotTop(scrollTop: number) {
        hotTop.value = scrollTop
        localStorage.setItem('hotTop', JSON.stringify(scrollTop))
    }
    const discoverTop = ref(0)
    function setDiscoverTop(scrollTop: number) {
        discoverTop.value = scrollTop
        localStorage.setItem('discoverTop', JSON.stringify(scrollTop))
    }

    const homeRoute = ref("home")
    function setHomeRoute(route: string) {
        homeRoute.value = route
        console.log("homeRoute=>", homeRoute.value);
    }

    return {
        selectType,
        setMustSeeTop,
        setRecommendTop,
        setSelectionTop,
        setHotTop,
        setDiscoverTop,
        setSelectType,
        setHomeRoute,

    }
})