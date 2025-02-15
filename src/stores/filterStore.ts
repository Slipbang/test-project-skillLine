import { ref } from 'vue';
import { defineStore } from 'pinia';
import type {IDate} from "@/types/types.ts";

export const useFiltersStore = defineStore('filters', () => {

    const filterDateFrom = ref<IDate>({
        dayNum: null,
        month: null,
        year: null,
    });
    const filterDateTo = ref<IDate>({
        dayNum: null,
        month: null,
        year: null,
    });

    const educationTypes = ref<string>('');
    const institutionStatus = ref<string>('');

    const filterInputValue = ref<string>('');

    const setEducationType = (type: string) => {
        educationTypes.value = type;
    }
    const setInstitutionStatus = (status: string) => {
        institutionStatus.value = status;
    }

    const setDateFrom = (date: IDate) => {
        filterDateFrom.value = date;
    }
    const setDateTo = (date: IDate) => {
        filterDateTo.value = date;
    }

    return {
        filterDateFrom,
        filterDateTo,
        educationTypes,
        institutionStatus,
        filterInputValue,
        setEducationType,
        setInstitutionStatus,
        setDateFrom,
        setDateTo
    }
})