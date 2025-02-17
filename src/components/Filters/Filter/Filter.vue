<script setup lang="ts">
import FilterDropdown from "@/components/Filters/FilterDropdown/FilterDropdown.vue";
import type {TSelectItem} from "@/types/types.ts";

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
  min-width: 126px;
  cursor: pointer;
  max-height: 56px;
  border: 1px solid #D3D3DE;
  border-radius: 10px;
  transition: background-color 0.3s ease-out, all 0.3s ease-out;
  z-index: 9997;
  overflow: auto;
  position: absolute;

  .filter-description {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 20px;
    height: 56px;

    p {
      font-size: 16px;
      font-family: 'Gotham Pro', sans-serif;
      font-weight: 400;
      line-height: 21px;
    }
  }

  &-open {
    @extend .filter;
    max-height: 600px;
    transition: all 0.3s ease-out;
  }
}

.filter:hover {
  background-color: #F1F4FD;
}
</style>