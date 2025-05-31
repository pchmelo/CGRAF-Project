attribute vec3 aVertexPosition;
attribute vec2 aTextureCoord;

uniform mat4 uMVMatrix;
uniform mat4 uPMatrix;

uniform float uTime;
uniform float displacement;

#define M_PI 3.14159265358979323846

varying vec2 vTextureCoord;

void main() {
    vec3 pos = aVertexPosition;

    float wave = sin(uTime * 2.0 * M_PI + aVertexPosition.x * 10.0 + aVertexPosition.y * 10.0);
    pos.x += (0.03 * wave) + (0.01 * displacement);
    pos.z += (0.2 * wave) + (0.01 * displacement);

    gl_Position = uPMatrix * uMVMatrix * vec4(pos, 1.0);

    vTextureCoord = aTextureCoord;
}