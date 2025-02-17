<script setup lang="ts">
import ArrowDownIcon from "@/components/icons/ArrowDownIcon.vue";
defineProps({
  value: Number,
  isDropdownOpen: Boolean,
})
</script>

<template>
  <div
      :class="isDropdownOpen ? 'dropdown-item-opened' : 'dropdown-item-closed'"
  >
    {{value}}
    <ArrowDownIcon
        v-if="!isDropdownOpen"
    />
  </div>
</template>

<style scoped lang="scss">
.dropdown-item {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 73px;
  height: 36px;
  border-radius: 8px;
  border: 1px solid transparent;
  transition: background-color 0.3s ease-out, border 0.3s ease-out;
  cursor: pointer;

  &-opened {
    @extend .dropdown-item;
    background-color: #E4E4EE;
  }

  &-closed {
    @extend .dropdown-item;

    border: 1px solid #D3D3DE;
    justify-content: space-between;
    padding: 0 12px;
  }
}
</style>