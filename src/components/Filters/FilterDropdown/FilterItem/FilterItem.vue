<script setup lang="ts">
interface Props {
  text: string,
  isOpened?: boolean,
}

defineProps<Props>()
</script>

<template>
  <div
      :data-text="text.length > 21 ? 'long' : 'short'"
      :class="isOpened ? 'filter-item-open' : 'filter-item'"
  >
    {{text}}
  </div>
</template>

<style scoped lang="scss">
.filter-item {
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #E4E4EE;
  width: 100%;
  height: 0;
  padding: 0 8px;
  border-radius: 8px;
  transition: all 0.3s ease-out;
  overflow: hidden;
  font-size: var(--text-font-size);

  &-open {
    @extend .filter-item;
    margin: 1px 0;
    height: 56px;
    transition: all 0.3s ease-out;
    z-index: 9997;
  }
}

[data-text='long'].filter-item-open {
  --text-font-size: 12px;
}

[data-text='short'].filter-item-open {
  --text-font-size: 16px;
}
</style>