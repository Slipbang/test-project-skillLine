import { ref } from 'vue'
import { defineStore } from 'pinia'
import type {IDate} from "@/types/types.ts";
import {CustomCalendar} from "@/components/CustomCalendar/Month/CustomCalendar.ts";

export const useCalendarStore = defineStore('calendar', () => {
    const isCalendarShown = ref(false);

    const currentDate = new Date();

    const pastDate = new Date(currentDate);
    pastDate.setDate(pastDate.getDate() - 10);

    const dateFrom = ref<IDate>({
        dayNum: pastDate.getDate(),
        month: pastDate.getMonth(),
        year: pastDate.getFullYear(),
    });
    const dateTo = ref<IDate>({
        dayNum: currentDate.getDate(),
        month: currentDate.getMonth(),
        year: currentDate.getFullYear(),
    });

    const calendar = ref<CustomCalendar>(new CustomCalendar(new Date()));

    const selectedMonth = ref<number>(currentDate.getMonth());
    const selectedYear = ref<number>(currentDate.getFullYear());

    const increaseMonth = () => {
        if (selectedMonth.value < 11) {
            selectedMonth.value = selectedMonth.value + 1;
        } else {
            selectedMonth.value = 0;
            selectedYear.value = selectedYear.value + 1;
        }
        calendar.value.currentDate = new Date(selectedYear.value, selectedMonth.value + 1, 0);
    }

    const decreaseMonth = () => {
        if (selectedMonth.value > 0) {
            selectedMonth.value = selectedMonth.value - 1;
        } else {
            selectedMonth.value = 11;
            selectedYear.value = selectedYear.value - 1;
        }
        calendar.value.currentDate = new Date(selectedYear.value, selectedMonth.value + 1, 0);
    }

    const setDateFrom = (date: IDate) => {
        dateFrom.value = date;
    }

    const setDateTo = (date: IDate) => {
        dateTo.value = date;
    }

    function toggleCalendarVisibility() {
        isCalendarShown.value = !isCalendarShown.value;
    }
    return {
        isCalendarShown,
        dateFrom,
        dateTo,
        selectedMonth,
        selectedYear,
        calendar,
        increaseMonth,
        decreaseMonth,
        toggleCalendarVisibility,
        setDateFrom,
        setDateTo
    }
})