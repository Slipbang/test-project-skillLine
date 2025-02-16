<script setup lang="ts">

import ResetIcon from "@/components/icons/ResetIcon.vue";
</script>

<template>
  <button class="reset-button">
    <ResetIcon />
  </button>
</template>

<style scoped lang="scss">
@use "@/assets/mixins";

.reset-button {
  @include mixins.round-button;
}
</style>