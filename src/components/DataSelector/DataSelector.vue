<script setup lang="ts">
import Dropdown from "@/components/Dropdown/Dropdown.vue";

</script>

<template>
  <div class="selector-container">
    <p>1-8 из 50 записей</p>

    <div class="drop-container">
      <p>Показывать</p>
      <Dropdown />
    </div>
  </div>
</template>

<style scoped lang="scss">
.selector-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 275px;
  height: 36px;

  p {
    font-size: 12px;
    color: #687588;
  }

  .drop-container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 158px;
  }
}
</style>