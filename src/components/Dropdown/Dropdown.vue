<script setup lang="ts">
import DropdownItem from "@/components/DropdownItem/DropdownItem.vue";
import {useDropdownStore} from "@/stores/dropdown.ts";
import {storeToRefs} from "pinia";

defineProps({
  isDropdownShown: Boolean,
})

const dropdownStore = useDropdownStore();
const {buttonText} = storeToRefs(dropdownStore)
</script>

<template>
  <div class="dropdown-wrapper">
    <div
        class="dropdown-container"
        :class="isDropdownShown && 'dropdown-opened'"
        :data-active="isDropdownShown ? 'active' : 'inactive'"
    >
      <DropdownItem
          v-for="value of buttonText"
          :value="value"
          :isDropdownOpen="isDropdownShown"
          @click="dropdownStore.selectValueHandler(value)"
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