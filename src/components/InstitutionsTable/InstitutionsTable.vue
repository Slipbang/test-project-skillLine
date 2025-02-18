<script setup lang="ts">

import Filters from "@/components/Filters/Filters.vue";
import Table from "@/components/Table/Table.vue";
import DataSelector from "@/components/DataSelector/DataSelector.vue";

import CustomCalendar from "@/components/CustomCalendar/CustomCalendar.vue";
import ButtonAccent from "@/components/ButtonAccent/ButtonAccent.vue";

import { storeToRefs } from "pinia";
import {useCalendarStore} from "@/stores/calendar.ts";
import {useFiltersStore} from "@/stores/filterStore.ts";
import CustomInput from "@/components/CustomInput/CustomInput.vue";
import {useXLSXStore} from "@/stores/xlsxStore.ts";
import PaginationButtons from "@/components/Pagination/PaginationButtons.vue";
import ContentLoader from "@/components/ContentLoader/ContentLoader.vue";
import {useSchoolsApiStore} from "@/stores/schoolsApi.ts";
import ErrorAlert from "@/components/ErrorAlert/ErrorAlert.vue";

const calendarStore = useCalendarStore();
const {isCalendarShown} = storeToRefs(calendarStore);
const filterStore = useFiltersStore();
const {filterInputValue} = storeToRefs(filterStore);
const schoolApiStore = useSchoolsApiStore();
const {loading, error} = storeToRefs(schoolApiStore);

const xlsxStore = useXLSXStore();
</script>

<template>
 <div class="stack">
   <div class="calendar">
     <CustomCalendar
         v-if="isCalendarShown"
     />
   </div>

   <div class="block">

     <div class="cont">
       <h4>Таблица учреждений</h4>

       <div class="controls">
         <CustomInput
             text="Фильтрация учебных заведений по названию"
             v-model="filterInputValue"
             @input="xlsxStore.resetSchoolItemsUuids()"
         />
         <ButtonAccent text="Скачать" />
       </div>
     </div>

     <div class="filters">
       <Filters />
     </div>

     <div class="table-wrapper">
       <Table />
       <ContentLoader
           v-if="loading"
           v-for="(_, idx) in Array.from({ length: 8 })"
           :key="idx"
       />
       <ErrorAlert
           v-if="error"
           :message="!!error ? error : 'Ошибка запроса'"
       />
     </div>

     <div class="pagination">
       <PaginationButtons />

       <DataSelector />
     </div>
   </div>

 </div>
</template>

<style scoped lang="scss">

@use '@/assets/mixins';
.stack {
  //min-height: 932px;
  min-height: 100vh;
  background-color: #F1F4FD;
  width: 100%;
  padding: 48px;
  transition: padding 0.2s ease-out;
  @include mixins.scroll-style;
}
.calendar {
  position: absolute;
  top: 520px;
  left: 56px;
  z-index: 9999;
}

.block {
  //min-height: 836px;
  min-height: calc(100vh - 96px);
  border-radius: 16px;
  background-color: #FFFFFF;
  padding: 24px;
}

.cont {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  min-height: 56px;
  align-items: center;
  gap: 15px;
  width: 100%;

  h4 {
    font-weight: 700;
    font-size: 32px;
    line-height:  38px;
  }
}
.controls {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 20px;
}

.filters {
  margin-top: 20px;
}

.table-wrapper {
  margin-top: 20px;
  height: calc(100vh - 366px);
  //height: 568px;
  overflow: auto;
}

.pagination {
  margin-top: 25px;
  gap: 15px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}

@media (max-width: 992px) {
  .stack {
    padding: 12px;
  }
  .calendar {
    left: 6px;
  }
  .cont {
    justify-content: center;
    h4 {
      text-align: center;
    }
  }

  .controls {
    width: 100%;
    justify-content: space-between;
  }
}

@media (max-width: 630px) {
  .stack {
    padding: 6px;
  }
  .controls {
    input, button {
      width: 100%;
    }
  }
}

@media (max-height: 750px) {
  .table-wrapper {
    height: 568px;
  }
}
</style>
