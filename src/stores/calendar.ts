import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useCalendarStore = defineStore('calendar', () => {
    const isCalendarShown = ref(false)

    function toggleCalendarVisibility() {
        isCalendarShown.value = !isCalendarShown.value;
    }
    return { isCalendarShown, toggleCalendarVisibility }
})