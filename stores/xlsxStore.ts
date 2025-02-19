import { ref } from 'vue'
import { defineStore } from 'pinia'
import type {ISchoolsItem} from "../types/types.ts";

export const useXLSXStore = defineStore('xlsx', () => {
    const schoolItemsUuids = ref<string[]>([]);

    const toggleUuid = (uuid: string) => {
        if (!schoolItemsUuids.value.includes(uuid)) {
            schoolItemsUuids.value.push(uuid);
        } else {
            const uuidIdx = schoolItemsUuids.value.indexOf(uuid);
            schoolItemsUuids.value.splice(uuidIdx, 1);
        }
    }
    const resetSchoolItemsUuids = () => {
        schoolItemsUuids.value = [];
    }

    const globalRemovalOrAddition = (schoolItems: ISchoolsItem[]) => {
        if (schoolItemsUuids.value.length > 0) {
            schoolItemsUuids.value = [];
            return;
        }

        schoolItems.forEach((schoolItem: ISchoolsItem) => {
            schoolItemsUuids.value.push(schoolItem.uuid)
        })
    }

    const filterByUuids = (schoolItems: ISchoolsItem[]) => {
        return schoolItems.filter(item => {
            return schoolItemsUuids.value.includes(item.uuid);
        })
    }

    return { schoolItemsUuids, toggleUuid, globalRemovalOrAddition, resetSchoolItemsUuids, filterByUuids }
})