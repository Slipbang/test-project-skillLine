<script setup lang="ts">
import {CustomCalendar} from "@/components/CustomCalendar/Month/CustomCalendar.ts";

const days = ["ПН", "ВТ", "СР", "ЧТ", "ПТ", "СБ", "ВС"];

const calendar = new CustomCalendar(new Date());
</script>

<template>
<div class="month-wrapper">
  <div class="days-names-wrapper">
    <div class="days-names" v-for="day in days">{{day}}</div>
  </div>
  <div class="days-nums-wrapper">
    <div v-for="dayNum in calendar.calendarArray">{{dayNum}}</div>
  </div>
</div>
</template>

<style scoped>
.month-wrapper {
  margin: 0 auto;
  border: 1px solid black;
  width: 316px;
  height: 250px;
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
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    flex-wrap: wrap;

    div {
      width: 34px;
      height: 34px;
      margin: 1px;
    }
  }
}
</style>