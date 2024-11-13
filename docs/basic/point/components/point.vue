<template>
  <div class="point-demo">
    <a-alert class="mb-2">点击下方画布绘制点.</a-alert>
    <a-card class="flex-center" ref="cardRef">
      <canvas ref="canvasRef" width="500" height="300"></canvas>
    </a-card>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import vertex from "./point.vs";
import frag from "./point.fs";
import { createShader, createProgram } from "../../../../utils/glsl.ts";

const cardRef = ref();
const canvasRef = ref();

onMounted(() => {
  const canvas = canvasRef.value;
  const gl = canvas.getContext("webgl");

  // 创建着色器
  const vertexShader = createShader(gl, gl.VERTEX_SHADER, vertex);
  const fragmentShader = createShader(gl, gl.FRAGMENT_SHADER, frag);

  // 创建程序
  const program = createProgram(gl, vertexShader, fragmentShader);

  // 使用程序
  gl.useProgram(program);

  // 执行定点着色器
  // gl.drawArrays(gl.POINTS, 0, 1);

  const a_position = gl.getAttribLocation(program, "a_position");
  const screenSize = gl.getUniformLocation(program, "screenSize");

  gl.uniform2f(screenSize, canvas.width, canvas.height);

  function bindEvent() {
    const points: { x: number; y: number }[] = [];
    canvas.onmousedown = (e) => {
      const x = e.offsetX;
      const y = e.offsetY;
      console.log("x:" + x + " y:" + y + "");

      points.push({ x, y });

      for (let i = 0; i < points.length; i++) {
        // // 清空画布
        // gl.clearColor(0, 1, 1, 1);
        // gl.clear(gl.COLOR_BUFFER_BIT);

        gl.vertexAttrib2f(a_position, points[i].x, points[i].y);
        gl.drawArrays(gl.POINTS, 0, 1);
      }
    };
  }

  bindEvent();
});
</script>

<style lang="scss" scoped>
.point-demo {
  canvas {
    border: 1px solid #ccc;
  }
}
</style>
