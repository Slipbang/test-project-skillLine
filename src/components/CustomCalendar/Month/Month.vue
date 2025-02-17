<script setup lang="ts">
import {comparisonParams, days} from "@/utils/utilsObjects.ts";
import {useCalendarStore} from "@/stores/calendar.ts";
import {storeToRefs} from "pinia";
import {defineDayClass, equalityTest} from "@/utils/utilsFunction.ts";
import {ref} from "vue";
import type {IDayItem} from "@/types/types.ts";

const calendarStore = useCalendarStore();
const {dateTo, dateFrom, calendar} = storeToRefs(calendarStore);

const isChangingDateFromAvailable = ref(false);
const isChangingDateToAvailable = ref(false);

const toggleMouseEnterHandler = (date: IDayItem) => {
  if (isChangingDateFromAvailable.value || isChangingDateToAvailable.value) {
    isChangingDateToAvailable.value = false;
    isChangingDateFromAvailable.value = false;
    return;
  }

  const targetDate = {
    dayNum: date.dayNum,
    month: date.month,
    year: date.year,
  }

  if (!dateTo.value.year) {
    calendarStore.setDateTo(targetDate);
    isChangingDateFromAvailable.value = true;
    return;
  }

  if (equalityTest(date, dateFrom.value, comparisonParams.EQUAL)) {
    isChangingDateFromAvailable.value = !isChangingDateFromAvailable.value;
  } else if (equalityTest(date, dateTo.value, comparisonParams.EQUAL)) {
    isChangingDateToAvailable.value = !isChangingDateToAvailable.value;
  }
}

const movePointerHandler = (date: IDayItem) => {
  if (
      (!isChangingDateToAvailable.value && !isChangingDateFromAvailable.value)
      || (isChangingDateToAvailable.value && (equalityTest(date, dateFrom.value, comparisonParams.LE)))
      || (isChangingDateFromAvailable.value && (equalityTest(date, dateTo.value, comparisonParams.GE)))
  ) return;

  const targetDate = {
    dayNum: date.dayNum,
    month: date.month,
    year: date.year,
  }

  if (isChangingDateToAvailable.value) {
    calendarStore.setDateTo(targetDate);
  } else if (isChangingDateFromAvailable.value) {
    calendarStore.setDateFrom(targetDate);
  }
}

</script>

<template>
  <div class="month-wrapper">
    <div class="days-names-wrapper">
      <div class="days-names" v-for="day in days">{{ day }}</div>
    </div>
    <div class="days-nums-wrapper">
      <div
          @click="calendarStore.decreaseMonth()"
          class="prev"
          v-for="dayData in calendar.calendarArray.prevMonthDays"
          :class="defineDayClass(dayData, dateFrom, dateTo)"
          :key="dayData.dayNum"
      >
        {{ dayData.dayNum }}
      </div>
      <div
          class="current"
          :class="defineDayClass(dayData, dateFrom, dateTo)"
          v-for="dayData in calendar.calendarArray.currMonthDays"
          @click="toggleMouseEnterHandler(dayData)"
          @mouseenter="movePointerHandler(dayData)"
          :key="dayData.dayNum"
      >
        {{ dayData.dayNum }}
      </div>
      <div
          @click="calendarStore.increaseMonth()"
          class="next"
          v-for="dayData in calendar.calendarArray.nextMonthDays"
          :class="defineDayClass(dayData, dateFrom, dateTo)"
          :key="dayData.dayNum"
      >
        {{ dayData.dayNum }}
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.month-wrapper {
  margin: 0 auto;
  width: 316px;
  justify-content: space-between;

  .days-names-wrapper {
    display: flex;
    align-items: center;
    justify-content: space-between;

    .days-names {
      width: 34px;
      height: 34px;
      display: flex;
      align-items: center;
      justify-content: center;
      color: #93939B;
      font-size: 14px;
      line-height: 18px;
    }
  }

  .days-nums-wrapper {
    margin-top: 10px;
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    gap: 8px;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    flex-wrap: wrap;

    div {
      width: 34px;
      height: 34px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 14px;
      font-weight: 400;
      line-height: 18px;
      cursor: pointer;
    }

    div:hover {
      background-color: #16B240;
    }

    div:active {
      background-color: #33D35E;
    }

    .prev, .next {
      color: #93939B;
    }

    .current {
      color: #0E0E10;
    }

    .selected {
      background-color: #C3FCD2;

      &-center {
        @extend .selected;
        box-shadow:
            -7px 0 0 0 #C3FCD2,
            7px 0 0 0 #C3FCD2;
      }

      &-first {
        @extend .selected;
        box-shadow: 7px 0 0 0 #C3FCD2;
      }

      &-last {
        @extend .selected;
        box-shadow: -7px 0 0 0 #C3FCD2;
      }
    }

    .selected-primary {
      background-color: #33D35E;

      &-start {
        @extend .selected-primary;
        box-shadow: 7px 0 0 0 #C3FCD2;
      }

      &-end {
        @extend .selected-primary;
        box-shadow: -7px 0 0 0 #C3FCD2;
      }
    }
  }
}
</style>