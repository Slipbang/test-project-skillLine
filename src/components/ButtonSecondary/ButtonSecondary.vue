<script setup lang="ts">
defineProps({
  text: String,
})
</script>

<template>
  <button class="button-secondary">
    {{text}}
  </button>
</template>

<style scoped lang="scss">
.button-secondary {
  display: flex;
  height: 53px;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  margin: 0 12px;
  cursor: pointer;
  font-size: 16px;
  line-height: 21px;
  background-color: transparent;
  transition: background-color 0.3s ease-out, border 0.3s ease-out;
  border: 1px solid #55555C;
}

.button-secondary:hover {
  border: 1px solid #0E0E10
}

.button-secondary:active {
  background-color: #F0F0F7;
}
</style>