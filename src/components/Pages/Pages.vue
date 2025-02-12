<script setup lang="ts">

import LeftArrowIcon from "@/components/icons/LeftArrowIcon.vue";
import RightArrowIcon from "@/components/icons/RightArrowIcon.vue";
import SwipePageButton from "@/components/SwipePageButton/SwipePageButton.vue";
import {extractFirstNumbers} from "@/utils/utilsFunction.ts";
import SelectPageButton from "@/components/SelectPageButton/SelectPageButton.vue";

const numbers = Array.from({ length: 11 }).map((_, i) => i);
</script>

<template>
  <div class="pages-container">
    <SwipePageButton
        :icon="LeftArrowIcon"
    />

    <div class="number-buttons">
      <SelectPageButton
          v-for="test of extractFirstNumbers(numbers, 1)"
          :key="test"
          :numberOfPages="test"
          :isActive="test === 1"
      />
      <div class="ellipsis">
        ...
      </div>
      <SelectPageButton
          :numberOfPages="numbers[numbers.length-1]"
          :isActive="false"
      />
    </div>

    <SwipePageButton
        :icon="RightArrowIcon"
    />
  </div>
</template>

<style scoped>
.pages-container {
  width: 324px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.number-buttons {
  display: flex;
  align-items: center;

  .ellipsis {
    width: 36px;
    height: 36px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
}
</style>