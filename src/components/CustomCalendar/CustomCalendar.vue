<script setup lang="ts">
import MonthSelector from "@/components/CustomCalendar/MonthSelector/MonthSelector.vue";
import Month from "@/components/CustomCalendar/Month/Month.vue";
import ButtonPrimary from "@/components/ButtonPrimary/ButtonPrimary.vue";
import ButtonSecondary from "@/components/ButtonSecondary/ButtonSecondary.vue";
import {useCalendarStore} from "@/stores/calendar.ts";
import {useFiltersStore} from "@/stores/filterStore.ts";
import {storeToRefs} from "pinia";
import {useXLSXStore} from "@/stores/xlsxStore.ts";
import CustomResetButton from "@/components/CustomResetButton/CustomResetButton.vue";

const calendarStore = useCalendarStore();
const {dateTo, dateFrom} = storeToRefs(calendarStore);

const filterStore = useFiltersStore();
const {filterDateTo, filterDateFrom} = storeToRefs(filterStore);

const xlsxStore = useXLSXStore();

const declineHandler = () => {
  calendarStore.setDateTo(filterDateTo.value);
  calendarStore.setDateFrom(filterDateFrom.value);
  calendarStore.toggleCalendarVisibility();
}

const saveChangesHandler = () => {
  xlsxStore.resetSchoolItemsUuids();
  filterStore.setDateFrom(dateFrom.value);
  filterStore.setDateTo(dateTo.value);
  calendarStore.toggleCalendarVisibility();
}

const resetAllDatesHandler = () => {
  filterStore.resetFilterDates();
  calendarStore.resetCalendarDates();
}

</script>

<template>
  <div class="custom-calendar">
    <div class="calendar-header">
      <h5>Выбрать период</h5>
      <CustomResetButton
          @click="resetAllDatesHandler()"
      />
    </div>

    <hr />

    <div class="month-selector-container">
      <MonthSelector />
    </div>

    <Month />

    <div class="buttons-container">
      <ButtonSecondary
          @click="declineHandler()"
          text="Отмена"
      />
      <ButtonPrimary
          :isDisabled="!dateTo.year || !dateFrom.year"
          @click="saveChangesHandler()"
          text="Сохранить"
      />
    </div>
  </div>
</template>

<style scoped lang="scss">
.custom-calendar {
  width: 364px;
  padding: 11px;
  border-radius: 16px;
  background-color: #F1F4FD;
  box-shadow: 0 5px 40px 0 #0000001A;

  .calendar-header {
    margin: 24px 24px 0;
    display: flex;
    justify-content: space-between;

    h5 {
      font-family: Manrope, sans-serif;
      font-weight: 700;
      font-size: 20px;
      line-height: 28px;
    }
  }

  hr {
    margin: 15px 24px;
    border-top: 1px solid #D3D3DE;
  }

  .month-selector-container {
    margin: 24px 16px;
  }

  .buttons-container {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin: 15px 0;

    button {
      width: 148px;
    }
  }
}
</style>