#ifdef GL_ES
precision highp float;
#endif

struct lightProperties {
    vec4 position;
    vec4 ambient;
    vec4 diffuse;
    vec4 specular;
    vec4 half_vector;
    vec3 spot_direction;
    float spot_exponent;
    float spot_cutoff;
    float constant_attenuation;
    float linear_attenuation;
    float quadratic_attenuation;
    bool enabled;
};

#define M_PI 3.14159265358979323846
#define NUMBER_OF_LIGHTS 2
uniform lightProperties uLight[NUMBER_OF_LIGHTS];

uniform float mixer;
uniform sampler2D originTexture;
uniform sampler2D newTexture;

varying vec2 vTextureCoord;

void main() {
    // The calculations for the light are not theoretically correct, but practically they work well enough for this scene without being computationally expensive
    // The correct implementation for the light calculations can be found in lib/CGF/shaders/Gouraud/multiple_lights-vertex.glsl
	vec4 tex0 = texture2D(originTexture, vTextureCoord) * (uLight[0].ambient + uLight[0].diffuse * uLight[0].specular);
	vec4 tex1 = texture2D(newTexture, vTextureCoord) * (uLight[0].ambient + uLight[0].diffuse * uLight[0].specular);
	gl_FragColor = mix(tex0, tex1, mixer);
}
