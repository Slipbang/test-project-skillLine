<script setup lang="ts">
import Filter from "@/components/Filters/Filter/Filter.vue";
import ArrowDownIcon from "@/components/icons/ArrowDownIcon.vue";
import CalendarIcon from "@/components/icons/CalendarIcon.vue";
import {useCalendarStore} from "@/stores/calendar.ts";

import {onClickOutside} from "@vueuse/core";
import {onMounted, ref} from "vue";
import {storeToRefs} from "pinia";
import {useFiltersStore} from "@/stores/filterStore.ts";
import {defineDateText} from "@/utils/utilsFunction.ts";

const divRef = ref<HTMLElement | null>(null);

const calendarStore = useCalendarStore();
const {isCalendarShown, dateTo, dateFrom} = storeToRefs(calendarStore);
const filterStore = useFiltersStore();
const {filterDateFrom, filterDateTo} = storeToRefs(filterStore);

onMounted(() => {
  filterStore.setDateTo(dateTo.value);
  filterStore.setDateFrom(dateFrom.value);
})

onClickOutside(divRef,(event) => {
  const exceptions = [".custom-calendar"];
  const clickedInsideException = exceptions.some(selector =>
      (event.target as HTMLElement).closest(selector)
  );

  if (!clickedInsideException && isCalendarShown.value) {
    calendarStore.toggleCalendarVisibility();
  }
});

</script>

<template>
  <div class="filters">
    <Filter
        ref="divRef"
        @click="calendarStore.toggleCalendarVisibility()"
        :text="`${defineDateText(filterDateFrom)} - ${defineDateText(filterDateTo)}`"
        :icon="CalendarIcon"
    />
    <Filter
        text="Все виды"
        :icon="ArrowDownIcon"
    />
    <Filter
        text="Все статусы"
        :icon="ArrowDownIcon"
    />
  </div>
</template>

<style scoped lang="scss">
.filters {
  height: 56px;
  display: flex;
  justify-content: space-between;
  gap: 10px;
}
</style>