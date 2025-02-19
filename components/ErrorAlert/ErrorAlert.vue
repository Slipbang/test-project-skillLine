<script setup lang="ts">

interface Props {
  message: string;
}

defineProps<Props>()
</script>

<template>
<div class="error-alert">
  <p>{{message}}</p>
</div>
</template>

<style scoped lang="scss">
.error-alert {
  width: 100%;
  height: calc(100% - 96px);
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;

  p {
    font-size: 36px;
  }
}
</style>