<script setup lang="ts">

</script>

<template>
  <div class="loader">

  </div>
</template>

<style scoped lang="scss">
.loader {
  width: 100%;
  height: 63px;
  box-sizing: border-box;
  border-bottom: 1px solid white;

  background: linear-gradient(90deg, #e0e0e0 25%, #f0f0f0 50%, #e0e0e0 75%);
  background-size: 200% 100%;
  animation: flicker 1.5s infinite linear;
}

@keyframes flicker {
  0% { background-position: -200% 0; }
  100% { background-position: 200% 0; }
}
</style>