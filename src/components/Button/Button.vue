<script setup lang="ts">
import DownloadButtonIcon from '../icons/DownloadButtonIcon.vue';

defineProps({
  text: String,
});
</script>



<template>
  <button class="download-button">
    <div>
      <DownloadButtonIcon />
      <p>{{ text }}</p>
    </div>
  </button>
</template>

<style scoped>
.download-button {
  height: 56px;
  background-color: #33D35E;
  border-radius: 10px;
  padding: 0 29px;
  border: none;
  cursor: pointer;
  transition: background-color 0.3s ease-out;

  div {
    display: flex;
    align-items: center;
    justify-content: center;

    svg {
      margin-right: 10px;
    }

    p {
      font-weight: 700;
      font-size: 16px;
      line-height:  21px;
    }
  }
}

.download-button:hover {
  background-color: #24C14E;
}
.download-button:active {
  background-color: #16B240;
}
</style>