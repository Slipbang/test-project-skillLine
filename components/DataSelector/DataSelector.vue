<script setup lang="ts">
// import Dropdown from "@/components/Dropdown/Dropdown.vue";
// import {useSchoolsApiStore} from "../../stores/schoolsApi.ts";
// import {useFiltersStore} from "../../stores/filterStore.ts";

import {storeToRefs} from "pinia";
import {useSchoolsApiStore} from "../../stores/schoolsApi";
import {useFiltersStore} from "../../stores/filterStore";
import Dropdown from "../Dropdown/Dropdown.vue";
const schoolApiStore = useSchoolsApiStore();
const {schoolItems} = storeToRefs(schoolApiStore);
const filterStore = useFiltersStore();
const {currentSchoolItemValue} = storeToRefs(filterStore);
</script>

<template>
  <div class="selector-container">
    <p>{{currentSchoolItemValue}} из {{schoolItems?.length || 0}} записей</p>

    <div class="drop-container">
      <p>Показывать</p>
      <Dropdown />
    </div>
  </div>
</template>

<style scoped lang="scss">
.selector-container {
  display: flex;
  gap: 5px;
  justify-content: space-between;
  align-items: center;
  width: 275px;
  height: 36px;

  p {
    font-size: 12px;
    color: #687588;
  }
}

.drop-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 158px;
}

@media (max-width: 800px) {
  .selector-container {
    width: 100%;
  }
}
</style>