import { ref } from 'vue';
import { defineStore } from 'pinia';
import type {IDate, TSelectItem} from "@/types/types.ts";

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

    const educationCategory = ref<string>('Все виды');
    const institutionStatus = ref<string>('Все статусы');

    const filterInputValue = ref<string>('');

    const isEduTypeFilterOpened = ref<boolean>(false);
    const isStatusFilterOpened = ref<boolean>(false);
    const isFederalDistrictFilterOpened = ref<boolean>(false);
    const isRegionRegionsFilterOpened = ref<boolean>(false);

    const selectedFederalDistrict = ref({
        federal_district_id: -1,
        name: 'Все Фед. округа',
    })

    const selectedRegion = ref({
        region_id: -1,
        name: 'Все регионы'
    })

    const toggleIsRegionsFilterOpened = () => {
        isRegionRegionsFilterOpened.value = !isRegionRegionsFilterOpened.value;
    }
    const toggleIsFederalDistrictFilterOpened = () => {
        isFederalDistrictFilterOpened.value = !isFederalDistrictFilterOpened.value;
    }
    const toggleIsStatusFilterOpened = () => {
        isStatusFilterOpened.value = !isStatusFilterOpened.value;
    }
    const toggleIsEduTypeFilterOpened = () => {
        isEduTypeFilterOpened.value = !isEduTypeFilterOpened.value;
    }
    const setEducationType = ({name}: TSelectItem) => {
        educationCategory.value = name!;
    }
    const setInstitutionStatus = ({name}: TSelectItem) => {
        institutionStatus.value = name!;
    }
    const setDateFrom = (date: IDate) => {
        filterDateFrom.value = date;
    }
    const setDateTo = (date: IDate) => {
        filterDateTo.value = date;
    }
    const setSelectedFederalDistrict = ({id, name}: TSelectItem) => {
        selectedFederalDistrict.value = {
            federal_district_id: id!,
            name: name!,
        };
    }

    const setSelectedRegion = ({id, name}: TSelectItem) => {
        selectedRegion.value = {
            region_id: id!,
            name: name!,
        }
    }

    return {
        filterDateFrom,
        filterDateTo,
        educationCategory,
        institutionStatus,
        filterInputValue,
        isEduTypeFilterOpened,
        isStatusFilterOpened,
        isFederalDistrictFilterOpened,
        selectedFederalDistrict,
        isRegionRegionsFilterOpened,
        selectedRegion,
        setSelectedRegion,
        toggleIsRegionsFilterOpened,
        setSelectedFederalDistrict,
        toggleIsFederalDistrictFilterOpened,
        toggleIsStatusFilterOpened,
        toggleIsEduTypeFilterOpened,
        setEducationType,
        setInstitutionStatus,
        setDateFrom,
        setDateTo
    }
})