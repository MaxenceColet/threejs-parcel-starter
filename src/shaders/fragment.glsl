varying vec2 vUv;
varying float newPosition;
uniform vec3 color;
uniform float time;

void main () {
    float newColor = color.b +  newPosition / 2.0;
    gl_FragColor = vec4(color.r - newColor, color.g, newColor,1.0);
}