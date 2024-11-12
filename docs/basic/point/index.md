---
outline: deep
---

<script setup>
import point from './components/point.vue'
</script>

# 绘制点

## 顶点着色器代码

```glsl
#version 300 es
precision mediump float; // 设置浮点精度
layout (location = 0) in vec2 position; // 顶点位置
void main() {
  // 设置画布大小
  gl_Position = vec4(position, 0.0, 1.0);
}
```

## 片元着色器代码

```glsl
#version 300 es
precision mediump float; // 设置浮点精度
out vec4 fragColor; // 输出颜色
void main() {
  fragColor = vec4(1.0, 0.0, 0.0, 1.0); // 设置画布为红色
}
```

## 创建着色器

```js
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

    // 检查编译是否成功
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    console.error("Shader compile failed with:", gl.getShaderInfoLog(shader));
    gl.deleteShader(shader);
    return null;
  }

  return shader;
}
```

## 创建程序
```js
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
```

## 绘制点
```js
const canvas = canvasRef.value;
  const gl = canvas.getContext("webgl");

  // 创建着色器
  const vertexShader = createShader(gl, gl.VERTEX_SHADER, vertex);
  const fragmentShader = createShader(gl, gl.FRAGMENT_SHADER, frag);

  // 创建程序
  const program = createProgram(gl, vertexShader, fragmentShader);

  // 使用程序
  gl.useProgram(program);

  // 清空画布
  gl.clearColor(0, 1, 1, 1);
  gl.clear(gl.COLOR_BUFFER_BIT);

  // 执行定点着色器
  gl.drawArrays(gl.POINTS, 0, 1);
```

<ClientOnly><point /></ClientOnly>
