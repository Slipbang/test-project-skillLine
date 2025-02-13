<script setup lang="ts">

import LeftArrowIcon from "@/components/icons/LeftArrowIcon.vue";
import RightArrowIcon from "@/components/icons/RightArrowIcon.vue";
import {useCalendarStore} from "@/stores/calendar.ts";
import {storeToRefs} from "pinia";
import {months} from "@/utils/utilsObjects.ts";

const calendarStore = useCalendarStore();
const {selectedYear, selectedMonth} = storeToRefs(calendarStore);

</script>

<template>
  <div class="month-selector">
    <button
        @click="calendarStore.decreaseMonth()"
        class="svg-button"
    >
      <LeftArrowIcon />
    </button>

    <p>{{ months[selectedMonth] }} {{ selectedYear }}</p>

    <button
        @click="calendarStore.increaseMonth()"
        class="svg-button"
    >
      <RightArrowIcon />
    </button>
  </div>
</template>

<style scoped lang="scss">
.month-selector {
  display: flex;
  align-items: center;
  justify-content: space-between;

  p {
    font-family: Manrope, sans-serif;
    font-weight: 600;
    font-size: 16px;
    line-height: 24px;
    letter-spacing: 0.3px;
    text-align: center;
  }

  .svg-button {
    border: none;
    background-color: transparent;
    width: 24px;
    height: 24px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 50%;
    cursor: pointer;
  }
  .svg-button:hover {
    background-color: #D3D3DE;
    filter: drop-shadow(1px 1px 3px gray);
  }
  .svg-button:active {
    filter: drop-shadow(1px 1px 1px gray);
  }
}
</style>