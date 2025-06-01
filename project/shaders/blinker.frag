#ifdef GL_ES
precision highp float;
#endif

uniform float uTime;
uniform vec3 emissionColor;
uniform sampler2D uSampler;

#define M_PI 3.14159265358979323846

varying vec2 vTextureCoord;

void main() {
	vec3 baseColor = texture2D(uSampler, vTextureCoord).rgb;
	float intensity = 0.5 + 0.5 * sin(uTime * 2.0 * M_PI);

    vec3 finalColor = baseColor + (emissionColor * intensity);
	gl_FragColor = vec4(finalColor, 1.0);
}
