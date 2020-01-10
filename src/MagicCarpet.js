import * as THREE from 'three';
import vertexShader from './shaders/vertex.glsl';
import fragmentShader from './shaders/fragment.glsl';

export default class MagicCarpet{
    constructor(scene){
        this.scene = scene;
        this.createMesh();
    }

    createMesh(){
        this.geometry = new THREE.PlaneGeometry(6,6,15,15);

        this.initShader();        

        this.mesh = new THREE.Mesh(this.geometry, this.material);
        this.mesh.rotation.x = -Math.PI / 2;
        this.scene.add(this.mesh);
        this.startTime = Date.now();
    
    }

    initShader(){
        this.uniforms = {
            color: {
                value: new THREE.Color('red')
            },
            time: { 
                type: "f",
                value: 1.0
            }
        }

        this.material = new THREE.ShaderMaterial({
            wireframe: true,
            vertexShader,
            fragmentShader,
            uniforms : this.uniforms
        });
    }
    
    update(){
        this.mesh.rotation.z += 0.001;
        let elapsedMilliseconds = Date.now() - this.startTime;
        let elapsedSeconds = elapsedMilliseconds / 1000.;
        this.uniforms.time.value = 60. * elapsedSeconds;
    }
}