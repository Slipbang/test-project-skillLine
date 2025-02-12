<script setup lang="ts">

import Dropdown from "@/components/Dropdown/Dropdown.vue";
import {ref} from "vue";
// Состояние для Dropdown (аналог state в React)
const isDropdownOpen = ref(false);

// Функция для изменения состояния (аналог setState в React)
const toggleDropdown = () => {
  isDropdownOpen.value = !isDropdownOpen.value;
};
</script>

<template>
  <div class="selector-container">
    <p>1-8 из 50 записей</p>

    <div class="drop-container">
      <p>Показывать</p>
      <Dropdown
          :isDropdownOpen="isDropdownOpen"
          @click="toggleDropdown"
      />
    </div>
  </div>
</template>

<style scoped>
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