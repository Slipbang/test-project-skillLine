<script setup lang="ts">
// import FilterDropdown from "@/components/Filters/FilterDropdown/FilterDropdown.vue";

import type {TSelectItem} from "../../../types/types.ts";
import FilterDropdown from "../FilterDropdown/FilterDropdown.vue";

interface Props {
  text: string;
  icon: Object;
  mapItems?: TSelectItem[];
  isOpened?: boolean;
  selectHandler?: ({name, id}: TSelectItem) => void;
}

defineProps<Props>();
</script>

<template>
  <div :class="isOpened ? 'filter-open' : 'filter'">
    <slot />

    <FilterDropdown
        :mapItems="mapItems"
        v-if="mapItems"
        :isOpened="isOpened"
        :selectHandler="selectHandler"
    />
    <div
        :data-description="text.length > 21 ? 'long' : 'short'"
        class="filter-description"
        v-if="!isOpened"
    >
      <p>{{text}}</p>
      <component :is="icon" />
    </div>

  </div>
</template>

<style scoped lang="scss">
.filter {
  box-sizing: content-box;
  width: 100%;
  cursor: pointer;
  max-height: 56px;
  border: 1px solid #D3D3DE;
  border-radius: 10px;
  transition: background-color 0.3s ease-out, all 0.3s ease-out;
  z-index: 9995;
  overflow: auto;
  position: absolute;

  &-open {
    @extend .filter;
    max-height: 600px;
    transition: all 0.3s ease-out;
    z-index: 9997;
  }
}

.filter:hover {
  background-color: #F1F4FD;
}

.filter-description {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 20px;
  min-height: 56px;

  p {
    font-size: var(--description-font-size);
    font-family: 'Gotham Pro', sans-serif;
    font-weight: 400;
    line-height: 21px;
  }
}
[data-description='long'].filter-description {
  --description-font-size: 12px;
}

[data-description='short'].filter-description {
  --description-font-size: 16px;
}
</style>