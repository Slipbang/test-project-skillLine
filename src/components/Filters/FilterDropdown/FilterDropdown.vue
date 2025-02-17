<script setup lang="ts">
import FilterItem from "@/components/Filters/FilterDropdown/FilterItem/FilterItem.vue";
import type {TSelectItem} from "@/types/types.ts";
import {useXLSXStore} from "@/stores/xlsxStore.ts";
interface Props {
  mapItems?: TSelectItem[],
  isOpened?: boolean,
  selectHandler?: ({name, id}: TSelectItem) => void,
}
defineProps<Props>()

const xlsxStore = useXLSXStore();

const resetUuidsAndSelect = (callback?: ({name, id}: TSelectItem) => void, item?: TSelectItem) => {
  xlsxStore.resetSchoolItemsUuids();
  if (callback && item) {
    callback(item);
  }
};
</script>

<template>
  <div :class="isOpened ? 'filter-list-open' : 'filter-list'">
    <FilterItem
        v-for="item in mapItems"
        :text="item.name!"
        :key="item.id"
        :isOpened="isOpened"
        @click="!!selectHandler && resetUuidsAndSelect(selectHandler, ({name:item.name, id: item.id})) "
    />
  </div>
</template>

<style scoped lang="scss">
.filter-list {
  text-align: center;
  width: 100%;
  display: flex;
  flex-direction: column;
  background-color: white;
  transition: width 0.3s ease-out;
  border-radius: 8px;

  &-open {
    @extend .filter-list;
    padding: 5px;
  }

  .filter-wrapper:has(input) &-open {
    @extend .filter-list;
    margin-top: 56px;
  }
}
</style>