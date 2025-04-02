attribute vec3 aVertexPosition;
attribute vec3 aVertexNormal;
attribute vec2 aTextureCoord;

uniform mat4 uMVMatrix;
uniform mat4 uPMatrix;
uniform mat4 uNMatrix;

uniform sampler2D uWaterMap;
uniform float timeFactor;
uniform float normScale;

varying vec2 vTextureCoord;

void main() {
    // Wave coordinates for animation
    float waveX = sin(timeFactor + aVertexPosition.x) * 0.02;
    float waveY = cos(timeFactor + aVertexPosition.y) * 0.02;
    
    // Displacement for wave effect
    vec2 displacedTexCoord = aTextureCoord + vec2(waveX, waveY);
    
    // Sample the waterMap texture
    vec4 waterMapColor = texture2D(uWaterMap, displacedTexCoord);

    // Use color of texture as the offset value
    float offset = waterMapColor.r * normScale;

    // Apply the offset to the vertex position along the Z-axis
    vec3 displacedPosition = aVertexPosition + vec3(0.0, 0.0, offset);

    gl_Position = uPMatrix * uMVMatrix * vec4(displacedPosition, 1.0);
    vTextureCoord = aTextureCoord;
}
