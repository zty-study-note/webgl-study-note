<template>
  <div class="point-demo">
    <a-card class="flex-center">
      <canvas ref="canvasRef" width="500" height="300"></canvas>
    </a-card>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import vertex from "./point.vs";
import frag from "./point.fs";

const canvasRef = ref();

// 创建着色器
function createShader(gl: WebGLRenderingContext, type: number, source: string) {
  // 创建着色器
  const shader = gl.createShader(type);
  if (shader === null) {
    console.error("Unable to create shader");
    return null;
  }
  // 向着色器中添加资源
  gl.shaderSource(shader, source);

  // 编译着色器
  gl.compileShader(shader);

  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    console.error("Shader compile failed with:", gl.getShaderInfoLog(shader));
    gl.deleteShader(shader);
    return null;
  }

  return shader;
}

// 创建程序
function createProgram(gl: WebGLRenderingContext, vshader: any, fshader: any) {
  const program = gl.createProgram();
  if (program === null) {
    console.error("Unable to create shader object");
    return null;
  }

  // 将着色器添加到程序中
  gl.attachShader(program, vshader);
  gl.attachShader(program, fshader);

  // 链接程序
  gl.linkProgram(program);
  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
    console.error("Shader link failed with:", gl.getProgramInfoLog(program));
    gl.deleteProgram(program);
    return null;
  }

  return program;
}

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
}
</style>
