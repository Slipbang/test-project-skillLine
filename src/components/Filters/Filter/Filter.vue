<script setup lang="ts">

defineProps({
  text: String,
  icon: Object,
});
</script>

<template>
  <div class="filter">
    <p>{{text}}</p>
    <component :is="icon" />
  </div>
</template>

<style scoped lang="scss">
.filter {
  height: 56px;
  cursor: pointer;
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 20px;
  border: 1px solid #D3D3DE;
  border-radius: 10px;
  transition: background-color 0.3s ease-out;

  p {
    font-size: 16px;
    font-family: 'Gotham Pro', sans-serif;
    font-weight: 400;
    line-height: 21px;
  }
}

.filter:hover {
  background-color: #F1F4FD;
}
</style>