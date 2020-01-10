varying vec2 vUv;
uniform float time;
varying float newPosition;

void main () {
    vUv = uv;
    newPosition += position.z + 1.5 * sin(vUv.x * 2.0 + 20.0 +  time / 20.0);    
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position.x, position.y, newPosition, 1.0);
}