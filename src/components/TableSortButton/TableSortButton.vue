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
.sort-button {
  width: 26px;
  height: 26px;
  background-color: transparent;
  border: none;
  border-radius: 50%;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
}
.sort-button:hover {
  background-color: #D3D3DE;
  filter: drop-shadow(1px 1px 3px gray);
}
.sort-button:active {
  filter: drop-shadow(1px 1px 1px gray);
}

.sort-icon {
  transform: rotateX(0);
  transition: transform 0.3s ease-out;

  &-rotate {
    transform: rotateX(180deg);
    transition: transform 0.3s ease-out;
  }
}
</style>