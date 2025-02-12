<script setup lang="ts">
import Filter from "@/components/Filter/Filter.vue";
import ArrowDownIcon from "@/assets/ArrowDownIcon.vue";
import CalendarIcon from "@/assets/CalendarIcon.vue";
</script>

<template>
  <div class="filters">
    <Filter
        text="09 января 2024 - 15 января 2024"
        :icon="CalendarIcon"
    />
    <Filter
        text="Все виды"
        :icon="ArrowDownIcon"
    />
    <Filter
        text="Все статусы"
        :icon="ArrowDownIcon"
    />
  </div>
</template>

<style scoped>
.filters {
  height: 56px;
  display: flex;
  justify-content: space-between;
  gap: 10px;
}
</style>