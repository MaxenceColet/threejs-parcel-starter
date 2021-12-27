import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import Stats from 'stats.js';

import MagicCarpet from './MagicCarpet';



export default class Scene{

    constructor(){
        this.scene = new THREE.Scene();

        this.renderer = new THREE.WebGLRenderer({
            antialias: true,
            alpha: true
        });
        this.renderer.setClearColor(0x000000, 0);

        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.renderer.setPixelRatio(window.devicePixelRatio);

        this.initCamera();
        document.body.appendChild( this.renderer.domElement );

        this.bindEvents();
        
        //ADD CARPET
        this.carpet = new MagicCarpet(this.scene);


        //SHOW STATS ONLY IN DEV MODE
        if (process.env.NODE_ENV !== 'production') {
            this.stats = new Stats();
            this.stats.showPanel(0);
            document.body.appendChild( this.stats.dom );
        }
        

        this.update();

    }

    bindEvents(){
        window.addEventListener('resize', () => { this.onResize(); });
    }

    initCamera(){
        this.camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 1000 );

        this.camera.position.z = 5;
        this.camera.position.y = 5;
        this.camera.position.x = 5;
        this.controls =  new OrbitControls(this.camera, this.renderer.domElement);
    }

    onResize(){
        this.camera.aspect = window.innerWidth / window.innerHeight;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize( window.innerWidth, window.innerHeight );
    }
    update() {
        if (this.renderer === undefined) return

        if (process.env.NODE_ENV !== 'production'){
            this.stats.begin();
        }
       
        requestAnimationFrame(this.update.bind(this))
        this.carpet.update();
        
        this.renderer.render(this.scene, this.camera)

        if (process.env.NODE_ENV !== 'production'){
            this.stats.end();
        }
        
    }
    
}


