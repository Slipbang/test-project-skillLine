<script setup lang="ts">
import Input from "@/components/Input/Input.vue";
import Button from "@/components/Button/Button.vue";
import Filters from "@/components/Filters/Filters.vue";
import Table from "@/components/Table/Table.vue";
import Pagination from "@/components/Pagination/Pagination.vue";
</script>

<template>
 <div class="stack">

   <div class="block">

     <div class="cont">
       <h4>Таблица учреждений</h4>

       <div class="controls">
         <Input />
         <Button text="Скачать" />
       </div>
     </div>

     <div class="filters">
       <Filters />
     </div>

     <div class="table">
       <Table />
     </div>

     <div class="pagination">
       <Pagination />
     </div>
   </div>

 </div>
</template>

<style scoped>
.stack {
  min-height: 932px;
  background-color: #F1F4FD;
  width: 100%;
  padding: 48px;

  .block {
    min-height: 836px;
    border-radius: 16px;
    background-color: #FFFFFF;
    padding: 24px;

    .cont {
      display: flex;
      justify-content: space-between;
      height: 56px;
      align-items: center;

      h4 {
        font-weight: 700;
        font-size: 32px;
        line-height:  38px;
      }

      .controls {
        display: flex;
        align-items: center;

        input {
          margin-right: 24px;
        }
      }
    }

    .filters {
      margin-top: 20px;
    }

    .table {
      margin-top: 20px;
    }

    .pagination {
      margin-top: 25px;
    }
  }
}
</style>

//background-color: #F1F4FD;