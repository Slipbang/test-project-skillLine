<script setup lang="ts">

import Pages from "@/components/Pages/Pages.vue";
import DataSelector from "@/components/DataSelector/DataSelector.vue";
</script>

<template>
  <div class="pagination-container">
    <Pages />

    <DataSelector />
  </div>
</template>

<style scoped>
.pagination-container {
  display: flex;
  justify-content: space-between;
}
</style>