<script setup lang="ts">
import CompanyLogo from '../icons/CompanyLogo.vue';
import SquareLogo from '../icons/SquareLogo.vue';
</script>

<template>
  <div class="tech-header-group-1">
    <div class="tech-header">
      <SquareLogo />

      <div class="company-info">
        <CompanyLogo />

        <div class="text-box">
          <p>+7 962 253 20 37</p>
          <p>sales@skillline.ru</p>
          <p>skillline.ru</p>
        </div>
      </div>
    </div>

    <div class="text-header">
      <p>Тестовое задание</p>
    </div>
  </div>
</template>

<style scoped lang="scss">
.tech-header-group-1 {
  background-color: #0E0E10;
  height: 372px;
}

.tech-header {
  height: 216px;
  padding: 0 16px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.company-info {
  width: 124px;
  height: 98px;
  display: flex;
  flex-direction: column;
  align-items: flex-end;

  .text-box {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    margin-top: 5px;

    p {
      font-size: 14px;
      font-weight: 700;
      color: #55555C;
    }
    p:first-child {
      letter-spacing: 0.06em;
    }
  }
}

.text-header {
  height: calc(372px - 216px);
  padding: 0 16px;
  display: flex;
  flex-direction: column;
  justify-content: center;


  p {
    font-size: 60px;
    line-height: 66px;
    font-weight: 700;
    color: #F1F4FD;
  }
}
</style>