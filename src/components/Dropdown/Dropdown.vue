<script setup lang="ts">
import DropdownItem from "@/components/Dropdown/DropdownItem/DropdownItem.vue";
import {ref} from "vue";
import {useSchoolsApiStore} from "@/stores/schoolsApi.ts";
import {storeToRefs} from "pinia";
import {handleClickOutside} from "@/utils/utilsFunction.ts";

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
  schoolsApiStore.selectPage(1);
  schoolsApiStore.selectCount(value);
  sortButtonsText(value);
}

handleClickOutside(dropdownRef, isDropdownShown, () => {
  toggleDropdownVisibility();
  selectValueHandler(count.value)
}, ['.dropdown-container-opened', '.dropdown-wrapper'])

</script>

<template>
  <div
      ref="dropdownRef"
      class="dropdown-wrapper"
      @click="toggleDropdownVisibility()"
  >
    <div
        class="dropdown-container"
        :class="isDropdownShown ? 'dropdown-container-opened' : 'dropdown-container'"
    >
      <DropdownItem
          v-for="value of buttonText"
          :value="value"
          :isDropdownOpen="isDropdownShown"
          @click="isDropdownShown && selectValueHandler(value)"
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
  width: 73px;
  max-height: 36px;
  transform: translateY(0);

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
  z-index: 9999;

  &-opened {
    @extend .dropdown-container;

    width: 85px;
    max-height: 196px;
    transform: translateY(-40%);
    background-color: #F1F4FD;
  }
}

.dropdown-container:hover {
  background-color: #F1F4FD;
}
</style>