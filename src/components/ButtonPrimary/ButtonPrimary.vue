<script setup lang="ts">
defineProps({
  text: String,
})
</script>

<template>
  <button class="button-primary">
    {{text}}
  </button>
</template>

<style scoped lang="scss">
.button-primary {
  display: flex;
  height: 53px;
  align-items: center;
  justify-content: center;
  background-color: #0E0E10;
  color: white;
  border: none;
  border-radius: 10px;
  margin: 0 12px;
  cursor: pointer;
  font-size: 16px;
  line-height: 21px;
  transition: background-color 0.3s ease-out, color 0.3s ease-out;
}

.button-primary:hover {
  background-color: #24C14E;
  color: #0E0E10;
}

.button-primary:active {
  background-color: #16B240;
  color: #0E0E10;
}

</style>