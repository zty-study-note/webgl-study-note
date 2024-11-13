<template>
  <div class="flex-center">
    <canvas ref="canvasRef" width="500" height="300"></canvas>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";

const canvasRef = ref();

onMounted(() => {
  const canvas = canvasRef.value;
  const gl = canvas.getContext("webgl");

  const positionBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
  const positions = [0, 100, 200, 100, 200, 300];

  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positions), gl.STATIC_DRAW);

  gl.drawArrays(gl.TRIANGLES, 0, 3);
});
</script>

<style scoped>
canvas {
  border: 1px solid #ccc;
}
</style>
