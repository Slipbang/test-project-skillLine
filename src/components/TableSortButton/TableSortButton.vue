<script setup lang="ts">
import SortIcon from "@/components/icons/SortIcon.vue";

defineProps({
  isAscending: {
    type: Boolean,
    required: false,
    default: undefined,
  }
})
</script>

<template>
  <button class="sort-button">
    <SortIcon
        :class="isAscending ? 'sort-icon-rotate' : 'sort-icon'"
        :strokeDown="isAscending === undefined ? '#93939B' : '#0E0E10'"
    />
  </button>
</template>

<style scoped lang="scss">
@use "@/assets/mixins";

.sort-button {
  @include mixins.round-button;
}

.sort-icon {
  transform: rotateX(0);
  transition: transform 0.3s ease-out;

  &-rotate {
    @extend .sort-icon;
    transform: rotateX(180deg);
  }
}
</style>