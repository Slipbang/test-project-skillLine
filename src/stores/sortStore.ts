import {defineStore} from "pinia";
import {type Ref, ref} from "vue";

export const useSortingStore = defineStore('sorting', () => {
    const regionIsAscending = ref<boolean | undefined>(undefined);
    const nameIsAscending = ref<boolean  | undefined>(undefined);
    const addressIsAscending = ref<boolean | undefined>(undefined);
    const educationLevelIsAscending = ref<boolean | undefined>(undefined);

    const toggleHelper = (ascValue:  Ref<boolean | undefined, boolean | undefined>) => {
        if (ascValue.value === undefined) {
            ascValue.value = true;
        } else if (ascValue.value) {
            ascValue.value = false;
        } else {
            ascValue.value = undefined;
        }
    }

    const toggleRegionAscending = () => {
        nameIsAscending.value = undefined;
        addressIsAscending.value = undefined;
        educationLevelIsAscending.value = undefined;
        toggleHelper(regionIsAscending)
    }
    const toggleNameAscending = () => {
        addressIsAscending.value = undefined;
        educationLevelIsAscending.value = undefined;
        regionIsAscending.value= undefined;
        toggleHelper(nameIsAscending)
    }
    const toggleAddressAscending = () => {
        educationLevelIsAscending.value = undefined;
        regionIsAscending.value = undefined;
        nameIsAscending.value = undefined;
        toggleHelper(addressIsAscending)
    }
    const toggleEducationLevelAscending = () => {
        regionIsAscending.value = undefined;
        nameIsAscending.value = undefined;
        addressIsAscending.value = undefined;
        toggleHelper(educationLevelIsAscending)
    }

    return {
        regionIsAscending,
        nameIsAscending,
        addressIsAscending,
        educationLevelIsAscending,
        toggleRegionAscending,
        toggleNameAscending,
        toggleAddressAscending,
        toggleEducationLevelAscending,
    }

})
