<script setup lang="ts">
import MonthSelector from "@/components/CustomCalendar/MonthSelector/MonthSelector.vue";
import Month from "@/components/CustomCalendar/Month/Month.vue";
import ButtonPrimary from "@/components/ButtonPrimary/ButtonPrimary.vue";
import ButtonSecondary from "@/components/ButtonSecondary/ButtonSecondary.vue";
</script>

<template>
  <div class="custom-calendar">
    <h5>Выбрать период</h5>

    <hr />

    <div class="month-selector-container">
      <MonthSelector />
    </div>

    <Month />

    <div class="buttons-container">
      <ButtonSecondary
          text="Отмена"
      />
      <ButtonPrimary
          text="Сохранить"
      />
    </div>
  </div>
</template>

<style scoped lang="scss">
.custom-calendar {
  width: 364px;
  height: 482px;
  padding: 11px;
  border-radius: 16px;
  background-color: #F1F4FD;
  box-shadow: 0 5px 40px 0 #0000001A;

  h5 {
    font-family: Manrope, sans-serif;
    font-weight: 700;
    font-size: 20px;
    line-height: 28px;
    margin: 24px 24px 0;
  }

  hr {
    margin: 15px 24px;
    border-top: 1px solid #D3D3DE;
  }

  .month-selector-container {
    margin: 24px 16px;
  }

  .buttons-container {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: 15px;

    button {
      flex-grow: 1;
    }
  }
}
</style>