<script setup lang="ts">
// import ButtonAccent from "@/components/ButtonAccent/ButtonAccent.vue";
// import ButtonPrimary from "@/components/ButtonPrimary/ButtonPrimary.vue";
// import ButtonSecondary from "@/components/ButtonSecondary/ButtonSecondary.vue";
// import ContentLoader from "@/components/ContentLoader/ContentLoader.vue";
// import CustomCheckbox from "@/components/CustomCheckbox/CustomCheckbox.vue";
// import Filter from "@/components/Filters/Filter/Filter.vue";
// import ArrowDownIcon from "@/components/icons/ArrowDownIcon.vue";
// import SwipePageButton from "@/components/SwipePageButton/SwipePageButton.vue";
// import LeftArrowIcon from "@/components/icons/LeftArrowIcon.vue";
// import RightArrowIcon from "@/components/icons/RightArrowIcon.vue";
// import SelectPageButton from "@/components/SelectPageButton/SelectPageButton.vue";
// import TableSortButton from "@/components/TableSortButton/TableSortButton.vue";
// import CustomResetButton from "@/components/CustomResetButton/CustomResetButton.vue";
// import FilterDropdown from "@/components/Filters/FilterDropdown/FilterDropdown.vue";
// import type {TSelectItem} from "../../types/types.ts";
// import CustomInput from "@/components/CustomInput/CustomInput.vue";
// import CustomCalendar from "@/components/CustomCalendar/CustomCalendar.vue";

import {TSelectItem} from "../../types/types";
import ButtonAccent from "../ButtonAccent/ButtonAccent.vue";
import ButtonPrimary from "../ButtonPrimary/ButtonPrimary.vue";
import ButtonSecondary from "../ButtonSecondary/ButtonSecondary.vue";
import ContentLoader from "../ContentLoader/ContentLoader.vue";
import CustomCheckbox from "../CustomCheckbox/CustomCheckbox.vue";
import SwipePageButton from "../SwipePageButton/SwipePageButton.vue";
import LeftArrowIcon from "../icons/LeftArrowIcon.vue";
import RightArrowIcon from "../icons/RightArrowIcon.vue";
import ArrowDownIcon from "../icons/ArrowDownIcon.vue";
import SelectPageButton from "../SelectPageButton/SelectPageButton.vue";
import TableSortButton from "../TableSortButton/TableSortButton.vue";
import CustomResetButton from "../CustomResetButton/CustomResetButton.vue";
import CustomInput from "../CustomInput/CustomInput.vue";
import Filter from "../Filters/Filter/Filter.vue";
import CustomCalendar from "../CustomCalendar/CustomCalendar.vue";

const mockDropdown: TSelectItem[] = [
  {name: 'mock item', id: 0},
  {name: 'mock item', id: 1},
  {name: 'mock item', id: 2},
]
</script>

<template>
<div class="ui-kit">
  <ButtonAccent text="Button Accent" />
  <ButtonPrimary :isDisabled="false" text="Button Primary" />
  <ButtonPrimary :isDisabled="true" text="Button Primary Disabled" />
  <ButtonSecondary text="Button Secondary" />
  <ContentLoader />
  <CustomCheckbox fill-color="#D3D3DE" :checked="false" />
  <CustomCheckbox fill-color="#1B1B1F" :checked="false" />
  <CustomCheckbox fill-color="#1B1B1F" :checked="true" />
  <SwipePageButton :icon="LeftArrowIcon" />
  <SwipePageButton :icon="RightArrowIcon" />
  <SelectPageButton :numberOfPages="1" :isActive="true" />
  <SelectPageButton :numberOfPages="1" :isActive="false" />
  <TableSortButton />
  <CustomResetButton />
  <CustomInput text="Custom Input" />
  <Filter
      class="filter-ui-kit"
      :icon="ArrowDownIcon" text="mock item"
      :mapItems="mockDropdown"
      :isOpened="false"
      :selectHandler="() => {}"
  />
  <Filter
      class="filter-ui-kit"
      :icon="ArrowDownIcon" text="mock item"
      :mapItems="mockDropdown"
      :isOpened="true"
      :selectHandler="() => {}"
  />
  <CustomCalendar />
</div>
</template>

<style scoped lang="scss">
.ui-kit {
  box-sizing: content-box;
  align-items: center;
  display: flex;
  flex-wrap: wrap;

  gap: 50px;
  padding: 50px;
}

.filter-ui-kit {
  position: static;
}
</style>