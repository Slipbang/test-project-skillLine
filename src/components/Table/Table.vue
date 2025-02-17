<script setup lang="ts">
import CustomCheckbox from "@/components/CustomCheckbox/CustomCheckbox.vue";
import {defineEducationCategories, pipe} from "@/utils/utilsFunction.ts";
import {useSchoolsApiStore} from "@/stores/schoolsApi.ts";
import {computed, onMounted, reactive, watch} from "vue";
import {storeToRefs} from "pinia";
import {useDebounceFn} from "@vueuse/core";
import TableSortButton from "@/components/TableSortButton/TableSortButton.vue";
import {useSortingStore} from "@/stores/sortStore.ts";
import {sortData} from "@/utils/utilsSortFunctions.ts";
import {filterByDate, filterByEduType, filterByNames, filterByStatus} from "@/utils/utilsFilterFunctions.ts";
import {useFiltersStore} from "@/stores/filterStore.ts";
import {useXLSXStore} from "@/stores/xlsxStore.ts";
import type {PipeParams} from "@/types/types.ts";

const schoolsApiStore = useSchoolsApiStore();
const {page, count} = storeToRefs(schoolsApiStore);

const sortingStore = useSortingStore();
const {
  regionIsAscending,
  nameIsAscending,
  addressIsAscending,
  educationLevelIsAscending,
} = storeToRefs(sortingStore);

const filterStore = useFiltersStore();
const {
  filterInputValue,
  filterDateFrom,
  filterDateTo,
  educationCategory,
  institutionStatus,
  selectedFederalDistrict,
  selectedRegion
} = storeToRefs(filterStore);

const xlsxStore = useXLSXStore();
const {schoolItemsUuids} = storeToRefs(xlsxStore);

const fetchDataDebounced = useDebounceFn((page: number, count: number, federal_district_id: number, region_id: number) => {
  schoolsApiStore.fetchData({
    page,
    count,
    federal_district_id,
    region_id,
  });
}, 500);

onMounted(() => {
  schoolsApiStore.fetchData({
    page: page.value,
    count: count.value
  })
})

const {schoolItems} = storeToRefs(schoolsApiStore);

const flags = reactive({
      eduLvlIsAsc: educationLevelIsAscending,
      addressIsAsc: addressIsAscending,
      nameIsAsc: nameIsAscending,
      regionIsAsc: regionIsAscending
})

watch([page, count, selectedFederalDistrict, selectedRegion], ([newPage, newCount, newFederalDistrict, newsSelectedRegion]) => {
  if (!newPage && !newCount && !newFederalDistrict) return;

  fetchDataDebounced(newPage, newCount, newFederalDistrict.federal_district_id, newsSelectedRegion.region_id);
})

const defineCurrentItemsValue = ({schoolItems}: Partial<PipeParams>): Partial<PipeParams> => {
  filterStore.setCurrentSchoolItemValue(schoolItems?.length || 0);

  return {schoolItems}
}

const filteredItems = computed(() =>
    pipe(
        sortData,
        filterByNames,
        filterByDate,
        filterByEduType,
        filterByStatus,
        defineCurrentItemsValue,
    )({
      schoolItems: schoolItems.value,
      flags,
      filterValue: filterInputValue.value,
      filterDateFrom: filterDateFrom.value,
      filterDateTo: filterDateTo.value,
      eduCategory: educationCategory.value,
      status: institutionStatus.value
    }).schoolItems
);

const isSchoolItemAdded = (uuid: string) => {
  return schoolItemsUuids.value.includes(uuid);
}
</script>

<template>
  <table class="table">
    <thead>
    <tr>
      <th>
        <div>
          <div>
            <CustomCheckbox
                fillColor="#1B1B1F" :checked="schoolItemsUuids.length === 0"
                @click="xlsxStore.globalRemovalOrAddition(filteredItems)"
            />
            <p>Регион</p>
          </div>

          <TableSortButton
              title="Сортировка: отключена | по возрастанию | по убыванию"
              :isAscending="regionIsAscending"
              @click="() => sortingStore.toggleRegionAscending()"
          />
        </div>
      </th>
      <th>
        <div>
          <p>Название</p>

          <TableSortButton
              title="Сортировка: отключена | по возрастанию | по убыванию"
              :isAscending="nameIsAscending"
              @click="sortingStore.toggleNameAscending()"
          />
        </div>
      </th>
      <th>
        <div>
          <p>Адрес</p>

          <TableSortButton
              title="Сортировка: отключена | по возрастанию | по убыванию"
              :isAscending="addressIsAscending"
              @click="sortingStore.toggleAddressAscending()"
          />
        </div>
      </th>
      <th>
        <div>
          <p>Уровень образования</p>

          <TableSortButton
              title="Сортировка: отключена | по возрастанию | по убыванию"
              :isAscending="educationLevelIsAscending"
              @click="sortingStore.toggleEducationLevelAscending()"
          />
        </div>
      </th>
    </tr>
    </thead>
    <tbody>
    <tr v-for="item in filteredItems"
        :key="item.uuid">
      <td>
        <div class="region-container">
          <CustomCheckbox
              :fillColor="!isSchoolItemAdded(item.uuid) ? '#D3D3DE' : '#1B1B1F'"
              :checked="isSchoolItemAdded(item.uuid)"
              @click="xlsxStore.toggleUuid(item.uuid)"
          />
          {{ item.edu_org.region.name }}
        </div>
      </td>
      <td>{{ item?.edu_org?.short_name ?? item?.edu_org?.full_name ?? 'Не указано'}}</td>
      <td>{{ item?.edu_org?.contact_info?.post_address ?? 'Не указан' }}</td>
      <td>
        <div class="key-container">
          <div class="category" v-for="keyWord in defineEducationCategories(item.supplements)" :key="keyWord">
            <p>{{ keyWord }}</p>
          </div>
        </div>
      </td>
    </tr>
    </tbody>
  </table>
</template>

<style scoped lang="scss">
.table {
  width: 100%;
  border-collapse: collapse;
  color: #55555C;
  cursor: pointer;

  thead {
    position: sticky;
    top: 0;
    z-index: 10;
  }

  th {
    background-color: #F0F0F7;
    padding: 0 9px;
    height: 63px;

    p {
      font-weight: 700;
    }

    div {
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
  }

  tr {
    transition: background-color 0.3s ease-out;
    background-color: transparent;
  }

  tr:hover {
    background-color: #F1F4FD;
  }

  td {
    height: 63px;
    padding: 0 10px;
    font-size: 14px;
    line-height: 18px;
    font-weight: 400;
    border-bottom: 1px solid #D3D3DE;

    .region-container {
      display: flex;
      align-items: center;
    }

    .key-container {
      display: flex;
      flex-wrap: wrap;
      gap: 4px;

      .category {
        display: flex;
        align-items: center;
        justify-content: center;
        height: 24px;
        padding: 0 5px;
        border-radius: 8px;
        border: 1px solid #0E0E101A;

        p {
          font-size: 12px;
          line-height: 15px;
        }
      }
    }
    .key-container:empty:after {
      content: 'Не указан';
      color: #55555C;
      padding: 5px;
    }
  }

  td:last-child {
    width: 265px;
  }

  td:not(:last-child) {
    width: 26.00%;
  }
}
</style>