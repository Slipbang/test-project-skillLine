<script setup lang="ts">
import SortIcon from "@/assets/SortIcon.vue";
import CustomCheckbox from "@/components/CustomCheckbox/CustomCheckbox.vue";
import {mockData} from "@/mockData.ts";
import {defineEducationCategories} from "@/utils/utilsFunction.ts";

</script>

<template>
  <table class="table">
    <thead>
    <tr>
      <th>
        <div>
          <div>
            <CustomCheckbox fillColor="#1B1B1F" :checked="false" />
            <p>Регион</p>
          </div>
          <SortIcon/>
        </div>
      </th>
      <th>
        <div>
          <p>Название</p>
          <SortIcon/>
        </div>
      </th>
      <th>
        <div>
          <p>Адрес</p>
          <SortIcon/>
        </div>
      </th>
      <th>
        <div>
          <p>Уровень образования</p>
          <SortIcon/>
        </div>
      </th>
    </tr>
    </thead>
    <tbody>
    <tr v-for="item in mockData" :key="item.uuid">
      <td>
        <div class="region-container">
          <CustomCheckbox fillColor="#1B1B1F" :checked="true" />
          {{ item.region.name }}
        </div>
      </td>
      <td>{{ item.edu_org.short_name ?? item.edu_org.full_name }}</td>
      <td>{{ item.edu_org.contact_info.post_address }}</td>
      <td>
        <div class="key-container">
          <div class="category" v-for="keyWord in defineEducationCategories(item.supplements)" :key="keyWord">
            <p>{{keyWord}}</p>
          </div>
        </div>
      </td>
    </tr>
    </tbody>
  </table>
</template>

<style scoped>
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
    font-family: 'Gotham Pro', sans-serif;
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
          font-family: 'Gotham Pro', sans-serif;
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