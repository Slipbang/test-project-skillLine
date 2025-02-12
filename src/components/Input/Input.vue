<script setup lang="ts">

</script>



<template>
  <input
      class="custom-input"
      type="text"
      placeholder="Поиск"
  />
</template>

<style scoped>
.custom-input {
  height: 56px;
  background-image: url(src/assets/searchIcon.svg);
  background-repeat: no-repeat;
  background-position: right 15px center;
  width: 300px;
  border-radius: 10px;
  outline: none;
  padding: 0 20px;
  border: 1px solid #D3D3DE;
  transition: background-color 0.3s ease-out;
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