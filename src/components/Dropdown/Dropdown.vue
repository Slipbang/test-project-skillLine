<script setup lang="ts">
import DropdownItem from "@/components/Dropdown/DropdownItem/DropdownItem.vue";
import {ref} from "vue";
import {onClickOutside} from "@vueuse/core";
import {useSchoolsApiStore} from "@/stores/schoolsApi.ts";
import {storeToRefs} from "pinia";

const schoolsApiStore = useSchoolsApiStore();
const {count} = storeToRefs(schoolsApiStore);
const dropdownRef = ref<HTMLElement | null>(null);
const isDropdownShown = ref(false);
const buttonText = ref<number[]>([10, 20, 30, 40, 50]);

function toggleDropdownVisibility() {
  if (!isDropdownShown.value) {
    buttonText.value.sort((a, b) => a - b)
  }
  isDropdownShown.value = !isDropdownShown.value;
}

const sortButtonsText = (value: number) => {
  const temp = buttonText.value.filter(val => val !== value);
  buttonText.value = [value, ...temp];
}

const selectValueHandler = (value: number) => {
  schoolsApiStore.selectCount(value);
  sortButtonsText(value);
}

onClickOutside(dropdownRef,(event) => {
  if (isDropdownShown.value) {
    sortButtonsText(count.value);
    toggleDropdownVisibility();
  }
});
</script>

<template>
  <div
      ref="dropdownRef"
      class="dropdown-wrapper"
      @click="toggleDropdownVisibility()"
  >
    <div
        class="dropdown-container"
        :class="isDropdownShown && 'dropdown-opened'"
        :data-active="isDropdownShown ? 'active' : 'inactive'"
    >
      <DropdownItem
          v-for="value of buttonText"
          :value="value"
          :isDropdownOpen="isDropdownShown"
          @click="selectValueHandler(value)"
      />
    </div>
  </div>
</template>

<style scoped lang="scss">
.dropdown-wrapper {
  width: 85px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.dropdown-container {
  width: var(--container-width);
  max-height: var(--container-height);

  padding: var(--dd-padding);
  margin-left: 4px;
  background-color: transparent;
  display: grid;
  gap: 1px;
  grid-template-columns: 5fr;
  grid-template-rows: 1fr;
  align-items: center;
  justify-items: center;
  box-shadow: 0 5px 40px 0 #0000001A;
  transition: max-height 0.3s ease-out, transform 0.3s ease-out;
  border-radius: 7px 7px;
  overflow: hidden;
  transform: var(--dd-transform);
}

.dropdown-container:hover {
  background-color: #F1F4FD;
}

.dropdown-opened {
  background-color: #F1F4FD;
}

[data-active='active'] {
  --container-width: 85px;
  --container-height: 196px;
  --dd-transform: translateY(-40%);
  --dd-padding: 4px;
}

[data-active='inactive'] {
  --container-width: 73px;
  --container-height: 36px;
  --dd-transform: translateY(0);
  --dd-padding: 0;
}
</style>