"use client";

import { useEffect, useRef } from "react";

/* Animated hero backdrop driven by a small WebGL fragment shader:
   domain-warped fractal noise produces a soft, flowing blue "aurora"
   glow, masked toward the top-centre. A faded line grid sits on top.
   Falls back to a static CSS glow when WebGL is unavailable, and
   freezes for prefers-reduced-motion. */

const VERT = `
attribute vec2 p;
void main() { gl_Position = vec4(p, 0.0, 1.0); }
`;

const FRAG = `
precision highp float;
uniform vec2 u_res;
uniform float u_time;

float hash(vec2 p){
  p = fract(p * vec2(123.34, 345.45));
  p += dot(p, p + 34.345);
  return fract(p.x * p.y);
}
float noise(vec2 p){
  vec2 i = floor(p), f = fract(p);
  float a = hash(i), b = hash(i + vec2(1.0, 0.0));
  float c = hash(i + vec2(0.0, 1.0)), d = hash(i + vec2(1.0, 1.0));
  vec2 u = f * f * (3.0 - 2.0 * f);
  return mix(mix(a, b, u.x), mix(c, d, u.x), u.y);
}
float fbm(vec2 p){
  float v = 0.0, a = 0.5;
  for (int i = 0; i < 6; i++) { v += a * noise(p); p *= 2.0; a *= 0.5; }
  return v;
}

void main(){
  vec2 uv = gl_FragCoord.xy / u_res.xy;
  vec2 p = uv;
  p.x *= u_res.x / u_res.y;
  float t = u_time * 0.05;

  // domain warping for organic, flowing plumes
  vec2 q = vec2(fbm(p + vec2(0.0, t)), fbm(p + vec2(5.2, -t)));
  vec2 r = vec2(
    fbm(p + 3.5 * q + vec2(1.7, 9.2) + 0.15 * t),
    fbm(p + 3.5 * q + vec2(8.3, 2.8) - 0.12 * t)
  );
  float f = fbm(p + 3.5 * r);

  float glow = smoothstep(0.15, 0.95, f);

  // concentrate toward the top centre, fade outward
  vec2 c = uv - vec2(0.5, 0.02);
  float m = smoothstep(1.05, 0.0, length(c * vec2(1.0, 1.5)));
  glow *= m;

  vec3 base = vec3(0.039, 0.039, 0.043);          // #0a0a0a
  vec3 blue = vec3(0.133, 0.435, 1.0);            // #2270ff
  vec3 cyan = vec3(0.35, 0.62, 1.0);

  vec3 col = base;
  col += blue * glow * 1.15;
  col += cyan * pow(glow, 3.0) * 0.5;             // brighter core
  col += blue * pow(glow, 8.0) * 0.6;             // hot highlights

  gl_FragColor = vec4(col, 1.0);
}
`;

export function HeroBackground() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const gl =
      canvas.getContext("webgl", { antialias: false, alpha: true }) ||
      (canvas.getContext("experimental-webgl") as WebGLRenderingContext | null);
    if (!gl) return;

    const compile = (type: number, src: string) => {
      const s = gl.createShader(type)!;
      gl.shaderSource(s, src);
      gl.compileShader(s);
      return s;
    };

    const prog = gl.createProgram()!;
    gl.attachShader(prog, compile(gl.VERTEX_SHADER, VERT));
    gl.attachShader(prog, compile(gl.FRAGMENT_SHADER, FRAG));
    gl.linkProgram(prog);
    gl.useProgram(prog);

    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 3, -1, -1, 3]),
      gl.STATIC_DRAW
    );
    const loc = gl.getAttribLocation(prog, "p");
    gl.enableVertexAttribArray(loc);
    gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);

    const uRes = gl.getUniformLocation(prog, "u_res");
    const uTime = gl.getUniformLocation(prog, "u_time");

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const w = canvas.clientWidth || 1;
      const h = canvas.clientHeight || 1;
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      gl.viewport(0, 0, canvas.width, canvas.height);
    };
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);
    resize();

    let raf = 0;
    const start = performance.now();
    const render = (now: number) => {
      gl.uniform2f(uRes, canvas.width, canvas.height);
      gl.uniform1f(uTime, reduce ? 9 : (now - start) / 1000);
      gl.drawArrays(gl.TRIANGLES, 0, 3);
      if (!reduce) raf = requestAnimationFrame(render);
    };
    if (reduce) render(start);
    else raf = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
    };
  }, []);

  return (
    <div
      className="pointer-events-none absolute inset-0 overflow-hidden"
      style={{
        background:
          "radial-gradient(120% 80% at 50% -10%, rgba(34,112,255,0.20), transparent 60%)",
      }}
    >
      <canvas ref={ref} className="absolute inset-0 h-full w-full" />
      <div className="hero-grid absolute inset-0" />
      <div
        className="absolute inset-x-0 bottom-0 h-32"
        style={{ background: "linear-gradient(to top, #0a0a0a, transparent)" }}
      />
    </div>
  );
}
