precision mediump float;

uniform float time;
uniform vec2  resolution;
uniform float size;

#pragma glslify: noise = require("glsl-noise/simplex/3d")

void main() {
  float n = noise(vec3(gl_FragCoord.xy / resolution.xy * size, time));
  gl_FragColor.rgb = vec3(n);
  gl_FragColor.a   = 1.0;
}