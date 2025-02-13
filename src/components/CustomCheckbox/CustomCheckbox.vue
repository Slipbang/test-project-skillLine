<script setup lang="ts">
import CheckboxIcon from "@/components/icons/CheckboxIcon.vue";
import IconAdd from "@/components/icons/IconAdd.vue";
import IconDelete from "@/components/icons/IconDelete.vue";
defineProps({
  checked: Boolean,
  fillColor: String,
})
</script>

<template>
  <div class="custom-checkbox">
    <CheckboxIcon :fill="fillColor" />
    <div class="inner-element">
      <IconAdd v-if="checked" />
      <IconDelete v-else-if="!checked && fillColor !== '#D3D3DE' "/>
    </div>
  </div>
</template>

<style scoped lang="scss">


.custom-checkbox {
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  cursor: pointer;
  margin-right: 10px;

  .inner-element {
    top: 0;
    left: 0;
    width: 18px;
    height: 18px;
    position: absolute;
    display: flex;
    align-items: center;
    justify-content: center;
  }
}
</style>
