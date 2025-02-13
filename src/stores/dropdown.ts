import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useDropdownStore = defineStore('dropdown', () => {
    const isDropdownShown = ref(false);
    const selectedValue = ref<number>(10)
    const buttonText = ref<number[]>([10, 20, 30, 40, 50]);

    function toggleDropdownVisibility() {
        if (!isDropdownShown.value) {
            buttonText.value.sort((a, b) => a - b)
        }

        isDropdownShown.value = !isDropdownShown.value;
    }
    const selectValueHandler = (value: number) => {
        selectedValue.value = value;
        const temp = buttonText.value.filter(val => val !== value);
        buttonText.value = [value, ...temp];
    }

    return { isDropdownShown, toggleDropdownVisibility, selectedValue, buttonText, selectValueHandler }
})