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

const calendarStore = useCalendarStore();
const {isCalendarShown} = storeToRefs(calendarStore);
const filterStore = useFiltersStore();
const {filterInputValue} = storeToRefs(filterStore);

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
  min-height: 932px;
  background-color: #F1F4FD;
  width: 100%;
  padding: 48px;
}
.calendar {
  position: absolute;
  top: 520px;
  left: 56px;
  z-index: 9999;
}

.block {
  min-height: 836px;
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
  height: 568px;
  overflow: auto;
  @include mixins.scroll-style;
}

.pagination {
  margin-top: 25px;
  gap: 15px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}

@media (max-width: 992px) {
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
  .controls {
    input, button {
      width: 100%;
    }
  }
}
</style>

//background-color: #F1F4FD;