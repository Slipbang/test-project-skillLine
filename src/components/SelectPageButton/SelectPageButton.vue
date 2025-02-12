<script setup lang="ts">
defineProps({
  numberOfPages: Number,
  isActive: Boolean,
})
</script>

<template>
  <button class="page-button" :data-active="isActive ? 'active' : 'inactive'">
    {{numberOfPages}}
  </button>
</template>

<style scoped>
.page-button {
  height: 36px;
  width: 36px;
  border-radius: 8px;
  border: none;
  background-color: var(--btn-bgc);
  cursor: pointer;
  margin: 0 1px;
  font-weight: 400;
  font-size: 12px;

}

.page-button:hover {
  background-color: #F1F4FD;
}

[data-active="active"] {
  --btn-bgc: #F0F0F7;
}

[data-active="inactive"] {
  --btn-bgc: transparent;
}
</style>