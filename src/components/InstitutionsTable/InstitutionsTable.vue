<script setup lang="ts">
import Input from "@/components/Input/Input.vue";
import Filters from "@/components/Filters/Filters.vue";
import Table from "@/components/Table/Table.vue";
import {jsonToCSV} from "@/utils/utilsFunction.ts";
import DataSelector from "@/components/DataSelector/DataSelector.vue";
import PagesButtons from "@/components/Pagination/PagesButtons.vue";

import CustomCalendar from "@/components/CustomCalendar/CustomCalendar.vue";
import ButtonAccent from "@/components/ButtonAccent/ButtonAccent.vue";

import { storeToRefs } from "pinia";
import {useCalendarStore} from "@/stores/calendar.ts";

const calendarStore = useCalendarStore();
const {isCalendarShown} = storeToRefs(calendarStore);
//jsonToCSV(jsonData, headersMap);

</script>

<template>
 <div class="stack">
   <div  class="calendar">
     <CustomCalendar
         v-if="isCalendarShown"
     />
   </div>

   <div class="block">

     <div class="cont">
       <h4>Таблица учреждений</h4>

       <div class="controls">
         <Input />
         <ButtonAccent text="Скачать" />
       </div>
     </div>

     <div class="filters">
       <Filters />
     </div>

     <div class="table">
       <Table />
     </div>

     <div class="pagination">
       <PagesButtons />

       <DataSelector />
     </div>
   </div>

 </div>
</template>

<style scoped lang="scss">
.stack {
  min-height: 932px;
  background-color: #F1F4FD;
  width: 100%;
  padding: 48px;

  .calendar {
    position: absolute;
    top: 520px;
    left: 275px;
  }

  .block {
    min-height: 836px;
    border-radius: 16px;
    background-color: #FFFFFF;
    padding: 24px;

    .cont {
      display: flex;
      justify-content: space-between;
      height: 56px;
      align-items: center;

      h4 {
        font-weight: 700;
        font-size: 32px;
        line-height:  38px;
      }

      .controls {
        display: flex;
        align-items: center;

        input {
          margin-right: 24px;
        }
      }
    }

    .filters {
      margin-top: 20px;
    }

    .table {
      margin-top: 20px;
    }

    .pagination {
      margin-top: 25px;
      display: flex;
      justify-content: space-between;
    }
  }
}
</style>

//background-color: #F1F4FD;