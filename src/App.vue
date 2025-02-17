<script setup lang="ts">
import Header from "@/components/Header/Header.vue";
import { RouterView } from 'vue-router';
</script>

<template>
  <Header />

  <main>
    <RouterView />
  </main>
</template>

<style scoped>

</style>

//import InstitutionsTable from "@/components/InstitutionsTable/InstitutionsTable.vue";
