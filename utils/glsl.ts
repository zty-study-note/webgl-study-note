/**
 * ### 创建着色器
 * ---
 * @param gl 着色器上下文
 * @param type 着色器类型
 * @param source 着色器代码资源
 */
export function createShader(gl: WebGLRenderingContext, type: number, source: string) {
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

/**
 * ### 创建程序
 * ---
 * @param gl 着色器上下文
 * @param vshader 顶点着色器
 * @param fshader 片元着色器
 */
export function createProgram(gl: WebGLRenderingContext, vshader: any, fshader: any) {
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
