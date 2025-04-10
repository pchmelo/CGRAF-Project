#ifdef GL_ES
precision highp float;
#endif

uniform sampler2D uWaterTex;
uniform float timeFactor;
uniform float normScale;

varying vec2 vTextureCoord;

void main() {
    // Sample WaterTex with displacement for animation
    gl_FragColor = texture2D(uWaterTex, vTextureCoord + vec2((timeFactor * 0.5) * (normScale / 10.), (timeFactor * 0.5) * (normScale / 10.)));
}
