<script setup lang="ts">

import Dropdown from "@/components/Dropdown/Dropdown.vue";
import {ref} from "vue";
import {onClickOutside} from "@vueuse/core";
import {useDropdownStore} from "@/stores/dropdown.ts";
import {storeToRefs} from "pinia";

const dropdownStore = useDropdownStore();

const dropdownRef = ref<HTMLElement | null>(null);
const {isDropdownShown} = storeToRefs(dropdownStore)

onClickOutside(dropdownRef,(event) => {
  if (isDropdownShown.value) {
    dropdownStore.toggleDropdownVisibility();
  }
});
</script>

<template>
  <div class="selector-container">
    <p>1-8 из 50 записей</p>

    <div class="drop-container">
      <p>Показывать</p>
      <Dropdown
          ref="dropdownRef"
          :isDropdownShown="isDropdownShown"
          @click="dropdownStore.toggleDropdownVisibility()"
      />
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