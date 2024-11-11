<template>
  <div>
    <div class="red">
      {{ res }}
    </div>
    <a-button type="primary" @click="res = 9">Primary</a-button>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

// import AButton from "@arco-plugins/vite-vue";
const res = ref(0);
</script>

<style lang="scss" scoped></style>
