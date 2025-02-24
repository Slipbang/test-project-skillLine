<script setup lang="ts">
// import Filter from "@/components/Filters/Filter/Filter.vue";
// import ArrowDownIcon from "@/components/icons/ArrowDownIcon.vue";
// import CalendarIcon from "@/components/icons/CalendarIcon.vue";
// import {useCalendarStore} from "../../stores/calendar.ts";
// import {useFiltersStore} from "../../stores/filterStore.ts";
// import {defineDateText, filterRegions, handleClickOutside} from "../../utils/utilsFunction.ts";
// import {educationCategoriesNames, statuses} from "../../utils/utilsObjects.ts";
// import {useFederalDistrictsApiStore} from "../../stores/federalDistrictsApi.ts";
// import {useRegionsApiStore} from "../../stores/regionsApi.ts";
// import CustomInput from "@/components/CustomInput/CustomInput.vue";

import {onMounted, ref} from "vue";
import {storeToRefs} from "pinia";
import type {TSelectItem} from "../../types/types.ts";
import {useCalendarStore} from "../../stores/calendar";
import {useFiltersStore} from "../../stores/filterStore";
import {defineDateText, filterRegions, handleClickOutside} from "../../utils/utilsFunction";
import {useFederalDistrictsApiStore} from "../../stores/federalDistrictsApi";
import {useRegionsApiStore} from "../../stores/regionsApi";
import CalendarIcon from "../icons/CalendarIcon.vue";
import {educationCategoriesNames, statuses} from "../../utils/utilsObjects";
import ArrowDownIcon from "../icons/ArrowDownIcon.vue";
import Filter from "./Filter/Filter.vue";
import CustomInput from "../CustomInput/CustomInput.vue";

const calendarRef = ref<HTMLElement | null>(null);
const eduLvlRef = ref<HTMLElement | null>(null);
const statusRef = ref<HTMLElement | null>(null);
const federalDistrictRef = ref<HTMLElement | null>(null);
const regionsRef = ref<HTMLElement | null>(null);

const calendarStore = useCalendarStore();
const {isCalendarShown, dateTo, dateFrom} = storeToRefs(calendarStore);

const filterStore = useFiltersStore();
const {
  filterDateFrom,
  filterDateTo,
  isEduTypeFilterOpened,
  isStatusFilterOpened,
  isFederalDistrictFilterOpened,
  isRegionRegionsFilterOpened,
  institutionStatus,
  educationCategory,
  selectedFederalDistrict,
  selectedRegion,
} = storeToRefs(filterStore);

onMounted(() => {
  filterStore.setDateTo(dateTo.value);
  filterStore.setDateFrom(dateFrom.value);
  federalDistrictApiStore.fetchData();
  regionsApiStore.fetchData();
})

handleClickOutside(calendarRef, isCalendarShown, () => {
  calendarStore.setDateTo(filterDateTo.value);
  calendarStore.setDateFrom(filterDateFrom.value);
  calendarStore.toggleCalendarVisibility();
}, ['.custom-calendar']);
handleClickOutside(eduLvlRef, isEduTypeFilterOpened, () => {
  filterStore.toggleIsEduTypeFilterOpened();
}, ['.filter-open']);
handleClickOutside(statusRef, isStatusFilterOpened, () => {
  filterStore.toggleIsStatusFilterOpened();
}, ['.filter-open']);
handleClickOutside(federalDistrictRef, isFederalDistrictFilterOpened, () => {
  filterStore.toggleIsFederalDistrictFilterOpened();
}, ['.filter-open'])
handleClickOutside(regionsRef, isRegionRegionsFilterOpened, () => {
  filterStore.toggleIsRegionsFilterOpened();
}, ['.filter-open', '.custom-input'])

const federalDistrictApiStore = useFederalDistrictsApiStore();
const {
  federalDistricts,
} = storeToRefs(federalDistrictApiStore);

const regionsApiStore = useRegionsApiStore();
const {
  regions,
} = storeToRefs(regionsApiStore);

const regionFilterInputValue = ref<string>('');

const setSelectedRegionHandler = (region: TSelectItem) => {
  regionFilterInputValue.value = ('');
  filterStore.setSelectedRegion(region);
}
</script>

<template>
  <div class="filters">
    <div class="filter-wrapper">
      <Filter
          ref="calendarRef"
          title="Выберите диапазон обновления данных об учебном заведении"
          @click="calendarStore.toggleCalendarVisibility()"
          :text="filterDateFrom?.year ? `${defineDateText(filterDateFrom)} - ${defineDateText(filterDateTo)}` : 'Все даты'"
          :icon="CalendarIcon"
      />
    </div>
    <div class="filter-wrapper">
      <Filter
          ref="eduLvlRef"
          title="Выберите тип учебного заведения"
          :mapItems="educationCategoriesNames"
          :text="educationCategory"
          :icon="ArrowDownIcon"
          :isOpened="isEduTypeFilterOpened"
          @click="filterStore.toggleIsEduTypeFilterOpened()"
          :selectHandler='filterStore.setEducationType'
      />
    </div>

    <div class="filter-wrapper">
      <Filter
          title="выберите статус учебного заведения"
          ref="statusRef"
          :mapItems="statuses"
          :isOpened="isStatusFilterOpened"
          :text="institutionStatus"
          :icon="ArrowDownIcon"
          @click="filterStore.toggleIsStatusFilterOpened"
          :selectHandler="filterStore.setInstitutionStatus"
      />
    </div>

    <div class="filter-wrapper">
      <Filter
          title="Выберите федеральный округ"
          ref="federalDistrictRef"
          :mapItems="federalDistricts"
          :isOpened="isFederalDistrictFilterOpened"
          :text="selectedFederalDistrict.name"
          :icon="ArrowDownIcon"
          @click="filterStore.toggleIsFederalDistrictFilterOpened"
          :selectHandler="filterStore.setSelectedFederalDistrict"
      />
    </div>

    <div class="filter-wrapper">
      <CustomInput
          text="Фильтрация регионов"
          @click="$event.stopPropagation()"
          v-if="isRegionRegionsFilterOpened"
          v-model="regionFilterInputValue"
      />
      <Filter
          title="Выберите регион"
          ref="regionsRef"
          :mapItems="filterRegions(regions, regionFilterInputValue)"
          :isOpened="isRegionRegionsFilterOpened"
          :text="selectedRegion.name"
          :icon="ArrowDownIcon"
          @click="filterStore.toggleIsRegionsFilterOpened"
          :selectHandler="setSelectedRegionHandler"
      />
    </div>
  </div>
</template>

<style scoped lang="scss">
@use "assets/mixins.scss";

.filters {
  min-height: 56px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: 10px;
  z-index: 9993;
  @include mixins.scroll-style;

}

.filter-wrapper {
  flex: 1;
  width: 100%;
  height: 56px;
  min-width: 156px;
  position: relative;
  z-index: 9995;
  flex-wrap: wrap;

  svg {
    min-width: 16px;
    min-height: 16px;
  }

  input {
    box-sizing: border-box;
    width: calc(100% - 10px);
    margin: 1px;
    border: none;
    border-radius: 8px 0 0 0;
    position: absolute;
    z-index: 9999;
  }
}

.filter-wrapper:has(p) {
  z-index: 9994;
  transition: z-index 0.6s ease-out;
}

.filter-wrapper:not(:has(p)){
  z-index: 9997;
}
</style>