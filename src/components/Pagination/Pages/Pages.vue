<script setup lang="ts">

import LeftArrowIcon from "@/components/icons/LeftArrowIcon.vue";
import RightArrowIcon from "@/components/icons/RightArrowIcon.vue";
import SwipePageButton from "@/components/SwipePageButton/SwipePageButton.vue";
import {extractFirstNumbers} from "@/utils/utilsFunction.ts";
import SelectPageButton from "@/components/SelectPageButton/SelectPageButton.vue";
import {useSchoolsApiStore} from "@/stores/schoolsApi.ts";
import {storeToRefs} from "pinia";

const schoolsApiStore = useSchoolsApiStore();
const {pages_count, page} = storeToRefs(schoolsApiStore);

const selectPageHandler = (page: number) => {
  schoolsApiStore.selectPage(page);
}

const increasePageHandler = (page: number, limit: number) => {
  if (page < limit) {
    schoolsApiStore.selectPage(page + 1);
  }
}

const decreasePageHandler = (page: number) => {
  if (page > 1) {
    schoolsApiStore.selectPage(page - 1);
  }
}

</script>

<template>
  <div class="pages-container">
    <SwipePageButton
        @click="decreasePageHandler(page)"
        :icon="LeftArrowIcon"
    />

    <SelectPageButton
        v-if="page > 2"
        @click="selectPageHandler(1)"
        :numberOfPages="1"
        :isActive="page === 1"
    />

    <div
        v-if="page > 2"
        class="ellipsis"
    >
      ...
    </div>

    <div class="number-buttons">
      <SelectPageButton
          v-for="num of extractFirstNumbers(page, pages_count)"
          :key="num"
          :numberOfPages="num"
          :isActive="num === page"
          @click="selectPageHandler(num)"
      />

      <div
          v-if="page < pages_count"
          class="ellipsis"
      >
        ...
      </div>

      <div class="number-buttons">
        <SelectPageButton
            v-if="page < pages_count"
            @click="selectPageHandler(pages_count)"
            :numberOfPages="pages_count"
            :isActive="page === pages_count"
        />
      </div>
    </div>

    <SwipePageButton
        @click="increasePageHandler(page, pages_count)"
        :icon="RightArrowIcon"
    />
  </div>
</template>

<style scoped lang="scss">
.pages-container {
  width: 344px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.number-buttons {
  display: flex;
  align-items: center;
  justify-content: center;

  .ellipsis {
    width: 36px;
    height: 36px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
}
</style>