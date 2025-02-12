<script setup lang="ts">
defineProps({
  icon: Object,
})
</script>

<template>
  <button class="swipe-button">
    <component :is="icon"/>
  </button>
</template>

<style scoped>
.swipe-button {
  width: 44px;
  height: 36px;
  border-radius: 8px;
  border: 1px solid #D3D3DE;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: transparent;
  cursor: pointer;
}

.swipe-button:hover {
  background-color:  #F1F4FD;
}
</style>