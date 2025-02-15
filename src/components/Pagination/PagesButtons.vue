<script setup lang="ts">

import Pages from "@/components/Pagination/Pages/Pages.vue";
</script>

<template>
  <div class="pagination-container">
    <Pages />
  </div>
</template>

<style scoped lang="scss">
.pagination-container {
  display: flex;
  justify-content: space-between;
}
</style>