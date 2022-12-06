<script setup lang="ts">

const props = defineProps<{
    show: boolean
    showText: string
}>()


</script>

<template>
    <div v-if="show"
        class="ticpshow text-center ticps w-52 leading-relaxed bg-black rounded-xl text-white p-5 flex justify-center items-center">
        {{ showText }}
    </div>
</template>

<style lang="scss" scoped>

</style>