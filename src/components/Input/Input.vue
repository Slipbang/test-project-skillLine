<script setup lang="ts">
import {useFiltersStore} from "@/stores/filterStore.ts";
import {storeToRefs} from "pinia";

const filterStore = useFiltersStore();
const {filterInputValue} = storeToRefs(filterStore);

</script>

<template>
  <input
      v-model="filterInputValue"
      class="custom-input"
      type="text"
      placeholder="Поиск"
  />
</template>

<style scoped lang="scss">
.custom-input {
  height: 56px;
  background-image: url(../icons/searchIcon.svg);
  background-repeat: no-repeat;
  background-position: right 15px center;
  width: 300px;
  border-radius: 10px;
  outline: none;
  padding: 0 20px;
  border: 1px solid #D3D3DE;
  transition: background-color 0.3s ease-out;
  font-size: 16px;
}
.custom-input::placeholder {
  font-size: 16px;
  font-family: 'Gotham Pro', sans-serif;
  font-weight: 400;
  line-height: 21px;
}

.custom-input:hover {
  background-color: #F1F4FD;
}
</style>