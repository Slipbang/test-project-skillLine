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
        class="select-month-button"
    >
      <LeftArrowIcon />
    </button>

    <p>{{ months[selectedMonth] }} {{ selectedYear }}</p>

    <button
        @click="calendarStore.increaseMonth()"
        class="select-month-button"
    >
      <RightArrowIcon />
    </button>
  </div>
</template>

<style scoped lang="scss">
@use "@/assets/mixins";
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

  .select-month-button {
    @include mixins.round-button;
  }
}
</style>