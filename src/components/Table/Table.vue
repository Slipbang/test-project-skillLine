<script setup lang="ts">
import CustomCheckbox from "@/components/CustomCheckbox/CustomCheckbox.vue";
import {defineEducationCategories} from "@/utils/utilsFunction.ts";
import {useSchoolsApiStore} from "@/stores/schoolsApi.ts";
import {onMounted, watch} from "vue";
import {storeToRefs} from "pinia";
import {useDebounceFn} from "@vueuse/core";
import TableSortButton from "@/components/TableSortButton/TableSortButton.vue";
import {useSortingStore} from "@/stores/sortStore.ts";
import {sortData} from "@/utilsClasses/utilsSortFunctions.ts";
import {filterByNames} from "@/utilsClasses/utilsFilterFunctions.ts";
import {useFiltersStore} from "@/stores/filterStore.ts";

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
const {filterInputValue} = storeToRefs(filterStore);

const fetchDataDebounced = useDebounceFn((page: number, count: number) => {
  schoolsApiStore.fetchData({
    page,
    count
  });
}, 500);

onMounted(() => {
  schoolsApiStore.fetchData({
    page: page.value,
    count: count.value
  })
})

const {schoolItems} = storeToRefs(schoolsApiStore);


const pipe =
    <T>(...fns: ((args: Partial<T>) => Partial<T>)[]) =>
        (initialArgs: Partial<T>): T =>
            fns.reduce((acc, fn) => ({ ...acc, ...fn(acc) }), initialArgs) as T;

watch([page, count], ([newPage, newCount]) => {
  if (!newPage && !newCount) return;

  fetchDataDebounced(newPage, newCount);
})

</script>

<template>
  <table class="table">
    <thead>
    <tr>
      <th>
        <div>
          <div>
            <CustomCheckbox fillColor="#1B1B1F" :checked="false"/>
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
    <tr v-for="item in pipe(
        sortData,
        filterByNames,
    )({
    schoolItems: schoolItems,
     flags: {
      eduLvlIsAsc: educationLevelIsAscending,
      addressIsAsc: addressIsAscending,
      nameIsAsc: nameIsAscending,
      regionIsAsc: regionIsAscending
    },
    filterValue: filterInputValue

    }).schoolItems"
        :key="item.uuid">
      <td>
        <div class="region-container">
          <CustomCheckbox fillColor="#1B1B1F" :checked="true"/>
          {{ item.edu_org.region.name }}
        </div>
      </td>
      <td>{{ item.edu_org.short_name ?? item.edu_org.full_name }}</td>
      <td>{{ item.edu_org.contact_info.post_address }}</td>
      <td>
        <div class="key-container">
          <div class="category" v-for="keyWord in defineEducationCategories(item.supplements)" key="keyWord">
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

  }

  td:last-child {
    width: 265px;
  }

  td:not(:last-child) {
    width: 26.00%;
  }

}
</style>

//display: grid;
//grid-template-columns: 2fr 2fr 2fr 1fr;