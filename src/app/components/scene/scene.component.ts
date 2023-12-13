import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

import { Snow } from "src/app/models/snow.type";


@Component({
  selector: 'app-scene',
  templateUrl: './scene.component.html',
  styleUrls: ['./scene.component.css']
})
export class SceneComponent implements OnInit {
  title = 'Drawing...';
  public rotateLeft: boolean = false;
  public rotateRight: boolean = false;

  public container: any;
  public renderer: any;
  public camera: any;
  readonly scene: any;

  public house: any;
  public skybox: any;
  public snowSmall!: Snow;
  public snowMedium!: Snow;
  public snowLarge!: Snow;

  constructor() {
    this.scene = new THREE.Scene();
    this.snowSmall = new Snow(0.1, 8, 50, 0xb7e5eb, Math.PI, 0.02, 0.1);
    this.snowMedium = new Snow(0.18, 8, 100, 0xc4edf2, 2 * Math.PI, 0.01);
    this.snowLarge = new Snow(0.25, 8, 50, 0xd0f1f5, 4 * Math.PI, 0.008);
  }

  ngOnInit(): void {  
    this.container = document.querySelector('#scene') as HTMLCanvasElement;

    // Renderer settings
    this.renderer = new THREE.WebGLRenderer({
      canvas: this.container,
      antialias: true,
      alpha: true
    });
    this.renderer.setSize(this.container.clientWidth, this.container.clientHeight);
    this.renderer.setPixelRatio(window.devicePixelRatio);
    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    // Camera settings
    const fov = 40;
    const aspect = this.container.clientWidth / this.container.clientHeight;
    const near = 0.1;
    const far = 500;
    this.camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
    this.camera.position.set(0, -5, 70);    

    //Lights
    this.addLights();
    //this.addHelpers();
    this.loadSkybox();
    this.displaySnow(this.snowSmall);
    this.displaySnow(this.snowMedium);
    this.displaySnow(this.snowLarge);

    this.animate();
  }

  private addHelpers() {
    const gridHelper = new THREE.GridHelper(200, 50);
    this.scene.add(gridHelper);
    const controls = new OrbitControls(this.camera, this.renderer.domElement);
  }

  private addBackground() {
    const bgTexture = new THREE.TextureLoader().load('assets/wp-ai.webp');
    this.scene.background = bgTexture;
  }

  private addLights() {
    const ambient = new THREE.AmbientLight(0x404040, 20);

    const spotLight = new THREE.SpotLight(0xffffff, 1000, 1000, Math.PI/3, 0, 1.5);
    spotLight.position.set(0,100,0);
    spotLight.castShadow = true;
    const lightHelper = new THREE.SpotLightHelper(spotLight);

    this.scene.add(ambient);
  }

  private loadGltfModel(path: string) {
    let loader = new GLTFLoader();
    loader.load(path, (gltf) => {
      this.scene.add(gltf.scene);
      this.house = gltf.scene.children[0];
    })
  }

  private loadSkybox() {
    let texture = new THREE.TextureLoader().load('../assets/3d/cabin-skybox/textures/Scene_root_diffuse.jpeg');
    let material = (new THREE.MeshStandardMaterial({ map: texture, side: THREE.BackSide,  }));

    this.skybox = new THREE.Mesh(
      new THREE.SphereGeometry(100, 500),
      material
    );
    this.skybox.position.set(0, 10, 0);
    this.skybox.receiveShadow = true;
    this.scene.add(this.skybox);
  }

  private displaySnow(snow: Snow) {
    snow.flakes.forEach(flake => {
      this.scene.add(flake.mesh);
    });
  }

  private animate() {
    requestAnimationFrame(this.animate.bind(this));
    if (this.skybox) {
      this.skybox.rotation.y += 0.0001;
    }
    if (this.snowSmall) {
      this.snowSmall.move();
    }
    if (this.snowMedium) {
      this.snowMedium.move();
    }
    if (this.snowLarge) {
      this.snowLarge.move();
    }
    if(this.rotateLeft){
      this.skybox.rotation.y -= 0.001; 
    }
    if(this.rotateRight){
      this.skybox.rotation.y += 0.001; 
    }
    //controls.update();
    this.renderer.render(this.scene, this.camera);
    
  }
}
