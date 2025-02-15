<script setup lang="ts">
defineProps({
  strokeDown: String,
})
</script>

<template>
  <svg width="17" height="16" viewBox="0 0 17 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12.3333 6L8.32972 2L4.33325 6" stroke="#93939B" stroke-width="1.5" stroke-miterlimit="10"/>
    <path d="M4.33325 10L8.33679 14L12.3333 10" :stroke="strokeDown" stroke-width="1.5" stroke-miterlimit="10"/>
  </svg>

</template>

<style scoped>

</style>

//#0E0E10