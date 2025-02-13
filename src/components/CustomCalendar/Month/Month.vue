<script setup lang="ts">
import {CustomCalendar} from "@/components/CustomCalendar/Month/CustomCalendar.ts";
import {days} from "@/utils/utilsObjects.ts";
import {defineDayClass} from "@/utils/utilsFunction.ts";

const calendar = new CustomCalendar(new Date());

</script>

<template>
  <div class="month-wrapper">
    <div class="days-names-wrapper">
      <div class="days-names" v-for="day in days">{{ day }}</div>
    </div>
    <div class="days-nums-wrapper">
      <div
          class="prev"
          v-for="dayData in calendar.calendarArray.prevMonthDays"
      >
        {{ dayData.dayNum }}
      </div>
      <div
          class="current"
          :class="defineDayClass(dayData.dayNum, dayData.day)"
          v-for="dayData in calendar.calendarArray.currMonthDays"
      >
        {{ dayData.dayNum }}
      </div>
      <div
          class="next"
          v-for="dayData in calendar.calendarArray.nextMonthDays"
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
    }
  }

  .days-nums-wrapper {
    margin-top: 10px;
    display: flex;
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

    .selected-primary-first {
      background-color: #33D35E;
      box-shadow: 7px 0 0 0 #C3FCD2;
    }

    .selected-primary-last {
      background-color: #33D35E;
      box-shadow: -7px 0 0 0 #C3FCD2;
    }
  }
}
</style>