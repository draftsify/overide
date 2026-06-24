"use client";

import { useEffect, useRef } from "react";

/* Hero backdrop matching the reference look: a smooth, fluid mesh-gradient
   shader (large soft colour blobs slowly drifting and blending), a fine
   grain overlay in `overlay` blend mode, and a faded line grid on top.
   Falls back to a static CSS glow without WebGL; freezes for
   prefers-reduced-motion. */

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

void main(){
  vec2 uv = gl_FragCoord.xy / u_res.xy;
  float asp = u_res.x / u_res.y;
  vec2 p = vec2(uv.x * asp, uv.y);
  float t = u_time * 0.16;

  vec3 base = vec3(0.039, 0.039, 0.043); // #0a0a0a

  // smooth, slowly drifting colour blobs (mesh-gradient style)
  vec3 glow = vec3(0.0);

  vec2 c1 = vec2((0.50 + 0.16 * sin(t * 0.50)) * asp, 0.14 + 0.10 * cos(t * 0.43));
  float d1 = distance(p, c1);
  glow += vec3(0.133, 0.435, 1.0) * exp(-d1 * d1 * 5.0) * 1.0;   // blue

  vec2 c2 = vec2((0.33 + 0.18 * cos(t * 0.37)) * asp, 0.02 + 0.12 * sin(t * 0.51));
  float d2 = distance(p, c2);
  glow += vec3(0.10, 0.22, 0.95) * exp(-d2 * d2 * 6.0) * 0.9;    // indigo

  vec2 c3 = vec2((0.71 + 0.14 * sin(t * 0.33 + 1.0)) * asp, 0.24 + 0.10 * cos(t * 0.41));
  float d3 = distance(p, c3);
  glow += vec3(0.32, 0.62, 1.0) * exp(-d3 * d3 * 7.0) * 0.8;     // cyan

  vec2 c4 = vec2((0.58 + 0.12 * cos(t * 0.29 + 2.0)) * asp, 0.30 + 0.10 * sin(t * 0.36));
  float d4 = distance(p, c4);
  glow += vec3(0.18, 0.30, 1.0) * exp(-d4 * d4 * 8.0) * 0.7;     // deep blue

  // concentrate toward the top, fade outward
  float m = smoothstep(1.05, 0.0, length((uv - vec2(0.5, 0.0)) * vec2(1.0, 1.35)));
  glow *= m;

  vec3 col = base + glow;

  // gentle dither to kill banding
  col += (hash(gl_FragCoord.xy) - 0.5) * 0.012;

  gl_FragColor = vec4(col, 1.0);
}
`;

const GRAIN_SVG =
  "<svg xmlns='http://www.w3.org/2000/svg' width='200' height='200'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/></filter><rect width='100%' height='100%' filter='url(#n)'/></svg>";
const GRAIN = `url("data:image/svg+xml,${encodeURIComponent(GRAIN_SVG)}")`;

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
      {/* grain overlay (overlay blend), like the reference texture layer */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: GRAIN,
          backgroundSize: "200px 200px",
          opacity: 0.12,
          mixBlendMode: "overlay",
        }}
      />
      <div className="hero-grid absolute inset-0" />
      <div
        className="absolute inset-x-0 bottom-0 h-32"
        style={{ background: "linear-gradient(to top, #0a0a0a, transparent)" }}
      />
    </div>
  );
}
