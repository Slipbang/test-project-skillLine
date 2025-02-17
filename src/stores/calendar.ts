import { ref } from 'vue'
import { defineStore } from 'pinia'
import type {IDate} from "@/types/types.ts";
import {CustomCalendar} from "@/utilsClasses/CustomCalendar.ts";

export const useCalendarStore = defineStore('calendar', () => {
    const isCalendarShown = ref(false);

    const initialDate = new Date();

    const pastDate = new Date(initialDate);
    pastDate.setDate(pastDate.getDate() - 10);

    const dateFrom = ref<IDate>({
        dayNum: null,
        month: null,
        year: null,
    });
    const dateTo = ref<IDate>({
        dayNum: null,
        month: null,
        year: null,
    });

    const calendar = ref<CustomCalendar>(new CustomCalendar(new Date()));

    const selectedMonth = ref<number>(initialDate.getMonth());
    const selectedYear = ref<number>(initialDate.getFullYear());

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

    const toggleCalendarVisibility = ()=> {
        isCalendarShown.value = !isCalendarShown.value;
    }

    const resetCalendarDates = () => {
        const resetValue = {
            dayNum: null,
            month: null,
            year: null,
        };
        dateTo.value = {...resetValue};
        dateFrom.value = {...resetValue}
    }

    return {
        isCalendarShown,
        dateFrom,
        dateTo,
        selectedMonth,
        selectedYear,
        calendar,
        resetCalendarDates,
        increaseMonth,
        decreaseMonth,
        toggleCalendarVisibility,
        setDateFrom,
        setDateTo
    }
})