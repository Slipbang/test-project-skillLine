<script setup lang="ts">
import Filter from "@/components/Filters/Filter/Filter.vue";
import ArrowDownIcon from "@/components/icons/ArrowDownIcon.vue";
import CalendarIcon from "@/components/icons/CalendarIcon.vue";
import {useCalendarStore} from "@/stores/calendar.ts";

import {onMounted, ref} from "vue";
import {storeToRefs} from "pinia";
import {useFiltersStore} from "@/stores/filterStore.ts";
import {defineDateText, filterRegions, handleClickOutside} from "@/utils/utilsFunction.ts";
import {educationCategoriesNames, statuses} from "@/utils/utilsObjects.ts";
import {useFederalDistrictsApiStore} from "@/stores/federalDistrictsApi.ts";
import {useRegionsApiStore} from "@/stores/regionsApi.ts";
import CustomInput from "@/components/CustomInput/CustomInput.vue";

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

const regionFilterInputValue = ref<string>('')

const title = "Выберите диапазон обновления данных об учебном заведении";
</script>

<template>
  <div class="filters">
    <div class="filter-wrapper">
      <Filter
          ref="calendarRef" :title="title"
          @click="calendarStore.toggleCalendarVisibility()"
          :text="filterDateFrom?.year ? `${defineDateText(filterDateFrom)} - ${defineDateText(filterDateTo)}` : title"
          :icon="CalendarIcon"
      />
    </div>
    <div class="filter-wrapper">
      <Filter
          ref="eduLvlRef"
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
          @click="$event.stopPropagation()"
          v-if="isRegionRegionsFilterOpened"
          v-model="regionFilterInputValue"
      />
      <Filter
          ref="regionsRef"
          :mapItems="filterRegions(regions, regionFilterInputValue)"
          :isOpened="isRegionRegionsFilterOpened"
          :text="selectedRegion.name"
          :icon="ArrowDownIcon"
          @click="filterStore.toggleIsRegionsFilterOpened"
          :selectHandler="filterStore.setSelectedRegion"
      />
    </div>
  </div>
</template>

<style scoped lang="scss">
.filters {
  height: 56px;
  display: flex;
  justify-content: space-between;
  gap: 10px;

  .filter-wrapper {
    flex: 1;
    position: relative;

    input {
      box-sizing: border-box;
      width: calc(100% - 10px);
      margin: 1px;
      border: none;
      border-radius: 8px 0 0 0;
      position: absolute;
      z-index: 9998;
    }
  }

  ::-webkit-scrollbar {
    width: 3px;
    height: 3px;
  }

  ::-webkit-scrollbar-thumb {
    background-color: transparent;
    border-radius: 3px;
  }

  ::-webkit-scrollbar-thumb:hover {
    background: #93939B;
  }

  ::-webkit-scrollbar-button:start {
    margin-top: 50px; /* Смещаем вниз */
  }

  * {
    scrollbar-width: thin;
    scrollbar-color: #93939B #f1f1f1;
  }
}
</style>

//:inputValue="regionFilterInputValue"